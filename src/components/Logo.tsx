import Link from "next/link";

export function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Ovora Labs home"
      className={`inline-flex items-center rounded-sm font-sans font-extrabold lowercase leading-none tracking-[-0.045em] text-ink ${className}`}
    >
      <span aria-hidden className="relative inline-block h-[1em] w-[0.68em] align-baseline">
        <svg viewBox="0 0 100 100" className="absolute left-1/2 h-[0.62em] w-[0.62em] -translate-x-1/2 bottom-[-0.02em]" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="31"
            fill="none"
            stroke="currentColor"
            strokeWidth="34"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="86 14"
            strokeDashoffset="25"
          />
        </svg>
      </span>
      <span aria-hidden>vora</span>
    </Link>
  );
}
