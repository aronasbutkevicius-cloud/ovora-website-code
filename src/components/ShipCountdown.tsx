"use client";

import { useEffect, useState } from "react";
import { deliveryWindow, formatRemaining, shipWindow } from "@/lib/storefront";

export function ShipCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now == null) {
    return <p className="text-sm text-muted min-h-5" aria-hidden="true" />;
  }

  const clock = new Date(now);
  const schedule = shipWindow(clock);
  const arrival = deliveryWindow(clock);
  const remaining = formatRemaining(schedule.cutoff.getTime() - clock.getTime());
  const headline = schedule.sameDay
    ? `Order within ${remaining} for same-day shipping`
    : `Order within ${remaining} to ship tomorrow`;

  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Cutoff</p>
        <p className="text-sm font-medium text-ink">{headline}</p>
        <p className="text-sm text-ink-soft">Cutoff is 3:30 PM Central, every day.</p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Ship</p>
        <p className="text-sm text-ink-soft">
          {schedule.sameDay ? "Same calendar day" : "Next calendar day"} when ordered before 3:30 PM
          Central. Processing is typically 0–2 business days. Overnight delivery is available.
        </p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Arrival</p>
        <p className="text-sm text-ink-soft">
          Estimated {arrival.startLabel} – {arrival.endLabel}, counted from the ship date.
        </p>
      </div>
    </div>
  );
}
