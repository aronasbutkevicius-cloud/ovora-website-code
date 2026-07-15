import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Vial } from "@/components/Vial";
import { NasalSpray } from "@/components/NasalSpray";
import { products, getProduct, formatPrice } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const isSpray = product.form === "nasal";

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <div className="mb-6 text-sm text-[#6b7189]">
          <Link href="/store" className="hover:text-[#1e2235]">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#1e2235]">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="bg-gradient-to-b from-[#eef0f8] to-[#f7f8fc] rounded-3xl border border-[#d5dbed] aspect-square flex items-center justify-center p-10">
            {isSpray ? (
              <NasalSpray
                name={product.name}
                dose={product.dose}
                theme={product.theme}
                className="max-h-[85%] w-auto"
              />
            ) : (
              <Vial
                name={product.name}
                dose={product.dose}
                theme={product.theme}
                className="max-h-[85%] w-auto"
              />
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef0f8] text-[#7a8fd4] text-xs font-medium mb-4 border border-[#d5dbed]">
              {isSpray
                ? "Nasal Spray · Research Use"
                : product.form === "accessory"
                  ? "Laboratory Accessory"
                  : "Injectable Vial · Research Use"}
            </div>
            <h1 className="text-3xl lg:text-5xl font-semibold text-[#1e2235] tracking-tight mb-4">
              {product.name}
            </h1>
            <p className="text-[#4a5168] text-lg leading-relaxed mb-6">{product.description}</p>

            {product.alsoKnownAs && (
              <p className="text-sm text-[#6b7189] mb-6">
                <span className="font-medium text-[#4a5168]">Also known as: </span>
                {product.alsoKnownAs.join(", ")}
              </p>
            )}

            <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-[#eef0f8] rounded-xl p-4 border border-[#d5dbed]">
                <dt className="text-[#6b7189] mb-1">Purity</dt>
                <dd className="font-semibold text-[#1e2235]">99%+ guaranteed</dd>
              </div>
              <div className="bg-[#eef0f8] rounded-xl p-4 border border-[#d5dbed]">
                <dt className="text-[#6b7189] mb-1">Form</dt>
                <dd className="font-semibold text-[#1e2235]">
                  {isSpray
                    ? "Nasal spray"
                    : product.form === "accessory"
                      ? "Solution"
                      : "Lyophilized powder"}
                </dd>
              </div>
              <div className="bg-[#eef0f8] rounded-xl p-4 border border-[#d5dbed]">
                <dt className="text-[#6b7189] mb-1">Strength</dt>
                <dd className="font-semibold text-[#1e2235]">{product.dose}</dd>
              </div>
              <div className="bg-[#eef0f8] rounded-xl p-4 border border-[#d5dbed]">
                <dt className="text-[#6b7189] mb-1">Pack</dt>
                <dd className="font-semibold text-[#1e2235]">{product.pack ?? "pack"}</dd>
              </div>
            </dl>

            <p className="text-3xl font-semibold text-[#1e2235] mb-6">
              {formatPrice(product.price)}{" "}
              <span className="text-base font-normal text-[#6b7189]">USD</span>
            </p>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
            >
              Add to Cart
            </button>

            <p className="mt-6 text-xs text-[#6b7189] leading-relaxed max-w-md">
              For laboratory and research use only. Not for human or veterinary consumption.
              See our{" "}
              <Link href="/research-use" className="underline hover:text-[#1e2235]">
                Research Use
              </Link>{" "}
              page for full guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
