"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DarkModeButton } from "./DarkModeGate";
import { Logo } from "./Logo";

const nav = [
  { href: "/store", label: "Products" },
  { href: "/research-use", label: "Research" },
  { href: "/contact", label: "Contact us" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-50">
      <div className="relative h-16 lg:h-[70px] bg-[#f7f8fc]/95 backdrop-blur-md border-b border-[#d5dbed]/80 shadow-[0_1px_3px_rgba(30,34,53,0.05)]">
        <div className="content-container relative flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-[#4a5168] hover:text-[#1e2235] rounded-full hover:bg-[#e4e8f5]/60 transition-all"
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
            <DarkModeButton />
            <Link
              href="/store"
              className="hidden sm:flex items-center justify-center w-10 h-10 text-[#4a5168] hover:text-[#1e2235] rounded-full hover:bg-[#e4e8f5]/60 transition-all"
              aria-label="Search products"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
              </svg>
            </Link>
            <Link
              href="/store"
              className="relative flex items-center justify-center w-10 h-10 text-[#4a5168] hover:text-[#1e2235] rounded-full hover:bg-[#e4e8f5]/60 transition-all"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#7a8fd4] text-white text-[10px] font-semibold rounded-full">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#f7f8fc] border-b border-[#d5dbed] shadow-lg">
          <nav className="content-container py-3 flex flex-col">
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
          </nav>
        </div>
      )}
    </header>
  );
}
