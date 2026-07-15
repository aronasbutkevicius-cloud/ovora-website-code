"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Phase = "idle" | "blackout" | "morph" | "laugh" | "exit";

export function DarkModeButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");

  const start = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("blackout");
  }, [phase]);

  useEffect(() => {
    if (phase === "idle") return;

    const timers: number[] = [];
    if (phase === "blackout") {
      timers.push(window.setTimeout(() => setPhase("morph"), 450));
    } else if (phase === "morph") {
      timers.push(window.setTimeout(() => setPhase("laugh"), 900));
    } else if (phase === "laugh") {
      timers.push(
        window.setTimeout(() => {
          setPhase("exit");
          router.push("/dark");
        }, 2200),
      );
    } else if (phase === "exit") {
      timers.push(window.setTimeout(() => setPhase("idle"), 600));
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, router]);

  const active = phase !== "idle";

  return (
    <>
      <button
        type="button"
        onClick={start}
        className={`group relative flex items-center justify-center w-10 h-10 rounded-full text-[#4a5168] hover:text-[#1e2235] hover:bg-[#e4e8f5]/60 transition-all ${className}`}
        aria-label="Enter dark mode"
        title="Dark mode"
      >
        <span className="text-lg leading-none select-none group-hover:scale-110 transition-transform">
          😈
        </span>
      </button>

      {active && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${
            phase === "exit" ? "opacity-0 transition-opacity duration-500" : "opacity-100"
          }`}
          style={{ background: "#000" }}
          aria-hidden
        >
          {/* laugh particles */}
          {phase === "laugh" && (
            <div className="absolute inset-0 pointer-events-none">
              {["HA", "HA", "HA", "HAHA", "HA", "HEH", "HA"].map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="demon-ha absolute font-anek font-bold text-red-500/90"
                  style={{
                    left: `${12 + i * 12}%`,
                    top: `${18 + (i % 3) * 22}%`,
                    fontSize: `${1.2 + (i % 4) * 0.55}rem`,
                    animationDelay: `${i * 0.12}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          )}

          <div
            className={`relative ${phase === "laugh" ? "demon-laugh" : ""} ${
              phase === "morph" || phase === "laugh" ? "scale-110" : "scale-100"
            } transition-transform duration-700`}
          >
            <Face phase={phase} />
          </div>

          {phase === "laugh" && (
            <p className="absolute bottom-16 left-0 right-0 text-center text-red-500/80 text-sm tracking-[0.35em] uppercase font-medium animate-pulse">
              Entering Dark Ovora Labs
            </p>
          )}
        </div>
      )}
    </>
  );
}

function Face({ phase }: { phase: Phase }) {
  const demon = phase === "morph" || phase === "laugh" || phase === "exit";
  const laughing = phase === "laugh";

  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 200 200"
      className={`drop-shadow-[0_0_40px_rgba(255,0,60,0.45)] transition-all duration-700 ${
        demon ? "text-red-500" : "text-yellow-300"
      }`}
    >
      {/* head */}
      <circle
        cx="100"
        cy="100"
        r="78"
        fill={demon ? "#1a0508" : "#ffe566"}
        stroke={demon ? "#ff0040" : "#f5c542"}
        strokeWidth="4"
        className="transition-all duration-700"
      />

      {/* horns */}
      <path
        d="M45 70 C35 20, 55 18, 62 55"
        fill={demon ? "#ff0040" : "transparent"}
        className="transition-all duration-700"
        style={{ opacity: demon ? 1 : 0 }}
      />
      <path
        d="M155 70 C165 20, 145 18, 138 55"
        fill={demon ? "#ff0040" : "transparent"}
        className="transition-all duration-700"
        style={{ opacity: demon ? 1 : 0 }}
      />

      {/* eyes */}
      {demon ? (
        <>
          <ellipse cx="72" cy="88" rx="14" ry={laughing ? 8 : 16} fill="#ff0040">
            {laughing && (
              <animate attributeName="ry" values="16;6;16;8;16" dur="0.45s" repeatCount="indefinite" />
            )}
          </ellipse>
          <ellipse cx="128" cy="88" rx="14" ry={laughing ? 8 : 16} fill="#ff0040">
            {laughing && (
              <animate attributeName="ry" values="16;6;16;8;16" dur="0.45s" repeatCount="indefinite" />
            )}
          </ellipse>
          <circle cx="72" cy="88" r="4" fill="#000" />
          <circle cx="128" cy="88" r="4" fill="#000" />
        </>
      ) : (
        <>
          <circle cx="72" cy="88" r="8" fill="#1e2235" />
          <circle cx="128" cy="88" r="8" fill="#1e2235" />
        </>
      )}

      {/* mouth */}
      {demon ? (
        <g>
          <path
            d={laughing ? "M55 120 Q100 175 145 120 Q100 155 55 120" : "M60 125 Q100 160 140 125"}
            fill="#2a0008"
            stroke="#ff0040"
            strokeWidth="3"
            className="transition-all duration-500"
          >
            {laughing && (
              <animate
                attributeName="d"
                values="M55 120 Q100 175 145 120 Q100 155 55 120;M55 118 Q100 188 145 118 Q100 160 55 118;M55 120 Q100 175 145 120 Q100 155 55 120"
                dur="0.35s"
                repeatCount="indefinite"
              />
            )}
          </path>
          {/* fangs */}
          <path d="M78 128 L84 148 L90 128" fill="#eee" />
          <path d="M110 128 L116 148 L122 128" fill="#eee" />
        </g>
      ) : (
        <path
          d="M65 120 Q100 150 135 120"
          fill="none"
          stroke="#1e2235"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
