"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { megaNav, primaryCtas, NavDropdown, NavLink } from "@/components/site";

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function Badge({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/70">
      {text}
    </span>
  );
}

function NavListItem({ link }: { link: NavLink }) {
  return (
    <Link href={link.href} className="group block rounded-lg px-3 py-2 hover:bg-white/5 transition">
      <div className="text-sm text-white/90 flex items-center">
        <span className="group-hover:text-white">{link.label}</span>
        <Badge text={link.badge} />
      </div>
      {link.description && <div className="text-xs text-white/60 mt-1">{link.description}</div>}
    </Link>
  );
}

function FeaturedCard({ link }: { link: NavLink }) {
  return (
    <Link href={link.href} className="block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-4">
      <div className="text-sm font-semibold text-white/90">
        {link.label}
        <Badge text={link.badge} />
      </div>
      {link.description && <div className="text-xs text-white/65 mt-1">{link.description}</div>}
    </Link>
  );
}

function DropdownPanel({ item }: { item: NavDropdown }) {
  return (
    <div className="k-panel k-glow w-[860px] max-w-[92vw] p-5">
      <div className="grid grid-cols-12 gap-4">
        <div className={`col-span-12 ${item.featured?.length ? "md:col-span-8" : "md:col-span-12"}`}>
          <div className="grid md:grid-cols-2 gap-4">
            {item.sections.map((sec) => (
              <div key={sec.title} className="border border-white/10 rounded-xl bg-black/20 p-4">
                <div className="text-xs uppercase tracking-wider text-white/55 mb-2">{sec.title}</div>
                <div className="space-y-1">
                  {sec.links.map((lnk) => (
                    <NavListItem key={lnk.href} link={lnk} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {item.featured?.length ? (
          <div className="col-span-12 md:col-span-4">
            <div className="border border-white/10 rounded-xl bg-black/20 p-4 h-full">
              <div className="text-xs uppercase tracking-wider text-white/55 mb-2">Featured</div>
              <div className="space-y-3">
                {item.featured.map((f) => (
                  <FeaturedCard key={f.href} link={f} />
                ))}
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="text-xs text-white/60">Fast paths</div>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {primaryCtas.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef, () => setOpen(null));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const dropdowns = useMemo(() => megaNav, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between" ref={wrapperRef}>
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-white">Kincaid</span> <span className="text-white/70">IQ</span>
        </Link>

        {/* Desktop: only the handful of dropdown boxes */}
        <nav className="hidden lg:flex items-center gap-1 text-sm text-white/75">
          {dropdowns.map((item) => {
            const isOpen = open === item.label;
            return (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.label)}
                  onMouseEnter={() => setOpen(item.label)}
                  className={`px-3 py-2 rounded-xl hover:bg-white/5 transition flex items-center gap-2 ${
                    isOpen ? "bg-white/5 text-white" : ""
                  }`}
                >
                  {item.label}
                  <span className={`text-white/50 transition ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </button>

                {isOpen ? (
                  <div className="absolute left-0 top-[52px]" onMouseLeave={() => setOpen(null)}>
                    <DropdownPanel item={item} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex gap-2">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Request demo
          </Link>
          <Link
            href="/capital-markets"
            className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
          >
            Investor access
          </Link>
        </div>

        {/* Mobile */}
        <button
          type="button"
          className="lg:hidden px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          onClick={() => setMobileOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="lg:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Request demo
              </Link>
              <Link
                href="/capital-markets"
                className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Investor access
              </Link>
            </div>

            <div className="space-y-3">
              {dropdowns.map((dd) => (
                <MobileSection key={dd.label} dd={dd} onNavigate={() => setMobileOpen(false)} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MobileSection({ dd, onNavigate }: { dd: NavDropdown; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="k-panel p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-white/90"
      >
        <span className="font-semibold">{dd.label}</span>
        <span className={`text-white/60 transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open ? (
        <div className="mt-4 space-y-3">
          {dd.sections.map((sec) => (
            <div key={sec.title} className="border border-white/10 rounded-xl bg-black/20 p-3">
              <div className="text-xs uppercase tracking-wider text-white/55 mb-2">{sec.title}</div>
              <div className="space-y-1">
                {sec.links.map((lnk) => (
                  <Link
                    key={lnk.href}
                    href={lnk.href}
                    onClick={onNavigate}
                    className="block rounded-lg px-3 py-2 hover:bg-white/5 transition"
                  >
                    <div className="text-sm text-white/90 flex items-center">
                      {lnk.label}
                      <Badge text={lnk.badge} />
                    </div>
                    {lnk.description ? <div className="text-xs text-white/60 mt-1">{lnk.description}</div> : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}