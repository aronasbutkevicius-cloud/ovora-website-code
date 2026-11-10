import { NextResponse } from "next/server";
import { findUserByEmail, toSession, verifyPassword } from "@/lib/auth/accounts";
import { AUTH_UNAVAILABLE_MESSAGE, authConfigured } from "@/lib/auth/secret";
import { safeCallbackUrl } from "@/lib/auth/session";
import { SESSION_COOKIE, sessionCookieOptions, signSession } from "@/lib/auth/token";

export async function POST(request: Request) {
  if (!authConfigured()) {
    return NextResponse.json({ error: AUTH_UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
    callbackUrl?: string;
  } | null;

  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const callbackUrl = safeCallbackUrl(body?.callbackUrl, "/store");

  const user = email ? await findUserByEmail(email) : null;
  const valid = user ? await verifyPassword(user, password) : false;
  if (!user || !valid) {
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  const token = await signSession(toSession(user));
  if (!token) {
    return NextResponse.json({ error: AUTH_UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true, redirectTo: callbackUrl });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
