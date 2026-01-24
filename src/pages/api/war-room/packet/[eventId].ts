import type { NextApiRequest, NextApiResponse } from "next";
import { getRedis } from "@/lib/warroom/redis";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const dynamic = "force-dynamic";

const EVENT_KEY = (id: string) => `kiq:warroom:event:${id}`;
const EVENT_AUDIT_LIST = (eventId: string) => `kiq:audit:event:${eventId}`;

function safe(s: any) {
  return String(s ?? "");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const redis = getRedis();
  const eventId = req.query.eventId as string;

  const rawEvent = await redis.get(EVENT_KEY(eventId));
  if (!rawEvent) {
    return res.status(404).json({ ok: false, error: "Event not found" });
  }
  const event = JSON.parse(rawEvent);

  const auditRaw = await redis.lrange(EVENT_AUDIT_LIST(eventId), 0, 40);
  const audit = auditRaw.map((x) => JSON.parse(x));

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = 760;
  const left = 48;

  const drawH = (t: string) => {
    page.drawText(t, { x: left, y, size: 16, font: bold, color: rgb(1, 1, 1) });
    y -= 24;
  };

  const drawLabel = (k: string, v: string) => {
    page.drawText(k, { x: left, y, size: 10, font: bold, color: rgb(0.85, 0.85, 0.85) });
    page.drawText(v, { x: left + 140, y, size: 10, font, color: rgb(0.92, 0.92, 0.92) });
    y -= 14;
  };

  const drawPara = (t: string) => {
    const max = 92;
    const words = t.split(" ");
    let line = "";
    for (const w of words) {
      if ((line + " " + w).trim().length > max) {
        page.drawText(line, { x: left, y, size: 10, font, color: rgb(0.9, 0.9, 0.9) });
        y -= 14;
        line = w;
      } else {
        line = (line + " " + w).trim();
      }
    }
    if (line) {
      page.drawText(line, { x: left, y, size: 10, font, color: rgb(0.9, 0.9, 0.9) });
      y -= 16;
    }
  };

  page.drawRectangle({ x: 0, y: 0, width: 612, height: 792, color: rgb(0.06, 0.06, 0.07) });

  drawH("Kincaid IQ — Action Packet");
  page.drawText("Evidence-first decision record", { x: left, y, size: 11, font, color: rgb(0.7, 0.7, 0.7) });
  y -= 24;

  drawLabel("Event ID", safe(event.id));
  drawLabel("Lane", safe(event.lane));
  drawLabel("State", safe(event.state));
  drawLabel("Owner", safe(event.owner || "Unassigned"));
  drawLabel("Amount", `$${(event.amount / 100).toLocaleString()}`);
  drawLabel("Confidence", safe(Math.round((event.confidence ?? 0) * 100)) + "%");
  drawLabel("Updated", safe(event.updatedAt));
  y -= 10;

  page.drawLine({ start: { x: left, y }, end: { x: 564, y }, thickness: 1, color: rgb(0.2, 0.2, 0.22) });
  y -= 18;

  page.drawText("Event Summary", { x: left, y, size: 12, font: bold, color: rgb(0.95, 0.95, 0.95) });
  y -= 16;
  drawPara(safe(event.title));
  if (event.subtitle) drawPara(safe(event.subtitle));
  y -= 8;

  page.drawText("Evidence Receipts", { x: left, y, size: 12, font: bold, color: rgb(0.95, 0.95, 0.95) });
  y -= 16;

  const receipts = event.receipts ?? [];
  if (!receipts.length) {
    drawPara("No receipts attached.");
  } else {
    for (const r of receipts.slice(0, 10)) {
      page.drawText(`• ${safe(r.title)}${r.hash ? ` (hash ${safe(r.hash)})` : ""}`, {
        x: left,
        y,
        size: 10,
        font,
        color: rgb(0.9, 0.9, 0.9),
      });
      y -= 14;
      if (y < 120) break;
    }
  }

  y -= 10;
  page.drawLine({ start: { x: left, y }, end: { x: 564, y }, thickness: 1, color: rgb(0.2, 0.2, 0.22) });
  y -= 18;

  const notes = event.notes;

  page.drawText("Decision Notes", { x: left, y, size: 12, font: bold, color: rgb(0.95, 0.95, 0.95) });
  y -= 16;

  const noteText = String(notes?.notes ?? "").trim();
  drawPara(noteText ? noteText : "No decision notes recorded.");
  y -= 8;

  page.drawText("Attachments", { x: left, y, size: 12, font: bold, color: rgb(0.95, 0.95, 0.95) });
  y -= 16;

  const atts = notes?.attachments ?? [];
  if (!atts.length) {
    drawPara("No attachments recorded.");
  } else {
    for (const a of atts.slice(0, 10)) {
      const line = `• ${safe(a.title)} — ${safe(a.url)}${a.hash ? ` (hash ${safe(a.hash)})` : ""}`;
      drawPara(line);
      if (y < 90) break;
    }
  }

  y -= 10;
  page.drawLine({ start: { x: left, y }, end: { x: 564, y }, thickness: 1, color: rgb(0.2, 0.2, 0.22) });
  y -= 18;

  page.drawText("Audit Trail (latest)", { x: left, y, size: 12, font: bold, color: rgb(0.95, 0.95, 0.95) });
  y -= 16;

  if (!audit.length) {
    drawPara("No audit entries found.");
  } else {
    for (const a of audit.slice(0, 18)) {
      const line = `${safe(a.at)} • ${safe(a.action)} • ${safe(a.actor || "system")} • ${safe(
        a.policyOk === false ? "BLOCKED" : "OK"
      )}`;
      page.drawText(`• ${line}`, { x: left, y, size: 9, font, color: rgb(0.85, 0.85, 0.85) });
      y -= 12;
      if (a.sig) {
        page.drawText(`  sig: ${safe(a.sig).slice(0, 48)}…`, {
          x: left,
          y,
          size: 8,
          font,
          color: rgb(0.65, 0.65, 0.65),
        });
        y -= 11;
      }
      if (y < 60) break;
    }
  }

  y -= 10;
  page.drawLine({ start: { x: left, y }, end: { x: 564, y }, thickness: 1, color: rgb(0.2, 0.2, 0.22) });
  y -= 16;

  page.drawText(`Exported: ${new Date().toISOString()}`, {
    x: left,
    y,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  const pdfBytes = await pdf.save();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="kincaid-action-packet-${eventId}.pdf"`);
  res.send(Buffer.from(pdfBytes));
}