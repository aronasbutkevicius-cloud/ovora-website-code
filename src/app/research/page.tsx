import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageBits";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Research Library" };

export default function ResearchPage() {
  const featured = products.filter((p) => p.popular).slice(0, 6);

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="content-container">
        <PageHero
          title="Research Library"
          subtitle="Compound overviews and documentation context for laboratory investigators."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="font-semibold text-black mb-2">{p.name}</h2>
              <p className="text-sm text-black/60 line-clamp-3 mb-3">{p.description}</p>
              <span className="text-xs font-medium underline underline-offset-4">
                View product →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-sm text-black/55 max-w-2xl">
          For handling, storage, and research-use policies, see our{" "}
          <Link href="/research-use" className="underline text-black">
            Research Use Only
          </Link>{" "}
          page.
        </p>
      </div>
    </section>
  );
}
