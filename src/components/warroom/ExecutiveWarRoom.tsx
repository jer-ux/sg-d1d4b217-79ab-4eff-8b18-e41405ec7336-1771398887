import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ChevronDown } from "lucide-react";
import type { Filters, Period, SnapshotResponse, TileData, TileKey, StreamMessage } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { KPITile } from "./tiles/KPITile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_FILTERS: Filters = {
  org: "Portfolio",
  period: "MTD",
  currency: "USD",
  businessUnit: "All",
};

export function ExecutiveWarRoom() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const [status, setStatus] = useState<"connecting" | "live" | "offline">("connecting");
  const [selectedDashboard, setSelectedDashboard] = useState<string>("executive-war-room");

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set("org", filters.org);
    p.set("period", filters.period);
    p.set("currency", filters.currency);
    p.set("businessUnit", filters.businessUnit);
    return p.toString();
  }, [filters]);

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

  const handleDashboardChange = (value: string) => {
    setSelectedDashboard(value);
    if (value === "kincaid-iq") {
      router.push("/war-room");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800/60 bg-zinc-950/80">
        <div className="mx-auto max-w-[1600px] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="text-xs tracking-wide text-zinc-400">Kincaid IQ</div>
                <Select value={selectedDashboard} onValueChange={handleDashboardChange}>
                  <SelectTrigger className="w-[280px] border-zinc-700 bg-zinc-900/60 text-zinc-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700 bg-zinc-900">
                    <SelectItem value="kincaid-iq" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                      Kincaid IQ War Room
                    </SelectItem>
                    <SelectItem value="executive-war-room" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                      Executive War Room (CFO Dashboard)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">CFO Healthcare Dashboard</h1>
              <div className="mt-1 text-sm text-zinc-400">
                McKinsey + Bain KPIs with Evidence Receipts. <span className="text-zinc-200">Verified</span> or it&apos;s not real.
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

      <main className="mx-auto max-w-[1600px] px-6 py-6">
        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-semibold text-zinc-100">Financial Risk & EBITDA Protection</h2>
            <div className="text-xs text-zinc-500">McKinsey Framework</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <KPITile data={tileMap.get("costTrendStress")} />
            <KPITile data={tileMap.get("contractLeakage")} />
            <KPITile data={tileMap.get("contractCompliance")} />
            <KPITile data={tileMap.get("contractAmbiguity")} />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-semibold text-zinc-100">Strategic Plan Design & Risk Mitigation</h2>
            <div className="text-xs text-zinc-500">McKinsey Framework</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("planDesignAdoption")} />
            <KPITile data={tileMap.get("pharmacyExposure")} />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-semibold text-zinc-100">Experience & Loyalty Metrics</h2>
            <div className="text-xs text-zinc-500">Bain Net Promoter System</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("benefitsNPS")} />
            <KPITile data={tileMap.get("employeeNPS")} />
          </div>
        </section>

        <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-950/60 to-zinc-900/40 p-6">
          <div className="text-xs font-medium tracking-wide text-zinc-400">OPERATING CADENCE</div>
          <div className="mt-3 text-sm leading-relaxed text-zinc-200">
            <strong className="text-zinc-100">Detect → Prove → Act → Realize.</strong> This CFO Dashboard combines McKinsey's healthcare cost management framework with Bain's Net Promoter System to deliver audit-grade defensibility for weekly exec rhythm and board updates.
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-4">
              <div className="text-xs font-medium text-emerald-400">McKinsey Framework</div>
              <div className="mt-2 text-xs text-zinc-300">
                Cost trend stress, contract value leakage, pharmacy reimbursement exposure, compliance tracking, and innovative plan design adoption.
              </div>
            </div>
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-4">
              <div className="text-xs font-medium text-blue-400">Bain Net Promoter</div>
              <div className="mt-2 text-xs text-zinc-300">
                Benefits NPS and eNPS metrics position loyalty and experience as leading indicators of adoption, retention, and program success.
              </div>
            </div>
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-4">
              <div className="text-xs font-medium text-violet-400">Evidence Receipts</div>
              <div className="mt-2 text-xs text-zinc-300">
                Every KPI backed by cryptographic proof, DQ validation, source lineage, and confidence scoring. Verified or it's not real.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}