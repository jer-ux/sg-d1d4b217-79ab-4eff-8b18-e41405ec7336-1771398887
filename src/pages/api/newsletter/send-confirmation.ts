import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  try {
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 40px; border-radius: 16px; border: 2px solid #f43f5e;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; font-size: 32px; font-weight: 900; margin: 0 0 16px 0;">
                Welcome to the Investigation
              </h1>
              <p style="color: #9ca3af; font-size: 18px;">Former PBM Crime Boss Speaks</p>
            </div>
            <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: white; font-size: 20px; font-weight: bold; margin: 0 0 16px 0;">Hi ${name},</h2>
              <p style="color: #d1d5db; line-height: 1.8; margin: 0 0 16px 0;">
                You are now subscribed to Former PBM Crime Boss Speaks, the forensic newsletter that exposes PBM exploitation tactics.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log("Newsletter confirmation prepared for:", email);
    
    return res.status(200).json({ 
      success: true, 
      message: "Confirmation email prepared" 
    });
  } catch (error) {
    console.error("Newsletter confirmation error:", error);
    return res.status(500).json({ error: "Failed to send confirmation" });
  }
}