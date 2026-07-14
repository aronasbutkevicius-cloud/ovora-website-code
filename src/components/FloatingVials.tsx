"use client";

import { Vial } from "./Vial";
import { products } from "@/data/products";

const placements = [
  {
    slug: "bpc-157",
    className:
      "absolute left-[2%] md:left-[6%] top-[22%] w-[18%] md:w-[12%] lg:w-[10%] z-[1] vial-orbit-a",
    tilt: -12,
  },
  {
    slug: "tb-500",
    className:
      "absolute right-[3%] md:right-[8%] top-[10%] w-[20%] md:w-[13%] lg:w-[11%] z-[2] vial-orbit-b",
    tilt: 14,
  },
  {
    slug: "nad-plus",
    className:
      "absolute left-[10%] md:left-[18%] bottom-[4%] w-[22%] md:w-[14%] lg:w-[12%] z-[1] vial-orbit-c",
    tilt: 8,
  },
  {
    slug: "ghk-cu",
    className:
      "absolute right-[2%] md:right-[5%] bottom-[14%] w-[16%] md:w-[11%] lg:w-[9%] z-[2] vial-orbit-d",
    tilt: -18,
  },
  {
    slug: "dsip",
    className:
      "absolute left-[40%] md:left-[44%] top-[4%] w-[14%] md:w-[9%] lg:w-[7.5%] z-[1] opacity-90 vial-orbit-e",
    tilt: 6,
  },
  {
    slug: "glow",
    className:
      "absolute right-[28%] md:right-[30%] bottom-[6%] w-[15%] md:w-[10%] lg:w-[8%] z-[1] opacity-85 vial-orbit-f",
    tilt: -8,
  },
] as const;

export function FloatingVials() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {placements.map((p) => {
        const product = products.find((x) => x.slug === p.slug);
        if (!product) return null;
        return (
          <div key={p.slug} className={p.className}>
            <Vial
              name={product.name}
              dose={product.dose}
              theme={product.theme}
              tilt={p.tilt}
              className="w-full h-auto drop-shadow-xl"
            />
          </div>
        );
      })}
      {/* soft warm haze blobs that drift opposite to vials */}
      <div className="absolute -left-10 top-1/3 w-64 h-64 rounded-full bg-[#E8A87C]/25 blur-3xl vial-haze-a" />
      <div className="absolute right-0 bottom-1/4 w-72 h-72 rounded-full bg-[#D4A373]/20 blur-3xl vial-haze-b" />
    </div>
  );
}
