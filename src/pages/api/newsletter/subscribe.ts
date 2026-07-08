import type { NextApiRequest, NextApiResponse } from "next";
import { sendNewsletterLead } from "@/lib/crm/lightfield";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Send to Lightfield CRM
    const lightfieldResult = await sendNewsletterLead({
      email,
      source,
    });

    if (!lightfieldResult.success) {
      console.error("Lightfield integration failed:", lightfieldResult.error);
    }

    return res.status(200).json({ 
      message: "Newsletter subscription successful",
      lightfield: lightfieldResult.success ? "synced" : "failed"
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}