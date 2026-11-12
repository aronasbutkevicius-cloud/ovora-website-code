/**
 * Storefront knobs the owner can edit. Catalog vial prices stay in src/data/products.ts.
 * Bundle rates, the ship cutoff, and delivery offsets are placeholders except for the
 * cutoff clock, which is 3:30 PM America/Chicago every day.
 */

export const storefront = {
  /** Shown only when a product also has compareAtPrice set. Leave false until real compare-at prices exist. */
  compareAtEnabled: false,

  /** Volume rates for single-vial listings. Each unit is one vial. Not a catalog price. */
  bundles: [
    { quantity: 1, rate: 0, badge: null },
    { quantity: 2, rate: 0.1, badge: "Most popular" },
    { quantity: 3, rate: 0.15, badge: "Best value" },
  ],

  /** Same dollar threshold already used for free US shipping. */
  freeShippingUsd: 100,

  /**
   * Daily ship cutoff. 7 days a week. America/Chicago follows CST and CDT.
   * Before this clock, the order is treated as shipping the same Chicago calendar day.
   */
  cutoff: {
    timeZone: "America/Chicago",
    hour: 15,
    minute: 30,
  },

  /** Calendar days added to the ship date for the estimated arrival window. */
  deliveryDays: {
    min: 2,
    max: 5,
  },

  /** Display-only marks. This list does not enable a payment processor. */
  acceptedPayments: [
    { id: "visa", label: "Visa" },
    { id: "mastercard", label: "Mastercard" },
    { id: "discover", label: "Discover" },
    { id: "amex", label: "Amex" },
    { id: "apple-pay", label: "Apple Pay" },
    { id: "google-pay", label: "Google Pay" },
  ],
} as const;

export type BundleTier = (typeof storefront.bundles)[number];

export function bundleRateForQuantity(quantity: number, form?: string) {
  if (form === "liquid") return 0;
  let rate = 0;
  for (const tier of storefront.bundles) {
    if (quantity >= tier.quantity) rate = tier.rate;
  }
  return rate;
}

export function lineCentsFor(unitCents: number, quantity: number, form?: string) {
  const rate = bundleRateForQuantity(quantity, form);
  return Math.round(unitCents * quantity * (1 - rate));
}

export function activeBundle(quantity: number, form?: string) {
  if (form === "liquid") return storefront.bundles[0];
  let match: BundleTier = storefront.bundles[0];
  for (const tier of storefront.bundles) {
    if (quantity >= tier.quantity) match = tier;
  }
  return match;
}

type Ymd = { year: number; month: number; day: number };

function zoneParts(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const bag: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) bag[part.type] = part.value;
  let hour = Number(bag.hour);
  if (hour === 24) hour = 0;
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour,
    minute: Number(bag.minute),
    second: Number(bag.second),
  };
}

function zoneOffsetMs(date: Date, timeZone: string) {
  const part = zoneParts(date, timeZone);
  const asUtc = Date.UTC(part.year, part.month - 1, part.day, part.hour, part.minute, part.second);
  return asUtc - date.getTime();
}

export function zonedWallTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  let offset = zoneOffsetMs(new Date(utcGuess), timeZone);
  let instant = utcGuess - offset;
  offset = zoneOffsetMs(new Date(instant), timeZone);
  instant = utcGuess - offset;
  return new Date(instant);
}

function addDays(date: Ymd, days: number): Ymd {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day));
  next.setUTCDate(next.getUTCDate() + days);
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

export function shipWindow(now: Date) {
  const { timeZone, hour, minute } = storefront.cutoff;
  const here = zoneParts(now, timeZone);
  const today: Ymd = { year: here.year, month: here.month, day: here.day };
  const todayCutoff = zonedWallTime(today.year, today.month, today.day, hour, minute, timeZone);
  const sameDay = now.getTime() < todayCutoff.getTime();
  const ship = sameDay ? today : addDays(today, 1);
  const cutoff = sameDay
    ? todayCutoff
    : zonedWallTime(ship.year, ship.month, ship.day, hour, minute, timeZone);
  return { sameDay, cutoff, ship, timeZone };
}

export function formatRemaining(ms: number) {
  const minutes = Math.max(0, Math.floor(ms / 60000));
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours <= 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
}

export function formatChicagoDate(date: Ymd) {
  const instant = zonedWallTime(date.year, date.month, date.day, 12, 0, storefront.cutoff.timeZone);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: storefront.cutoff.timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(instant);
}

export function deliveryWindow(now: Date) {
  const { ship, sameDay } = shipWindow(now);
  const start = addDays(ship, storefront.deliveryDays.min);
  const end = addDays(ship, storefront.deliveryDays.max);
  return {
    sameDay,
    startLabel: formatChicagoDate(start),
    endLabel: formatChicagoDate(end),
  };
}
