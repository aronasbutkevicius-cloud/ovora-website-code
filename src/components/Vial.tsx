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

export function Vial({
  name,
  dose = "10MG",
  theme = "clay",
  className = "",
  tilt = 0,
}: VialProps) {
  const uid = useId().replace(/:/g, "");
  const t = typeof theme === "string" ? vialThemes[theme] ?? vialThemes.clay : theme;
  const shortName = name.length > 14 ? name.slice(0, 13) + "…" : name;

  return (
    <svg
      viewBox="0 0 200 420"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${name} research vial`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <defs>
        <linearGradient id={`glass-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="35%" stopColor={t.glass} stopOpacity="0.35" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d4d4d4" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`cap-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8e8e8" />
          <stop offset="50%" stopColor="#b8b8b8" />
          <stop offset="100%" stopColor="#9a9a9a" />
        </linearGradient>
        <filter id={`shadow-${uid}`} x="-20%" y="-5%" width="140%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter={`url(#shadow-${uid})`}>
        <rect x="68" y="18" width="64" height="22" rx="4" fill={`url(#cap-${uid})`} />
        <ellipse cx="100" cy="18" rx="32" ry="8" fill="#f5f5f5" />
        <ellipse cx="100" cy="16" rx="14" ry="5" fill="#ffffff" />
        <rect x="70" y="36" width="60" height="10" rx="2" fill="#c0c0c0" />

        <rect
          x="78"
          y="46"
          width="44"
          height="28"
          fill={`url(#glass-${uid})`}
          stroke="#cfcfcf"
          strokeWidth="1"
        />

        <path
          d="M58 78 H142 V340 C142 358 128 372 100 372 C72 372 58 358 58 340 Z"
          fill={`url(#glass-${uid})`}
          stroke="#c8c8c8"
          strokeWidth="1.25"
        />

        <path
          d="M70 90 V330 C70 342 82 352 100 352"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.45"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <rect x="66" y="118" width="68" height="200" rx="6" fill={t.label} />
        <rect
          x="66"
          y="118"
          width="68"
          height="200"
          rx="6"
          fill="none"
          stroke={t.accent}
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <text
          x="74"
          y="148"
          fill={t.text}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="11"
          fontWeight="700"
        >
          {shortName}
        </text>

        <rect x="74" y="160" width="36" height="16" rx="8" fill={t.accent} />
        <text
          x="92"
          y="171.5"
          textAnchor="middle"
          fill="#fff"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="7.5"
          fontWeight="600"
        >
          {dose}
        </text>

        <rect
          x="74"
          y="268"
          width="42"
          height="14"
          rx="7"
          fill="none"
          stroke={t.accent}
          strokeWidth="1.25"
        />
        <text
          x="95"
          y="278"
          textAnchor="middle"
          fill={t.accent}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="5.5"
          fontWeight="600"
        >
          Purity ≥ 99%
        </text>

        <text
          x="74"
          y="296"
          fill={t.text}
          fillOpacity="0.55"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="5"
        >
          Research Use Only
        </text>

        <g transform="translate(120 300) rotate(-90)">
          <text
            x="0"
            y="0"
            fill={t.text}
            fontFamily="var(--font-poppins), Poppins, sans-serif"
            fontSize="22"
            fontWeight="700"
            letterSpacing="-0.5"
          >
            ovora
          </text>
          <text
            x="78"
            y="-8"
            fill={t.text}
            fillOpacity="0.75"
            fontFamily="var(--font-poppins), Poppins, sans-serif"
            fontSize="7"
            fontWeight="500"
          >
            labs
          </text>
        </g>
      </g>
    </svg>
  );
}
