import type { NextApiRequest, NextApiResponse } from "next";
import { enforce } from "@/lib/auth/enforce";
import { listEventIds, readEventsByIds } from "@/lib/warroom/listEvents";
import type { LaneKey, WarEvent } from "@/lib/warroom/types";
import { submitPacket } from "@/lib/warroom/redisStore";

const MAX_BATCH = 50;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const auth = await enforce("operator", req as any);
    if (!auth.ok) {
      return res.status((auth as any).status ?? 401).json({ ok: false, error: (auth as any).error });
    }

    const { lane, max = MAX_BATCH } = req.body;
    const targetLane = (lane ?? "value") as LaneKey;
    const take = Math.min(Number(max) || MAX_BATCH, MAX_BATCH);

    const ids = await listEventIds(500);
    const events = (await readEventsByIds(ids)) as WarEvent[];

    const drafts = events
      .filter((e) => e.lane === targetLane)
      .filter((e) => (e.packetStatus ?? "DRAFT") === "DRAFT")
      .slice(0, take);

    const actor = auth.user.sub;
    const role = auth.user.role;

    const results: Array<{ eventId: string; ok: boolean; error?: string; policyReasons?: string[] }> = [];

    for (const e of drafts) {
      try {
        await submitPacket(e.id, actor, role);
        results.push({ eventId: e.id, ok: true });
      } catch (err: any) {
        results.push({
          eventId: e.id,
          ok: false,
          error: err?.message ?? "Failed",
          policyReasons: err?.policyReasons,
        });
      }
    }

    const okCount = results.filter((r) => r.ok).length;
    const failCount = results.length - okCount;

    return res.status(200).json({
      ok: true,
      lane: targetLane,
      attempted: results.length,
      okCount,
      failCount,
      results,
    });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}