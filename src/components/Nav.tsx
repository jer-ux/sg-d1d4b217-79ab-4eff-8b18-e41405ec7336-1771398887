"use client";

import { useState } from "react";
import Link from "next/link";
import { nav } from "@/components/site";
import type { NavLink } from "@/components/site";
import { ChevronDown } from "lucide-react";

export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          <span className="text-white">Kincaid</span>{" "}
          <span className="text-white/70">IQ</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm text-white/75">
          {nav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isOpen={openDropdown === item.label}
              onToggle={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
              onClose={() => setOpenDropdown(null)}
            />
          ))}
        </nav>

        <div className="flex gap-2">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Request demo
          </Link>
          <Link
            href="/capital-markets"
            className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition text-sm font-medium"
          >
            Investor access
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: NavLink;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition"
      >
        {item.label}
      </Link>
    );
  }

  if (item.groups) {
    return (
      <div
        className="relative"
        onMouseEnter={onToggle}
        onMouseLeave={onClose}
      >
        <button
          onClick={onToggle}
          className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition flex items-center gap-1"
        >
          {item.label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-[600px] bg-[#0A0E14] border border-white/10 rounded-2xl shadow-2xl p-4">
            <div className="grid grid-cols-2 gap-6">
              {item.groups.map((group) => (
                <div key={group.label}>
                  <div className="text-xs font-medium text-white/45 uppercase tracking-wider mb-3 px-3">
                    {group.label}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={onClose}
                        className="block px-3 py-2.5 rounded-lg hover:bg-white/5 transition group"
                      >
                        <div className="text-sm font-medium text-white/90 group-hover:text-white">
                          {subItem.label}
                        </div>
                        {subItem.description && (
                          <div className="text-xs text-white/50 mt-0.5">
                            {subItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}