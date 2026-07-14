import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Research Use Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="content-container">
        <PageHero title="Disclaimer" subtitle="Important information about research-use products." />
        <Prose>
          <h2>Research use only</h2>
          <p>
            All products sold by Ovora Labs are intended strictly for in-vitro research, laboratory
            experimentation, and educational purposes. Products are not intended for human or
            veterinary use, not for food use, and not for use in diagnostic procedures.
          </p>
          <h2>FDA disclaimer</h2>
          <p>
            Statements made regarding our products have not been evaluated by the U.S. Food and Drug
            Administration. The efficacy of these products has not been confirmed by FDA-approved
            research. Products are not intended to diagnose, treat, cure, or prevent any disease.
            Information presented on this website is not a substitute for, or alternative to,
            information from a qualified health care practitioner.
          </p>
          <h2>Purchaser responsibility</h2>
          <p>
            By purchasing from Ovora Labs, you acknowledge that you are a qualified researcher or
            are purchasing for legitimate research purposes, and you agree to use all products in
            accordance with applicable laws and regulations.
          </p>
        </Prose>
      </div>
    </section>
  );
}
