import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#fffaf6]">
      <div className="content-container">
        <PageHero title="Returns & Refunds" />
        <Prose>
          <h2>Shipment protection</h2>
          <p>
            Damaged products are replaced at no cost with photo evidence under our free shipment
            protection policy.
          </p>
          <h2>Quality concerns</h2>
          <p>
            If a product appears to deviate from its Certificate of Analysis, contact support
            immediately with your order number and batch ID. We will investigate and resolve
            verified quality issues.
          </p>
          <h2>Eligibility</h2>
          <p>
            Because products are research materials, opened vials are generally not eligible for
            return unless a quality defect is confirmed. Unopened, intact orders may be reviewed
            case-by-case within 14 days of delivery.
          </p>
          <h2>Contact</h2>
          <p>
            <a href="mailto:support@ovoralabs.com">support@ovoralabs.com</a>
          </p>
        </Prose>
      </div>
    </section>
  );
}
