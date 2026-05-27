import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia"
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "The Shady Broker Report",
              description: "24-page forensic dossier with 10 business day delivery",
            },
            unit_amount: 450000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shady-broker-report/intake?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shady-broker-report`,
      metadata: {
        product: "shady_broker_report",
      },
      automatic_tax: {
        enabled: true,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}