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
    <form onSubmit={onSubmit} className="rounded-2xl border border-[#d5dbed] bg-white p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[#1e2235] mb-1">Promotional updates</h2>
        <p className="text-sm text-[#4a5168] leading-relaxed">{FIRST_ORDER_OFFER}</p>
        {phoneE164 && (
          <p className="mt-2 text-sm text-[#6b7189]">Current number on file: {phoneE164}</p>
        )}
      </div>
      <label className="block">
        <span className="block text-sm text-[#4a5168] mb-1.5">Mobile number</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(555) 555-0100"
          className="w-full rounded-xl border border-[#d5dbed] bg-[#f7f8fc] px-3 py-2.5 text-sm text-[#1e2235] outline-none focus:border-[#7a8fd4]"
        />
      </label>
      <label className="flex items-start gap-3 text-sm text-[#4a5168] leading-relaxed">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          {SMS_CONSENT_TEXT}{" "}
          <Link href="/terms" className="underline text-[#1e2235]">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline text-[#1e2235]">
            Privacy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
      )}
      {saved && (
        <p className="text-sm text-[#1e2235] bg-[#eef0f8] border border-[#d5dbed] rounded-xl px-4 py-3">
          {saved}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save phone number"}
      </button>
    </form>
  );
}
