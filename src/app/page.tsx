import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/CtaBand";
import { HeroAurora } from "@/components/HeroAurora";
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
      <section className="relative w-full min-h-[88vh] overflow-hidden">
        <HeroAurora />
        <div className="content-container relative z-20 min-h-[88vh] flex items-center">
          <div className="max-w-3xl py-20 lg:py-28 animate-fade-up">
            <p className="section-kicker mb-5">Laboratory grade · USA based</p>
            <h1 className="hero-title font-anek text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight mb-6">
              Research peptides, documented like a laboratory.
            </h1>
            <p className="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mb-8">
              Premium research-grade peptides with a 99%+ purity guarantee. Built for labs that
              demand documentation, consistency, and third-party verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors"
              >
                Create a researcher account
              </Link>
              <Link
                href="/research-use"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-line bg-white/10 text-ink text-sm font-medium hover:bg-white/15 transition-colors"
              >
                Research Use Only
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 section-wash">
        <div className="content-container">
          <div className="max-w-2xl mb-12 reveal">
            <p className="section-kicker mb-3">The bench</p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-ink tracking-tight">
              How a batch earns a place in the catalog
            </h2>
          </div>
          <ol className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {features.map((step, index) => (
              <li key={step.title} className="feature-card rounded-3xl border border-line p-6 reveal">
                <span className="text-accent text-sm font-semibold">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 section-depth">
        <div className="content-container grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <div className="reveal">
            <p className="section-kicker mb-3">Purity and documentation</p>
            <p className="hero-title text-7xl lg:text-8xl font-semibold tracking-tight">≥99%</p>
            <p className="mt-4 text-ink-soft text-lg leading-relaxed">
              HPLC tested for purity verification. A certificate of analysis is available on request
              for every batch. Files appear on the certificate page when they are uploaded.
            </p>
            <Link href="/coa" className="inline-flex mt-6 text-sm font-medium text-accent underline underline-offset-4">
              Certificates of analysis
            </Link>
          </div>
          <div className="glass-panel rounded-3xl border border-line p-8 reveal">
            <h2 className="text-2xl font-semibold text-ink mb-4">What the record covers</h2>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li>Batch identity checked by an independent laboratory</li>
              <li>Purity verified before a lot is released</li>
              <li>Certificate of analysis available on request</li>
              <li>USA-based support for documentation questions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
        <div className="content-container">
          <div className="glass-panel rounded-[2rem] border border-line p-8 lg:p-14 text-center reveal">
            <p className="section-kicker mb-4">Members catalog</p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-ink tracking-tight max-w-3xl mx-auto">
              Compounds, quantities, and checkout stay behind a researcher account
            </h2>
            <p className="mt-5 text-lg text-ink-soft max-w-2xl mx-auto leading-relaxed">
              {QUALIFIED_RESEARCHER_STATEMENT} Create an account and sign in to view compounds,
              quantities, and checkout. Prices are not shown on public pages.
            </p>
            <ResearcherNotice className="mt-4 max-w-2xl mx-auto" />
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover"
              >
                Create a researcher account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-line bg-white/10 text-ink text-sm font-medium hover:bg-white/15"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="content-container max-w-3xl">
          <h2 className="text-3xl font-semibold text-ink tracking-tight mb-8 reveal">Questions from the bench</h2>
          <div className="space-y-3">
            {[
              ["Who can view the catalog?", "Create a researcher account and sign in. The catalog and checkout are shown only after sign-in. Products are sold only to qualified researchers and licensed laboratories."],
              ["Are your products for human use?", "No. All Ovora Labs products are sold strictly for laboratory and research use only — not for human or veterinary consumption."],
              ["What purity do you guarantee?", "We guarantee 99%+ purity on every peptide we sell. Batches that do not meet our standards do not ship."],
              ["How fast do you ship?", "Orders are typically processed within 0–2 business days. Overnight delivery is available. Free shipping is offered on qualifying US orders."],
            ].map(([q, a]) => (
              <details key={q} className="glass-panel rounded-2xl border border-line p-5 reveal">
                <summary className="cursor-pointer font-medium text-ink">{q}</summary>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
