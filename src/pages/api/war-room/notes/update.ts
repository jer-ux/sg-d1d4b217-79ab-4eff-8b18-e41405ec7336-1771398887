import type { NextApiRequest, NextApiResponse } from "next";
import { updateNotes } from "@/lib/warroom/redisStore";
import { enforce } from "@/lib/auth/enforce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const auth = await enforce("operator", req as any);
    if (!auth.ok) {
      return res.status((auth as any).status).json({ ok: false, error: (auth as any).error });
    }

    const { eventId, notes } = req.body;
    if (!eventId || !notes) {
      return res.status(400).json({ ok: false, error: "eventId and notes required" });
    }

    const updated = await updateNotes(String(eventId), notes, auth.user.email);
    return res.json({ ok: true, event: updated });
  } catch (e: any) {
    return res.status(400).json({ ok: false, error: e.message });
  }
}