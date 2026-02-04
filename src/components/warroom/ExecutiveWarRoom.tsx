import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { Filters, TileData, TileKey } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { KPITile } from "./tiles/KPITile";
import { ExecutiveEventStream } from "./ExecutiveEventStream";
import { useExecutiveStream } from "./useExecutiveStream";
import { ExecutiveKPIDrawer } from "./ExecutiveKPIDrawer";
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
  const [selectedDashboard, setSelectedDashboard] = useState<string>("executive-war-room");
  const [selectedTile, setSelectedTile] = useState<TileData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set("org", filters.org);
    p.set("period", filters.period);
    p.set("currency", filters.currency);
    p.set("businessUnit", filters.businessUnit);
    return p.toString();
  }, [filters]);

  const { status, tiles, tickerItems, events } = useExecutiveStream(query);

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

  const handleTileClick = (tile: TileData) => {
    setSelectedTile(tile);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTile(null);
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
                {" • "}
                <span className="text-zinc-400">{events.length} live events</span>
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
            <KPITile data={tileMap.get("costTrendStress")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("contractLeakage")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("contractCompliance")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("contractAmbiguity")} onClick={handleTileClick} />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-semibold text-zinc-100">Strategic Plan Design & Risk Mitigation</h2>
            <div className="text-xs text-zinc-500">McKinsey Framework</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("planDesignAdoption")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("pharmacyExposure")} onClick={handleTileClick} />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-semibold text-zinc-100">Experience & Loyalty Metrics</h2>
            <div className="text-xs text-zinc-500">Bain Net Promoter System</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("benefitsNPS")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("employeeNPS")} onClick={handleTileClick} />
          </div>
        </section>

        <section className="mb-8">
          <ExecutiveEventStream events={events} />
        </section>
      </main>

      {selectedTile && (
        <ExecutiveKPIDrawer
          tile={selectedTile}
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}