import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageBits";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Research Library",
  description:
    "Documentation context for Ovora Labs. Compound listings are available after researcher sign-in.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <section className="py-12 lg:py-16 bg-canvas">
      <div className="content-container max-w-3xl">
        <PageHero
          title="Research Library"
          subtitle="Handling context for laboratory investigators. The compound catalog is available after sign-in."
        />
        <p className="text-ink-soft leading-relaxed mb-6">
          Citations and paper links are not published on this page. Signed-in researchers can review
          compound identity, quantity, storage, and certificates of analysis from the catalog.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand text-on-ink text-sm font-medium"
          >
            Create a researcher account
          </Link>
          <Link
            href="/research-use"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-line text-ink text-sm font-medium"
          >
            Research-use policy
          </Link>
        </div>
      </div>
    </section>
  );
}
