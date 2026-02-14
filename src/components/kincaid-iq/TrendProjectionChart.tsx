import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import type { TrendProjection } from "@/lib/kincaid-iq/types";

type Props = {
  data: TrendProjection[];
  title?: string;
};

export function TrendProjectionChart({ data, title = "5-Year Cost Projection" }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/30 p-6">
      <h3 className="mb-6 text-lg font-semibold text-white">{title}</h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="year" 
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
          />
          <YAxis 
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
            tickFormatter={formatCurrency}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#1e293b", 
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#fff"
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend 
            wrapperStyle={{ color: "#94a3b8" }}
          />
          <Line 
            type="monotone" 
            dataKey="baseline_cost" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Baseline (Current Trend)"
            dot={{ fill: "#ef4444", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="modeled_cost" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Modeled (With Interventions)"
            dot={{ fill: "#10b981", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm text-slate-400">Year 1 Savings</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {formatCurrency(data[1]?.savings || 0)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm text-slate-400">Year 5 Savings</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {formatCurrency(data[5]?.savings || 0)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm text-slate-400">Cumulative Savings</p>
          <p className="mt-1 text-2xl font-bold text-violet-400">
            {formatCurrency(data[5]?.cumulative_savings || 0)}
          </p>
        </div>
      </div>
    </Card>
  );
}