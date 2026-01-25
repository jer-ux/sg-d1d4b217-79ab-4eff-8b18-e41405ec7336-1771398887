import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { eventId, newStatus, receiptStatus } = req.body;

  if (!eventId || !newStatus) {
    return res.status(400).json({ error: "Missing eventId or newStatus" });
  }

  // Block transitions if receipt is UNVERIFIED
  if (receiptStatus === "UNVERIFIED" && !["IDENTIFIED", "CLOSED"].includes(newStatus)) {
    return res.status(403).json({
      error: "Cannot advance event: Evidence receipt is UNVERIFIED. Upgrade proof quality first.",
    });
  }

  // Simulate transition logic
  const validTransitions: Record<string, string[]> = {
    IDENTIFIED: ["NEGOTIATING", "APPROVED", "CLOSED"],
    NEGOTIATING: ["APPROVED", "CLOSED"],
    APPROVED: ["REALIZED", "CLOSED"],
    REALIZED: ["CLOSED"],
    CLOSED: [],
  };

  const currentStatus = "IDENTIFIED"; // Simplified - in real app, fetch from store
  const allowed = validTransitions[currentStatus] || [];

  if (!allowed.includes(newStatus)) {
    return res.status(400).json({ error: `Invalid transition: ${currentStatus} → ${newStatus}` });
  }

  res.status(200).json({
    success: true,
    eventId,
    newStatus,
    message: `Event ${eventId} transitioned to ${newStatus}`,
  });
}