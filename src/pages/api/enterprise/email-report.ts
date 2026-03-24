/**
 * Email Report API
 * Send generated reports via email
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { report_id, recipients, message } = req.body;

    if (!report_id || !recipients || recipients.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get report details
    const { data: report, error } = await supabase
      .from("report_history")
      .select("*")
      .eq("id", report_id)
      .single();

    if (error || !report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // TODO: Implement email sending logic
    // This would integrate with SendGrid, AWS SES, or similar service
    console.log("Sending report to:", recipients);
    console.log("Message:", message);

    // Log email activity
    await supabase.from("report_email_logs").insert({
      report_id,
      recipients,
      sent_by: req.headers["user-id"] as string,
      status: "sent",
      sent_at: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Report sent successfully",
    });
  } catch (error) {
    console.error("Error sending report:", error);
    return res.status(500).json({ error: "Failed to send report" });
  }
}