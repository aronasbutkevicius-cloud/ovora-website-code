"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          callbackUrl,
        }),
      });
      const data = (await response.json()) as { error?: string; redirectTo?: string };
      if (!response.ok) {
        setError(data.error || "Sign-in failed.");
        setPending(false);
        return;
      }
      router.push(data.redirectTo || "/store");
      router.refresh();
    } catch {
      setError("Sign-in failed. Try again.");
      setPending(false);
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-canvas min-h-[70vh]">
      <div className="content-container">
        <div className="panel-card mx-auto w-full max-w-md rounded-3xl p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <Logo className="h-9 w-auto" />
          </div>
          <h1 className="text-3xl font-semibold text-center text-ink tracking-tight mb-2">
            Researcher sign in
          </h1>
          <p className="text-center text-sm text-muted leading-relaxed mb-8">
            The catalog, prices, and checkout are available only to signed-in researcher accounts.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-sm text-ink-soft mb-1.5">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-ink-soft mb-1.5">Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </label>
            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full h-12 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-60"
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            New account?{" "}
            <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="underline text-ink">
              Create a researcher account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
