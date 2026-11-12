"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
  const { itemCount } = useCart();

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 inset-x-0 z-50">
      <p className="site-banner px-4 py-2 text-center text-xs leading-snug sm:text-sm">
        {SITE_BANNER}
      </p>
      <div className="site-header-bar relative h-16 lg:h-[70px]">
        <div className="content-container relative flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-ink-soft hover:text-ink rounded-full hover:bg-surface-3/60 transition-all"
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
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-full ${
                    active
                      ? "text-ink bg-surface-2 shadow-[inset_0_0_0_1px_var(--border)]"
                      : "text-ink-soft hover:text-ink hover:bg-surface-3/60"
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
                className="h-9 w-36 xl:w-48 rounded-full border border-line glass-panel px-3 text-sm text-ink outline-none placeholder:text-placeholder focus:ring-2 focus:ring-accent/30"
              />
            </form>
            {session ? (
              <>
                <Link
                  href="/account"
                  className="hidden sm:inline-flex items-center h-9 px-3 rounded-full text-[13px] font-medium text-ink-soft hover:bg-surface-3/60"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="hidden sm:inline-flex items-center h-9 px-3 rounded-full text-[13px] font-medium text-ink-soft hover:bg-surface-3/60"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center h-9 px-4 rounded-full bg-brand text-on-ink text-[13px] font-medium hover:bg-brand-hover"
              >
                Sign in
              </Link>
            )}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-ink-soft hover:text-ink rounded-full hover:bg-surface-3/60 transition-all"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-accent text-white text-[10px] font-semibold rounded-full">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

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
                className="w-full h-11 px-4 rounded-full border border-line glass-panel text-base text-ink outline-none placeholder:text-placeholder focus:ring-2 focus:ring-accent/30"
              />
            </form>
            <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-ink-soft hover:text-ink rounded-xl hover:bg-surface-3/60"
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
    </header>
  );
}
