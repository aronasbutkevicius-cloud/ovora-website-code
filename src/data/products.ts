export type Product = {
  slug: string;
  name: string;
  alsoKnownAs?: string[];
  description: string;
  price: number;
  category: "peptide" | "blend" | "accessory" | "spray";
  form: "injectable" | "nasal" | "accessory";
  popular?: boolean;
  dose: string;
  pack?: string;
  stock?: number;
  theme: string;
  /** Photoreal vial image under /public */
  image?: string;
};

export const products: Product[] = [
  {
    slug: "ghk-cu-50mg",
    name: "GHK-Cu",
    alsoKnownAs: ["Copper Tripeptide-1"],
    description:
      "Naturally occurring copper tripeptide studied for tissue remodeling and collagen pathways in research models.",
    price: 25,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "50MG",
    pack: "10-pack",
    stock: 3,
    theme: "lilac",
    image: "/images/products/ghk-cu.png",
  },
  {
    slug: "mt2-5mg",
    name: "MT-2",
    alsoKnownAs: ["Melanotan II", "MT-II"],
    description:
      "Cyclic α-MSH analog studied for melanocortin receptor pathways in research settings.",
    price: 24,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "5MG",
    pack: "10-pack",
    stock: 1,
    theme: "blush",
    image: "/images/products/mt-2.png",
  },
  {
    slug: "mt2-10mg",
    name: "MT-2",
    alsoKnownAs: ["Melanotan II", "MT-II"],
    description:
      "Cyclic α-MSH analog studied for melanocortin receptor pathways in research settings.",
    price: 45,
    category: "peptide",
    form: "injectable",
    dose: "10MG",
    pack: "10-pack",
    stock: 1,
    theme: "mauve",
    image: "/images/products/mt-2.png",
  },
  {
    slug: "mt1-10mg",
    name: "MT-1",
    alsoKnownAs: ["Melanotan I", "MT-I"],
    description:
      "α-MSH analog peptide studied for melanogenesis and melanocortin receptor pathways.",
    price: 45,
    category: "peptide",
    form: "injectable",
    dose: "10MG",
    pack: "10-pack",
    stock: 1,
    theme: "mist",
    image: "/images/products/mt-1.png",
  },
  {
    slug: "bpc-157-5mg",
    name: "BPC-157",
    alsoKnownAs: ["Body Protection Compound-157"],
    description:
      "15-amino acid peptide studied for protective and regenerative effects in animal cell models.",
    price: 35,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "5MG",
    pack: "10-pack",
    theme: "sage",
    image: "/images/products/bpc-157.png",
  },
  {
    slug: "bpc-157-10mg",
    name: "BPC-157",
    alsoKnownAs: ["Body Protection Compound-157"],
    description:
      "15-amino acid peptide studied for protective and regenerative effects in animal cell models.",
    price: 50,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "10MG",
    pack: "pack",
    theme: "seafoam",
    image: "/images/products/bpc-157.png",
  },
  {
    slug: "tirzepatide-10mg",
    name: "Tirzepatide",
    alsoKnownAs: ["LY3298176"],
    description:
      "Dual GIP/GLP-1 receptor agonist peptide studied for metabolic regulation in research.",
    price: 45,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "10MG",
    pack: "pack",
    theme: "sand",
    image: "/images/products/tirzepatide.png",
  },
  {
    slug: "tirzepatide-20mg",
    name: "Tirzepatide",
    alsoKnownAs: ["LY3298176"],
    description:
      "Dual GIP/GLP-1 receptor agonist peptide studied for metabolic regulation in research.",
    price: 65,
    category: "peptide",
    form: "injectable",
    dose: "20MG",
    pack: "pack",
    theme: "clay",
    image: "/images/products/tirzepatide.png",
  },
  {
    slug: "cjc-ipa",
    name: "CJC / IPA",
    alsoKnownAs: ["CJC-1295 No DAC + Ipamorelin", "Mod GRF 1-29 + Ipamorelin"],
    description:
      "CJC-1295 without DAC (5mg) + Ipamorelin (5mg) blend for synchronized GHRH and ghrelin pathway research.",
    price: 90,
    category: "blend",
    form: "injectable",
    popular: true,
    dose: "5+5MG",
    pack: "pack",
    theme: "slate",
    image: "/images/products/cjc-ipa.png",
  },
  {
    slug: "hcg-2000iu",
    name: "HCG",
    alsoKnownAs: ["Human Chorionic Gonadotropin"],
    description:
      "Glycoprotein hormone studied for reproductive and endocrine research applications.",
    price: 40,
    category: "peptide",
    form: "injectable",
    dose: "2000IU",
    pack: "pack",
    theme: "ivory",
    image: "/images/products/hcg.png",
  },
  {
    slug: "hcg-5000iu",
    name: "HCG",
    alsoKnownAs: ["Human Chorionic Gonadotropin"],
    description:
      "Glycoprotein hormone studied for reproductive and endocrine research applications.",
    price: 65,
    category: "peptide",
    form: "injectable",
    dose: "5000IU",
    pack: "pack",
    theme: "taupe",
    image: "/images/products/hcg.png",
  },
  {
    slug: "igf-lr3-01mg",
    name: "IGF-1 LR3",
    alsoKnownAs: ["Long R3 IGF-1", "LR3-IGF-1"],
    description:
      "Modified insulin-like growth factor analog studied for cellular growth pathways.",
    price: 35,
    category: "peptide",
    form: "injectable",
    dose: "0.1MG",
    pack: "pack",
    theme: "peach",
    image: "/images/products/igf-1-lr3.png",
  },
  {
    slug: "igf-lr3-1mg",
    name: "IGF-1 LR3",
    alsoKnownAs: ["Long R3 IGF-1", "LR3-IGF-1"],
    description:
      "Modified insulin-like growth factor analog studied for cellular growth pathways.",
    price: 175,
    category: "peptide",
    form: "injectable",
    dose: "1MG",
    pack: "pack",
    theme: "rose",
    image: "/images/products/igf-1-lr3.png",
  },
  {
    slug: "tesamorelin-10mg",
    name: "Tesamorelin",
    alsoKnownAs: ["EGRIFTA", "TH9507"],
    description:
      "44-amino acid GHRH analog studied for pituitary gh secretion pathways in research.",
    price: 175,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "10MG",
    pack: "pack",
    theme: "lilac",
    image: "/images/products/tesamorelin.png",
  },
  {
    slug: "kpv-10mg",
    name: "KPV",
    alsoKnownAs: ["Lysine-Proline-Valine", "α-MSH (11-13)"],
    description:
      "Tripeptide fragment of α-MSH studied for anti-inflammatory pathways in research.",
    price: 55,
    category: "peptide",
    form: "injectable",
    dose: "10MG",
    pack: "pack",
    theme: "blush",
    image: "/images/products/kpv.png",
  },
  {
    slug: "mots-c-10mg",
    name: "MOTS-C",
    alsoKnownAs: ["Mitochondrial ORF of the 12S rRNA type-c"],
    description:
      "Mitochondrial-derived peptide studied for metabolic and exercise-related pathways.",
    price: 60,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "10MG",
    pack: "pack",
    theme: "sage",
    image: "/images/products/mots-c.png",
  },
  {
    slug: "retatrutide-5mg",
    name: "Retatrutide",
    alsoKnownAs: ["LY3437943", "GLP-3"],
    description:
      "Triple agonist peptide targeting GIP, GLP-1, and glucagon receptors in metabolic research.",
    price: 50,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "5MG",
    pack: "pack",
    theme: "mauve",
    image: "/images/products/retatrutide.png",
  },
  {
    slug: "retatrutide-10mg",
    name: "Retatrutide",
    alsoKnownAs: ["LY3437943", "GLP-3"],
    description:
      "Triple agonist peptide targeting GIP, GLP-1, and glucagon receptors in metabolic research.",
    price: 70,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "10MG",
    pack: "pack",
    theme: "mist",
    image: "/images/products/retatrutide.png",
  },
  {
    slug: "retatrutide-15mg",
    name: "Retatrutide",
    alsoKnownAs: ["LY3437943", "GLP-3"],
    description:
      "Triple agonist peptide targeting GIP, GLP-1, and glucagon receptors in metabolic research.",
    price: 90,
    category: "peptide",
    form: "injectable",
    dose: "15MG",
    pack: "pack",
    theme: "seafoam",
    image: "/images/products/retatrutide.png",
  },
  {
    slug: "retatrutide-20mg",
    name: "Retatrutide",
    alsoKnownAs: ["LY3437943", "GLP-3"],
    description:
      "Triple agonist peptide targeting GIP, GLP-1, and glucagon receptors in metabolic research.",
    price: 110,
    category: "peptide",
    form: "injectable",
    dose: "20MG",
    pack: "pack",
    theme: "slate",
    image: "/images/products/retatrutide.png",
  },
  {
    slug: "retatrutide-30mg",
    name: "Retatrutide",
    alsoKnownAs: ["LY3437943", "GLP-3"],
    description:
      "Triple agonist peptide targeting GIP, GLP-1, and glucagon receptors in metabolic research.",
    price: 150,
    category: "peptide",
    form: "injectable",
    dose: "30MG",
    pack: "pack",
    theme: "clay",
    image: "/images/products/retatrutide.png",
  },
  {
    slug: "glutathione-1200mg",
    name: "Glutathione",
    alsoKnownAs: ["GSH", "L-Glutathione"],
    description:
      "Endogenous antioxidant tripeptide studied for redox balance and cellular defense mechanisms.",
    price: 45,
    category: "peptide",
    form: "injectable",
    dose: "1200MG",
    pack: "pack",
    theme: "ivory",
    image: "/images/products/glutathione.png",
  },
  {
    slug: "bac-water-10ml",
    name: "BAC Water",
    alsoKnownAs: ["Bacteriostatic Water"],
    description:
      "Bacteriostatic water for laboratory reconstitution of lyophilized research peptides.",
    price: 50,
    category: "accessory",
    form: "accessory",
    dose: "10ML",
    pack: "pack",
    stock: 5,
    theme: "sand",
    image: "/images/products/bac-water.png",
  },
  {
    slug: "bac-water-5ml",
    name: "BAC Water",
    alsoKnownAs: ["Bacteriostatic Water"],
    description:
      "Bacteriostatic water for laboratory reconstitution of lyophilized research peptides.",
    price: 18,
    category: "accessory",
    form: "accessory",
    dose: "5ML",
    pack: "pack",
    stock: 2,
    theme: "taupe",
    image: "/images/products/bac-water.png",
  },
  {
    slug: "nad-plus-250mg",
    name: "NAD+",
    alsoKnownAs: ["Nicotinamide Adenine Dinucleotide"],
    description:
      "Critical dinucleotide coenzyme studied for sirtuin activation and cellular energy metabolism.",
    price: 40,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "250MG",
    pack: "pack",
    theme: "peach",
    image: "/images/products/nad-plus.png",
  },
  {
    slug: "semax-10mg",
    name: "Semax",
    alsoKnownAs: ["Met-Glu-His-Phe-Pro-Gly-Pro"],
    description:
      "Synthetic heptapeptide analog studied for cognitive and neuroprotective research applications.",
    price: 35,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "10MG",
    pack: "pack",
    theme: "mist",
    image: "/images/products/semax.png",
  },
  {
    slug: "selank-10mg",
    name: "Selank",
    alsoKnownAs: ["TP-7", "Thr-Lys-Pro-Arg-Pro-Gly-Pro"],
    description:
      "Synthetic peptide analog studied for anxiolytic and nootropic research pathways.",
    price: 35,
    category: "peptide",
    form: "injectable",
    popular: true,
    dose: "10MG",
    pack: "pack",
    theme: "lilac",
    image: "/images/products/selank.png",
  },
  {
    slug: "5-amino-1mq-10mg",
    name: "5-Amino-1MQ",
    alsoKnownAs: ["5-Amino-1-Methylquinolinium", "5A1MQ", "NNMTi"],
    description:
      "Small-molecule NNMT inhibitor studied for metabolic and cellular energy research pathways.",
    price: 50,
    category: "peptide",
    form: "injectable",
    dose: "10MG",
    pack: "pack",
    theme: "sand",
    image: "/images/products/5-amino-1mq.png",
  },
  {
    slug: "mt2-spray",
    name: "MT-2 Spray",
    alsoKnownAs: ["Melanotan II Nasal Spray", "MT-II"],
    description:
      "Research-grade Melanotan II formulated as a nasal spray for laboratory applications.",
    price: 55,
    category: "spray",
    form: "nasal",
    dose: "10MG",
    pack: "spray",
    theme: "blush",
  },
  {
    slug: "selank-spray",
    name: "Selank Spray",
    alsoKnownAs: ["TP-7 Nasal Spray"],
    description:
      "Research-grade Selank formulated as a nasal spray for laboratory applications.",
    price: 55,
    category: "spray",
    form: "nasal",
    dose: "10MG",
    pack: "spray",
    theme: "mauve",
  },
  {
    slug: "semax-spray",
    name: "Semax Spray",
    alsoKnownAs: ["Semax Nasal Spray"],
    description:
      "Research-grade Semax formulated as a nasal spray for laboratory applications.",
    price: 55,
    category: "spray",
    form: "nasal",
    dose: "10MG",
    pack: "spray",
    theme: "seafoam",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function injectableProducts() {
  return products.filter((p) => p.form === "injectable");
}

export function nasalProducts() {
  return products.filter((p) => p.form === "nasal");
}

export function accessoryProducts() {
  return products.filter((p) => p.form === "accessory");
}
