import Link from "next/link";

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl mb-10">
      <h1 className="text-4xl lg:text-5xl font-semibold text-[#1e2235] tracking-tight mb-3">
        {title}
      </h1>
      {subtitle && <p className="text-[#1e2235]/60 text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose-ovora max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#1e2235]/70 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#1e2235] [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:underline [&_a]:text-[#1e2235]">
      {children}
    </div>
  );
}

export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-[#f7f8fc] rounded-2xl border border-[#d5dbed] p-5 open:shadow-sm">
      <summary className="cursor-pointer list-none font-medium text-[#1e2235] flex items-center justify-between gap-4">
        {q}
        <span className="text-[#1e2235]/30 group-open:rotate-45 transition-transform text-xl leading-none">
          +
        </span>
      </summary>
      <p className="mt-3 text-sm text-[#1e2235]/60 leading-relaxed">{a}</p>
    </details>
  );
}

export function BackToShop() {
  return (
    <p className="mt-10">
      <Link href="/store" className="text-sm font-medium underline underline-offset-4">
        ← Back to store
      </Link>
    </p>
  );
}
