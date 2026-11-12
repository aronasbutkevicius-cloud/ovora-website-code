import Link from "next/link";
import { AcceptedPayments } from "@/components/AcceptedPayments";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-container py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-8 w-auto" />
            <p className="mt-4 text-sm text-ink-soft leading-relaxed max-w-xs">
              Research-grade peptides for controlled laboratory studies. Third-party tested, with
              certificates of analysis available on request.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              United States
              <br />
              <a href="mailto:support@ovoralabs.com" className="underline underline-offset-2">
                support@ovoralabs.com
              </a>
            </p>
          </div>

          <div>
            <p className="index-label mb-4">Shop</p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <Link href="/store" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/store/lyophilized-peptides" className="hover:text-accent transition-colors">
                  Lyophilized Peptides
                </Link>
              </li>
              <li>
                <Link href="/store/laboratory-supplies" className="hover:text-accent transition-colors">
                  Laboratory Supplies
                </Link>
              </li>
              <li>
                <Link href="/research-use" className="hover:text-accent transition-colors">
                  Research Use Only
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="index-label mb-4">Resources</p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <Link href="/research" className="hover:text-accent transition-colors">
                  Research Library
                </Link>
              </li>
              <li>
                <Link href="/coa" className="hover:text-accent transition-colors">
                  Certificates of Analysis
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-accent transition-colors">
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link href="/research-use" className="hover:text-accent transition-colors">
                  Research Use Only
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="index-label mb-4">Support</p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-accent transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-accent transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="index-label mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-accent transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line pt-8 space-y-6">
          <div className="text-xs text-muted leading-relaxed max-w-4xl">
            <p className="font-semibold text-ink mb-2">FDA Disclaimer</p>
            <p>
              Statements made regarding our products have{" "}
              <strong className="text-ink-soft">
                not been evaluated by the U.S. Food and Drug Administration
              </strong>
              . The efficacy of these products has not been confirmed by FDA-approved research.
              Products are{" "}
              <strong className="text-ink-soft">
                not intended to diagnose, treat, cure, or prevent any disease
              </strong>
              . Information presented on this website is not a substitute for, or alternative
              to, information from a qualified health care practitioner.{" "}
              <Link href="/disclaimer" className="underline hover:text-accent">
                Read the full disclaimer →
              </Link>
            </p>
          </div>

          <AcceptedPayments />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} Ovora Labs. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.14em] text-muted">
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
