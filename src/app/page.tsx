import type { Metadata } from "next";
import Link from "next/link";
import { FloatingVials } from "@/components/FloatingVials";
import { ProductVisual } from "@/components/ProductVisual";
import {
  doseOptionsLabel,
  formatPrice,
  getProductFamilies,
  startingPrice,
} from "@/data/products";

export const metadata: Metadata = {
  title: "Ovora Labs — Premium Research Grade Peptides",
  description:
    "USA-based supplier of research-grade peptides with 99%+ purity. Third-party tested. Research use only.",
};

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
    body: "Every batch is independently checked for identity and content by ISO 17025 accredited laboratories. We publish full Certificates of Analysis (COA) for complete transparency.",
  },
  {
    title: "Controlled Synthesis Process",
    body: "Our manufacturing follows documented internal quality procedures designed to support consistency from batch to batch.",
  },
];

export default function HomePage() {
  const popular = getProductFamilies()
    .filter((family) => family.popular)
    .slice(0, 8);

  return (
    <>
      <section className="relative w-full min-h-[70vh] lg:min-h-[78vh] overflow-hidden hero-glow">
        <FloatingVials />

        <div className="content-container relative z-20 h-full min-h-[70vh] lg:min-h-[78vh] flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto py-16 lg:py-24 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#d5dbed] mb-6">
              <svg className="w-4 h-4 text-[#7a8fd4]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-[#4a5168]">
                Laboratory Grade · USA Based
              </span>
            </div>
            <h1 className="font-anek text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#1e2235] leading-[1.02] tracking-tight mb-4 lg:mb-6">
              Ovora Labs
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#4a5168] leading-relaxed max-w-2xl mx-auto mb-8">
              Premium research-grade peptides with a 99%+ purity guarantee. Built for labs that
              demand documentation, consistency, and third-party verification.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/store"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
              >
                Shop Products
              </Link>
              <Link
                href="/research-use"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/90 border border-[#d5dbed] text-[#1e2235] text-sm font-medium hover:bg-white transition-colors"
              >
                Research Use Only
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 bg-[#f7f8fc] overflow-hidden">
        <div className="content-container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1e2235] tracking-tight mb-3">
              Why Choose Ovora Labs?
            </h2>
            <p className="text-[#6b7189]">
              The leading standard for research-grade peptides — purity, transparency, and US-based
              support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`bg-[#eef0f8]/90 backdrop-blur-sm rounded-2xl p-6 border border-[#d5dbed] hover-lift reveal reveal-delay-${(i % 3) + 1}`}
              >
                <h3 className="text-lg font-semibold text-[#1e2235] mb-2">{f.title}</h3>
                <p className="text-sm text-[#4a5168] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 bg-[#e4e8f5]/50 overflow-hidden">
        <div className="content-container relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 reveal">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1e2235] tracking-tight mb-2">
                Popular Research Peptides
              </h2>
              <p className="text-[#6b7189]">99%+ purity · COA included · Lyophilized powder</p>
            </div>
            <Link
              href="/store"
              className="text-sm font-medium text-[#1e2235] underline underline-offset-4"
            >
              View all products →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popular.map((family) => {
              const preview = family.variants[0];
              const multi = family.variants.length > 1;
              const fromPrice = startingPrice(family);
              return (
                <Link
                  key={family.slug}
                  href={`/products/${family.slug}`}
                  className="group bg-[#f7f8fc]/95 rounded-2xl border border-[#d5dbed] overflow-hidden hover-lift"
                >
                  <div className="aspect-[4/3] bg-gradient-to-b from-[#eef0f8] to-[#f7f8fc] flex items-center justify-center p-6 relative">
                    <ProductVisual
                      product={preview}
                      className="h-40 w-auto group-hover:scale-105 transition-transform duration-500 relative z-10"
                      sizes="(max-width: 768px) 45vw, 220px"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[#1e2235] mb-1 group-hover:underline">
                      {family.name}
                    </h3>
                    <p className="text-xs text-[#8a90a8] mb-2">{doseOptionsLabel(family)}</p>
                    <p className="text-xs text-[#6b7189] line-clamp-2 mb-3">{family.description}</p>
                    <p className="text-sm font-medium text-[#1e2235]">
                      {multi ? `From ${formatPrice(fromPrice)}` : formatPrice(fromPrice)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#f7f8fc]">
        <div className="content-container">
          <div className="relative bg-gradient-to-br from-[#eef0f8] to-[#e4e8f5] rounded-3xl p-8 lg:p-12 border border-[#d5dbed] overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-3 gap-8 text-center">
              <div className="stat-pulse">
                <p className="text-4xl font-bold text-[#7a8fd4] mb-2">99%+</p>
                <p className="font-semibold text-[#1e2235] mb-1">Purity Verified</p>
                <p className="text-sm text-[#6b7189]">HPLC tested for purity verification</p>
              </div>
              <div className="stat-pulse" style={{ animationDelay: "0.6s" }}>
                <p className="text-4xl font-bold text-[#7a8fd4] mb-2">3rd</p>
                <p className="font-semibold text-[#1e2235] mb-1">Party Tested</p>
                <p className="text-sm text-[#6b7189]">Independent lab verification</p>
              </div>
              <div className="stat-pulse" style={{ animationDelay: "1.2s" }}>
                <p className="text-4xl font-bold text-[#7a8fd4] mb-2">CoA</p>
                <p className="font-semibold text-[#1e2235] mb-1">Included</p>
                <p className="text-sm text-[#6b7189]">Certificate of Analysis with every batch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 bg-[#e4e8f5]/40 overflow-hidden">
        <div className="content-container max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl font-semibold text-[#1e2235] text-center mb-10 tracking-tight reveal">
            Fast Shipping & Shipment Protection
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-[#4a5168]">
            {[
              "Orders processed within 0–2 business days",
              "Overnight delivery available",
              "Free shipping on orders over $150",
              "Free shipment protection on every order",
              "Discreet packaging",
              "Tracking provided on all orders",
              "Damaged products replaced at no cost",
              "USA-based customer support",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-[#f7f8fc]/95 rounded-xl p-4 border border-[#d5dbed] hover-lift"
              >
                <svg
                  className="w-5 h-5 text-[#7a8fd4] shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
