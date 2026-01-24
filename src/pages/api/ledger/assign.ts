import type { NextApiRequest, NextApiResponse } from "next";
import { assign } from "@/lib/warroom/redisStore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { eventId, owner } = req.body;
    if (!eventId || !owner) {
      return res.status(400).json({ error: "eventId and owner required" });
    }

    const updated = await assign(eventId, owner);
    return res.status(200).json({ ok: true, event: updated });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}