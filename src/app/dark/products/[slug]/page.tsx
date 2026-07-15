import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DarkVial } from "@/components/dark/DarkVial";
import { darkProducts, formatDarkPrice, getDarkProduct } from "@/data/darkProducts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return darkProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getDarkProduct(slug);
  if (!product) return { title: "Not found" };
  return { title: `${product.name} | Dark Ovora Labs` };
}

export default async function DarkProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getDarkProduct(slug);
  if (!product) notFound();

  return (
    <section className="py-12 lg:py-16">
      <div className="content-container">
        <div className="mb-6 text-sm text-zinc-500">
          <Link href="/dark/store" className="hover:text-red-400">
            Vault
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black aspect-square flex items-center justify-center p-10">
            <DarkVial product={product} className="w-[55%] h-auto" />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium mb-4 border border-red-500/20">
              {product.form.toUpperCase()} · DARK SHELF
            </span>
            <h1 className="text-3xl lg:text-5xl font-semibold text-white tracking-tight mb-4">
              {product.name}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">{product.description}</p>
            {product.alsoKnownAs && (
              <p className="text-sm text-zinc-500 mb-6">
                <span className="font-medium text-zinc-400">Also known as: </span>
                {product.alsoKnownAs.join(", ")}
              </p>
            )}

            <dl className="grid grid-cols-2 gap-3 mb-8">
              <div className="rounded-xl p-4 border border-white/10 bg-zinc-950">
                <dt className="text-zinc-500 text-sm mb-1">Strength</dt>
                <dd className="font-semibold text-white">{product.dose}</dd>
              </div>
              <div className="rounded-xl p-4 border border-white/10 bg-zinc-950">
                <dt className="text-zinc-500 text-sm mb-1">Form</dt>
                <dd className="font-semibold text-white capitalize">{product.form}</dd>
              </div>
            </dl>

            <p className="text-3xl font-semibold text-white mb-6">
              {formatDarkPrice(product.price)}{" "}
              <span className="text-base font-normal text-zinc-500">USD</span>
            </p>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition-colors shadow-[0_0_24px_rgba(255,0,64,0.3)]"
            >
              Add to vault cart
            </button>

            <p className="mt-6 text-xs text-zinc-600 leading-relaxed max-w-md">
              Satirical dark-mode listing.{" "}
              <Link href="/" className="underline hover:text-red-400">
                Return to Ovora Labs research peptides
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
