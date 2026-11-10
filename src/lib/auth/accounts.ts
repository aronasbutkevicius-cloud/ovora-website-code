import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { compare, hash } from "bcryptjs";
import { accountStoreMode } from "@/lib/auth/secret";
import type { SessionUser } from "@/lib/auth/token";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  organization: string;
  researchPurpose: string;
  ruoAck: boolean;
  ageAck: boolean;
  phoneE164: string | null;
  smsConsentAt: string | null;
  smsConsentText: string | null;
  smsConsentVersion: string | null;
  createdAt: string;
};

export type PublicUser = Omit<StoredUser, "passwordHash">;

export type OrderLine = {
  variantSlug: string;
  name: string;
  dose: string;
  quantity: number;
  unitCents: number;
};

export type StoredOrder = {
  id: string;
  userId: string;
  items: OrderLine[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  researchPurpose: string;
  status: "payment_pending";
  createdAt: string;
};

export type StoredRedemption = {
  id: string;
  userId: string;
  phoneE164: string;
  orderId: string;
  createdAt: string;
};

export type DiscountState = "eligible" | "needs_opt_in" | "used";

type Database = {
  users: StoredUser[];
  orders: StoredOrder[];
  redemptions: StoredRedemption[];
};

function filePath() {
  return path.join(process.cwd(), ".data", "accounts.json");
}

async function readFileDb(): Promise<Database> {
  try {
    const raw = await readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as Database;
    return {
      users: parsed.users ?? [],
      orders: parsed.orders ?? [],
      redemptions: parsed.redemptions ?? [],
    };
  } catch {
    return { users: [], orders: [], redemptions: [] };
  }
}

async function writeFileDb(db: Database) {
  const dir = path.dirname(filePath());
  await mkdir(dir, { recursive: true });
  const tmp = `${filePath()}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2));
  await rename(tmp, filePath());
}

function sqlClient() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

let schemaPromise: Promise<void> | null = null;

function ensureSchema() {
  schemaPromise ??= (async () => {
    const sql = sqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        organization TEXT NOT NULL,
        research_purpose TEXT NOT NULL,
        ruo_ack BOOLEAN NOT NULL,
        age_ack BOOLEAN NOT NULL,
        phone_e164 TEXT UNIQUE,
        sms_consent_at TIMESTAMPTZ,
        sms_consent_text TEXT,
        sms_consent_version TEXT,
        created_at TIMESTAMPTZ NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        items_json TEXT NOT NULL,
        subtotal_cents INTEGER NOT NULL,
        discount_cents INTEGER NOT NULL,
        shipping_cents INTEGER NOT NULL,
        total_cents INTEGER NOT NULL,
        research_purpose TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS discount_redemptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        phone_e164 TEXT NOT NULL UNIQUE,
        order_id TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL
      )
    `;
  })();
  return schemaPromise;
}

export function toPublic(user: StoredUser): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    organization: user.organization,
    researchPurpose: user.researchPurpose,
    ruoAck: user.ruoAck,
    ageAck: user.ageAck,
    phoneE164: user.phoneE164,
    smsConsentAt: user.smsConsentAt,
    smsConsentText: user.smsConsentText,
    smsConsentVersion: user.smsConsentVersion,
    createdAt: user.createdAt,
  };
}

type UserRow = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  organization: string;
  research_purpose: string;
  ruo_ack: boolean;
  age_ack: boolean;
  phone_e164: string | null;
  sms_consent_at: string | Date | null;
  sms_consent_text: string | null;
  sms_consent_version: string | null;
  created_at: string | Date;
};

function iso(value: string | Date | null): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function rowToUser(row: UserRow): StoredUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    passwordHash: row.password_hash,
    organization: row.organization,
    researchPurpose: row.research_purpose,
    ruoAck: row.ruo_ack,
    ageAck: row.age_ack,
    phoneE164: row.phone_e164,
    smsConsentAt: iso(row.sms_consent_at),
    smsConsentText: row.sms_consent_text,
    smsConsentVersion: row.sms_consent_version,
    createdAt: iso(row.created_at) ?? new Date(0).toISOString(),
  };
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const normalized = email.trim().toLowerCase();
  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    return db.users.find((user) => user.email === normalized) ?? null;
  }
  if (accountStoreMode() === "disabled") return null;
  await ensureSchema();
  const sql = sqlClient();
  const rows = await sql`SELECT * FROM users WHERE email = ${normalized} LIMIT 1`;
  const row = rows[0] as UserRow | undefined;
  return row ? rowToUser(row) : null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    return db.users.find((user) => user.id === id) ?? null;
  }
  if (accountStoreMode() === "disabled") return null;
  await ensureSchema();
  const sql = sqlClient();
  const rows = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  const row = rows[0] as UserRow | undefined;
  return row ? rowToUser(row) : null;
}

