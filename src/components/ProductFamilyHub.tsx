import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProductVisual } from "@/components/ProductVisual";
import { storeCategories } from "@/data/categories";
import { ProductCompliance } from "@/components/ProductCompliance";
import { formatPrice } from "@/lib/money";
import type { ProductFamily } from "@/data/products";
import { getSiteUrl, siteName } from "@/lib/site";

function categoryFor(family: ProductFamily) {
  const id = family.form === "liquid" ? "supply" : "lyophilized";
  return storeCategories.find((entry) => entry.id === id);
}

function joinDoses(doses: string[]) {
  if (doses.length <= 1) return doses[0] ?? "";
  if (doses.length === 2) return `${doses[0]} and ${doses[1]}`;
  return `${doses.slice(0, -1).join(", ")}, and ${doses[doses.length - 1]}`;
}

export function familyStrengthSummary(family: ProductFamily) {
  const doses = joinDoses(family.variants.map((variant) => variant.dose));
  return `${family.name} from Ovora Labs, available in ${doses}, each sold as a single vial. ${family.description} Research use only. Not for human or veterinary consumption.`;
}

export function ProductFamilyHub({ family }: { family: ProductFamily }) {
  const siteUrl = getSiteUrl();
  const category = categoryFor(family);
  const hubUrl = `${siteUrl}/products/${family.slug}`;
  const soldAs = family.form === "liquid" ? "Laboratory supply" : "Single vial";

  const breadcrumbs = [
    { name: "Home", item: siteUrl },
    { name: "Products", item: `${siteUrl}/store` },
    ...(category
      ? [{ name: category.label, item: `${siteUrl}/store/${category.slug}` }]
      : []),
    { name: family.name, item: hubUrl },
  ];

  return (
    <section className="py-12 lg:py-16 bg-canvas">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: family.name,
              description: family.description,
              url: hubUrl,
              isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
            },
            {
              "@type": "ItemList",
              name: `${family.name} strengths`,
              itemListElement: family.variants.map((variant, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${family.name} ${variant.dose}`,
                url: `${siteUrl}/products/${variant.slug}`,
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: crumb.item,
              })),
            },
          ],
        }}
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

        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.16em] text-accent font-medium mb-3">
            {soldAs} · Research use only
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-4">
            {family.name}
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed">{family.description}</p>
        </div>

        <h2 className="text-2xl font-semibold text-ink tracking-tight mb-6">
          Available strengths
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {family.variants.map((variant) => (
            <Link
              key={variant.slug}
              href={`/products/${variant.slug}`}
              className="group bg-canvas/95 rounded-2xl border border-line overflow-hidden hover-lift"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-b from-surface-2 to-canvas">
                <div className="absolute inset-3 flex items-center justify-center sm:inset-4">
                  <ProductVisual
                    product={variant}
                    className="h-full w-auto max-w-full group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 90vw, 320px"
                  />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-wider text-placeholder mb-1">{soldAs}</p>
                <h3 className="font-semibold text-ink mb-1 group-hover:underline">
                  {family.name}
                </h3>
                <p className="text-sm text-ink-soft mb-3">{variant.dose}</p>
                <p className="text-sm font-medium text-ink">{formatPrice(variant.price)}</p>
              </div>
            </Link>
          ))}
        </div>

        <ProductCompliance family={family} />

        <p className="mt-10 max-w-3xl text-sm text-muted leading-relaxed">
          For laboratory and research use only. Not for human or veterinary consumption. Each
          strength is its own vial. See{" "}
          <Link href="/quality" className="underline hover:text-ink">
            quality assurance
          </Link>
          ,{" "}
          <Link href="/coa" className="underline hover:text-ink">
            certificates of analysis
          </Link>
          , and the{" "}
          <Link href="/research-use" className="underline hover:text-ink">
            research-use policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
