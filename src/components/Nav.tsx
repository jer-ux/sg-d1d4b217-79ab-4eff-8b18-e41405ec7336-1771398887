import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { megaNav, primaryCtas, allNavLinks, topLevelForPath, NavDropdown, NavLink } from "@/components/site";

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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function Badge({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/70">
      {text}
    </span>
  );
}

function NavListItem({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <Link
      href={link.href}
      className={`group block rounded-lg px-3 py-2 transition ${
        active ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <div className="text-sm text-white/90 flex items-center">
        <span className={`${active ? "text-white" : "group-hover:text-white"}`}>{link.label}</span>
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

function DropdownPanel({ item, pathname }: { item: NavDropdown; pathname: string }) {
  const p = pathname.toLowerCase();
  return (
    <div className="k-panel k-glow w-[900px] max-w-[92vw] p-5 bg-[#0A0F19]/98 backdrop-blur-xl">
      <div className="grid grid-cols-12 gap-4">
        <div className={`col-span-12 ${item.featured?.length ? "md:col-span-8" : "md:col-span-12"}`}>
          <div className="grid md:grid-cols-2 gap-4">
            {item.sections.map((sec) => (
              <div key={sec.title} className="border border-white/10 rounded-xl bg-black/40 p-4">
                <div className="text-xs uppercase tracking-wider text-white/55 mb-2">{sec.title}</div>
                <div className="space-y-1">
                  {sec.links.map((lnk) => (
                    <NavListItem key={lnk.href} link={lnk} active={p === lnk.href.toLowerCase() || p.startsWith(lnk.href.toLowerCase() + "/")} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {item.featured?.length ? (
          <div className="col-span-12 md:col-span-4">
            <div className="border border-white/10 rounded-xl bg-black/40 p-4 h-full">
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
  const router = useRouter();
  const pathname = router.pathname;
  const activeTop = topLevelForPath(pathname);

  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties | undefined>(undefined);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useOnClickOutside(wrapperRef, () => setOpen(null));

  const dropdowns = useMemo(() => megaNav, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  // Global keys: ESC + Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
        setPaletteOpen(false);
      }
      const isK = e.key.toLowerCase() === "k";
      const meta = e.metaKey || e.ctrlKey;
      if (meta && isK) {
        e.preventDefault();
        setPaletteOpen(true);
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function clearTimers() {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }

  function computePanelPosition(label: string) {
    const btn = btnRefs.current[label];
    const panel = panelRef.current;
    if (!btn || !panel) return;

    const btnRect = btn.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    const vw = window.innerWidth;
    const gutter = 12;

    const desiredLeft = btnRect.left + btnRect.width / 2 - panelRect.width / 2;
    const left = clamp(desiredLeft, gutter, vw - panelRect.width - gutter);

    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    const wrapperLeft = wrapperRect?.left ?? 0;

    setPanelStyle({ left: left - wrapperLeft });
  }

  function openWithIntent(label: string) {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(label), 120);
  }

  function closeWithIntent() {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  }

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => computePanelPosition(open), 0);
    const onReflow = () => computePanelPosition(open);
    window.addEventListener("resize", onReflow);
    window.addEventListener("scroll", onReflow, true);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onReflow);
      window.removeEventListener("scroll", onReflow, true);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between relative" ref={wrapperRef}>
          <Link href="/" className="font-semibold tracking-tight">
            <span className="text-white">Kincaid</span> <span className="text-white/70">IQ</span>
          </Link>

          {/* Desktop: 4 dropdowns only */}
          <nav className="hidden lg:flex items-center gap-1 text-sm text-white/75">
            {dropdowns.map((item) => {
              const isOpen = open === item.label;
              const isActive = activeTop === item.label;

              return (
                <div key={item.label} className="relative">
                  <button
                    ref={(el) => {
                      btnRefs.current[item.label] = el;
                    }}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : item.label)}
                    onMouseEnter={() => openWithIntent(item.label)}
                    onMouseLeave={() => closeWithIntent()}
                    className={`px-3 py-2 rounded-xl hover:bg-white/5 transition flex items-center gap-2 ${
                      isOpen ? "bg-white/5 text-white" : ""
                    }`}
                  >
                    <span className={isActive ? "text-white" : ""}>{item.label}</span>
                    <span className={`text-white/50 transition ${isOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>

                  {/* Active underline (quiet but premium) */}
                  {isActive ? (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-6 rounded-full bg-white/70" />
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTAs + search */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm text-white/80"
              aria-label="Open search"
            >
              Search <span className="text-white/50">⌘K</span>
            </button>

            <Link href="/contact" className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm">
              Request demo
            </Link>
            <Link href="/capital-markets" className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium">
              Investor access
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
            >
              Search
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
              onClick={() => setMobileOpen((v) => !v)}
            >
              Menu
            </button>
          </div>

          {/* Desktop dropdown panel: single panel, centered+clamped */}
          {open ? (
            <div
              className="hidden lg:block absolute top-[68px]"
              style={panelStyle}
              onMouseEnter={() => clearTimers()}
              onMouseLeave={() => closeWithIntent()}
              ref={panelRef}
            >
              <DropdownPanel item={dropdowns.find((d) => d.label === open)!} pathname={pathname} />
            </div>
          ) : null}
        </div>

        {/* Mobile drawer */}
        {mobileOpen ? (
          <div className="lg:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Link href="/contact" className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm" onClick={() => setMobileOpen(false)}>
                  Request demo
                </Link>
                <Link href="/capital-markets" className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  Investor access
                </Link>
              </div>

              <div className="space-y-3">
                {dropdowns.map((dd) => (
                  <MobileSection key={dd.label} dd={dd} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* Command palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} links={allNavLinks} />
    </>
  );
}

function MobileSection({
  dd,
  pathname,
  onNavigate,
}: {
  dd: NavDropdown;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const p = pathname.toLowerCase();

  return (
    <div className="k-panel p-4">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between text-white/90">
        <span className="font-semibold">{dd.label}</span>
        <span className={`text-white/60 transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open ? (
        <div className="mt-4 space-y-3">
          {dd.sections.map((sec) => (
            <div key={sec.title} className="border border-white/10 rounded-xl bg-black/20 p-3">
              <div className="text-xs uppercase tracking-wider text-white/55 mb-2">{sec.title}</div>
              <div className="space-y-1">
                {sec.links.map((lnk) => {
                  const active = p === lnk.href.toLowerCase() || p.startsWith(lnk.href.toLowerCase() + "/");
                  return (
                    <Link
                      key={lnk.href}
                      href={lnk.href}
                      onClick={onNavigate}
                      className={`block rounded-lg px-3 py-2 transition ${active ? "bg-white/10" : "hover:bg-white/5"}`}
                    >
                      <div className="text-sm text-white/90 flex items-center">
                        {lnk.label}
                        <Badge text={lnk.badge} />
                      </div>
                      {lnk.description ? <div className="text-xs text-white/60 mt-1">{lnk.description}</div> : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}