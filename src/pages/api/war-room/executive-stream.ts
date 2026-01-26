import type { NextApiRequest, NextApiResponse } from "next";
import type { StreamMessage } from "@/components/warroom/executiveTypes";
import { buildStreamTick, buildStreamTiles } from "@/lib/warroom/demo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const org = (req.query.org as string) ?? "Portfolio";
  const period = (req.query.period as "MTD" | "QTD" | "YTD") ?? "MTD";
  const currency = (req.query.currency as "USD" | "GBP" | "EUR") ?? "USD";
  const businessUnit = (req.query.businessUnit as string) ?? "All";

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const send = (obj: StreamMessage) => {
    res.write(`data: ${JSON.stringify(obj)}\n\n`);
  };

  // Immediately send a ping so UI flips to "live"
  send({ type: "ping" });

  // Ticker cadence - every 2.5 seconds
  const tickerInterval = setInterval(() => {
    send({ type: "ticker", item: buildStreamTick({ org, period, currency, businessUnit }) });
  }, 2500);

  // Tile refresh cadence - every 10 seconds
  const tilesInterval = setInterval(() => {
    send({ type: "tiles", tiles: buildStreamTiles({ org, period, currency, businessUnit }) });
  }, 10000);

  // Keep-alive ping - every 15 seconds
  const pingInterval = setInterval(() => {
    send({ type: "ping" });
  }, 15000);

  // Cleanup on client disconnect
  req.on("close", () => {
    clearInterval(tickerInterval);
    clearInterval(tilesInterval);
    clearInterval(pingInterval);
    res.end();
  });
}