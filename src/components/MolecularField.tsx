/** Subtle ball-and-stick molecular decorations + soft wave lines (bottle-style). */
export function MolecularField({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}
      aria-hidden
    >
      <svg
        className="molecule-float-a absolute -left-8 top-[12%] w-[240px] md:w-[300px] opacity-[0.28] text-[#7a8fd4]"
        viewBox="0 0 200 160"
        fill="none"
      >
        <MoleculeA />
      </svg>
      <svg
        className="molecule-float-b absolute -right-10 top-[38%] w-[260px] md:w-[340px] opacity-[0.24] text-[#8b9ad9]"
        viewBox="0 0 200 160"
        fill="none"
      >
        <MoleculeB />
      </svg>
      <svg
        className="molecule-float-c absolute left-[18%] bottom-[8%] w-[220px] md:w-[280px] opacity-[0.22] text-[#7a8fd4]"
        viewBox="0 0 200 160"
        fill="none"
      >
        <MoleculeA />
      </svg>
      <svg
        className="molecule-waves absolute right-[8%] bottom-[18%] w-[300px] md:w-[400px] opacity-[0.22] text-[#a8b6e8]"
        viewBox="0 0 320 120"
        fill="none"
      >
        <WaveLines />
      </svg>
      <svg
        className="molecule-waves-slow absolute left-[5%] top-[55%] w-[260px] md:w-[320px] opacity-[0.18] text-[#8b9ad9]"
        viewBox="0 0 320 120"
        fill="none"
      >
        <WaveLines />
      </svg>
    </div>
  );
}

/** Compact molecule mark for section accents */
export function MoleculeMark({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={`molecule-spin-slow text-[#7a8fd4]/55 ${className}`} viewBox="0 0 200 160" fill="none" aria-hidden>
      <MoleculeB />
    </svg>
  );
}

function MoleculeA() {
  return (
    <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <line x1="40" y1="90" x2="80" y2="55" />
      <line x1="80" y1="55" x2="120" y2="70" />
      <line x1="120" y1="70" x2="150" y2="40" />
      <line x1="120" y1="70" x2="155" y2="105" />
      <line x1="80" y1="55" x2="70" y2="20" />
      <line x1="40" y1="90" x2="55" y2="130" />
      <circle cx="40" cy="90" r="7" fill="currentColor" opacity="0.85" />
      <circle cx="80" cy="55" r="8" fill="currentColor" />
      <circle cx="120" cy="70" r="9" fill="currentColor" />
      <circle cx="150" cy="40" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="155" cy="105" r="6.5" fill="currentColor" opacity="0.75" />
      <circle cx="70" cy="20" r="5.5" fill="currentColor" opacity="0.7" />
      <circle cx="55" cy="130" r="5" fill="currentColor" opacity="0.65" />
    </g>
  );
}

function MoleculeB() {
  return (
    <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <line x1="60" y1="40" x2="100" y2="55" />
      <line x1="100" y1="55" x2="140" y2="35" />
      <line x1="100" y1="55" x2="95" y2="100" />
      <line x1="95" y1="100" x2="55" y2="120" />
      <line x1="95" y1="100" x2="140" y2="125" />
      <line x1="140" y1="35" x2="165" y2="70" />
      <circle cx="60" cy="40" r="6.5" fill="currentColor" opacity="0.8" />
      <circle cx="100" cy="55" r="9" fill="currentColor" />
      <circle cx="140" cy="35" r="6" fill="currentColor" opacity="0.85" />
      <circle cx="95" cy="100" r="7.5" fill="currentColor" />
      <circle cx="55" cy="120" r="5.5" fill="currentColor" opacity="0.7" />
      <circle cx="140" cy="125" r="6" fill="currentColor" opacity="0.75" />
      <circle cx="165" cy="70" r="5" fill="currentColor" opacity="0.65" />
    </g>
  );
}

function WaveLines() {
  return (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round">
      <path d="M10 90 C60 70, 110 110, 160 80 S260 40, 310 60" className="wave-path" />
      <path d="M10 100 C70 78, 120 118, 170 90 S270 50, 310 72" opacity="0.75" className="wave-path" />
      <path d="M10 110 C55 95, 130 125, 180 100 S265 65, 310 85" opacity="0.55" className="wave-path" />
      <path d="M20 80 C75 55, 140 95, 200 70 S280 35, 310 50" opacity="0.4" className="wave-path" />
    </g>
  );
}
