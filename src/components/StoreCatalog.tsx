import Link from "next/link";
import { ResearcherNotice } from "@/components/ProductCompliance";
import { StoreProductCard } from "@/components/StoreProductCard";
import { storeCategories, type StoreCategoryId } from "@/data/categories";
import {
  lyophilizedFamilies,
  supplyFamilies,
  type ProductFamily,
} from "@/data/products";

const filters = [
  { id: "all" as const, label: "All Products", href: "/store" },
  ...storeCategories.map((category) => ({
    id: category.id,
    label: category.label,
    href: `/store/${category.slug}`,
  })),
];

function categoryPath(category: StoreCategoryId) {
  if (category === "all") return "/store";
  const match = storeCategories.find((entry) => entry.id === category);
  return match ? `/store/${match.slug}` : "/store";
}

function matchesQuery(family: ProductFamily, query: string) {
  const needle = query.toLowerCase();
  const haystack = [
    family.name,
    family.description,
    family.form,
    family.cas,
    ...family.variants.flatMap((variant) => [variant.dose, variant.slug, variant.cas]),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

function Section({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: ProductFamily[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-semibold text-ink tracking-tight mb-2">
          {title}
        </h2>
        <p className="text-muted text-sm">{subtitle}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((family) => (
          <StoreProductCard key={family.slug} family={family} />
        ))}
      </div>
    </div>
  );
}

export function StoreCatalog({
  category,
  query,
}: {
  category: StoreCategoryId;
  query: string;
}) {
  const active = storeCategories.find((entry) => entry.id === category);
  const filterList = (families: ProductFamily[]) =>
    query ? families.filter((family) => matchesQuery(family, query)) : families;

  const peptides = filterList(lyophilizedFamilies());
  const supplies = filterList(supplyFamilies());

  const showAll = category === "all";
  const showPeptides = showAll || category === "lyophilized";
  const showSupplies = showAll || category === "supply";

  const count = (showPeptides ? peptides.length : 0) + (showSupplies ? supplies.length : 0);

  const basePath = categoryPath(category);

  return (
    <section className="py-12 lg:py-16 bg-canvas min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-3">
            {active ? active.sectionTitle : "All Products"}
          </h1>
          <p className="text-muted text-lg">
            {active
              ? active.description
              : "Research peptides and laboratory supplies from Ovora Labs. Purity ≥99% (HPLC), verified by independent third-party testing. Certificate of analysis available on request."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter) => {
            const href = query ? `${filter.href}?q=${encodeURIComponent(query)}` : filter.href;
            const selected = filter.id === category;
            return (
              <Link
                key={filter.id}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selected
                    ? "bg-brand text-on-ink"
                    : "bg-surface-2 text-ink-soft hover:bg-surface-3"
                }`}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>

        <form
          action={basePath}
          method="get"
          className="mb-6 flex flex-col sm:flex-row gap-3 max-w-xl"
          role="search"
        >
          <label htmlFor="catalog-search" className="sr-only">
            Search products
          </label>
          <input
            id="catalog-search"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by name or dose"
            className="flex-1 h-11 px-4 rounded-full border border-line glass-panel text-base sm:text-sm text-ink outline-none placeholder:text-placeholder focus:ring-2 focus:ring-accent/30"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-full bg-brand text-on-ink text-sm font-medium hover:bg-brand-hover transition-colors"
          >
            Search
          </button>
        </form>

        <p className="text-sm text-muted mb-8">
          {count} product{count === 1 ? "" : "s"}
          {query ? (
            <>
              {" "}
              matching “{query}”.{" "}
              <Link href={basePath} className="underline">
                Clear search
              </Link>
            </>
          ) : null}
        </p>

        {count === 0 && (
          <div className="rounded-2xl border border-line glass-panel p-8 max-w-xl mb-10">
            <p className="text-ink-soft">
              No products match that search. Try another name, or browse the full catalog.
            </p>
          </div>
        )}

        <ResearcherNotice className="mb-8" />

        {showPeptides && (
          <Section
            title="Lyophilized Peptides"
            subtitle="Single-vial lyophilized research peptides."
            items={peptides}
          />
        )}
        {showSupplies && (
          <Section
            title="Laboratory Supplies"
            subtitle="Laboratory supplies sold with the research catalog."
            items={supplies}
          />
        )}
      </div>
    </section>
  );
}
