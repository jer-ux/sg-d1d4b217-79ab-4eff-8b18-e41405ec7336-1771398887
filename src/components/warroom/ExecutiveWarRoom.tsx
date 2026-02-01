import { useEffect, useMemo, useState } from "react";
import type { Filters, Period, SnapshotResponse, TileData, TileKey, StreamMessage } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { ExecutiveKPITile } from "./tiles/ExecutiveKPITile";

const DEFAULT_FILTERS: Filters = {
  org: "Portfolio",
  period: "MTD",
  currency: "USD",
  businessUnit: "All",
};

export function ExecutiveWarRoom() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const [status, setStatus] = useState<"connecting" | "live" | "offline">("connecting");

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set("org", filters.org);
    p.set("period", filters.period);
    p.set("currency", filters.currency);
    p.set("businessUnit", filters.businessUnit);
    return p.toString();
  }, [filters]);

  // Initial snapshot
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setStatus("connecting");
      const res = await fetch(`/api/war-room/executive-snapshot?${query}`, { cache: "no-store" });
      const json = (await res.json()) as SnapshotResponse;
      if (cancelled) return;
      setTiles(json.tiles);
      setTickerItems(json.tickerItems);
      setStatus("live");
    };
    run().catch(() => setStatus("offline"));
    return () => {
      cancelled = true;
    };
  }, [query]);

  // Live stream (SSE)
  useEffect(() => {
    setStatus("connecting");
    const es = new EventSource(`/api/war-room/executive-stream?${query}`);
    es.onopen = () => setStatus("live");
    es.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data) as StreamMessage;
        if (msg.type === "tiles") setTiles(msg.tiles);
        if (msg.type === "ticker") {
          setTickerItems((prev) => [msg.item, ...prev].slice(0, 30));
        }
      } catch {
        // ignore
      }
    };
    es.onerror = () => {
      setStatus("offline");
      es.close();
    };
    return () => es.close();
  }, [query]);

  const tileMap = useMemo(() => {
    const m = new Map<TileKey, TileData>();
    tiles.forEach((t) => m.set(t.key, t));
    return m;
  }, [tiles]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800/60 bg-zinc-950/80">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-wide text-zinc-400">Kincaid IQ</div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">Executive War Room</h1>
              <div className="mt-1 text-sm text-zinc-400">
                Evidence Receipts on every KPI. <span className="text-zinc-200">Verified</span> or it&apos;s not real.
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                Status:{" "}
                <span className={status === "live" ? "text-emerald-400" : status === "connecting" ? "text-amber-400" : "text-rose-400"}>
                  {status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <ExecutiveFiltersBar value={filters} onChange={setFilters} />
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <ExecutiveFiltersBar value={filters} onChange={setFilters} />
          </div>
        </div>
      </header>

      <ExecutiveTicker items={tickerItems} />

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ExecutiveKPITile data={tileMap.get("cashflow")} />
          <ExecutiveKPITile data={tileMap.get("recoverableEbitda")} />
          <ExecutiveKPITile data={tileMap.get("healthIQ")} />
          <ExecutiveKPITile data={tileMap.get("execution")} />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-5">
          <div className="text-xs text-zinc-400">Operating cadence</div>
          <div className="mt-2 text-sm text-zinc-200">
            Detect → Prove → Act → Realize. This War Room is designed to run weekly exec rhythm and board updates with audit-grade defensibility.
          </div>
        </div>
      </main>
    </div>
  );
}