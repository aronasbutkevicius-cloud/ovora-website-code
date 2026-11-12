import Link from "next/link";
import {
  FDA_DISCLAIMER,
  PRODUCT_USE_STATEMENT,
  PURITY_STATEMENT,
  QUALIFIED_RESEARCHER_STATEMENT,
} from "@/lib/compliance";
import { supportEmail } from "@/lib/site";
import type { Product, ProductFamily } from "@/data/products";

export function ResearcherNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-ink-soft leading-relaxed ${className}`}>
      {QUALIFIED_RESEARCHER_STATEMENT}
    </p>
  );
}

export function ProductCompliance({
  family,
  variant,
}: {
  family: ProductFamily;
  variant?: Product;
}) {
  const cas = variant?.cas ?? family.cas;
  const molecularWeight = variant?.molecularWeight ?? family.molecularWeight;
  const storage = variant?.storage ?? family.storage;
  const coaPdf = variant?.coaPdf ?? family.coaPdf;

  return (
    <div className="mt-8 space-y-4">
      <dl className="grid sm:grid-cols-2 gap-4 text-sm">
        <Fact label="CAS number" value={cas} />
        <Fact label="Molecular weight" value={molecularWeight} />
        <Fact label="Storage" value={storage} wide />
        <Fact label="Purity" value={PURITY_STATEMENT} wide />
      </dl>
      <p className="text-sm text-ink-soft leading-relaxed">
        {coaPdf ? (
          <a href={coaPdf} className="underline text-ink" download>
            Download certificate of analysis
          </a>
        ) : (
          <>
            Certificate of analysis available on request. Email{" "}
            <a href={`mailto:${supportEmail}`} className="underline text-ink">
              {supportEmail}
            </a>
            .
          </>
        )}
      </p>
      <div className="rounded-2xl border border-line bg-surface-2 p-5 space-y-3 text-sm text-ink-soft leading-relaxed">
        <p>{PRODUCT_USE_STATEMENT}</p>
        <p>{QUALIFIED_RESEARCHER_STATEMENT}</p>
        <p>
          <span className="font-semibold text-ink">FDA Disclaimer. </span>
          {FDA_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}

function Fact({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`bg-surface-2 rounded-xl p-4 border border-line ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="text-muted mb-1">{label}</dt>
      <dd className="font-medium text-ink leading-relaxed">{value}</dd>
    </div>
  );
}

export function CoaRequest({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <Link href={href} className="underline">
      Download
    </Link>
  );
}
