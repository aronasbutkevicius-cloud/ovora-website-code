import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Research Use Only",
  description:
    "Information about research-use-only peptides and laboratory applications from Ovora Labs.",
  path: "/research-use",
});

const applications = [
  {
    title: "Cell Culture Studies",
    body: "Investigate cellular responses and mechanisms in controlled laboratory environments.",
  },
  {
    title: "Protein Analysis",
    body: "Study protein interactions, binding affinities, and structural characteristics.",
  },
  {
    title: "Receptor Studies",
    body: "Examine receptor binding, signaling pathways, and molecular mechanisms.",
  },
  {
    title: "Biochemical Assays",
    body: "Perform analytical tests to measure peptide activity and interactions.",
  },
];

const storage = [
  "Store lyophilized material at -20°C, dry and protected from light",
  "Keep containers sealed until laboratory use",
  "Protect from light and moisture",
  "Avoid repeated freeze-thaw cycles",
  "Keep sealed until ready for laboratory use",
];

const handling = [
  "Use appropriate personal protective equipment (PPE)",
  "Handle in a clean laboratory environment",
  "Follow standard laboratory safety protocols",
  "Avoid contamination with skin oils or foreign materials",
  "Dispose of materials according to local regulations",
];

const quality = [
  "Review the Certificate of Analysis (CoA) for each batch",
  "Verify identity purity via HPLC results (should be 99%+)",
  "Confirm molecular identity via mass spectrometry data",
  "Confirm the batch number matches the supplied CoA",
  "Report any quality concerns to support@ovoralabs.com",
];

function CheckIcon({ className = "w-5 h-5 text-accent" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-canvas border border-accent-mist text-sm font-medium text-accent-deep">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      {children}
    </span>
  );
}

export default function ResearchUsePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Research Use Only - Ovora Labs",
            description:
              "Information about research-use-only peptides and laboratory applications from Ovora Labs.",
            url: `${getSiteUrl()}/research-use`,
            publisher: {
              "@type": "Organization",
              name: "Ovora Labs",
              url: getSiteUrl(),
            },
          }),
        }}
      />

      <section className="relative w-full min-h-[50vh] lg:min-h-[60vh] overflow-hidden hero-glow">
        <div className="content-container relative z-20 h-full min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto py-16 lg:py-24 animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-line bg-white/80 px-4 py-2">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-ink-soft">Laboratory Grade</span>
            </div>
            <h1 className="mb-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Research Use Only
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-ink/70 leading-relaxed max-w-2xl mx-auto">
              Premium peptides for in-vitro research and laboratory applications.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-canvas">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-2 border border-line rounded-3xl p-8 lg:p-12 mb-16 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-3 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                For Research and Laboratory Use Only
              </h2>
              <p className="text-ink-soft text-lg max-w-2xl mx-auto mb-6">
                All products sold by Ovora Labs are intended strictly for in-vitro research,
                laboratory experimentation, and educational purposes. Products are not intended
                for human or veterinary use.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <XBadge>Not for Human Use</XBadge>
                <XBadge>Not for Veterinary Use</XBadge>
                <XBadge>Not for Food Use</XBadge>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl lg:text-3xl font-semibold text-ink text-center mb-10">
                Intended Research Applications
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <div
                    key={app.title}
                    className="bg-surface-2 rounded-2xl p-6 border border-line"
                  >
                    <div className="w-12 h-12 rounded-xl bg-canvas shadow-sm flex items-center justify-center mb-4 text-ink-soft">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-.612-1.478l.94-2.306a2 2 0 00-.416-2.279l-1.331-1.331a2 2 0 00-2.279-.416l-2.306.94a6.006 6.006 0 00-1.478-.612l-.477-2.387a2 2 0 00-.547-1.022L9.293 3.293a1 1 0 00-1.414 0L6.464 4.707a2 2 0 00-.547 1.022l-.477 2.387a6 6 0 00-1.478.612l-2.306-.94a2 2 0 00-2.279.416L-.954 9.535"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">{app.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{app.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-surface-2 to-surface-3 rounded-3xl p-8 lg:p-12 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                  Research-Grade Quality Standards
                </h2>
                <p className="text-ink-soft max-w-2xl mx-auto">
                  Every product meets rigorous quality standards to ensure reliable research
                  results.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-canvas rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">99%+</div>
                  <div className="font-semibold text-ink mb-1">Purity Verified</div>
                  <p className="text-sm text-muted">HPLC tested for purity verification</p>
                </div>
                <div className="bg-canvas rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">3rd</div>
                  <div className="font-semibold text-ink mb-1">Party Tested</div>
                  <p className="text-sm text-muted">Independent lab verification</p>
                </div>
                <div className="bg-canvas rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">CoA</div>
                  <div className="font-semibold text-ink mb-1">Included</div>
                  <p className="text-sm text-muted">
                    Certificate of Analysis with every batch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-2">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink text-center mb-10">
              Proper Handling Guidelines
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-canvas rounded-2xl p-6 border border-line">
                <h3 className="text-lg font-semibold text-ink mb-4">Storage Requirements</h3>
                <ul className="space-y-3">
                  {storage.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-canvas rounded-2xl p-6 border border-line">
                <h3 className="text-lg font-semibold text-ink mb-4">Handling Precautions</h3>
                <ul className="space-y-3">
                  {handling.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-canvas rounded-2xl p-6 border border-line">
                <h3 className="text-lg font-semibold text-ink mb-4">Quality Verification</h3>
                <ul className="space-y-3">
                  {quality.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-canvas">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-6">
              Researcher Responsibility
            </h2>
            <p className="text-muted text-lg mb-8">
              By purchasing from Ovora Labs, you acknowledge that you are a qualified researcher
              or are purchasing for legitimate research purposes, and you agree to use all
              products in accordance with applicable laws and regulations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/store"
                className="btn-primary"
              >
                Browse Products
              </Link>
              <Link
                href="/disclaimer"
                className="btn-secondary"
              >
                Read Full Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
