import Link from "next/link";

const wordmarkFont =
  "var(--font-sans), Outfit, system-ui, sans-serif";

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex items-center rounded-sm" aria-label="Ovora Labs home">
      <svg className={className} viewBox="0 0 186 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
        <title>Ovora Labs</title>
        <g stroke="var(--ink)" fill="none" strokeLinecap="round">
          <ellipse cx="20" cy="20" rx="13.4" ry="5.6" strokeWidth="2.35" transform="rotate(-32 20 20)" />
          <ellipse cx="20" cy="20" rx="13.4" ry="5.6" strokeWidth="2.35" transform="rotate(32 20 20)" />
        </g>
        <circle cx="20" cy="20" r="3.1" fill="var(--brand)" />
        <text
          x="46"
          y="26"
          fill="var(--ink)"
          fontFamily={wordmarkFont}
          fontSize="18"
          fontWeight="600"
          letterSpacing="-0.3"
        >
          Ovora Labs
        </text>
      </svg>
    </Link>
  );
}
