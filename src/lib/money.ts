export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function formatCents(cents: number) {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}$${(abs / 100).toFixed(2)}`;
}

export function toCents(price: number) {
  return Math.round(price * 100);
}
