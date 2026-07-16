import type { Metadata } from "next";
import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import {
  formatPrice,
  injectableProducts,
  nasalProducts,
  accessoryProducts,
} from "@/data/products";
import type { Product } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse research-grade peptides from Ovora Labs. 99%+ purity. COA included.",
};

const filters = [
  { id: "all", label: "All Products" },
  { id: "injectable", label: "Injectable Vials" },
  { id: "nasal", label: "Nasal Sprays" },
  { id: "accessory", label: "Accessories" },
] as const;

function ProductCard({ product }: { product: Product }) {
  const isSpray = product.form === "nasal";
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-[#f7f8fc]/95 rounded-2xl border border-[#d5dbed] overflow-hidden hover-lift"
    >
      <div className="aspect-[4/3] bg-gradient-to-b from-[#eef0f8] to-[#f7f8fc] flex items-center justify-center p-6">
        <ProductVisual
          product={product}
          className="h-40 w-auto group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 45vw, 220px"
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-wider text-[#8a90a8] mb-1">
          {isSpray ? "Nasal Spray" : product.form === "accessory" ? "Accessory" : "Injectable Vial"}
        </p>
        <h2 className="font-semibold text-[#1e2235] mb-1 group-hover:underline">{product.name}</h2>
        <p className="text-xs text-[#8a90a8] mb-2">
          {product.dose}
          {product.pack ? ` · ${product.pack}` : ""}
        </p>
        <p className="text-xs text-[#6b7189] line-clamp-2 mb-3">{product.description}</p>
        <p className="text-sm font-medium text-[#1e2235]">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

function Section({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Product[];
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
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";

  const injectables = injectableProducts();
  const nasals = nasalProducts();
  const accessories = accessoryProducts();

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
            const href = f.id === "all" ? "/store" : `/store?category=${f.id}`;
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

        <p className="text-sm text-[#6b7189] mb-8">{count} products</p>

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
