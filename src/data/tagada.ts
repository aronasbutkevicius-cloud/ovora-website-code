/**
 * TagadaPay ids for store store_718dc88741a8.
 *
 * Variant and price ids come from the public catalog
 * (POST https://api.tagada.io/api/v1/products, no API key) on 2026-11-02.
 * Each variant name is the strength. Every price matched this site's catalog
 * in cents. BAC Water 5ML was also checked against the dashboard link
 * variant_0757e62eea61 / price_7b923a006ff3.
 *
 * The hosted funnel (funnelv2_7d67c711dc0c on checkout.ovoralabs.com) is not
 * used for payment. Its step config still offers sandbox Card Payments.
 */

export const TAGADA_STORE_ID = "store_718dc88741a8";
export const TAGADA_ACCOUNT_ID = "acc_3be59dd9837d";
export const TAGADA_API_BASE = "https://api.tagada.io";

export type TagadaVariantRef = {
  variantId: string;
  priceId: string;
};

export const tagadaVariants: Record<string, TagadaVariantRef> = {
  "ghk-cu-50mg": { variantId: "variant_a7dc73079858", priceId: "price_d19919a3aa58" },
  "mt2-5mg": { variantId: "variant_ff293883c1bf", priceId: "price_c19cfca685a3" },
  "mt2-10mg": { variantId: "variant_81940f7278a7", priceId: "price_0ae817e2d69c" },
  "mt1-10mg": { variantId: "variant_6bef0518b48f", priceId: "price_4180d427e31c" },
  "bpc-157-5mg": { variantId: "variant_724987b8010e", priceId: "price_c097a9dffa5d" },
  "bpc-157-10mg": { variantId: "variant_dd44376ac265", priceId: "price_935a537b4408" },
  "tirzepatide-10mg": { variantId: "variant_057bcdd6faf4", priceId: "price_199c071111a9" },
  "tirzepatide-20mg": { variantId: "variant_058bfc7a5950", priceId: "price_da322380f0f2" },
  "cjc-ipa": { variantId: "variant_32e40dc8f425", priceId: "price_fe18b5c22387" },
  "hcg-2000iu": { variantId: "variant_0769c00619bc", priceId: "price_24fc7002b12d" },
  "hcg-5000iu": { variantId: "variant_94df5be78cf7", priceId: "price_458f1621872e" },
  "igf-lr3-01mg": { variantId: "variant_3989db6e9d78", priceId: "price_8b8b0c735747" },
  "igf-lr3-1mg": { variantId: "variant_dd8d867faa62", priceId: "price_d708a0faf6b0" },
  "tesamorelin-10mg": { variantId: "variant_cc7ff7eb1df4", priceId: "price_fc519ec71496" },
  "kpv-10mg": { variantId: "variant_6db15775e0bb", priceId: "price_ae0871bbdc76" },
  "mots-c-10mg": { variantId: "variant_5746980cf2f1", priceId: "price_debcc29afe3b" },
  "retatrutide-5mg": { variantId: "variant_e2eb9c813271", priceId: "price_04f447bb7c32" },
  "retatrutide-10mg": { variantId: "variant_d5ea2184bf92", priceId: "price_2c230f1ef8b6" },
  "retatrutide-15mg": { variantId: "variant_10e42e3fe757", priceId: "price_a7d20d508663" },
  "retatrutide-20mg": { variantId: "variant_7e877c648712", priceId: "price_bd02b8c42a9f" },
  "retatrutide-30mg": { variantId: "variant_8a9d8c7b8387", priceId: "price_442937deccbd" },
  "glutathione-1200mg": { variantId: "variant_c73df1388712", priceId: "price_0db7c4cbd552" },
  "bac-water-10ml": { variantId: "variant_836a2e2b4219", priceId: "price_1fe3918d334c" },
  "bac-water-5ml": { variantId: "variant_0757e62eea61", priceId: "price_7b923a006ff3" },
  "nad-plus-250mg": { variantId: "variant_7c5209ece885", priceId: "price_b801fb0732c7" },
  "semax-10mg": { variantId: "variant_dfa4d88addb2", priceId: "price_52e1259c1b46" },
  "selank-10mg": { variantId: "variant_e49609f4a9ed", priceId: "price_9697b1f082ef" },
  "5-amino-1mq-10mg": { variantId: "variant_a827773f83a9", priceId: "price_c504c6f01377" },
  "mt2-spray": { variantId: "variant_89d0f2dc4dd7", priceId: "price_8637ab364303" },
  "selank-spray": { variantId: "variant_af482eade170", priceId: "price_83ed1230f8d0" },
  "semax-spray": { variantId: "variant_0de931b62a77", priceId: "price_87c25c3339c9" },
};

/**
 * Payment methods the in-site checkout may show.
 * Flip `card` or `apple_pay` to true after TagadaPay approval.
 * `crypto` is the MoonPay on-ramp labeled "Crypto — Pay by card".
 */
export const paymentMethodAllowlist = {
  crypto: {
    enabled: true,
    label: "Crypto — Pay by card",
    detail:
      "Card or Apple Pay on the secure crypto checkout. You review the amount there before anything is paid.",
  },
  card: {
    enabled: false,
    label: "Card Payments",
    detail: "Direct card processing. Leave off until TagadaPay approval.",
  },
  apple_pay: {
    enabled: false,
    label: "Apple Pay",
    detail: "Direct Apple Pay. Leave off until TagadaPay approval.",
  },
} as const;

export type AllowlistedMethod = keyof typeof paymentMethodAllowlist;
