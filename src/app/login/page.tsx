import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { getSession, safeCallbackUrl } from "@/lib/auth/session";
import { gatedMetadata } from "@/lib/site";

export const metadata: Metadata = gatedMetadata({
  title: "Sign in",
  description: "Sign in to an Ovora Labs researcher account to view the catalog.",
  path: "/login",
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl, "/store");
  const session = await getSession();
  if (session) redirect(callbackUrl);
  return <LoginForm callbackUrl={callbackUrl} />;
}
