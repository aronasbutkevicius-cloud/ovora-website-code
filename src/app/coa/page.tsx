import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { pageMetadata, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Certificates of Analysis",
  description:
    "What an Ovora Labs Certificate of Analysis includes, and how to match it to a vial batch.",
  path: "/coa",
});

export default function CoaPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <PageHero
          title="Certificates of Analysis"
          subtitle="Full transparency on identity and purity for every batch."
        />
        <Prose>
          <h2>What&apos;s included</h2>
          <ul>
            <li>Batch / lot number</li>
            <li>HPLC purity results (99%+)</li>
            <li>Mass spectrometry identity confirmation</li>
            <li>Appearance and related quality notes</li>
          </ul>
          <h2>How to verify</h2>
          <p>
            Match the batch number on your vial to the COA supplied with your order. Contact{" "}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a> if you need a
            replacement copy.
          </p>
        </Prose>
      </div>
    </section>
  );
}
