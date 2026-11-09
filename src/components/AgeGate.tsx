"use client";

import { useEffect, useState } from "react";
import { CutoutImage } from "@/components/CutoutImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const STORAGE_KEY = "ovora_researcher_verified";

const OPEN_PATHS = ["/disclaimer", "/privacy", "/terms", "/research-use"];

const gateVials = [
  { src: "/images/products/cutouts/bpc-157-5mg.webp", alt: "BPC-157 5MG research vial", className: "absolute left-[6%] top-[12%] w-20", motion: "vial-orbit-a" },
  { src: "/images/products/cutouts/retatrutide-5mg.webp", alt: "Retatrutide 5MG research vial", className: "absolute right-[8%] top-[16%] w-24", motion: "vial-orbit-b" },
  { src: "/images/products/cutouts/nad-plus-250mg.webp", alt: "NAD+ 250MG research vial", className: "absolute left-[16%] bottom-[8%] w-28", motion: "vial-orbit-c" },
  { src: "/images/products/cutouts/ghk-cu-50mg.webp", alt: "GHK-Cu 50MG research vial", className: "absolute right-[12%] bottom-[14%] w-20", motion: "vial-orbit-d" },
] as const;

function isOpenPath(pathname: string) {
  return OPEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function AgeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [ageOk, setAgeOk] = useState(false);
  const [researcherOk, setResearcherOk] = useState(false);

  const bypass = isOpenPath(pathname);
  const locked = !bypass && (!ready || !verified);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setVerified(true);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);

  function enter() {
    if (!ageOk || !researcherOk) return;
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVerified(true);
  }

  return (
    <>
      <div inert={locked ? true : undefined} aria-hidden={locked ? true : undefined}>
        {children}
      </div>
      {locked && (
        <div className="fixed inset-0 z-[80] overflow-hidden bg-[#eef0f8]">
          {ready ? (
            <div
              className="min-h-full flex items-center justify-center px-4 py-10 relative overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="researcher-gate-title"
            >
              <div className="absolute inset-0 pointer-events-none opacity-80">
                {gateVials.map((v) => (
                  <div key={v.src} className={v.className}>
                    <CutoutImage
                      src={v.src}
                      alt={v.alt}
                      className={`h-auto w-full ${v.motion}`}
                      shadow="float"
                    />
                  </div>
                ))}
              </div>

              <div className="relative z-10 w-full max-w-lg max-h-[calc(100vh-3rem)] overflow-y-auto bg-[#f7f8fc] rounded-3xl shadow-[0_20px_60px_rgba(30,34,53,0.1)] border border-[#d5dbed] p-8 sm:p-10 animate-fade-up">
                <div className="flex justify-center mb-6">
                  <Logo className="h-9 w-auto" />
                </div>
                <p
                  id="researcher-gate-title"
                  className="text-2xl sm:text-3xl font-semibold text-center text-[#1e2235] mb-3 tracking-tight"
                >
                  Researcher verification
                </p>
                <p className="text-center text-[#4a5168] text-[15px] leading-relaxed mb-8">
                  Ovora Labs sells research peptides exclusively to qualified researchers and
                  laboratories for in vitro and laboratory use. Please confirm before continuing.
                </p>

                <div className="space-y-4 mb-8">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={ageOk}
                      onChange={(e) => setAgeOk(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#d5dbed] accent-[#7a8fd4]"
                    />
                    <span className="text-sm text-[#4a5168] leading-relaxed group-hover:text-[#1e2235]">
                      I am at least <strong>21 years of age</strong>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={researcherOk}
                      onChange={(e) => setResearcherOk(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#d5dbed] accent-[#7a8fd4]"
                    />
                    <span className="text-sm text-[#4a5168] leading-relaxed group-hover:text-[#1e2235]">
                      I confirm I am a <strong>qualified researcher</strong> purchasing for{" "}
                      <strong>in vitro / laboratory research</strong> only — not for human or
                      veterinary use.
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={enter}
                  disabled={!ageOk || !researcherOk}
                  className="w-full h-12 rounded-full bg-[#1e2235] text-[#f7f8fc] font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2a3148] transition-colors"
                >
                  Enter Ovora Labs
                </button>

                <p className="mt-5 text-xs text-[#6b7189] leading-relaxed text-center">
                  By proceeding you affirm the statements above are true. Products are not for human
                  or veterinary use, not for use in diagnostic procedures, and have not been evaluated
                  by the U.S. FDA.
                </p>
                <p className="mt-3 text-center text-xs text-[#6b7189]">
                  <Link href="/disclaimer" className="underline hover:text-[#1e2235]">
                    Disclaimer
                  </Link>
                  <span className="mx-2">·</span>
                  <Link href="/terms" className="underline hover:text-[#1e2235]">
                    Terms
                  </Link>
                  <span className="mx-2">·</span>
                  <Link href="/privacy" className="underline hover:text-[#1e2235]">
                    Privacy
                  </Link>
                </p>

                <p className="mt-6 text-center text-sm text-[#6b7189]">
                  Not a researcher?{" "}
                  <a href="https://www.google.com" className="underline hover:text-[#1e2235]">
                    Exit
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="min-h-full flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-[#7a8fd4]/30 border-t-[#7a8fd4] animate-spin" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
