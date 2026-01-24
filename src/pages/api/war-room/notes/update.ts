import type { NextApiRequest, NextApiResponse } from "next";
import { getRedis } from "@/lib/warroom/redis";
import { auditFromEvent } from "@/lib/warroom/audit";

export const dynamic = "force-dynamic";

const EVENT_KEY = (id: string) => `kiq:warroom:event:${id}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const redis = getRedis();
  const { eventId, notes } = req.body;

  if (!eventId) {
    return res.status(400).json({ ok: false, error: "eventId required" });
  }

  const rawEvent = await redis.get(EVENT_KEY(eventId));
  if (!rawEvent) {
    return res.status(404).json({ ok: false, error: "Event not found" });
  }

  const event = JSON.parse(rawEvent);
  const updated = {
    ...event,
    notes: notes ?? event.notes,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(EVENT_KEY(eventId), JSON.stringify(updated));

  await auditFromEvent({
    action: "RECEIPT_ATTACH",
    event: updated,
    actor: req.body.actor ?? "system",
    policyOk: true,
    meta: { notesUpdated: true },
  });

  return res.json({ ok: true, event: updated });
}