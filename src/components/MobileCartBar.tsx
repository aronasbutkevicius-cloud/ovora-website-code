"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatCents, toCents } from "@/lib/money";
import { lineCentsFor } from "@/lib/storefront";
import type { SessionUser } from "@/lib/auth/token";

export function MobileCartBar({ session }: { session: SessionUser | null }) {
  const { items, itemCount, ready } = useCart();
  if (!session || !ready || itemCount < 1) return null;

  const cents = items.reduce(
    (sum, item) => sum + lineCentsFor(toCents(item.price), item.quantity, item.form),
    0,
  );

  return (
    <>
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <div className="lg:hidden fixed left-[4.75rem] right-3 bottom-3 z-40 pointer-events-none">
        <Link
          href="/cart"
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-line bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(22,70,108,0.12)]"
        >
          <span className="text-sm text-ink-soft">
            {itemCount} vial{itemCount === 1 ? "" : "s"}
          </span>
          <span className="text-sm font-semibold text-ink">{formatCents(cents)}</span>
          <span className="text-sm font-medium text-accent">View cart</span>
        </Link>
      </div>
    </>
  );
}
