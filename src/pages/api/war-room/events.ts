import type { NextApiRequest, NextApiResponse } from "next";
import { computeRankedEvents } from "@/lib/warroom/events/computeRankedEvents";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const limit = req.query.limit ? Number(req.query.limit) : 15;
  const recentWindowMinutes = req.query.recent ? Number(req.query.recent) : 180;
  const priorWindowMinutes = req.query.prior ? Number(req.query.prior) : 1440;

  const events = await computeRankedEvents({
    limit: isFinite(limit) ? limit : 15,
    recentWindowMinutes: isFinite(recentWindowMinutes) ? recentWindowMinutes : 180,
    priorWindowMinutes: isFinite(priorWindowMinutes) ? priorWindowMinutes : 1440,
  });

  return res.status(200).json({
    ok: true,
    generated_at: new Date().toISOString(),
    params: { limit, recentWindowMinutes, priorWindowMinutes },
    events,
  });
}