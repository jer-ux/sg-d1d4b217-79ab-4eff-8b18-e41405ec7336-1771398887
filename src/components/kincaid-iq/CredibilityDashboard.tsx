import { Calculator, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateCredibilityFactor, applyCredibilityWeighting } from "@/lib/kincaid-iq/actuarial";

type Props = {
  actualLives: number;
  groupSpecificTrend: number;
  industryBenchmark: number;
};

export function CredibilityDashboard({ actualLives, groupSpecificTrend, industryBenchmark }: Props) {
  const credibility = applyCredibilityWeighting(groupSpecificTrend, industryBenchmark, actualLives);
  const zFactor = credibility.z_factor;
  
  // Credibility interpretation
  const getCredibilityLevel = (z: number) => {
    if (z >= 0.8) return { level: "High", color: "text-emerald-400", bgColor: "bg-emerald-950/30", borderColor: "border-emerald-500/30" };
    if (z >= 0.5) return { level: "Medium", color: "text-yellow-400", bgColor: "bg-yellow-950/30", borderColor: "border-yellow-500/30" };
    return { level: "Low", color: "text-red-400", bgColor: "bg-red-950/30", borderColor: "border-red-500/30" };
  };

  const credLevel = getCredibilityLevel(zFactor);

  return (
    <Card className={`border ${credLevel.borderColor} ${credLevel.bgColor} p-6`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-blue-500/10 p-2">
          <Calculator className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Credibility Analysis</h3>
          <p className="text-sm text-slate-400">Limited Fluctuation Method</p>
        </div>
        <Badge className={`ml-auto ${credLevel.color} border-current`} variant="outline">
          {credLevel.level} Credibility
        </Badge>
      </div>

      {/* Z-Factor Display */}
      <div className="mb-6 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-slate-400">Credibility Factor (Z)</p>
          <p className="text-2xl font-bold text-white">{(zFactor * 100).toFixed(1)}%</p>
        </div>
        <Progress value={zFactor * 100} className="h-2" />
        <p className="mt-2 text-xs text-slate-500">
          Formula: Z = min(1, √({actualLives} / 1000))
        </p>
      </div>

      {/* Weighting Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-3">
          <div>
            <p className="text-sm font-medium text-white">Group-Specific Trend</p>
            <p className="text-xs text-slate-400">Historical experience</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-400">{(groupSpecificTrend * 100).toFixed(1)}%</p>
            <p className="text-xs text-slate-500">Weight: {(credibility.group_specific_weight * 100).toFixed(0)}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-3">
          <div>
            <p className="text-sm font-medium text-white">Industry Benchmark</p>
            <p className="text-xs text-slate-400">Market average</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-amber-400">{(industryBenchmark * 100).toFixed(1)}%</p>
            <p className="text-xs text-slate-500">Weight: {(credibility.industry_benchmark_weight * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Blended Result */}
      <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-950/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Credibility-Weighted Trend</p>
            <p className="text-xs text-slate-500">Used in projections</p>
          </div>
          <p className="text-3xl font-bold text-blue-400">
            {(credibility.blended_trend * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-900/50 p-3">
        <AlertCircle className="mt-0.5 h-4 w-4 text-slate-400" />
        <p className="text-xs text-slate-400">
          Credibility weighting protects against noise in smaller groups by blending historical 
          experience with industry benchmarks. Full credibility threshold: 1,000 lives.
        </p>
      </div>
    </Card>
  );
}