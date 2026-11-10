import type { Metadata } from "next";
import { FaqItem, PageHero } from "@/components/PageBits";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Ovora Labs research peptides.",
  path: "/faq",
});

const faqs: { q: string; a: string; schemaAnswer?: string }[] = [
  {
    q: "Who can view the catalog?",
    a: "Create a researcher account and sign in. The catalog and checkout are shown only after sign-in. Products are sold only to qualified researchers and licensed laboratories.",
  },
  {
    q: "Are your products for human use?",
    a: "No. All Ovora Labs products are sold strictly for laboratory and research use only — not for human or veterinary consumption.",
  },
  {
    q: "Do you provide Certificates of Analysis?",
    a: "Yes. Every batch ships with a Certificate of Analysis documenting purity and identity testing.",
  },
  {
    q: "What purity do you guarantee?",
    a: "We guarantee 99%+ purity on every peptide we sell. Batches that do not meet our standards do not ship.",
  },
  {
    q: "Where are you based?",
    a: "Ovora Labs is headquartered in the United States. Sourcing, QC, support, and shipping are handled from our US operations.",
  },
  {
    q: "How fast do you ship?",
    a: "Orders are typically processed within 0–2 business days. Overnight delivery is available. US shipping is $8.99, and free on orders over $100.",
    schemaAnswer:
      "Orders are typically processed within 0–2 business days. Overnight delivery is available. Free shipping is offered on qualifying US orders.",
  },
  {
    q: "What if my order arrives damaged?",
    a: "Every order includes shipment protection. Damaged products are replaced at no cost with photo evidence.",
  },
];

function answerForSchema(faq: { a: string; schemaAnswer?: string }) {
  const text = faq.schemaAnswer ?? faq.a;
  if (/\$\s?\d/.test(text)) {
    throw new Error("FAQ schema must not include prices");
  }
  return text;
}

export default function FaqPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#eef0f8] min-h-[50vh]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: answerForSchema(faq),
            },
          })),
        }}
      />
      <div className="content-container">
        <PageHero
          title="FAQ"
          subtitle="Quick answers about purity, shipping, documentation, and research-use policies."
        />
        <div className="max-w-3xl space-y-3">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
