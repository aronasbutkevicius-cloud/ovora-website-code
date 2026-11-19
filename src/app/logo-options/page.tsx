import type { Metadata } from "next";
import { logoMarkOptions } from "@/components/LogoMarks";
import { gatedMetadata } from "@/lib/site";

export const metadata: Metadata = gatedMetadata({
  title: "Logo options",
  description: "Temporary preview of Ovora Labs logo marks. Not for indexing.",
  path: "/logo-options",
});

function Wordmark({ className }: { className: string }) {
  return <span className={`font-sans font-semibold leading-none tracking-tight text-ink ${className}`}>Ovora Labs</span>;
}

export default function LogoOptionsPage() {
  return (
    <section className="bg-canvas py-10 lg:py-14">
      <div className="content-container">
        <p className="index-label">Internal preview</p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink">Logo options</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Four marks beside the unified wordmark. The live header still uses the current icon.
          Research use only. Not for human or veterinary consumption.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {logoMarkOptions.map(({ id, name, Mark }) => (
            <article key={id} className="folio p-6">
              <p className="index-label">Option {id}</p>
              <h2 className="mt-2 font-display text-2xl font-medium text-ink">{name}</h2>
              <div className="mt-6 flex items-center gap-2.5">
                <Mark className="h-8 w-8 shrink-0" />
                <Wordmark className="text-lg" />
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <Mark className="h-20 w-20 shrink-0" />
                <Wordmark className="text-4xl" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
