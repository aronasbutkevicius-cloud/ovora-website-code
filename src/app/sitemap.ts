import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const staticPaths = [
  "/",
  "/about",
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

  return staticPaths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));
}
