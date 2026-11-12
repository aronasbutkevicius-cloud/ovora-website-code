import { AVAILABLE_ON_REQUEST, LYOPHILIZED_STORAGE, LIQUID_STORAGE } from "@/lib/compliance";

export type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: "peptide" | "blend" | "supply";
  form: "lyophilized" | "liquid";
  /**
   * When true, the listing stays in this file but is omitted from the catalog.
   * Set to false to show it again. familyKey keeps it from merging into another listing.
   */
  withheld?: boolean;
  familyKey?: string;
  popular?: boolean;
  dose: string;
  stock?: number;
  theme: string;
  image?: string;
  /** Public path of a certificate file, when one is uploaded later. */
  coaPdf?: string;
  cas: string;
  molecularWeight: string;
  storage: string;
  /** Optional compare-at price. Ignored unless storefront.compareAtEnabled is true. */
  compareAtPrice?: number;
};

const powder = LYOPHILIZED_STORAGE;

export const products: Product[] = [
  {
    slug: "ghk-cu-50mg",
    name: "GHK-Cu",
    description:
      "Copper complex of the tripeptide glycyl-L-histidyl-L-lysine (prezatide copper; PubChem CID 71587328). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 15.29,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "50MG",
    stock: 3,
    theme: "lilac",
    image: "/images/products/cutouts/ghk-cu-50mg.webp",
    cas: "89030-95-5",
    molecularWeight: "402.92 g/mol",
    storage: powder,
  },
  {
    slug: "mt2-5mg",
    name: "MT-2",
    description:
      "Synthetic cyclic peptide melanotan II (PubChem CID 92432), an N-acetyl cyclic (2–7) lactam. Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 24,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "5MG",
    stock: 1,
    theme: "blush",
    image: "/images/products/cutouts/mt2-5mg.webp",
    cas: "121062-08-6",
    molecularWeight: "1024.2 g/mol",
    storage: powder,
  },
  {
    slug: "mt2-10mg",
    name: "MT-2",
    description:
      "Synthetic cyclic peptide melanotan II (PubChem CID 92432), an N-acetyl cyclic (2–7) lactam. Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 15.27,
    category: "peptide",
    form: "lyophilized",
    dose: "10MG",
    stock: 1,
    theme: "mauve",
    image: "/images/products/cutouts/mt2-10mg.webp",
    cas: "121062-08-6",
    molecularWeight: "1024.2 g/mol",
    storage: powder,
  },
  {
    slug: "mt1-10mg",
    name: "MT-1",
    description:
      "Synthetic peptide afamelanotide (PubChem CID 16197727). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 15.27,
    category: "peptide",
    form: "lyophilized",
    dose: "10MG",
    stock: 1,
    theme: "mist",
    image: "/images/products/cutouts/mt1-10mg.webp",
    cas: "75921-69-6",
    molecularWeight: "1646.8 g/mol",
    storage: powder,
  },
  {
    slug: "bpc-157-5mg",
    name: "BPC-157",
    description:
      "Synthetic 15-residue peptide with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (PubChem CID 9941957). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 35,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "5MG",
    theme: "sage",
    image: "/images/products/cutouts/bpc-157-5mg.webp",
    cas: "137525-51-0",
    molecularWeight: "1419.5 g/mol",
    storage: powder,
  },
  {
    slug: "bpc-157-10mg",
    name: "BPC-157",
    description:
      "Synthetic 15-residue peptide with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (PubChem CID 9941957). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 20.39,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "10MG",
    theme: "seafoam",
    image: "/images/products/cutouts/bpc-157-10mg.webp",
    cas: "137525-51-0",
    molecularWeight: "1419.5 g/mol",
    storage: powder,
  },
  {
    slug: "tirzepatide-10mg",
    name: "Tirzepatide",
    description:
      "Synthetic peptide tirzepatide (PubChem CID 166567236). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 45,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "10MG",
    theme: "sand",
    image: "/images/products/cutouts/tirzepatide-10mg.webp",
    cas: "2023788-19-2",
    molecularWeight: "4813 g/mol",
    storage: powder,
  },
  {
    slug: "tirzepatide-20mg",
    name: "Tirzepatide",
    description:
      "Synthetic peptide tirzepatide (PubChem CID 166567236). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 65,
    category: "peptide",
    form: "lyophilized",
    dose: "20MG",
    theme: "clay",
    image: "/images/products/cutouts/tirzepatide-20mg.webp",
    cas: "2023788-19-2",
    molecularWeight: "4813 g/mol",
    storage: powder,
  },
  {
    slug: "cjc-ipa",
    name: "CJC / IPA",
    description:
      "One vial containing two lyophilized peptides: ipamorelin (5 mg; PubChem CID 9831659) and CJC-1295 without DAC (5 mg). Purity ≥99% (HPLC).",
    price: 30.59,
    category: "blend",
    form: "lyophilized",
    popular: true,
    dose: "5+5MG",
    theme: "slate",
    image: "/images/products/cutouts/cjc-ipa.webp",
    cas: "Ipamorelin 170851-70-4. CJC-1295 without DAC: Available on request.",
    molecularWeight: "Ipamorelin 711.9 g/mol. CJC-1295 without DAC: Available on request.",
    storage: powder,
  },
  {
    slug: "hcg-2000iu",
    name: "HCG",
    description:
      "Glycoprotein preparation of human chorionic gonadotropin. Supplied as a lyophilized powder in a single vial. The labeled quantity is in international units. Purity ≥99% (HPLC).",
    price: 40,
    category: "peptide",
    form: "lyophilized",
    dose: "2000IU",
    theme: "ivory",
    image: "/images/products/cutouts/hcg-2000iu.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "hcg-5000iu",
    name: "HCG",
    description:
      "Glycoprotein preparation of human chorionic gonadotropin. Supplied as a lyophilized powder in a single vial. The labeled quantity is in international units. Purity ≥99% (HPLC).",
    price: 65,
    category: "peptide",
    form: "lyophilized",
    dose: "5000IU",
    theme: "taupe",
    image: "/images/products/cutouts/hcg-5000iu.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "igf-lr3-01mg",
    name: "IGF-1 LR3",
    description:
      "Synthetic analog of insulin-like growth factor-1, supplied as IGF-1 LR3 lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 35,
    category: "peptide",
    form: "lyophilized",
    dose: "0.1MG",
    theme: "peach",
    image: "/images/products/cutouts/igf-lr3-01mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "igf-lr3-1mg",
    name: "IGF-1 LR3",
    description:
      "Synthetic analog of insulin-like growth factor-1, supplied as IGF-1 LR3 lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 35.69,
    category: "peptide",
    form: "lyophilized",
    dose: "1MG",
    theme: "rose",
    image: "/images/products/cutouts/igf-lr3-1mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "tesamorelin-10mg",
    name: "Tesamorelin",
    description:
      "Synthetic peptide tesamorelin (PubChem CID 16137828). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 35.69,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "10MG",
    theme: "lilac",
    image: "/images/products/cutouts/tesamorelin-10mg.webp",
    cas: "218949-48-5",
    molecularWeight: "5136 g/mol",
    storage: powder,
  },
  {
    slug: "kpv-10mg",
    name: "KPV",
    description:
      "Synthetic tripeptide L-lysyl-L-prolyl-L-valine (PubChem CID 125672). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 20.39,
    category: "peptide",
    form: "lyophilized",
    dose: "10MG",
    theme: "blush",
    image: "/images/products/cutouts/kpv-10mg.webp",
    cas: "67727-97-3",
    molecularWeight: "342.43 g/mol",
    storage: powder,
  },
  {
    slug: "mots-c-10mg",
    name: "MOTS-C",
    description:
      "16-residue peptide with the sequence H-MRWQEMGYIFYPRKLR-OH (PubChem CID 146675088). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 20.39,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "10MG",
    theme: "sage",
    image: "/images/products/cutouts/mots-c-10mg.webp",
    cas: "1627580-64-6",
    molecularWeight: "2174.6 g/mol",
    storage: powder,
  },
  {
    slug: "retatrutide-5mg",
    name: "Retatrutide",
    description:
      "Synthetic peptide retatrutide (laboratory code LY3437943). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 50,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "5MG",
    theme: "mauve",
    image: "/images/products/cutouts/retatrutide-5mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "retatrutide-10mg",
    name: "Retatrutide",
    description:
      "Synthetic peptide retatrutide (laboratory code LY3437943). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 35.69,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "10MG",
    theme: "mist",
    image: "/images/products/cutouts/retatrutide-10mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "retatrutide-15mg",
    name: "Retatrutide",
    description:
      "Synthetic peptide retatrutide (laboratory code LY3437943). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 90,
    category: "peptide",
    form: "lyophilized",
    dose: "15MG",
    theme: "seafoam",
    image: "/images/products/cutouts/retatrutide-15mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "retatrutide-20mg",
    name: "Retatrutide",
    description:
      "Synthetic peptide retatrutide (laboratory code LY3437943). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 68.84,
    category: "peptide",
    form: "lyophilized",
    dose: "20MG",
    theme: "slate",
    image: "/images/products/cutouts/retatrutide-20mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "retatrutide-30mg",
    name: "Retatrutide",
    description:
      "Synthetic peptide retatrutide (laboratory code LY3437943). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 101.99,
    category: "peptide",
    form: "lyophilized",
    dose: "30MG",
    theme: "clay",
    image: "/images/products/cutouts/retatrutide-30mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "glutathione-1200mg",
    name: "Glutathione",
    description:
      "Tripeptide γ-L-glutamyl-L-cysteinylglycine, reduced form (PubChem CID 124886). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 45,
    category: "peptide",
    form: "lyophilized",
    dose: "1200MG",
    theme: "ivory",
    image: "/images/products/cutouts/glutathione-1200mg.webp",
    cas: "70-18-8",
    molecularWeight: "307.33 g/mol",
    storage: powder,
  },
  {
    slug: "bac-water-10ml",
    name: "Bacteriostatic Water",
    description:
      "Bacteriostatic water supplied as a liquid in a single vial. Volume is printed on the label.",
    price: 10.19,
    category: "supply",
    form: "liquid",
    dose: "10ML",
    stock: 5,
    theme: "sand",
    image: "/images/products/cutouts/bac-water-10ml.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: LIQUID_STORAGE,
  },
  {
    slug: "bac-water-5ml",
    name: "Bacteriostatic Water",
    description:
      "Bacteriostatic water supplied as a liquid in a single vial. Volume is printed on the label.",
    price: 18,
    category: "supply",
    form: "liquid",
    dose: "5ML",
    stock: 2,
    theme: "taupe",
    image: "/images/products/cutouts/bac-water-5ml.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: LIQUID_STORAGE,
  },
  {
    slug: "nad-plus-250mg",
    name: "NAD+",
    description:
      "β-Nicotinamide adenine dinucleotide, oxidized form (nadide; PubChem CID 5892). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 40,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "250MG",
    theme: "peach",
    image: "/images/products/cutouts/nad-plus-250mg.webp",
    cas: "53-84-9",
    molecularWeight: "663.4 g/mol",
    storage: powder,
  },
  {
    slug: "semax-10mg",
    name: "Semax",
    description:
      "Synthetic heptapeptide with the sequence Met-Glu-His-Phe-Pro-Gly-Pro (PubChem CID 9811102). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 15.27,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "10MG",
    theme: "mist",
    image: "/images/products/cutouts/semax-10mg.webp",
    cas: "80714-61-0",
    molecularWeight: "813.9 g/mol",
    storage: powder,
  },
  {
    slug: "selank-10mg",
    name: "Selank",
    description:
      "Synthetic heptapeptide with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro (PubChem CID 11765600). Supplied as a lyophilized powder in a single vial. Purity ≥99% (HPLC).",
    price: 15.27,
    category: "peptide",
    form: "lyophilized",
    popular: true,
    dose: "10MG",
    theme: "lilac",
    image: "/images/products/cutouts/selank-10mg.webp",
    cas: "129954-34-3",
    molecularWeight: "751.9 g/mol",
    storage: powder,
  },
  {
    slug: "5-amino-1mq-10mg",
    name: "5-Amino-1MQ",
    description:
      "Quinolinium compound supplied as 5-amino-1-methylquinolinium lyophilized powder in a single vial. The counter-ion is specified on the certificate of analysis. Purity ≥99% (HPLC).",
    price: 50,
    category: "peptide",
    form: "lyophilized",
    dose: "10MG",
    theme: "sand",
    image: "/images/products/cutouts/5-amino-1mq-10mg.webp",
    cas: AVAILABLE_ON_REQUEST,
    molecularWeight: AVAILABLE_ON_REQUEST,
    storage: powder,
  },
  {
    slug: "mt2-spray",
    name: "MT-2",
    familyKey: "mt2-withheld",
    description:
      "Withheld listing of melanotan II (PubChem CID 92432). Retained in the catalog data and omitted from the store until the withheld flag is cleared. Supplied quantity 10 mg. Purity ≥99% (HPLC).",
    price: 55,
    category: "peptide",
    form: "lyophilized",
    withheld: true,
    dose: "10MG",
    theme: "blush",
    cas: "121062-08-6",
    molecularWeight: "1024.2 g/mol",
    storage: powder,
  },
  {
    slug: "selank-spray",
    name: "Selank",
    familyKey: "selank-withheld",
    description:
      "Withheld listing of the heptapeptide Thr-Lys-Pro-Arg-Pro-Gly-Pro (PubChem CID 11765600). Retained in the catalog data and omitted from the store until the withheld flag is cleared. Supplied quantity 10 mg. Purity ≥99% (HPLC).",
    price: 55,
    category: "peptide",
    form: "lyophilized",
    withheld: true,
    dose: "10MG",
    theme: "mauve",
    cas: "129954-34-3",
    molecularWeight: "751.9 g/mol",
    storage: powder,
  },
  {
    slug: "semax-spray",
    name: "Semax",
    familyKey: "semax-withheld",
    description:
      "Withheld listing of the heptapeptide Met-Glu-His-Phe-Pro-Gly-Pro (PubChem CID 9811102). Retained in the catalog data and omitted from the store until the withheld flag is cleared. Supplied quantity 10 mg. Purity ≥99% (HPLC).",
    price: 55,
    category: "peptide",
    form: "lyophilized",
    withheld: true,
    dose: "10MG",
    theme: "seafoam",
    cas: "80714-61-0",
    molecularWeight: "813.9 g/mol",
    storage: powder,
  },
];

