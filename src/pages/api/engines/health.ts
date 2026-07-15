import type { NextApiRequest, NextApiResponse } from "next";

interface EngineHealth {
  name: string;
  endpoint: string;
  port: number;
  status: "online" | "offline";
  latency?: number;
  version?: string;
  error?: string;
}

const ENGINES = [
  {
    name: "Medical Trend Forecast",
    endpoint: "http://localhost:8001",
    port: 8001
  },
  {
    name: "Rx Trend Forecast",
    endpoint: "http://localhost:8002",
    port: 8002
  }
];

async function checkEngineHealth(engine: typeof ENGINES[0]): Promise<EngineHealth> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${engine.endpoint}/health`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const latency = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      return {
        name: engine.name,
        endpoint: engine.endpoint,
        port: engine.port,
        status: "online",
        latency,
        version: data.version || "1.0.0"
      };
    } else {
      return {
        name: engine.name,
        endpoint: engine.endpoint,
        port: engine.port,
        status: "offline",
        error: `HTTP ${response.status}`
      };
    }
  } catch (error) {
    return {
      name: engine.name,
      endpoint: engine.endpoint,
      port: engine.port,
      status: "offline",
      error: error instanceof Error ? error.message : "Connection failed"
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const healthChecks = await Promise.all(
      ENGINES.map(engine => checkEngineHealth(engine))
    );

    const summary = {
      total: healthChecks.length,
      online: healthChecks.filter(h => h.status === "online").length,
      offline: healthChecks.filter(h => h.status === "offline").length,
      avgLatency: healthChecks
        .filter(h => h.latency)
        .reduce((sum, h) => sum + (h.latency || 0), 0) / 
        (healthChecks.filter(h => h.latency).length || 1)
    };

    res.status(200).json({
      timestamp: new Date().toISOString(),
      summary,
      engines: healthChecks
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to check engine health",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}