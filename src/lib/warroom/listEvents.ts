import { getRedis } from "@/lib/warroom/redis";

const EVENT_KEY_PREFIX = "kiq:warroom:event:";

export async function listEventIds(limit = 200): Promise<string[]> {
  const redis = getRedis();
  let cursor = "0";
  const ids: string[] = [];

  while (true) {
    const [next, keys] = await redis.scan(cursor, "MATCH", `${EVENT_KEY_PREFIX}*`, "COUNT", 200);
    cursor = next;

    for (const k of keys) {
      const id = k.replace(EVENT_KEY_PREFIX, "");
      if (id) ids.push(id);
      if (ids.length >= limit) return ids;
    }

    if (cursor === "0") break;
  }

  return ids;
}

export async function readEventsByIds(ids: string[]) {
  const redis = getRedis();
  if (!ids.length) return [];

  const keys = ids.map((id) => `${EVENT_KEY_PREFIX}${id}`);
  const raw = await redis.mget(...keys);

  return raw
    .filter(Boolean)
    .map((s) => {
      try {
        return JSON.parse(s as string);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}