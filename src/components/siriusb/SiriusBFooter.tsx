import Link from "next/link";

export function SiriusBFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              SiriusB iQ
            </div>
            <p className="text-sm text-muted-foreground">
              AI Data Sciences Lab for enterprise certainty.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/platform" className="hover:text-foreground transition-colors">
                  Platform
                </Link>
              </li>
              <li>
                <Link href="/platform-why" className="hover:text-foreground transition-colors">
                  Why SiriusB
                </Link>
              </li>
              <li>
                <Link href="/security-governance" className="hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/case-studies" className="hover:text-foreground transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/company" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SiriusB iQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}