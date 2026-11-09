"use client";

import { CutoutImage } from "@/components/CutoutImage";
import { products } from "@/data/products";

const placements = [
  {
    slug: "bpc-157-10mg",
    position: "absolute left-[-1%] md:left-[3%] top-[6%] w-[16%] md:w-[12%] lg:w-[10%] z-[1]",
    motion: "vial-orbit-a",
  },
  {
    slug: "retatrutide-10mg",
    position: "absolute right-[-1%] md:right-[4%] top-[4%] w-[17%] md:w-[13%] lg:w-[11%] z-[2]",
    motion: "vial-orbit-b",
  },
  {
    slug: "nad-plus-250mg",
    position: "absolute left-[1%] md:left-[10%] bottom-[1%] w-[18%] md:w-[14%] lg:w-[12%] z-[1]",
    motion: "vial-orbit-c",
  },
  {
    slug: "ghk-cu-50mg",
    position: "absolute right-[-1%] md:right-[2%] bottom-[8%] w-[15%] md:w-[11%] lg:w-[10%] z-[2]",
    motion: "vial-orbit-d",
  },
  {
    slug: "mots-c-10mg",
    position: "hidden md:block absolute left-[38%] md:left-[40%] top-[1%] w-[16%] md:w-[9%] lg:w-[8%] z-[1] opacity-95",
    motion: "vial-orbit-e",
  },
  {
    slug: "tirzepatide-10mg",
    position: "hidden md:block absolute right-[26%] md:right-[26%] bottom-[2%] w-[17%] md:w-[10%] lg:w-[8%] z-[1] opacity-90",
    motion: "vial-orbit-f",
  },
] as const;

export function FloatingVials() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {placements.map((p) => {
        const product = products.find((x) => x.slug === p.slug);
        if (!product?.image) return null;
        return (
          <div key={p.slug} className={p.position}>
            <CutoutImage
              src={`/images/products/cutouts/${p.slug}.webp`}
              alt={`${product.name} ${product.dose} research vial`}
              className={`h-auto w-full ${p.motion}`}
              sizes="(max-width: 768px) 22vw, 12vw"
              priority
              shadow="float"
            />
          </div>
        );
      })}
      <div className="absolute -left-10 top-1/3 w-64 h-64 rounded-full bg-[#E8E0F0]/40 blur-3xl vial-haze-a" />
      <div className="absolute right-0 bottom-1/4 w-72 h-72 rounded-full bg-[#DDE4F4]/35 blur-3xl vial-haze-b" />
    </div>
  );
}
