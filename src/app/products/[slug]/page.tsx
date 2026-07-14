import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="content-container">
        <div className="mb-6 text-sm text-black/50">
          <Link href="/store" className="hover:text-black">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 aspect-square flex items-center justify-center p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image || "/images/bottle.png"}
              alt={product.name}
              className="max-h-[70%] w-auto object-contain"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium mb-4">
              Premium Research Peptide
            </div>
            <h1 className="text-3xl lg:text-5xl font-semibold text-black tracking-tight mb-4">
              {product.name}
            </h1>
            <p className="text-black/65 text-lg leading-relaxed mb-6">{product.description}</p>

            {product.alsoKnownAs && (
              <p className="text-sm text-black/50 mb-6">
                <span className="font-medium text-black/70">Also known as: </span>
                {product.alsoKnownAs.join(", ")}
              </p>
            )}

            <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-black/45 mb-1">Purity</dt>
                <dd className="font-semibold text-black">99%+ guaranteed</dd>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-black/45 mb-1">Form</dt>
                <dd className="font-semibold text-black">
                  {product.category === "spray" ? "Spray" : "Lyophilized powder"}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-black/45 mb-1">COA</dt>
                <dd className="font-semibold text-black">Included</dd>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-black/45 mb-1">Use</dt>
                <dd className="font-semibold text-black">Research only</dd>
              </div>
            </dl>

            <p className="text-3xl font-semibold text-black mb-6">
              From {formatPrice(product.price)}{" "}
              <span className="text-base font-normal text-black/45">USD</span>
            </p>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
            >
              Add to Cart
            </button>

            <p className="mt-6 text-xs text-black/45 leading-relaxed max-w-md">
              For laboratory and research use only. Not for human or veterinary consumption.
              See our{" "}
              <Link href="/research-use" className="underline hover:text-black">
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
