"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Crown } from "lucide-react";
import CommandPalette from "./CommandPalette";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { scrollY } = useScroll();

  // Transform values based on scroll position
  const navHeight = useTransform(scrollY, [0, 100], [64, 56]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const logoGlow = useTransform(scrollY, [0, 100], [8, 4]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/actuarial-benefits", label: "Actuarial Benefits" },
    { href: "/evidence-receipts", label: "Evidence Receipts" },
    { href: "/arbitrage-events", label: "Arbitrage" },
    { href: "/investor", label: "Investor" },
    { href: "/family-offices", label: "Family Offices" },
    { href: "/company", label: "Company" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: navHeight }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? "bg-black/95 backdrop-blur-3xl border-b border-amber-500/30 shadow-2xl shadow-amber-500/20" 
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Animated Logo */}
            <motion.div style={{ scale: logoScale }}>
              <Link 
                href="/" 
                className="group flex items-center gap-2 text-xl font-bold tracking-tight transition-all hover:scale-105"
              >
                <motion.div
                  animate={{ 
                    rotate: isScrolled ? 0 : [0, 5, -5, 0],
                    filter: `drop-shadow(0 0 ${logoGlow}px rgba(251,191,36,0.5))`
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    filter: { duration: 0.3 }
                  }}
                >
                  <Crown className="h-5 w-5 text-amber-400" />
                </motion.div>
                <motion.span 
                  className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent"
                  animate={{
                    filter: isScrolled 
                      ? "drop-shadow(0 0 10px rgba(251,191,36,0.2))"
                      : "drop-shadow(0 0 20px rgba(251,191,36,0.3))"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  Kincaid IQ
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Nav with staggered animations */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Link
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
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          boxShadow: [
                            "0 0 4px rgba(251,191,36,0.3)",
                            "0 0 8px rgba(251,191,36,0.6)",
                            "0 0 4px rgba(251,191,36,0.3)"
                          ]
                        }}
                        transition={{
                          layout: { type: "spring", stiffness: 380, damping: 30 },
                          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Animated CTA Button */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
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

            {/* Mobile Menu Button with animation */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-amber-300 p-2 hover:text-amber-200 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with animations */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-black/95 backdrop-blur-3xl border-t border-amber-500/30 shadow-2xl shadow-amber-500/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-base font-medium transition-colors ${
                      router.pathname === item.href
                        ? "text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                        : "text-zinc-300 hover:text-amber-200 hover:drop-shadow-[0_0_4px_rgba(251,191,36,0.2)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: navItems.length * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Link
                  href="/request-demo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-5 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-center font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/40 transition-all"
                >
                  Request Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <CommandPalette />
    </>
  );
}