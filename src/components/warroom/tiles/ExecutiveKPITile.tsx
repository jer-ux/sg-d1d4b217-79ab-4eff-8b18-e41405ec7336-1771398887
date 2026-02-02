import { TrendingUp, TrendingDown, Minus, Shield, AlertTriangle } from "lucide-react";
import type { TileData } from "../executiveTypes";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export function ExecutiveKPITile({ data }: { data?: TileData }) {
  if (!data) {
    return (
      <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6">
        <div className="h-40 animate-pulse rounded-lg bg-zinc-900/50" />
      </div>
    );
  }

  const { title, value, delta, subtitle, updatedAt, receipt, chartData, trend, framework } = data;

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

  const frameworkBadge = (() => {
    if (framework === "McKinsey") return { text: "McKinsey", cls: "border-blue-700/60 bg-blue-950/40 text-blue-300" };
    if (framework === "Bain") return { text: "Bain NPS", cls: "border-violet-700/60 bg-violet-950/40 text-violet-300" };
    return null;
  })();

  return (
    <div className="group relative rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-950/60 to-zinc-900/40 p-6 transition-all hover:border-zinc-700/80 hover:shadow-xl hover:shadow-zinc-900/20">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">{title}</div>
            {frameworkBadge && (
              <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${frameworkBadge.cls}`}>
                {frameworkBadge.text}
              </span>
            )}
          </div>
          <div className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">{value}</div>
          {delta && (
            <div className={`mt-1 flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{delta}</span>
            </div>
          )}
          {subtitle && <div className="mt-1 text-xs text-zinc-500">{subtitle}</div>}
        </div>

        {receipt && (
          <div className="flex items-center gap-1">
            {receipt.verified ? (
              <Shield className="h-5 w-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            )}
          </div>
        )}
      </div>

      {chartData && chartData.length > 0 && (
        <div className="mb-4 h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={trend === "up" ? "#34d399" : trend === "down" ? "#fb7185" : "#71717a"}
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {receipt && (
        <div className="mt-4 space-y-2 border-t border-zinc-800/40 pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Confidence</span>
            <span className={receipt.confidence >= 0.9 ? "font-medium text-emerald-400" : receipt.confidence >= 0.7 ? "font-medium text-amber-400" : "font-medium text-rose-400"}>
              {Math.round(receipt.confidence * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">DQ Tests</span>
            <span className="font-medium text-zinc-300">
              {receipt.dq_tests_passed}/{receipt.dq_tests_total}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Freshness</span>
            <span className="font-medium text-zinc-300">{receipt.freshness_minutes}m ago</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Owner</span>
            <span className="font-medium text-zinc-300">{receipt.owner}</span>
          </div>
          {receipt.notes && (
            <div className="mt-2 rounded-lg bg-zinc-900/60 p-2 text-xs text-zinc-400">
              {receipt.notes}
            </div>
          )}
        </div>
      )}

      {updatedAt && (
        <div className="mt-3 text-xs text-zinc-600">
          Updated {updatedAt}
        </div>
      )}
    </div>
  );
}