"use client";

import { usePathname } from "next/navigation";
import { AgeGate } from "./AgeGate";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { CtaBand, Newsletter } from "./CtaBand";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDark = pathname?.startsWith("/dark");

  // Dark Ovora Labs has its own layout chrome
  if (isDark) {
    return <>{children}</>;
  }

  return (
    <AgeGate>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header />
      <div id="main">{children}</div>
      <CtaBand />
      <Newsletter />
      <Footer />
    </AgeGate>
  );
}
