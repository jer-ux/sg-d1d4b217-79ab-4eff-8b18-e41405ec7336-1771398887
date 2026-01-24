"use client";

import { useMemo } from "react";
import { useAuditStream } from "@/components/warroom/useAuditStream";

function shortSig(sig?: string) {
  if (!sig) return "";
  return sig.slice(0, 14) + "…";
}

function label(entry: any) {
  const at = entry?.at ? new Date(entry.at).toLocaleTimeString() : "";
  const actor = entry?.actor ? entry.actor : "system";
  const action = entry?.action ?? "ACTION";
  const lane = entry?.lane ?? "lane";
  const ev = entry?.eventId ?? "event";
  const ok = entry?.policyOk === false ? "BLOCKED" : "OK";

  return `${at} • ${ok} • ${action} • ${lane} • ${ev} • ${actor}`;
}

export function AuditTicker() {
  const { connected, items } = useAuditStream();

  const lines = useMemo(() => {
    const top = items.slice(0, 10);
    return top.map((x) => `${label(x.entry)} • sig ${shortSig(x.sig)}`);
  }, [items]);

  if (lines.length === 0) {
    return (
      <div className="mt-2 k-panel px-4 py-2 text-xs text-white/55">
        Audit: {connected ? "Live" : "Offline"} • Waiting for events…
      </div>
    );
  }

  return (
    <div className="mt-2 k-panel px-4 py-2 overflow-hidden">
      <div className="flex items-center gap-3 text-[11px] text-white/60">
        <span className="px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-white/75">
          LIVE AUDIT
        </span>
        <span>{connected ? "Streaming" : "Offline"}</span>
      </div>

      <div className="relative mt-2 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee text-xs text-white/75">
          {lines.concat(lines).map((t, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="mx-3 text-white/25">•</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}