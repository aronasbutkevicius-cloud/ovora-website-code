"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { formatPrice, type Product, type ProductFamily } from "@/data/products";

type Props = {
  family: ProductFamily;
  initialVariantSlug: string;
};

export function ProductPurchasePanel({ family, initialVariantSlug }: Props) {
  const { addItem } = useCart();
  const [variantSlug, setVariantSlug] = useState(initialVariantSlug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = useMemo(
    () =>
      family.variants.find((item) => item.slug === variantSlug) ?? family.variants[0],
    [family.variants, variantSlug],
  );

  const hasMultiple = family.variants.length > 1;
  const isSpray = family.form === "nasal";

  function handleAdd() {
    addItem(
      {
        variantSlug: variant.slug,
        familySlug: family.slug,
        name: family.name,
        dose: variant.dose,
        price: variant.price,
        image: variant.image ?? family.image,
        form: family.form,
      },
      quantity,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div className="bg-gradient-to-b from-[#eef0f8] to-[#f7f8fc] rounded-3xl border border-[#d5dbed] aspect-square flex items-center justify-center p-10">
        <ProductVisual
          product={variant as Product}
          className="max-h-[85%] w-auto"
          sizes="(max-width: 1024px) 80vw, 420px"
          priority
        />
      </div>

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef0f8] text-[#7a8fd4] text-xs font-medium mb-4 border border-[#d5dbed]">
          {isSpray
            ? "Nasal Spray · Research Use"
            : family.form === "accessory"
              ? "Laboratory Accessory"
              : "Injectable Vial · Research Use"}
        </div>
        <h1 className="text-3xl lg:text-5xl font-semibold text-[#1e2235] tracking-tight mb-4">
          {family.name}
        </h1>
        <p className="text-[#4a5168] text-lg leading-relaxed mb-6">{family.description}</p>

        {family.alsoKnownAs && (
          <p className="text-sm text-[#6b7189] mb-6">
            <span className="font-medium text-[#4a5168]">Also known as: </span>
            {family.alsoKnownAs.join(", ")}
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
                : family.form === "accessory"
                  ? "Solution"
                  : "Lyophilized powder"}
            </dd>
          </div>
          <div className="bg-[#eef0f8] rounded-xl p-4 border border-[#d5dbed]">
            <dt className="text-[#6b7189] mb-1">Strength</dt>
            <dd className="font-semibold text-[#1e2235]">{variant.dose}</dd>
          </div>
          <div className="bg-[#eef0f8] rounded-xl p-4 border border-[#d5dbed]">
            <dt className="text-[#6b7189] mb-1">Pack</dt>
            <dd className="font-semibold text-[#1e2235]">{variant.pack ?? "pack"}</dd>
          </div>
        </dl>

        {hasMultiple && (
          <div className="mb-6">
            <p className="text-sm font-medium text-[#1e2235] mb-3">Select strength</p>
            <div className="flex flex-wrap gap-2">
              {family.variants.map((option) => {
                const active = option.slug === variant.slug;
                return (
                  <button
                    key={option.slug}
                    type="button"
                    onClick={() => {
                      setVariantSlug(option.slug);
                      setAdded(false);
                    }}
                    className={`min-w-[4.5rem] px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      active
                        ? "bg-[#1e2235] text-[#f7f8fc] border-[#1e2235]"
                        : "bg-[#f7f8fc] text-[#4a5168] border-[#d5dbed] hover:border-[#7a8fd4] hover:text-[#1e2235]"
                    }`}
                  >
                    {option.dose}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <p className="text-3xl font-semibold text-[#1e2235] mb-6">
          {formatPrice(variant.price)}{" "}
          <span className="text-base font-normal text-[#6b7189]">USD</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <label className="inline-flex items-center gap-2 h-12 px-4 rounded-full border border-[#d5dbed] bg-white">
            <span className="text-xs uppercase tracking-wide text-[#6b7189]">Qty</span>
            <input
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))
              }
              className="w-14 bg-transparent text-[#1e2235] font-medium outline-none"
            />
          </label>
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-center h-12 px-10 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
          >
            {added ? "Added to cart" : "Add to Cart"}
          </button>
        </div>

        {added && (
          <p className="mb-4 text-sm text-[#7a8fd4]">
            {variant.dose} added.{" "}
            <Link href="/cart" className="underline hover:text-[#1e2235]">
              View cart
            </Link>{" "}
            or{" "}
            <Link href="/checkout" className="underline hover:text-[#1e2235]">
              checkout
            </Link>
            .
          </p>
        )}

        <p className="mt-2 text-xs text-[#6b7189] leading-relaxed max-w-md">
          For laboratory and research use only. Not for human or veterinary consumption. See our{" "}
          <Link href="/research-use" className="underline hover:text-[#1e2235]">
            Research Use
          </Link>{" "}
          page for full guidelines.
        </p>
      </div>
    </div>
  );
}
