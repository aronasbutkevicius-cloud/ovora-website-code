import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { ResearcherNotice } from "@/components/ProductCompliance";
import { storeCategories, type StoreCategoryId } from "@/data/categories";
import {
  doseOptionsLabel,
  familyCatalogPath,
  lyophilizedFamilies,
  startingPrice,
  supplyFamilies,
  type ProductFamily,
} from "@/data/products";
import { formatPrice } from "@/lib/money";

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

function ProductCard({ family }: { family: ProductFamily }) {
  const preview = family.variants[0];
  const multi = family.variants.length > 1;
  const fromPrice = startingPrice(family);

  return (
    <Link
      href={familyCatalogPath(family)}
      className="group bg-white rounded-2xl border border-line overflow-hidden hover-lift"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-b from-surface-2 to-canvas">
        <div className="absolute inset-3 flex items-center justify-center sm:inset-4">
          <ProductVisual
            product={preview}
            className="h-full w-auto max-w-full group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 90vw, 280px"
          />
        </div>
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-wider text-placeholder mb-1">
          {family.form === "liquid" ? "Laboratory supply" : "Single vial"}
        </p>
        <h2 className="font-semibold text-ink mb-1 group-hover:underline">{family.name}</h2>
        <p className="text-xs text-placeholder mb-2">{doseOptionsLabel(family)}</p>
        <p className="text-xs text-muted line-clamp-2 mb-3">{family.description}</p>
        <p className="text-sm font-medium text-ink">
          {multi ? `From ${formatPrice(fromPrice)}` : formatPrice(fromPrice)}
        </p>
      </div>
    </Link>
  );
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
          <ProductCard key={family.slug} family={family} />
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
            className="flex-1 h-11 px-4 rounded-full border border-line bg-white text-base sm:text-sm text-ink outline-none placeholder:text-placeholder focus:ring-2 focus:ring-accent/30"
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
          <div className="rounded-2xl border border-line bg-white p-8 max-w-xl mb-10">
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
