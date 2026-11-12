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
    <section className="py-12 lg:py-16 bg-canvas">
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
        <ul className="mt-10 max-w-3xl divide-y divide-line rounded-2xl border border-line glass-panel">
          {items.map((product) => (
            <li id={`coa-${product.slug}`} key={product.slug} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4">
              <p className="font-medium text-ink">
                {product.name} {product.dose}
              </p>
              {product.coaPdf ? (
                <a href={product.coaPdf} className="text-sm underline text-ink" download>
                  Download certificate of analysis
                </a>
              ) : (
                <p className="text-sm text-muted">
                  Coming soon. A certificate file is not uploaded yet. Available on request via{" "}
                  <a href={`mailto:${supportEmail}`} className="underline text-ink">
                    {supportEmail}
                  </a>
                  .
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
