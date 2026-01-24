import type { NextApiRequest, NextApiResponse } from "next";
import { getRedis } from "@/lib/warroom/redis";
import { ensureSeeded, snapshot, streamKey } from "@/lib/warroom/redisStore";
import type { StreamMessage } from "@/lib/warroom/types";

function encodeSse(msg: StreamMessage) {
  return `data: ${JSON.stringify(msg)}\n\n`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  res.write(encodeSse({ type: "hello", serverTime: new Date().toISOString() }));

  try {
    await ensureSeeded();
    const snap = await snapshot();
    res.write(encodeSse({ type: "snapshot", events: snap.events, summaries: snap.summaries }));
  } catch (err) {
    console.error("[stream] snapshot error:", err);
  }

  const redis = getRedis();
  let lastId = "$";
  let keepaliveTimer: NodeJS.Timeout | null = null;
  let pollTimer: NodeJS.Timeout | null = null;

  const cleanup = () => {
    if (keepaliveTimer) clearInterval(keepaliveTimer);
    if (pollTimer) clearInterval(pollTimer);
  };

  keepaliveTimer = setInterval(() => {
    res.write(`: keepalive ${Date.now()}\n\n`);
  }, 15000);

  const poll = async () => {
    try {
      const results = await redis.xread("BLOCK", 5000, "STREAMS", streamKey, lastId);
      if (!results) return;

      for (const [, messages] of results) {
        for (const [id, fields] of messages) {
          lastId = id;
          const msgJson = fields[1];
          if (msgJson) {
            const msg = JSON.parse(msgJson) as StreamMessage;
            res.write(encodeSse(msg));
          }
        }
      }
    } catch (err) {
      console.error("[stream] poll error:", err);
    }
  };

  pollTimer = setInterval(poll, 100);

  req.on("close", () => {
    cleanup();
    res.end();
  });
}