import { DarkFooter } from "@/components/dark/DarkFooter";
import { DarkHeader } from "@/components/dark/DarkHeader";

export default function DarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark-ovora min-h-screen bg-[#050507] text-zinc-100">
      <DarkHeader />
      <main>{children}</main>
      <DarkFooter />
    </div>
  );
}
