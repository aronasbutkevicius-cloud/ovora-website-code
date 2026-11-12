"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { vialThemes } from "@/data/vialThemes";
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
  const tint = vialThemes[preview.theme]?.glass ?? "#dfe7f6";
  const href = familyCatalogPath(family);
  const showBadge =
    storefront.compareAtEnabled &&
    typeof preview.compareAtPrice === "number" &&
    preview.compareAtPrice > preview.price;

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
    <article className="group glass-panel rounded-2xl border border-line overflow-hidden hover-lift flex flex-col">
      <div className="relative aspect-[4/5]" style={{ background: tint }}>
        {showBadge && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-ink">
            Sale
          </span>
        )}
        <Link href={href} className="absolute inset-3 flex items-center justify-center sm:inset-4">
          <ProductVisual
            product={preview}
            className="h-full w-auto max-w-full group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 90vw, 280px"
          />
        </Link>
        <Link
          href={`/coa#coa-${preview.slug}`}
          className="absolute left-3 bottom-3 z-10 inline-flex items-center h-8 px-3 rounded-full bg-[#070c18]/75 text-[11px] font-medium text-ink border border-white/15"
        >
          ≥99% purity · View COA
        </Link>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-placeholder mb-1">
            {family.form === "liquid" ? "Laboratory supply" : "Single vial"}
          </p>
          <h2 className="font-semibold text-ink">
            <Link href={href} className="hover:underline">
              {family.name}
            </Link>
          </h2>
          <p className="text-xs text-placeholder mt-1">{family.variants.map((variant) => variant.dose).join(" · ")}</p>
        </div>
        <p className="text-sm font-medium text-ink mt-auto">
          {multi ? `From ${formatPrice(startingPrice(family))}` : formatPrice(preview.price)}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center h-10 rounded-full border border-line text-sm text-ink hover:bg-white/10"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={addDefault}
            className="inline-flex items-center justify-center h-10 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover"
          >
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
