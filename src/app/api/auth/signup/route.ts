import { NextResponse } from "next/server";
import {
  createUser,
  findUserByEmail,
  toSession,
} from "@/lib/auth/accounts";
import { AUTH_UNAVAILABLE_MESSAGE, authConfigured } from "@/lib/auth/secret";
import { isResearchPurpose } from "@/lib/compliance";
import { SESSION_COOKIE, sessionCookieOptions, signSession } from "@/lib/auth/token";

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!authConfigured()) {
    return bad(AUTH_UNAVAILABLE_MESSAGE, 503);
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    password?: string;
    organization?: string;
    researchPurpose?: string;
    ruoAck?: boolean;
    ageAck?: boolean;
  } | null;

  const name = body?.name?.trim() ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const organization = body?.organization?.trim() ?? "";
  const researchPurpose = body?.researchPurpose?.trim() ?? "";

  if (name.length < 2 || name.length > 120) return bad("Enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Enter a valid email address.");
  if (password.length < 8 || password.length > 200) {
    return bad("Use a password of at least 8 characters.");
  }
  if (organization.length < 2 || organization.length > 200) {
    return bad("Enter your organization or institution.");
  }
  if (!isResearchPurpose(researchPurpose)) return bad("Select a research purpose.");
  if (body?.ruoAck !== true) {
    return bad("Confirm that products are for laboratory research use only.");
  }
  if (body?.ageAck !== true) return bad("Confirm that you are at least 21 years of age.");

  try {
    const existing = await findUserByEmail(email);
    if (existing) return bad("An account with that email already exists.");
    const user = await createUser({ email, name, password, organization, researchPurpose });
    const token = await signSession(toSession(user));
    if (!token) return bad(AUTH_UNAVAILABLE_MESSAGE, 503);
    const response = NextResponse.json({ ok: true, redirectTo: "/account" });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return bad("An account with that email already exists.");
    }
    return bad("Account creation is unavailable right now. Email support@ovoralabs.com.", 503);
  }
}
