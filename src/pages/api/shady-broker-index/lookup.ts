import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { company_name, broker_name, ein, plan_name, visitor_email } = req.body;

  if (!company_name || !broker_name || !visitor_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Log the lookup request
    const { data: lookupData, error: lookupError } = await supabase
      .from("lookups")
      .insert({
        company_name,
        broker_name,
        ein,
        plan_name,
        visitor_email,
        preliminary_grade: null // Will be computed
      })
      .select()
      .single();

    if (lookupError) throw lookupError;

    // Search for broker by name (fuzzy match)
    const { data: brokers, error: brokerError } = await supabase
      .from("brokers")
      .select("*")
      .ilike("name", `%${broker_name}%`)
      .limit(5);

    if (brokerError) throw brokerError;

    // If exact match found, return preliminary results
    if (brokers && brokers.length > 0) {
      const topMatch = brokers[0];

      // Update lookup with preliminary grade
      await supabase
        .from("lookups")
        .update({ 
          preliminary_grade: topMatch.grade,
          broker_id: topMatch.id
        })
        .eq("id", lookupData.id);

      // Get top 3 components for red flags
      const { data: components } = await supabase
        .from("score_components")
        .select("*")
        .eq("broker_id", topMatch.id)
        .order("component_score", { ascending: false, nullsFirst: false })
        .limit(3);

      return res.status(200).json({
        lookup_id: lookupData.id,
        broker_found: true,
        broker: {
          id: topMatch.id,
          name: topMatch.name,
          shady_score: topMatch.shady_score,
          grade: topMatch.grade,
          summary_finding: topMatch.summary_finding
        },
        red_flags: components?.map(c => c.component_name) || [],
        preliminary_grade: topMatch.grade,
        message: "Preliminary analysis complete. Full report available for purchase."
      });
    }

    // Broker not found in database
    return res.status(200).json({
      lookup_id: lookupData.id,
      broker_found: false,
      message: "Broker not in our current database. We can still generate a custom report using your DOL filings.",
      preliminary_grade: "PENDING"
    });

  } catch (error) {
    console.error("Lookup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}