"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "./CartProvider";
import { Logo } from "./Logo";
import { SITE_BANNER } from "@/lib/compliance";
import type { SessionUser } from "@/lib/auth/token";

const nav = [
  { href: "/store", label: "Products" },
  { href: "/research-use", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact us" },
];

export function Header({ session }: { session: SessionUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const hiddenRef = useRef(false);
  const menuOpenRef = useRef(false);
  const { itemCount } = useCart();
  menuOpenRef.current = open;

  useEffect(() => {
    if (!open) return;
    hiddenRef.current = false;
    setHidden(false);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const threshold = 10;
    let lastY = window.scrollY;
    let accum = 0;
    let frame = 0;

    const apply = (next: boolean) => {
      if (hiddenRef.current === next) return;
      hiddenRef.current = next;
      setHidden(next);
    };

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;

      if (menuOpenRef.current || y < 80) {
        accum = 0;
        apply(false);
        return;
      }
      if (delta === 0) return;
      if (accum !== 0 && Math.sign(delta) !== Math.sign(accum)) accum = 0;
      accum += delta;
      if (accum > threshold) {
        apply(true);
        accum = 0;
      } else if (accum < -threshold) {
        apply(false);
        accum = 0;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
        if (Math.abs(window.scrollY - lastY) > 1) onScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className={`sticky top-0 inset-x-0 z-50 ${hidden ? "pointer-events-none" : ""}`}>
      <div
        className={hidden ? "pointer-events-none" : undefined}
        style={{
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: reduceMotion ? "none" : "transform 220ms ease-out",
        }}
        inert={hidden ? true : undefined}
      >
      <p className="site-banner px-4 py-2 text-center text-xs leading-snug sm:text-sm">
        {SITE_BANNER}
      </p>
      <div className="site-header-bar relative h-16 lg:h-[70px]">
        <div className="content-container relative flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-ink-soft hover:text-ink rounded-lg hover:bg-surface-2 transition-all"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Logo className="h-7 sm:h-8 lg:h-9 w-auto" />
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    active
                      ? "text-ink after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-accent"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <form action="/store" method="get" role="search" className="hidden lg:block">
              <label htmlFor="header-search" className="sr-only">
                Search products
              </label>
              <input
                id="header-search"
                type="search"
                name="q"
                placeholder="Search"
                className="h-9 w-36 xl:w-48 rounded-lg border border-line bg-white/80 px-3 text-sm text-ink outline-none placeholder:text-placeholder focus:border-accent"
              />
            </form>
            {session ? (
              <>
                <Link
                  href="/account"
                  className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-[13px] font-medium text-ink-soft hover:bg-surface-2"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-[13px] font-medium text-ink-soft hover:bg-surface-2"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="btn-primary hidden h-9 min-h-0 px-4 text-[13px] sm:inline-flex"
              >
                Sign in
              </Link>
            )}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-ink-soft hover:text-ink rounded-lg hover:bg-surface-2 transition-all"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-brand text-on-ink text-[10px] font-semibold rounded-full">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-canvas border-b border-line shadow-lg">
          <div className="content-container py-3 flex flex-col gap-2">
            <form action="/store" method="get" role="search">
              <label htmlFor="mobile-search" className="sr-only">
                Search products
              </label>
              <input
                id="mobile-search"
                type="search"
                name="q"
                placeholder="Search products"
                className="w-full h-11 px-4 rounded-lg border border-line bg-white text-base text-ink outline-none placeholder:text-placeholder focus:border-accent"
              />
            </form>
            <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-ink-soft hover:text-ink border-b border-line"
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/account" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium text-ink-soft">
                  Account
                </Link>
                <button type="button" onClick={() => void signOut()} className="px-3 py-3 text-left text-sm font-medium text-ink-soft">
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium text-ink">
                Sign in
              </Link>
            )}
            </nav>
          </div>
        </div>
      )}
      </div>
      <div className={hidden ? "pointer-events-auto" : undefined}>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </header>
  );
}
