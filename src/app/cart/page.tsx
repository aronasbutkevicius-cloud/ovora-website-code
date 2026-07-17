"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, itemCount, subtotal, setQuantity, removeItem, ready } = useCart();

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1e2235] tracking-tight mb-3">
            Cart
          </h1>
          <p className="text-[#6b7189]">
            {ready
              ? itemCount === 0
                ? "Your cart is empty."
                : `${itemCount} item${itemCount === 1 ? "" : "s"} ready for checkout.`
              : "Loading cart…"}
          </p>
        </div>

        {!ready ? null : items.length === 0 ? (
          <div className="rounded-2xl border border-[#d5dbed] bg-white p-8 max-w-xl">
            <p className="text-[#4a5168] mb-6">
              Browse research peptides and add a strength to get started.
            </p>
            <Link
              href="/store"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
            >
              Shop products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.variantSlug}
                  className="rounded-2xl border border-[#d5dbed] bg-white p-4 sm:p-5 flex gap-4"
                >
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-[#eef0f8] border border-[#d5dbed] flex items-center justify-center overflow-hidden shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={`${item.name} ${item.dose}`}
                        width={160}
                        height={220}
                        className="object-contain h-full w-auto p-2"
                      />
                    ) : (
                      <span className="text-xs text-[#8a90a8]">No image</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/products/${item.familySlug}`}
                          className="font-semibold text-[#1e2235] hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-[#6b7189] mt-0.5">{item.dose}</p>
                      </div>
                      <p className="font-semibold text-[#1e2235] shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-2 h-10 px-3 rounded-full border border-[#d5dbed] bg-[#f7f8fc]">
                        <span className="text-[11px] uppercase tracking-wide text-[#6b7189]">
                          Qty
                        </span>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={item.quantity}
                          onChange={(e) =>
                            setQuantity(
                              item.variantSlug,
                              Math.max(1, Math.min(99, Number(e.target.value) || 1)),
                            )
                          }
                          className="w-12 bg-transparent text-[#1e2235] font-medium outline-none"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantSlug)}
                        className="text-sm text-[#6b7189] hover:text-[#1e2235] underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-2xl border border-[#d5dbed] bg-white p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-[#1e2235] mb-4">Order summary</h2>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#6b7189]">Subtotal</span>
                <span className="font-medium text-[#1e2235]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-6">
                <span className="text-[#6b7189]">Shipping</span>
                <span className="text-[#6b7189]">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-[#1e2235] mb-6 pt-4 border-t border-[#d5dbed]">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center h-12 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
              >
                Continue to checkout
              </Link>
              <Link
                href="/store"
                className="mt-3 w-full inline-flex items-center justify-center h-11 rounded-full border border-[#d5dbed] text-[#1e2235] text-sm font-medium hover:bg-[#eef0f8] transition-colors"
              >
                Keep shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
