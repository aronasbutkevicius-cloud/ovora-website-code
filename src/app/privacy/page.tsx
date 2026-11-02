import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { PlaceholderNote } from "@/components/PlaceholderNote";
import { pageMetadata, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Ovora Labs describes collection and use of order and support information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <PageHero title="Privacy Policy" />
        <div className="mb-8 max-w-3xl">
          <PlaceholderNote>
            Add the legal entity name, mailing address, and the date this policy takes effect
            before publishing. Checkout payments are processed by TagadaPay. Card details for
            Crypto — Pay by card are entered on TagadaPay&apos;s payment page, not on this site.
          </PlaceholderNote>
        </div>
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
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </p>
        </Prose>
      </div>
    </section>
  );
}
