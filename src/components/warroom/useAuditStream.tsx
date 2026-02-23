"use client";

import { useEffect, useState, useOptimistic, useTransition } from "react";

export type LiveAuditItem = {
  id: string;
  entry: any;
  sig?: string;
};

export function useAuditStream() {
  const [connected, setConnected] = useState(false);
  const [items, setItems] = useState<LiveAuditItem[]>([]);
  const [isPending, startTransition] = useTransition();
  
  // Optimistic items for immediate UI updates
  const [optimisticItems, setOptimisticItems] = useOptimistic(
    items,
    (state, newItem: LiveAuditItem) => {
      return [newItem, ...state].slice(0, 40);
    }
  );

  useEffect(() => {
    const es = new EventSource("/api/war-room/stream");
    
    es.onopen = () => {
      startTransition(() => {
        setConnected(true);
      });
    };

    es.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);

      if (msg.type === "audit") {
        const newItem = { id: msg.id, entry: msg.entry, sig: msg.sig };
        
        // Optimistic update for immediate feedback
        setOptimisticItems(newItem);
        
        startTransition(() => {
          setItems((prev) => [newItem, ...prev].slice(0, 40));
        });
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
  }, [setOptimisticItems]);

  return { 
    connected, 
    items: optimisticItems,
    isPending 
  };
}