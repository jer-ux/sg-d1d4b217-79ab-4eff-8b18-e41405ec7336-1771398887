import type { NextApiRequest, NextApiResponse } from "next";
import { sendCalendlyLead } from "@/lib/crm/lightfield";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { event, payload } = req.body;

    // Calendly sends "invitee.created" event when someone books
    if (event === "invitee.created") {
      const { name, email } = payload.invitee;
      const { event_type, start_time } = payload;

      // Send to Lightfield CRM
      const lightfieldResult = await sendCalendlyLead({
        name,
        email,
        eventType: event_type.name || "Demo Call",
        scheduledTime: start_time,
      });

      if (!lightfieldResult.success) {
        console.error("Lightfield integration failed:", lightfieldResult.error);
      }

      return res.status(200).json({ 
        message: "Calendly booking synced",
        lightfield: lightfieldResult.success ? "synced" : "failed"
      });
    }

    return res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    console.error("Calendly webhook error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}