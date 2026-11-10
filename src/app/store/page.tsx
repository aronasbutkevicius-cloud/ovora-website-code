import { Suspense } from "react";
import { StoreCatalog } from "@/components/StoreCatalog";
import { StoreQuery } from "@/components/StoreQuery";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Shop All Products",
  description:
    "Browse research-grade peptides from Ovora Labs. Single vials and nasal sprays, 99%+ purity, certificate of analysis included. Research use only.",
  path: "/store",
});

export default function StorePage() {
  return (
    <Suspense fallback={<StoreCatalog category="all" query="" />}>
      <StoreQuery category="all" />
    </Suspense>
  );
}
