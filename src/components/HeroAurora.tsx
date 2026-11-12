import type { CSSProperties } from "react";

const specks: Array<{
  x: string;
  y: string;
  s: string;
  o: string;
  dx: string;
  dy: string;
  dur: string;
  delay: string;
  near?: boolean;
}> = [
  { x: "8%", y: "18%", s: "4px", o: "0.7", dx: "12px", dy: "-20px", dur: "18s", delay: "-3s" },
  { x: "18%", y: "72%", s: "10px", o: "0.4", dx: "-14px", dy: "-12px", dur: "26s", delay: "-9s" },
  { x: "28%", y: "30%", s: "3px", o: "0.62", dx: "10px", dy: "14px", dur: "16s", delay: "-6s" },
  { x: "76%", y: "22%", s: "4px", o: "0.55", dx: "14px", dy: "10px", dur: "20s", delay: "-8s" },
  { x: "88%", y: "64%", s: "9px", o: "0.38", dx: "-12px", dy: "-18px", dur: "28s", delay: "-14s" },
  { x: "64%", y: "78%", s: "3px", o: "0.5", dx: "8px", dy: "-16px", dur: "17s", delay: "-2s" },
  { x: "42%", y: "14%", s: "7px", o: "0.32", dx: "-10px", dy: "16px", dur: "24s", delay: "-11s" },
  { x: "92%", y: "16%", s: "3px", o: "0.66", dx: "-12px", dy: "12px", dur: "15s", delay: "-5s" },
  { x: "14%", y: "46%", s: "12px", o: "0.22", dx: "16px", dy: "8px", dur: "30s", delay: "-16s", near: true },
  { x: "58%", y: "40%", s: "8px", o: "0.26", dx: "-16px", dy: "-10px", dur: "22s", delay: "-7s", near: true },
  { x: "70%", y: "12%", s: "5px", o: "0.34", dx: "10px", dy: "18px", dur: "19s", delay: "-4s", near: true },
  { x: "36%", y: "84%", s: "11px", o: "0.2", dx: "-8px", dy: "-14px", dur: "32s", delay: "-13s", near: true },
];

export function HeroAurora() {
  return (
    <div className="hero-aurora" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-aurora__orb hero-aurora__orb-a" />
      <div className="hero-aurora__orb hero-aurora__orb-b" />
      <div className="hero-aurora__orb hero-aurora__orb-c" />
      <div className="hero-aurora__orb hero-aurora__orb-d" />
      <div className="hero-aurora__orb hero-aurora__orb-e" />
      <svg className="hero-molecule" viewBox="0 0 320 320" fill="none">
        <g stroke="rgba(185,203,255,0.7)" strokeWidth="1.2">
          <path d="M160 40 L250 92 L250 196 L160 248 L70 196 L70 92 Z" />
          <path d="M160 40 L160 148 M250 92 L160 148 M250 196 L160 148 M160 248 L160 148 M70 196 L160 148 M70 92 L160 148" />
          <circle cx="160" cy="40" r="5" fill="rgba(215,255,244,0.8)" stroke="none" />
          <circle cx="250" cy="92" r="4" fill="rgba(185,203,255,0.8)" stroke="none" />
          <circle cx="250" cy="196" r="4" fill="rgba(185,203,255,0.75)" stroke="none" />
          <circle cx="160" cy="248" r="5" fill="rgba(126,224,234,0.8)" stroke="none" />
          <circle cx="70" cy="196" r="4" fill="rgba(185,203,255,0.75)" stroke="none" />
          <circle cx="70" cy="92" r="4" fill="rgba(185,203,255,0.8)" stroke="none" />
          <circle cx="160" cy="148" r="6" fill="rgba(247,249,255,0.85)" stroke="none" />
        </g>
      </svg>
      <div className="hero-specks">
        {specks.map((speck) => (
          <span
            key={`${speck.x}-${speck.y}`}
            className={speck.near ? "hero-speck hero-speck--near" : "hero-speck"}
            style={
              {
                "--x": speck.x,
                "--y": speck.y,
                "--s": speck.s,
                "--o": speck.o,
                "--dx": speck.dx,
                "--dy": speck.dy,
                "--dur": speck.dur,
                "--delay": speck.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
