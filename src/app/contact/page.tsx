import type { Metadata } from "next";
import { PageHero } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Ovora Labs support for research peptide inquiries.",
};

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
                href="mailto:support@ovoralabs.com"
                className="text-lg font-medium text-[#1e2235] hover:underline"
              >
                support@ovoralabs.com
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
          </div>
          <form className="bg-[#f7f8fc] rounded-3xl border border-[#d5dbed] p-6 lg:p-8 space-y-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-[#1e2235] mb-1.5">Name</label>
              <input
                className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1e2235] mb-1.5">Email</label>
              <input
                type="email"
                className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10"
                placeholder="you@lab.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1e2235] mb-1.5">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 resize-y"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="button"
              className="h-11 px-6 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
