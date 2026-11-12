import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { storeCategories } from "@/data/categories";
import {
  familyStrengthSummary,
  getProduct,
  getProductFamily,
  legacyProductRedirect,
  type ProductFamily,
} from "@/data/products";
import { gatedMetadata, getSiteUrl, siteName } from "@/lib/site";

function categoryFor(family: ProductFamily) {
  const id = family.form === "liquid" ? "supply" : "lyophilized";
  return storeCategories.find((entry) => entry.id === id);
}

function ogImageFor(src: string | undefined, alt: string) {
  return src ? { url: src, alt } : undefined;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (legacyProductRedirect(slug)) return { title: "Redirecting" };

  const family = getProductFamily(slug);
  if (!family || family.slug !== slug) return { title: "Product Not Found" };

  return gatedMetadata({
    title: family.name,
    description: familyStrengthSummary(family),
    path: `/products/${family.slug}`,
    image: ogImageFor(family.image, `${family.name} research material`),
  });
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ size?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const direct = getProduct(slug);
  if (direct?.withheld) redirect("/store");

  const redirectTo = legacyProductRedirect(slug);
  if (redirectTo) permanentRedirect(redirectTo);

  const family = getProductFamily(slug);
  if (!family || family.slug !== slug) notFound();

  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/products/${family.slug}`;
  const category = categoryFor(family);
  const initialSize = typeof query.size === "string" ? query.size : undefined;

  const breadcrumbs = [
    { name: "Home", item: siteUrl },
    { name: "Products", item: `${siteUrl}/store` },
    ...(category ? [{ name: category.label, item: `${siteUrl}/store/${category.slug}` }] : []),
    { name: family.name, item: productUrl },
  ];

  return (
    <section className="py-12 lg:py-16 bg-canvas">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: family.name,
            description: family.description,
            url: productUrl,
            sku: family.slug,
            ...(family.image ? { image: `${siteUrl}${family.image}` } : {}),
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
        <div className="mb-6 text-sm text-muted">
          <Link href="/store" className="hover:text-ink">
            Products
          </Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/store/${category.slug}`} className="hover:text-ink">
                {category.label}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-ink">{family.name}</span>
        </div>

        <ProductPurchasePanel family={family} initialSize={initialSize} />
      </div>
    </section>
  );
}
