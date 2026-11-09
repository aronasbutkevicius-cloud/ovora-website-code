import type { MetadataRoute } from "next";
import { storeCategories } from "@/data/categories";
import { getProductFamilies } from "@/data/products";
import { getSiteUrl } from "@/lib/site";

const staticPaths = [
  "/",
  "/store",
  "/research-use",
  "/research",
  "/quality",
  "/coa",
  "/faq",
  "/shipping",
  "/returns",
  "/contact",
  "/disclaimer",
  "/terms",
  "/privacy",
  "/cart",
  "/checkout",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const pages = staticPaths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/store" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : path === "/store" ? 0.9 : 0.6,
  }));

  const categories = storeCategories.map((category) => ({
    url: `${siteUrl}/store/${category.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const products = getProductFamilies().flatMap((family) => {
    const slugs = new Set([family.slug, ...family.variants.map((variant) => variant.slug)]);
    return [...slugs].map((slug) => ({
      url: `${siteUrl}/products/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  });

  return [...pages, ...categories, ...products];
}
