import Link from "next/link";

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Link
      href="/"
      className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 rounded-sm"
      aria-label="Ovora Labs home"
    >
      <svg
        className={className}
        viewBox="0 0 220 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <title>Ovora Labs</title>
        <circle cx="18" cy="20" r="14" fill="#0a0a0a" />
        <path
          d="M18 10c-2.8 3.2-4.2 6.4-4.2 10s1.4 6.8 4.2 10c2.8-3.2 4.2-6.4 4.2-10S20.8 13.2 18 10Z"
          fill="#b8e03f"
        />
        <circle cx="18" cy="20" r="3.2" fill="#fff" />
        <text
          x="40"
          y="26"
          fill="#0a0a0a"
          fontFamily="var(--font-poppins), Poppins, sans-serif"
          fontSize="20"
          fontWeight="600"
          letterSpacing="-0.4"
        >
          Ovora Labs
        </text>
      </svg>
    </Link>
  );
}
