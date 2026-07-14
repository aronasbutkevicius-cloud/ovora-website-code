export type Product = {
  slug: string;
  name: string;
  alsoKnownAs?: string[];
  description: string;
  price: number;
  category: "peptide" | "blend" | "spray" | "accessory";
  popular?: boolean;
  dose: string;
  theme: string;
};

export const products: Product[] = [
  {
    slug: "glp-3",
    name: "GLP-3 (RT)",
    alsoKnownAs: ["LY3437943", "GLP-3"],
    description:
      "A 39-amino acid triple agonist peptide targeting GIP, GLP-1, and glucagon receptors, studied for metabolic regulation and body composition in clinical research.",
    price: 69.99,
    category: "peptide",
    dose: "10MG",
    theme: "clay",
    popular: true,
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    alsoKnownAs: ["Body Protection Compound-157", "PL-14736", "PLD-116", "Bepecin"],
    description:
      "A 15-amino acid peptide derived from human gastric juice that demonstrates protection and regenerative effects in animal cell models.",
    price: 39.99,
    category: "peptide",
    dose: "10MG",
    theme: "amber",
    popular: true,
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    alsoKnownAs: ["Copper Tripeptide-1", "Glycyl-L-histidyl-L-lysine Copper C"],
    description:
      "A naturally occurring copper tripeptide that promotes tissue remodeling, wound healing, and collagen synthesis in animal and in vitro studies.",
    price: 29.99,
    category: "peptide",
    dose: "100MG",
    theme: "peach",
    popular: true,
  },
  {
    slug: "tesamorlin",
    name: "Tesamorlin",
    alsoKnownAs: ["EGRIFTA", "TH9507"],
    description:
      "A 44-amino acid GHRH analog that stimulates pituitary gh secretion, studied for visceral adipose tissue reduction in clinical research.",
    price: 69.99,
    category: "peptide",
    dose: "2MG",
    theme: "rose",
    popular: true,
  },
  {
    slug: "tb-500",
    name: "TB-500",
    alsoKnownAs: ["Thymosin Beta-4", "Tβ4", "TB4", "Thymosin β4"],
    description:
      "A 43-amino acid synthetic fragment of thymosin beta-4 that regulates actin polymerization and promotes cell migration in preclinical research.",
    price: 39.99,
    category: "peptide",
    dose: "10MG",
    theme: "honey",
    popular: true,
  },
  {
    slug: "melanotan-ii",
    name: "Melanotan II",
    alsoKnownAs: ["MT-II", "MT-2", "Melanotan 2"],
    description:
      "A cyclic peptide analog of α-MSH that binds melanocortin receptors, studied for melanogenesis and related pathways in research settings.",
    price: 29.99,
    category: "peptide",
    dose: "10MG",
    theme: "copper",
    popular: true,
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    alsoKnownAs: ["Nicotinamide Adenine Dinucleotide", "Coenzyme I", "Beta-NAD"],
    description:
      "A critical dinucleotide coenzyme that activates sirtuins and supports mitochondrial function, studied for cellular energy metabolism in research models.",
    price: 69.99,
    category: "peptide",
    dose: "500MG",
    theme: "sand",
    popular: true,
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    alsoKnownAs: ["Anti-Obesity Drug 9604", "hGH Fragment 177-191", "Tyr-hGH177-191"],
    description:
      "A 15-amino acid lipolytic peptide that stimulates the breakdown of fat cells (lipolysis) and inhibits the metabolic formation of fat (lipogenesis) in animal studies.",
    price: 49.99,
    category: "peptide",
    dose: "5MG",
    theme: "terracotta",
    popular: true,
  },
  {
    slug: "mots-c",
    name: "MOTS-C",
    alsoKnownAs: ["Mitochondrial ORF of the 12S rRNA type-c", "MRWQEMGYIFYPRKLR"],
    description:
      "A mitochondrial-derived peptide that modulates metabolic processes, with significant implications for exercise metabolism observed in rodent studies.",
    price: 39.99,
    category: "peptide",
    dose: "10MG",
    theme: "apricot",
    popular: true,
  },
  {
    slug: "cjc-ipa-no-dac",
    name: "CJC-1295 / Ipamorelin (No DAC)",
    alsoKnownAs: ["Mod GRF 1-29 + Ipamorelin", "Modified GRF + Ipamorelin", "CJC/Ipa Blend"],
    description:
      "A strategic peptide combination engineered to enhance gh release through synchronized GHRH and ghrelin receptor activation in experimental research models.",
    price: 59.99,
    category: "blend",
    dose: "10MG",
    theme: "taupe",
    popular: true,
  },
  {
    slug: "wolverine-stack",
    name: "BPC-157/TB-500 (Wolverine)",
    alsoKnownAs: ["Wolverine Blend", "BPC + TB4", "Regenerative Peptide Stack"],
    description:
      "A synergistic peptide combination designed to support tissue repair and regenerative processes through complementary cellular mechanisms in animal research models.",
    price: 109.99,
    category: "blend",
    dose: "10MG",
    theme: "clay",
    popular: true,
  },
  {
    slug: "glow",
    name: "GLOW",
    alsoKnownAs: ["Triple Regenerative Stack", "GLOW Blend", "BPC-157 / TB-500 / GHK-Cu"],
    description:
      "A triple-peptide combination of BPC-157, TB-500, and GHK-Cu targeting complementary angiogenic, cellular migration, and extracellular matrix remodeling pathways in preclinical research.",
    price: 114.99,
    category: "blend",
    dose: "10MG",
    theme: "amber",
    popular: true,
  },
  {
    slug: "dsip",
    name: "DSIP",
    alsoKnownAs: ["Delta-Sleep Peptide", "Emideltide"],
    description:
      "A nonapeptide studied for sleep regulation and stress-related pathways in laboratory research models.",
    price: 29.99,
    category: "peptide",
    dose: "5MG",
    theme: "peach",
  },
  {
    slug: "semax",
    name: "SEMAX",
    description:
      "A synthetic heptapeptide analog studied for cognitive and neuroprotective research applications.",
    price: 29.99,
    category: "peptide",
    dose: "10MG",
    theme: "rose",
  },
  {
    slug: "selank",
    name: "SELANK",
    alsoKnownAs: ["TP-7", "Selanc", "Thr-Lys-Pro-Arg-Pro-Gly-Pro", "CAS: 129954-34-3"],
    description:
      "A synthetic peptide analog studied for anxiolytic and nootropic research pathways.",
    price: 29.99,
    category: "peptide",
    dose: "10MG",
    theme: "honey",
  },
  {
    slug: "klow",
    name: "KLOW",
    alsoKnownAs: ["KLOW Blend", "Quad Regenerative Stack", "GLOW + KPV"],
    description:
      "A quad regenerative stack combining BPC-157, TB-500, GHK-Cu, and KPV for multi-pathway preclinical research.",
    price: 129.99,
    category: "blend",
    dose: "10MG",
    theme: "copper",
  },
  {
    slug: "kpv",
    name: "KPV",
    alsoKnownAs: ["Lysine-Proline-Valine", "Alpha-MSH (11-13)", "CAS: 67727-97-3"],
    description:
      "A tripeptide fragment of α-MSH studied for anti-inflammatory pathways in research settings.",
    price: 39.99,
    category: "peptide",
    dose: "10MG",
    theme: "sand",
  },
  {
    slug: "pt-141",
    name: "PT-141",
    alsoKnownAs: ["Bremelanotide", "Vyleesi", "CAS: 189691-06-3"],
    description:
      "A melanocortin receptor agonist peptide studied for related signaling pathways in research models.",
    price: 29.99,
    category: "peptide",
    dose: "10MG",
    theme: "terracotta",
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    alsoKnownAs: ["GSH", "L-Glutathione", "Reduced Glutathione", "CAS: 70-18-8"],
    description:
      "A critical endogenous antioxidant tripeptide studied for redox balance and cellular defense mechanisms.",
    price: 59.99,
    category: "peptide",
    dose: "600MG",
    theme: "apricot",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    alsoKnownAs: ["NNC 26-0161", "CAS: 170851-70-4"],
    description:
      "A selective ghrelin receptor agonist peptide studied for growth hormone release pathways in research.",
    price: 49.99,
    category: "peptide",
    dose: "5MG",
    theme: "taupe",
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    alsoKnownAs: ["Long R3 IGF-1", "LR3-IGF-1", "CAS: 143045-27-6"],
    description:
      "A modified insulin-like growth factor analog studied for cellular growth and metabolic pathways.",
    price: 69.99,
    category: "peptide",
    dose: "1MG",
    theme: "clay",
  },
  {
    slug: "amino-h2o",
    name: "Ovora H2O",
    description:
      "Bacteriostatic water for laboratory reconstitution of lyophilized research peptides.",
    price: 16.99,
    category: "accessory",
    dose: "10ML",
    theme: "amber",
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    alsoKnownAs: ["NN9838", "CAS: 1415456-99-3", "ZP8396"],
    description:
      "An amylin analog peptide studied for appetite and metabolic regulation in research models.",
    price: 69.99,
    category: "peptide",
    dose: "5MG",
    theme: "peach",
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    alsoKnownAs: ["Epitalon", "Epithalone", "AEDG Peptide", "CAS: 307297-39-8"],
    description:
      "A synthetic tetrapeptide studied for telomerase activity and aging-related pathways in research.",
    price: 29.99,
    category: "peptide",
    dose: "10MG",
    theme: "rose",
  },
  {
    slug: "5-amino-1mq",
    name: "5-Amino-1MQ",
    alsoKnownAs: ["5-Amino-1-Methylquinolinium", "5A1MQ", "NNMTi", "CAS: 42464-96-0"],
    description:
      "A small-molecule NNMT inhibitor studied for metabolic and cellular energy research pathways.",
    price: 49.99,
    category: "peptide",
    dose: "50MG",
    theme: "honey",
  },
  {
    slug: "melanotan-i",
    name: "Melanotan I",
    alsoKnownAs: ["CAS: 75921-69-6", "MT-1", "MT-I"],
    description:
      "An α-MSH analog peptide studied for melanogenesis and melanocortin receptor pathways.",
    price: 29.99,
    category: "peptide",
    dose: "10MG",
    theme: "copper",
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    alsoKnownAs: ["Thymalfasin", "CAS: 62304-98-7"],
    description:
      "A 28-amino acid peptide studied for immune modulation pathways in laboratory research.",
    price: 39.99,
    category: "peptide",
    dose: "5MG",
    theme: "sand",
  },
  {
    slug: "snap-8",
    name: "SNAP-8",
    alsoKnownAs: ["CAS: 868844-74-0", "Acetyl Octapeptide-3"],
    description:
      "An octapeptide studied for neurotransmitter release and related cosmetic research applications.",
    price: 29.99,
    category: "peptide",
    dose: "10MG",
    theme: "terracotta",
  },
  {
    slug: "nad-plus-spray",
    name: "NAD+ SPRAY",
    description: "Research-grade NAD+ formulated as a spray for laboratory applications.",
    price: 69.99,
    category: "spray",
    dose: "30ML",
    theme: "apricot",
  },
  {
    slug: "selank-spray",
    name: "SELANK SPRAY",
    description: "Research-grade Selank formulated as a spray for laboratory applications.",
    price: 89.99,
    category: "spray",
    dose: "30ML",
    theme: "taupe",
  },
  {
    slug: "semax-spray",
    name: "SEMAX SPRAY",
    description: "Research-grade Semax formulated as a spray for laboratory applications.",
    price: 89.99,
    category: "spray",
    dose: "30ML",
    theme: "clay",
  },
  {
    slug: "ghkcu-spray",
    name: "GHK-Cu SPRAY",
    description: "Research-grade GHK-Cu formulated as a spray for laboratory applications.",
    price: 49.99,
    category: "spray",
    dose: "30ML",
    theme: "amber",
  },
  {
    slug: "pt-141-spray",
    name: "PT-141 SPRAY",
    description: "Research-grade PT-141 formulated as a spray for laboratory applications.",
    price: 79.99,
    category: "spray",
    dose: "30ML",
    theme: "peach",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}
