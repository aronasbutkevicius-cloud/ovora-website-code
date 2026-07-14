import type { Metadata } from "next";
import { FaqItem, PageHero } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Ovora Labs research peptides.",
};

const faqs = [
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
    a: "Orders are typically processed within 0–2 business days. Overnight delivery is available, and free shipping applies on orders over $150.",
  },
  {
    q: "What if my order arrives damaged?",
    a: "Every order includes shipment protection. Damaged products are replaced at no cost with photo evidence.",
  },
];

export default function FaqPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7efe7] min-h-[50vh]">
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
