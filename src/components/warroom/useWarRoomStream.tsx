"use client";

import { useEffect, useMemo, useState } from "react";
import type { LaneSummary, StreamMessage, WarEvent } from "@/lib/warroom/types";

export function useWarRoomStream() {
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [events, setEvents] = useState<WarEvent[]>([]);
  const [summaries, setSummaries] = useState<LaneSummary[]>([]);
  const [ticker, setTicker] = useState<{ text: string; amount: number; state: string; lane: string; at: string }[]>([]);

  useEffect(() => {
    const es = new EventSource("/api/war-room/stream");
    setConnected(true);

    es.onmessage = (ev) => {
      const msg = JSON.parse(ev.data) as StreamMessage;

      if (msg.type === "snapshot") {
        setEvents(msg.events);
        setSummaries(msg.summaries);
        setLastUpdated(new Date().toISOString());
        return;
      }
      if (msg.type === "event_upsert") {
        setEvents((prev) => {
          const map = new Map(prev.map((e) => [e.id, e]));
          map.set(msg.event.id, msg.event);
          return Array.from(map.values());
        });
        setLastUpdated(msg.event.updatedAt);
        return;
      }
      if (msg.type === "summary_upsert") {
        setSummaries((prev) => {
          const map = new Map(prev.map((s) => [s.lane, s]));
          map.set(msg.summary.lane, msg.summary);
          return Array.from(map.values());
        });
        setLastUpdated(new Date().toISOString());
        return;
      }
      if (msg.type === "ticker") {
        setTicker((prev) => [msg, ...prev].slice(0, 24));
        return;
      }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
    };

    return () => {
      es.close();
    };
  }, []);

  const totals = useMemo(() => {
    const t = { identified: 0, approved: 0, realized: 0, atRisk: 0 };
    for (const s of summaries) {
      t.identified += s.identified;
      t.approved += s.approved;
      t.realized += s.realized;
      t.atRisk += s.atRisk;
    }
    return t;
  }, [summaries]);

  return { connected, lastUpdated, events, summaries, totals, ticker };
}