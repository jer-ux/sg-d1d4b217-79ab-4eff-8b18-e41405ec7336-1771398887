"use client";

import clsx from "clsx";

export default function ConnectionBadge({
  connected,
  lastUpdated,
}: {
  connected: boolean;
  lastUpdated: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-xl border text-xs",
          connected ? "border-white/15 bg-white/5 text-white/80" : "border-white/10 bg-black/30 text-white/55"
        )}
      >
        <span
          className={clsx(
            "inline-block h-2 w-2 rounded-full",
            connected ? "bg-white animate-pulse" : "bg-white/30"
          )}
        />
        {connected ? "Live" : "Offline"}
      </div>

      {lastUpdated ? (
        <div className="text-xs text-white/55">
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </div>
      ) : null}
    </div>
  );
}