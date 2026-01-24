import type { NextApiRequest, NextApiResponse } from "next";
import { attachReceipt } from "@/lib/warroom/redisStore";

function fakeHash() {
  return "0x" + Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { eventId, title, actor } = req.body;
    if (!eventId) {
      return res.status(400).json({ error: "eventId required" });
    }

    const receipt = { 
      id: `rcpt-${Date.now()}`, 
      title: title ?? "Generated evidence receipt", 
      hash: fakeHash(),
      freshness: new Date().toISOString()
    };
    
    const event = await attachReceipt(eventId, receipt, actor);

    return res.status(200).json({ ok: true, event, receipt });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}