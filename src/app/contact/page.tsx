import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageBits";
import { PlaceholderNote } from "@/components/PlaceholderNote";
import { pageMetadata, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Ovora Labs support for research peptide inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc] min-h-[50vh]">
      <div className="content-container">
        <PageHero
          title="Contact Us"
          subtitle="Questions about products, COAs, shipping, or research documentation? Our US-based team is here to help."
        />
        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl">
          <div className="space-y-6">
            <div className="bg-[#eef0f8] rounded-2xl p-6 border border-[#d5dbed]">
              <p className="text-sm text-[#1e2235]/45 mb-1">Email</p>
              <a
                href={`mailto:${supportEmail}`}
                className="text-lg font-medium text-[#1e2235] hover:underline"
              >
                {supportEmail}
              </a>
            </div>
            <div className="bg-[#eef0f8] rounded-2xl p-6 border border-[#d5dbed]">
              <p className="text-sm text-[#1e2235]/45 mb-1">Location</p>
              <p className="text-lg font-medium text-[#1e2235]">United States</p>
            </div>
            <div className="bg-[#eef0f8] rounded-2xl p-6 border border-[#d5dbed]">
              <p className="text-sm text-[#1e2235]/45 mb-1">Hours</p>
              <p className="text-lg font-medium text-[#1e2235]">Mon–Fri, 9am–6pm ET</p>
            </div>
            <PlaceholderNote>
              A phone number and street address are not on this page. Confirm the email and hours
              above, then add a phone or mailing address here if you want them public.
            </PlaceholderNote>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
