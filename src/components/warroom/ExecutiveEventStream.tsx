import { useMemo, useState } from "react";
import { AlertTriangle, TrendingUp, ShieldAlert, Pill, Users, FileCheck } from "lucide-react";
import type { ExecutiveEvent } from "./executiveTypes";
import { ExecutiveEventDrawer } from "./ExecutiveEventDrawer";

const CATEGORY_CONFIG = {
  cost_trend: {
    icon: TrendingUp,
    label: "Cost Trend",
    color: "text-rose-400",
    bg: "bg-rose-950/40",
    border: "border-rose-800/60",
  },
  contract: {
    icon: FileCheck,
    label: "Contract",
    color: "text-amber-400",
    bg: "bg-amber-950/40",
    border: "border-amber-800/60",
  },
  pharmacy: {
    icon: Pill,
    label: "Pharmacy",
    color: "text-purple-400",
    bg: "bg-purple-950/40",
    border: "border-purple-800/60",
  },
  compliance: {
    icon: ShieldAlert,
    label: "Compliance",
    color: "text-orange-400",
    bg: "bg-orange-950/40",
    border: "border-orange-800/60",
  },
  nps: {
    icon: Users,
    label: "Experience",
    color: "text-blue-400",
    bg: "bg-blue-950/40",
    border: "border-blue-800/60",
  },
  plan_design: {
    icon: TrendingUp,
    label: "Plan Design",
    color: "text-emerald-400",
    bg: "bg-emerald-950/40",
    border: "border-emerald-800/60",
  },
};

const SEVERITY_CONFIG = {
  critical: { label: "CRITICAL", color: "text-rose-400", bg: "bg-rose-950/60" },
  high: { label: "HIGH", color: "text-orange-400", bg: "bg-orange-950/60" },
  medium: { label: "MEDIUM", color: "text-amber-400", bg: "bg-amber-950/60" },
  low: { label: "LOW", color: "text-blue-400", bg: "bg-blue-950/60" },
};

export function ExecutiveEventStream({ events }: { events: ExecutiveEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<ExecutiveEvent | null>(null);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [events]);

  const stats = useMemo(() => {
    const critical = events.filter((e) => e.severity === "critical").length;
    const high = events.filter((e) => e.severity === "high").length;
    const mckinsey = events.filter((e) => e.framework === "McKinsey").length;
    const bain = events.filter((e) => e.framework === "Bain").length;
    return { critical, high, mckinsey, bain };
  }, [events]);

  return (
    <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-950/80 to-zinc-900/60 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Live Event Stream</h2>
          <div className="mt-1 text-xs text-zinc-400">Real-time healthcare cost & compliance events</div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-rose-400 animate-pulse"></div>
            <span className="text-zinc-400">{stats.critical} Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-orange-400"></div>
            <span className="text-zinc-400">{stats.high} High</span>
          </div>
          <div className="text-zinc-500">|</div>
          <div className="text-blue-300">{stats.mckinsey} McKinsey</div>
          <div className="text-violet-300">{stats.bain} Bain</div>
        </div>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
        {sortedEvents.length === 0 && (
          <div className="rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-6 text-center">
            <div className="text-sm text-zinc-400">Waiting for events...</div>
          </div>
        )}
        
        {sortedEvents.map((event) => {
          const category = CATEGORY_CONFIG[event.category];
          const severity = SEVERITY_CONFIG[event.severity];
          const Icon = category.icon;
          const timestamp = new Date(event.timestamp);
          const timeAgo = formatTimeAgo(timestamp);

          return (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`rounded-xl border ${category.border} ${category.bg} p-4 transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-lg ${category.bg} p-2`}>
                  <Icon className={`h-4 w-4 ${category.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${severity.bg} ${severity.color}`}>
                        {severity.label}
                      </span>
                      <span className="text-xs text-zinc-500">{category.label}</span>
                      <span className="text-xs text-zinc-600">•</span>
                      <span className="text-xs text-zinc-500">{timeAgo}</span>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded border ${
                      event.framework === "McKinsey" 
                        ? "border-blue-700/60 bg-blue-950/40 text-blue-300" 
                        : "border-violet-700/60 bg-violet-950/40 text-violet-300"
                    }`}>
                      {event.framework}
                    </div>
                  </div>
                  
                  <div className="text-sm font-medium text-zinc-100 mb-1">{event.title}</div>
                  <div className="text-xs text-zinc-400 mb-2">{event.description}</div>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-zinc-500">
                      <span className="text-zinc-400">Impact:</span> {event.impact}
                    </div>
                    <div className="text-zinc-500">
                      <span className="text-zinc-400">KPI:</span> {event.kpi}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ExecutiveEventDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}