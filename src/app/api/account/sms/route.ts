import { NextResponse } from "next/server";
import { saveSmsConsent } from "@/lib/auth/accounts";
import { normalizePhone } from "@/lib/auth/phone";
import { getSession } from "@/lib/auth/session";
import { SMS_CONSENT_TEXT, SMS_CONSENT_VERSION } from "@/lib/compliance";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as {
    phone?: string;
    consent?: boolean;
  } | null;

  if (body?.consent !== true) {
    return NextResponse.json({ error: "Check the consent box to continue." }, { status: 400 });
  }

  const phone = normalizePhone(body.phone ?? "");
  if (!phone) {
    return NextResponse.json(
      { error: "Enter a valid phone number. US numbers can omit the country code." },
      { status: 400 },
    );
  }

  try {
    const result = await saveSmsConsent(session.id, phone, SMS_CONSENT_TEXT, SMS_CONSENT_VERSION);
    if (result === "phone_taken") {
      return NextResponse.json(
        { error: "This phone number is already associated with another account." },
        { status: 409 },
      );
    }
    if (result === "locked") {
      return NextResponse.json(
        { error: "The phone number on this account can no longer be changed." },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: true, phoneE164: phone });
  } catch {
    return NextResponse.json(
      { error: "The phone number could not be saved. Email support@ovoralabs.com." },
      { status: 503 },
    );
  }
}
