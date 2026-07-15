import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <PageHero title="Privacy Policy" />
        <Prose>
          <h2>Information we collect</h2>
          <p>
            We collect information you provide when placing orders, contacting support, or
            subscribing to research updates — such as name, email, shipping address, and payment
            details processed by our payment providers.
          </p>
          <h2>How we use information</h2>
          <ul>
            <li>Fulfill and support orders</li>
            <li>Provide customer service</li>
            <li>Send optional research catalog updates</li>
            <li>Improve site security and fraud prevention</li>
          </ul>
          <h2>Sharing</h2>
          <p>
            We do not sell personal information. We share data only with service providers needed to
            operate the business (payments, shipping, analytics) under appropriate safeguards.
          </p>
          <h2>Contact</h2>
          <p>
            Privacy questions:{" "}
            <a href="mailto:support@ovoralabs.com">support@ovoralabs.com</a>
          </p>
        </Prose>
      </div>
    </section>
  );
}
