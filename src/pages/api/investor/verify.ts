import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const code = String(req.body?.code ?? "");
  const expected = String(process.env.INVESTOR_ACCESS_CODE ?? "");

  if (!expected) {
    // If you forget to set it, fail closed.
    return res.status(500).json({ ok: false, error: "Investor access not configured" });
  }

  if (code && code === expected) return res.status(200).json({ ok: true });

  return res.status(401).json({ ok: false });
}