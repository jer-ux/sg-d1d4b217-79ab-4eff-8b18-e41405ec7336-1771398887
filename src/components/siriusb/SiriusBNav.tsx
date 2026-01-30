import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiriusBNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SiriusB iQ
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/platform" className="text-sm font-medium hover:text-primary transition-colors">
              Platform
            </Link>
            <Link href="/case-studies" className="text-sm font-medium hover:text-primary transition-colors">
              Case Studies
            </Link>
            <Link href="/company" className="text-sm font-medium hover:text-primary transition-colors">
              Company
            </Link>
            <Link href="/contact">
              <Button size="sm">Contact Us</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link
              href="/platform"
              className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Platform
            </Link>
            <Link
              href="/case-studies"
              className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              href="/company"
              className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Company
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full">
                Contact Us
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}