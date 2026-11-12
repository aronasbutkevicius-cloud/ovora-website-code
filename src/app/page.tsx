import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/CtaBand";
import { HeroLumen } from "@/components/HeroLumen";
import { ResearcherNotice } from "@/components/ProductCompliance";
import { JsonLd } from "@/components/JsonLd";
import { QUALIFIED_RESEARCHER_STATEMENT } from "@/lib/compliance";
import { getSiteUrl, pageMetadata, rootDescription, rootTitle, siteName, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: rootTitle,
  absoluteTitle: rootTitle,
  description: rootDescription,
  path: "/",
});

const features = [
  {
    title: "99%+ Purity Guarantee",
    body: "Every peptide we sell is guaranteed to be 99%+ pure. No exceptions. If a batch doesn't meet our strict purity standards, it doesn't ship.",
  },
  {
    title: "USA-Based Company",
    body: "Ovora Labs is proudly headquartered in the United States. We handle all sourcing, quality control, customer support, and shipping from our US operations.",
  },
  {
    title: "Third-Party Identity Testing",
    body: "Every batch is independently checked for identity and content by ISO 17025 accredited laboratories. A certificate of analysis is available on request.",
  },
  {
    title: "Controlled Synthesis Process",
    body: "Our manufacturing follows documented internal quality procedures designed to support consistency from batch to batch.",
  },
];

const questions: Array<[string, string]> = [
  [
    "Who can view the catalog?",
    "Create a researcher account and sign in. The catalog and checkout are shown only after sign-in. Products are sold only to qualified researchers and licensed laboratories.",
  ],
  [
    "Are your products for human use?",
    "No. All Ovora Labs products are sold strictly for laboratory and research use only — not for human or veterinary consumption.",
  ],
  [
    "What purity do you guarantee?",
    "We guarantee 99%+ purity on every peptide we sell. Batches that do not meet our standards do not ship.",
  ],
  [
    "How fast do you ship?",
    "Orders are typically processed within 0–2 business days. Overnight delivery is available. Free shipping is offered on qualifying US orders.",
  ],
];

export default function HomePage() {
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/apple-icon.png`,
              email: supportEmail,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: supportEmail,
                areaServed: "US",
                availableLanguage: "English",
              },
            },
            {
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
              publisher: { "@type": "Organization", name: siteName },
            },
          ],
        }}
      />

      <section className="hero-lumen relative min-h-[calc(100svh-7.25rem)]">
        <HeroLumen />
        <div className="content-container relative z-10 flex min-h-[calc(100svh-7.25rem)] items-end lg:items-center">
          <div className="hero-scrim w-full max-w-xl pb-20 pt-16 lg:max-w-2xl lg:py-20 animate-fade-up">
            <p className="section-kicker">Laboratory grade · United States</p>
            <h1 className="mt-4 font-display text-[2.7rem] font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Research peptides,{" "}
              <em className="font-medium text-accent-deep">held in the light.</em>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Premium research-grade peptides with a 99%+ purity guarantee. Documentation,
              consistency, and third-party verification for qualified laboratories.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="btn-primary">
                Create a researcher account
              </Link>
              <Link href="/research-use" className="btn-secondary">
                Research Use Only
              </Link>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              The moving field is illustrative. Compounds, quantities, and checkout stay behind a
              researcher account.
            </p>
          </div>
          <p className="pointer-events-none absolute bottom-8 right-0 hidden max-w-[14rem] text-right text-xs leading-relaxed text-ink-soft lg:block">
            Illustrative backbone. The light field keeps drifting while this page is on screen.
          </p>
        </div>
      </section>

      <section className="relative border-t border-transparent py-8">
        <div className="content-container">
          <hr className="pearl-rule" />
          <dl className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["≥99%", "HPLC purity before a lot is released"],
              ["ISO 17025", "Independent identity testing"],
              ["COA", "Certificate available on request"],
              ["United States", "Support and shipping operations"],
            ].map(([stat, label]) => (
              <div key={stat} className="border-l border-line pl-4">
                <dt className="font-display text-3xl text-ink">{stat}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 section-wash">
        <div className="content-container grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-4 reveal">
            <p className="index-label">02 — The bench</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink lg:text-5xl">
              How a batch earns a place in the catalog
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {features.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-5 border-t border-line py-7 reveal">
                <span className="font-display text-3xl italic text-accent">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 section-depth">
        <div className="content-container">
          <div className="folio grid items-center gap-10 p-8 lg:grid-cols-2 lg:p-12 reveal">
            <div>
              <p className="index-label">03 — Documentation</p>
              <p className="mt-3 font-display text-7xl font-medium tracking-tight text-ink lg:text-8xl">≥99%</p>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
                HPLC tested for purity verification. A certificate of analysis is available on request
                for every batch. Files appear on the certificate page when they are uploaded.
              </p>
              <Link href="/coa" className="mt-6 inline-flex text-sm font-medium text-accent underline underline-offset-4">
                Certificates of analysis
              </Link>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {[
                "Batch identity checked by an independent laboratory",
                "Purity verified before a lot is released",
                "Certificate of analysis available on request",
                "USA-based support for documentation questions",
              ].map((item) => (
                <li key={item} className="py-4 text-sm leading-relaxed text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="content-container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal">
            <p className="index-label">04 — Members catalog</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-medium tracking-tight text-ink lg:text-5xl">
              Compounds and checkout stay behind a researcher account
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {QUALIFIED_RESEARCHER_STATEMENT} Create an account and sign in to view compounds,
              quantities, and checkout. Prices are not shown on public pages.
            </p>
            <ResearcherNotice className="mt-4 max-w-xl" />
          </div>
          <div className="folio space-y-4 p-6 reveal">
            <Link href="/signup" className="btn-primary w-full">
              Create a researcher account
            </Link>
            <Link href="/login" className="btn-secondary w-full">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="relative pb-8 lg:pb-12">
        <div className="content-container max-w-3xl">
          <h2 className="mb-6 font-display text-3xl font-medium tracking-tight text-ink">Questions from the bench</h2>
          <div>
            {questions.map(([q, a], index) => (
              <details key={q} className="group border-t border-line py-5 reveal">
                <summary className="flex cursor-pointer list-none items-baseline gap-4 font-medium text-ink">
                  <span className="font-display italic text-accent">0{index + 1}</span>
                  <span>{q}</span>
                </summary>
                <p className="mt-3 pl-10 text-sm leading-relaxed text-ink-soft">{a}</p>
              </details>
            ))}
            <hr className="pearl-rule" />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
