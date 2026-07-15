import type { Metadata } from "next";
import Link from "next/link";
import { Vial } from "@/components/Vial";

export const metadata: Metadata = {
  title: "Research Use Only | Laboratory Peptides",
  description:
    "Information about research-use-only peptides and laboratory applications from Ovora Labs.",
};

const applications = [
  {
    title: "Cell Culture Studies",
    body: "Investigate cellular responses and mechanisms in controlled laboratory environments.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-.612-1.478l.94-2.306a2 2 0 00-.416-2.279l-1.331-1.331a2 2 0 00-2.279-.416l-2.306.94a6 6 0 00-1.478-.612l-.477-2.387a2 2 0 00-.547-1.022L9.293 1.293a1 1 0 00-1.414 0L6.464 2.707a2 2 0 00-.547 1.022l-.477 2.387a6 6 0 00-1.478.612l-2.306-.94a2 2 0 00-2.279.416L-.954 7.535a2 2 0 00-.416 2.279l.94 2.306a6 6 0 00-.612 1.478l-2.387.477a2 2 0 00-1.022.547L-5.743 15.95a1 1 0 000 1.414l1.414 1.414a2 2 0 001.022.547l2.387.477a6 6 0 00.612 1.478l-.94 2.306a2 2 0 00.416 2.279l1.331 1.331a2 2 0 002.279.416l2.306-.94a6 6 0 001.478.612l.477 2.387a2 2 0 00.547 1.022l1.414 1.414a1 1 0 001.414 0l1.414-1.414a2 2 0 00.547-1.022l.477-2.387a6 6 0 001.478-.612l2.306.94a2 2 0 002.279-.416l1.331-1.331a2 2 0 00.416-2.279l-.94-2.306a6 6 0 00.612-1.478l2.387-.477a2 2 0 001.022-.547l1.414-1.414a1 1 0 000-1.414l-1.414-1.414z"
      />
    ),
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
  "Store lyophilized peptides at -20°C for long-term stability",
  "Refrigerate at 2-8°C for short-term storage (up to 4 weeks)",
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

function CheckIcon({ className = "w-5 h-5 text-[#7a8fd4]" }: { className?: string }) {
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
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f8fc] border border-[#c5ccef] text-sm font-medium text-[#5c6fbf]">
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
            publisher: {
              "@type": "Organization",
              name: "Ovora Labs",
            },
          }),
        }}
      />

      <section className="relative w-full min-h-[50vh] lg:min-h-[60vh] overflow-hidden hero-glow">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute left-[5%] lg:left-[8%] top-[15%] w-[15%] lg:w-[12%] z-0 vial-orbit-a">
            <Vial name="BPC-157" dose="10MG" theme="seafoam" tilt={-10} className="w-full h-auto" />
          </div>
          <div className="absolute right-[8%] lg:right-[12%] top-[10%] w-[18%] lg:w-[14%] z-10 vial-orbit-b">
            <Vial name="Retatrutide" dose="10MG" theme="mist" tilt={12} className="w-full h-auto" />
          </div>
          <div className="absolute left-[15%] lg:left-[20%] bottom-[5%] lg:bottom-[10%] w-[20%] lg:w-[16%] z-0 vial-orbit-c">
            <Vial name="NAD+" dose="250MG" theme="peach" tilt={6} className="w-full h-auto" />
          </div>
          <div className="absolute right-[5%] lg:right-[8%] bottom-[15%] w-[14%] lg:w-[10%] z-0 vial-orbit-d">
            <Vial name="GHK-Cu" dose="50MG" theme="lilac" tilt={-14} className="w-full h-auto" />
          </div>
        </div>

        <div className="content-container relative z-20 h-full min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto py-16 lg:py-24 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f8fc]/80 backdrop-blur-sm border border-black/5 mb-6">
              <svg className="w-4 h-4 text-[#7a8fd4]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-[#4a5168]">Laboratory Grade</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#1e2235] leading-[1.05] tracking-tight mb-4 lg:mb-6">
              Research Use Only
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#1e2235]/70 leading-relaxed max-w-2xl mx-auto">
              Premium peptides for in-vitro research and laboratory applications.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#f7f8fc]">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#eef0f8] border border-[#d5dbed] rounded-3xl p-8 lg:p-12 mb-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#e4e8f5] flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#7a8fd4]"
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
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#1e2235] mb-4">
                For Research and Laboratory Use Only
              </h2>
              <p className="text-[#4a5168] text-lg max-w-2xl mx-auto mb-6">
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
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#1e2235] text-center mb-10">
                Intended Research Applications
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <div
                    key={app.title}
                    className="bg-[#eef0f8] rounded-2xl p-6 border border-[#d5dbed]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#f7f8fc] shadow-sm flex items-center justify-center mb-4 text-[#4a5168]">
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
                    <h3 className="text-lg font-semibold text-[#1e2235] mb-2">{app.title}</h3>
                    <p className="text-sm text-[#6b7189] leading-relaxed">{app.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#eef0f8] to-[#e4e8f5] rounded-3xl p-8 lg:p-12 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-[#1e2235] mb-4">
                  Research-Grade Quality Standards
                </h2>
                <p className="text-[#4a5168] max-w-2xl mx-auto">
                  Every product meets rigorous quality standards to ensure reliable research
                  results.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-[#f7f8fc] rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#7a8fd4] mb-2">99%+</div>
                  <div className="font-semibold text-[#1e2235] mb-1">Purity Verified</div>
                  <p className="text-sm text-[#6b7189]">HPLC tested for purity verification</p>
                </div>
                <div className="bg-[#f7f8fc] rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#7a8fd4] mb-2">3rd</div>
                  <div className="font-semibold text-[#1e2235] mb-1">Party Tested</div>
                  <p className="text-sm text-[#6b7189]">Independent lab verification</p>
                </div>
                <div className="bg-[#f7f8fc] rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#7a8fd4] mb-2">CoA</div>
                  <div className="font-semibold text-[#1e2235] mb-1">Included</div>
                  <p className="text-sm text-[#6b7189]">
                    Certificate of Analysis with every batch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#eef0f8]">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#1e2235] text-center mb-10">
              Proper Handling Guidelines
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-[#f7f8fc] rounded-2xl p-6 border border-[#d5dbed]">
                <h3 className="text-lg font-semibold text-[#1e2235] mb-4">Storage Requirements</h3>
                <ul className="space-y-3">
                  {storage.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#4a5168]">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f7f8fc] rounded-2xl p-6 border border-[#d5dbed]">
                <h3 className="text-lg font-semibold text-[#1e2235] mb-4">Handling Precautions</h3>
                <ul className="space-y-3">
                  {handling.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#4a5168]">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f7f8fc] rounded-2xl p-6 border border-[#d5dbed]">
                <h3 className="text-lg font-semibold text-[#1e2235] mb-4">Quality Verification</h3>
                <ul className="space-y-3">
                  {quality.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#4a5168]">
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

      <section className="py-16 lg:py-24 bg-[#f7f8fc]">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#1e2235] mb-6">
              Researcher Responsibility
            </h2>
            <p className="text-[#6b7189] text-lg mb-8">
              By purchasing from Ovora Labs, you acknowledge that you are a qualified researcher
              or are purchasing for legitimate research purposes, and you agree to use all
              products in accordance with applicable laws and regulations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/store"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/disclaimer"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-black/15 text-[#1e2235] text-sm font-medium hover:bg-[#eef0f8] transition-colors"
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
