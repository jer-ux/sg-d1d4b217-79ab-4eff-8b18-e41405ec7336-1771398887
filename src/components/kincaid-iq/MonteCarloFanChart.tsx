import { Info, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { useState } from "react";
import type { FanChartDataPoint } from "@/lib/kincaid-iq/monteCarlo";

type Props = {
  data: FanChartDataPoint[];
  title?: string;
};

export function MonteCarloFanChart({ data, title = "Probabilistic Cost Projections" }: Props) {
  const [showMethodology, setShowMethodology] = useState(false);

  // Format data for Recharts
  const chartData = data.map(point => ({
    year: `Year ${point.year}`,
    Baseline: point.baseline,
    "Median (P50)": point.p50,
    "75th Percentile": point.p75,
    "90th Percentile": point.p90,
    "95th Percentile": point.p95,
  }));

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">
            5,000 Monte Carlo simulations | Log-normal distribution
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMethodology(!showMethodology)}
          className="text-purple-400 hover:text-purple-300"
        >
          <Info className="h-4 w-4" />
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id="p95Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="p90Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="p75Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" stroke="#94a3b8" />
          <YAxis
            stroke="#94a3b8"
            tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          />
          <Legend />

          {/* Confidence bands */}
          <Area
            type="monotone"
            dataKey="95th Percentile"
            stroke="#ef4444"
            fill="url(#p95Gradient)"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="90th Percentile"
            stroke="#f59e0b"
            fill="url(#p90Gradient)"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="75th Percentile"
            stroke="#10b981"
            fill="url(#p75Gradient)"
            strokeWidth={1}
          />

          {/* Key lines */}
          <Line
            type="monotone"
            dataKey="Median (P50)"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Baseline"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#94a3b8", r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Risk Interpretation */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-4">
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">P50 (Median)</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            ${(data[data.length - 1]?.p50 || 0).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">50% probability below this</p>
        </div>

        <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-semibold">P90 (High Risk)</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            ${(data[data.length - 1]?.p90 || 0).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">10% probability above this</p>
        </div>

        <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-semibold">P95 (Extreme)</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            ${(data[data.length - 1]?.p95 || 0).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">5% probability above this</p>
        </div>
      </div>

      {/* Methodology */}
      {showMethodology && (
        <div className="mt-6 rounded-lg border border-purple-500/20 bg-purple-950/10 p-4">
          <h4 className="mb-2 font-semibold text-purple-300">Methodology</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              • <strong>Monte Carlo Simulation:</strong> 5,000 iterations modeling random cost
              shocks
            </li>
            <li>
              • <strong>Distribution:</strong> Log-normal (industry standard for healthcare
              claims)
            </li>
            <li>
              • <strong>Volatility Components:</strong> Trend uncertainty, catastrophic load
              variance, lives fluctuation
            </li>
            <li>
              • <strong>Percentiles:</strong> P50 = median outcome, P90 = 90% confidence worst
              case
            </li>
            <li>
              • <strong>Application:</strong> Use P90 for stop-loss positioning, P50 for budget
              planning
            </li>
          </ul>
        </div>
      )}
    </Card>
  );
}