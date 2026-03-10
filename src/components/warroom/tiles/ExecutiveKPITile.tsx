import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Minus, Shield, AlertTriangle, Info, Target, BarChart3 } from "lucide-react";
import type { TileData } from "../executiveTypes";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from "recharts";

const TILE_THEMES = {
  costTrendStress: {
    gradient: "from-rose-950/40 via-red-950/30 to-orange-950/20",
    border: "border-rose-800/40 hover:border-rose-700/60",
    glow: "hover:shadow-rose-900/30",
    accent: "#fb7185",
    iconBg: "bg-rose-950/60",
    iconColor: "text-rose-400",
  },
  planDesignAdoption: {
    gradient: "from-emerald-950/40 via-green-950/30 to-teal-950/20",
    border: "border-emerald-800/40 hover:border-emerald-700/60",
    glow: "hover:shadow-emerald-900/30",
    accent: "#34d399",
    iconBg: "bg-emerald-950/60",
    iconColor: "text-emerald-400",
  },
  pharmacyExposure: {
    gradient: "from-purple-950/40 via-violet-950/30 to-fuchsia-950/20",
    border: "border-purple-800/40 hover:border-purple-700/60",
    glow: "hover:shadow-purple-900/30",
    accent: "#c084fc",
    iconBg: "bg-purple-950/60",
    iconColor: "text-purple-400",
  },
  contractLeakage: {
    gradient: "from-amber-950/40 via-yellow-950/30 to-orange-950/20",
    border: "border-amber-800/40 hover:border-amber-700/60",
    glow: "hover:shadow-amber-900/30",
    accent: "#fbbf24",
    iconBg: "bg-amber-950/60",
    iconColor: "text-amber-400",
  },
  contractAmbiguity: {
    gradient: "from-orange-950/40 via-red-950/30 to-rose-950/20",
    border: "border-orange-800/40 hover:border-orange-700/60",
    glow: "hover:shadow-orange-900/30",
    accent: "#fb923c",
    iconBg: "bg-orange-950/60",
    iconColor: "text-orange-400",
  },
  contractCompliance: {
    gradient: "from-blue-950/40 via-cyan-950/30 to-sky-950/20",
    border: "border-blue-800/40 hover:border-blue-700/60",
    glow: "hover:shadow-blue-900/30",
    accent: "#60a5fa",
    iconBg: "bg-blue-950/60",
    iconColor: "text-blue-400",
  },
  benefitsNPS: {
    gradient: "from-violet-950/40 via-purple-950/30 to-indigo-950/20",
    border: "border-violet-800/40 hover:border-violet-700/60",
    glow: "hover:shadow-violet-900/30",
    accent: "#a78bfa",
    iconBg: "bg-violet-950/60",
    iconColor: "text-violet-400",
  },
  employeeNPS: {
    gradient: "from-cyan-950/40 via-teal-950/30 to-emerald-950/20",
    border: "border-cyan-800/40 hover:border-cyan-700/60",
    glow: "hover:shadow-cyan-900/30",
    accent: "#22d3ee",
    iconBg: "bg-cyan-950/60",
    iconColor: "text-cyan-400",
  },
};

