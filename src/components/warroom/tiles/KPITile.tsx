import { useMemo, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";
import type { TileData } from "../executiveTypes";

export function KPITile({ data }: { data?: TileData }) {
  const [open, setOpen] = useState(false);

  const title = data?.title ?? "Loading…";
  const value = data?.value ?? "—";
  const delta = data?.delta;
  const subtitle = data?.subtitle;
  const receipt = data?.receipt;
  const chartData = data?.chartData;
  const trend = data?.trend;

  const verified = Boolean(receipt?.verified);
  const confidencePct = receipt ? Math.round(receipt.confidence * 100) : null;

  const badge = useMemo(() => {
    if (!receipt) return { text: "NO RECEIPT", cls: "border-zinc-800 text-zinc-300" };
    if (verified) return { text: "VERIFIED", cls: "border-emerald-700/60 text-emerald-300" };
    return { text: "UNVERIFIED", cls: "border-amber-700/60 text-amber-300" };
  }, [receipt, verified]);

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
    return "#71717a";
  };

  const href = data?.key ? `/war-room/${data.key}` : "/war-room";

  return (
    <div className="group relative rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-950/60 to-zinc-900/40 shadow-sm transition-all hover:border-zinc-700/80 hover:shadow-xl hover:shadow-zinc-900/20">
      {/* Chart Background (if available) */}
      {chartData && chartData.length > 0 && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={getChartColor()} stopOpacity={0} />
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

      {/* Clickable Card Content */}
      <Link href={href} className="block p-5 rounded-2xl transition-colors hover:bg-zinc-950/40">
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm text-zinc-400">{title}</div>
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className={`rounded-xl border bg-zinc-950 px-3 py-2 text-xs transition-colors hover:bg-zinc-900 ${badge.cls}`}
              title="View Evidence Receipt"
            >
              {badge.text}
            </button>

            {/* Visual indicator for clickable card */}
            <span className="rounded-xl border border-zinc-800/60 bg-zinc-950 px-3 py-2 text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 group-hover:border-zinc-700">
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
          <div
            onClick={(e) => {
              // Prevent clicks inside drawer from navigating
              e.preventDefault();
              e.stopPropagation();
            }}
            className="relative mt-4 rounded-xl border border-zinc-800/60 bg-zinc-950 p-4 text-sm"
          >
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
      </Link>
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