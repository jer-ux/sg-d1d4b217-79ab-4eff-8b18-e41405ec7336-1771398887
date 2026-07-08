import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { model, scenario, result } = req.body;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/simulations/export-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, scenario, result })
    });

    const buffer = await response.arrayBuffer();
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="simulation_${model}_${Date.now()}.pdf"`);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("PDF export error:", error);
    res.status(500).json({ error: "PDF export failed" });
  }
}