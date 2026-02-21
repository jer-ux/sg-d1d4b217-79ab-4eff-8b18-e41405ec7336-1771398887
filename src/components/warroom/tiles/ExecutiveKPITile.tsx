import { TrendingUp, TrendingDown, Minus, Shield, AlertTriangle } from "lucide-react";
import type { TileData } from "../executiveTypes";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";

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

interface ExecutiveKPITileProps {
  kpi: TileData;
  onClick?: () => void;
}

export function ExecutiveKPITile({ kpi, onClick }: ExecutiveKPITileProps) {
  const { title, value, delta, subtitle, updatedAt, receipt, chartData, trend, framework, key } = kpi;
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

  return (
    <motion.div
      className="group relative cursor-pointer rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-amber-500/40"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* 3D Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${theme.iconBg} blur-3xl`} />
        <div className={`absolute -left-8 -bottom-8 h-32 w-32 rounded-full ${theme.iconBg} blur-3xl`} />
      </div>

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
    </motion.div>
  );
}