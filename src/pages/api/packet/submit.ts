import type { NextApiRequest, NextApiResponse } from "next";
import { submitPacket } from "@/lib/warroom/redisStore";
import { enforce } from "@/lib/auth/enforce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    // Enforce operator role or higher
    const auth = await enforce("operator", req as any);
    if (!auth.ok) {
      return res.status((auth as any).status).json({ ok: false, error: (auth as any).error });
    }

    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ ok: false, error: "eventId required" });
    }

    // Use authenticated user info for audit trail
    const event = await submitPacket(
      String(eventId),
      auth.user.email,
      auth.user.role
    );

    return res.json({ ok: true, event });
  } catch (e: any) {
    return res.status(400).json({
      ok: false,
      error: e.message,
      policyReasons: e.policyReasons || undefined,
    });
  }
}