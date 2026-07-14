"use client";

import { useId } from "react";
import { vialThemes, type VialTheme } from "@/data/vialThemes";

type VialProps = {
  name: string;
  dose?: string;
  theme?: VialTheme | string;
  className?: string;
  tilt?: number;
};

/**
 * Sleek monotone research vial — soft matte label, dark dose pill,
 * outlined purity badge, vertical OVORA mark (freestyle Ovora layout).
 */
export function Vial({
  name,
  dose = "10MG",
  theme = "lilac",
  className = "",
  tilt = 0,
}: VialProps) {
  const uid = useId().replace(/:/g, "");
  const t = typeof theme === "string" ? vialThemes[theme] ?? vialThemes.lilac : theme;

  // Keep product names readable on the narrow label
  const displayName =
    name.length > 12 ? name.replace("Tirzepatide", "Tirz.").replace("Tesamorelin", "Tesamor.") : name;
  const shortName = displayName.length > 13 ? displayName.slice(0, 12) + "…" : displayName;

  return (
    <svg
      viewBox="0 0 220 460"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${name} research vial`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <defs>
        <linearGradient id={`glass-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="40%" stopColor={t.glass} stopOpacity="0.4" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c8c8c8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`capMetal-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ececec" />
          <stop offset="45%" stopColor="#b5b5b5" />
          <stop offset="100%" stopColor="#8e8e8e" />
        </linearGradient>
        <linearGradient id={`capTop-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8e8e8" />
        </linearGradient>
        <filter id={`shadow-${uid}`} x="-25%" y="-5%" width="150%" height="120%">
          <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#1a1420" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter={`url(#shadow-${uid})`}>
        {/* White flip-off top */}
        <ellipse cx="110" cy="28" rx="36" ry="10" fill={`url(#capTop-${uid})`} />
        <rect x="74" y="28" width="72" height="20" fill={`url(#capTop-${uid})`} />
        <ellipse cx="110" cy="48" rx="36" ry="8" fill="#f0f0f0" />

        {/* Brushed silver crimp */}
        <rect x="76" y="46" width="68" height="16" rx="2" fill={`url(#capMetal-${uid})`} />
        <ellipse cx="110" cy="46" rx="34" ry="5" fill="#d8d8d8" opacity="0.7" />

        {/* Neck */}
        <rect
          x="86"
          y="62"
          width="48"
          height="32"
          fill={`url(#glass-${uid})`}
          stroke="#c9c9c9"
          strokeWidth="1"
        />

        {/* Body */}
        <path
          d="M62 98 H158 V365 C158 388 140 405 110 405 C80 405 62 388 62 365 Z"
          fill={`url(#glass-${uid})`}
          stroke="#c4c4c4"
          strokeWidth="1.2"
        />

        {/* Glass highlight */}
        <path
          d="M76 112 V350 C76 365 90 378 110 378"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.5"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Soft matte monotone label */}
        <rect x="72" y="128" width="76" height="220" rx="5" fill={t.label} />

        {/* Tiny top rule for Ovora identity */}
        <rect x="80" y="140" width="18" height="2" rx="1" fill={t.text} opacity="0.35" />

        {/* Product name — left stack */}
        <text
          x="80"
          y="168"
          fill={t.text}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="-0.3"
        >
          {shortName}
        </text>

        {/* Dose pill */}
        <rect x="80" y="180" width="40" height="17" rx="8.5" fill={t.accent} />
        <text
          x="100"
          y="192"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="8"
          fontWeight="600"
        >
          {dose}
        </text>

        {/* Purity outline badge */}
        <rect
          x="80"
          y="300"
          width="48"
          height="15"
          rx="7.5"
          fill="none"
          stroke={t.accent}
          strokeWidth="1.35"
        />
        <text
          x="104"
          y="310.5"
          textAnchor="middle"
          fill={t.accent}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="6"
          fontWeight="600"
        >
          Purity ≥ 99%
        </text>

        <text
          x="80"
          y="330"
          fill={t.text}
          fillOpacity="0.5"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="5.5"
          fontWeight="500"
        >
          Research Use Only
        </text>

        {/* Vertical OVORA + labs — freestyle: stacked mark with thin rule */}
        <g transform="translate(132 335) rotate(-90)">
          <text
            x="0"
            y="0"
            fill={t.text}
            fontFamily="var(--font-poppins), Poppins, sans-serif"
            fontSize="26"
            fontWeight="700"
            letterSpacing="1.5"
          >
            ovora
          </text>
          <line x1="0" y1="8" x2="52" y2="8" stroke={t.text} strokeOpacity="0.25" strokeWidth="1" />
          <text
            x="0"
            y="22"
            fill={t.text}
            fillOpacity="0.7"
            fontFamily="var(--font-poppins), Poppins, sans-serif"
            fontSize="8"
            fontWeight="500"
            letterSpacing="3"
          >
            LABS
          </text>
        </g>
      </g>
    </svg>
  );
}
