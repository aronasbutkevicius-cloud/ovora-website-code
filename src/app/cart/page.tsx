"use client";

import Link from "next/link";
import { CutoutImage } from "@/components/CutoutImage";
import { useCart } from "@/components/CartProvider";
import { FreeShippingProgress } from "@/components/FreeShippingProgress";
import { ResearcherNotice } from "@/components/ProductCompliance";
import { SmsOptInForm } from "@/components/SmsOptInForm";
import { useServerQuote } from "@/components/useServerQuote";
import { AcceptedPayments } from "@/components/AcceptedPayments";
import { formatCents } from "@/lib/money";

export default function CartPage() {
  const { items, itemCount, setQuantity, removeItem, ready } = useCart();
  const { quote, error, loading, reload } = useServerQuote(
    items.map((item) => ({ variantSlug: item.variantSlug, quantity: item.quantity })),
    ready && items.length > 0,
  );

  return (
    <section className="py-12 lg:py-16 bg-canvas min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="mb-3 font-display text-4xl font-medium tracking-tight text-ink lg:text-6xl">
            Cart
          </h1>
          <p className="text-muted">
            {ready
              ? itemCount === 0
                ? "Your cart is empty."
                : `${itemCount} item${itemCount === 1 ? "" : "s"} ready for checkout.`
              : "Loading cart…"}
          </p>
          <ResearcherNotice className="mt-3" />
        </div>

        {!ready ? null : items.length === 0 ? (
          <div className="folio max-w-xl p-8">
            <p className="text-ink-soft mb-6">
              Browse research peptides and add a strength to get started.
            </p>
            <Link
              href="/store"
              className="btn-primary"
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
                  className="folio flex gap-4 p-4 sm:p-5"
                >
                  <div className="specimen-well flex h-28 w-20 shrink-0 items-center justify-center sm:h-32 sm:w-24">
                    {item.image ? (
                      <CutoutImage
                        src={item.image}
                        alt={`${item.name} ${item.dose}`}
                        className="h-[92%] w-auto max-w-full object-contain"
                        shadow="soft"
                      />
                    ) : (
                      <span className="text-xs text-placeholder">No image</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/products/${item.familySlug}`}
                          className="font-semibold text-ink hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted mt-0.5">{item.dose} · Single vial</p>
                      </div>
                      <p className="font-semibold text-ink shrink-0">
                        {quote
                          ? formatCents(
                              quote.lines.find((line) => line.variantSlug === item.variantSlug)
                                ?.lineCents ?? 0,
                            )
                          : loading
                            ? "…"
                            : ""}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3">
                        <span className="text-[11px] uppercase tracking-wide text-muted">
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
                          className="w-12 bg-transparent text-ink font-medium outline-none"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantSlug)}
                        className="text-sm text-muted hover:text-ink underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="folio sticky top-28 space-y-4 p-6">
              <h2 className="text-lg font-semibold text-ink">Order summary</h2>
              {quote && <FreeShippingProgress subtotal={quote.subtotalCents / 100} />}
              {error && <p className="text-sm text-red-700">{error}</p>}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-ink">
                  {quote ? formatCents(quote.subtotalCents) : "…"}
                </span>
              </div>
              {quote && quote.discountCents > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">First-order discount (15%)</span>
                  <span className="font-medium text-ink">-{formatCents(quote.discountCents)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Shipping (US)</span>
                <span className="font-medium text-ink">
                  {!quote ? "…" : quote.shippingCents === 0 ? "Free" : formatCents(quote.shippingCents)}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-ink pt-4 border-t border-line">
                <span>Total</span>
                <span>{quote ? formatCents(quote.totalCents) : "…"}</span>
              </div>
              {quote?.discountState === "used" && (
                <p className="text-sm text-ink-soft bg-surface-2 border border-line rounded-xl px-4 py-3">
                  This first-order discount has already been used on this account.
                </p>
              )}
              {quote?.discountState === "needs_opt_in" && <SmsOptInForm onSaved={reload} />}
              <Link
                href="/checkout"
                className="btn-primary w-full"
              >
                Continue to checkout
              </Link>
              <Link
                href="/store"
                className="btn-secondary w-full"
              >
                Keep shopping
              </Link>
              <AcceptedPayments />
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
