import { Comfortaa } from "next/font/google";
import type { ReactNode } from "react";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

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

function Logotype({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return <p className={`font-semibold leading-none text-ink ${className}`}>{children}</p>;
}

/** Ovora Labs in one sans, wide tracking, with a cerulean point in the O. */
export function LogoTypeE({ className = "" }: { className?: string }) {
  return (
    <Logotype className={`font-sans tracking-[0.14em] ${className}`}>
      <span className="relative inline-block">
        O
        <span className="absolute left-1/2 top-1/2 h-[0.22em] w-[0.22em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7ec4e4]" />
      </span>
      vora Labs
    </Logotype>
  );
}

/** Standalone capitals. */
export function LogoTypeF({ className = "" }: { className?: string }) {
  return (
    <Logotype className={`font-sans tracking-[0.28em] ${className}`}>
      <span className="border-b-[0.08em] border-[#1494c6] pb-[0.08em]">OVORA</span>
    </Logotype>
  );
}

/** Standalone name in the site display face. */
export function LogoTypeG({ className = "" }: { className?: string }) {
  return (
    <Logotype className={`font-display tracking-tight ${className}`}>
      <span className="relative inline-block">
        O
        <span className="absolute -bottom-[0.06em] left-[0.12em] right-[0.12em] h-[0.06em] rounded-full bg-[#0c6a96]" />
      </span>
      vora
    </Logotype>
  );
}

export const logoTypeOptions = [
  { id: "E", name: "Ovora Labs", Type: LogoTypeE },
  { id: "F", name: "OVORA", Type: LogoTypeF },
  { id: "G", name: "Ovora", Type: LogoTypeG },
] as const;

type LogoTone = "ink" | "onDark";
type LogoTypeProps = { className?: string; tone?: LogoTone };

function toneInk(tone: LogoTone = "ink") {
  return tone === "onDark" ? "text-[#f4f9fc]" : "text-ink";
}

function toneAccent(tone: LogoTone = "ink") {
  return tone === "onDark" ? "text-[#8ecfeb]" : "text-[#0c6a96]";
}

/** Ovora, with the r shoulder continued into the a. */
export function LogoTypeH({ className = "", tone = "ink" }: LogoTypeProps) {
  return (
    <p
      aria-label="Ovora"
      className={`inline-block whitespace-nowrap font-sans font-semibold leading-none tracking-[-0.04em] ${toneInk(tone)} ${className}`}
    >
      <span aria-hidden>Ovo</span>
      <span aria-hidden className="relative inline-block">
        <span>r</span>
        <span className="-ml-[0.05em]">a</span>
        <span className="absolute left-[0.32em] top-[0.37em] h-[0.065em] w-[0.2em] rounded-full bg-current" />
      </span>
    </p>
  );
}

/** OVORA over LABS, the small line stretched to the same width. */
export function LogoTypeI({ className = "", tone = "ink" }: LogoTypeProps) {
  return (
    <p aria-label="Ovora Labs" className={`inline-flex w-max flex-col leading-none ${className}`}>
      <span aria-hidden className={`flex gap-[0.16em] font-sans text-[1em] font-semibold ${toneInk(tone)}`}>
        {["O", "V", "O", "R", "A"].map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </span>
      <span
        aria-hidden
        className={`mt-[0.22em] flex justify-between font-sans text-[0.4em] font-medium tracking-normal ${toneAccent(tone)}`}
      >
        {["L", "A", "B", "S"].map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </span>
    </p>
  );
}

/** Bold geometric lowercase. The first o is a perfect circle with a cut. */
export function LogoTypeJ({ className = "", tone = "ink" }: LogoTypeProps) {
  return (
    <p
      aria-label="ovora"
      className={`inline-block whitespace-nowrap font-sans font-extrabold lowercase leading-none tracking-[-0.04em] ${toneInk(tone)} ${className}`}
    >
      <span aria-hidden className="relative inline-block h-[1em] w-[0.56em] align-baseline">
        <svg viewBox="0 0 100 100" className="absolute bottom-0 left-0 h-[0.5em] w-[0.5em] overflow-visible">
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke="currentColor"
            strokeWidth="26"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="84 16"
            strokeDashoffset="21"
          />
        </svg>
      </span>
      <span aria-hidden>vora</span>
    </p>
  );
}

/** Editorial serif: italic Ovora, roman Labs, one size. */
export function LogoTypeK({ className = "", tone = "ink" }: LogoTypeProps) {
  return (
    <p aria-label="Ovora Labs" className={`whitespace-nowrap font-display leading-none ${className}`}>
      <span className={`italic font-medium tracking-[-0.03em] ${toneInk(tone)}`}>Ovora</span>
      <span className={`ml-[0.32em] font-normal not-italic tracking-[0.01em] ${toneAccent(tone)}`}>Labs</span>
    </p>
  );
}

/** Rounded monoline Ovora. */
export function LogoTypeL({ className = "", tone = "ink" }: LogoTypeProps) {
  return (
    <p
      aria-label="ovora"
      className={`${comfortaa.className} whitespace-nowrap font-semibold lowercase leading-none tracking-[0.04em] ${toneAccent(tone)} ${className}`}
    >
      ovora
    </p>
  );
}

/** Same family and cap height: OVORA bold, LABS light. */
export function LogoTypeM({ className = "", tone = "ink" }: LogoTypeProps) {
  return (
    <p
      aria-label="Ovora Labs"
      className={`inline-flex items-baseline whitespace-nowrap font-sans uppercase leading-none ${className}`}
    >
      <span className={`font-bold tracking-[0.06em] ${toneInk(tone)}`}>Ovora</span>
      <span className={`ml-[0.34em] font-light tracking-[0.14em] ${toneAccent(tone)}`}>Labs</span>
    </p>
  );
}

export const logoLetteringOptions = [
  { id: "H", name: "Ligature", note: "Ovora, with r and a joined.", Type: LogoTypeH },
  { id: "I", name: "Stacked", note: "OVORA over LABS, tracked to the same width.", Type: LogoTypeI },
  { id: "J", name: "Circle", note: "Bold lowercase ovora. The o is a perfect circle with a cut.", Type: LogoTypeJ },
  { id: "K", name: "Editorial", note: "Serif Ovora Labs, italic name and roman Labs.", Type: LogoTypeK },
  { id: "L", name: "Monoline", note: "Rounded monoline ovora.", Type: LogoTypeL },
  { id: "M", name: "Split weight", note: "OVORA bold and LABS light, one family, one cap height.", Type: LogoTypeM },
] as const;
