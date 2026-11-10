import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Prose } from "@/components/PageBits";
import { getSiteUrl, pageMetadata, siteName, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Ovora Labs is a United States company supplying research-grade peptides. Batches are third-party tested and sold for laboratory research use only.",
  path: "/about",
});

const points = [
  {
    title: "United States",
    body: "Sourcing, quality control, customer support, and shipping are handled from our US operations.",
  },
  {
    title: "Tested batches",
    body: "Identity and content are checked by independent ISO 17025 accredited laboratories, with a certificate of analysis for each batch.",
  },
  {
    title: "Research use only",
    body: "Products are sold only to qualified researchers and licensed laboratories. They are not for human or veterinary consumption.",
  },
];

export default function AboutPage() {
  const siteUrl = getSiteUrl();

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Ovora Labs",
          url: `${siteUrl}/about`,
          description:
            "Ovora Labs is a United States company supplying research-grade peptides for laboratory research use only.",
          about: {
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
            email: supportEmail,
          },
        }}
      />
      <div className="content-container">
        <PageHero
          title="About Ovora Labs"
          subtitle="A United States supplier of research-grade peptides for laboratory use."
        />

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mb-12">
          {points.map((point) => (
            <div
              key={point.title}
              className="bg-[#eef0f8] rounded-2xl p-6 border border-[#d5dbed]"
            >
              <h2 className="text-lg font-semibold text-[#1e2235] mb-2">{point.title}</h2>
              <p className="text-sm text-[#4a5168] leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>

        <Prose>
          <h2>A US-based company</h2>
          <p>
            Ovora Labs is based in the United States. We handle sourcing, quality control,
            customer support, and shipping from our US operations. For product, documentation, or
            order questions, email{" "}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
          </p>
          <h2>Quality and testing</h2>
          <p>
            Every peptide we sell is guaranteed 99%+ pure. Batches that do not meet that standard
            do not ship. Materials are checked before synthesis, purified, and then independently
            tested for identity and content. Full certificates of analysis document the batch.
          </p>
          <p>
            Read the{" "}
            <Link href="/quality">quality assurance process</Link> and how a{" "}
            <Link href="/coa">certificate of analysis</Link> is matched to a vial.
          </p>
          <h2>Research use only</h2>
          <p>
            All Ovora Labs products are sold strictly for in-vitro and laboratory research. They
            are not for human consumption, not for veterinary use, and not intended to diagnose,
            treat, cure, or prevent any disease. Purchasers confirm they are qualified researchers
            or are buying for a laboratory.
          </p>
          <p>
            Handling, storage, and purchaser responsibilities are on the{" "}
            <Link href="/research-use">research-use policy</Link>. The catalog is at the{" "}
            <Link href="/store">store</Link>.
          </p>
        </Prose>
      </div>
    </section>
  );
}
