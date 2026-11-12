"use client";

import { AcceptedPayments } from "@/components/AcceptedPayments";
import { CutoutImage } from "@/components/CutoutImage";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { ResearcherNotice } from "@/components/ProductCompliance";
import { FreeShippingProgress } from "@/components/FreeShippingProgress";
import { SmsOptInForm } from "@/components/SmsOptInForm";
import { useServerQuote } from "@/components/useServerQuote";
import { RESEARCH_PURPOSES } from "@/lib/compliance";
import { formatCents } from "@/lib/money";
import { supportEmail } from "@/lib/site";

type CheckoutState = "form" | "unpaid";

type PlacedOrder = {
  orderId: string;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  discountApplied: boolean;
};

export default function CheckoutPage() {
  const { items, itemCount, ready } = useCart();
  const { quote, error: quoteError, loading, reload } = useServerQuote(
    items.map((item) => ({ variantSlug: item.variantSlug, quantity: item.quantity })),
    ready && items.length > 0,
  );
  const [state, setState] = useState<CheckoutState>("form");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

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
    researchPurpose: "",
    researchAck: false,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!quote) {
      setError("Wait for the order total before continuing.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ variantSlug: item.variantSlug, quantity: item.quantity })),
          researchPurpose: form.researchPurpose,
          researchAck: form.researchAck,
          email: form.email,
          fullName: form.fullName,
          address1: form.address1,
          city: form.city,
          stateRegion: form.stateRegion,
          postal: form.postal,
        }),
      });
      const data = (await response.json()) as PlacedOrder & { error?: string };
      if (!response.ok) {
        setError(data.error || "The summary could not be saved.");
        setPending(false);
        return;
      }
      setPlaced(data);
      setState("unpaid");
      setPending(false);
    } catch {
      setError("The summary could not be saved. Nothing was charged.");
      setPending(false);
    }
  }

  if (!ready) {
    return (
      <section className="py-16 bg-canvas min-h-[50vh]">
        <div className="content-container">
          <p className="text-muted">Loading checkout…</p>
        </div>
      </section>
    );
  }

  if (state === "unpaid") {
    const summary = [
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : "",
      form.company ? `Company: ${form.company}` : "",
      `Address: ${form.address1}${form.address2 ? `, ${form.address2}` : ""}`,
      `${form.city}, ${form.stateRegion} ${form.postal}`,
      form.country,
      "",
      ...items.map((item) => {
        const line = quote?.lines.find((entry) => entry.variantSlug === item.variantSlug);
        return `${item.name} ${item.dose} x${item.quantity} — ${formatCents(line?.lineCents ?? 0)}`;
      }),
      "",
      form.researchPurpose ? `Research purpose: ${form.researchPurpose}` : "",
      placed
        ? `First-order discount: ${placed.discountCents > 0 ? `-${formatCents(placed.discountCents)}` : "not applied"}`
        : "",
      `Shipping (US): ${placed && placed.shippingCents === 0 ? "Free" : formatCents(placed?.shippingCents ?? 0)}`,
      `Estimated total: ${formatCents(placed?.totalCents ?? 0)}`,
      placed ? `Reference: ${placed.orderId}` : "",
      "",
      "Payment was not collected.",
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent("Checkout inquiry")}&body=${encodeURIComponent(summary)}`;

    return (
      <section className="py-12 lg:py-16 bg-canvas min-h-[60vh]">
        <div className="content-container max-w-2xl">
          <div className="rounded-2xl border border-line glass-panel p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-accent font-medium mb-3">
              Payment not connected
            </p>
            <h1 className="text-3xl font-semibold text-ink tracking-tight mb-3">
              Payment was not collected
            </h1>
            <p className="text-ink-soft leading-relaxed mb-6">
              Nothing was charged. Reference {placed?.orderId} was saved for {form.fullName} ({form.email}).
              {placed?.discountApplied
                ? " The 15% first-order discount was applied to this summary and cannot be used again."
                : " The first-order discount was not applied."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={mailto}
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors"
              >
                Email this summary
              </a>
              <button
                type="button"
                onClick={() => {
                  setState("form");
                  void reload();
                }}
                className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-line text-ink text-sm font-medium hover:bg-surface-2 transition-colors"
              >
                Back to details
              </button>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-line text-ink text-sm font-medium hover:bg-surface-2 transition-colors"
              >
                Return to cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (itemCount === 0) {
    return (
      <section className="py-12 lg:py-16 bg-canvas min-h-[60vh]">
        <div className="content-container max-w-xl">
          <h1 className="text-4xl font-semibold text-ink tracking-tight mb-3">Checkout</h1>
          <p className="text-muted mb-6">Your cart is empty — add a product before checkout.</p>
          <Link
            href="/store"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors"
          >
            Shop products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-canvas min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-3">
            Checkout
          </h1>
          <p className="text-muted">
            Enter shipping details to review the cart. Payment processing is not connected, so this
            step cannot charge a card.
          </p>
          <ResearcherNotice className="mt-3" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-[1fr_360px] gap-8 items-start"
        >
          <div className="space-y-6">
            <fieldset className="rounded-2xl border border-line glass-panel p-6 space-y-4">
              <legend className="px-1 text-lg font-semibold text-ink">Contact</legend>
              <Field
                label="Email"
                required
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
            </fieldset>

            <fieldset className="rounded-2xl border border-line glass-panel p-6 space-y-4">
              <legend className="px-1 text-lg font-semibold text-ink">Shipping</legend>
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
                <Field
                  label="City"
                  required
                  value={form.city}
                  onChange={(v) => update("city", v)}
                />
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
                <span className="block text-sm text-ink-soft mb-1.5">Order notes (optional)</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                />
              </label>
            </fieldset>

            <label className="flex gap-3 rounded-2xl border border-line glass-panel p-5 text-sm text-ink-soft">
              <span className="block w-full">
                <span className="block text-sm font-medium text-ink mb-2">
                  Research purpose
                </span>
                <select
                  required
                  value={form.researchPurpose}
                  onChange={(e) => update("researchPurpose", e.target.value)}
                  className="w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                >
                  <option value="">Select research purpose</option>
                  {RESEARCH_PURPOSES.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <label className="flex gap-3 rounded-2xl border border-line glass-panel p-5 text-sm text-ink-soft">
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

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending || loading || !quote}
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-60"
            >
              {pending ? "Saving summary…" : "Review summary"}
            </button>
          </div>

          <aside className="rounded-2xl border border-line glass-panel p-6 sticky top-24 space-y-4">
            <h2 className="text-lg font-semibold text-ink">Order summary</h2>
            {quote && <FreeShippingProgress subtotal={quote.subtotalCents / 100} />}
            {quoteError && <p className="text-sm text-red-700">{quoteError}</p>}
            <ul className="space-y-3">
              {items.map((item) => {
                const line = quote?.lines.find((entry) => entry.variantSlug === item.variantSlug);
                return (
                  <li key={item.variantSlug} className="flex gap-3">
                    <div className="w-14 h-16 rounded-lg bg-surface-2 border border-line overflow-hidden shrink-0 flex items-center justify-center">
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
                      <p className="text-sm font-medium text-ink truncate">
                        {item.name} · {item.dose}
                      </p>
                      <p className="text-xs text-muted">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-ink">
                      {line ? formatCents(line.lineCents) : "…"}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-2 text-sm border-t border-line pt-4">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink">{quote ? formatCents(quote.subtotalCents) : "…"}</span>
              </div>
              {quote && quote.discountCents > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted">First-order discount (15%)</span>
                  <span className="text-ink">-{formatCents(quote.discountCents)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted">Shipping estimate</span>
                <span className="text-ink">
                  {!quote ? "…" : quote.shippingCents === 0 ? "Free" : formatCents(quote.shippingCents)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2">
                <span className="text-ink">Total</span>
                <span className="text-ink">{quote ? formatCents(quote.totalCents) : "…"}</span>
              </div>
            </div>
            {quote?.discountState === "used" && (
              <p className="text-sm text-ink-soft bg-surface-2 border border-line rounded-xl px-4 py-3">
                This first-order discount has already been used on this account.
              </p>
            )}
            {quote?.discountState === "needs_opt_in" && <SmsOptInForm onSaved={reload} />}
            <AcceptedPayments />
            <Link href="/cart" className="inline-block text-sm text-accent hover:underline">
              Edit cart
            </Link>
          </aside>
        </form>
      </div>
    </section>
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
      <span className="block text-sm text-ink-soft mb-1.5">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
      />
    </label>
  );
}
