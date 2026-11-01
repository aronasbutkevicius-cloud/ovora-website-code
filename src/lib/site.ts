import type { Metadata } from "next";

export const siteName = "Ovora Labs";

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
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
}): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = absoluteTitle ?? `${title} | ${siteName}`;

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
    },
  };
}
