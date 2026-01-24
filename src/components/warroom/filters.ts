import type { LaneKey, LedgerState, WarEvent } from "@/lib/warroom/types";

export type SortKey = "score" | "amount" | "updated" | "confidence";

export type WarRoomFilters = {
  lanes: Set<LaneKey>;
  states: Set<LedgerState>;
  q: string;
  minConfidence: number;
  sortBy: SortKey;
  descending: boolean;
};

export function defaultFilters(): WarRoomFilters {
  return {
    lanes: new Set<LaneKey>(["value", "controls", "agentic", "marketplace"]),
    states: new Set<LedgerState>(["IDENTIFIED", "APPROVED", "REALIZED", "AT_RISK"]),
    q: "",
    minConfidence: 0,
    sortBy: "score",
    descending: true,
  };
}

export function score(e: WarEvent) {
  return e.amount * e.confidence * e.timeSensitivity;
}

export function applyFilters(events: WarEvent[], f: WarRoomFilters) {
  const q = f.q.trim().toLowerCase();

  const filtered = events.filter((e) => {
    if (!f.lanes.has(e.lane)) return false;
    if (!f.states.has(e.state)) return false;
    if (e.confidence < f.minConfidence) return false;

    if (q) {
      const hay = `${e.title} ${e.subtitle ?? ""} ${e.owner ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const dir = f.descending ? -1 : 1;

    if (f.sortBy === "score") return dir * (score(b) - score(a));
    if (f.sortBy === "amount") return dir * (a.amount - b.amount);
    if (f.sortBy === "confidence") return dir * (a.confidence - b.confidence);
    if (f.sortBy === "updated") {
      const ta = new Date(a.updatedAt).getTime();
      const tb = new Date(b.updatedAt).getTime();
      return dir * (ta - tb);
    }
    return 0;
  });

  return sorted;
}

export function formatMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}