import { useMemo } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Activity } from "lucide-react";

interface RxHistoricalData {
  year: number;
  members: number;
  gross_cost: number;
  rebate: number;
  specialty_percent: number;
  generic_dispensing_rate: number;
}

interface RxForecastData {
  year: number;
  gross_cost: number;
  rebates: number;
  net_cost: number;
  pmpm: number;
}

interface RxForecastChartProps {
  historical: RxHistoricalData[];
  forecast: RxForecastData[];
  title?: string;
  showGrossCost?: boolean;
  showRebates?: boolean;
}

export function RxForecastChart({
  historical,
  forecast,
  title = "Rx Cost Trend Analysis",
  showGrossCost = true,
  showRebates = true,
}: RxForecastChartProps) {
  
  const chartData = useMemo(() => {
    // Combine historical and forecast data
    const historicalPoints = historical.map(h => ({
      year: h.year,
      type: "Historical" as const,
      net_cost: h.gross_cost - h.rebate,
      gross_cost: h.gross_cost,
      rebates: h.rebate,
      pmpm: (h.gross_cost - h.rebate) / (h.members * 12),
    }));

    const forecastPoints = forecast.map(f => ({
      year: f.year,
      type: "Projected" as const,
      net_cost: f.net_cost,
      gross_cost: f.gross_cost,
      rebates: f.rebates,
      pmpm: f.pmpm,
    }));

    return [...historicalPoints, ...forecastPoints];
  }, [historical, forecast]);

  const currentYear = historical.length > 0 ? historical[historical.length - 1].year : new Date().getFullYear();

  const stats = useMemo(() => {
    const lastHistorical = chartData.find(d => d.type === "Historical" && d.year === currentYear);
    const lastProjected = chartData[chartData.length - 1];
    
    if (!lastHistorical || !lastProjected) return null;

    const netCostGrowth = ((lastProjected.net_cost - lastHistorical.net_cost) / lastHistorical.net_cost) * 100;
    const pmpmGrowth = ((lastProjected.pmpm - lastHistorical.pmpm) / lastHistorical.pmpm) * 100;

    return {
      startNetCost: lastHistorical.net_cost,
      endNetCost: lastProjected.net_cost,
      netCostGrowth,
      startPmpm: lastHistorical.pmpm,
      endPmpm: lastProjected.pmpm,
      pmpmGrowth,
    };
  }, [chartData, currentYear]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompact = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
            <Activity className="w-3 h-3 mr-1" />
            Trend Forecast
          </Badge>
        </div>

        {/* Summary Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Current Net Cost</div>
              <div className="text-lg font-semibold text-white">{formatCompact(stats.startNetCost)}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Projected Net Cost</div>
              <div className="text-lg font-semibold text-white">{formatCompact(stats.endNetCost)}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Net Cost Growth</div>
              <div className="text-lg font-semibold text-amber-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stats.netCostGrowth.toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">PMPM Growth</div>
              <div className="text-lg font-semibold text-emerald-400 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {stats.pmpmGrowth.toFixed(1)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="netCostGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="grossCostGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="year" 
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              tickFormatter={formatCompact}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#1e293b", 
                border: "1px solid #334155",
                borderRadius: "8px"
              }}
              labelStyle={{ color: "#f1f5f9" }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
            />
            
            {/* Reference line at current year */}
            <ReferenceLine 
              x={currentYear} 
              stroke="#64748b" 
              strokeDasharray="3 3"
              label={{ value: "Current", fill: "#94a3b8", position: "top" }}
            />

            {showGrossCost && (
              <Area
                type="monotone"
                dataKey="gross_cost"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="url(#grossCostGradient)"
                name="Gross Cost"
                strokeDasharray={(point) => point.type === "Projected" ? "5 5" : "0"}
              />
            )}

            <Area
              type="monotone"
              dataKey="net_cost"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#netCostGradient)"
              name="Net Cost"
              strokeDasharray={(point) => point.type === "Projected" ? "5 5" : "0"}
            />

            {showRebates && (
              <Line
                type="monotone"
                dataKey="rebates"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Rebates"
                dot={false}
                strokeDasharray={(point) => point.type === "Projected" ? "5 5" : "0"}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PMPM Trend */}
      <div>
        <h4 className="text-sm font-medium text-slate-300 mb-3">Per Member Per Month (PMPM) Trend</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="year" 
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#1e293b", 
                border: "1px solid #334155",
                borderRadius: "8px"
              }}
              labelStyle={{ color: "#f1f5f9" }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend iconType="line" />
            
            <ReferenceLine 
              x={currentYear} 
              stroke="#64748b" 
              strokeDasharray="3 3"
            />

            <Line
              type="monotone"
              dataKey="pmpm"
              stroke="#06b6d4"
              strokeWidth={2}
              name="PMPM"
              dot={{ fill: "#06b6d4", r: 4 }}
              activeDot={{ r: 6 }}
              strokeDasharray={(point) => point.type === "Projected" ? "5 5" : "0"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-emerald-500"></div>
          <span>Solid = Historical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 border-t-2 border-dashed border-emerald-500"></div>
          <span>Dashed = Projected</span>
        </div>
      </div>
    </Card>
  );
}