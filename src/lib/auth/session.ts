import { cookies } from "next/headers";
import { readSessionToken, SESSION_COOKIE, type SessionUser } from "@/lib/auth/token";

export async function getSession(): Promise<SessionUser | null> {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    return await readSessionToken(token);
  } catch {
    return null;
  }
}

export function safeCallbackUrl(value: string | null | undefined, fallback = "/store") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }
  return value;
}
