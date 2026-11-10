import { createHeadlessClient, type CheckoutSession, type PaymentMethodConfig } from "@tagadapay/headless-sdk";
import {
  TAGADA_ACCOUNT_ID,
  TAGADA_API_BASE,
  TAGADA_STORE_ID,
  paymentMethodAllowlist,
  tagadaVariants,
  type AllowlistedMethod,
} from "@/data/tagada";
import { shippingCost } from "@/lib/shipping";

export type OfferedMethod = {
  id: AllowlistedMethod;
  label: string;
  detail: string;
};

export type PreparedCheckout = {
  checkoutToken: string;
  sessionToken: string;
  session: CheckoutSession;
  methods: OfferedMethod[];
};

type CartLine = {
  variantSlug: string;
  name: string;
  dose: string;
  price: number;
  quantity: number;
};

type ShippingForm = {
  email: string;
  fullName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  stateRegion: string;
  postal: string;
  country: string;
};

const SDK_HEADER = "headless-sdk/1.22.0";

export function toUsCountryCode(country: string) {
  const value = country.trim().toLowerCase();
  if (value === "us" || value === "usa" || value === "united states" || value === "united states of america") {
    return "US";
  }
  return null;
}

export function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function expectedShippingCents(subtotalCents: number) {
  return Math.round(shippingCost(subtotalCents / 100) * 100);
}

function offeredMethods(setup: Record<string, PaymentMethodConfig>): OfferedMethod[] {
  const seen = new Set<AllowlistedMethod>();
  const methods: OfferedMethod[] = [];

  for (const [key, entry] of Object.entries(setup)) {
    if (!entry?.enabled) continue;
    const methodName = entry.method || key.split(":")[0];
    if (!(methodName in paymentMethodAllowlist)) continue;
    const id = methodName as AllowlistedMethod;
    const config = paymentMethodAllowlist[id];
    if (!config.enabled || seen.has(id)) continue;
    seen.add(id);
    methods.push({ id, label: config.label, detail: config.detail });
  }

  return methods;
}

export async function prepareTagadaCheckout(items: CartLine[], form: ShippingForm): Promise<PreparedCheckout> {
  const country = toUsCountryCode(form.country);
  if (!country) {
    throw new Error("Checkout currently ships within the United States only.");
  }

  const missing = items.filter((item) => !tagadaVariants[item.variantSlug]);
  if (missing.length > 0) {
    const names = missing.map((item) => `${item.name} ${item.dose}`).join(", ");
    throw new Error(`These items are not connected to checkout yet: ${names}.`);
  }

  const lineItems = items.map((item) => {
    const ref = tagadaVariants[item.variantSlug];
    return {
      variantId: ref.variantId,
      priceId: ref.priceId,
      quantity: item.quantity,
    };
  });

  const tagada = createHeadlessClient({
    storeId: TAGADA_STORE_ID,
    accountId: TAGADA_ACCOUNT_ID,
    environment: "production",
  });

  const created = await tagada.checkout.createSession({
    items: lineItems,
    currency: "USD",
    returnUrl: typeof window !== "undefined" ? `${window.location.origin}/checkout` : "https://ovoralabs.com/checkout",
  });

  const loaded = await tagada.checkout.loadSession(created.checkoutToken, created.sessionToken);
  const cartCents = items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0);
  if (loaded.totals.subtotal !== cartCents) {
    throw new Error("Checkout prices do not match the cart. Payment was not started.");
  }

  const { firstName, lastName } = splitFullName(form.fullName);
  await tagada.checkout.updateCustomer(loaded.id, {
    email: form.email.trim(),
    firstName,
    lastName,
    phone: form.phone.trim(),
  });
  await tagada.checkout.updateAddress(loaded.id, {
    shippingAddress: {
      firstName,
      lastName,
      phone: form.phone.trim(),
      line1: form.address1.trim(),
      line2: form.address2.trim() || undefined,
      city: form.city.trim(),
      state: form.stateRegion.trim(),
      postalCode: form.postal.trim(),
      country,
    },
  });

  const expected = expectedShippingCents(loaded.totals.subtotal);
  const rates = await tagada.checkout.getShippingRates(loaded.id);
  const rate = rates.find((entry) => entry.amount === expected);
  if (!rate) {
    throw new Error(
      "Shipping rates do not match the $8.99 rate under $100 and free shipping at $100. Payment was not started.",
    );
  }

  await tagada.checkout.selectShippingRate(loaded.id, rate.id);
  const session = await tagada.checkout.loadSession(created.checkoutToken, created.sessionToken);
  if (session.totals.shipping !== expected) {
    throw new Error("The checkout session did not keep the site shipping rate. Payment was not started.");
  }

  const setup = await tagada.payment.getPaymentSetup(session.id);
  const methods = offeredMethods(setup);
  if (!methods.some((method) => method.id === "crypto")) {
    throw new Error("Crypto pay-by-card is not available for this order. No other method was offered.");
  }

  return {
    checkoutToken: created.checkoutToken,
    sessionToken: created.sessionToken,
    session,
    methods,
  };
}

export async function startCryptoPayment(opts: {
  checkoutSessionId: string;
  sessionToken: string;
  returnUrl: string;
}) {
  const res = await fetch(`${TAGADA_API_BASE}/api/v1/crypto/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cms-token": opts.sessionToken,
      "X-Tagada-SDK": SDK_HEADER,
    },
    body: JSON.stringify({
      checkoutSessionId: opts.checkoutSessionId,
      returnUrl: opts.returnUrl,
      provider: "moonpay",
    }),
  });

  const data = (await res.json().catch(() => ({}))) as { paymentUrl?: string; message?: string };
  if (!res.ok || typeof data.paymentUrl !== "string" || !data.paymentUrl) {
    throw new Error(data.message || "The crypto payment page could not be opened. Nothing was paid.");
  }
  window.location.assign(data.paymentUrl);
}

export async function readCheckoutPaymentState(
  checkoutToken: string,
  sessionToken: string,
): Promise<"paid" | "unpaid"> {
  const res = await fetch(
    `${TAGADA_API_BASE}/api/v1/checkout-sessions/${encodeURIComponent(checkoutToken)}/v2?skipAsyncWait=false`,
    {
      headers: {
        "x-cms-token": sessionToken,
        "X-Tagada-SDK": SDK_HEADER,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Could not confirm whether the payment finished.");
  }
  const raw = (await res.json()) as {
    checkoutSession?: { orders?: Array<{ paidAt?: string | null; status?: string }> };
  };
  const orders = raw.checkoutSession?.orders ?? [];
  const paid = orders.some(
    (order) => (typeof order.paidAt === "string" && order.paidAt.length > 0) || order.status === "paid",
  );
  return paid ? "paid" : "unpaid";
}
