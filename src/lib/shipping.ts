import { storefront } from "@/lib/storefront";

/** US shipping estimate used by the cart, checkout, and free-shipping bar. */
export const FREE_SHIPPING_THRESHOLD = storefront.freeShippingUsd;
export const FLAT_SHIPPING_USD = 8.99;

export function shippingCost(subtotal: number) {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return FLAT_SHIPPING_USD;
}

export function amountUntilFreeShipping(subtotal: number) {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}

export function freeShippingProgress(subtotal: number) {
  if (subtotal <= 0) return 0;
  return Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
}
