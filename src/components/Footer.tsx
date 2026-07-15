import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1e2235] text-white">
      <div className="content-container py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <p className="font-semibold text-lg mb-3 tracking-tight">Ovora Labs</p>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Premium research-grade peptides for optimal controlled studies and performance.
              Third-party tested with Certificate of Analysis.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Shop</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/store" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/research-use" className="hover:text-white transition-colors">
                  Research Use Only
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Resources</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  Research Library
                </Link>
              </li>
              <li>
                <Link href="/coa" className="hover:text-white transition-colors">
                  Certificates of Analysis
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-white transition-colors">
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link href="/research-use" className="hover:text-white transition-colors">
                  Research Use Only
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Support</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 space-y-6">
          <div className="text-xs text-white/45 leading-relaxed max-w-4xl">
            <p className="font-semibold text-white/70 mb-2">FDA Disclaimer</p>
            <p>
              Statements made regarding our products have{" "}
              <strong className="text-white/60">
                not been evaluated by the U.S. Food and Drug Administration
              </strong>
              . The efficacy of these products has not been confirmed by FDA-approved research.
              Products are{" "}
              <strong className="text-white/60">
                not intended to diagnose, treat, cure, or prevent any disease
              </strong>
              . Information presented on this website is not a substitute for, or alternative
              to, information from a qualified health care practitioner.{" "}
              <Link href="/disclaimer" className="underline hover:text-white">
                Read the full disclaimer →
              </Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Ovora Labs. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] text-white/45">
              <span>SSL Secured</span>
              <span>99%+ Purity</span>
              <span>Shipment Protection</span>
              <span>Research Use Only</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
