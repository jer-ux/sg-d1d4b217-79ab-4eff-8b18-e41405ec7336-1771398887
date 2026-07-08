import type { NextApiRequest, NextApiResponse } from "next";
import { sendDemoRequestLead } from "@/lib/crm/lightfield";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, company, phone, role, message, interests } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Send to Lightfield CRM
    const lightfieldResult = await sendDemoRequestLead({
      name,
      email,
      company,
      phone,
      role,
      message,
      interests,
    });

    if (!lightfieldResult.success) {
      console.error("Lightfield integration failed:", lightfieldResult.error);
    }

    return res.status(200).json({ 
      message: "Demo request submitted successfully",
      lightfield: lightfieldResult.success ? "synced" : "failed"
    });
  } catch (error) {
    console.error("Demo request error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}