"use client";

import { useId } from "react";
import { vialThemes, type VialTheme } from "@/data/vialThemes";

type SprayProps = {
  name: string;
  dose?: string;
  theme?: VialTheme | string;
  className?: string;
  tilt?: number;
};

/** Sleek nasal spray bottle matching Ovora vial label language. */
export function NasalSpray({
  name,
  dose = "10MG",
  theme = "mist",
  className = "",
  tilt = 0,
}: SprayProps) {
  const uid = useId().replace(/:/g, "");
  const t = typeof theme === "string" ? vialThemes[theme] ?? vialThemes.mist : theme;
  const shortName =
    name.replace(" Spray", "").length > 12
      ? name.replace(" Spray", "").slice(0, 11) + "…"
      : name.replace(" Spray", "");

  return (
    <svg
      viewBox="0 0 220 460"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${name} research nasal spray`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <defs>
        <linearGradient id={`spray-body-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="40%" stopColor={t.glass} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#c8c8c8" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`spray-cap-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#cfcfcf" />
        </linearGradient>
        <filter id={`spray-shadow-${uid}`} x="-25%" y="-5%" width="150%" height="120%">
          <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#1a1420" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter={`url(#spray-shadow-${uid})`}>
        {/* Nozzle tip */}
        <rect x="98" y="18" width="24" height="28" rx="4" fill={`url(#spray-cap-${uid})`} />
        <rect x="104" y="10" width="12" height="12" rx="3" fill="#d8d8d8" />

        {/* Pump collar */}
        <rect x="78" y="46" width="64" height="22" rx="6" fill={`url(#spray-cap-${uid})`} />
        <ellipse cx="110" cy="46" rx="32" ry="6" fill="#eeeeee" />

        {/* Bottle body */}
        <path
          d="M70 72 H150 V360 C150 385 132 402 110 402 C88 402 70 385 70 360 Z"
          fill={`url(#spray-body-${uid})`}
          stroke="#c4c4c4"
          strokeWidth="1.2"
        />

        <path
          d="M82 90 V340 C82 358 94 372 110 372"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.5"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Label */}
        <rect x="80" y="130" width="60" height="200" rx="5" fill={t.label} />
        <rect
          x="80"
          y="130"
          width="60"
          height="200"
          rx="5"
          fill="none"
          stroke={t.accent}
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <text
          x="88"
          y="158"
          fill={t.text}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="11"
          fontWeight="700"
        >
          {shortName}
        </text>

        <rect x="88" y="168" width="36" height="15" rx="7.5" fill={t.accent} />
        <text
          x="106"
          y="178.5"
          textAnchor="middle"
          fill="#fff"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="7"
          fontWeight="600"
        >
          {dose}
        </text>

        <text
          x="88"
          y="200"
          fill={t.accent}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="7"
          fontWeight="600"
          letterSpacing="0.5"
        >
          NASAL
        </text>

        <rect
          x="88"
          y="278"
          width="40"
          height="14"
          rx="7"
          fill="none"
          stroke={t.accent}
          strokeWidth="1.25"
        />
        <text
          x="108"
          y="288"
          textAnchor="middle"
          fill={t.accent}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="5.5"
          fontWeight="600"
        >
          Purity ≥ 99%
        </text>

        <text
          x="88"
          y="308"
          fill={t.text}
          fillOpacity="0.55"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="5"
        >
          Research Use Only
        </text>

        <g transform="translate(128 318) rotate(-90)">
          <text
            x="0"
            y="0"
            fill={t.text}
            fontFamily="var(--font-poppins), Poppins, sans-serif"
            fontSize="20"
            fontWeight="700"
            letterSpacing="-0.4"
          >
            ovora
          </text>
          <text
            x="70"
            y="-7"
            fill={t.text}
            fillOpacity="0.75"
            fontFamily="var(--font-poppins), Poppins, sans-serif"
            fontSize="6.5"
            fontWeight="500"
          >
            labs
          </text>
        </g>
      </g>
    </svg>
  );
}
