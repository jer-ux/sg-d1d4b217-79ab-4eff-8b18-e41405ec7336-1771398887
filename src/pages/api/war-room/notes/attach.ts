import type { NextApiRequest, NextApiResponse } from "next";
import { attachFile } from "@/lib/warroom/redisStore";
import { enforce } from "@/lib/auth/enforce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const auth = await enforce("operator", req as any);
    if (!auth.ok) {
      return res.status(auth.status).json({ ok: false, error: auth.error });
    }

    const { eventId, attachment } = req.body;
    if (!eventId || !attachment || !attachment.title || !attachment.url) {
      return res.status(400).json({ 
        ok: false, 
        error: "eventId and attachment (with title, url) required" 
      });
    }

    const result = await attachFile(String(eventId), attachment, auth.user.email);
    return res.json({ ok: true, event: result.event, attachment: result.attachment });
  } catch (e: any) {
    return res.status(400).json({ ok: false, error: e.message });
  }
}