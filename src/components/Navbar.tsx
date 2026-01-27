"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "War Room", href: "/war-room" },
  { label: "Evidence Receipts", href: "/evidence-receipts" },
  { label: "Gen AI Agents", href: "/gen-ai-agents" },
  { label: "Agentic Transformation", href: "/agentic-transformation" },
  { label: "Actuarial Employee Benefits", href: "/actuarial-benefits" },
];

export default function Navbar() {
  const pathname = usePathname();

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
        </nav>
      </div>
    </header>
  );
}