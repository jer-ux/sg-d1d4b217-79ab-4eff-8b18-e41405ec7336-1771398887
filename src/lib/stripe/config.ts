import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export const STRIPE_CONFIG = {
  BOARD_REPORT_PRICE_ID: process.env.STRIPE_BOARD_REPORT_PRICE_ID,
  BOARD_REPORT_AMOUNT: 19900, // $199.00 in cents
  CURRENCY: "usd",
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_SITE_URL}`,
} as const;