import type { NextApiRequest, NextApiResponse } from "next";
import { closePacket } from "@/lib/warroom/redisStore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { eventId, actor, role } = req.body;

    if (!eventId || !actor || !role) {
      return res.status(400).json({ ok: false, error: "eventId, actor, role required" });
    }

    const event = await closePacket(String(eventId), String(actor), String(role));
    return res.json({ ok: true, event });
  } catch (e: any) {
    const status = e.policyReasons ? 400 : 500;
    return res.status(status).json({
      ok: false,
      error: e.message,
      policyReasons: e.policyReasons || undefined,
    });
  }
}