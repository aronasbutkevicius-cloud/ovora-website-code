/** Soft cool vial themes — light purple/blue pastels with deeper slate text. */
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
    label: "#E4E0F4",
    accent: "#3D3558",
    text: "#2A2440",
    glass: "#F2F0FA",
  },
  blush: {
    id: "blush",
    label: "#E8E2F2",
    accent: "#3A3450",
    text: "#2A2438",
    glass: "#F4F1F9",
  },
  mauve: {
    id: "mauve",
    label: "#E0DCEF",
    accent: "#383450",
    text: "#262238",
    glass: "#F0EEF8",
  },
  mist: {
    id: "mist",
    label: "#DDE4F4",
    accent: "#2E3A58",
    text: "#222840",
    glass: "#EEF2FA",
  },
  sage: {
    id: "sage",
    label: "#DEE6F0",
    accent: "#2E3A48",
    text: "#222A36",
    glass: "#EEF3F8",
  },
  seafoam: {
    id: "seafoam",
    label: "#DCE8F2",
    accent: "#2A3A4A",
    text: "#1E2A36",
    glass: "#ECF3F8",
  },
  sand: {
    id: "sand",
    label: "#E2E6F4",
    accent: "#323850",
    text: "#242838",
    glass: "#F0F2FA",
  },
  clay: {
    id: "clay",
    label: "#E0E2F2",
    accent: "#343650",
    text: "#262840",
    glass: "#EEEFF8",
  },
  slate: {
    id: "slate",
    label: "#DCE0EC",
    accent: "#2C3040",
    text: "#1E2230",
    glass: "#ECEEF4",
  },
  ivory: {
    id: "ivory",
    label: "#E6E8F4",
    accent: "#32364A",
    text: "#242838",
    glass: "#F2F3FA",
  },
  taupe: {
    id: "taupe",
    label: "#E0E4F0",
    accent: "#303448",
    text: "#222638",
    glass: "#EEF0F6",
  },
  peach: {
    id: "peach",
    label: "#E4E0F6",
    accent: "#363050",
    text: "#282440",
    glass: "#F2F0FA",
  },
  rose: {
    id: "rose",
    label: "#E8E0F4",
    accent: "#3A3050",
    text: "#2A243C",
    glass: "#F4F0FA",
  },
};

export const themeOrder = Object.keys(vialThemes);

export function themeForIndex(i: number): VialTheme {
  return vialThemes[themeOrder[i % themeOrder.length]];
}
