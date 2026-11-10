"use client";

import { CutoutImage } from "@/components/CutoutImage";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { FreeShippingProgress } from "@/components/FreeShippingProgress";
import { formatPrice } from "@/data/products";
import { shippingCost } from "@/lib/shipping";
import {
  prepareTagadaCheckout,
  readCheckoutPaymentState,
  startCryptoPayment,
  toUsCountryCode,
  type OfferedMethod,
  type PreparedCheckout,
} from "@/lib/tagadaCheckout";

type Phase = "details" | "payment";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <section className="py-16 bg-[#f7f8fc] min-h-[50vh]">
          <div className="content-container">
            <p className="text-[#6b7189]">Loading checkout…</p>
          </div>
        </section>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const params = useSearchParams();
  const { items, itemCount, subtotal, ready, clearCart } = useCart();
  const [phase, setPhase] = useState<Phase>("details");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [prepared, setPrepared] = useState<PreparedCheckout | null>(null);
  const [returnState, setReturnState] = useState<"checking" | "paid" | "unpaid" | null>(null);

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    stateRegion: "",
    postal: "",
    country: "United States",
    phone: "",
    notes: "",
    researchAck: false,
  });

  const returnToken = params.get("checkoutToken");
  const returnSession = params.get("sessionToken");
  const paymentReturn = params.get("payment") === "return";

  useEffect(() => {
    if (!paymentReturn || !returnToken || !returnSession) return;
    let cancelled = false;
    setReturnState("checking");
    readCheckoutPaymentState(returnToken, returnSession)
      .then((state) => {
        if (cancelled) return;
        setReturnState(state);
        if (state === "paid") clearCart();
      })
      .catch(() => {
        if (!cancelled) setReturnState("unpaid");
      });
    return () => {
      cancelled = true;
    };
  }, [paymentReturn, returnToken, returnSession, clearCart]);

  const shippingEstimate = useMemo(() => shippingCost(subtotal), [subtotal]);
  const total = subtotal + shippingEstimate;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.researchAck) {
      setError("Please confirm research-use acknowledgment to continue.");
      return;
    }
    if (
      !form.email.trim() ||
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address1.trim() ||
      !form.city.trim() ||
      !form.stateRegion.trim() ||
      !form.postal.trim()
    ) {
      setError("Please complete the required contact and shipping fields.");
      return;
    }
    if (!toUsCountryCode(form.country)) {
      setError("Checkout currently ships within the United States only.");
      return;
    }

    setBusy(true);
    try {
      const next = await prepareTagadaCheckout(items, form);
      setPrepared(next);
      setPhase("payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be started.");
    } finally {
      setBusy(false);
    }
  }

  async function handlePay(method: OfferedMethod) {
    if (!prepared || method.id !== "crypto") return;
    setError("");
    setBusy(true);
    try {
      const returnUrl = new URL("/checkout", window.location.origin);
      returnUrl.searchParams.set("checkoutToken", prepared.checkoutToken);
      returnUrl.searchParams.set("sessionToken", prepared.sessionToken);
      returnUrl.searchParams.set("payment", "return");
      await startCryptoPayment({
        checkoutSessionId: prepared.session.id,
        sessionToken: prepared.sessionToken,
        returnUrl: returnUrl.toString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "The payment page could not be opened.");
      setBusy(false);
    }
  }

  if (!ready || returnState === "checking") {
    return (
      <section className="py-16 bg-[#f7f8fc] min-h-[50vh]">
        <div className="content-container">
          <p className="text-[#6b7189]">Loading checkout…</p>
        </div>
      </section>
    );
  }

  if (returnState === "paid") {
    return (
      <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
        <div className="content-container max-w-2xl">
          <div className="rounded-2xl border border-[#d5dbed] bg-white p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7a8fd4] font-medium mb-3">
              Payment received
            </p>
            <h1 className="text-3xl font-semibold text-[#1e2235] tracking-tight mb-3">
              Thank you
            </h1>
            <p className="text-[#4a5168] leading-relaxed mb-6">
              Tagada confirmed this checkout as paid. A receipt goes to the email on the order.
            </p>
            <Link
              href="/store"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
            >
              Back to the store
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (returnState === "unpaid") {
    return (
      <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
        <div className="content-container max-w-2xl">
          <div className="rounded-2xl border border-[#d5dbed] bg-white p-8">
            <h1 className="text-3xl font-semibold text-[#1e2235] tracking-tight mb-3">
              Payment not completed
            </h1>
            <p className="text-[#4a5168] leading-relaxed mb-6">
              Tagada has not marked this checkout as paid. Nothing in the cart was cleared. You can
              return to checkout and try Crypto — Pay by card again.
            </p>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
            >
              Back to checkout
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (itemCount === 0) {
    return (
      <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
        <div className="content-container max-w-xl">
          <h1 className="text-4xl font-semibold text-[#1e2235] tracking-tight mb-3">Checkout</h1>
          <p className="text-[#6b7189] mb-6">Your cart is empty — add a product before checkout.</p>
          <Link
            href="/store"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
          >
            Shop products
          </Link>
        </div>
      </section>
    );
  }

  const summary = prepared?.session;
  const shownSubtotal = summary ? summary.totals.subtotal / 100 : subtotal;
  const shownShipping = summary ? summary.totals.shipping / 100 : shippingEstimate;
  const shownTotal = summary ? summary.totals.total / 100 : total;

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1e2235] tracking-tight mb-3">
            Checkout
          </h1>
          <p className="text-[#6b7189]">
            US shipping is {formatPrice(8.99)} under $100 and free at $100 or above. Payment uses
            Crypto — Pay by card. The charge happens on the secure payment page, after you review it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="space-y-6">
            {phase === "details" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset className="rounded-2xl border border-[#d5dbed] bg-white p-6 space-y-4">
                  <legend className="px-1 text-lg font-semibold text-[#1e2235]">Contact</legend>
                  <Field
                    label="Email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                  />
                  <Field
                    label="Phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                  />
                </fieldset>

                <fieldset className="rounded-2xl border border-[#d5dbed] bg-white p-6 space-y-4">
                  <legend className="px-1 text-lg font-semibold text-[#1e2235]">Shipping</legend>
                  <Field
                    label="Full name"
                    required
                    value={form.fullName}
                    onChange={(v) => update("fullName", v)}
                  />
                  <Field
                    label="Company / lab (optional)"
                    value={form.company}
                    onChange={(v) => update("company", v)}
                  />
                  <Field
                    label="Address"
                    required
                    value={form.address1}
                    onChange={(v) => update("address1", v)}
                  />
                  <Field
                    label="Apartment, suite, etc. (optional)"
                    value={form.address2}
                    onChange={(v) => update("address2", v)}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="City" required value={form.city} onChange={(v) => update("city", v)} />
                    <Field
                      label="State / province"
                      required
                      value={form.stateRegion}
                      onChange={(v) => update("stateRegion", v)}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Postal code"
                      required
                      value={form.postal}
                      onChange={(v) => update("postal", v)}
                    />
                    <Field
                      label="Country"
                      required
                      value={form.country}
                      onChange={(v) => update("country", v)}
                    />
                  </div>
                  <label className="block">
                    <span className="block text-sm text-[#4a5168] mb-1.5">Order notes (optional)</span>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      className="w-full rounded-xl border border-[#d5dbed] bg-[#f7f8fc] px-3 py-2.5 text-sm text-[#1e2235] outline-none focus:border-[#7a8fd4]"
                    />
                  </label>
                </fieldset>

                <label className="flex gap-3 rounded-2xl border border-[#d5dbed] bg-white p-5 text-sm text-[#4a5168]">
                  <input
                    type="checkbox"
                    checked={form.researchAck}
                    onChange={(e) => update("researchAck", e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    I confirm these products are for laboratory / research use only and are not for
                    human or veterinary consumption.
                  </span>
                </label>

                {error && <ErrorNote message={error} />}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors disabled:opacity-60"
                >
                  {busy ? "Starting checkout…" : "Continue to payment"}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#d5dbed] bg-white p-6">
                  <h2 className="text-lg font-semibold text-[#1e2235] mb-2">Payment method</h2>
                  <p className="text-sm text-[#6b7189] mb-4">
                    Only Crypto — Pay by card is offered. Direct card checkout stays off until
                    TagadaPay approval.
                  </p>
                  <ul className="space-y-3">
                    {prepared?.methods.map((method) => (
                      <li
                        key={method.id}
                        className="rounded-xl border border-[#7a8fd4] bg-[#f7f8fc] p-4"
                      >
                        <p className="text-sm font-medium text-[#1e2235]">{method.label}</p>
                        <p className="mt-1 text-sm text-[#4a5168] leading-relaxed">{method.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {error && <ErrorNote message={error} />}

                <div className="flex flex-col sm:flex-row gap-3">
                  {prepared?.methods
                    .filter((method) => method.id === "crypto")
                    .map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        disabled={busy}
                        onClick={() => handlePay(method)}
                        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors disabled:opacity-60"
                      >
                        {busy ? "Opening payment…" : "Continue to secure payment"}
                      </button>
                    ))}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setPhase("details");
                      setError("");
                    }}
                    className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#d5dbed] text-[#1e2235] text-sm font-medium hover:bg-[#eef0f8] transition-colors"
                  >
                    Edit details
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-[#d5dbed] bg-white p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-[#1e2235] mb-4">Order summary</h2>
            <div className="mb-5">
              <FreeShippingProgress subtotal={shownSubtotal} />
            </div>
            <ul className="space-y-3 mb-5">
              {items.map((item) => (
                <li key={item.variantSlug} className="flex gap-3">
                  <div className="w-14 h-16 rounded-lg bg-[#eef0f8] border border-[#d5dbed] overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <CutoutImage
                        src={item.image}
                        alt={`${item.name} ${item.dose}`}
                        className="h-[92%] w-auto max-w-full object-contain"
                        shadow="soft"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1e2235] truncate">
                      {item.name} · {item.dose}
                    </p>
                    <p className="text-xs text-[#6b7189]">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-[#1e2235]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm border-t border-[#d5dbed] pt-4">
              <div className="flex justify-between">
                <span className="text-[#6b7189]">Subtotal</span>
                <span className="text-[#1e2235]">{formatPrice(shownSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7189]">Shipping</span>
                <span className="text-[#1e2235]">
                  {shownShipping === 0 ? "Free" : formatPrice(shownShipping)}
                </span>
              </div>
              {summary && summary.totals.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#6b7189]">Tax</span>
                  <span className="text-[#1e2235]">{formatPrice(summary.totals.tax / 100)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold pt-2">
                <span className="text-[#1e2235]">Total</span>
                <span className="text-[#1e2235]">{formatPrice(shownTotal)}</span>
              </div>
            </div>
            <Link href="/cart" className="mt-5 inline-block text-sm text-[#7a8fd4] hover:underline">
              Edit cart
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{message}</p>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-[#4a5168] mb-1.5">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#d5dbed] bg-[#f7f8fc] px-3 py-2.5 text-sm text-[#1e2235] outline-none focus:border-[#7a8fd4]"
      />
    </label>
  );
}
