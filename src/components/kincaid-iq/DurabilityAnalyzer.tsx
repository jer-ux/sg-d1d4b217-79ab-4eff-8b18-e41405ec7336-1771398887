import { TrendingDown, Shield, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SavingsDurability } from "@/lib/kincaid-iq/types";

type Props = {
  durability: SavingsDurability;
};

export function DurabilityAnalyzer({ durability }: Props) {
  const confidenceLevel = durability.confidence_score >= 0.7 
    ? { label: "High", color: "text-emerald-400", borderColor: "border-emerald-500/30" }
    : durability.confidence_score >= 0.4
    ? { label: "Medium", color: "text-yellow-400", borderColor: "border-yellow-500/30" }
    : { label: "Low", color: "text-red-400", borderColor: "border-red-500/30" };

  return (
    <Card className={`border ${confidenceLevel.borderColor} bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-indigo-500/10 p-2">
          <Shield className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Savings Durability Analysis</h3>
          <p className="text-sm text-slate-400">3-year persistence modeling</p>
        </div>
        <Badge className={`ml-auto ${confidenceLevel.color} border-current`} variant="outline">
          {confidenceLevel.label} Confidence
        </Badge>
      </div>

      {/* Yearly Projections */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <div>
            <p className="text-sm font-medium text-white">Year 1 Savings</p>
            <p className="text-xs text-slate-400">Full intervention impact</p>
          </div>
          <p className="text-2xl font-bold text-emerald-400">
            ${(durability.year_1 / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <div>
            <p className="text-sm font-medium text-white">Year 2 Savings</p>
            <p className="text-xs text-slate-400">
              Decay: {(durability.decay_rate * 100).toFixed(1)}%
            </p>
          </div>
          <p className="text-2xl font-bold text-yellow-400">
            ${(durability.year_2 / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <div>
            <p className="text-sm font-medium text-white">Year 3 Savings</p>
            <p className="text-xs text-slate-400">
              Cumulative decay applied
            </p>
          </div>
          <p className="text-2xl font-bold text-orange-400">
            ${(durability.year_3 / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Durability Metrics */}
      <div className="space-y-3">
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Annual Decay Rate</p>
            <p className="font-medium text-white">
              {(durability.decay_rate * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Confidence Score</p>
            <p className={`font-medium ${confidenceLevel.color}`}>
              {(durability.confidence_score * 100).toFixed(0)}%
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">3-Year Cumulative</p>
            <p className="font-medium text-indigo-400">
              ${((durability.year_1 + durability.year_2 + durability.year_3) / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-900/50 p-3">
        <AlertCircle className="mt-0.5 h-4 w-4 text-slate-400" />
        <p className="text-xs text-slate-400">
          Durability modeling accounts for intervention effectiveness erosion over time. 
          Decay rates based on intervention type mix and implementation quality.
        </p>
      </div>
    </Card>
  );
}