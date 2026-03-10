import { useMemo, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Shield, AlertTriangle, Info, BarChart3, Calendar, Target } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart, Tooltip } from "recharts";
import type { TileData } from "../executiveTypes";

const TILE_THEMES = {
  costTrendStress: {
    gradient: "from-red-950/80 via-rose-950/60 to-zinc-900/40",
    border: "border-red-800/40",
    orb: "bg-red-500/20",
    glow: "shadow-red-900/20",
    accent: "#ef4444",
  },
  planDesignAdoption: {
    gradient: "from-emerald-950/80 via-green-950/60 to-zinc-900/40",
    border: "border-emerald-800/40",
    orb: "bg-emerald-500/20",
    glow: "shadow-emerald-900/20",
    accent: "#10b981",
  },
  pharmacyExposure: {
    gradient: "from-purple-950/80 via-violet-950/60 to-zinc-900/40",
    border: "border-purple-800/40",
    orb: "bg-purple-500/20",
    glow: "shadow-purple-900/20",
    accent: "#a855f7",
  },
  contractLeakage: {
    gradient: "from-amber-950/80 via-yellow-950/60 to-zinc-900/40",
    border: "border-amber-800/40",
    orb: "bg-amber-500/20",
    glow: "shadow-amber-900/20",
    accent: "#f59e0b",
  },
  contractAmbiguity: {
    gradient: "from-orange-950/80 via-red-950/60 to-zinc-900/40",
    border: "border-orange-800/40",
    orb: "bg-orange-500/20",
    glow: "shadow-orange-900/20",
    accent: "#f97316",
  },
  contractCompliance: {
    gradient: "from-blue-950/80 via-cyan-950/60 to-zinc-900/40",
    border: "border-blue-800/40",
    orb: "bg-blue-500/20",
    glow: "shadow-blue-900/20",
    accent: "#3b82f6",
  },
  benefitsNPS: {
    gradient: "from-violet-950/80 via-indigo-950/60 to-zinc-900/40",
    border: "border-violet-800/40",
    orb: "bg-violet-500/20",
    glow: "shadow-violet-900/20",
    accent: "#8b5cf6",
  },
  employeeNPS: {
    gradient: "from-cyan-950/80 via-teal-950/60 to-zinc-900/40",
    border: "border-cyan-800/40",
    orb: "bg-cyan-500/20",
    glow: "shadow-cyan-900/20",
    accent: "#06b6d4",
  },
};

// Detailed view data for each tile type
const TILE_DETAILS = {
  costTrendStress: {
    title: "Cost Trend Stress Analysis",
    metrics: [
      { label: "Monthly Trend", value: "+2.3%", status: "warning" },
      { label: "Quarterly Variance", value: "-$1.2M", status: "danger" },
      { label: "Risk Score", value: "7.8/10", status: "danger" },
      { label: "Forecast Accuracy", value: "94%", status: "success" },
    ],
    insights: [
      "Pharmaceutical costs increasing 18% faster than expected",
      "Stop-loss threshold projected to breach in Q3 2026",
      "High-cost claimants up 34% YoY",
    ],
  },
  planDesignAdoption: {
    title: "Plan Design Adoption Metrics",
    metrics: [
      { label: "Adoption Rate", value: "87%", status: "success" },
      { label: "Engagement Score", value: "8.2/10", status: "success" },
      { label: "Cost Savings", value: "$3.4M", status: "success" },
      { label: "Member Satisfaction", value: "91%", status: "success" },
    ],
    insights: [
      "HDHP adoption exceeding targets by 12%",
      "HSA contributions up 45% from prior year",
      "Preventive care utilization improved 28%",
    ],
  },
  pharmacyExposure: {
    title: "Pharmacy Exposure Analysis",
    metrics: [
      { label: "Specialty Drug %", value: "32%", status: "warning" },
      { label: "Generic Fill Rate", value: "78%", status: "warning" },
      { label: "Cost Per Script", value: "$147", status: "danger" },
      { label: "Formulary Compliance", value: "82%", status: "warning" },
    ],
    insights: [
      "Specialty pharmacy costs up 41% YoY",
      "GLP-1 drugs driving $2.1M annual increase",
      "Prior authorization saves averaging $890 per approval",
    ],
  },
  contractLeakage: {
    title: "Contract Leakage Detection",
    metrics: [
      { label: "Leakage Amount", value: "$2.8M", status: "danger" },
      { label: "Recovery Rate", value: "23%", status: "warning" },
      { label: "Open Issues", value: "47", status: "warning" },
      { label: "Avg Resolution Time", value: "18 days", status: "warning" },
    ],
    insights: [
      "Rebate reconciliation gaps found in 15 contracts",
      "Administrative fee overcharges detected: $320K",
      "Performance guarantee shortfalls totaling $1.1M",
    ],
  },
  contractAmbiguity: {
    title: "Contract Ambiguity Risk",
    metrics: [
      { label: "Ambiguous Clauses", value: "23", status: "danger" },
      { label: "Risk Exposure", value: "$4.2M", status: "danger" },
      { label: "Dispute Likelihood", value: "68%", status: "warning" },
      { label: "Clarity Score", value: "6.1/10", status: "warning" },
    ],
    insights: [
      "Pricing methodology unclear in 8 vendor contracts",
      "Termination clauses conflict across 5 agreements",
      "SLA definitions need standardization",
    ],
  },
  contractCompliance: {
    title: "Contract Compliance Status",
    metrics: [
      { label: "Compliance Rate", value: "94%", status: "success" },
      { label: "Violations", value: "3", status: "warning" },
      { label: "Audit Score", value: "A-", status: "success" },
      { label: "Documentation", value: "98%", status: "success" },
    ],
    insights: [
      "All critical SLAs met for 11 consecutive months",
      "Vendor reporting compliance improved 22%",
      "HIPAA audit readiness at 97%",
    ],
  },
  benefitsNPS: {
    title: "Benefits Net Promoter Score",
    metrics: [
      { label: "Current NPS", value: "+42", status: "success" },
      { label: "Promoters", value: "56%", status: "success" },
      { label: "Detractors", value: "14%", status: "success" },
      { label: "Trend vs Q1", value: "+8 pts", status: "success" },
    ],
    insights: [
      "Mental health benefits driving positive sentiment",
      "Virtual care adoption correlates with higher NPS",
      "Benefits portal redesign improved satisfaction 18%",
    ],
  },
  employeeNPS: {
    title: "Employee Net Promoter Score",
    metrics: [
      { label: "Current NPS", value: "+38", status: "success" },
      { label: "Response Rate", value: "72%", status: "success" },
      { label: "Trend vs Prior", value: "+5 pts", status: "success" },
      { label: "Engagement Index", value: "8.1/10", status: "success" },
    ],
    insights: [
      "Overall employee satisfaction up 12%",
      "Healthcare benefits rated #1 satisfaction driver",
      "Cost transparency initiatives well-received",
    ],
  },
};

