import { getRedis } from "@/lib/warroom/redis";
import { AUDIT_STREAM_KEY } from "@/lib/warroom/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function encodeSse(obj: any) {
  return `data: ${JSON.stringify(obj)}\n\n`;
}

export default async function handler(req: any, res: any) {
  const redis = getRedis();

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  res.write(encodeSse({ type: "hello", serverTime: new Date().toISOString() }));

  let lastId = "$";
  let running = true;

  const keep = setInterval(() => {
    if (!running) return;
    try {
      res.write(`: keepalive ${Date.now()}\n\n`);
    } catch {
      running = false;
    }
  }, 15000);

  req.on("close", () => {
    running = false;
    clearInterval(keep);
  });

  try {
    while (running) {
      const result = (await redis.xread(
        "BLOCK",
        20000,
        "COUNT",
        50,
        "STREAMS",
        AUDIT_STREAM_KEY,
        lastId
      )) as any;

      if (!result) continue;

      for (const [_streamKey, entries] of result) {
        for (const [id, kv] of entries) {
          lastId = id;

          const entryIdx = kv.indexOf("entry");
          const sigIdx = kv.indexOf("sig");

          const entry = entryIdx !== -1 ? kv[entryIdx + 1] : null;
          const sig = sigIdx !== -1 ? kv[sigIdx + 1] : null;

          if (entry) {
            res.write(encodeSse({ type: "audit", id, entry: JSON.parse(entry), sig }));
          }
        }
      }
    }
  } catch (err) {
    console.error("Stream error:", err);
  } finally {
    clearInterval(keep);
    res.end();
  }
}