import Link from "next/link";

export function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Ovora Labs home"
      className={`inline-flex items-baseline rounded-sm font-sans font-extrabold lowercase leading-none text-ink ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-[0.53em] w-[0.53em] shrink-0 translate-y-[0.015em] overflow-visible"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="33" fill="none" stroke="currentColor" strokeWidth="33" />
      </svg>
      <span className="ml-[0.02em] tracking-[-0.045em]">vora</span>
      <span className="ml-[0.42em] font-medium text-[max(9px,0.33em)] tracking-normal text-ink-soft">labs</span>
    </Link>
  );
}
