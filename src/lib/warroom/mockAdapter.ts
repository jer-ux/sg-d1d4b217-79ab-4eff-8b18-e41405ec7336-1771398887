import { WarRoomSummarySchema, type WarRoomSummary, type WarRoomLaneId, type LaneData, type TickerItem } from "./types";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(s: string) {
  let out = 0;
  for (let i = 0; i < s.length; i++) out = (out + s.charCodeAt(i) * (i + 1)) >>> 0;
  return out + 1337;
}

function hex32(rng: () => number) {
  const chars = "abcdef0123456789";
  let out = "";
  for (let i = 0; i < 32; i++) out += chars[Math.floor(rng() * chars.length)];
  return out;
}

function money(n: number) {
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(n);
  return `${sign}$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function pct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

function mkReceipt(rng: () => number, owner: string) {
  const freshnessMinutes = Math.floor(rng() * 180); // 0..179
  const dqPassRate = 0.78 + rng() * 0.22; // 0.78..1.0
  const confidence = 0.84 + rng() * 0.15;

  // simple "integrity gate" prelude (we'll formalize globally next step)
  const reasons: string[] = [];
  if (freshnessMinutes > 120) reasons.push("Stale pipeline: freshness > 120m");
  if (dqPassRate < 0.9) reasons.push("DQ pass rate < 90%");

  const verified = reasons.length === 0;

  return {
    receiptId: `RCPT-${Math.floor(100000 + rng() * 900000)}`,
    verified,
    freshnessMinutes,
    dqPassRate,
    sourceHash: hex32(rng),
    transformHash: hex32(rng),
    owner,
    confidence,
    reasons,
  };
}

function laneMeta(lane: WarRoomLaneId) {
  switch (lane) {
    case "ebitda":
      return { title: "EBITDA Recovery", subtitle: "Verified arbitrage + realized value" };
    case "ar":
      return { title: "AR & Cash Velocity", subtitle: "Aging, denials, collections" };
    case "claims":
      return { title: "Claims Integrity", subtitle: "Eligibility, COB, pricing variance" };
    case "workforce":
      return { title: "Workforce Efficiency", subtitle: "Throughput, cycle time, utilization" };
  }
}

function buildLane(rng: () => number, lane: WarRoomLaneId): LaneData {
  const { title, subtitle } = laneMeta(lane);
  const owner = lane === "claims" ? "Data Governance" : lane === "ar" ? "RevCycle Ops" : "Finance Ops";

  if (lane === "ebitda") {
    const rec = 1_100_000 + rng() * 3_800_000;
    const events = Math.floor(18 + rng() * 62);
    const realization = 0.58 + rng() * 0.32;

    const primaryKpi = {
      label: "Recoverable EBITDA",
      value: money(rec),
      trend: `↑ ${(0.8 + rng() * 3.2).toFixed(1)}%`,
      receipt: mkReceipt(rng, owner),
    };

    const secondaryKpis = [
      { label: "Verified Events", value: `${events}`, receipt: mkReceipt(rng, owner) },
      { label: "Realization Rate", value: pct(realization), receipt: mkReceipt(rng, owner) },
      { label: "Avg Time-to-Close", value: `${Math.floor(9 + rng() * 21)} days`, receipt: mkReceipt(rng, owner) },
    ];

    return { lane, title, subtitle, primaryKpi, secondaryKpis };
  }

  if (lane === "ar") {
    const dso = 33 + rng() * 22;
    const ar90 = 0.06 + rng() * 0.24;
    const denial = 0.04 + rng() * 0.08;

    const primaryKpi = {
      label: "DSO",
      value: dso.toFixed(1),
      trend: `↓ ${(0.4 + rng() * 2.1).toFixed(1)} days`,
      receipt: mkReceipt(rng, owner),
    };

    const secondaryKpis = [
      { label: "% AR > 90 Days", value: pct(ar90), receipt: mkReceipt(rng, owner) },
      { label: "Denial Rate", value: pct(denial), receipt: mkReceipt(rng, owner) },
      { label: "POS Cash %", value: pct(0.012 + rng() * 0.028), receipt: mkReceipt(rng, owner) },
    ];

    return { lane, title, subtitle, primaryKpi, secondaryKpis };
  }

  if (lane === "claims") {
    const leakage = 900_000 + rng() * 3_200_000;
    const cob = Math.floor(60 + rng() * 280);
    const elig = Math.floor(20 + rng() * 180);

    const primaryKpi = {
      label: "Leakage (Modeled)",
      value: money(leakage),
      trend: `↓ ${(0.6 + rng() * 2.7).toFixed(1)}%`,
      receipt: mkReceipt(rng, owner),
    };

    const secondaryKpis = [
      { label: "COB Issues", value: `${cob}`, receipt: mkReceipt(rng, owner) },
      { label: "Eligibility Errors", value: `${elig}`, receipt: mkReceipt(rng, owner) },
      { label: "Pricing Variance", value: pct(0.012 + rng() * 0.038), receipt: mkReceipt(rng, owner) },
    ];

    return { lane, title, subtitle, primaryKpi, secondaryKpis };
  }

  // workforce
  const fte = 2.2 + rng() * 2.0;
  const cycle = Math.floor(2 + rng() * 9);
  const throughput = Math.floor(160 + rng() * 520);

  const primaryKpi = {
    label: "FTE / 1k Accounts",
    value: fte.toFixed(2),
    trend: `↓ ${(0.3 + rng() * 2.1).toFixed(1)}%`,
    receipt: mkReceipt(rng, "Workforce Ops"),
  };

  const secondaryKpis = [
    { label: "Cycle Time", value: `${cycle} days`, receipt: mkReceipt(rng, "Workforce Ops") },
    { label: "Throughput", value: `${throughput}/wk`, receipt: mkReceipt(rng, "Workforce Ops") },
    { label: "Overtime %", value: pct(0.015 + rng() * 0.08), receipt: mkReceipt(rng, "Workforce Ops") },
  ];

  return { lane, title, subtitle, primaryKpi, secondaryKpis };
}

export const mockWarRoomAdapter = {
  async getSummary(): Promise<WarRoomSummary> {
    const now = new Date();
    const seed = seedFromString(now.toISOString().slice(0, 10)); // stable per day
    const rng = mulberry32(seed);

    const lanes: WarRoomLaneId[] = ["ebitda", "ar", "claims", "workforce"];
    const laneSummaries: LaneData[] = lanes.map((lane) => buildLane(mulberry32(seedFromString(lane) + seed), lane));

    const ticker: TickerItem[] = [
      { id: "t1", text: `EBITDA: ${money(1_200_000 + rng() * 3_200_000)} verified recovery pipeline`, tone: "good" },
      { id: "t2", text: `AR: ${(6 + rng() * 18).toFixed(1)}% >90 days (payer mix drag detected)`, tone: "warn" },
      { id: "t3", text: `Claims: ${Math.floor(40 + rng() * 180)} eligibility discrepancies staged`, tone: "neutral" },
      { id: "t4", text: `Workforce: cycle time improved ${(2 + rng() * 6).toFixed(1)}% WoW`, tone: "good" },
    ];

    const asOfIso: string = now.toISOString();

    // Construct with explicit types to satisfy TypeScript
    const result: WarRoomSummary = {
      asOfIso,
      ticker,
      lanes: laneSummaries,
    };

    // Zod gate: if mocks drift, you find out immediately
    return WarRoomSummarySchema.parse(result);
  },
};