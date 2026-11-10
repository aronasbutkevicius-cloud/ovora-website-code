"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { RESEARCH_PURPOSES } from "@/lib/compliance";

export function SignupForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
          organization: form.get("organization"),
          researchPurpose: form.get("researchPurpose"),
          ruoAck: form.get("ruoAck") === "on",
          ageAck: form.get("ageAck") === "on",
        }),
      });
      const data = (await response.json()) as { error?: string; redirectTo?: string };
      if (!response.ok) {
        setError(data.error || "Account creation failed.");
        setPending(false);
        return;
      }
      router.push(data.redirectTo || "/account");
      router.refresh();
    } catch {
      setError("Account creation failed. Try again.");
      setPending(false);
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-[#f7f8fc]">
      <div className="content-container">
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-[#d5dbed] bg-white p-8 sm:p-10 shadow-[0_20px_60px_rgba(30,34,53,0.06)]">
          <div className="flex justify-center mb-6">
            <Logo className="h-9 w-auto" />
          </div>
          <h1 className="text-3xl font-semibold text-center text-[#1e2235] tracking-tight mb-2">
            Create a researcher account
          </h1>
          <p className="text-center text-sm text-[#6b7189] leading-relaxed mb-8">
            Products are sold only to qualified researchers and licensed laboratories. An account is
            required before the catalog, prices, or checkout are shown.
          </p>
          {!configured && (
            <p className="mb-6 text-sm text-[#4a5168] bg-[#eef0f8] border border-[#d5dbed] rounded-xl px-4 py-3">
              Account creation is not configured on this deployment yet. Email support@ovoralabs.com.
            </p>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="Full name" name="name" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" />
            <Field label="Password" name="password" type="password" autoComplete="new-password" />
            <Field
              label="Organization or institution"
              name="organization"
              autoComplete="organization"
            />
            <label className="block">
              <span className="block text-sm text-[#4a5168] mb-1.5">Research purpose</span>
              <select
                name="researchPurpose"
                required
                defaultValue=""
                className="w-full rounded-xl border border-[#d5dbed] bg-[#f7f8fc] px-3 py-2.5 text-sm text-[#1e2235] outline-none focus:border-[#7a8fd4]"
              >
                <option value="" disabled>
                  Select research purpose
                </option>
                {RESEARCH_PURPOSES.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-start gap-3 text-sm text-[#4a5168]">
              <input name="ageAck" type="checkbox" required className="mt-1" />
              <span>I am at least 21 years of age.</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[#4a5168]">
              <input name="ruoAck" type="checkbox" required className="mt-1" />
              <span>
                I confirm I am a qualified researcher purchasing for laboratory research only. These
                products are not for human or veterinary consumption, and they are not a drug, food,
                or cosmetic.
              </span>
            </label>
            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending || !configured}
              className="w-full h-12 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors disabled:opacity-60"
            >
              {pending ? "Creating account…" : "Create account"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-[#6b7189]">
            Already registered?{" "}
            <Link href="/login" className="underline text-[#1e2235]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-[#4a5168] mb-1.5">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-[#d5dbed] bg-[#f7f8fc] px-3 py-2.5 text-sm text-[#1e2235] outline-none focus:border-[#7a8fd4]"
      />
    </label>
  );
}
