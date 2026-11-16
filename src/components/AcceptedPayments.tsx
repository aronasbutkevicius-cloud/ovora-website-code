import type { ReactNode } from "react";
import { storefront } from "@/lib/storefront";

function VisaMark() {
  return (
    <svg viewBox="0 0 64 22" className="h-5 w-auto" aria-hidden="true">
      <text
        x="2"
        y="17"
        fill="#1A1F71"
        fontFamily="Arial, Helvetica, sans-serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="18"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-hidden="true">
      <circle cx="13" cy="12" r="10" fill="#EB001B" />
      <circle cx="25" cy="12" r="10" fill="#F79E1B" />
      <path fill="#FF5F00" d="M19 4.4a10 10 0 0 0 0 15.2 10 10 0 0 0 0-15.2z" />
    </svg>
  );
}

function AmexMark() {
  return (
    <svg viewBox="0 0 46 24" className="h-6 w-auto" aria-hidden="true">
      <rect width="46" height="24" rx="3" fill="#006FCF" />
      <text
        x="23"
        y="16"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="10"
        fontWeight="700"
      >
        AMEX
      </text>
    </svg>
  );
}

function DiscoverMark() {
  return (
    <svg viewBox="0 0 92 24" className="h-6 w-auto" aria-hidden="true">
      <text
        x="0"
        y="16"
        fill="#231F20"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        DISC
      </text>
      <circle cx="52" cy="12" r="8" fill="#FF6000" />
      <text
        x="62"
        y="16"
        fill="#231F20"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        VER
      </text>
    </svg>
  );
}

function ApplePayMark() {
  return (
    <svg viewBox="0 0 58 24" className="h-6 w-auto" aria-hidden="true">
      <rect width="58" height="24" rx="4" fill="#000000" />
      <path
        fill="#ffffff"
        d="M14.2 8.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2zm.7 1.2c-1.4-.1-2.5.8-3.2.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.5 2.2 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.8.7 1.8-1.1 2.5-2.1c.8-1.1 1.1-2.2 1.1-2.3 0 0-2.2-.8-2.2-3.3 0-2.1 1.7-3.1 1.8-3.2-.1-.1-1.6-1.2-2.9-1z"
      />
      <text
        x="22"
        y="16"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        Pay
      </text>
    </svg>
  );
}

function GooglePayMark() {
  return (
    <svg viewBox="0 0 74 24" className="h-6 w-auto" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.2c0-.6-.1-1.2-.2-1.8H12v3.4h5.4c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.9-4.1 2.9-6.9z" />
      <path fill="#34A853" d="M12 21.5c2.6 0 4.7-.8 6.3-2.3l-3.1-2.4c-.8.6-1.9 1-3.2 1-2.5 0-4.6-1.7-5.3-3.9H3.5v2.5C5.1 19.4 8.3 21.5 12 21.5z" />
      <path fill="#FBBC05" d="M6.7 13.9A5.8 5.8 0 0 1 6.4 12c0-.7.1-1.3.3-1.9V7.6H3.5A9.5 9.5 0 0 0 2.5 12c0 1.5.4 3 1 4.4l3.2-2.5z" />
      <path fill="#EA4335" d="M12 6.2c1.4 0 2.7.5 3.6 1.4l2.7-2.7C16.7 3.4 14.6 2.5 12 2.5 8.3 2.5 5.1 4.6 3.5 7.6l3.2 2.5C7.4 7.9 9.5 6.2 12 6.2z" />
      <text
        x="26"
        y="16"
        fill="#3C4043"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="13"
        fontWeight="600"
      >
        Pay
      </text>
    </svg>
  );
}

const marks: Record<string, () => ReactNode> = {
  visa: VisaMark,
  mastercard: MastercardMark,
  discover: DiscoverMark,
  amex: AmexMark,
  "apple-pay": ApplePayMark,
  "google-pay": GooglePayMark,
};

export function AcceptedPayments({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">We accept</p>
      <ul className="flex flex-wrap items-center gap-2">
        {storefront.acceptedPayments.map((method) => {
          const Mark = marks[method.id];
          return (
            <li key={method.id}>
              <span
                className="inline-flex h-7 items-center rounded-md border border-line bg-white px-1.5"
                role="img"
                aria-label={method.label}
              >
                {Mark ? <Mark /> : <span className="text-[11px] font-semibold text-ink">{method.label}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
