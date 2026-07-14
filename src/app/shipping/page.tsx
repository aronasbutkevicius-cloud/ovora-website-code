import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Shipping Information",
};

export default function ShippingPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#fffaf6]">
      <div className="content-container">
        <PageHero
          title="Shipping Information"
          subtitle="Fast, discreet shipping with protection on every order."
        />
        <Prose>
          <h2>Processing</h2>
          <p>Orders are processed within 0–2 business days after payment confirmation.</p>
          <h2>Delivery options</h2>
          <ul>
            <li>Standard and expedited shipping available</li>
            <li>Overnight delivery available on eligible orders</li>
            <li>Free shipping on orders over $150</li>
            <li>Tracking provided on all orders</li>
          </ul>
          <h2>Packaging</h2>
          <p>
            All shipments use discreet packaging. Temperature-sensitive materials are packed with
            appropriate insulation when required.
          </p>
          <h2>Shipment protection</h2>
          <p>
            Free shipment protection is included on every order. Damaged products are replaced at
            no cost with photo evidence.
          </p>
        </Prose>
      </div>
    </section>
  );
}
