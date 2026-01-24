import type { NextApiRequest, NextApiResponse } from "next";
import { enforce } from "@/lib/auth/enforce";
import { listEventIds, readEventsByIds } from "@/lib/warroom/listEvents";
import type { LaneKey, WarEvent } from "@/lib/warroom/types";
import { getRedis } from "@/lib/warroom/redis";

export const config = {
  runtime: "nodejs",
};

const MAX_BATCH = 15;
const EVENT_KEY = (id: string) => `kiq:warroom:event:${id}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const gate = await enforce("operator", req);
  if (!gate.ok) {
    return res.status(gate.status).json({ ok: false, error: gate.error });
  }

  try {
    const { lane, max = MAX_BATCH, title = "Auto-generated receipt (macro)" } = req.body ?? {};
    const targetLane = (lane ?? "value") as LaneKey;
    const take = Math.min(Number(max) || MAX_BATCH, MAX_BATCH);

    const ids = await listEventIds(500);
    const events = (await readEventsByIds(ids)) as WarEvent[];

    // Sort by absolute amount (highest value first) and take top N
    const ranked = events
      .filter((e) => e.lane === targetLane)
      .sort((a, b) => Math.abs(b.amount ?? 0) - Math.abs(a.amount ?? 0))
      .slice(0, take);

    const redis = getRedis();
    const results: Array<{ eventId: string; ok: boolean; error?: string }> = [];

    for (const e of ranked) {
      try {
        // Generate minimal receipt stub
        const receipt = {
          id: `rcpt-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
          title,
          hash: `macro:${e.id}:${Date.now()}`,
          freshness: "macro",
          url: null,
          createdAt: new Date().toISOString(),
        };

        const next = {
          ...e,
          receipts: [receipt, ...(e.receipts ?? [])],
          updatedAt: new Date().toISOString(),
        };

        await redis.set(EVENT_KEY(e.id), JSON.stringify(next));

        results.push({ eventId: e.id, ok: true });
      } catch (err: any) {
        results.push({ eventId: e.id, ok: false, error: err?.message ?? "Failed" });
      }
    }

    const okCount = results.filter((r) => r.ok).length;
    const failCount = results.length - okCount;

    return res.status(200).json({
      ok: true,
      data: {
        lane: targetLane,
        attempted: results.length,
        okCount,
        failCount,
        results,
      },
    });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}