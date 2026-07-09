/**
 * Next.js API Route - Engine Gateway Proxy
 * Securely forwards frontend requests to the engine gateway
 */

import type { NextApiRequest, NextApiResponse } from "next";

const GATEWAY_URL = process.env.ENGINE_GATEWAY_URL || "http://localhost:8000";
const GATEWAY_API_KEY = process.env.ENGINE_GATEWAY_API_KEY || "dev_key_001";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { engine, operation, payload } = req.body;

    if (!engine || !operation) {
      return res.status(400).json({ error: "engine and operation are required" });
    }

    // Forward request to gateway
    const response = await fetch(`${GATEWAY_URL}/engines/${engine}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": GATEWAY_API_KEY,
      },
      body: JSON.stringify({
        operation,
        payload,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Engine proxy error:", error);
    return res.status(500).json({
      error: "Engine execution failed",
      detail: error instanceof Error ? error.message : "Unknown error",
    });
  }
}