// Detailed hover data for Executive tiles
const EXECUTIVE_DETAILS = {
  costTrendStress: {
    title: "Cost Trend Deep Dive",
    metrics: [
      { label: "Projected Annual Impact", value: "$12.4M", status: "danger" },
      { label: "Risk Probability", value: "87%", status: "danger" },
      { label: "Mitigation Potential", value: "$4.8M", status: "warning" },
      { label: "Board Escalation", value: "Required", status: "danger" },
    ],
    insights: [
      "Immediate action required to prevent Q3 budget overrun",
      "Stop-loss carrier reviewing rates for renewal",
      "CFO briefing scheduled for detailed mitigation plan",
    ],
    actionItems: [
      "Review specialty drug management program",
      "Evaluate high-cost claimant strategies",
      "Consider plan design modifications for 2027",
    ],
  },
  planDesignAdoption: {
    title: "Plan Design Performance",
    metrics: [
      { label: "ROI Achievement", value: "142%", status: "success" },
      { label: "Target Enrollment", value: "103%", status: "success" },
      { label: "Cost Avoidance", value: "$5.2M", status: "success" },
      { label: "Member Satisfaction", value: "4.6/5", status: "success" },
    ],
    insights: [
      "Plan design changes exceeding all success metrics",
      "HDHP adoption driving significant savings",
      "HSA participation at industry-leading levels",
    ],
    actionItems: [
      "Expand wellness incentive programs",
      "Consider additional HDHP options for 2027",
      "Document success for board presentation",
    ],
  },
  pharmacyExposure: {
    title: "Pharmacy Cost Analysis",
    metrics: [
      { label: "Exposure Growth", value: "+41%", status: "danger" },
      { label: "Specialty Drug Impact", value: "$8.3M", status: "danger" },
      { label: "Formulary Adherence", value: "82%", status: "warning" },
      { label: "Prior Auth Savings", value: "$1.9M", status: "success" },
    ],
    insights: [
      "Specialty pharmacy driving unprecedented cost growth",
      "GLP-1 and oncology drugs major contributors",
      "PBM contract renegotiation recommended for 2026",
    ],
    actionItems: [
      "Implement enhanced formulary controls",
      "Evaluate specialty pharmacy carve-out",
      "Review alternative funding arrangements",
    ],
  },
  contractLeakage: {
    title: "Revenue Recovery Opportunities",
    metrics: [
      { label: "Total Leakage Identified", value: "$2.8M", status: "danger" },
      { label: "Recoverable Amount", value: "$2.1M", status: "warning" },
      { label: "Average Recovery Time", value: "18 days", status: "warning" },
      { label: "Vendor Compliance", value: "76%", status: "warning" },
    ],
    insights: [
      "Significant opportunity for cash recovery identified",
      "Rebate reconciliation errors most common issue",
      "Administrative fee discrepancies in 15 contracts",
    ],
    actionItems: [
      "Initiate vendor recovery negotiations",
      "Implement automated contract monitoring",
      "Consider legal action for non-compliant vendors",
    ],
  },
  contractAmbiguity: {
    title: "Contract Risk Assessment",
    metrics: [
      { label: "Exposure Value", value: "$4.2M", status: "danger" },
      { label: "High-Risk Clauses", value: "23", status: "danger" },
      { label: "Legal Review Status", value: "In Progress", status: "warning" },
      { label: "Resolution Timeline", value: "45 days", status: "warning" },
    ],
    insights: [
      "Critical contract language deficiencies identified",
      "Potential disputes could impact vendor relationships",
      "Legal recommends immediate remediation",
    ],
    actionItems: [
      "Schedule vendor negotiation meetings",
      "Develop standardized contract templates",
      "Implement contract approval workflow",
    ],
  },
  contractCompliance: {
    title: "Compliance Performance",
    metrics: [
      { label: "Overall Score", value: "94/100", status: "success" },
      { label: "Audit Readiness", value: "97%", status: "success" },
      { label: "SLA Achievement", value: "100%", status: "success" },
      { label: "Documentation", value: "Complete", status: "success" },
    ],
    insights: [
      "Industry-leading compliance performance",
      "All critical vendor SLAs met consistently",
      "HIPAA audit preparation ahead of schedule",
    ],
    actionItems: [
      "Continue quarterly compliance reviews",
      "Share best practices with peer organizations",
      "Maintain documentation standards",
    ],
  },
  benefitsNPS: {
    title: "Benefits Sentiment Analysis",
    metrics: [
      { label: "NPS Trend", value: "+12 pts YoY", status: "success" },
      { label: "Promoter Growth", value: "+8%", status: "success" },
      { label: "Detractor Reduction", value: "-4%", status: "success" },
      { label: "Engagement Rate", value: "89%", status: "success" },
    ],
    insights: [
      "Benefits program driving employee satisfaction",
      "Mental health benefits highest rated feature",
      "Virtual care adoption correlates with positive NPS",
    ],
    actionItems: [
      "Expand mental health provider network",
      "Enhance benefits communication strategy",
      "Launch targeted campaigns for high-value services",
    ],
  },
  employeeNPS: {
    title: "Employee Experience Metrics",
    metrics: [
      { label: "Overall NPS", value: "+38", status: "success" },
      { label: "Response Rate", value: "72%", status: "success" },
      { label: "Trust Score", value: "8.1/10", status: "success" },
      { label: "Benefit Awareness", value: "84%", status: "success" },
    ],
    insights: [
      "Strong employee satisfaction with benefits program",
      "Healthcare benefits top driver of employer loyalty",
      "Cost transparency initiatives well-received",
    ],
    actionItems: [
      "Continue quarterly pulse surveys",
      "Enhance benefits education programs",
      "Recognize high-performing benefits team",
    ],
  },
};

