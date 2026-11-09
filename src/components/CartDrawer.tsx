"use client";

import { CutoutImage } from "@/components/CutoutImage";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import { FreeShippingProgress } from "@/components/FreeShippingProgress";
import { formatPrice } from "@/data/products";
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
        className="absolute inset-0 bg-[#1e2235]/40"
        aria-label="Close cart"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f7f8fc] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#d5dbed] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#1e2235]">Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#4a5168] hover:bg-[#e4e8f5]/70"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!ready ? (
            <p className="text-sm text-[#6b7189]">Loading cart…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-[#4a5168]">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.variantSlug} className="flex gap-3">
                  <div className="flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#d5dbed] bg-[#eef0f8]">
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
                    <p className="truncate text-sm font-medium text-[#1e2235]">{item.name}</p>
                    <p className="text-xs text-[#6b7189]">
                      {item.dose}
                      {item.form === "nasal" ? "" : " · 1 vial"} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#1e2235]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[#d5dbed] bg-white px-5 py-4">
          {ready && itemCount > 0 && (
            <>
              <FreeShippingProgress subtotal={subtotal} />
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6b7189]">Subtotal</span>
                  <span className="text-[#1e2235]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b7189]">Shipping (US)</span>
                  <span className="text-[#1e2235]">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#d5dbed] pt-2 text-base font-semibold">
                  <span className="text-[#1e2235]">Total</span>
                  <span className="text-[#1e2235]">{formatPrice(total)}</span>
                </div>
              </div>
            </>
          )}
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/checkout"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#1e2235] text-sm font-medium text-[#f7f8fc] hover:bg-[#2a3148]"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#d5dbed] text-sm font-medium text-[#1e2235] hover:bg-[#eef0f8]"
            >
              View cart
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
