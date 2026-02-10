"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/platform", label: "Platform" },
    { href: "/agentic-workflow", label: "Agentic Workflow" },
    { href: "/war-room", label: "War Room" },
    { href: "/evidence-receipts", label: "Evidence" },
    { href: "/actuarial-benefits", label: "Actuarial Benefits" },
    { href: "/company", label: "Company" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/10" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            Kincaid IQ
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  router.pathname === link.href
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-demo"
              className="ml-4 px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10"
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white hover:text-blue-400 transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-demo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full px-5 py-3 bg-white text-black text-center font-medium rounded-full hover:bg-gray-100 transition-all"
            >
              Request Demo
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}