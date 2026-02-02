"use client";

import { useEffect, useState } from "react";
import type { TileData, StreamMessage } from "./executiveTypes";

export type ExecutiveEvent = {
  id: string;
  timestamp: string;
  category: "cost_trend" | "contract" | "pharmacy" | "compliance" | "nps" | "plan_design";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  kpi: string;
  framework: "McKinsey" | "Bain";
};

export function useExecutiveStream(query: string) {
  const [status, setStatus] = useState<"connecting" | "live" | "offline">("connecting");
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const [events, setEvents] = useState<ExecutiveEvent[]>([]);

  useEffect(() => {
    setStatus("connecting");
    const es = new EventSource(`/api/war-room/executive-stream?${query}`);
    
    es.onopen = () => setStatus("live");
    
    es.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data) as StreamMessage;
        
        if (msg.type === "tiles") {
          setTiles(msg.tiles);
        }
        
        if (msg.type === "ticker") {
          setTickerItems((prev) => [msg.item, ...prev].slice(0, 30));
        }
        
        if (msg.type === "event") {
          const event = msg.event as ExecutiveEvent;
          setEvents((prev) => [event, ...prev].slice(0, 50));
        }
        
        if (msg.type === "ping") {
          // Keep-alive
        }
      } catch (error) {
        console.error("Stream parse error:", error);
      }
    };
    
    es.onerror = () => {
      setStatus("offline");
      es.close();
    };
    
    return () => {
      es.close();
    };
  }, [query]);

  return { status, tiles, tickerItems, events };
}