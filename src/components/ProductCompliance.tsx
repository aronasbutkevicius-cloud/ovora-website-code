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
    <p className={`text-sm text-[#4a5168] leading-relaxed ${className}`}>
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
      <p className="text-sm text-[#4a5168] leading-relaxed">
        {coaPdf ? (
          <a href={coaPdf} className="underline text-[#1e2235]" download>
            Download certificate of analysis
          </a>
        ) : (
          <>
            Certificate of analysis available on request. Email{" "}
            <a href={`mailto:${supportEmail}`} className="underline text-[#1e2235]">
              {supportEmail}
            </a>
            .
          </>
        )}
      </p>
      <div className="rounded-2xl border border-[#d5dbed] bg-[#eef0f8] p-5 space-y-3 text-sm text-[#4a5168] leading-relaxed">
        <p>{PRODUCT_USE_STATEMENT}</p>
        <p>{QUALIFIED_RESEARCHER_STATEMENT}</p>
        <p>
          <span className="font-semibold text-[#1e2235]">FDA Disclaimer. </span>
          {FDA_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}

function Fact({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`bg-[#eef0f8] rounded-xl p-4 border border-[#d5dbed] ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="text-[#6b7189] mb-1">{label}</dt>
      <dd className="font-medium text-[#1e2235] leading-relaxed">{value}</dd>
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
