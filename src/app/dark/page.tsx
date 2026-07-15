import Link from "next/link";
import type { Metadata } from "next";
import { DarkVial } from "@/components/dark/DarkVial";
import { darkProducts, formatDarkPrice } from "@/data/darkProducts";

export const metadata: Metadata = {
  title: "Dark Ovora Labs",
  description: "The dark shelf — anabolic compounds catalog.",
};

export default function DarkHomePage() {
  const featured = darkProducts.slice(0, 8);

  return (
    <>
      <section className="relative overflow-hidden border-b border-red-500/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-red-600/15 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-purple-700/10 blur-[90px]" />
        </div>
        <div className="content-container relative py-20 lg:py-28 text-center">
          <p className="text-red-500 text-xs tracking-[0.35em] uppercase mb-4 font-medium">
            You found the wrong door
          </p>
          <h1 className="font-anek text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-5">
            Dark Ovora Labs
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Peptides stay in the light. Down here it&apos;s Test E, Tren A, Anadrol, Superdrol,
            Anavar, Halo, HGH, Primo, Mast — and the rest of the vault.
          </p>
          <Link
            href="/dark/store"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition-colors shadow-[0_0_30px_rgba(255,0,64,0.35)]"
          >
            Enter the vault
          </Link>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="content-container">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                Featured compounds
              </h2>
              <p className="text-zinc-500 text-sm mt-1">Oils, orals, and the nuclear options.</p>
            </div>
            <Link href="/dark/store" className="text-sm text-red-400 hover:text-red-300 underline underline-offset-4">
              View all
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/dark/products/${p.slug}`}
                className="group rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden hover:border-red-500/40 hover:shadow-[0_0_24px_rgba(255,0,64,0.15)] transition-all"
              >
                <div className="aspect-[4/5] bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center p-6">
                  <DarkVial product={p} className="w-[70%] h-auto group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 border-t border-white/5">
                  <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{p.dose}</p>
                  <p className="text-sm text-zinc-300 mt-2">{formatDarkPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/5">
        <div className="content-container text-center max-w-2xl mx-auto">
          <p className="text-zinc-500 text-sm leading-relaxed">
            Satirical dark-mode catalog. Not medical advice. If you meant research peptides,{" "}
            <Link href="/" className="text-red-400 underline underline-offset-2">
              escape back to the light
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
