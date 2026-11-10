import type { Metadata } from "next";

export const siteName = "Ovora Labs";

export const rootTitle = "Ovora Labs | Research Peptides";

export const rootDescription =
  "Ovora Labs is a USA-based supplier of research-grade peptides. Every batch is third-party tested, backed by a 99%+ purity guarantee and a certificate of analysis, and sold for laboratory research use only.";

export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: rootTitle,
} as const;

/** Address already used across the site. Confirm the mailbox exists before launch. */
export const supportEmail = "support@ovoralabs.com";

/**
 * Canonical origin for metadata, sitemap, and robots.
 * Defaults to the domain implied by the support email. Override with
 * NEXT_PUBLIC_SITE_URL when the Namecheap domain is different.
 */
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ovoralabs.com";
  return raw.replace(/\/+$/, "");
}

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
  /** Product photo. Falls back to the site Open Graph image when omitted. */
  image?: { url: string; alt: string };
}): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = absoluteTitle ?? `${title} | ${siteName}`;
  const images = image ? [{ url: image.url, alt: image.alt }] : [ogImage];

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((item) => item.url),
    },
  };
}
