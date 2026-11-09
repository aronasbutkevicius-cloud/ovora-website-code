import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { storeCategories } from "@/data/categories";
import {
  getProductFamilies,
  resolveFamilyAndVariant,
} from "@/data/products";
import { getSiteUrl, pageMetadata, siteName } from "@/lib/site";

export function generateStaticParams() {
  const families = getProductFamilies();
  const familySlugs = families.map((family) => ({ slug: family.slug }));
  const variantSlugs = families.flatMap((family) =>
    family.variants.map((variant) => ({ slug: variant.slug })),
  );

  const seen = new Set<string>();
  return [...familySlugs, ...variantSlugs].filter((entry) => {
    if (seen.has(entry.slug)) return false;
    seen.add(entry.slug);
    return true;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveFamilyAndVariant(slug);
  if (!resolved) return { title: "Product Not Found" };
  const { family, variant } = resolved;
  const doseLabel = `${family.name} ${variant.dose}`;
  return pageMetadata({
    title: doseLabel,
    absoluteTitle: `${doseLabel} | Ovora Labs`,
    description: `${doseLabel} from Ovora Labs. ${family.description} Sold as a single unit for laboratory research use only.`,
    path: `/products/${slug}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = resolveFamilyAndVariant(slug);
  if (!resolved) notFound();

  const { family, variant } = resolved;
  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/products/${slug}`;
  const categoryMatch =
    family.form === "nasal"
      ? storeCategories.find((entry) => entry.id === "nasal")
      : family.form === "accessory"
        ? storeCategories.find((entry) => entry.id === "accessory")
        : storeCategories.find((entry) => entry.id === "injectable");
  const doseLabel = `${family.name} ${variant.dose}`;

  const breadcrumbs = [
    { name: "Home", item: siteUrl },
    { name: "Products", item: `${siteUrl}/store` },
    ...(categoryMatch
      ? [{ name: categoryMatch.label, item: `${siteUrl}/store/${categoryMatch.slug}` }]
      : []),
    { name: doseLabel, item: productUrl },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: doseLabel,
            description: family.description,
            ...(variant.image ? { image: `${siteUrl}${variant.image}` } : {}),
            brand: { "@type": "Brand", name: siteName },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.name,
              item: crumb.item,
            })),
          },
        ]}
      />
      <div className="content-container">
        <div className="mb-6 text-sm text-[#6b7189]">
          <Link href="/store" className="hover:text-[#1e2235]">
            Products
          </Link>
          {categoryMatch && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/store/${categoryMatch.slug}`} className="hover:text-[#1e2235]">
                {categoryMatch.label}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-[#1e2235]">{doseLabel}</span>
        </div>

        <ProductPurchasePanel family={family} initialVariantSlug={variant.slug} />
      </div>
    </section>
  );
}
