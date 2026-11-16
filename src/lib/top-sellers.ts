import { getProduct, getProductFamilies, type ProductFamily } from "@/data/products";
import { listSoldVariantQuantities } from "@/lib/auth/accounts";

export const TOP_SELLER_COUNT = 4;

/**
 * Flagship compounds used when stored orders do not already fill the row.
 * Retatrutide leads; the rest are other popular single-vial listings.
 */
export const CURATED_TOP_SELLER_SLUGS = ["retatrutide", "tirzepatide", "bpc-157", "cjc-ipa"] as const;

export type TopSellerSource = "orders" | "curated";

function curatedFamilies(bySlug: Map<string, ProductFamily>) {
  return CURATED_TOP_SELLER_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (family): family is ProductFamily => Boolean(family),
  );
}

/**
 * Rank catalog families for the signed-in homepage.
 * Real order quantities win. Empty, failed, or short histories fall back to
 * the curated flagship list so the row still shows a few vials.
 */
export function rankTopSellerFamilies(
  soldByVariant: Map<string, number> | null,
  limit = TOP_SELLER_COUNT,
): { families: ProductFamily[]; source: TopSellerSource } {
  const families = getProductFamilies();
  const bySlug = new Map(families.map((family) => [family.slug, family]));
  const curated = curatedFamilies(bySlug);
  const units = new Map<string, number>();

  if (soldByVariant) {
    for (const [variantSlug, quantity] of soldByVariant) {
      if (!Number.isInteger(quantity) || quantity < 1) continue;
      const product = getProduct(variantSlug);
      if (!product || product.withheld) continue;
      const family = families.find((entry) =>
        entry.variants.some((variant) => variant.slug === variantSlug),
      );
      if (!family) continue;
      units.set(family.slug, (units.get(family.slug) ?? 0) + quantity);
    }
  }

  const curatedRank = new Map<string, number>(
    CURATED_TOP_SELLER_SLUGS.map((slug, index) => [slug, index]),
  );
  const ranked = [...units.entries()]
    .filter(([, quantity]) => quantity > 0)
    .sort((left, right) => {
      if (right[1] !== left[1]) return right[1] - left[1];
      const leftRank = curatedRank.get(left[0]) ?? Number.MAX_SAFE_INTEGER;
      const rightRank = curatedRank.get(right[0]) ?? Number.MAX_SAFE_INTEGER;
      if (leftRank !== rightRank) return leftRank - rightRank;
      return left[0].localeCompare(right[0]);
    })
    .map(([slug]) => bySlug.get(slug))
    .filter((family): family is ProductFamily => Boolean(family));

  if (ranked.length === 0) {
    return { families: curated.slice(0, limit), source: "curated" };
  }

  const chosen: ProductFamily[] = [];
  const seen = new Set<string>();
  for (const family of [...ranked, ...curated]) {
    if (chosen.length >= limit) break;
    if (seen.has(family.slug)) continue;
    seen.add(family.slug);
    chosen.push(family);
  }

  return { families: chosen, source: "orders" };
}

export async function getTopSellers() {
  const sold = await listSoldVariantQuantities();
  return rankTopSellerFamilies(sold);
}
