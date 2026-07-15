import Link from "next/link";

export function DarkFooter() {
  return (
    <footer className="bg-black border-t border-red-500/15 text-zinc-400">
      <div className="content-container py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-semibold mb-2">Dark Ovora Labs</p>
          <p className="text-sm leading-relaxed text-zinc-500">
            The other shelf. Anabolics, orals, and oils for those who took the wrong door.
          </p>
        </div>
        <div>
          <p className="text-white text-sm font-medium mb-3">Navigate</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/dark/store" className="hover:text-red-400 transition-colors">
                Compounds
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-red-400 transition-colors">
                Back to Ovora Labs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-white text-sm font-medium mb-3">Notice</p>
          <p className="text-xs leading-relaxed text-zinc-600">
            Dark Ovora Labs is a satirical alternate catalog experience. Products listed here are
            presented as a dark-mode fiction layer of the brand — not medical advice and not an
            invitation to misuse controlled substances.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Dark Ovora Labs
      </div>
    </footer>
  );
}
