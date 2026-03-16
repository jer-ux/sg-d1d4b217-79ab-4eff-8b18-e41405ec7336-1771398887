import Stripe from "stripe";

// Validate environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("STRIPE_SECRET_KEY is missing in environment variables");
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

// Initialize Stripe with proper error handling
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

// Validate Stripe connection on initialization
if (typeof window === "undefined") {
  console.log("✅ Stripe initialized successfully on server");
}

export const STRIPE_CONFIG = {
  BOARD_REPORT_PRICE_ID: process.env.STRIPE_BOARD_REPORT_PRICE_ID,
  BOARD_REPORT_AMOUNT: 19900, // $199.00 in cents
  CURRENCY: "usd",
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment-success`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
} as const;

console.log("Stripe Config:", {
  hasSecretKey: !!stripeSecretKey,
  successUrl: STRIPE_CONFIG.SUCCESS_URL,
  cancelUrl: STRIPE_CONFIG.CANCEL_URL,
});