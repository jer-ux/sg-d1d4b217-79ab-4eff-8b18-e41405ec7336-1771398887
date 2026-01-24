"use client";

import type { WarEvent } from "@/lib/warroom/types";
import { formatMoney } from "@/components/warroom/filters";

export function EvidenceDrawer({
  openEvent,
  onClose,
}: {
  openEvent: WarEvent | null;
  onClose: () => void;
}) {
  if (!openEvent) return null;

  const receipts = openEvent.receipts ?? [];

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[620px] max-w-[92vw] k-panel p-6 overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Evidence Receipt</div>
            <div className="text-sm text-white/65 mt-1">{openEvent.title}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Close
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs text-white/55">Event ID</div>
              <div className="text-white/90 mt-1">{openEvent.id}</div>
            </div>
            <div>
              <div className="text-xs text-white/55">Lane</div>
              <div className="text-white/90 mt-1 capitalize">{openEvent.lane}</div>
            </div>
            <div>
              <div className="text-xs text-white/55">State</div>
              <div className="text-white/90 mt-1">{openEvent.state.replace("_", " ")}</div>
            </div>
            <div>
              <div className="text-xs text-white/55">Owner</div>
              <div className="text-white/90 mt-1">{openEvent.owner ?? "Unassigned"}</div>
            </div>
            <div>
              <div className="text-xs text-white/55">Amount</div>
              <div className="text-white/90 mt-1">{formatMoney(openEvent.amount)}</div>
            </div>
            <div>
              <div className="text-xs text-white/55">Confidence</div>
              <div className="text-white/90 mt-1">{(openEvent.confidence * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-xs uppercase tracking-wider text-white/55 mb-2">Receipts ({receipts.length})</div>

          {receipts.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
              No receipts attached yet. Generate one from the event actions.
            </div>
          ) : (
            <div className="space-y-2">
              {receipts.map((r) => (
                <div key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-medium text-white/90">{r.title}</div>
                  <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-white/60">
                    {r.hash ? <div>Hash: {r.hash}</div> : null}
                    {r.freshness ? <div>Freshness: {r.freshness}</div> : null}
                    {r.url ? (
                      <div className="truncate">
                        Source: <span className="text-white/80">{r.url}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
            onClick={() => {
              const json = JSON.stringify(openEvent, null, 2);
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `evidence-${openEvent.id}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download evidence pack
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(openEvent, null, 2));
              alert("Evidence JSON copied to clipboard");
            }}
          >
            Copy receipt JSON
          </button>
        </div>
      </div>
    </div>
  );
}