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
      <p className="bg-[#1e2235] px-4 py-2 text-center text-xs leading-snug text-[#f7f8fc] sm:text-sm">
        {SITE_BANNER}
      </p>
      <div className="relative h-16 lg:h-[70px] bg-[#f7f8fc]/95 backdrop-blur-md border-b border-[#d5dbed]/80 shadow-[0_1px_3px_rgba(30,34,53,0.05)]">
        <div className="content-container relative flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-[#4a5168] hover:text-[#1e2235] rounded-full hover:bg-[#e4e8f5]/60 transition-all"
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
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-full hover:bg-[#e4e8f5]/60 ${
                    active ? "text-[#1e2235]" : "text-[#4a5168] hover:text-[#1e2235]"
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
                className="h-9 w-36 xl:w-48 rounded-full border border-[#d5dbed] bg-white px-3 text-sm text-[#1e2235] outline-none placeholder:text-[#8a90a8] focus:ring-2 focus:ring-[#7a8fd4]/30"
              />
            </form>
            {session ? (
              <>
                <Link
                  href="/account"
                  className="hidden sm:inline-flex items-center h-9 px-3 rounded-full text-[13px] font-medium text-[#4a5168] hover:bg-[#e4e8f5]/60"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="hidden sm:inline-flex items-center h-9 px-3 rounded-full text-[13px] font-medium text-[#4a5168] hover:bg-[#e4e8f5]/60"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center h-9 px-4 rounded-full bg-[#1e2235] text-[#f7f8fc] text-[13px] font-medium hover:bg-[#2a3148]"
              >
                Sign in
              </Link>
            )}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-[#4a5168] hover:text-[#1e2235] rounded-full hover:bg-[#e4e8f5]/60 transition-all"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#7a8fd4] text-white text-[10px] font-semibold rounded-full">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {open && (
        <div className="lg:hidden bg-[#f7f8fc] border-b border-[#d5dbed] shadow-lg">
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
                className="w-full h-11 px-4 rounded-full border border-[#d5dbed] bg-white text-base text-[#1e2235] outline-none placeholder:text-[#8a90a8] focus:ring-2 focus:ring-[#7a8fd4]/30"
              />
            </form>
            <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-[#4a5168] hover:text-[#1e2235] rounded-xl hover:bg-[#e4e8f5]/60"
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/account" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium text-[#4a5168]">
                  Account
                </Link>
                <button type="button" onClick={() => void signOut()} className="px-3 py-3 text-left text-sm font-medium text-[#4a5168]">
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium text-[#1e2235]">
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
