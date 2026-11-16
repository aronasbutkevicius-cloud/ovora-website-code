"use client";

import { useEffect, useState } from "react";
import { deliveryWindow, formatRemaining, shipWindow } from "@/lib/storefront";

type Variant = "callout" | "details";

export function ShipCountdown({ variant = "details" }: { variant?: Variant }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const clock = now == null ? null : new Date(now);
  const schedule = clock ? shipWindow(clock) : null;
  const arrival = clock ? deliveryWindow(clock) : null;
  const remaining = schedule && clock ? formatRemaining(schedule.cutoff.getTime() - clock.getTime()) : null;
  const headline =
    schedule && remaining
      ? schedule.sameDay
        ? `Order within ${remaining} for same-day shipping`
        : `Order within ${remaining} to ship tomorrow`
      : null;

  if (variant === "callout") {
    return (
      <div className="rounded-xl border border-[#1494c6] bg-[#e7f6ff] px-3 py-2.5 shadow-[0_10px_28px_rgba(14,103,148,0.14)] lg:px-4 lg:py-3">
        <p className="text-sm font-extrabold tracking-[0.16em] text-[#0a587c]">SAME DAY SHIPPING</p>
        <p className="mt-1 text-base font-bold leading-snug text-ink">
          Orders before 3:30 PM CST ship same day.
        </p>
        <p className="mt-1 min-h-5 text-sm font-semibold text-[#0c6a96]">
          {headline ?? "Cutoff is 3:30 PM Central, every day."}
        </p>
      </div>
    );
  }

  if (!schedule || !arrival || !headline) {
    return <p className="min-h-5 text-sm text-muted" aria-hidden="true" />;
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="index-label">Cutoff</p>
        <p className="text-sm font-medium text-ink">{headline}</p>
        <p className="text-sm text-ink-soft">Cutoff is 3:30 PM Central, every day.</p>
      </div>
      <div>
        <p className="index-label">Ship</p>
        <p className="text-sm text-ink-soft">
          {schedule.sameDay ? "Same calendar day" : "Next calendar day"} when ordered before 3:30 PM
          Central. Processing is typically 0–2 business days. Overnight delivery is available.
        </p>
      </div>
      <div>
        <p className="index-label">Arrival</p>
        <p className="text-sm text-ink-soft">
          Estimated {arrival.startLabel} – {arrival.endLabel}, counted from the ship date.
        </p>
      </div>
    </div>
  );
}
