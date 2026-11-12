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
    <div className="space-y-2">
      <p className="text-sm font-medium text-ink">{headline}</p>
      <p className="text-sm text-ink-soft leading-relaxed">
        Estimated delivery {arrival.startLabel} – {arrival.endLabel}, counted from the{" "}
        {arrival.sameDay ? "same-day" : "next-day"} ship date. Cutoff is 3:30 PM Central, every day.
      </p>
    </div>
  );
}
