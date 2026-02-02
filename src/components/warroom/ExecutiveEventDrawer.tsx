import { X, TrendingUp, AlertTriangle, ShieldAlert, Pill, Users, FileCheck, ExternalLink, CheckCircle2, Clock, Database } from "lucide-react";
import type { ExecutiveEvent } from "./executiveTypes";

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

interface ExecutiveEventDrawerProps {
  event: ExecutiveEvent | null;
  onClose: () => void;
}

export function ExecutiveEventDrawer({ event, onClose }: ExecutiveEventDrawerProps) {
  if (!event) return null;

  const category = CATEGORY_CONFIG[event.category];
  const severity = SEVERITY_CONFIG[event.severity];
  const Icon = category.icon;
  const timestamp = new Date(event.timestamp);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 p-6 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className={`rounded-lg ${category.bg} p-3`}>
                <Icon className={`h-6 w-6 ${category.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${severity.bg} ${severity.color}`}>
                    {severity.label}
                  </span>
                  <span className="text-xs text-zinc-500">{category.label}</span>
                  <span className={`text-xs px-2 py-1 rounded border ${
                    event.framework === "McKinsey" 
                      ? "border-blue-700/60 bg-blue-950/40 text-blue-300" 
                      : "border-violet-700/60 bg-violet-950/40 text-violet-300"
                  }`}>
                    {event.framework}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">{event.title}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-100 transition-colors p-2 hover:bg-zinc-800/60 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-medium text-zinc-100">Event Description</h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">{event.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-medium text-zinc-400">Timestamp</span>
              </div>
              <div className="text-sm text-zinc-100">{timestamp.toLocaleString()}</div>
            </div>

            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium text-zinc-400">Event ID</span>
              </div>
              <div className="text-xs font-mono text-zinc-100">{event.id}</div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-800/60 bg-amber-950/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-medium text-zinc-100">Financial Impact</h3>
            </div>
            <p className="text-base font-semibold text-amber-300">{event.impact}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-medium text-zinc-100">Related KPI</h3>
            </div>
            <p className="text-sm text-zinc-300">{event.kpi}</p>
          </div>

          {event.details && (
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-medium text-zinc-100">Additional Details</h3>
              </div>
              <div className="space-y-3">
                {event.details.root_cause && (
                  <div>
                    <div className="text-xs font-medium text-zinc-400 mb-1">Root Cause</div>
                    <div className="text-sm text-zinc-300">{event.details.root_cause}</div>
                  </div>
                )}
                {event.details.affected_contracts && (
                  <div>
                    <div className="text-xs font-medium text-zinc-400 mb-1">Affected Contracts</div>
                    <div className="flex flex-wrap gap-2">
                      {event.details.affected_contracts.map((contract, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-zinc-800/60 text-zinc-300 font-mono">
                          {contract}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {event.details.recommended_actions && (
                  <div>
                    <div className="text-xs font-medium text-zinc-400 mb-2">Recommended Actions</div>
                    <ul className="space-y-1">
                      {event.details.recommended_actions.map((action, i) => (
                        <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="h-4 w-4" />
              View Full Evidence
            </button>
            <button className="flex-1 px-4 py-3 rounded-lg border border-zinc-700 hover:bg-zinc-800/60 text-zinc-300 text-sm font-medium transition-colors">
              Export Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}