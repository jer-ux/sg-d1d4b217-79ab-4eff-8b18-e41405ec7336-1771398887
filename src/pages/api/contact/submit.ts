import type { NextApiRequest, NextApiResponse } from "next";
import { submitContact } from "@/services/contactService";
import { sendToLightfield } from "@/lib/crm/lightfield";
import { sendContactFormLead } from "@/lib/crm/lightfield";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.full_name || !formData.email || !formData.message) {
      return res.status(400).json({ 
        error: "Missing required fields: full_name, email, message" 
      });
    }

    // Save to Supabase database
    const result = await submitContact(formData);

    if (!result.success || !result.contact) {
      return res.status(500).json({ 
        error: result.error || "Failed to save contact" 
      });
    }

    // Send to Lightfield CRM (non-blocking - don't fail if CRM fails)
    const crmResult = await sendToLightfield({
      email: formData.email,
      name: formData.full_name,
      phone: formData.phone,
      company: formData.company,
      title: formData.job_title,
      message: formData.message,
      source: formData.source || "website",
      customFields: {
        supabase_id: result.contact.id,
        submitted_at: result.contact.created_at,
        user_agent: formData.metadata?.userAgent,
        referrer: formData.metadata?.referrer,
      },
    });

    if (!crmResult.success) {
      console.warn("Failed to send to Lightfield CRM:", crmResult.error);
      // Still return success since we saved to database
    }

    // Send to Lightfield CRM via form lead
    const lightfieldResult = await sendContactFormLead({
      name: formData.full_name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      message: formData.message,
    });

    if (!lightfieldResult.success) {
      console.error("Lightfield integration failed:", lightfieldResult.error);
    }

    return res.status(200).json({
      success: true,
      message: "Contact submitted successfully",
      data: {
        id: result.contact.id,
        crmSynced: crmResult.success,
        crmContactId: crmResult.contactId,
        lightfield: lightfieldResult.success ? "synced" : "failed",
      },
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}