/** Previous catalog URLs. Kept only so old links redirect. */
export const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = {
  "/store/injectable-vials": "/store/lyophilized-peptides",
  "/store/nasal-sprays": "/store",
  "/store/accessories": "/store/laboratory-supplies",
};

export const WITHHELD_PRODUCT_SLUGS = new Set([
  "mt2-spray",
  "mt-2-spray",
  "selank-spray",
  "semax-spray",
]);

export function withheldProductRedirect(pathname: string) {
  const match = pathname.match(/^\/products\/([^/]+)\/?$/);
  if (!match) return null;
  const slug = decodeURIComponent(match[1] ?? "");
  if (!WITHHELD_PRODUCT_SLUGS.has(slug)) return null;
  return "/store";
}

export function legacyCategoryRedirect(pathname: string) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return LEGACY_CATEGORY_REDIRECTS[normalized] ?? null;
}
