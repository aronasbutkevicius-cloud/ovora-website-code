"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AcceptedPayments } from "@/components/AcceptedPayments";
import { useCart } from "@/components/CartProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { ShipCountdown } from "@/components/ShipCountdown";
import { ProductCompliance } from "@/components/ProductCompliance";
import { vialThemes } from "@/data/vialThemes";
import type { Product, ProductFamily } from "@/data/products";
import { formatCents, formatPrice, toCents } from "@/lib/money";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { activeBundle, lineCentsFor, storefront } from "@/lib/storefront";

type Props = {
  family: ProductFamily;
  initialSize?: string;
};

function matchVariant(family: ProductFamily, size?: string) {
  if (!size) return family.variants[0];
  const needle = size.trim().toLowerCase();
  return (
    family.variants.find(
      (variant) => variant.dose.toLowerCase() === needle || variant.slug.toLowerCase() === needle,
    ) ?? family.variants[0]
  );
}

export function ProductPurchasePanel({ family, initialSize }: Props) {
  const { addItem } = useCart();
  const initial = matchVariant(family, initialSize);
  const [slug, setSlug] = useState(initial.slug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = family.variants.find((item) => item.slug === slug) ?? family.variants[0];
  const isSupply = family.form === "liquid";
  const tint = vialThemes[variant.theme]?.glass ?? "#dfe7f6";
  const totalCents = lineCentsFor(toCents(variant.price), quantity, family.form);
  const rate = activeBundle(quantity, family.form).rate;
  const showCompare =
    storefront.compareAtEnabled &&
    typeof variant.compareAtPrice === "number" &&
    variant.compareAtPrice > variant.price;

  const tiers = useMemo(() => (isSupply ? [] : storefront.bundles), [isSupply]);

  function chooseSize(next: Product) {
    setSlug(next.slug);
    setAdded(false);
    const url = new URL(window.location.href);
    url.pathname = `/products/${family.slug}`;
    url.searchParams.set("size", next.dose);
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  function handleAdd() {
    addItem(
      {
        variantSlug: variant.slug,
        familySlug: family.slug,
        name: family.name,
        dose: variant.dose,
        price: variant.price,
        image: variant.image ?? family.image,
        form: family.form,
      },
      quantity,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div>
        <div
          className="relative aspect-square overflow-hidden rounded-3xl border border-line"
          style={{ background: `linear-gradient(180deg, ${tint}, rgba(7,12,24,0.2))` }}
        >
          <div className="absolute inset-4 flex items-center justify-center sm:inset-8">
            <ProductVisual
              key={variant.slug}
              product={variant}
              className="h-full w-auto max-w-full"
              sizes="(max-width: 1024px) 90vw, 480px"
              priority
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center h-8 px-3 rounded-full border border-line bg-white/5 text-xs text-ink-soft">
            Third-party tested
          </span>
          <span className="inline-flex items-center h-8 px-3 rounded-full border border-line bg-white/5 text-xs text-ink-soft">
            ≥99% purity
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-accent font-medium mb-3">
          {isSupply ? "Laboratory supply · Research use" : "Single vial · Research use"}
        </p>
        <h1 className="text-3xl lg:text-5xl font-semibold text-ink tracking-tight mb-4">{family.name}</h1>
        <p className="text-ink-soft text-lg leading-relaxed mb-6">{variant.description}</p>

        {family.variants.length > 1 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-ink mb-3">Vial size</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Vial size">
              {family.variants.map((option) => {
                const active = option.slug === variant.slug;
                return (
                  <button
                    key={option.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => chooseSize(option)}
                    className={`inline-flex items-center justify-center min-w-[4.5rem] px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                      active
                        ? "bg-brand text-on-ink border-brand"
                        : "bg-white/5 text-ink-soft border-line hover:text-ink"
                    }`}
                  >
                    {option.dose}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {tiers.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-ink mb-3">Quantity</p>
            <div className="grid sm:grid-cols-3 gap-2">
              {tiers.map((tier) => {
                const selected = quantity === tier.quantity;
                const each = lineCentsFor(toCents(variant.price), tier.quantity, family.form);
                return (
                  <button
                    key={tier.quantity}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setQuantity(tier.quantity)}
                    className={`rounded-2xl border px-3 py-3 text-left transition-colors ${
                      selected ? "border-accent bg-white/10" : "border-line bg-white/5 hover:border-accent"
                    }`}
                  >
                    {tier.badge && (
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-accent mb-1">
                        {tier.badge}
                      </span>
                    )}
                    <span className="block text-sm font-semibold text-ink">
                      {tier.quantity} vial{tier.quantity === 1 ? "" : "s"}
                    </span>
                    <span className="block text-xs text-muted mt-1">
                      {tier.rate > 0 ? `${Math.round(tier.rate * 100)}% off · ` : ""}
                      {formatCents(each)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-end gap-4 mb-4">
          <div>
            {showCompare && (
              <p className="text-sm text-muted line-through">{formatPrice(variant.compareAtPrice ?? 0)}</p>
            )}
            <p className="text-3xl font-semibold text-ink">
              {formatPrice(variant.price)}{" "}
              <span className="text-base font-normal text-muted">USD / vial</span>
            </p>
            {rate > 0 && (
              <p className="text-sm text-accent mt-1">{Math.round(rate * 100)}% off this quantity</p>
            )}
          </div>
          <label className="inline-flex items-center gap-2 h-12 px-4 rounded-full border border-line bg-surface">
            <span className="text-xs uppercase tracking-wide text-muted">Qty</span>
            <input
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))
              }
              className="w-14 bg-transparent text-ink font-medium outline-none"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full inline-flex items-center justify-center h-12 px-8 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors"
        >
          {added ? "Added to cart" : `Add ${quantity} · ${formatCents(totalCents)}`}
        </button>

        {added && (
          <p className="mt-3 text-sm text-accent">
            {variant.dose} added.{" "}
            <Link href="/cart" className="underline hover:text-ink">
              View cart
            </Link>
          </p>
        )}

        <div className="mt-4">
          {variant.coaPdf ? (
            <a
              href={variant.coaPdf}
              download
              className="inline-flex items-center justify-center h-11 px-5 rounded-full border border-line text-sm text-ink hover:bg-white/10"
            >
              Download certificate of analysis
            </a>
          ) : (
            <Link
              href={`/coa#coa-${variant.slug}`}
              className="inline-flex items-center justify-center h-11 px-5 rounded-full border border-line text-sm text-ink hover:bg-white/10"
            >
              ≥99% purity · View COA
            </Link>
          )}
        </div>

        <div className="mt-8 space-y-4 rounded-2xl border border-line glass-panel p-5">
          <ShipCountdown />
          <p className="text-sm text-ink-soft leading-relaxed">
            Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}. Every order includes
            shipment protection. Overnight delivery is available, and tracking is sent on all orders.
          </p>
          <ul className="text-sm text-ink-soft space-y-1.5">
            <li>Orders processed within 0–2 business days</li>
            <li>Same-day shipping when ordered before 3:30 PM Central</li>
            <li>Damaged vials replaced at no cost</li>
          </ul>
          <AcceptedPayments />
        </div>

        <p className="mt-4 text-xs text-muted leading-relaxed max-w-md">
          For laboratory and research use only. Not for human or veterinary consumption.
        </p>
        <ProductCompliance family={family} variant={variant} />
      </div>
    </div>
  );
}
