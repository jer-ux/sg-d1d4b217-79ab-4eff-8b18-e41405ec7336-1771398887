import type { NextApiRequest, NextApiResponse } from "next";
import { close } from "@/lib/warroom/redisStore";
import { getRedis } from "@/lib/warroom/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { eventId, actor } = req.body;
    if (!eventId) {
      return res.status(400).json({ error: "eventId required" });
    }

    // Fetch event for policy check
    const raw = await getRedis().get(`kiq:warroom:event:${eventId}`);
    if (!raw) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    const updated = await close(eventId, actor);
    return res.status(200).json({ ok: true, event: updated });
  } catch (e: any) {
    // Check if it's a policy error
    if (e.message === "Policy check failed" && e.policyReasons) {
      return res.status(400).json({ 
        ok: false, 
        error: "Policy check failed", 
        reasons: e.policyReasons 
      });
    }
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}