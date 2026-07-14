/** Soft monotone vial themes — matte pastel label + deeper text/accent (sleek Amino-style). */
export type VialTheme = {
  id: string;
  label: string;
  accent: string;
  text: string;
  glass: string;
};

export const vialThemes: Record<string, VialTheme> = {
  lilac: {
    id: "lilac",
    label: "#E8E0F0",
    accent: "#3D3550",
    text: "#2A2438",
    glass: "#F4F0F8",
  },
  blush: {
    id: "blush",
    label: "#F0E4E8",
    accent: "#4A3038",
    text: "#322028",
    glass: "#F8F2F4",
  },
  mauve: {
    id: "mauve",
    label: "#E6DCE4",
    accent: "#3E2E3A",
    text: "#2C2028",
    glass: "#F3EEF2",
  },
  mist: {
    id: "mist",
    label: "#E2E6EE",
    accent: "#2E3648",
    text: "#222836",
    glass: "#F0F2F6",
  },
  sage: {
    id: "sage",
    label: "#E2E8E2",
    accent: "#2E3A32",
    text: "#222A26",
    glass: "#F0F4F0",
  },
  seafoam: {
    id: "seafoam",
    label: "#DEE8E6",
    accent: "#2A3A38",
    text: "#1E2A28",
    glass: "#EEF4F3",
  },
  sand: {
    id: "sand",
    label: "#EDE6DC",
    accent: "#3A3228",
    text: "#2A241C",
    glass: "#F6F2EC",
  },
  clay: {
    id: "clay",
    label: "#EBE0D8",
    accent: "#3C2E28",
    text: "#2A201C",
    glass: "#F5F0EC",
  },
  slate: {
    id: "slate",
    label: "#E0E2E6",
    accent: "#2C3038",
    text: "#1E2228",
    glass: "#EEEFF2",
  },
  ivory: {
    id: "ivory",
    label: "#F0EBE4",
    accent: "#383028",
    text: "#28241E",
    glass: "#F7F4F0",
  },
  taupe: {
    id: "taupe",
    label: "#E6E2DC",
    accent: "#36322C",
    text: "#26221E",
    glass: "#F2F0EC",
  },
  peach: {
    id: "peach",
    label: "#F0E6E0",
    accent: "#3E302A",
    text: "#2C221E",
    glass: "#F7F2EE",
  },
  rose: {
    id: "rose",
    label: "#EDE0E4",
    accent: "#3A2830",
    text: "#2A1E24",
    glass: "#F5EEF1",
  },
};

export const themeOrder = Object.keys(vialThemes);

export function themeForIndex(i: number): VialTheme {
  return vialThemes[themeOrder[i % themeOrder.length]];
}
