import type { Metadata } from "next";
import Link from "next/link";
import { products, formatPrice } from "@/data/products";

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
  const popular = products.filter((p) => p.popular).slice(0, 8);

  return (
    <>
      <section className="relative w-full min-h-[70vh] lg:min-h-[78vh] overflow-hidden hero-glow">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute left-[4%] lg:left-[8%] top-[18%] w-[14%] lg:w-[11%] z-0 animate-float-slow aspect-[1/1.5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/BPC157.webp" alt="" className="object-contain w-full h-full" />
          </div>
          <div className="absolute right-[6%] lg:right-[10%] top-[12%] w-[16%] lg:w-[12%] z-10 animate-float aspect-[1/1.5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/TB500.webp" alt="" className="object-contain w-full h-full" />
          </div>
          <div className="absolute left-[16%] lg:left-[22%] bottom-[8%] w-[18%] lg:w-[14%] z-0 animate-float-delayed aspect-[1/1.5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/NAD.webp" alt="" className="object-contain w-full h-full" />
          </div>
          <div className="absolute right-[4%] lg:right-[7%] bottom-[18%] w-[12%] lg:w-[9%] z-0 animate-float-slow aspect-[1/1.5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/GHK-Cu.png" alt="" className="object-contain w-full h-full" />
          </div>
          <div className="absolute left-[42%] top-[8%] w-[10%] lg:w-[8%] opacity-80 animate-float aspect-[1/1.5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/DSIP.webp" alt="" className="object-contain w-full h-full" />
          </div>
        </div>

        <div className="content-container relative z-20 h-full min-h-[70vh] lg:min-h-[78vh] flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto py-16 lg:py-24 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 mb-6">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Laboratory Grade · USA Based</span>
            </div>
            <h1 className="font-anek text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-black leading-[1.02] tracking-tight mb-4 lg:mb-6">
              Ovora Labs
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-black/70 leading-relaxed max-w-2xl mx-auto mb-8">
              Premium research-grade peptides with a 99%+ purity guarantee. Built for labs that
              demand documentation, consistency, and third-party verification.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/store"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
              >
                Shop Products
              </Link>
              <Link
                href="/research-use"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/90 border border-black/10 text-black text-sm font-medium hover:bg-white transition-colors"
              >
                Research Use Only
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="content-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-black tracking-tight mb-3">
              Why Choose Ovora Labs?
            </h2>
            <p className="text-black/60">
              The leading standard for research-grade peptides — purity, transparency, and US-based
              support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-black mb-2">{f.title}</h3>
                <p className="text-sm text-black/65 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="content-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-black tracking-tight mb-2">
                Popular Research Peptides
              </h2>
              <p className="text-black/60">99%+ purity · COA included · Lyophilized powder</p>
            </div>
            <Link href="/store" className="text-sm font-medium text-black underline underline-offset-4">
              View all products →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popular.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || "/images/bottle.png"}
                    alt={p.name}
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-black mb-1 group-hover:underline">{p.name}</h3>
                  <p className="text-xs text-black/50 line-clamp-2 mb-3">{p.description}</p>
                  <p className="text-sm font-medium text-black">From {formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="content-container">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">99%+</p>
                <p className="font-semibold text-black mb-1">Purity Verified</p>
                <p className="text-sm text-black/60">HPLC tested for purity verification</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">3rd</p>
                <p className="font-semibold text-black mb-1">Party Tested</p>
                <p className="text-sm text-black/60">Independent lab verification</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">CoA</p>
                <p className="font-semibold text-black mb-1">Included</p>
                <p className="text-sm text-black/60">Certificate of Analysis with every batch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="content-container max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-black text-center mb-10 tracking-tight">
            Fast Shipping & Shipment Protection
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-black/75">
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
              <li key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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
