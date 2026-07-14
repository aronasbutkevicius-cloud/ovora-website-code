import type { Metadata } from "next";
import Link from "next/link";
import { products, formatPrice } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse research-grade peptides from Ovora Labs. 99%+ purity. COA included.",
};

const filters = [
  { id: "all", label: "All Peptides" },
  { id: "peptide", label: "Singles" },
  { id: "blend", label: "Blends" },
  { id: "spray", label: "Sprays" },
  { id: "accessory", label: "Accessories" },
] as const;

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <section className="py-12 lg:py-16 bg-white min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight mb-3">
            All Products
          </h1>
          <p className="text-black/60 text-lg">
            Research-grade peptides with Certificate of Analysis, 99%+ purity verification, and
            lyophilized powder in sterile vials.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => {
            const active = category === f.id;
            const href = f.id === "all" ? "/store" : `/store?category=${f.id}`;
            return (
              <Link
                key={f.id}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black/70 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        <p className="text-sm text-black/50 mb-6">{filtered.length} products</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
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
                <p className="text-[11px] uppercase tracking-wider text-black/40 mb-1">
                  {p.category}
                </p>
                <h2 className="font-semibold text-black mb-1 group-hover:underline">{p.name}</h2>
                <p className="text-xs text-black/50 line-clamp-2 mb-3">{p.description}</p>
                <p className="text-sm font-medium text-black">From {formatPrice(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
