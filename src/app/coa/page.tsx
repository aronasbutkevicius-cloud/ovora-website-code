import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/PageBits";
import { catalogProducts } from "@/data/products";
import { pageMetadata, supportEmail } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Certificates of Analysis",
  description:
    "Certificates of analysis for Ovora Labs research materials are available on request.",
  path: "/coa",
});

export default function CoaPage() {
  const items = catalogProducts();

  return (
    <section className="py-12 lg:py-16 bg-[#f7f8fc]">
      <div className="content-container">
        <PageHero
          title="Certificates of Analysis"
          subtitle="Each listing below can be matched to a batch certificate on request."
        />
        <Prose>
          <p>
            A certificate of analysis is available on request for every item below. Email{" "}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a> with the compound name and
            quantity. When a file is added for an item, a download link appears here.
          </p>
          <h2>What a certificate includes</h2>
          <ul>
            <li>Batch / lot number</li>
            <li>HPLC purity results</li>
            <li>Mass spectrometry identity confirmation</li>
            <li>Appearance and related quality notes</li>
          </ul>
        </Prose>
        <ul className="mt-10 max-w-3xl divide-y divide-[#d5dbed] rounded-2xl border border-[#d5dbed] bg-white">
          {items.map((product) => (
            <li key={product.slug} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4">
              <p className="font-medium text-[#1e2235]">
                {product.name} {product.dose}
              </p>
              {product.coaPdf ? (
                <a href={product.coaPdf} className="text-sm underline text-[#1e2235]" download>
                  Download certificate of analysis
                </a>
              ) : (
                <p className="text-sm text-[#6b7189]">
                  Certificate of analysis available on request via{" "}
                  <a href={`mailto:${supportEmail}`} className="underline text-[#1e2235]">
                    {supportEmail}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