export async function findUserByPhone(phoneE164: string): Promise<StoredUser | null> {
  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    return db.users.find((user) => user.phoneE164 === phoneE164) ?? null;
  }
  if (accountStoreMode() === "disabled") return null;
  await ensureSchema();
  const sql = sqlClient();
  const rows = await sql`SELECT * FROM users WHERE phone_e164 = ${phoneE164} LIMIT 1`;
  const row = rows[0] as UserRow | undefined;
  return row ? rowToUser(row) : null;
}

export async function createUser(input: {
  email: string;
  name: string;
  password: string;
  organization: string;
  researchPurpose: string;
}): Promise<StoredUser> {
  const email = input.email.trim().toLowerCase();
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email,
    name: input.name.trim(),
    passwordHash: await hash(input.password, 12),
    organization: input.organization.trim(),
    researchPurpose: input.researchPurpose,
    ruoAck: true,
    ageAck: true,
    phoneE164: null,
    smsConsentAt: null,
    smsConsentText: null,
    smsConsentVersion: null,
    createdAt: new Date().toISOString(),
  };

  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    if (db.users.some((existing) => existing.email === email)) {
      throw new Error("EMAIL_TAKEN");
    }
    db.users.push(user);
    await writeFileDb(db);
    return user;
  }

  await ensureSchema();
  const sql = sqlClient();
  try {
    await sql`
      INSERT INTO users (
        id, email, name, password_hash, organization, research_purpose,
        ruo_ack, age_ack, created_at
      ) VALUES (
        ${user.id}, ${user.email}, ${user.name}, ${user.passwordHash},
        ${user.organization}, ${user.researchPurpose}, ${user.ruoAck},
        ${user.ageAck}, ${user.createdAt}
      )
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.toLowerCase().includes("unique") || message.toLowerCase().includes("duplicate")) {
      throw new Error("EMAIL_TAKEN");
    }
    throw error;
  }
  return user;
}

export async function verifyPassword(user: StoredUser, password: string) {
  return compare(password, user.passwordHash);
}

export function toSession(user: StoredUser): SessionUser {
  return { id: user.id, email: user.email, name: user.name };
}

export async function saveSmsConsent(
  userId: string,
  phoneE164: string,
  consentText: string,
  consentVersion: string,
): Promise<"ok" | "phone_taken" | "locked"> {
  const existingPhone = await findUserByPhone(phoneE164);
  if (existingPhone && existingPhone.id !== userId) return "phone_taken";

  const user = await findUserById(userId);
  if (!user) throw new Error("USER_MISSING");
  if (await userHasRedemption(userId)) return "locked";

  const consentAt = new Date().toISOString();

  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    const row = db.users.find((entry) => entry.id === userId);
    if (!row) throw new Error("USER_MISSING");
    row.phoneE164 = phoneE164;
    row.smsConsentAt = consentAt;
    row.smsConsentText = consentText;
    row.smsConsentVersion = consentVersion;
    await writeFileDb(db);
    return "ok";
  }

  await ensureSchema();
  const sql = sqlClient();
  try {
    await sql`
      UPDATE users
      SET phone_e164 = ${phoneE164},
          sms_consent_at = ${consentAt},
          sms_consent_text = ${consentText},
          sms_consent_version = ${consentVersion}
      WHERE id = ${userId}
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.toLowerCase().includes("unique") || message.toLowerCase().includes("duplicate")) {
      return "phone_taken";
    }
    throw error;
  }
  return "ok";
}

async function userHasOrder(userId: string) {
  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    return db.orders.some((order) => order.userId === userId);
  }
  await ensureSchema();
  const sql = sqlClient();
  const rows = await sql`SELECT id FROM orders WHERE user_id = ${userId} LIMIT 1`;
  return rows.length > 0;
}

async function userHasRedemption(userId: string) {
  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    return db.redemptions.some((entry) => entry.userId === userId);
  }
  await ensureSchema();
  const sql = sqlClient();
  const rows = await sql`SELECT id FROM discount_redemptions WHERE user_id = ${userId} LIMIT 1`;
  return rows.length > 0;
}

async function phoneHasRedemption(phoneE164: string) {
  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    return db.redemptions.some((entry) => entry.phoneE164 === phoneE164);
  }
  await ensureSchema();
  const sql = sqlClient();
  const rows = await sql`SELECT id FROM discount_redemptions WHERE phone_e164 = ${phoneE164} LIMIT 1`;
  return rows.length > 0;
}

export async function getDiscountState(userId: string): Promise<DiscountState> {
  const user = await findUserById(userId);
  if (!user?.phoneE164 || !user.smsConsentAt) return "needs_opt_in";
  if ((await userHasOrder(userId)) || (await userHasRedemption(userId))) return "used";
  if (await phoneHasRedemption(user.phoneE164)) return "used";
  return "eligible";
}

