import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on the Ovora Labs site.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-20 lg:py-28 bg-canvas min-h-[60vh]">
      <div className="content-container max-w-xl">
        <p className="text-sm font-medium tracking-wide text-accent mb-3">404</p>
        <h1 className="text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-muted text-lg mb-8">
          That address is not part of this site. Try the catalog or go back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors"
          >
            Home
          </Link>
          <Link
            href="/store"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-line text-ink text-sm font-medium hover:bg-surface-2 transition-colors"
          >
            Browse products
          </Link>
        </div>
      </div>
    </section>
  );
}
