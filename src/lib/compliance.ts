export const RESEARCH_PURPOSES = [
  "Independent researcher",
  "MD",
  "Research foundation",
  "Research institute",
  "Analytical laboratory",
] as const;

export type ResearchPurpose = (typeof RESEARCH_PURPOSES)[number];

export function isResearchPurpose(value: string): value is ResearchPurpose {
  return (RESEARCH_PURPOSES as readonly string[]).includes(value);
}

export const SITE_BANNER =
  "For laboratory and research use only. Not for human consumption.";

export const QUALIFIED_RESEARCHER_STATEMENT =
  "Products are sold only to qualified researchers and licensed laboratories.";

export const PRODUCT_USE_STATEMENT =
  "For laboratory and research use only. Not for human or veterinary consumption. Not a drug, food, or cosmetic.";

export const FDA_DISCLAIMER =
  "Statements made regarding our products have not been evaluated by the U.S. Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. Products are not intended to diagnose, treat, cure, or prevent any disease. Information presented on this website is not a substitute for, or alternative to, information from a qualified health care practitioner.";

export const PURITY_STATEMENT =
  "Purity ≥99% (HPLC), verified by independent third-party testing. Certificate of analysis available on request.";

export const LYOPHILIZED_STORAGE =
  "Store lyophilized at -20°C, dry and protected from light.";

export const LIQUID_STORAGE =
  "Store sealed and protected from light. A specific temperature range is available on request.";

export const SMS_CONSENT_VERSION = "2026-11-10";

export const SMS_CONSENT_TEXT =
  "I agree to receive recurring automated promotional text messages from Ovora Labs at this number. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out, HELP for help.";

export const FIRST_ORDER_OFFER =
  "Get 15% off your first order: add your phone number to receive promotional updates.";

export const FIRST_ORDER_RATE = 0.15;

export const AVAILABLE_ON_REQUEST = "Available on request";
