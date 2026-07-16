"use client";

import Image from "next/image";
import { products } from "@/data/products";

const placements = [
  {
    slug: "bpc-157-10mg",
    className:
      "absolute left-[2%] md:left-[6%] top-[18%] w-[20%] md:w-[13%] lg:w-[11%] z-[1] vial-orbit-a",
  },
  {
    slug: "retatrutide-10mg",
    className:
      "absolute right-[2%] md:right-[7%] top-[8%] w-[22%] md:w-[14%] lg:w-[12%] z-[2] vial-orbit-b",
  },
  {
    slug: "nad-plus-250mg",
    className:
      "absolute left-[8%] md:left-[16%] bottom-[2%] w-[24%] md:w-[15%] lg:w-[13%] z-[1] vial-orbit-c",
  },
  {
    slug: "ghk-cu-50mg",
    className:
      "absolute right-[1%] md:right-[4%] bottom-[12%] w-[18%] md:w-[12%] lg:w-[10%] z-[2] vial-orbit-d",
  },
  {
    slug: "mots-c-10mg",
    className:
      "absolute left-[38%] md:left-[42%] top-[2%] w-[16%] md:w-[10%] lg:w-[8%] z-[1] opacity-95 vial-orbit-e",
  },
  {
    slug: "tirzepatide-10mg",
    className:
      "absolute right-[26%] md:right-[28%] bottom-[4%] w-[17%] md:w-[11%] lg:w-[9%] z-[1] opacity-90 vial-orbit-f",
  },
] as const;

export function FloatingVials() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {placements.map((p) => {
        const product = products.find((x) => x.slug === p.slug);
        if (!product?.image) return null;
        return (
          <div key={p.slug} className={p.className}>
            <Image
              src={product.image}
              alt=""
              width={640}
              height={960}
              className="w-full h-auto drop-shadow-2xl"
              sizes="(max-width: 768px) 22vw, 12vw"
              priority
            />
          </div>
        );
      })}
      <div className="absolute -left-10 top-1/3 w-64 h-64 rounded-full bg-[#E8E0F0]/40 blur-3xl vial-haze-a" />
      <div className="absolute right-0 bottom-1/4 w-72 h-72 rounded-full bg-[#DDE4F4]/35 blur-3xl vial-haze-b" />
    </div>
  );
}
