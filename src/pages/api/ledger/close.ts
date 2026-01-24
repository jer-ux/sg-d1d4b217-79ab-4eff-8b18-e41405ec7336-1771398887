import type { NextApiRequest, NextApiResponse } from "next";
import { close } from "@/lib/warroom/redisStore";
import { enforce } from "@/lib/auth/enforce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const auth = await enforce("approver", req as any);
    if (!auth.ok) {
      return res.status((auth as any).status).json({ ok: false, error: (auth as any).error });
    }

    const { eventId } = req.body;
    const event = await close(String(eventId), auth.user.email);
    return res.json({ ok: true, event });
  } catch (e: any) {
    const reasons = (e as any).policyReasons;
    return res.status(400).json({
      ok: false,
      error: e.message,
      policyReasons: reasons,
    });
  }
}