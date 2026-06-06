import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia"
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lookup_id, buyer_email, buyer_name, company_name, broker_name } = req.body;

  if (!lookup_id || !buyer_email || !company_name || !broker_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shady Broker Forensic Report",
              description: `Forensic analysis of ${broker_name} for ${company_name}`,
              images: ["https://siriusb-iq.softgen.ai/og-shady-broker-index.png"]
            },
            unit_amount: 450000 // $4,500.00
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://siriusb-iq.softgen.ai"}/shady-broker-report/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://siriusb-iq.softgen.ai"}/shady-broker-index`,
      customer_email: buyer_email,
      metadata: {
        lookup_id,
        company_name,
        broker_name,
        buyer_name: buyer_name || ""
      }
    });

    // Create report record in pending state
    const { error: reportError } = await supabase
      .from("reports")
      .insert({
        lookup_id,
        buyer_email,
        buyer_name,
        company_name,
        broker_name,
        stripe_session_id: session.id,
        amount_paid: 450000,
        report_status: "pending"
      });

    if (reportError) {
      console.error("Report insert error:", reportError);
    }

    return res.status(200).json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}