import { darkThemes, type DarkProduct } from "@/data/darkProducts";

export function DarkVial({
  product,
  className = "w-full h-auto",
}: {
  product: DarkProduct;
  className?: string;
}) {
  const t = darkThemes[product.theme];

  return (
    <svg className={className} viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`dark-glass-${product.slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a32" />
          <stop offset="50%" stopColor="#121218" />
          <stop offset="100%" stopColor="#0a0a0e" />
        </linearGradient>
        <filter id={`dark-glow-${product.slug}`}>
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={t.glow} floodOpacity="0.55" />
        </filter>
      </defs>

      {/* cap */}
      <rect x="70" y="18" width="60" height="28" rx="6" fill="#1a1a1f" stroke={t.accent} strokeWidth="1.5" />
      <rect x="78" y="10" width="44" height="12" rx="3" fill="#2a2a30" />

      {/* neck */}
      <rect x="82" y="46" width="36" height="28" fill="#16161c" stroke="#2a2a32" />

      {/* body */}
      <rect
        x="48"
        y="74"
        width="104"
        height="210"
        rx="18"
        fill={`url(#dark-glass-${product.slug})`}
        stroke={t.accent}
        strokeWidth="1.5"
        filter={`url(#dark-glow-${product.slug})`}
      />

      {/* label */}
      <rect x="58" y="120" width="84" height="120" rx="8" fill={t.label} stroke={t.accent} strokeWidth="1" />
      <text
        x="100"
        y="155"
        textAnchor="middle"
        fill={t.accent}
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-poppins), sans-serif"
      >
        {product.name.toUpperCase()}
      </text>
      <text
        x="100"
        y="178"
        textAnchor="middle"
        fill="#aaa"
        fontSize="9"
        fontFamily="var(--font-poppins), sans-serif"
      >
        {product.dose}
      </text>
      <text
        x="100"
        y="205"
        textAnchor="middle"
        fill="#666"
        fontSize="7"
        fontFamily="var(--font-poppins), sans-serif"
      >
        DARK OVORA
      </text>
      <circle cx="100" cy="225" r="6" fill={t.accent} opacity="0.85" />
    </svg>
  );
}
