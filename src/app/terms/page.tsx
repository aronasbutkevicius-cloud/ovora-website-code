import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms for purchasing research-use products from Ovora Labs.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <PageHero title="Terms of Service" />
        <Prose>
          <h2>Agreement</h2>
          <p>
            By accessing or purchasing from Ovora Labs, you agree to these Terms of Service and
            confirm that you are purchasing solely for legitimate laboratory and research purposes.
          </p>
          <h2>Eligibility</h2>
          <p>
            You must be at least 21 years of age and a qualified researcher or purchasing on behalf
            of a laboratory or research institution.
          </p>
          <h2>Products</h2>
          <p>
            All products are sold for research use only. Ovora Labs makes no claims regarding
            therapeutic use, medical efficacy, or suitability for human or veterinary consumption.
          </p>
          <h2>Orders & payment</h2>
          <p>
            Prices are listed in USD. We reserve the right to cancel or refuse any order that
            appears fraudulent or outside our research-use policy.
          </p>
          <h2>Promotional text messages</h2>
          <p>
            If you opt in, you agree to receive recurring automated promotional text messages from
            Ovora Labs at the mobile number you provide. Consent is not a condition of purchase.
            Message and data rates may apply. Message frequency varies. Reply STOP to opt out and
            HELP for help. A first-order discount tied to this opt-in is available once per account,
            only before any order is placed, and cannot be reused on another account with the same
            phone number. The Privacy Policy describes how the number and consent record are stored.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Ovora Labs is not liable for misuse of products
            or damages arising from improper handling, storage, or application outside intended
            research use.
          </p>
        </Prose>
      </div>
    </section>
  );
}