export function ExecutiveKPITile({ data }: { data?: TileData }) {
  const [showHoverDetails, setShowHoverDetails] = useState(false);

  const tileKey = data?.key;

  const details = useMemo(() => {
    if (tileKey && tileKey in EXECUTIVE_DETAILS) {
      return EXECUTIVE_DETAILS[tileKey as keyof typeof EXECUTIVE_DETAILS];
    }
    return null;
  }, [tileKey]);

  if (!data) {
    return (
      <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6">
        <div className="h-40 animate-pulse rounded-lg bg-zinc-900/50" />
      </div>
    );
  }

  const { title, value, delta, subtitle, updatedAt, receipt, chartData, trend, framework, key } = data;
  const theme = TILE_THEMES[key as keyof typeof TILE_THEMES] || TILE_THEMES.costTrendStress;

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-4 w-4" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-emerald-400";
    if (trend === "down") return "text-rose-400";
    return "text-zinc-500";
  };

  const frameworkBadge = (() => {
    if (framework === "McKinsey") return { text: "McKinsey", cls: "border-blue-700/60 bg-blue-950/40 text-blue-300" };
    if (framework === "Bain") return { text: "Bain NPS", cls: "border-violet-700/60 bg-violet-950/40 text-violet-300" };
    return null;
  })();

  const getStatusColor = (status?: string) => {
    if (status === "success") return "text-emerald-400";
    if (status === "warning") return "text-amber-400";
    if (status === "danger") return "text-rose-400";
    return "text-zinc-400";
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.gradient} p-6 transition-all hover:shadow-2xl ${theme.glow} backdrop-blur-sm`}
      onMouseEnter={() => setShowHoverDetails(true)}
      onMouseLeave={() => setShowHoverDetails(false)}
    >
      {/* 3D Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${theme.iconBg} blur-3xl`} />
        <div className={`absolute -left-8 -bottom-8 h-32 w-32 rounded-full ${theme.iconBg} blur-3xl`} />
      </div>

      {/* Hover Details Overlay */}
      {showHoverDetails && details && (
        <div className="absolute inset-0 z-20 flex flex-col overflow-y-auto rounded-2xl border border-zinc-700/80 bg-zinc-950/98 p-6 backdrop-blur-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <h3 className="text-sm font-semibold text-zinc-100">{details.title}</h3>
            <BarChart3 className="h-4 w-4 text-zinc-400" />
          </div>

          {/* Executive Metrics Grid */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            {details.metrics.map((metric, i) => (
              <div key={i} className="rounded-lg border border-zinc-800/40 bg-zinc-900/60 p-3">
                <div className="text-xs text-zinc-500">{metric.label}</div>
                <div className={`mt-1 text-base font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Executive Insights */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Info className="h-3 w-3" />
              <span>Executive Summary</span>
            </div>
            <div className="space-y-2">
              {details.insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg border border-zinc-800/40 bg-zinc-900/40 p-2 text-xs text-zinc-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Target className="h-3 w-3" />
              <span>Recommended Actions</span>
            </div>
            <div className="space-y-1.5">
              {details.actionItems.map((action, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-sm bg-emerald-500" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-zinc-800/60 pt-3 text-center text-xs text-zinc-500">
            Hover off to return to summary view
          </div>
        </div>
      )}

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs font-medium uppercase tracking-wide text-zinc-300">{title}</div>
              {frameworkBadge && (
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${frameworkBadge.cls}`}>
                  {frameworkBadge.text}
                </span>
              )}
            </div>
            <div className="mt-3 text-4xl font-bold tracking-tight text-white drop-shadow-lg">{value}</div>
            {delta && (
              <div className={`mt-2 flex items-center gap-1.5 text-sm font-semibold ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{delta}</span>
              </div>
            )}
            {subtitle && <div className="mt-2 text-xs font-medium text-zinc-400">{subtitle}</div>}
          </div>

          {receipt && (
            <div className={`flex items-center justify-center rounded-xl ${theme.iconBg} p-3 backdrop-blur-sm`}>
              {receipt.verified ? (
                <Shield className={`h-6 w-6 ${theme.iconColor}`} />
              ) : (
                <AlertTriangle className="h-6 w-6 text-amber-400" />
              )}
            </div>
          )}
        </div>

        {chartData && chartData.length > 0 && (
          <div className="mb-4 h-24 w-full rounded-lg bg-zinc-950/40 p-2 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={theme.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={theme.accent}
                  strokeWidth={2.5}
                  fill={`url(#gradient-${key})`}
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {receipt && (
          <div className="mt-4 space-y-2 rounded-xl border border-zinc-800/40 bg-zinc-950/60 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-400">Confidence</span>
              <span className={receipt.confidence >= 0.9 ? "font-bold text-emerald-400" : receipt.confidence >= 0.7 ? "font-bold text-amber-400" : "font-bold text-rose-400"}>
                {Math.round(receipt.confidence * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-400">DQ Tests</span>
              <span className="font-bold text-zinc-200">
                {receipt.dq_tests_passed}/{receipt.dq_tests_total}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-400">Freshness</span>
              <span className="font-bold text-zinc-200">{receipt.freshness_minutes}m ago</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-400">Owner</span>
              <span className="font-bold text-zinc-200">{receipt.owner}</span>
            </div>
            {receipt.notes && (
              <div className="mt-3 rounded-lg border border-zinc-800/40 bg-zinc-900/80 p-3 text-xs leading-relaxed text-zinc-300">
                {receipt.notes}
              </div>
            )}
          </div>
        )}

        {updatedAt && (
          <div className="mt-3 text-xs font-medium text-zinc-500">
            Updated {updatedAt}
          </div>
        )}
      </div>
    </div>
  );
}