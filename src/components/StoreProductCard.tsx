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
    <article className="folio group flex flex-col">
      <Link href={href} className="specimen-well relative block h-72">
        <span className="relative z-10 flex h-full items-end justify-center pb-4">
          <ProductVisual
            product={preview}
            className="h-[86%] w-auto max-w-[68%] transition-transform duration-500 group-hover:-translate-y-1"
            sizes="(max-width: 768px) 70vw, 240px"
          />
        </span>
        {showBadge && (
          <span className="index-label absolute top-4 left-4">Compare-at</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <p className="index-label">
          {family.form === "liquid" ? "Supply" : "Single vial"} · {doses}
        </p>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
            <Link href={href}>{family.name}</Link>
          </h2>
          <p className="shrink-0 text-sm font-medium text-ink">
            {multi ? `From ${formatPrice(startingPrice(family))}` : formatPrice(preview.price)}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
          <Link href={`/coa#coa-${preview.slug}`} className="rounded-md border border-line bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent">
            ≥99% · COA
          </Link>
          <button type="button" onClick={addDefault} className="text-sm font-medium text-accent hover:text-ink">
            {added ? "Added" : "Add vial"}
          </button>
        </div>
      </div>
    </article>
  );
}
