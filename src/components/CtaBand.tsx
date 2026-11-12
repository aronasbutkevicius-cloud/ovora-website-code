"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { supportEmail } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-16 section-wash lg:py-20">
      <div className="content-container relative z-10 max-w-3xl">
        <p className="index-label mb-3">Catalog</p>
        <h2 className="mb-6 font-display text-3xl font-medium leading-[1.2] tracking-tight text-ink sm:text-4xl lg:mb-8 lg:text-5xl">
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
          className="btn-primary"
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
    <section className="border-t border-transparent py-12 lg:py-16">
      <div className="content-container max-w-2xl">
        <hr className="pearl-rule mb-8" />
        <h2 className="mb-2 font-display text-2xl font-medium text-ink lg:text-3xl">
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
            className="h-11 flex-1 rounded-lg border border-line bg-white px-4 text-base outline-none focus:border-accent sm:text-sm"
          />
          <button
            type="submit"
            className="btn-primary h-11 min-h-0 px-6 text-sm"
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
