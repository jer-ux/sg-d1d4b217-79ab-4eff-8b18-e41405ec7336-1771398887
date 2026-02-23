"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Menu, X, Crown } from "lucide-react";
import CommandPalette from "./CommandPalette";

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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/verified-savings-ledger", label: "Verified Savings Ledger" },
    { href: "/evidence-receipts", label: "Evidence Receipts" },
    { href: "/arbitrage-events", label: "Arbitrage" },
    { href: "/board-of-directors", label: "Board of Directors" },
    { href: "/company", label: "Company" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-black/90 backdrop-blur-2xl border-b border-amber-500/20 shadow-lg shadow-amber-500/10" 
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Vegas luxury styling */}
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-xl font-bold tracking-tight transition-all hover:scale-105"
            >
              <Crown className="h-5 w-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                Kincaid IQ
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    router.pathname === item.href
                      ? "text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                      : "text-zinc-300 hover:text-amber-200 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]"
                  }`}
                >
                  {item.label}
                  {router.pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/request-demo"
                  className="group relative ml-4 px-5 py-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-all hover:shadow-amber-500/50"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 via-white to-amber-400 opacity-0 group-hover:opacity-30"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative">Request Demo</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-amber-300 p-2 hover:text-amber-200 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-amber-500/20"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    router.pathname === item.href
                      ? "text-amber-300"
                      : "text-zinc-300 hover:text-amber-200"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/request-demo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-5 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-center font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/40 transition-all"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <CommandPalette />
    </>
  );
}