export type ProductFamily = {
  slug: string;
  name: string;
  description: string;
  category: Product["category"];
  form: Product["form"];
  popular?: boolean;
  theme: string;
  image?: string;
  cas: string;
  molecularWeight: string;
  storage: string;
  coaPdf?: string;
  variants: Product[];
};

export function familySlugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDoseSortValue(dose: string) {
  const match = dose.replace(/\s+/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export function catalogProducts() {
  return products.filter((product) => !product.withheld);
}

export function getProductFamilies(): ProductFamily[] {
  const map = new Map<string, ProductFamily>();

  for (const product of catalogProducts()) {
    const slug = product.familyKey ?? familySlugFromName(product.name);
    const existing = map.get(slug);

    if (!existing) {
      map.set(slug, {
        slug,
        name: product.name,
        description: product.description,
        category: product.category,
        form: product.form,
        popular: product.popular,
        theme: product.theme,
        image: product.image,
        cas: product.cas,
        molecularWeight: product.molecularWeight,
        storage: product.storage,
        coaPdf: product.coaPdf,
        variants: [product],
      });
      continue;
    }

    existing.variants.push(product);
    if (product.popular) existing.popular = true;
    if (!existing.image && product.image) existing.image = product.image;
  }

  return Array.from(map.values()).map((family) => ({
    ...family,
    variants: [...family.variants].sort(
      (a, b) => parseDoseSortValue(a.dose) - parseDoseSortValue(b.dose),
    ),
  }));
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductFamily(slug: string) {
  const families = getProductFamilies();
  const byFamily = families.find((family) => family.slug === slug);
  if (byFamily) return byFamily;

  const variant = getProduct(slug);
  if (!variant || variant.withheld) return undefined;

  return families.find((family) => family.variants.some((item) => item.slug === variant.slug));
}

export function isMultiStrengthHub(family: ProductFamily) {
  return (
    family.variants.length > 1 && !family.variants.some((variant) => variant.slug === family.slug)
  );
}

export function isFamilyHubSlug(slug: string) {
  const family = getProductFamilies().find((entry) => entry.slug === slug);
  return Boolean(family && isMultiStrengthHub(family) && family.slug === slug);
}

export function familyCatalogPath(family: ProductFamily) {
  return `/products/${family.slug}`;
}

/** Old per-size URLs redirect to the one compound page with that size selected. */
export function legacyProductRedirect(slug: string) {
  const product = getProduct(slug);
  if (!product || product.withheld) return undefined;
  const family = getProductFamily(product.slug);
  if (!family || family.slug === slug) return undefined;
  return `/products/${family.slug}?size=${encodeURIComponent(product.dose)}`;
}

export function indexableProductPaths() {
  return getProductFamilies().map((family) => `/products/${family.slug}`);
}

export function familyStrengthSummary(family: ProductFamily) {
  const doses = family.variants.map((variant) => variant.dose);
  const list =
    doses.length <= 1
      ? (doses[0] ?? "")
      : doses.length === 2
        ? `${doses[0]} and ${doses[1]}`
        : `${doses.slice(0, -1).join(", ")}, and ${doses[doses.length - 1]}`;
  return `${family.name} from Ovora Labs, available in ${list}, each sold as a single vial. ${family.description} Research use only. Not for human or veterinary consumption.`;
}

export function startingPrice(family: ProductFamily) {
  return Math.min(...family.variants.map((variant) => variant.price));
}

export function doseOptionsLabel(family: ProductFamily) {
  return family.variants.map((variant) => variant.dose).join(" / ");
}

export function lyophilizedFamilies() {
  return getProductFamilies().filter((family) => family.form === "lyophilized");
}

export function supplyFamilies() {
  return getProductFamilies().filter((family) => family.form === "liquid");
}
