"use client";

import { CutoutImage } from "@/components/CutoutImage";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { PlaceholderNote } from "@/components/PlaceholderNote";
import { FreeShippingProgress } from "@/components/FreeShippingProgress";
import { formatPrice } from "@/data/products";
import { shippingCost } from "@/lib/shipping";
import { supportEmail } from "@/lib/site";

type CheckoutState = "form" | "unpaid";

export default function CheckoutPage() {
  const { items, itemCount, subtotal, ready } = useCart();
  const [state, setState] = useState<CheckoutState>("form");
  const [error, setError] = useState("");

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

  const shippingEstimate = useMemo(() => shippingCost(subtotal), [subtotal]);
  const total = subtotal + shippingEstimate;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.researchAck) {
      setError("Please confirm research-use acknowledgment to continue.");
      return;
    }
    if (
      !form.email.trim() ||
      !form.fullName.trim() ||
      !form.address1.trim() ||
      !form.city.trim() ||
      !form.stateRegion.trim() ||
      !form.postal.trim()
    ) {
      setError("Please complete the required shipping fields.");
      return;
    }

    setState("unpaid");
  }

  if (!ready) {
    return (
      <section className="py-16 bg-[#f7f8fc] min-h-[50vh]">
        <div className="content-container">
          <p className="text-[#6b7189]">Loading checkout…</p>
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
      ...items.map(
        (item) =>
          `${item.name} ${item.dose} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`,
      ),
      "",
      `Shipping (US): ${shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}`,
      `Estimated total: ${formatPrice(total)}`,
      "",
      "This is an inquiry only. No order was placed.",
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent("Checkout inquiry")}&body=${encodeURIComponent(summary)}`;

    return (
      <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
        <div className="content-container max-w-2xl">
          <div className="rounded-2xl border border-[#d5dbed] bg-white p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7a8fd4] font-medium mb-3">
              Payment not connected
            </p>
            <h1 className="text-3xl font-semibold text-[#1e2235] tracking-tight mb-3">
              No order was placed
            </h1>
            <p className="text-[#4a5168] leading-relaxed mb-6">
              Shipping details for {form.fullName} ({form.email}) stayed in this browser only.
              Nothing was charged, and the cart was not cleared.
            </p>
            <PlaceholderNote>
              Choose a payment provider and connect it here before accepting live orders. Until
              then, email the summary to {supportEmail} if you want a person to follow up.
            </PlaceholderNote>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={mailto}
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
              >
                Email this summary
              </a>
              <button
                type="button"
                onClick={() => setState("form")}
                className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-[#d5dbed] text-[#1e2235] text-sm font-medium hover:bg-[#eef0f8] transition-colors"
              >
                Back to details
              </button>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-[#d5dbed] text-[#1e2235] text-sm font-medium hover:bg-[#eef0f8] transition-colors"
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

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1e2235] tracking-tight mb-3">
            Checkout
          </h1>
          <p className="text-[#6b7189]">
            Enter shipping details to review the cart. Payment processing is not connected, so this
            step cannot charge a card or place an order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-[1fr_360px] gap-8 items-start"
        >
          <div className="space-y-6">
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

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <PlaceholderNote>
              Owner placeholder: no payment provider is connected. Continuing does not place or
              reserve an order. US shipping is {formatPrice(8.99)} under $100 and free at $100 or
              above.
            </PlaceholderNote>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
            >
              Review summary
            </button>
          </div>

          <aside className="rounded-2xl border border-[#d5dbed] bg-white p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-[#1e2235] mb-4">Order summary</h2>
            <div className="mb-5">
              <FreeShippingProgress subtotal={subtotal} />
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
                <span className="text-[#1e2235]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7189]">Shipping estimate</span>
                <span className="text-[#1e2235]">
                  {shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2">
                <span className="text-[#1e2235]">Total</span>
                <span className="text-[#1e2235]">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/cart" className="mt-5 inline-block text-sm text-[#7a8fd4] hover:underline">
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
