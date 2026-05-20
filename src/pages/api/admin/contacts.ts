import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET and PATCH requests
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Simple admin check (in production, use proper session validation)
  const adminSession = req.headers.authorization;
  if (!adminSession) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
      // Get all contacts with filters
      const { status, source, search, startDate, endDate } = req.query;

      let query = supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      // Apply filters
      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      if (source && source !== "all") {
        query = query.eq("source", source);
      }

      if (search) {
        query = query.or(
          `full_name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`
        );
      }

      if (startDate) {
        query = query.gte("created_at", startDate);
      }

      if (endDate) {
        query = query.lte("created_at", endDate);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).json({ error: "Failed to fetch contacts" });
      }

      return res.status(200).json({ success: true, contacts: data });
    }

    if (req.method === "PATCH") {
      // Update contact status
      const { contactId, status, notes } = req.body;

      if (!contactId || !status) {
        return res.status(400).json({ error: "Missing contactId or status" });
      }

      const { data, error } = await supabase
        .from("contacts")
        .update({ 
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", contactId)
        .select()
        .single();

      if (error) {
        console.error("Error updating contact:", error);
        return res.status(500).json({ error: "Failed to update contact" });
      }

      return res.status(200).json({ success: true, contact: data });
    }
  } catch (error) {
    console.error("Admin contacts API error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}