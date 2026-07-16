"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DemonFace, SmileyFace } from "./faces/TransitionFaces";

type Phase = "idle" | "blackout" | "hold" | "morph" | "red" | "laugh" | "exit";

export function DarkModeButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const start = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("blackout");
  }, [phase]);

  useEffect(() => {
    if (phase === "idle") return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers: number[] = [];
    if (phase === "blackout") {
      timers.push(window.setTimeout(() => setPhase("hold"), 400));
    } else if (phase === "hold") {
      timers.push(window.setTimeout(() => setPhase("morph"), 700));
    } else if (phase === "morph") {
      timers.push(window.setTimeout(() => setPhase("red"), 900));
    } else if (phase === "red") {
      timers.push(window.setTimeout(() => setPhase("laugh"), 700));
    } else if (phase === "laugh") {
      timers.push(
        window.setTimeout(() => {
          setPhase("exit");
          router.push("/dark");
        }, 2600),
      );
    } else if (phase === "exit") {
      timers.push(window.setTimeout(() => setPhase("idle"), 500));
    }

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = prev;
    };
  }, [phase, router]);

  const active = phase !== "idle";
  const showDemon =
    phase === "morph" || phase === "red" || phase === "laugh" || phase === "exit";
  const demonFill =
    phase === "red" || phase === "laugh" || phase === "exit" ? "#ff1a1a" : "#ffffff";
  const laughing = phase === "laugh";

  const overlay =
    active && mounted
      ? createPortal(
          <div
            className={`dark-transition-overlay ${phase === "exit" ? "is-exiting" : ""}`}
            aria-hidden
          >
            {/* floating HAHA */}
            {laughing && (
              <div className="dark-transition-ha-layer">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="demon-ha"
                    style={{
                      left: `${6 + ((i * 17) % 88)}%`,
                      top: `${10 + ((i * 23) % 70)}%`,
                      fontSize: `${1.1 + (i % 5) * 0.55}rem`,
                      animationDelay: `${(i % 7) * 0.11}s`,
                    }}
                  >
                    {i % 3 === 0 ? "HAHA" : "HA"}
                  </span>
                ))}
              </div>
            )}

            <div
              className={`dark-transition-face ${laughing ? "demon-laugh" : ""} ${
                phase === "blackout" ? "face-enter" : ""
              }`}
            >
              {/* smiley — visible through blackout/hold, fades on morph */}
              <div
                className="dark-transition-layer"
                style={{
                  opacity: phase === "blackout" || phase === "hold" ? 1 : 0,
                  transform:
                    phase === "morph" || phase === "red" || laughing || phase === "exit"
                      ? "scale(0.88) rotate(-8deg)"
                      : "scale(1)",
                }}
              >
                <SmileyFace className="dark-transition-svg" />
              </div>

              {/* demon — fades in on morph, then turns red & laughs */}
              <div
                className="dark-transition-layer"
                style={{
                  opacity: showDemon ? 1 : 0,
                  transform: laughing ? "scale(1.1)" : showDemon ? "scale(1.04)" : "scale(0.96)",
                  filter:
                    phase === "red" || laughing || phase === "exit"
                      ? "drop-shadow(0 0 56px rgba(255,0,40,0.85))"
                      : "drop-shadow(0 0 18px rgba(255,255,255,0.12))",
                }}
              >
                <DemonFace
                  className="dark-transition-svg demon-svg"
                  fill={demonFill}
                  laughing={laughing}
                />
              </div>
            </div>

            {laughing && (
              <p className="dark-transition-caption">Entering Dark Ovora Labs</p>
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={start}
        className={`group relative flex items-center justify-center w-10 h-10 rounded-full text-[#4a5168] hover:text-[#1e2235] hover:bg-[#e4e8f5]/60 transition-all ${className}`}
        aria-label="Enter dark mode"
        title="Dark mode"
      >
        <span className="w-6 h-6 block group-hover:scale-110 transition-transform">
          <SmileyFace className="w-full h-full" />
        </span>
      </button>
      {overlay}
    </>
  );
}
