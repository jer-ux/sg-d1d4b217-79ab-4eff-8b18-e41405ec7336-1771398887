/**
 * Lightfield CRM Integration
 * Sends contact form submissions to Lightfield.ai CRM
 */

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