import { SignJWT, jwtVerify } from "jose";
import { getAuthSecret } from "@/lib/auth/secret";

export const SESSION_COOKIE = "ovora_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

function keyFor(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function signSession(user: SessionUser): Promise<string | null> {
  const secret = getAuthSecret();
  if (!secret) return null;
  return new SignJWT({ email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(keyFor(secret));
}

export async function readSessionToken(token: string | undefined | null): Promise<SessionUser | null> {
  if (!token) return null;
  const secret = getAuthSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, keyFor(secret));
    const id = payload.sub;
    const email = typeof payload.email === "string" ? payload.email : "";
    const name = typeof payload.name === "string" ? payload.name : "";
    if (!id || !email) return null;
    return { id, email, name };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}
