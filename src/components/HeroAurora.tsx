import type { CSSProperties } from "react";

/** Soft dust. The first ten stay on small screens; the rest are desktop-only. */
const specks = [
  { x: "7%", y: "16%", s: "5px", o: "0.7", dx: "14px", dy: "-22px", dur: "18s", delay: "-3s" },
  { x: "16%", y: "68%", s: "11px", o: "0.42", dx: "-16px", dy: "-14px", dur: "26s", delay: "-9s" },
  { x: "24%", y: "30%", s: "3px", o: "0.62", dx: "12px", dy: "16px", dur: "16s", delay: "-6s" },
  { x: "12%", y: "84%", s: "4px", o: "0.5", dx: "10px", dy: "-18px", dur: "22s", delay: "-12s" },
  { x: "33%", y: "12%", s: "8px", o: "0.36", dx: "-10px", dy: "18px", dur: "24s", delay: "-4s" },
  { x: "78%", y: "22%", s: "4px", o: "0.58", dx: "16px", dy: "12px", dur: "19s", delay: "-8s" },
  { x: "86%", y: "58%", s: "10px", o: "0.4", dx: "-12px", dy: "-20px", dur: "27s", delay: "-15s" },
  { x: "92%", y: "18%", s: "3px", o: "0.66", dx: "-14px", dy: "14px", dur: "17s", delay: "-2s" },
  { x: "72%", y: "78%", s: "5px", o: "0.48", dx: "12px", dy: "-16px", dur: "21s", delay: "-11s" },
  { x: "40%", y: "74%", s: "3px", o: "0.55", dx: "18px", dy: "-10px", dur: "18s", delay: "-7s" },
  { x: "48%", y: "18%", s: "4px", o: "0.32", dx: "-12px", dy: "16px", dur: "23s", delay: "-5s" },
  { x: "58%", y: "86%", s: "12px", o: "0.28", dx: "14px", dy: "-18px", dur: "30s", delay: "-16s" },
  { x: "64%", y: "42%", s: "6px", o: "0.3", dx: "-18px", dy: "-12px", dur: "25s", delay: "-10s" },
  { x: "4%", y: "46%", s: "13px", o: "0.26", dx: "18px", dy: "10px", dur: "32s", delay: "-14s" },
  { x: "96%", y: "40%", s: "7px", o: "0.34", dx: "-16px", dy: "-10px", dur: "28s", delay: "-6s" },
  { x: "28%", y: "48%", s: "3px", o: "0.28", dx: "8px", dy: "-20px", dur: "20s", delay: "-13s" },
];

export function HeroAurora() {
  return (
    <div className="hero-aurora" aria-hidden="true">
      <div className="hero-aurora__orb hero-aurora__orb-a" />
      <div className="hero-aurora__orb hero-aurora__orb-b" />
      <div className="hero-aurora__orb hero-aurora__orb-c" />
      <div className="hero-specks">
        {specks.map((speck) => (
          <span
            key={`${speck.x}-${speck.y}`}
            className="hero-speck"
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
      <div className="hero-aurora__veil" />
    </div>
  );
}
