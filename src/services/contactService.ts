import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];
type ContactInsert = Database["public"]["Tables"]["contacts"]["Insert"];

export interface ContactFormData {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  job_title?: string;
  message: string;
  source?: string;
  metadata?: Record<string, any>;
}

/**
 * Submit a new contact form entry to the database
 */
export async function submitContact(data: ContactFormData): Promise<{
  success: boolean;
  contact?: Contact;
  error?: string;
}> {
  try {
    const insertData: ContactInsert = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      job_title: data.job_title || null,
      message: data.message,
      source: data.source || "website",
      status: "new",
      metadata: (data.metadata || {}) as any,
    };

    const { data: contact, error } = await supabase
      .from("contacts")
      .insert(insertData)
      .select()
      .single();

    console.log("Contact submission:", { contact, error });

    if (error) {
      console.error("Error submitting contact:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      contact: contact as Contact,
    };
  } catch (err) {
    console.error("Unexpected error submitting contact:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

/**
 * Get all contacts (admin use only - requires authentication)
 */
export async function getAllContacts(): Promise<{
  success: boolean;
  contacts?: Contact[];
  error?: string;
}> {
  try {
    const { data: contacts, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      contacts: contacts as Contact[],
    };
  } catch (err) {
    console.error("Unexpected error fetching contacts:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

/**
 * Update contact status (admin use only)
 */
export async function updateContactStatus(
  contactId: string,
  status: "new" | "contacted" | "qualified" | "converted" | "closed"
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase
      .from("contacts")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", contactId);

    if (error) {
      console.error("Error updating contact status:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error("Unexpected error updating contact:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}