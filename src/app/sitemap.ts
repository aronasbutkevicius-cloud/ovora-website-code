import type { MetadataRoute } from "next";
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const pages = staticPaths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
  }));

  const products = getProductFamilies().map((family) => ({
    url: `${siteUrl}/products/${family.slug}`,
    lastModified,
  }));

  return [...pages, ...products];
}
