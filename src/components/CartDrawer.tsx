"use client";

import { CutoutImage } from "@/components/CutoutImage";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import { FreeShippingProgress } from "@/components/FreeShippingProgress";
import { formatPrice } from "@/lib/money";
import { shippingCost } from "@/lib/shipping";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const { items, itemCount, subtotal, ready } = useCart();
  const shipping = shippingCost(subtotal);
  const total = subtotal + shipping;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-brand/40"
        aria-label="Close cart"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-semibold text-ink">Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-surface-3/70"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!ready ? (
            <p className="text-sm text-muted">Loading cart…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-ink-soft">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.variantSlug} className="flex gap-3">
                  <div className="flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface-2">
                    {item.image ? (
                      <CutoutImage
                        src={item.image}
                        alt={`${item.name} ${item.dose}`}
                        className="h-[92%] w-auto max-w-full object-contain"
                        shadow="none"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-muted">
                      {item.dose}
                      {item.dose} · Single vial · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line bg-white px-5 py-4">
          {ready && itemCount > 0 && (
            <>
              <FreeShippingProgress subtotal={subtotal} />
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping (US)</span>
                  <span className="text-ink">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
                  <span className="text-ink">Total</span>
                  <span className="text-ink">{formatPrice(total)}</span>
                </div>
              </div>
            </>
          )}
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/checkout"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand text-sm font-medium text-on-ink hover:bg-brand-hover"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-full border border-line text-sm font-medium text-ink hover:bg-surface-2"
            >
              View cart
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
