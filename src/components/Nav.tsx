"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { nav } from "@/components/site";

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-lg">
            <span className="text-white">Kincaid</span>{" "}
            <span className="text-white/70">IQ</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm text-white/75">
            {nav.map((item) => (
              <div key={item.label}>
                {item.label}
              </div>
            ))}
          </nav>

          <div className="flex gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition text-sm font-medium shadow-lg"
            >
              Request demo
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const isActive = (href: string) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          <span className="text-white">Kincaid</span>{" "}
          <span className="text-white/70">IQ</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {nav.map((item) => {
            if (!item.href) return null;
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-medium transition ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex gap-3">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition text-sm font-medium shadow-lg"
          >
            Request demo
          </Link>
        </div>
      </div>
    </header>
  );
}