export async function placeOrder(input: {
  userId: string;
  items: OrderLine[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  researchPurpose: string;
  applyDiscount: boolean;
}): Promise<StoredOrder> {
  const order: StoredOrder = {
    id: crypto.randomUUID(),
    userId: input.userId,
    items: input.items,
    subtotalCents: input.subtotalCents,
    discountCents: input.applyDiscount ? input.discountCents : 0,
    shippingCents: input.shippingCents,
    totalCents: input.applyDiscount
      ? input.subtotalCents - input.discountCents + input.shippingCents
      : input.subtotalCents + input.shippingCents,
    researchPurpose: input.researchPurpose,
    status: "payment_pending",
    createdAt: new Date().toISOString(),
  };

  const user = await findUserById(input.userId);
  if (!user) throw new Error("USER_MISSING");

  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    let apply = input.applyDiscount && order.discountCents > 0 && Boolean(user.phoneE164);
    if (apply && user.phoneE164) {
      const already =
        db.orders.some((entry) => entry.userId === input.userId) ||
        db.redemptions.some(
          (entry) => entry.userId === input.userId || entry.phoneE164 === user.phoneE164,
        );
      if (already) apply = false;
    }
    if (!apply) {
      order.discountCents = 0;
      order.totalCents = order.subtotalCents + order.shippingCents;
    }
    db.orders.push(order);
    if (apply && user.phoneE164) {
      db.redemptions.push({
        id: crypto.randomUUID(),
        userId: input.userId,
        phoneE164: user.phoneE164,
        orderId: order.id,
        createdAt: order.createdAt,
      });
    }
    await writeFileDb(db);
    return order;
  }

  await ensureSchema();
  const sql = sqlClient();
  const state = await getDiscountState(input.userId);
  const apply = input.applyDiscount && order.discountCents > 0 && state === "eligible" && user.phoneE164;
  if (!apply) {
    order.discountCents = 0;
    order.totalCents = order.subtotalCents + order.shippingCents;
  }

  if (apply && user.phoneE164) {
    const redemptionId = crypto.randomUUID();
    await sql.transaction([
      sql`
        INSERT INTO orders (
          id, user_id, items_json, subtotal_cents, discount_cents, shipping_cents,
          total_cents, research_purpose, status, created_at
        ) VALUES (
          ${order.id}, ${order.userId}, ${JSON.stringify(order.items)},
          ${order.subtotalCents}, ${order.discountCents}, ${order.shippingCents},
          ${order.totalCents}, ${order.researchPurpose}, ${order.status}, ${order.createdAt}
        )
      `,
      sql`
        INSERT INTO discount_redemptions (id, user_id, phone_e164, order_id, created_at)
        VALUES (${redemptionId}, ${order.userId}, ${user.phoneE164}, ${order.id}, ${order.createdAt})
      `,
    ]);
    return order;
  }

  await sql`
    INSERT INTO orders (
      id, user_id, items_json, subtotal_cents, discount_cents, shipping_cents,
      total_cents, research_purpose, status, created_at
    ) VALUES (
      ${order.id}, ${order.userId}, ${JSON.stringify(order.items)},
      ${order.subtotalCents}, ${order.discountCents}, ${order.shippingCents},
      ${order.totalCents}, ${order.researchPurpose}, ${order.status}, ${order.createdAt}
    )
  `;
  return order;
}

export type SmsOptInExport = {
  email: string;
  name: string;
  organization: string;
  phoneE164: string;
  consentAt: string;
  consentVersion: string;
  consentText: string;
};

export async function listSmsOptIns(): Promise<SmsOptInExport[]> {
  if (accountStoreMode() === "file") {
    const db = await readFileDb();
    return db.users
      .filter((user) => user.phoneE164 && user.smsConsentAt && user.smsConsentText && user.smsConsentVersion)
      .map((user) => ({
        email: user.email,
        name: user.name,
        organization: user.organization,
        phoneE164: user.phoneE164 as string,
        consentAt: user.smsConsentAt as string,
        consentVersion: user.smsConsentVersion as string,
        consentText: user.smsConsentText as string,
      }));
  }
  if (accountStoreMode() === "disabled") return [];
  await ensureSchema();
  const sql = sqlClient();
  const rows = await sql`
    SELECT email, name, organization, phone_e164, sms_consent_at, sms_consent_version, sms_consent_text
    FROM users
    WHERE phone_e164 IS NOT NULL AND sms_consent_at IS NOT NULL
    ORDER BY sms_consent_at ASC
  `;
  return (rows as UserRow[]).map((row) => ({
    email: row.email,
    name: row.name,
    organization: row.organization,
    phoneE164: row.phone_e164 as string,
    consentAt: iso(row.sms_consent_at) ?? "",
    consentVersion: row.sms_consent_version ?? "",
    consentText: row.sms_consent_text ?? "",
  }));
}
