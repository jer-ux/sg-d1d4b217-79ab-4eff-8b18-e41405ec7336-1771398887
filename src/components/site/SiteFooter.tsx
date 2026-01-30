import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold text-white">Kincaid IQ</div>
            <p className="mt-3 text-sm text-white/60">
              Benefits intelligence built for finance teams.
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-white">Platform</div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/kincaid-iq" className="hover:text-white">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/war-room" className="hover:text-white">
                  War Room
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-medium text-white">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/company" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-medium text-white">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/security-governance" className="hover:text-white">
                  Security & Governance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Kincaid IQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}