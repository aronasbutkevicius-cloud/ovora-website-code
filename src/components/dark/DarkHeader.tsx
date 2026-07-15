"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DarkLogo } from "./DarkLogo";

const nav = [
  { href: "/dark/store", label: "Compounds" },
  { href: "/dark", label: "The Vault" },
];

export function DarkHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-50">
      <div className="relative h-16 lg:h-[70px] bg-black/90 backdrop-blur-md border-b border-red-500/20">
        <div className="content-container relative flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-zinc-400 hover:text-white rounded-full hover:bg-white/5"
              aria-label="Open menu"
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
            <DarkLogo className="h-7 sm:h-8 w-auto" />
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/dark"
                  ? pathname === "/dark"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                    active ? "text-white bg-white/5" : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-red-400 transition-colors px-3 py-2 rounded-full border border-white/10 hover:border-red-500/40"
          >
            Escape to light →
          </Link>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-black border-b border-red-500/20">
          <nav className="content-container py-3 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-zinc-400 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/" onClick={() => setOpen(false)} className="px-3 py-3 text-sm text-red-400">
              Escape to light →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
