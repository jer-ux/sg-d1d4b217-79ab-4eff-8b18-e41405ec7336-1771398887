import Link from "next/link";
import { useEffect, useState } from "react";

type Gate = "VERIFIED" | "UNVERIFIED";
type Status = "OPEN" | "WATCH" | "RESOLVED";

type Event = {
  event_id: string;
  title: string;
  category: string;
  status: Status;
  receipt_ids: string[];
  top_reason_codes: string[];
  first_seen_at: string;
  last_seen_at: string;
  severity: number;
  velocity: number;
  confidence_score: number;
  confidence_gate: Gate;
  rank_score: number;
  why: string[];
};

export default function RankedEventsPanel() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch("/api/war-room/events?limit=15&recent=180&prior=1440");
        const d = await r.json();
        if (!alive) return;
        if (!d?.ok) throw new Error(d?.error || "Failed to load events");
        setEvents(d.events || []);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message || "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const badge = (status: Status) => {
    if (status === "OPEN") return "border-rose-400/25 bg-rose-400/10 text-rose-100";
    if (status === "WATCH") return "border-amber-400/25 bg-amber-400/10 text-amber-100";
    return "border-emerald-400/25 bg-emerald-400/10 text-emerald-100";
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs tracking-[0.2em] text-white/50">RANKED EVENTS</div>
          <div className="mt-3 text-xl font-semibold text-white/90">
            What's most urgent right now.
          </div>
          <div className="mt-2 text-sm text-white/70">
            Ranked by severity × velocity × confidence (with explainability).
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/evidence-receipts"
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            Receipts →
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
          Loading ranked events…
        </div>
      ) : err ? (
        <div className="mt-6 rounded-2xl border border-rose-400/25 bg-rose-400/10 p-4 text-sm text-rose-100">
          {err}
        </div>
      ) : events.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
          No events yet. Generate receipts and events will appear automatically.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {events.map((e) => (
            <details
              key={e.event_id}
              className="group rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-[280px]">
                    <div className="text-sm font-semibold text-white/90">{e.title}</div>
                    <div className="mt-1 text-[11px] text-white/55">
                      {e.category} • last seen {new Date(e.last_seen_at).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-[11px] ${badge(e.status)}`}>
                      {e.status}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] ${
                        e.confidence_gate === "VERIFIED"
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                          : "border-amber-400/20 bg-amber-400/10 text-amber-100"
                      }`}
                    >
                      {e.confidence_gate}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                      score {e.rank_score}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                      sev {e.severity}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                      vel {e.velocity}
                    </span>
                  </div>
                </div>
              </summary>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] text-white/55">Explainability</div>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    {e.why.slice(0, 6).map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] text-white/55">Linked evidence</div>
                  <div className="mt-2 text-sm text-white/70">
                    Receipts: <span className="text-white/85">{e.receipt_ids.length}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.top_reason_codes.slice(0, 5).map((rc) => (
                      <span
                        key={rc}
                        className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/70"
                      >
                        {rc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}