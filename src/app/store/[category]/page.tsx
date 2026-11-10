import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StoreCatalog } from "@/components/StoreCatalog";
import { getStoreCategory, storeCategories } from "@/data/categories";
import { gatedMetadata, getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return storeCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getStoreCategory(slug);
  if (!category) return { title: "Category not found", robots: { index: false, follow: false } };
  return gatedMetadata({
    title: category.title,
    description: category.description,
    path: `/store/${category.slug}`,
  });
}

export default async function StoreCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { category: slug } = await params;
  const category = getStoreCategory(slug);
  if (!category) notFound();
  const { q } = await searchParams;
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/store` },
            {
              "@type": "ListItem",
              position: 3,
              name: category.label,
              item: `${siteUrl}/store/${category.slug}`,
            },
          ],
        }}
      />
      <StoreCatalog category={category.id} query={(q ?? "").trim()} />
    </>
  );
}
