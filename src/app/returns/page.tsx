import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { pageMetadata, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Returns & Refunds",
  description: "Shipment protection and return eligibility for Ovora Labs research orders.",
  path: "/returns",
});

export default function ReturnsPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
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
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </p>
        </Prose>
      </div>
    </section>
  );
}
