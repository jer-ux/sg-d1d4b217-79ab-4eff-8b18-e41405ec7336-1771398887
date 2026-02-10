import { getRedis } from "@/lib/warroom/redis";
import { streamKey, snapshot, ensureSeeded } from "@/lib/warroom/redisStore";

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

  // Send initial snapshot
  try {
    await ensureSeeded();
    const snap = await snapshot();
    res.write(encodeSse({ type: "snapshot", events: snap.events, summaries: snap.summaries }));
  } catch (err) {
    console.error("[stream] snapshot error:", err);
  }

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
        "COUNT",
        50,
        "BLOCK",
        20000,
        "STREAMS",
        streamKey,
        lastId
      )) as any;

      if (!result) continue;

      for (const [_streamKey, entries] of result) {
        for (const [id, kv] of entries) {
          lastId = id;

          const msgIdx = kv.indexOf("msg");
          const msg = msgIdx !== -1 ? kv[msgIdx + 1] : null;

          if (msg) {
            const parsed = JSON.parse(msg);
            res.write(encodeSse(parsed));
          }
        }
      }
    }
  } catch (err) {
    console.error("[stream] error:", err);
  } finally {
    clearInterval(keep);
    res.end();
  }
}