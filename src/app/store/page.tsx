import type { Metadata } from "next";
import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import {
  doseOptionsLabel,
  formatPrice,
  injectableFamilies,
  nasalFamilies,
  accessoryFamilies,
  startingPrice,
  type ProductFamily,
} from "@/data/products";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Shop All Products",
  description: "Browse research-grade peptides from Ovora Labs. 99%+ purity. COA included.",
  path: "/store",
});

const filters = [
  { id: "all", label: "All Products" },
  { id: "injectable", label: "Injectable Vials" },
  { id: "nasal", label: "Nasal Sprays" },
  { id: "accessory", label: "Accessories" },
] as const;

function ProductCard({ family }: { family: ProductFamily }) {
  const isSpray = family.form === "nasal";
  const preview = family.variants[0];
  const multi = family.variants.length > 1;
  const fromPrice = startingPrice(family);

  return (
    <Link
      href={`/products/${family.slug}`}
      className="group bg-[#f7f8fc]/95 rounded-2xl border border-[#d5dbed] overflow-hidden hover-lift"
    >
      <div className="aspect-[4/3] bg-gradient-to-b from-[#eef0f8] to-[#f7f8fc] flex items-center justify-center p-6">
        <ProductVisual
          product={preview}
          className="h-40 w-auto group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 45vw, 220px"
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-wider text-[#8a90a8] mb-1">
          {isSpray ? "Nasal Spray" : family.form === "accessory" ? "Accessory" : "Injectable Vial"}
        </p>
        <h2 className="font-semibold text-[#1e2235] mb-1 group-hover:underline">{family.name}</h2>
        <p className="text-xs text-[#8a90a8] mb-2">{doseOptionsLabel(family)}</p>
        <p className="text-xs text-[#6b7189] line-clamp-2 mb-3">{family.description}</p>
        <p className="text-sm font-medium text-[#1e2235]">
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
    ...(family.alsoKnownAs ?? []),
    ...family.variants.flatMap((variant) => [
      variant.dose,
      variant.slug,
      ...(variant.alsoKnownAs ?? []),
    ]),
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
        <h2 className="text-2xl lg:text-3xl font-semibold text-[#1e2235] tracking-tight mb-2">
          {title}
        </h2>
        <p className="text-[#6b7189] text-sm">{subtitle}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((family) => (
          <ProductCard key={family.slug} family={family} />
        ))}
      </div>
    </div>
  );
}

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const query = (params.q ?? "").trim();

  const filterList = (families: ProductFamily[]) =>
    query ? families.filter((family) => matchesQuery(family, query)) : families;

  const injectables = filterList(injectableFamilies());
  const nasals = filterList(nasalFamilies());
  const accessories = filterList(accessoryFamilies());

  const showAll = category === "all";
  const showInjectables = showAll || category === "injectable";
  const showNasals = showAll || category === "nasal";
  const showAccessories = showAll || category === "accessory";

  const count =
    (showInjectables ? injectables.length : 0) +
    (showNasals ? nasals.length : 0) +
    (showAccessories ? accessories.length : 0);

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[60vh]">
      <div className="content-container">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1e2235] tracking-tight mb-3">
            All Products
          </h1>
          <p className="text-[#6b7189] text-lg">
            Research-grade peptides with Certificate of Analysis and 99%+ purity verification —
            injectable vials and nasal sprays.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => {
            const active = category === f.id;
            const next = new URLSearchParams();
            if (f.id !== "all") next.set("category", f.id);
            if (query) next.set("q", query);
            const href = next.toString() ? `/store?${next.toString()}` : "/store";
            return (
              <Link
                key={f.id}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#1e2235] text-[#f7f8fc]"
                    : "bg-[#eef0f8] text-[#4a5168] hover:bg-[#e4e8f5]"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        <form action="/store" method="get" className="mb-6 flex flex-col sm:flex-row gap-3 max-w-xl" role="search">
          {category !== "all" && <input type="hidden" name="category" value={category} />}
          <label htmlFor="catalog-search" className="sr-only">
            Search products
          </label>
          <input
            id="catalog-search"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by name or dose"
            className="flex-1 h-11 px-4 rounded-full border border-[#d5dbed] bg-white text-base sm:text-sm text-[#1e2235] outline-none placeholder:text-[#8a90a8] focus:ring-2 focus:ring-[#7a8fd4]/30"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
          >
            Search
          </button>
        </form>

        <p className="text-sm text-[#6b7189] mb-8">
          {count} product{count === 1 ? "" : "s"}
          {query ? (
            <>
              {" "}
              matching “{query}”.{" "}
              <Link href={category === "all" ? "/store" : `/store?category=${category}`} className="underline">
                Clear search
              </Link>
            </>
          ) : null}
        </p>

        {count === 0 && (
          <div className="rounded-2xl border border-[#d5dbed] bg-white p-8 max-w-xl mb-10">
            <p className="text-[#4a5168]">
              No products match that search. Try another name, or browse the full catalog.
            </p>
          </div>
        )}

        {showInjectables && (
          <Section
            title="Injectable Vials"
            subtitle="Lyophilized research peptides in sterile vials."
            items={injectables}
          />
        )}
        {showNasals && (
          <Section
            title="Nasal Sprays"
            subtitle="Research-grade nasal spray formulations — MT-2, Selank, and Semax."
            items={nasals}
          />
        )}
        {showAccessories && (
          <Section
            title="Accessories"
            subtitle="Reconstitution supplies for laboratory use."
            items={accessories}
          />
        )}
      </div>
    </section>
  );
}
