import React, { useEffect, useMemo, useRef, useState } from "react";

// --- localStorage persisted number (safe for SSR) ---
function useLocalStorageNumber(key: string, initial: number) {
  const [value, setValue] = useState<number>(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) {
        const n = Number(raw);
        if (!Number.isNaN(n)) setValue(n);
      }
    } catch {}
     
  }, [key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, String(value));
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}

type SplitPaneProps = {
  storageKey: string;           // e.g., "kincaid.warroom.split"
  defaultLeftPct?: number;      // default 60
  minLeftPct?: number;          // clamp
  maxLeftPct?: number;          // clamp
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export function SplitPane({
  storageKey,
  defaultLeftPct = 60,
  minLeftPct = 45,
  maxLeftPct = 70,
  left,
  right,
  className = "",
}: SplitPaneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [leftPct, setLeftPct] = useLocalStorageNumber(storageKey, defaultLeftPct);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setLeftPct(clamp(Math.round(pct * 10) / 10, minLeftPct, maxLeftPct));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setFromClientX(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    setFromClientX(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    const onTouchMove = (e: TouchEvent) => setFromClientX(e.touches[0].clientX);
    const onTouchEnd = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // prevent text selection while dragging
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.body.style.userSelect = "";
    };
  }, [dragging]);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `${leftPct}% 10px ${100 - leftPct}%`,
    }),
    [leftPct]
  );

  return (
    <div
      ref={containerRef}
      className={`hidden xl:grid w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] ${className}`}
      style={gridStyle}
    >
      <div className="min-w-0">{left}</div>

      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className={`relative cursor-col-resize ${dragging ? "bg-white/10" : "bg-transparent"} transition`}
        title="Drag to resize panels"
      >
        {/* Lit divider line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/15 via-white/5 to-white/15" />
        {/* Grip dots */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1">
          <div className="h-1 w-1 rounded-full bg-white/35" />
          <div className="h-1 w-1 rounded-full bg-white/25" />
          <div className="h-1 w-1 rounded-full bg-white/35" />
        </div>
        {/* Bigger hit area */}
        <div className="absolute inset-0" />
      </div>

      <div className="min-w-0">{right}</div>
    </div>
  );
}