"use client";

import { CartProvider } from "./CartProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { CtaBand, Newsletter } from "./CtaBand";
import type { SessionUser } from "@/lib/auth/token";

export function SiteShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionUser | null;
}) {
  return (
    <CartProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header session={session} />
      <main id="main" className="relative">
        {children}
      </main>
      <CtaBand />
      <Newsletter />
      <Footer />
    </CartProvider>
  );
}
