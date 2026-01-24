"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { megaNav, primaryCtas } from "@/components/site";

export function Nav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            <span className="text-white">Kincaid</span>{" "}
            <span className="text-white/70">IQ</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {megaNav.map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(dropdown.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="px-4 py-2 text-sm text-white/75 hover:text-white transition flex items-center gap-1">
                  {dropdown.label}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {openDropdown === dropdown.label && (
                  <div className="absolute top-full left-0 pt-2 min-w-[600px]">
                    <div className="k-panel p-6 grid grid-cols-2 gap-6">
                      <div className="space-y-6">
                        {dropdown.sections.map((section) => (
                          <div key={section.title}>
                            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                              {section.title}
                            </div>
                            <div className="space-y-2">
                              {section.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="block p-3 rounded-lg hover:bg-white/5 transition group"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-white/90 group-hover:text-white text-sm">
                                      {link.label}
                                    </span>
                                    {link.badge && (
                                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                                        {link.badge}
                                      </span>
                                    )}
                                  </div>
                                  {link.description && (
                                    <div className="text-xs text-white/60 mt-1">
                                      {link.description}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {dropdown.featured && (
                        <div className="border-l border-white/10 pl-6">
                          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                            Featured
                          </div>
                          <div className="space-y-3">
                            {dropdown.featured.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-white text-sm">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-white/70">
                                  {item.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex gap-2">
            {primaryCtas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={
                  cta.href === "/contact"
                    ? "px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
                    : "px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}