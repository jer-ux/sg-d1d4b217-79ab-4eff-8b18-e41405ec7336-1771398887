import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NavLink } from "@/components/site";

function scoreMatch(q: string, text: string) {
  const a = q.toLowerCase().trim();
  const b = text.toLowerCase();
  if (!a) return 0;
  if (b === a) return 100;
  if (b.startsWith(a)) return 80;
  if (b.includes(a)) return 60;
  // lightweight fuzzy: count ordered hits
  let i = 0;
  for (const ch of a) {
    i = b.indexOf(ch, i);
    if (i === -1) return 0;
    i++;
  }
  return 35;
}

export function CommandPalette({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const scored = links
      .map((l) => ({
        link: l,
        s: Math.max(scoreMatch(q, l.label), scoreMatch(q, l.description ?? "")),
      }))
      .filter((x) => (q ? x.s > 0 : true))
      .sort((a, b) => b.s - a.s)
      .slice(0, 10);
    return scored.map((x) => x.link);
  }, [q, links]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((x) => Math.min(x + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((x) => Math.max(x - 1, 0));
      }
      if (e.key === "Enter") {
        const target = results[active];
        if (target) window.location.href = target.href;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[720px] max-w-[92vw] k-panel k-glow p-4 bg-[#0A0F19]/98">
        <div className="text-xs text-white/55 mb-2">Search pages (Ctrl+K / ⌘K)</div>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to search…"
          className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
        />

        <div className="mt-3 space-y-1">
          {results.map((r, idx) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={onClose}
              className={`block rounded-xl px-4 py-3 border transition ${
                idx === active
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="text-sm text-white/90 font-medium">{r.label}</div>
              {r.description ? <div className="text-xs text-white/60 mt-1">{r.description}</div> : null}
            </Link>
          ))}
        </div>

        <div className="mt-3 text-xs text-white/50">
          Tip: use ↑ ↓ to select, Enter to open, Esc to close.
        </div>
      </div>
    </div>
  );
}