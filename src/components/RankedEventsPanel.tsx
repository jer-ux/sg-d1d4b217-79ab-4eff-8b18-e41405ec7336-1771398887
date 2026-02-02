import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown, AlertTriangle, CheckCircle, Eye, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Gate = "VERIFIED" | "UNVERIFIED";
type Status = "OPEN" | "WATCH" | "RESOLVED";
type SortBy = "rank_score" | "severity" | "velocity" | "last_seen_at";

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
  
  // Filters & Sort
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [gateFilter, setGateFilter] = useState<Gate | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortBy>("rank_score");
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch("/api/war-room/events?limit=50&recent=180&prior=1440");
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

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.top_reason_codes.some((rc) => rc.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    // Gate filter
    if (gateFilter !== "ALL") {
      filtered = filtered.filter((e) => e.confidence_gate === gateFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      if (sortBy === "rank_score") {
        aVal = a.rank_score;
        bVal = b.rank_score;
      } else if (sortBy === "severity") {
        aVal = a.severity;
        bVal = b.severity;
      } else if (sortBy === "velocity") {
        aVal = a.velocity;
        bVal = b.velocity;
      } else if (sortBy === "last_seen_at") {
        aVal = new Date(a.last_seen_at).getTime();
        bVal = new Date(b.last_seen_at).getTime();
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDesc ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });

    return filtered;
  }, [events, searchQuery, statusFilter, gateFilter, sortBy, sortDesc]);

  const badge = (status: Status) => {
    if (status === "OPEN") return "border-rose-400/30 bg-rose-500/15 text-rose-100";
    if (status === "WATCH") return "border-amber-400/30 bg-amber-500/15 text-amber-100";
    return "border-emerald-400/30 bg-emerald-500/15 text-emerald-100";
  };

  const statusIcon = (status: Status) => {
    if (status === "OPEN") return <AlertTriangle className="h-3.5 w-3.5" />;
    if (status === "WATCH") return <Eye className="h-3.5 w-3.5" />;
    return <CheckCircle className="h-3.5 w-3.5" />;
  };

  const stats = useMemo(() => {
    const open = events.filter((e) => e.status === "OPEN").length;
    const watch = events.filter((e) => e.status === "WATCH").length;
    const verified = events.filter((e) => e.confidence_gate === "VERIFIED").length;
    return { open, watch, verified, total: events.length };
  }, [events]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <div className="text-xs font-medium tracking-[0.2em] text-white/50">RANKED EVENTS</div>
          </div>
          <div className="mt-3 text-2xl font-semibold text-white/95">
            What's most urgent right now
          </div>
          <div className="mt-2 text-sm text-white/60">
            Ranked by severity × velocity × confidence with full explainability
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/evidence-receipts"
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            View Receipts →
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      {!loading && !err && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="text-xs text-white/50">Total Events</div>
            <div className="mt-1 text-2xl font-semibold text-white/90">{stats.total}</div>
          </div>
          <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-3">
            <div className="text-xs text-rose-200/70">Open</div>
            <div className="mt-1 text-2xl font-semibold text-rose-100">{stats.open}</div>
          </div>
          <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-3">
            <div className="text-xs text-amber-200/70">Watching</div>
            <div className="mt-1 text-2xl font-semibold text-amber-100">{stats.watch}</div>
          </div>
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3">
            <div className="text-xs text-emerald-200/70">Verified</div>
            <div className="mt-1 text-2xl font-semibold text-emerald-100">{stats.verified}</div>
          </div>
        </motion.div>
      )}

      {/* Search & Filters */}
      {!loading && !err && events.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-6 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              type="text"
              placeholder="Search events, categories, or reason codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-xl border-white/10 bg-black/40 pl-10 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-white/40" />
              <span className="text-xs font-medium text-white/50">Status:</span>
            </div>
            {(["ALL", "OPEN", "WATCH", "RESOLVED"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  statusFilter === s
                    ? "border-blue-400/40 bg-blue-500/20 text-blue-100"
                    : "border-white/10 bg-black/30 text-white/60 hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            ))}

            <div className="mx-2 h-4 w-px bg-white/10" />

            <span className="text-xs font-medium text-white/50">Gate:</span>
            {(["ALL", "VERIFIED", "UNVERIFIED"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGateFilter(g)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  gateFilter === g
                    ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-100"
                    : "border-white/10 bg-black/30 text-white/60 hover:bg-white/5"
                }`}
              >
                {g}
              </button>
            ))}

            <div className="mx-2 h-4 w-px bg-white/10" />

            {/* Sort */}
            <button
              onClick={() => setSortDesc(!sortDesc)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70 transition-all hover:bg-white/5"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {sortDesc ? "Desc" : "Asc"}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70 transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="rank_score">Rank Score</option>
              <option value="severity">Severity</option>
              <option value="velocity">Velocity</option>
              <option value="last_seen_at">Last Seen</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Content */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 text-center"
        >
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
          <div className="mt-3 text-sm text-white/60">Loading ranked events…</div>
        </motion.div>
      ) : err ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 text-center"
        >
          <AlertTriangle className="mx-auto h-8 w-8 text-rose-300" />
          <div className="mt-3 text-sm font-medium text-rose-100">{err}</div>
        </motion.div>
      ) : filteredEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-8 text-center"
        >
          <div className="text-sm text-white/60">
            {searchQuery || statusFilter !== "ALL" || gateFilter !== "ALL"
              ? "No events match your filters. Try adjusting your search criteria."
              : "No events yet. Generate receipts and events will appear automatically."}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-6 space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((e, idx) => (
              <motion.details
                key={e.event_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm transition-all hover:border-white/20"
              >
                <summary className="cursor-pointer list-none px-5 py-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: Title & Meta */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                          <TrendingUp className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-base font-semibold text-white/95">{e.title}</div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/50">
                            <span>{e.category}</span>
                            <span>•</span>
                            <span>Last seen {new Date(e.last_seen_at).toLocaleString()}</span>
                            <span>•</span>
                            <span>{e.receipt_ids.length} receipts</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${badge(e.status)}`}>
                        {statusIcon(e.status)}
                        {e.status}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                          e.confidence_gate === "VERIFIED"
                            ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-100"
                            : "border-amber-400/30 bg-amber-500/15 text-amber-100"
                        }`}
                      >
                        {e.confidence_gate}
                      </span>
                      <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-100">
                        {e.rank_score.toFixed(1)}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                        S:{e.severity}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                        V:{e.velocity}
                      </span>
                    </div>
                  </div>
                </summary>

                {/* Expanded Content */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-white/10 px-5 pb-5 pt-4"
                >
                  <div className="grid gap-4 lg:grid-cols-2">
                    {/* Explainability */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                          Explainability
                        </div>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {e.why.slice(0, 6).map((reason, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            className="flex gap-2.5 text-sm text-white/75"
                          >
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-white/40" />
                            <span>{reason}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Linked Evidence */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                          Linked Evidence
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-white/75">
                        <span className="text-white/50">Receipts:</span>{" "}
                        <span className="font-semibold text-white/90">{e.receipt_ids.length}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {e.top_reason_codes.slice(0, 6).map((rc, i) => (
                          <motion.span
                            key={rc}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-white/70"
                          >
                            {rc}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.details>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}