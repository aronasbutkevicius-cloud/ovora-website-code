import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { familyStrengthSummary, ProductFamilyHub } from "@/components/ProductFamilyHub";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { storeCategories } from "@/data/categories";
import {
  getProduct,
  getProductFamily,
  isFamilyHubSlug,
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
  if (!family) return { title: "Product Not Found" };

  if (isFamilyHubSlug(slug)) {
    return gatedMetadata({
      title: family.name,
      description: familyStrengthSummary(family),
      path: `/products/${family.slug}`,
      image: ogImageFor(family.image, `${family.name} research material`),
    });
  }

  const variant = family.variants.find((item) => item.slug === slug);
  if (!variant) return { title: "Product Not Found" };
  const doseLabel = `${family.name} ${variant.dose}`;
  return gatedMetadata({
    title: doseLabel,
    absoluteTitle: `${doseLabel} | Ovora Labs`,
    description: `${doseLabel} from Ovora Labs. ${family.description} Sold as a single vial for laboratory research use only.`,
    path: `/products/${variant.slug}`,
    image: ogImageFor(variant.image, `${doseLabel} from Ovora Labs`),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const direct = getProduct(slug);
  if (direct?.withheld) redirect("/store");
  const redirectTo = legacyProductRedirect(slug);
  if (redirectTo) permanentRedirect(`/products/${redirectTo}`);

  const family = getProductFamily(slug);
  if (!family) notFound();

  if (isFamilyHubSlug(slug)) {
    return <ProductFamilyHub family={family} />;
  }

  const variant = family.variants.find((item) => item.slug === slug);
  if (!variant) notFound();

  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/products/${variant.slug}`;
  const category = categoryFor(family);
  const doseLabel = `${family.name} ${variant.dose}`;
  const hub =
    family.variants.length > 1 && !family.variants.some((item) => item.slug === family.slug);

  const breadcrumbs = [
    { name: "Home", item: siteUrl },
    { name: "Products", item: `${siteUrl}/store` },
    ...(category
      ? [{ name: category.label, item: `${siteUrl}/store/${category.slug}` }]
      : []),
    ...(hub ? [{ name: family.name, item: `${siteUrl}/products/${family.slug}` }] : []),
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
            url: productUrl,
            sku: variant.slug,
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
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/store/${category.slug}`} className="hover:text-[#1e2235]">
                {category.label}
              </Link>
            </>
          )}
          {hub && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/products/${family.slug}`} className="hover:text-[#1e2235]">
                {family.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-[#1e2235]">{doseLabel}</span>
        </div>

        <ProductPurchasePanel
          key={variant.slug}
          family={family}
          initialVariantSlug={variant.slug}
        />
      </div>
    </section>
  );
}
