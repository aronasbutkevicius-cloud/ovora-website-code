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
    <section className="py-12 lg:py-16 bg-[#fffaf6]">
      <div className="content-container">
        <div className="mb-6 text-sm text-[#7a6a5c]">
          <Link href="/store" className="hover:text-[#2a211c]">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#2a211c]">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="bg-gradient-to-b from-[#f7efe7] to-[#fffaf6] rounded-3xl border border-[#eadfd4] aspect-square flex items-center justify-center p-10">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7efe7] text-[#c4785a] text-xs font-medium mb-4 border border-[#eadfd4]">
              {isSpray
                ? "Nasal Spray · Research Use"
                : product.form === "accessory"
                  ? "Laboratory Accessory"
                  : "Injectable Vial · Research Use"}
            </div>
            <h1 className="text-3xl lg:text-5xl font-semibold text-[#2a211c] tracking-tight mb-4">
              {product.name}
            </h1>
            <p className="text-[#5c4a3d] text-lg leading-relaxed mb-6">{product.description}</p>

            {product.alsoKnownAs && (
              <p className="text-sm text-[#7a6a5c] mb-6">
                <span className="font-medium text-[#5c4a3d]">Also known as: </span>
                {product.alsoKnownAs.join(", ")}
              </p>
            )}

            <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-[#f7efe7] rounded-xl p-4 border border-[#eadfd4]">
                <dt className="text-[#7a6a5c] mb-1">Purity</dt>
                <dd className="font-semibold text-[#2a211c]">99%+ guaranteed</dd>
              </div>
              <div className="bg-[#f7efe7] rounded-xl p-4 border border-[#eadfd4]">
                <dt className="text-[#7a6a5c] mb-1">Form</dt>
                <dd className="font-semibold text-[#2a211c]">
                  {isSpray
                    ? "Nasal spray"
                    : product.form === "accessory"
                      ? "Solution"
                      : "Lyophilized powder"}
                </dd>
              </div>
              <div className="bg-[#f7efe7] rounded-xl p-4 border border-[#eadfd4]">
                <dt className="text-[#7a6a5c] mb-1">Strength</dt>
                <dd className="font-semibold text-[#2a211c]">{product.dose}</dd>
              </div>
              <div className="bg-[#f7efe7] rounded-xl p-4 border border-[#eadfd4]">
                <dt className="text-[#7a6a5c] mb-1">Pack</dt>
                <dd className="font-semibold text-[#2a211c]">{product.pack ?? "pack"}</dd>
              </div>
            </dl>

            <p className="text-3xl font-semibold text-[#2a211c] mb-6">
              {formatPrice(product.price)}{" "}
              <span className="text-base font-normal text-[#7a6a5c]">USD</span>
            </p>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 rounded-full bg-[#2a211c] text-[#fffaf6] text-sm font-medium hover:bg-[#3d2f26] transition-colors"
            >
              Add to Cart
            </button>

            <p className="mt-6 text-xs text-[#7a6a5c] leading-relaxed max-w-md">
              For laboratory and research use only. Not for human or veterinary consumption.
              See our{" "}
              <Link href="/research-use" className="underline hover:text-[#2a211c]">
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
