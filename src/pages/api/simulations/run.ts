import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { model, scenario, iterations, custom_params } = req.body;

  try {
    // Call Python backend
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/simulations/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        scenario,
        iterations,
        custom_params
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Simulation API error:", error);
    res.status(500).json({ error: "Simulation failed" });
  }
}