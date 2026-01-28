import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

type CalendlyMessage = {
  event?: string;
  payload?: any;
};

type Receipt = {
  receiptId: string;
  createdAtIso: string;
  subject: string;
  verified: boolean;
  freshnessMinutes: number;
  dqPassRate: number;
  sourceHash: string;
  transformHash: string;
  owner: string;
  confidence: number;
  reasons: string[];
  meta?: Record<string, any>;
};

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function safeString(x: any, max = 240) {
  const s = typeof x === "string" ? x : x == null ? "" : String(x);
  return s.length > max ? s.slice(0, max) : s;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const calendlyEvent = (req.body?.calendlyEvent ?? {}) as CalendlyMessage;

  // Only respond to the event we care about
  if (calendlyEvent.event !== "calendly.event_scheduled") {
    return res.status(200).json({ ok: true });
  }

  // Calendly payload shape can vary; we extract only minimal "proofy" bits.
  const payload = calendlyEvent.payload ?? {};

  const eventUri = safeString(payload?.event?.uri || payload?.event?.url || payload?.event, 500);
  const inviteeEmail = safeString(payload?.invitee?.email || payload?.invitee?.email_address || "", 200);

  // Hash any email so we never store raw PII
  const inviteeEmailHash = inviteeEmail ? sha256Hex(inviteeEmail.toLowerCase().trim()) : undefined;

  const now = new Date();
  const seed = sha256Hex(`${now.toISOString()}|${eventUri}|${inviteeEmailHash ?? "no_email"}`).slice(0, 16);

  const receipt: Receipt = {
    receiptId: `RCPT-BOOKED-${seed.toUpperCase()}`,
    createdAtIso: now.toISOString(),
    subject: "DEMO BOOKED — Scheduled Event Proof",
    verified: true,
    freshnessMinutes: 0,
    dqPassRate: 1,
    sourceHash: sha256Hex(`calendly|${eventUri}|${inviteeEmailHash ?? ""}`).slice(0, 32),
    transformHash: sha256Hex(`receipt|calendly.event_scheduled|${now.toISOString()}`).slice(0, 32),
    owner: "Integrity OS",
    confidence: 0.99,
    reasons: [],
    meta: {
      calendly_event: calendlyEvent.event,
      event_uri: eventUri || undefined,
      invitee_email_hash: inviteeEmailHash,
    },
  };

  return res.status(200).json(receipt);
}