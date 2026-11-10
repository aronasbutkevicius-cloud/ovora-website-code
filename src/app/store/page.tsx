import { StoreCatalog } from "@/components/StoreCatalog";
import { gatedMetadata } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = gatedMetadata({
  title: "Research catalog",
  description:
    "Signed-in researchers can review lyophilized peptides and laboratory supplies from Ovora Labs. Research use only.",
  path: "/store",
});

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return <StoreCatalog category="all" query={(params.q ?? "").trim()} />;
}
