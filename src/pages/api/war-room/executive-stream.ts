import type { NextApiRequest, NextApiResponse } from "next";
import type { StreamMessage } from "@/components/warroom/executiveTypes";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const sendMessage = (msg: StreamMessage) => {
    res.write(`data: ${JSON.stringify(msg)}\n\n`);
  };

  sendMessage({ type: "ping" });

  const tickerInterval = setInterval(() => {
    const messages = [
      "$45K waste detected in supply chain → Value lane",
      "Control anomaly resolved → Health IQ +1",
      "$78K agentic optimization deployed",
      "New marketplace integration live",
      "$156K recovery validated → Moving to realization",
    ];
    const item = messages[Math.floor(Math.random() * messages.length)];
    sendMessage({ type: "ticker", item });
  }, 8000);

  const pingInterval = setInterval(() => {
    sendMessage({ type: "ping" });
  }, 15000);

  req.on("close", () => {
    clearInterval(tickerInterval);
    clearInterval(pingInterval);
    res.end();
  });
}