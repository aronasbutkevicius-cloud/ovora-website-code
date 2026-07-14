import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageBits";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#fffaf6]">
      <div className="content-container">
        <PageHero
          title="Membership"
          subtitle="Unlock researcher perks and priority support for your lab."
        />
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
          {[
            {
              name: "Researcher",
              price: "Free",
              perks: ["Member pricing access", "Order tracking", "COA access"],
            },
            {
              name: "Lab+",
              price: "Points unlock",
              perks: ["Member-only catalog drops", "Priority support", "Early catalog access"],
            },
            {
              name: "Institution",
              price: "Custom",
              perks: ["Volume pricing", "Dedicated account contact", "Batch documentation packs"],
            },
          ].map((tier) => (
            <div
              key={tier.name}
              className="rounded-3xl border border-[#eadfd4] bg-[#f7efe7] p-8 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-[#2a211c] mb-1">{tier.name}</h2>
              <p className="text-sm text-[#2a211c]/50 mb-6">{tier.price}</p>
              <ul className="space-y-2 text-sm text-[#2a211c]/70 flex-1 mb-8">
                {tier.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-[#c4785a]">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/store"
                className="inline-flex items-center justify-center h-11 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
