import type { NextApiRequest, NextApiResponse } from "next";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hex32(rng: () => number) {
  const chars = "abcdef0123456789";
  let out = "";
  for (let i = 0; i < 32; i++) out += chars[Math.floor(rng() * chars.length)];
  return out;
}

export type DemoReceipt = {
  receiptId: string;
  createdAtIso: string;
  subject: string;
  verified: boolean;
  freshnessMinutes: number;
  dqPassRate: number;
  sourceHash: string;
  transformHash: string;
  owner: string;
  confidence: number;
  reasons: string[];
  meta?: {
    name?: string;
    email?: string;
    company?: string;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, company } = (req.body ?? {}) as { name?: string; email?: string; company?: string };

  const seed = Date.now() ^ (email?.length ?? 17) ^ (company?.length ?? 23);
  const rng = mulberry32(seed);

  const freshnessMinutes = Math.floor(rng() * 45);
  const dqPassRate = 0.94 + rng() * 0.06;
  const confidence = 0.9 + rng() * 0.09;

  const reasons: string[] = [];
  const verified = reasons.length === 0;

  const receipt: DemoReceipt = {
    receiptId: `RCPT-DEMO-${Math.floor(100000 + rng() * 900000)}`,
    createdAtIso: new Date().toISOString(),
    subject: "DEMO ACCESS — Private Terminal Invite",
    verified,
    freshnessMinutes,
    dqPassRate,
    sourceHash: hex32(rng),
    transformHash: hex32(rng),
    owner: "Integrity OS",
    confidence,
    reasons,
    meta: {
      name: name?.trim() || undefined,
      email: email?.trim() || undefined,
      company: company?.trim() || undefined,
    },
  };

  res.status(200).json(receipt);
}