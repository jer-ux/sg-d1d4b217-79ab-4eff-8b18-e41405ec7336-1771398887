// ===============================
// War Room SSE Stream Endpoint
// ===============================
import type { NextApiRequest, NextApiResponse } from "next";
import { warRoomStore } from "@/lib/warroom/store";
import type { StreamMessage } from "@/lib/warroom/types";

function encodeSse(msg: StreamMessage) {
  return `data: ${JSON.stringify(msg)}\n\n`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  // Send initial hello
  res.write(encodeSse({ type: "hello", serverTime: new Date().toISOString() }));

  // Send snapshot
  const snap = warRoomStore.snapshot();
  res.write(encodeSse({ type: "snapshot", events: snap.events, summaries: snap.summaries }));

  // Subscribe to updates
  const unsubscribe = warRoomStore.subscribe((msg) => {
    res.write(encodeSse(msg));
  });

  // Keepalive (prevent proxy timeout)
  const keepAlive = setInterval(() => {
    res.write(`: keepalive ${Date.now()}\n\n`);
  }, 15000);

  // Cleanup on close
  req.on("close", () => {
    clearInterval(keepAlive);
    unsubscribe();
    res.end();
  });
}