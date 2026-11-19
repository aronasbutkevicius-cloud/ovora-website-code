import type { ReactNode } from "react";

export type LogoMarkProps = { className?: string };

function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

/** Geometric O with a single horizon stroke. */
export function LogoMarkA({ className }: LogoMarkProps) {
  return (
    <Frame className={className}>
      <circle cx="20" cy="20" r="12" stroke="#0c6a96" strokeWidth="3.2" />
      <path d="M11.5 20h17" stroke="#7ec4e4" strokeWidth="2.6" strokeLinecap="round" />
    </Frame>
  );
}

/** Abstract vial: cap, neck, and a rounded body. No needle. */
export function LogoMarkB({ className }: LogoMarkProps) {
  return (
    <Frame className={className}>
      <rect x="14" y="5" width="12" height="3.4" rx="1" fill="#0e6794" />
      <rect x="16.6" y="8.4" width="6.8" height="3" fill="#7ec4e4" />
      <path
        d="M12.2 13.2h15.6v7.2c0 6.4-3.2 11.2-7.8 11.2s-7.8-4.8-7.8-11.2v-7.2z"
        fill="#e7f6ff"
        stroke="#0c6a96"
        strokeWidth="2.15"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/** One orbital ring around a solid center. */
export function LogoMarkC({ className }: LogoMarkProps) {
  return (
    <Frame className={className}>
      <circle cx="20" cy="20" r="4.4" fill="#0e6794" />
      <ellipse
        cx="20"
        cy="20"
        rx="15"
        ry="6.2"
        stroke="#1494c6"
        strokeWidth="1.7"
        transform="rotate(-32 20 20)"
      />
      <circle cx="32.2" cy="12.6" r="2.35" fill="#7ec4e4" />
    </Frame>
  );
}

/** Faceted prism. */
export function LogoMarkD({ className }: LogoMarkProps) {
  return (
    <Frame className={className}>
      <path d="M20 5.5 34 33.5H6L20 5.5z" fill="#e7f6ff" stroke="#0c6a96" strokeWidth="2.15" strokeLinejoin="round" />
      <path d="M20 5.5v28" stroke="#7ec4e4" strokeWidth="2" />
      <path d="M20 18.5 34 33.5" stroke="#1494c6" strokeWidth="1.6" />
    </Frame>
  );
}

export const logoMarkOptions = [
  { id: "A", name: "Monogram", Mark: LogoMarkA },
  { id: "B", name: "Vial", Mark: LogoMarkB },
  { id: "C", name: "Orbit", Mark: LogoMarkC },
  { id: "D", name: "Prism", Mark: LogoMarkD },
] as const;
