import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import {
  getProductFamilies,
  resolveFamilyAndVariant,
} from "@/data/products";

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
  return {
    title: resolved.family.name,
    description: resolved.family.description,
  };
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

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <div className="mb-6 text-sm text-[#6b7189]">
          <Link href="/store" className="hover:text-[#1e2235]">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#1e2235]">{family.name}</span>
        </div>

        <ProductPurchasePanel family={family} initialVariantSlug={variant.slug} />
      </div>
    </section>
  );
}
