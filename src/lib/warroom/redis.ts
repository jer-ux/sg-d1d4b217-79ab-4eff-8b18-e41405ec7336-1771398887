import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var __KIQ_REDIS__: Redis | undefined;
}

export function getRedis() {
  if (globalThis.__KIQ_REDIS__) return globalThis.__KIQ_REDIS__;

  const url = process.env.REDIS_URL;
  if (!url) {
    console.warn("REDIS_URL not set - falling back to in-memory store");
    return null;
  }

  try {
    const client = new Redis(url, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    client.on("error", (err) => {
      console.error("Redis connection error:", err);
    });

    client.on("connect", () => {
      console.log("Redis connected successfully");
    });

    globalThis.__KIQ_REDIS__ = client;
    return client;
  } catch (err) {
    console.error("Failed to initialize Redis:", err);
    return null;
  }
}

export async function setJson(key: string, value: any, ttlSeconds?: number) {
  const redis = getRedis();
  if (!redis) return false;
  
  const serialized = JSON.stringify(value);
  if (ttlSeconds) {
    await redis.setex(key, ttlSeconds, serialized);
  } else {
    await redis.set(key, serialized);
  }
  return true;
}

export async function getJson<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;
  
  const data = await redis.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function publishMessage(channel: string, message: any) {
  const redis = getRedis();
  if (!redis) return false;
  
  await redis.publish(channel, JSON.stringify(message));
  return true;
}

export function subscribeToChannel(channel: string, callback: (message: any) => void) {
  const redis = getRedis();
  if (!redis) return () => {};

  const subscriber = redis.duplicate();
  
  subscriber.subscribe(channel, (err) => {
    if (err) {
      console.error(`Failed to subscribe to ${channel}:`, err);
    }
  });

  subscriber.on("message", (ch, msg) => {
    if (ch === channel) {
      try {
        callback(JSON.parse(msg));
      } catch (e) {
        console.error("Failed to parse message:", e);
      }
    }
  });

  return () => {
    subscriber.unsubscribe(channel);
    subscriber.disconnect();
  };
}