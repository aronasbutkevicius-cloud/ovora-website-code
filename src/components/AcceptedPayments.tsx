import { storefront } from "@/lib/storefront";

export function AcceptedPayments({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted mb-2">We accept</p>
      <ul className="flex flex-wrap gap-1.5">
        {storefront.acceptedPayments.map((method) => (
          <li key={method.id}>
            <span className="inline-flex items-center h-7 px-2.5 rounded-md border border-line bg-white text-[11px] font-semibold tracking-wide text-ink-soft">
              {method.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
