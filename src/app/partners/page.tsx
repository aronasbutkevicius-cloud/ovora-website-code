import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";

export const metadata: Metadata = { title: "Partner Program" };

export default function PartnersPage() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="content-container">
        <PageHero
          title="Partner Program"
          subtitle="Affiliate and institutional partnership opportunities with Ovora Labs."
        />
        <Prose>
          <h2>Who it&apos;s for</h2>
          <p>
            Content creators, research networks, and institutional buyers who want to refer
            qualified researchers to Ovora Labs.
          </p>
          <h2>Affiliate terms (summary)</h2>
          <ul>
            <li>Promotion must clearly state products are for research use only</li>
            <li>No medical, therapeutic, or human-use claims</li>
            <li>Commissions paid on qualified completed research orders</li>
            <li>Ovora Labs may revoke access for policy violations</li>
          </ul>
          <h2>Apply</h2>
          <p>
            Email{" "}
            <a href="mailto:partners@ovoralabs.com">partners@ovoralabs.com</a> with your audience,
            channels, and intended research-use messaging.
          </p>
        </Prose>
      </div>
    </section>
  );
}
