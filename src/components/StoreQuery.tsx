"use client";

import { useSearchParams } from "next/navigation";
import { StoreCatalog } from "@/components/StoreCatalog";
import type { StoreCategoryId } from "@/data/categories";

export function StoreQuery({ category }: { category: StoreCategoryId }) {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  return <StoreCatalog category={category} query={query} />;
}
