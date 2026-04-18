import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExecutiveReport } from "@/lib/kincaid-iq/types";

type SpreadDistributionChartProps = {
  report: ExecutiveReport;
};

export function SpreadDistributionChart({ report }: SpreadDistributionChartProps) {
  const { leakage_analysis } = report;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxSpread = Math.max(...leakage_analysis.top_ndcs.map(n => n.total_spread));

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-400" />
          Spread Distribution - Top Leakage Drivers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-sm font-medium text-slate-300 mb-3">
            Top 10 NDCs by Total Spread
          </div>
          <div className="space-y-2">
            {leakage_analysis.top_ndcs.slice(0, 10).map((ndc, idx) => {
              const barWidth = (ndc.total_spread / maxSpread) * 100;
              return (
                <div key={ndc.ndc} className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-400 truncate max-w-[200px]">
                      {idx + 1}. {ndc.drug_name}
                    </span>
                    <span className="font-mono text-red-400 font-medium">
                      {formatCurrency(ndc.total_spread)}
                    </span>
                  </div>
                  <div className="h-6 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    >
                      <div className="h-full flex items-center px-2 text-xs text-white font-medium">
                        {ndc.claim_count} claims
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <div className="text-sm font-medium text-slate-300 mb-3">
            Top 5 Pharmacies by Total Spread
          </div>
          <div className="space-y-3">
            {leakage_analysis.top_pharmacies.slice(0, 5).map((pharmacy, idx) => (
              <div
                key={pharmacy.pharmacy}
                className="p-3 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-slate-300">
                    {idx + 1}. {pharmacy.pharmacy}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-400">
                      {formatCurrency(pharmacy.total_spread)}
                    </div>
                    <div className="text-xs text-slate-500">
                      {pharmacy.spread_percent.toFixed(1)}% spread
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Claims:</span>{" "}
                    <span className="text-slate-300 font-mono">
                      {pharmacy.claim_count}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Avg/Claim:</span>{" "}
                    <span className="text-slate-300 font-mono">
                      {formatCurrency(pharmacy.avg_spread_per_claim)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {leakage_analysis.systematic_spread && (
          <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/40">
            <div className="text-xs text-red-300">
              <span className="font-medium">⚠️ Systematic Spread Detected:</span> Multiple
              pharmacies showing spread &gt;10%, indicating potential network-wide pricing
              violations.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}