import { TrendingDown, DollarSign, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DRAPAnalysis, ExecutiveReport } from "@/lib/kincaid-iq/types";

type DRAPAnalysisPanelProps = {
  report: ExecutiveReport;
};

export function DRAPAnalysisPanel({ report }: DRAPAnalysisPanelProps) {
  const { executive_summary, financial_reconstruction } = report;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-4">
      <Card className="border-red-500/20 bg-gradient-to-br from-red-950/20 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <TrendingDown className="h-5 w-5" />
            DRAP Analysis - Total EBITDA Leakage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-red-500/20">
              <div className="text-xs text-slate-400 mb-1">Total DRAP</div>
              <div className="text-2xl font-bold text-red-400">
                {formatCurrency(executive_summary.total_drap)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Delta Realized vs Allowable
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 border border-orange-500/20">
              <div className="text-xs text-slate-400 mb-1">DRAP as % of Spend</div>
              <div className="text-2xl font-bold text-orange-400">
                {formatPercent(executive_summary.drap_percent)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Average spread rate
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 border border-yellow-500/20">
              <div className="text-xs text-slate-400 mb-1">EBITDA Impact</div>
              <div className="text-2xl font-bold text-yellow-400">
                {(executive_summary.ebitda_impact_bps / 100).toFixed(2)} bps
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Basis points of revenue
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 border border-blue-500/20">
              <div className="text-xs text-slate-400 mb-1">Total Rx Spend</div>
              <div className="text-2xl font-bold text-blue-400">
                {formatCurrency(executive_summary.total_spend)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Annual pharmacy cost
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <div className="text-sm font-medium text-slate-300 mb-3">
              Financial Reconstruction
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Paid:</span>
                <span className="font-mono text-slate-300">
                  {formatCurrency(financial_reconstruction.total_paid)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Allowable Price:</span>
                <span className="font-mono text-slate-300">
                  {formatCurrency(financial_reconstruction.total_allowable)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2">
                <span className="text-slate-400 font-medium">Total Spread:</span>
                <span className="font-mono text-red-400 font-bold">
                  {formatCurrency(financial_reconstruction.total_spread)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Observed Rebates:</span>
                <span className="font-mono text-green-400">
                  -{formatCurrency(financial_reconstruction.observed_rebates)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2">
                <span className="text-slate-400 font-medium">Net Plan Cost:</span>
                <span className="font-mono text-slate-300 font-bold">
                  {formatCurrency(financial_reconstruction.net_plan_cost)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-yellow-950/20 border border-yellow-500/30">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div className="text-xs text-yellow-400">
                <span className="font-medium">Spread Prevalence:</span>{" "}
                {formatPercent(financial_reconstruction.spread_prevalence)} of claims show
                excess markup beyond contract allowance
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}