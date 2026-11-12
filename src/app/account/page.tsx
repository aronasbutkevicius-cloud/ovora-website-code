import type { Metadata } from "next";
import Link from "next/link";
import { SmsOptInForm } from "@/components/SmsOptInForm";
import { findUserById, getDiscountState, toPublic } from "@/lib/auth/accounts";
import { getSession } from "@/lib/auth/session";
import { FIRST_ORDER_OFFER } from "@/lib/compliance";
import { gatedMetadata } from "@/lib/site";

export const metadata: Metadata = gatedMetadata({
  title: "Account",
  description: "Ovora Labs researcher account, phone opt-in, and first-order offer.",
  path: "/account",
});

export default async function AccountPage() {
  const session = await getSession();
  if (!session) return null;
  const user = await findUserById(session.id);
  if (!user) return null;
  const profile = toPublic(user);
  const discount = await getDiscountState(session.id);

  return (
    <section className="py-12 lg:py-16 bg-canvas min-h-[60vh]">
      <div className="content-container max-w-3xl">
        <h1 className="text-4xl font-semibold text-ink tracking-tight mb-3">Account</h1>
        <p className="text-muted mb-8">
          Signed in as {profile.email}. Products are sold only to qualified researchers and licensed
          laboratories.
        </p>
        <dl className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
          <Item label="Name" value={profile.name} />
          <Item label="Organization" value={profile.organization} />
          <Item label="Research purpose" value={profile.researchPurpose} />
          <Item label="Email" value={profile.email} />
        </dl>
        <div className="mb-6 rounded-2xl border border-line bg-surface-2 p-5 text-sm text-ink-soft leading-relaxed">
          <p className="font-medium text-ink mb-1">{FIRST_ORDER_OFFER}</p>
          {discount === "eligible" && (
            <p>Your account is eligible. The 15% line appears in cart and checkout totals.</p>
          )}
          {discount === "needs_opt_in" && (
            <p>Add a mobile number and check the consent box. The discount is calculated on the server.</p>
          )}
          {discount === "used" && (
            <p>This first-order discount has already been used on this account.</p>
          )}
        </div>
        <SmsOptInForm phoneE164={profile.phoneE164} />
        <p className="mt-8 text-sm">
          <Link href="/store" className="underline text-ink">
            Browse the catalog
          </Link>
        </p>
      </div>
    </section>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <dt className="text-muted mb-1">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
