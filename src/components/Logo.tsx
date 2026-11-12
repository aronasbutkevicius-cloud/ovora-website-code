import Link from "next/link";

type Tone = "onDark" | "onLight";

const toneClass: Record<Tone, string> = {
  onDark: "text-[#d5e2ff]",
  onLight: "text-[#1a2744]",
};

export function Logo({
  className = "h-8 w-auto",
  tone = "onDark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const nucleus = tone === "onDark" ? "#7ee0ea" : "#345bd4";
  const labs = tone === "onDark" ? "#9eb0d4" : "#3d4d6e";

  return (
    <Link
      href="/"
      className={`inline-flex items-center rounded-sm ${toneClass[tone]}`}
      aria-label="Ovora Labs home"
    >
      <svg className={className} viewBox="0 0 270 64" fill="none" role="img">
        <title>Ovora Labs</title>
        <g stroke="currentColor" strokeLinecap="round">
          <ellipse cx="32" cy="32" rx="21" ry="9" strokeWidth="3.6" transform="rotate(-32 32 32)" />
          <ellipse cx="32" cy="32" rx="21" ry="9" strokeWidth="3.6" transform="rotate(32 32 32)" />
        </g>
        <circle cx="32" cy="32" r="4" fill={nucleus} />
        <text
          x="68"
          y="40"
          fill="currentColor"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="22"
          fontWeight="600"
        >
          Ovora
        </text>
        <text
          x="158"
          y="40"
          fill={labs}
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="22"
          fontWeight="500"
        >
          Labs
        </text>
      </svg>
    </Link>
  );
}
