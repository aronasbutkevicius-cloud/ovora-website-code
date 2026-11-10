/**
 * Session signing secret.
 * On Vercel, a missing AUTH_SECRET fails closed (no sessions) instead of throwing.
 * Locally, a fixed development secret lets sign-up and login be verified without
 * putting a production secret in the repo.
 */
export function getAuthSecret(): string | null {
  const fromEnv = process.env.AUTH_SECRET?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL) return null;
  return "dev-only-ovora-session-secret-not-for-production";
}

export type AccountStoreMode = "postgres" | "file" | "disabled";

export function accountStoreMode(): AccountStoreMode {
  if (process.env.DATABASE_URL?.trim()) return "postgres";
  if (process.env.VERCEL) return "disabled";
  return "file";
}

export function authConfigured(): boolean {
  return Boolean(getAuthSecret()) && accountStoreMode() !== "disabled";
}

export const AUTH_UNAVAILABLE_MESSAGE =
  "Researcher accounts are not available until the site owner finishes account setup. Email support@ovoralabs.com.";
