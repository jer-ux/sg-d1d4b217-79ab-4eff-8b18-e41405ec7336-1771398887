import type { NextApiRequest, NextApiResponse } from "next";
import { attachReceipt } from "@/lib/warroom/redisStore";
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

    const { eventId, title } = req.body;
    const receipt = {
      id: `rec-${Date.now()}`,
      title: String(title),
      hash: `hash-${Math.random().toString(16).slice(2)}`,
    };

    const event = await attachReceipt(String(eventId), receipt, auth.user.email);
    return res.json({ ok: true, event, receipt });
  } catch (e: any) {
    return res.status(400).json({ ok: false, error: e.message });
  }
}