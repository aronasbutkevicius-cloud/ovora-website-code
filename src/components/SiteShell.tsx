"use client";

import { AgeGate } from "./AgeGate";
import { Footer, PromoBanner } from "./Footer";
import { Header } from "./Header";
import { CtaBand, Newsletter } from "./CtaBand";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AgeGate>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header />
      <PromoBanner />
      <div id="main">{children}</div>
      <CtaBand />
      <Newsletter />
      <Footer />
    </AgeGate>
  );
}
