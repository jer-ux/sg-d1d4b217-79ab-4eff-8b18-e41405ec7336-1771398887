import type { Gate, EventCategory } from "./types";

// 0..100 severity baseline by reason code (you can tune these anytime)
const REASON_SEVERITY: Record<string, number> = {
  EVIDENCE_MISSING: 90,
  HASH_MISMATCH: 95,
  ATTACHMENT_MISSING: 80,
  RECEIPT_GATE_UNVERIFIED: 55,

  SUCCESSION_SINGLE_POINT_FAILURE: 92,
  SUCCESSION_NO_READY_NOW: 75,
  CEO_EMERGENCY_PLAN_STALE: 88,
  LONG_TERM_PLAN_STALE: 70,
  HIPO_FLIGHT_RISK: 78,

  EBITDA_AT_RISK: 85,
  EBITDA_DRAG_SPIKE: 80,

  POLICY_NONCOMPLIANCE: 88,
  CONFIDENTIALITY_BREACH: 96,
};

export function categoryFromReason(reason: string): EventCategory {
  if (reason.startsWith("SUCCESSION_") || reason.includes("CEO_")) return "Succession";
  if (reason.includes("EVIDENCE") || reason.includes("HASH") || reason.includes("ATTACHMENT"))
    return "Governance";
  if (reason.includes("EBITDA")) return "Financial";
  if (reason.includes("HIPO") || reason.includes("TALENT")) return "Talent";
  if (reason.includes("CONFIDENTIALITY") || reason.includes("POLICY")) return "Compliance";
  return "Unknown";
}

// map a set of reason codes -> baseline severity 0..100
export function severityFromReasons(reasons: string[]): { severity: number; why: string[] } {
  if (!reasons?.length) return { severity: 25, why: ["No reason codes; default severity."] };

  const scored = reasons.map((r) => ({
    r,
    s: REASON_SEVERITY[r] ?? 45,
  }));

  // Take max as "headline severity" (strong opinion: execs respond to peak risk)
  const top = scored.sort((a, b) => b.s - a.s)[0];
  const severity = Math.max(0, Math.min(100, top.s));

  const why = [
    `Top reason: ${top.r} (severity ${top.s})`,
    ...(scored.length > 1 ? [`Also present: ${scored.slice(1, 4).map(x => x.r).join(", ")}`] : []),
  ];

  return { severity, why };
}

// velocity: how quickly it's "showing up" recently vs older window
export function velocityFromCounts(args: {
  recentCount: number;
  priorCount: number;
}): { velocity: number; why: string[] } {
  const { recentCount, priorCount } = args;

  // Basic growth ratio, capped
  const denom = Math.max(1, priorCount);
  const ratio = recentCount / denom; // 0..∞

  // Convert ratio to 0..100 using a soft curve
  // ratio 1 => 50, ratio 2 => ~67, ratio 4 => ~80, ratio 8 => ~89
  const velocity = Math.max(
    0,
    Math.min(100, Math.round((Math.atan(ratio - 1) / (Math.PI / 2)) * 50 + 50))
  );

  const why = [
    `Recent signals: ${recentCount}`,
    `Prior window: ${priorCount}`,
    `Growth ratio: ${ratio.toFixed(2)}`,
  ];

  return { velocity, why };
}

export function confidenceMultiplier(gate: Gate, score01: number): { mult: number; why: string[] } {
  const s = Math.max(0, Math.min(1, score01));

  // Unverified evidence should dampen ranking hard
  const gateMult = gate === "VERIFIED" ? 1.0 : 0.65;

  // Soft confidence adjustment
  const scoreMult = 0.6 + 0.4 * s; // 0.6..1.0

  return {
    mult: gateMult * scoreMult,
    why: [
      `Gate: ${gate} (x${gateMult.toFixed(2)})`,
      `Confidence: ${s.toFixed(2)} (x${scoreMult.toFixed(2)})`,
    ],
  };
}

// Final score composition (0..100)
export function rankScore(args: {
  severity: number;   // 0..100
  velocity: number;   // 0..100
  gate: Gate;
  confidence: number; // 0..1
}): { score: number; why: string[] } {
  const { severity, velocity, gate, confidence } = args;

  // Exec weighting: severity dominates, then velocity, then confidence
  const base = 0.62 * severity + 0.28 * velocity + 0.10 * (confidence * 100);

  const cm = confidenceMultiplier(gate, confidence);
  const score = Math.max(0, Math.min(100, Math.round(base * cm.mult)));

  return {
    score,
    why: [
      `Base score: ${Math.round(base)}`,
      ...cm.why,
      `Final rank score: ${score}`,
    ],
  };
}