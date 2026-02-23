"use client";

import { useEffect, useMemo, useState, useOptimistic, useTransition } from "react";
import type { LaneSummary, StreamMessage, WarEvent } from "@/lib/warroom/types";

export function useWarRoomStream() {
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [events, setEvents] = useState<WarEvent[]>([]);
  const [summaries, setSummaries] = useState<LaneSummary[]>([]);
  const [ticker, setTicker] = useState<{ text: string; amount: number; state: string; lane: string; at: string }[]>([]);
  const [isPending, startTransition] = useTransition();
  
  // Optimistic events for immediate UI updates
  const [optimisticEvents, setOptimisticEvents] = useOptimistic(
    events,
    (state, newEvent: WarEvent) => {
      const map = new Map(state.map((e) => [e.id, e]));
      map.set(newEvent.id, newEvent);
      return Array.from(map.values());
    }
  );

  useEffect(() => {
    const es = new EventSource("/api/war-room/stream");
    
    // Use transition for connection state to avoid blocking
    startTransition(() => {
      setConnected(true);
    });

    es.onmessage = (ev) => {
      const msg = JSON.parse(ev.data) as StreamMessage;

      if (msg.type === "snapshot") {
        startTransition(() => {
          setEvents(msg.events);
          setSummaries(msg.summaries);
          setLastUpdated(new Date().toISOString());
        });
        return;
      }
      
      if (msg.type === "event_upsert") {
        // Optimistic update for immediate feedback
        setOptimisticEvents(msg.event);
        
        startTransition(() => {
          setEvents((prev) => {
            const map = new Map(prev.map((e) => [e.id, e]));
            map.set(msg.event.id, msg.event);
            return Array.from(map.values());
          });
          setLastUpdated(msg.event.updatedAt);
        });
        return;
      }
      
      if (msg.type === "summary_upsert") {
        startTransition(() => {
          setSummaries((prev) => {
            const map = new Map(prev.map((s) => [s.lane, s]));
            map.set(msg.summary.lane, msg.summary);
            return Array.from(map.values());
          });
          setLastUpdated(new Date().toISOString());
        });
        return;
      }
      
      if (msg.type === "ticker") {
        startTransition(() => {
          setTicker((prev) => [msg, ...prev].slice(0, 24));
        });
        return;
      }
    };

    es.onerror = () => {
      startTransition(() => {
        setConnected(false);
      });
      es.close();
    };

    return () => {
      es.close();
    };
  }, [setOptimisticEvents]);

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

  return { 
    connected, 
    lastUpdated, 
    events: optimisticEvents, 
    summaries, 
    totals, 
    ticker,
    isPending 
  };
}