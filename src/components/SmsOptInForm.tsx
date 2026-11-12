"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FIRST_ORDER_OFFER, SMS_CONSENT_TEXT } from "@/lib/compliance";

export function SmsOptInForm({
  phoneE164,
  onSaved,
}: {
  phoneE164?: string | null;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaved("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/account/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.get("phone"),
          consent: form.get("consent") === "on",
        }),
      });
      const data = (await response.json()) as { error?: string; phoneE164?: string };
      if (!response.ok) {
        setError(data.error || "The number could not be saved.");
        setPending(false);
        return;
      }
      setSaved(`Saved ${data.phoneE164}. The first-order offer will appear on an eligible cart.`);
      setPending(false);
      router.refresh();
      onSaved?.();
    } catch {
      setError("The number could not be saved.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-ink mb-1">Promotional updates</h2>
        <p className="text-sm text-ink-soft leading-relaxed">{FIRST_ORDER_OFFER}</p>
        {phoneE164 && (
          <p className="mt-2 text-sm text-muted">Current number on file: {phoneE164}</p>
        )}
      </div>
      <label className="block">
        <span className="block text-sm text-ink-soft mb-1.5">Mobile number</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(555) 555-0100"
          className="w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
      </label>
      <label className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          {SMS_CONSENT_TEXT}{" "}
          <Link href="/terms" className="underline text-ink">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline text-ink">
            Privacy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
      )}
      {saved && (
        <p className="text-sm text-ink bg-surface-2 border border-line rounded-xl px-4 py-3">
          {saved}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save phone number"}
      </button>
    </form>
  );
}
