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
    <article className="group relative flex flex-col border border-white/10 bg-[#070c18]">
      <Link href={href} className="relative block h-72 overflow-hidden">
        <span className="pointer-events-none absolute inset-x-10 bottom-8 h-16 rounded-full bg-[#345bd4]/25 blur-2xl" />
        <span className="pointer-events-none absolute inset-x-16 bottom-10 h-2 rounded-full bg-white/10 blur-md" />
        <span className="relative z-10 flex h-full items-end justify-center pb-6">
          <ProductVisual
            product={preview}
            className="h-[88%] w-auto max-w-[70%] transition-transform duration-500 group-hover:-translate-y-1"
            sizes="(max-width: 768px) 70vw, 240px"
          />
        </span>
        {showBadge && (
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Compare-at
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070c18] to-transparent px-4 pb-3 pt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-ink opacity-0 transition-opacity group-hover:opacity-100">
          Open record
        </span>
      </Link>
      <div className="border-t border-white/10 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {family.form === "liquid" ? "Supply" : "Vial"} · {doses}
        </p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            <Link href={href}>{family.name}</Link>
          </h2>
          <p className="font-mono text-sm text-ink">
            {multi ? `From ${formatPrice(startingPrice(family))}` : formatPrice(preview.price)}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link href={`/coa#coa-${preview.slug}`} className="text-muted hover:text-ink">
            ≥99% · COA
          </Link>
          <button type="button" onClick={addDefault} className="text-accent hover:text-ink">
            {added ? "Added" : "Add vial"}
          </button>
        </div>
      </div>
    </article>
  );
}
