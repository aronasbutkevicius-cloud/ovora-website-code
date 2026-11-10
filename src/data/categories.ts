export const storeCategories = [
  {
    slug: "lyophilized-peptides",
    id: "lyophilized",
    label: "Lyophilized Peptides",
    title: "Lyophilized Peptides",
    description:
      "Lyophilized research peptides from Ovora Labs. Each listing is a single vial. Purity ≥99% (HPLC), verified by independent third-party testing. Certificate of analysis available on request. Research use only.",
    sectionTitle: "Lyophilized Peptides",
    sectionSubtitle: "Single-vial lyophilized research peptides.",
  },
  {
    slug: "laboratory-supplies",
    id: "supply",
    label: "Laboratory Supplies",
    title: "Laboratory Supplies",
    description:
      "Laboratory supplies from Ovora Labs, including bacteriostatic water. Research use only. Sold only to qualified researchers and licensed laboratories.",
    sectionTitle: "Laboratory Supplies",
    sectionSubtitle: "Laboratory supplies sold with the research catalog.",
  },
] as const;

export type StoreCategoryId = (typeof storeCategories)[number]["id"] | "all";

export function getStoreCategory(slug: string) {
  return storeCategories.find((category) => category.slug === slug);
}
