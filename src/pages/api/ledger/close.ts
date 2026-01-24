import type { NextApiRequest, NextApiResponse } from "next";
import { close } from "@/lib/warroom/redisStore";
import { canClose } from "@/lib/warroom/policy";
import { getRedis } from "@/lib/warroom/redis";
import type { WarEvent } from "@/lib/warroom/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ error: "eventId required" });
    }

    // Fetch event to check policy
    const redis = getRedis();
    const raw = await redis.get(`kiq:warroom:event:${eventId}`);
    if (!raw) {
      return res.status(404).json({ error: "Event not found" });
    }

    const event = JSON.parse(raw) as WarEvent;
    const decision = canClose(event);

    if (!decision.ok) {
      return res.status(400).json({
        ok: false,
        error: "Policy check failed",
        reasons: decision.reasons,
      });
    }

    const updated = await close(eventId);
    return res.status(200).json({ ok: true, event: updated });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}