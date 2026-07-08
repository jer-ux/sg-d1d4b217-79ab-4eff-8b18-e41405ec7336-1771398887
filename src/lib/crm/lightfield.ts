/**
 * Lightfield CRM Integration
 * Sends contact form submissions to Lightfield.ai CRM
 */

const LIGHTFIELD_API_KEY = process.env.LIGHTFIELD_API_KEY;
const LIGHTFIELD_API_URL = process.env.LIGHTFIELD_API_URL || "https://api.lightfield.ai/v1";

interface LightfieldLead {
  firstName?: string;
  lastName?: string;
  email: string;
  company?: string;
  phone?: string;
  role?: string;
  source: string;
  notes?: string;
  customFields?: Record<string, any>;
}

export async function sendLeadToLightfield(lead: LightfieldLead) {
  if (!LIGHTFIELD_API_KEY) {
    console.warn("Lightfield API key not configured");
    return { success: false, error: "API key not configured" };
  }

  try {
    const response = await fetch(`${LIGHTFIELD_API_URL}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LIGHTFIELD_API_KEY}`,
      },
      body: JSON.stringify({
        ...lead,
        timestamp: new Date().toISOString(),
        platform: "Kincaid Health",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Lightfield API error:", error);
      return { success: false, error };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send lead to Lightfield:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendContactFormLead(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}) {
  const [firstName, ...lastNameParts] = data.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return sendLeadToLightfield({
    firstName,
    lastName,
    email: data.email,
    company: data.company,
    phone: data.phone,
    source: "Contact Form",
    notes: data.message,
  });
}

export async function sendDemoRequestLead(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  role?: string;
  message?: string;
  interests?: string[];
}) {
  const [firstName, ...lastNameParts] = data.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return sendLeadToLightfield({
    firstName,
    lastName,
    email: data.email,
    company: data.company,
    phone: data.phone,
    role: data.role,
    source: "Demo Request",
    notes: data.message,
    customFields: {
      interests: data.interests,
    },
  });
}

export async function sendNewsletterLead(data: {
  email: string;
  source?: string;
}) {
  return sendLeadToLightfield({
    email: data.email,
    source: data.source || "Newsletter Signup",
  });
}

export async function sendCalendlyLead(data: {
  name: string;
  email: string;
  eventType: string;
  scheduledTime: string;
}) {
  const [firstName, ...lastNameParts] = data.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return sendLeadToLightfield({
    firstName,
    lastName,
    email: data.email,
    source: "Calendly - " + data.eventType,
    customFields: {
      scheduledTime: data.scheduledTime,
    },
  });
}

export interface LightfieldContact {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  title?: string;
  message?: string;
  source?: string;
  customFields?: Record<string, any>;
}

export interface LightfieldResponse {
  success: boolean;
  contactId?: string;
  error?: string;
}

/**
 * Send contact to Lightfield CRM
 * This should be called from server-side API routes only to keep API key secure
 */
export async function sendToLightfield(
  contact: LightfieldContact
): Promise<LightfieldResponse> {
  const apiKey = process.env.LIGHTFIELD_API_KEY;
  const apiUrl = process.env.LIGHTFIELD_API_URL || "https://api.lightfield.ai/v1";

  if (!apiKey) {
    console.error("LIGHTFIELD_API_KEY not configured");
    return {
      success: false,
      error: "CRM integration not configured",
    };
  }

  try {
    const response = await fetch(`${apiUrl}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: contact.email,
        name: contact.name,
        phone: contact.phone,
        company: contact.company,
        title: contact.title,
        notes: contact.message,
        source: contact.source || "website",
        tags: ["website-lead", contact.source || "general"],
        customFields: contact.customFields,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lightfield API error:", response.status, errorText);
      
      return {
        success: false,
        error: `CRM API error: ${response.status}`,
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      contactId: data.id || data.contactId,
    };
  } catch (error) {
    console.error("Error sending to Lightfield:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Update contact in Lightfield CRM
 */
export async function updateLightfieldContact(
  contactId: string,
  updates: Partial<LightfieldContact>
): Promise<LightfieldResponse> {
  const apiKey = process.env.LIGHTFIELD_API_KEY;
  const apiUrl = process.env.LIGHTFIELD_API_URL || "https://api.lightfield.ai/v1";

  if (!apiKey) {
    return {
      success: false,
      error: "CRM integration not configured",
    };
  }

  try {
    const response = await fetch(`${apiUrl}/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `CRM API error: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating Lightfield contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Add note/activity to Lightfield contact
 */
export async function addLightfieldNote(
  contactId: string,
  note: string,
  activityType: string = "note"
): Promise<LightfieldResponse> {
  const apiKey = process.env.LIGHTFIELD_API_KEY;
  const apiUrl = process.env.LIGHTFIELD_API_URL || "https://api.lightfield.ai/v1";

  if (!apiKey) {
    return {
      success: false,
      error: "CRM integration not configured",
    };
  }

  try {
    const response = await fetch(`${apiUrl}/contacts/${contactId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        type: activityType,
        note: note,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `CRM API error: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding Lightfield note:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}