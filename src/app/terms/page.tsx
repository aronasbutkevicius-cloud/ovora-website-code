import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#fffaf6]">
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
