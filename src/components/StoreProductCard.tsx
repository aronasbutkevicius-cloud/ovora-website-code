"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { familyCatalogPath, startingPrice, type ProductFamily } from "@/data/products";
import { formatPrice } from "@/lib/money";
import { storefront } from "@/lib/storefront";

export function StoreProductCard({ family }: { family: ProductFamily }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const preview = family.variants.reduce((best, variant) =>
    variant.price < best.price ? variant : best,
  );
  const multi = family.variants.length > 1;
  const href = familyCatalogPath(family);
  const showBadge =
    storefront.compareAtEnabled &&
    typeof preview.compareAtPrice === "number" &&
    preview.compareAtPrice > preview.price;
  const doses = family.variants.map((variant) => variant.dose).join(" / ");

  function addDefault() {
    addItem(
      {
        variantSlug: preview.slug,
        familySlug: family.slug,
        name: family.name,
        dose: preview.dose,
        price: preview.price,
        image: preview.image ?? family.image,
        form: family.form,
      },
      1,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="folio group flex min-w-0 flex-col">
      <Link href={href} className="specimen-well relative block h-40 sm:h-72">
        <span className="relative z-10 flex h-full items-end justify-center pb-2 sm:pb-4">
          <ProductVisual
            product={preview}
            className="h-[88%] w-auto max-w-[78%] transition-transform duration-500 group-hover:-translate-y-1 sm:h-[86%] sm:max-w-[68%]"
            sizes="(max-width: 640px) 42vw, 240px"
          />
        </span>
        {showBadge && (
          <span className="index-label absolute top-4 left-4">Compare-at</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-6 pb-10 pt-3 sm:px-7 sm:pb-11 sm:pt-4">
        <p className="index-label break-words leading-snug">
          {family.form === "liquid" ? "Supply" : "Single vial"} · {doses}
        </p>
        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <h2 className="min-w-0 break-words font-display text-base font-semibold leading-tight tracking-tight text-ink sm:text-2xl">
            <Link href={href}>{family.name}</Link>
          </h2>
          <p className="text-sm font-medium text-ink sm:shrink-0">
            {multi ? `From ${formatPrice(startingPrice(family))}` : formatPrice(preview.price)}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 border-t border-line pt-3 sm:mt-4 sm:gap-3">
          <Link href={`/coa#coa-${preview.slug}`} className="rounded-md border border-line bg-white px-2 py-1 text-[10px] font-semibold tracking-wide text-accent sm:px-2.5 sm:text-[11px]">
            ≥99% · COA
          </Link>
          <button type="button" onClick={addDefault} className="text-xs font-medium text-accent hover:text-ink sm:text-sm">
            {added ? "Added" : "Add vial"}
          </button>
        </div>
      </div>
    </article>
  );
}
