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
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <div className="specimen-well relative flex min-h-[520px] items-end justify-center overflow-visible">
          <ProductVisual
            key={variant.slug}
            product={variant}
            className="relative z-10 h-[460px] w-auto max-w-[78%]"
            sizes="(max-width: 1024px) 80vw, 420px"
            priority
          />
        </div>
        <p className="index-label mt-4 text-center">Specimen {variant.slug}</p>
      </div>

      <div className="lg:col-span-7">
        <p className="index-label">{isSupply ? "Laboratory supply" : "Single vial"} · Research use only</p>
        <h1 className="mt-3 font-display text-5xl font-medium tracking-tight text-ink lg:text-6xl">
          {family.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">{variant.description}</p>

        {family.variants.length > 1 && (
          <div className="mt-8">
            <p className="index-label">Vial size</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Vial size">
              {family.variants.map((option) => {
                const active = option.slug === variant.slug;
                return (
                  <button
                    key={option.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => chooseSize(option)}
                    className={`min-w-16 rounded-lg border px-3 py-2 text-sm ${
                      active
                        ? "border-accent bg-white text-ink shadow-[inset_0_0_0_1px_var(--accent)]"
                        : "border-line bg-white/50 text-muted hover:text-ink"
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
          <div className="mt-8">
            <p className="index-label">Quantity</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {tiers.map((tier) => {
                const selected = quantity === tier.quantity;
                const each = lineCentsFor(toCents(variant.price), tier.quantity, family.form);
                return (
                  <button
                    key={tier.quantity}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setQuantity(tier.quantity)}
                    className={`rounded-xl border px-3 py-3 text-left ${
                      selected ? "border-accent bg-white" : "border-line bg-white/40 hover:bg-white"
                    }`}
                  >
                    <span className="flex items-end gap-1" aria-hidden="true">
                      {Array.from({ length: tier.quantity }).map((_, index) => (
                        <span
                          key={index}
                          className={`block w-2 rounded-sm ${selected ? "h-7 bg-accent" : "h-5 bg-accent-mid/70"}`}
                        />
                      ))}
                    </span>
                    {tier.badge && <span className="index-label mt-2 block">{tier.badge}</span>}
                    <span className="mt-1 block text-sm text-ink">
                      {tier.quantity} vial{tier.quantity === 1 ? "" : "s"}
                    </span>
                    <span className="block text-xs text-ink-soft">
                      {tier.rate > 0 ? `${Math.round(tier.rate * 100)}% off · ` : ""}
                      {formatCents(each)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-line py-5">
          <div>
            {showCompare && (
              <p className="text-sm text-muted line-through">{formatPrice(variant.compareAtPrice ?? 0)}</p>
            )}
            <p className="font-display text-4xl font-medium tracking-tight text-ink">{formatPrice(variant.price)}</p>
            <p className="index-label mt-1">USD per vial</p>
            {applied.rate > 0 && (
              <p className="mt-1 text-xs text-accent">{Math.round(applied.rate * 100)}% off this quantity</p>
            )}
          </div>
          <label className="index-label flex items-center gap-3">
            Qty
            <input
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))
              }
              className="w-16 border-b border-line bg-transparent py-1 text-lg normal-case tracking-normal text-ink outline-none"
            />
          </label>
        </div>

        <button type="button" onClick={handleAdd} className="btn-primary mt-5 w-full">
          {added ? "Added to cart" : `Add ${quantity} · ${formatCents(totalCents)}`}
        </button>
        {added && (
          <p className="mt-3 text-sm text-accent">
            {variant.dose} added.{" "}
            <Link href="/cart" className="underline">
              View cart
            </Link>
          </p>
        )}

        <div className="mt-10">
          <p className="index-label">Datasheet</p>
          <table className="mt-3 w-full border-collapse text-sm">
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
                <tr key={label} className="border-b border-line">
                  <th className="w-40 py-2.5 pr-4 text-left font-medium text-muted">{label}</th>
                  <td className="py-2.5 text-ink">{value}</td>
                </tr>
              ))}
              <tr className="border-b border-line">
                <th className="py-2.5 pr-4 text-left font-medium text-muted">COA</th>
                <td className="py-2.5">
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

        <div className="folio mt-10 px-6 py-6">
          <ShipCountdown />
          <div className="mt-5 border-t border-line pt-5">
            <p className="index-label">Protection</p>
            <p className="mt-1 text-sm text-ink-soft">
              Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}. Shipment protection is
              included. Damaged vials are replaced at no cost. Tracking is sent on every order.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-5">
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
