/** Warm vial color themes — soft label bg + deeper accent (Amino Club style, warm palette). */
export type VialTheme = {
  id: string;
  label: string;
  accent: string;
  text: string;
  glass: string;
};

export const vialThemes: Record<string, VialTheme> = {
  clay: {
    id: "clay",
    label: "#F3E6DC",
    accent: "#C4785A",
    text: "#3D2A22",
    glass: "#F8F1EB",
  },
  amber: {
    id: "amber",
    label: "#F7EDD8",
    accent: "#D4923A",
    text: "#3F2E14",
    glass: "#FAF6EC",
  },
  peach: {
    id: "peach",
    label: "#FCE8DF",
    accent: "#E08A6A",
    text: "#3C2418",
    glass: "#FDF6F2",
  },
  rose: {
    id: "rose",
    label: "#F7E4E6",
    accent: "#C46B78",
    text: "#3A1F24",
    glass: "#FBF3F4",
  },
  honey: {
    id: "honey",
    label: "#F6EFD4",
    accent: "#C9A227",
    text: "#3A3010",
    glass: "#FAF7EA",
  },
  copper: {
    id: "copper",
    label: "#F1E4D8",
    accent: "#B8734A",
    text: "#3A2418",
    glass: "#F7F0EA",
  },
  sand: {
    id: "sand",
    label: "#EFE8DC",
    accent: "#A89070",
    text: "#35291C",
    glass: "#F6F2EB",
  },
  terracotta: {
    id: "terracotta",
    label: "#F0DDD4",
    accent: "#C45C3A",
    text: "#3A2018",
    glass: "#F8F0EB",
  },
  apricot: {
    id: "apricot",
    label: "#FCEBD8",
    accent: "#E09A5A",
    text: "#3D2814",
    glass: "#FDF7EF",
  },
  taupe: {
    id: "taupe",
    label: "#EBE6DF",
    accent: "#8F7A6A",
    text: "#2F2620",
    glass: "#F5F2EE",
  },
};

export const themeOrder = Object.keys(vialThemes);

export function themeForIndex(i: number): VialTheme {
  return vialThemes[themeOrder[i % themeOrder.length]];
}
