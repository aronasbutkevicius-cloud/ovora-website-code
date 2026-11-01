export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#7a8fd4] bg-[#eef0f8] px-4 py-3 text-sm leading-relaxed text-[#4a5168]">
      <p className="mb-1 font-semibold text-[#1e2235]">Owner placeholder</p>
      {children}
    </div>
  );
}
