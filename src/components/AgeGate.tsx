"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Vial } from "./Vial";

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
      <div className="min-h-screen bg-[#fffaf6] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-[#c4785a]/30 border-t-[#c4785a] animate-spin" />
      </div>
    );
  }

  if (verified) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f7efe7] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute left-[6%] top-[12%] w-20 vial-orbit-a">
          <Vial name="BPC-157" dose="10MG" theme="seafoam" tilt={-10} className="w-full h-auto" />
        </div>
        <div className="absolute right-[8%] top-[16%] w-24 vial-orbit-b">
          <Vial name="Retatrutide" dose="10MG" theme="mist" tilt={12} className="w-full h-auto" />
        </div>
        <div className="absolute left-[16%] bottom-[8%] w-28 vial-orbit-c">
          <Vial name="NAD+" dose="250MG" theme="peach" tilt={6} className="w-full h-auto" />
        </div>
        <div className="absolute right-[12%] bottom-[14%] w-20 vial-orbit-d">
          <Vial name="GHK-Cu" dose="50MG" theme="lilac" tilt={-14} className="w-full h-auto" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-[#fffaf6] rounded-3xl shadow-[0_20px_60px_rgba(42,33,28,0.1)] border border-[#eadfd4] p-8 sm:p-10 animate-fade-up">
        <div className="flex justify-center mb-6">
          <Logo className="h-9 w-auto" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#2a211c] mb-3 tracking-tight">
          Researcher verification
        </h1>
        <p className="text-center text-[#5c4a3d] text-[15px] leading-relaxed mb-8">
          Ovora Labs sells research peptides exclusively to qualified researchers and
          laboratories for in vitro and laboratory use. Please confirm before continuing.
        </p>

        <div className="space-y-4 mb-8">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={ageOk}
              onChange={(e) => setAgeOk(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#eadfd4] accent-[#c4785a]"
            />
            <span className="text-sm text-[#5c4a3d] leading-relaxed group-hover:text-[#2a211c]">
              I am at least <strong>21 years of age</strong>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={researcherOk}
              onChange={(e) => setResearcherOk(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#eadfd4] accent-[#c4785a]"
            />
            <span className="text-sm text-[#5c4a3d] leading-relaxed group-hover:text-[#2a211c]">
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
          className="w-full h-12 rounded-full bg-[#2a211c] text-[#fffaf6] font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3d2f26] transition-colors"
        >
          Enter Ovora Labs
        </button>

        <p className="mt-5 text-xs text-[#7a6a5c] leading-relaxed text-center">
          By proceeding you affirm the statements above are true. Products are not for human
          or veterinary use, not for use in diagnostic procedures, and have not been evaluated
          by the U.S. FDA.{" "}
          <Link href="/disclaimer" className="underline hover:text-[#2a211c]">
            Full disclaimer
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-[#7a6a5c]">
          Not a researcher?{" "}
          <a href="https://www.google.com" className="underline hover:text-[#2a211c]">
            Exit
          </a>
        </p>
      </div>
    </div>
  );
}
