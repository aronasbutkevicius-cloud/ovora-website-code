import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Shipping Information",
  description: "Processing times and the shipping estimate currently used at Ovora Labs checkout.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <PageHero
          title="Shipping Information"
          subtitle="Processing times and shipment protection on every order."
        />
        <Prose>
          <h2>Processing</h2>
          <p>Orders are processed within 0–2 business days after payment confirmation.</p>
          <h2>Delivery options</h2>
          <ul>
            <li>Standard and expedited shipping available</li>
            <li>Overnight delivery available on eligible orders</li>
            <li>Free shipping on US orders over $100</li>
            <li>$8.99 flat US shipping on orders under $100</li>
            <li>Tracking provided on all orders</li>
          </ul>
          <h2>Packaging</h2>
          <p>
            Orders are packed to protect the contents. Temperature-sensitive materials are packed
            with appropriate insulation when required.
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
