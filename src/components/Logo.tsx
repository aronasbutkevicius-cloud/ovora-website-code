import Link from "next/link";

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center rounded-sm" aria-label="Ovora Labs home">
      <svg className={className} viewBox="0 0 248 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
        <title>Ovora Labs</title>
        <g stroke="var(--ink)" fill="none" strokeLinecap="round">
          <ellipse cx="20" cy="20" rx="13.4" ry="5.6" strokeWidth="2.35" transform="rotate(-32 20 20)" />
          <ellipse cx="20" cy="20" rx="13.4" ry="5.6" strokeWidth="2.35" transform="rotate(32 20 20)" />
        </g>
        <circle cx="20" cy="20" r="3.1" fill="var(--brand)" />
        <text y="26" fill="var(--ink)">
          <tspan
            x="44"
            fontFamily="var(--font-fraunces), Fraunces, Georgia, serif"
            fontSize="22"
            fontWeight="560"
          >
            Ovora
          </tspan>
          <tspan
            dx="12"
            fill="var(--ink-soft)"
            fontFamily="var(--font-outfit), Outfit, sans-serif"
            fontSize="16"
            fontWeight="500"
          >
            Labs
          </tspan>
        </text>
      </svg>
    </Link>
  );
}
