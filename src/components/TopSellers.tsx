import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import {
  doseOptionsLabel,
  familyCatalogPath,
  startingPrice,
  type ProductFamily,
} from "@/data/products";
import { getSession } from "@/lib/auth/session";
import { PRODUCT_USE_STATEMENT } from "@/lib/compliance";
import { formatPrice } from "@/lib/money";
import { getTopSellers } from "@/lib/top-sellers";

function previewVariant(family: ProductFamily) {
  return family.variants.reduce((best, variant) => (variant.price < best.price ? variant : best));
}

function TopSellerCard({ family }: { family: ProductFamily }) {
  const preview = previewVariant(family);
  const href = familyCatalogPath(family);
  const multi = family.variants.length > 1;
  const price = multi ? `From ${formatPrice(startingPrice(family))}` : formatPrice(preview.price);
  const kind = family.form === "liquid" ? "Supply" : "Single vial";

  return (
    <article className="folio group flex h-full flex-col">
      <Link
        href={href}
        className="flex h-full flex-col rounded-[1.35rem] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="specimen-well relative block h-64 sm:h-72">
          <span className="relative z-10 flex h-full items-end justify-center pb-4">
            <ProductVisual
              product={preview}
              className="h-[86%] w-auto max-w-[68%] transition-transform duration-500 group-hover:-translate-y-1"
              sizes="(max-width: 640px) 80vw, 240px"
            />
          </span>
        </span>
        <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <span className="index-label">
            {kind} · {doseOptionsLabel(family)}
          </span>
          <span className="mt-2 flex items-baseline justify-between gap-3">
            <span className="font-display text-2xl font-medium tracking-tight text-ink">{family.name}</span>
            <span className="shrink-0 text-sm font-medium text-ink">{price}</span>
          </span>
          <span className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
            <span className="rounded-md border border-line bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent">
              ≥99% · COA
            </span>
            <span className="text-sm font-medium text-accent">View vial</span>
          </span>
        </span>
      </Link>
    </article>
  );
}

export async function TopSellers() {
  const session = await getSession();
  if (!session) return null;

  const { families, source } = await getTopSellers();
  if (families.length === 0) return null;

  return (
    <section
      aria-labelledby="top-sellers-heading"
      className="relative pb-4 pt-2 lg:pb-8"
      data-ranking={source}
    >
      <div className="content-container">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="index-label">Catalog</p>
            <h2
              id="top-sellers-heading"
              className="mt-3 font-display text-4xl font-medium tracking-tight text-ink lg:text-5xl"
            >
              Top sellers
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{PRODUCT_USE_STATEMENT}</p>
          </div>
          <Link href="/store" className="text-sm font-medium text-accent underline underline-offset-4">
            Browse catalog
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {families.map((family) => (
            <TopSellerCard key={family.slug} family={family} />
          ))}
        </div>
      </div>
    </section>
  );
}
