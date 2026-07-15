import Link from "next/link";
import type { Metadata } from "next";
import { DarkVial } from "@/components/dark/DarkVial";
import { darkProducts, formatDarkPrice } from "@/data/darkProducts";

export const metadata: Metadata = {
  title: "Compounds",
  description: "Dark Ovora Labs anabolic compound catalog.",
};

export default function DarkStorePage() {
  return (
    <section className="py-12 lg:py-16 min-h-[60vh]">
      <div className="content-container">
        <h1 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-3">
          The Vault
        </h1>
        <p className="text-zinc-500 text-lg mb-2">
          Anabolics, orals, and oils — Dark Ovora Labs edition.
        </p>
        <p className="text-sm text-zinc-600 mb-10">{darkProducts.length} compounds</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {darkProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/dark/products/${product.slug}`}
              className="group rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden hover:border-red-500/40 hover:shadow-[0_0_24px_rgba(255,0,64,0.12)] transition-all"
            >
              <div className="aspect-[4/5] bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center p-5">
                <DarkVial
                  product={product}
                  className="w-[72%] h-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 border-t border-white/5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                    {product.name}
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-600 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                    {product.form}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mb-2">{product.dose}</p>
                <p className="text-xs text-zinc-600 line-clamp-2 mb-3">{product.description}</p>
                <p className="text-sm font-medium text-zinc-200">{formatDarkPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
