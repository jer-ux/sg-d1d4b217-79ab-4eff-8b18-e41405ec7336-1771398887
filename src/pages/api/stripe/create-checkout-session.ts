import type { NextApiRequest, NextApiResponse } from "next";
import { stripe, STRIPE_CONFIG } from "@/lib/stripe/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Log incoming request
  console.log("🔵 Checkout session request received");

  if (req.method !== "POST") {
    console.error("❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customerEmail, customerName, company, jobTitle, phone } = req.body;

    console.log("📧 Customer details:", { customerEmail, customerName, company, jobTitle });

    if (!customerEmail || !customerName) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields: email and name are required" });
    }

    // Log Stripe configuration
    console.log("🔧 Stripe config:", {
      successUrl: STRIPE_CONFIG.SUCCESS_URL,
      cancelUrl: STRIPE_CONFIG.CANCEL_URL,
      amount: STRIPE_CONFIG.BOARD_REPORT_AMOUNT,
    });

    // Create Stripe Checkout Session
    console.log("🚀 Creating Stripe checkout session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Kincaid IQ RX Defense Board Report",
              description: "Comprehensive PBM contract analysis with board-ready deliverables. Includes 20-point clause analysis, risk scoring, executive summary, and negotiation guide.",
              images: ["https://siriusb-iq.vercel.app/og-image.png"],
            },
            unit_amount: 19900, // $199.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${STRIPE_CONFIG.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: STRIPE_CONFIG.CANCEL_URL,
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_company: company || "",
        customer_job_title: jobTitle || "",
        customer_phone: phone || "",
        product_type: "rx_defense_board_report",
      },
    });

    console.log("✅ Checkout session created:", session.id);
    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("❌ Stripe checkout error:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Payment processing failed",
      details: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
}