export function KPITile({ data, onClick }: { data?: TileData; onClick?: (tile: TileData) => void }) {
  const [open, setOpen] = useState(false);
  const [showHoverDetails, setShowHoverDetails] = useState(false);

  // Extract necessary props for hooks safely
  const tileKey = data?.key;
  const receipt = data?.receipt;
  const verified = Boolean(receipt?.verified);
  const framework = data?.framework;
  const trend = data?.trend;

  // Hooks must be called unconditionally
  const theme = useMemo(() => {
    if (tileKey && tileKey in TILE_THEMES) {
      return TILE_THEMES[tileKey as keyof typeof TILE_THEMES];
    }
    return {
      gradient: "from-zinc-950/60 to-zinc-900/40",
      border: "border-zinc-800/60",
      orb: "bg-zinc-500/20",
      glow: "shadow-zinc-900/20",
      accent: "#71717a",
    };
  }, [tileKey]);

  const badge = useMemo(() => {
    if (!receipt) return { text: "NO RECEIPT", cls: "border-zinc-800 text-zinc-300" };
    if (verified) return { text: "VERIFIED", cls: "border-emerald-700/60 text-emerald-300" };
    return { text: "UNVERIFIED", cls: "border-amber-700/60 text-amber-300" };
  }, [receipt, verified]);

  const frameworkBadge = useMemo(() => {
    if (framework === "McKinsey") return { text: "McKinsey", cls: "border-blue-700/60 bg-blue-950/40 text-blue-300" };
    if (framework === "Bain") return { text: "Bain NPS", cls: "border-violet-700/60 bg-violet-950/40 text-violet-300" };
    return null;
  }, [framework]);

  const details = useMemo(() => {
    if (tileKey && tileKey in TILE_DETAILS) {
      return TILE_DETAILS[tileKey as keyof typeof TILE_DETAILS];
    }
    return null;
  }, [tileKey]);

  // Loading state check AFTER hooks
  if (!data) {
    return (
      <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6">
        <div className="h-40 animate-pulse rounded-lg bg-zinc-900/50" />
      </div>
    );
  }

  // Extract rest of data for rendering
  const { title, value, delta, subtitle, chartData = [] } = data;
  const confidencePct = receipt ? Math.round(receipt.confidence * 100) : null;

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-400" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-rose-400" />;
    return <Minus className="h-4 w-4 text-zinc-500" />;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-emerald-400";
    if (trend === "down") return "text-rose-400";
    return "text-zinc-500";
  };

  const getChartColor = () => {
    if (trend === "up") return "#34d399";
    if (trend === "down") return "#fb7185";
    return theme.accent;
  };

  const getStatusColor = (status?: string) => {
    if (status === "success") return "text-emerald-400";
    if (status === "warning") return "text-amber-400";
    if (status === "danger") return "text-rose-400";
    return "text-zinc-400";
  };

  const href = data?.key ? `/war-room/${data.key}` : "/war-room";

  return (
    <div
      onClick={(e) => {
        // Only prevent click if clicking the receipt toggle button
        const target = e.target as HTMLElement;
        const isReceiptButton = target.closest('[data-receipt-toggle]');
        if (!isReceiptButton && onClick) {
          onClick(data);
        }
      }}
      onMouseEnter={() => setShowHoverDetails(true)}
      onMouseLeave={() => setShowHoverDetails(false)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick(data);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
      className={`group relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.gradient} p-6 text-left transition-all hover:shadow-2xl ${theme.glow} backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
    >
      {/* 3D Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className={`absolute -top-20 -right-20 h-40 w-40 ${theme.orb} blur-3xl opacity-30 animate-pulse`} />
        <div className={`absolute -bottom-20 -left-20 h-40 w-40 ${theme.orb} blur-3xl opacity-20 animate-pulse`} style={{ animationDelay: "1s" }} />
      </div>

      {/* Chart Background (if available) */}
      {chartData && chartData.length > 0 && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.accent} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={theme.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill={`url(#gradient-${title})`}
                animationDuration={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Hover Details Overlay */}
      {showHoverDetails && details && (
        <div className="absolute inset-0 z-10 flex flex-col rounded-2xl border border-zinc-700/80 bg-zinc-950/98 p-6 backdrop-blur-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <h3 className="text-sm font-semibold text-zinc-100">{details.title}</h3>
            <Info className="h-4 w-4 text-zinc-400" />
          </div>

          {/* Key Metrics Grid */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            {details.metrics.map((metric, i) => (
              <div key={i} className="rounded-lg border border-zinc-800/40 bg-zinc-900/40 p-3">
                <div className="text-xs text-zinc-500">{metric.label}</div>
                <div className={`mt-1 text-lg font-semibold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Target className="h-3 w-3" />
              <span>Key Insights</span>
            </div>
            {details.insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-xs text-zinc-500">
            Click tile for full analysis
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="relative">
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-sm text-zinc-400">{title}</div>
              {frameworkBadge && (
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${frameworkBadge.cls}`}>
                  {frameworkBadge.text}
                </span>
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <div className="text-3xl font-semibold tracking-tight text-zinc-100">{value}</div>
              {delta && (
                <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span>{delta}</span>
                </div>
              )}
            </div>

            {subtitle && <div className="mt-2 text-sm text-zinc-400">{subtitle}</div>}
          </div>

          <div className="shrink-0 flex flex-col gap-2 items-end">
            {/* Receipt toggle (stops navigation) */}
            <button
              data-receipt-toggle
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className={`rounded-xl border bg-zinc-950/80 backdrop-blur-sm px-3 py-2 text-xs transition-colors hover:bg-zinc-900 ${badge.cls}`}
              title="View Evidence Receipt"
            >
              {badge.text}
            </button>

            {/* Visual indicator for clickable card */}
            <span className="rounded-xl border border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm px-3 py-2 text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 group-hover:border-zinc-700">
              Details →
            </span>
          </div>
        </div>

        {/* Sparkline Chart */}
        {chartData && chartData.length > 0 && (
          <div className="relative mt-4 h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={getChartColor()}
                  strokeWidth={2}
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
              <span>{chartData[0]?.period}</span>
              <span>Trend</span>
              <span>{chartData[chartData.length - 1]?.period}</span>
            </div>
          </div>
        )}

        {/* Evidence Receipt Drawer */}
        {open && (
          <div className="relative mt-4 rounded-xl border border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm p-4 text-sm">
            <div className="mb-3 flex items-center justify-between border-b border-zinc-800/40 pb-2">
              <div className="text-xs font-medium text-zinc-400">Evidence Receipt</div>
              {receipt && (
                <div className="text-xs text-zinc-500">
                  Confidence:{" "}
                  <span
                    className={
                      confidencePct && confidencePct >= 90
                        ? "font-medium text-emerald-400"
                        : confidencePct && confidencePct >= 70
                        ? "font-medium text-amber-400"
                        : "font-medium text-rose-400"
                    }
                  >
                    {confidencePct}%
                  </span>
                </div>
              )}
            </div>

            {!receipt ? (
              <div className="text-zinc-400">No receipt available yet.</div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field k="Receipt ID" v={receipt.receipt_id} mono />
                <Field k="Owner" v={receipt.owner} />
                <Field k="Freshness" v={`${receipt.freshness_minutes} min ago`} />
                <Field
                  k="DQ Tests"
                  v={`${receipt.dq_tests_passed}/${receipt.dq_tests_total}`}
                  highlight={receipt.dq_tests_passed === receipt.dq_tests_total}
                />
                <Field k="Source Hash" v={receipt.source_artifact_hash} mono truncate />
                <Field k="Transform Hash" v={receipt.transform_hash} mono truncate />
                {receipt.notes && (
                  <div className="col-span-full">
                    <Field k="Notes" v={receipt.notes} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  k,
  v,
  mono,
  truncate,
  highlight,
}: {
  k: string;
  v: string;
  mono?: boolean;
  truncate?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs text-zinc-500">{k}</div>
      <div
        className={`text-xs ${
          highlight ? "font-medium text-emerald-400" : "text-zinc-200"
        } ${mono ? "font-mono" : ""} ${truncate ? "max-w-[65%] truncate" : ""}`}
        title={truncate ? v : undefined}
      >
        {v}
      </div>
    </div>
  );
}