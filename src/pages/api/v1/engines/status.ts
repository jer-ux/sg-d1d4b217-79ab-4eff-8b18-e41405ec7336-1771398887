/**
 * Next.js API Route - Engine Status Check
 * Returns health status of all computation engines
 */

import type { NextApiRequest, NextApiResponse } from "next";

const GATEWAY_URL = process.env.ENGINE_GATEWAY_URL || "http://localhost:8000";
const GATEWAY_API_KEY = process.env.ENGINE_GATEWAY_API_KEY || "dev_key_001";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(`${GATEWAY_URL}/engines/status`, {
      headers: {
        "X-API-Key": GATEWAY_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Engine status check error:", error);
    return res.status(500).json({
      error: "Failed to check engine status",
      detail: error instanceof Error ? error.message : "Unknown error",
    });
  }
}