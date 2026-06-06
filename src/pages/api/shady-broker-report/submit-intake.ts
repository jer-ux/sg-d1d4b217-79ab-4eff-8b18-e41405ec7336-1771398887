import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    visitor_email,
    company_name,
    plan_ein,
    plan_name,
    broker_name,
    preliminary_grade,
    preliminary_score,
    red_flags,
    ip_address,
    user_agent
  } = req.body;

  if (!visitor_email || !company_name || !broker_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Insert lookup record
    const { data: lookup, error: lookupError } = await supabase
      .from("lookups")
      .insert({
        visitor_email,
        company_name,
        plan_ein,
        plan_name,
        broker_name,
        preliminary_grade,
        preliminary_score,
        red_flags,
        ip_address: ip_address || req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        user_agent: user_agent || req.headers["user-agent"]
      })
      .select()
      .single();

    if (lookupError) {
      console.error("Lookup insert error:", lookupError);
      return res.status(500).json({ error: "Failed to record lookup" });
    }

    // TODO: Send email with preliminary grade and red flags
    // TODO: Trigger lead notification to Kincaid team

    return res.status(200).json({
      success: true,
      lookup_id: lookup.id,
      preliminary_grade,
      preliminary_score,
      red_flags
    });
  } catch (error) {
    console.error("Shady broker lookup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}