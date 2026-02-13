import type { NextApiRequest, NextApiResponse } from "next";
import type { SnapshotResponse, TileData } from "@/components/warroom/executiveTypes";
import { buildSnapshot } from "@/lib/warroom/demo";

export default function handler(req: NextApiRequest, res: NextApiResponse<SnapshotResponse>) {
  const org = (req.query.org as string) ?? "Portfolio";
  const period = (req.query.period as "MTD" | "QTD" | "YTD") ?? "MTD";
  const currency = (req.query.currency as "USD" | "GBP" | "EUR") ?? "USD";
  const businessUnit = (req.query.businessUnit as string) ?? "All";

  const snapshot = buildSnapshot({ org, period, currency, businessUnit });
  res.status(200).json(snapshot);
}