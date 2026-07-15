import Link from "next/link";

export function DarkLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Link
      href="/dark"
      className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 rounded-sm"
      aria-label="Dark Ovora Labs home"
    >
      <svg
        className={className}
        viewBox="0 0 280 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <title>Dark Ovora Labs</title>
        <circle cx="18" cy="20" r="14" fill="#0a0a0c" stroke="#ff0040" strokeWidth="1.5" />
        <path
          d="M18 10c-2.8 3.2-4.2 6.4-4.2 10s1.4 6.8 4.2 10c2.8-3.2 4.2-6.4 4.2-10S20.8 13.2 18 10Z"
          fill="#ff0040"
        />
        <circle cx="18" cy="20" r="3.2" fill="#0a0a0c" />
        <text
          x="40"
          y="26"
          fill="#f2f2f5"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="18"
          fontWeight="600"
          letterSpacing="-0.3"
        >
          Dark Ovora Labs
        </text>
      </svg>
    </Link>
  );
}
