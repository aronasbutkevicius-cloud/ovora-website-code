"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PRODUCT_USE_STATEMENT } from "@/lib/compliance";

const DISMISS_KEY = "ovora-first-order-offer-dismissed";

function isAuthRoute(pathname: string) {
  return pathname === "/login" || pathname === "/signup";
}

export function FirstOrderOffer() {
  const pathname = usePathname();
  const titleId = useId();
  const copyId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* Private browsing can block storage. Closing still sticks for this view. */
    }
    setDismissed(true);
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      /* Show the offer once if storage cannot be read. */
    }
    const timer = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const open = ready && !dismissed && !isAuthRoute(pathname);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    dialog?.focus();

    function focusable() {
      if (!dialog) return [];
      return [...dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [dismiss, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-[rgba(18,32,51,0.46)]" onClick={dismiss} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={copyId}
        tabIndex={-1}
        className="folio relative z-10 w-full max-w-md p-6 outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft hover:bg-surface-2 hover:text-ink"
          aria-label="Close offer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="index-label pr-10">Researcher account</p>
        <h2 id={titleId} className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink">
          15% off your first order when you create an account.
        </h2>
        <p id={copyId} className="mt-3 text-sm leading-relaxed text-ink-soft">
          The discount is applied once, on the first order for that account. {PRODUCT_USE_STATEMENT}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/signup" className="btn-primary w-full" onClick={dismiss}>
            Create a researcher account
          </Link>
          <Link
            href="/login"
            className="text-center text-sm font-medium text-accent underline underline-offset-4"
            onClick={dismiss}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
