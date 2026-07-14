"use client";

import Link from "next/link";

export function CtaBand() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="content-container text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black leading-[1.35] mb-6 lg:mb-8 tracking-tight">
          All the research peptides you need, with the{" "}
          <span className="relative inline-block">
            <span className="relative z-10">peace of mind</span>
            <span className="absolute bottom-0 left-0 w-full h-[4px] lg:h-[5px] overflow-hidden rounded-full">
              <span className="absolute inset-0 bg-gradient-to-r from-[#b8e03f] via-[#7dd87d] to-[#4ade80] rounded-full origin-left animate-underline" />
            </span>
          </span>{" "}
          and research community at your fingertips.
        </h2>
        <Link
          href="/store"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50 border-t border-gray-100">
      <div className="content-container max-w-2xl mx-auto text-center">
        <h2 className="text-xl lg:text-2xl font-semibold text-black mb-2">
          Research updates from Ovora Labs
        </h2>
        <p className="text-sm text-black/60 mb-6">
          Subscribe for catalog updates, new research compounds, and quality documentation news
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="you@lab.edu"
            className="flex-1 h-11 px-4 rounded-full border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-black/15"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-black/40">
          For researchers and labs. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
