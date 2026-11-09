export const storeCategories = [
  {
    slug: "injectable-vials",
    id: "injectable",
    label: "Injectable Vials",
    title: "Injectable Vials",
    description:
      "Shop injectable research peptides from Ovora Labs. Lyophilized single vials, 99%+ purity, with a certificate of analysis. Research use only.",
    sectionTitle: "Injectable Vials",
    sectionSubtitle: "Lyophilized research peptides in sterile vials.",
  },
  {
    slug: "nasal-sprays",
    id: "nasal",
    label: "Nasal Sprays",
    title: "Nasal Sprays",
    description:
      "Shop research-grade nasal sprays from Ovora Labs, including MT-2, Selank, and Semax. Research use only.",
    sectionTitle: "Nasal Sprays",
    sectionSubtitle: "Research-grade nasal spray formulations — MT-2, Selank, and Semax.",
  },
  {
    slug: "accessories",
    id: "accessory",
    label: "Accessories",
    title: "Research Accessories",
    description:
      "Shop laboratory accessories from Ovora Labs, including bacteriostatic water for reconstitution. Research use only.",
    sectionTitle: "Accessories",
    sectionSubtitle: "Reconstitution supplies for laboratory use.",
  },
] as const;

export type StoreCategoryId = (typeof storeCategories)[number]["id"] | "all";

export function getStoreCategory(slug: string) {
  return storeCategories.find((category) => category.slug === slug);
}
