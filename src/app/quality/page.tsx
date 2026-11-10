import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Quality Assurance",
  description: "How Ovora Labs describes purity checks and documentation for research peptides.",
  path: "/quality",
});

export default function QualityPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <PageHero
          title="Quality Assurance"
          subtitle="A documented process from raw materials to sealed vials."
        />
        <Prose>
          <h2>Our process</h2>
          <ul>
            <li>Raw Material Verification — All materials checked before synthesis</li>
            <li>Controlled Synthesis — Cleanroom manufacturing with documented procedures</li>
            <li>HPLC Purification — Multiple purification passes</li>
            <li>Third-Party Identity Testing — Independent lab verification</li>
            <li>COA Documentation — Full test results included</li>
            <li>Sealed Packaging — Nitrogen-sealed vials</li>
          </ul>
          <h2>99%+ purity guarantee</h2>
          <p>
            Every peptide we sell is guaranteed to be 99%+ pure. If a batch doesn&apos;t meet our
            strict purity standards, it doesn&apos;t ship.
          </p>
          <h2>Third-party testing</h2>
          <p>
            Every batch is independently checked for identity and content by ISO 17025 accredited
            laboratories. Certificates of analysis are available on request.
          </p>
        </Prose>
      </div>
    </section>
  );
}
