"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AcceptedPayments } from "@/components/AcceptedPayments";
import { useCart } from "@/components/CartProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { ShipCountdown } from "@/components/ShipCountdown";
import { ProductCompliance } from "@/components/ProductCompliance";
import type { Product, ProductFamily } from "@/data/products";
import { formatCents, formatPrice, toCents } from "@/lib/money";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { lineCentsFor, storefront } from "@/lib/storefront";

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
  const totalCents = lineCentsFor(toCents(variant.price), quantity, family.form);
  const applied = storefront.bundles.reduce((best, tier) =>
    !isSupply && quantity >= tier.quantity ? tier : best,
  );
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
    <div className="grid items-start gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="relative flex min-h-[560px] items-end justify-center overflow-visible">
          <span className="pointer-events-none absolute bottom-16 left-1/2 h-24 w-56 -translate-x-1/2 rounded-full bg-[#345bd4]/30 blur-3xl" />
          <span className="pointer-events-none absolute bottom-20 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full bg-white/15 blur-md" />
          <span className="pointer-events-none absolute inset-x-8 top-6 bottom-10 border border-white/10" />
          <ProductVisual
            key={variant.slug}
            product={variant}
            className="relative z-10 h-[480px] w-auto max-w-[78%]"
            sizes="(max-width: 1024px) 80vw, 420px"
            priority
          />
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Specimen {variant.slug}
        </p>
      </div>

      <div className="lg:col-span-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          {isSupply ? "Laboratory supply" : "Single vial"} · Research use only
        </p>
        <h1 className="mt-3 font-anek text-5xl font-semibold tracking-tight text-ink lg:text-6xl">
          {family.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">{variant.description}</p>

        {family.variants.length > 1 && (
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Vial size</p>
            <div className="relative mt-4" role="group" aria-label="Vial size">
              <div className="absolute left-0 right-0 top-3 h-px bg-white/15" />
              <div className="relative flex justify-between gap-2">
                {family.variants.map((option) => {
                  const active = option.slug === variant.slug;
                  return (
                    <button
                      key={option.slug}
                      type="button"
                      aria-pressed={active}
                      onClick={() => chooseSize(option)}
                      className="flex min-w-0 flex-1 flex-col items-center"
                    >
                      <span className={`w-px ${active ? "h-6 bg-accent" : "h-3 bg-white/30"}`} />
                      <span
                        className={`mt-2 font-mono text-xs tracking-wide ${active ? "text-ink" : "text-muted"}`}
                      >
                        {option.dose}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tiers.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Quantity</p>
            <div className="mt-3 flex flex-wrap gap-6">
              {tiers.map((tier) => {
                const selected = quantity === tier.quantity;
                const each = lineCentsFor(toCents(variant.price), tier.quantity, family.form);
                return (
                  <button
                    key={tier.quantity}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setQuantity(tier.quantity)}
                    className={`flex items-end gap-2 border-b pb-2 ${selected ? "border-accent" : "border-transparent"}`}
                  >
                    <span className="flex items-end gap-1" aria-hidden="true">
                      {Array.from({ length: tier.quantity }).map((_, index) => (
                        <span
                          key={index}
                          className={`block w-2.5 rounded-sm border ${
                            selected ? "h-8 border-accent bg-accent/20" : "h-6 border-white/25"
                          }`}
                        />
                      ))}
                    </span>
                    <span className="text-left">
                      {tier.badge && (
                        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                          {tier.badge}
                        </span>
                      )}
                      <span className="block font-mono text-xs text-ink">
                        {tier.rate > 0 ? `${Math.round(tier.rate * 100)}% off · ` : ""}
                        {formatCents(each)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-white/10 py-5">
          <div>
            {showCompare && (
              <p className="font-mono text-sm text-muted line-through">
                {formatPrice(variant.compareAtPrice ?? 0)}
              </p>
            )}
            <p className="text-4xl font-semibold tracking-tight text-ink">{formatPrice(variant.price)}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">USD per vial</p>
            {applied.rate > 0 && (
              <p className="mt-1 font-mono text-xs text-accent">
                {Math.round(applied.rate * 100)}% off this quantity
              </p>
            )}
          </div>
          <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Qty
            <input
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))
              }
              className="w-16 border-b border-white/20 bg-transparent py-1 text-lg text-ink outline-none"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-5 w-full border border-accent bg-brand py-4 font-mono text-xs uppercase tracking-[0.2em] text-on-ink hover:bg-brand-hover"
        >
          {added ? "Placed on the bench" : `Add ${quantity} · ${formatCents(totalCents)}`}
        </button>
        {added && (
          <p className="mt-3 font-mono text-xs text-accent">
            {variant.dose} added.{" "}
            <Link href="/cart" className="underline">
              View cart
            </Link>
          </p>
        )}

        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Datasheet</p>
          <table className="mt-3 w-full border-collapse font-mono text-xs">
            <tbody>
              {[
                ["Dose", variant.dose],
                ["Form", isSupply ? "Liquid" : "Lyophilized powder"],
                ["Unit", "Single vial"],
                ["CAS", variant.cas],
                ["Molecular weight", variant.molecularWeight],
                ["Storage", variant.storage],
                ["Purity", "≥99% (HPLC), third-party identity check"],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-white/10">
                  <th className="w-40 py-2 pr-4 text-left font-medium text-muted">{label}</th>
                  <td className="py-2 text-ink">{value}</td>
                </tr>
              ))}
              <tr className="border-b border-white/10">
                <th className="py-2 pr-4 text-left font-medium text-muted">COA</th>
                <td className="py-2">
                  {variant.coaPdf ? (
                    <a href={variant.coaPdf} download className="text-accent underline">
                      Download certificate
                    </a>
                  ) : (
                    <Link href={`/coa#coa-${variant.slug}`} className="text-accent underline">
                      Coming soon · view certificate page
                    </Link>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 border-l border-white/15 pl-5">
          <ShipCountdown />
          <div className="mt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Protection</p>
            <p className="text-sm text-ink-soft">
              Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}. Shipment protection is
              included. Damaged vials are replaced at no cost. Tracking is sent on every order.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <AcceptedPayments />
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          For laboratory and research use only. Not for human or veterinary consumption.
        </p>
        <ProductCompliance family={family} variant={variant} />
      </div>
    </div>
  );
}
