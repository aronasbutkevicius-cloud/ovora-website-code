import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/SignupForm";
import { authConfigured } from "@/lib/auth/secret";
import { getSession } from "@/lib/auth/session";
import { gatedMetadata } from "@/lib/site";

export const metadata: Metadata = gatedMetadata({
  title: "Create account",
  description: "Create an Ovora Labs researcher account. Catalog access requires sign-in.",
  path: "/signup",
});

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/account");
  return <SignupForm configured={authConfigured()} />;
}
