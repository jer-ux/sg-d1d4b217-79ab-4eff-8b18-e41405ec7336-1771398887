import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/simulations/scenarios`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Scenarios API error:", error);
    res.status(500).json({ error: "Failed to load scenarios" });
  }
}