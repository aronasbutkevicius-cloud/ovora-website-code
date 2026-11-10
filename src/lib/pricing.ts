import { FIRST_ORDER_RATE } from "@/lib/compliance";
import { getProduct, getProductFamily } from "@/data/products";
import { toCents } from "@/lib/money";
import type { DiscountState } from "@/lib/auth/accounts";
import type { OrderLine } from "@/lib/auth/accounts";

export type QuoteLine = OrderLine & {
  lineCents: number;
  image?: string;
  familySlug: string;
};

export type CartQuote = {
  lines: QuoteLine[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  discountState: DiscountState | "empty";
};

export function shippingCentsFor(subtotalCents: number) {
  if (subtotalCents <= 0) return 0;
  if (subtotalCents >= 10000) return 0;
  return 899;
}

export function quoteLines(items: { variantSlug: string; quantity: number }[]): {
  lines: QuoteLine[];
  error?: string;
} {
  if (!Array.isArray(items) || items.length === 0) {
    return { lines: [] };
  }
  const lines: QuoteLine[] = [];
  for (const item of items) {
    const slug = typeof item?.variantSlug === "string" ? item.variantSlug : "";
    const quantity = Number(item?.quantity);
    if (!slug || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return { lines: [], error: "Check the quantities in your cart." };
    }
    const product = getProduct(slug);
    if (!product || product.withheld) {
      return { lines: [], error: "An item in the cart is no longer available." };
    }
    const unitCents = toCents(product.price);
    const family = getProductFamily(product.slug);
    lines.push({
      variantSlug: product.slug,
      familySlug: family?.slug ?? product.slug,
      name: product.name,
      dose: product.dose,
      quantity,
      unitCents,
      lineCents: unitCents * quantity,
      image: product.image,
    });
  }
  return { lines };
}

export function buildQuote(lines: QuoteLine[], discountState: DiscountState): CartQuote {
  const subtotalCents = lines.reduce((sum, line) => sum + line.lineCents, 0);
  if (lines.length === 0) {
    return {
      lines,
      subtotalCents: 0,
      discountCents: 0,
      shippingCents: 0,
      totalCents: 0,
      discountState: "empty",
    };
  }
  const discountCents =
    discountState === "eligible" ? Math.round(subtotalCents * FIRST_ORDER_RATE) : 0;
  const shippingCents = shippingCentsFor(subtotalCents);
  return {
    lines,
    subtotalCents,
    discountCents,
    shippingCents,
    totalCents: subtotalCents - discountCents + shippingCents,
    discountState,
  };
}
