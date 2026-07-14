"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const STORAGE_KEY = "ovora_researcher_verified";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [ageOk, setAgeOk] = useState(false);
  const [researcherOk, setResearcherOk] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setVerified(true);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function enter() {
    if (!ageOk || !researcherOk) return;
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVerified(true);
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-black/20 border-t-black animate-spin" />
      </div>
    );
  }

  if (verified) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute left-[8%] top-[12%] w-16 animate-float-slow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/BPC157.webp" alt="" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute right-[10%] top-[18%] w-20 animate-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/TB500.webp" alt="" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute left-[18%] bottom-[10%] w-24 animate-float-delayed">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/NAD.webp" alt="" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute right-[14%] bottom-[16%] w-16 animate-float-slow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/GHK-Cu.png" alt="" className="w-full h-auto object-contain" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 p-8 sm:p-10 animate-fade-up">
        <div className="flex justify-center mb-6">
          <Logo className="h-9 w-auto" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-black mb-3 tracking-tight">
          Researcher verification
        </h1>
        <p className="text-center text-black/65 text-[15px] leading-relaxed mb-8">
          Ovora Labs sells research peptides exclusively to qualified researchers and
          laboratories for in vitro and laboratory use. Please confirm before continuing.
        </p>

        <div className="space-y-4 mb-8">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={ageOk}
              onChange={(e) => setAgeOk(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 accent-black"
            />
            <span className="text-sm text-black/80 leading-relaxed group-hover:text-black">
              I am at least <strong>21 years of age</strong>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={researcherOk}
              onChange={(e) => setResearcherOk(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 accent-black"
            />
            <span className="text-sm text-black/80 leading-relaxed group-hover:text-black">
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
          className="w-full h-12 rounded-full bg-black text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/90 transition-colors"
        >
          Enter Ovora Labs
        </button>

        <p className="mt-5 text-xs text-black/50 leading-relaxed text-center">
          By proceeding you affirm the statements above are true. Products are not for human
          or veterinary use, not for use in diagnostic procedures, and have not been evaluated
          by the U.S. FDA.{" "}
          <Link href="/disclaimer" className="underline hover:text-black">
            Full disclaimer
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-black/45">
          Not a researcher?{" "}
          <a href="https://www.google.com" className="underline hover:text-black">
            Exit
          </a>
        </p>
      </div>
    </div>
  );
}
