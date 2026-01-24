"use client";

import { useEffect, useState } from "react";

export type LiveAuditItem = {
  id: string;
  entry: any;
  sig?: string;
};

export function useAuditStream() {
  const [connected, setConnected] = useState(false);
  const [items, setItems] = useState<LiveAuditItem[]>([]);

  useEffect(() => {
    const es = new EventSource("/api/war-room/stream");
    
    es.onopen = () => {
      setConnected(true);
    };

    es.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);

      if (msg.type === "audit") {
        setItems((prev) => [{ id: msg.id, entry: msg.entry, sig: msg.sig }, ...prev].slice(0, 40));
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

  return { connected, items };
}