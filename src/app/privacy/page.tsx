import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { pageMetadata, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Ovora Labs describes collection and use of order and support information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="py-12 lg:py-16 bg-canvas">
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
          <h2>Promotional text messages</h2>
          <p>
            If you add a mobile number and check the consent box, we store that number, the time you
            consented, and the exact consent text and version you agreed to. We use this record to
            send recurring automated promotional text messages and to determine eligibility for a
            one-time first-order discount. Consent is not a condition of purchase. Message and data
            rates may apply. Reply STOP to opt out and HELP for help. You may also email{" "}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a> to opt out. We do not sell phone
            numbers. See the Terms of Service for the message program.
          </p>
          <h2>Contact</h2>
          <p>
            Privacy questions:{" "}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </p>
        </Prose>
      </div>
    </section>
  );
}
