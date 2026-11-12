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
        <h2 className="mb-2 font-display text-3xl font-medium tracking-tight text-ink">
          {title}
        </h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
    <section className="min-h-[60vh] bg-canvas py-12 lg:py-16">
      <div className="content-container grid items-start gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-28">
          <p className="index-label mb-4">Catalog</p>
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {filters.map((filter) => {
              const href = query ? `${filter.href}?q=${encodeURIComponent(query)}` : filter.href;
              const selected = filter.id === category;
              return (
                <Link
                  key={filter.id}
                  href={href}
                  className={`shrink-0 border-b-2 px-1 py-2 text-sm font-medium lg:border-b-0 lg:border-l-2 lg:px-3 ${
                    selected
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  {filter.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div>
          <div className="mb-8 max-w-3xl">
            <h1 className="mb-3 font-display text-4xl font-medium tracking-tight text-ink lg:text-6xl">
              {active ? active.sectionTitle : "All Products"}
            </h1>
            <p className="text-lg text-ink-soft">
              {active
                ? active.description
                : "Research peptides and laboratory supplies from Ovora Labs. Purity ≥99% (HPLC), verified by independent third-party testing. Certificate of analysis available on request."}
            </p>
          </div>

          <form action={basePath} method="get" className="mb-6 flex max-w-xl flex-col gap-3 sm:flex-row" role="search">
            <label htmlFor="catalog-search" className="sr-only">
              Search products
            </label>
            <input
              id="catalog-search"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search by name or dose"
              className="h-11 flex-1 rounded-lg border border-line bg-white px-4 text-base text-ink outline-none placeholder:text-placeholder focus:border-accent sm:text-sm"
            />
            <button type="submit" className="btn-primary h-11 min-h-0 px-6 text-sm">
              Search
            </button>
          </form>

          <p className="mb-8 text-sm text-muted">
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
            <div className="folio mb-10 max-w-xl p-8">
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
      </div>
    </section>
  );
}
