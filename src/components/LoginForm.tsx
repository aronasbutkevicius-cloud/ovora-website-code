"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { HeroLumen } from "@/components/HeroLumen";
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
    <section className="grid min-h-[calc(100svh-7.25rem)] bg-canvas lg:grid-cols-2">
      <div className="relative min-h-[42vh] lg:min-h-full">
        <HeroLumen />
        <div className="relative z-10 flex h-full min-h-[42vh] items-end p-8 pb-16 lg:p-12 lg:pb-16">
          <div>
            <Logo className="mb-6 h-9 w-auto" />
            <p className="max-w-sm font-display text-4xl font-medium leading-tight text-ink">
              The catalog opens after sign-in.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center px-5 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <p className="index-label">Researcher access</p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink">Sign in</h1>
          <p className="mb-8 mt-3 text-sm leading-relaxed text-muted">
            The catalog, prices, and checkout are available only to signed-in researcher accounts.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm text-ink-soft">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-ink-soft">Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </label>
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}
            <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-sm text-muted">
            New account?{" "}
            <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-ink underline">
              Create a researcher account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
