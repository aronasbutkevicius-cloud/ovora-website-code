import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StoreCatalog } from "@/components/StoreCatalog";
import { StoreQuery } from "@/components/StoreQuery";
import { getStoreCategory, storeCategories } from "@/data/categories";
import { getSiteUrl, pageMetadata } from "@/lib/site";

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
  if (!category) return { title: "Category not found" };
  return pageMetadata({
    title: category.title,
    description: category.description,
    path: `/store/${category.slug}`,
  });
}

export default async function StoreCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getStoreCategory(slug);
  if (!category) notFound();
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
      <Suspense fallback={<StoreCatalog category={category.id} query="" />}>
        <StoreQuery category={category.id} />
      </Suspense>
    </>
  );
}
