"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { supportEmail } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative py-16 lg:py-20 section-wash overflow-hidden">
      <div className="content-container text-center max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-[1.35] mb-6 lg:mb-8 tracking-tight">
          All the research peptides you need, with the{" "}
          <span className="relative inline-block">
            <span className="relative z-10">peace of mind</span>
            <span className="absolute bottom-0 left-0 w-full h-[4px] lg:h-[5px] overflow-hidden rounded-full">
              <span className="absolute inset-0 bg-gradient-to-r from-accent-soft via-accent to-accent-mid rounded-full origin-left animate-underline" />
            </span>
          </span>{" "}
          and research community at your fingertips.
        </h2>
        <Link
          href="/store"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors hover-lift"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "").trim();
    setStatus(`Email ${supportEmail} from ${email || "your address"} to join research updates.`);
  }

  return (
    <section className="py-12 lg:py-16 bg-surface-2 border-t border-line">
      <div className="content-container max-w-2xl mx-auto text-center">
        <h2 className="text-xl lg:text-2xl font-semibold text-ink mb-2">
          Research updates from Ovora Labs
        </h2>
        <p className="text-sm text-muted mb-6">
          Catalog updates and quality documentation news, once an email list is connected.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={onSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@lab.edu"
            autoComplete="email"
            className="flex-1 h-11 px-4 rounded-full border border-line bg-canvas text-base sm:text-sm outline-none focus:ring-2 focus:ring-accent/25"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-placeholder leading-relaxed">
          To join the list, email{" "}
          <a href={`mailto:${supportEmail}`} className="underline hover:text-ink-soft">
            {supportEmail}
          </a>
          .
        </p>
        {status && (
          <p role="status" className="mt-3 text-sm text-ink-soft">
            {status}
          </p>
        )}
      </div>
    </section>
  );
}
