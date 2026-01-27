"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "War Room", href: "/war-room" },
  { label: "Evidence Receipts", href: "/evidence-receipts" },
  { label: "Agentic Transformation", href: "/agentic-transformation" },
];

const solutionsItems = [
  { label: "Gen AI Agents", href: "/gen-ai-agents" },
  { label: "Actuarial Employee Benefits", href: "/actuarial-benefits" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const isSolutionsActive = solutionsItems.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );

  return (
    <header className="w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-white">
          Kincaid IQ
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-sm font-semibold transition",
                  active ? "text-white" : "text-white/70 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className={[
                "flex items-center gap-1 text-sm font-semibold transition",
                isSolutionsActive ? "text-white" : "text-white/70 hover:text-white",
              ].join(" ")}
            >
              Solutions
              <ChevronDown className="h-4 w-4" />
            </button>

            {solutionsOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 rounded-lg border border-white/10 bg-black/95 backdrop-blur shadow-xl">
                <div className="p-2">
                  {solutionsItems.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          "block rounded-md px-4 py-2.5 text-sm font-medium transition",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}