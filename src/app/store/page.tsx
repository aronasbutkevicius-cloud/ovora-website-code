import type { Metadata } from "next";
import { StoreCatalog } from "@/components/StoreCatalog";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  return pageMetadata({
    title: "Shop All Products",
    description: query
      ? `Search results for “${query}” in the Ovora Labs research peptide catalog. Research use only.`
      : "Browse research-grade peptides from Ovora Labs. Single vials and nasal sprays, 99%+ purity, certificate of analysis included. Research use only.",
    path: "/store",
  });
}

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return <StoreCatalog category="all" query={(params.q ?? "").trim()} />;
}
