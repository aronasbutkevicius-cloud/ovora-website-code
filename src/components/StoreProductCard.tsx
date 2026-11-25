"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { familyCatalogPath, startingPrice, type Product, type ProductFamily } from "@/data/products";
import { PRODUCT_USE_STATEMENT } from "@/lib/compliance";
import { formatPrice } from "@/lib/money";
import { storefront } from "@/lib/storefront";

function SizePicker({
  family,
  selected,
  onSelect,
  onConfirm,
  onClose,
}: {
  family: ProductFamily;
  selected: Product;
  onSelect: (variant: Product) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    dialog?.focus();

    function focusable() {
      if (!dialog) return [];
      return [...dialog.querySelectorAll<HTMLElement>("button:not([disabled])")];
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-[rgba(18,32,51,0.46)]" aria-label="Close size picker" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="folio relative z-10 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl p-5 outline-none sm:rounded-[1.35rem] sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft hover:bg-surface-2 hover:text-ink"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="index-label pr-10">Choose a size</p>
        <h2 id={titleId} className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
          {family.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">Adds one vial of the selected size. {PRODUCT_USE_STATEMENT}</p>
        <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Vial size">
          {family.variants.map((variant) => {
            const active = variant.slug === selected.slug;
            return (
              <button
                key={variant.slug}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(variant)}
                className="option-glow flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left"
              >
                <span className="font-semibold text-ink">{variant.dose}</span>
                <span className="text-sm font-medium text-ink">{formatPrice(variant.price)}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <button type="button" onClick={onConfirm} className="btn-primary w-full">
            Add to cart
          </button>
          <button type="button" onClick={onClose} className="h-11 text-sm font-medium text-ink-soft hover:text-ink">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function StoreProductCard({ family }: { family: ProductFamily }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const preview = family.variants.reduce((best, variant) =>
    variant.price < best.price ? variant : best,
  );
  const [picked, setPicked] = useState(preview);
  const multi = family.variants.length > 1;
  const href = familyCatalogPath(family);
  const showBadge =
    storefront.compareAtEnabled &&
    typeof preview.compareAtPrice === "number" &&
    preview.compareAtPrice > preview.price;
  const doses = family.variants.map((variant) => variant.dose).join(" / ");

  function addVariant(variant: Product) {
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
      1,
    );
    setPickerOpen(false);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  function onAddClick() {
    if (!multi) {
      addVariant(preview);
      return;
    }
    setPicked(preview);
    setPickerOpen(true);
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
        <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <Link href={`/coa#coa-${preview.slug}`} className="w-fit rounded-md border border-line bg-white px-2 py-1 text-[10px] font-semibold tracking-wide text-accent sm:px-2.5 sm:text-[11px]">
            ≥99% · COA
          </Link>
          <button
            type="button"
            onClick={onAddClick}
            className="inline-flex h-8 w-full items-center justify-center rounded-full bg-brand px-3 text-xs font-semibold text-on-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-brand-hover sm:w-auto"
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
      {pickerOpen && (
        <SizePicker
          family={family}
          selected={picked}
          onSelect={setPicked}
          onConfirm={() => addVariant(picked)}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </article>
  );
}
