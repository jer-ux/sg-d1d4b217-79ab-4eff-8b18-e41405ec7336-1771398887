import { Activity, TrendingUp, Shield, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { MonteCarloResult, VolatilityProfile } from "@/lib/kincaid-iq/monteCarlo";

type Props = {
  result: MonteCarloResult;
  volatilityProfile: VolatilityProfile;
  baseCost: number;
};

export function VolatilityDashboard({ result, volatilityProfile, baseCost }: Props) {
  const downside50 = result.median - baseCost;
  const downside90 = result.p90 - baseCost;
  const downside95 = result.p95 - baseCost;

  const volatilityScore = Math.min(100, result.coefficient_of_variation * 1000);
  const volatilityLevel =
    volatilityScore > 15 ? "High" : volatilityScore > 8 ? "Moderate" : "Low";

  return (
    <Card className="border-orange-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Cost Volatility Analysis</h3>
        <p className="mt-1 text-sm text-slate-400">
          Quantified uncertainty and downside exposure
        </p>
      </div>

      {/* Volatility Score */}
      <div className="mb-6 rounded-lg border border-orange-500/20 bg-orange-950/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-400" />
            <span className="font-semibold text-white">Volatility Score</span>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              volatilityLevel === "High"
                ? "bg-red-500/20 text-red-400"
                : volatilityLevel === "Moderate"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-green-500/20 text-green-400"
            }`}
          >
            {volatilityLevel}
          </span>
        </div>
        <Progress value={volatilityScore} className="h-2" />
        <p className="mt-2 text-xs text-slate-400">
          Coefficient of Variation: {(result.coefficient_of_variation * 100).toFixed(1)}%
        </p>
      </div>

      {/* Risk Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Standard Deviation */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">Standard Deviation</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            ${result.std_deviation.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            ±{((result.std_deviation / result.mean) * 100).toFixed(1)}% of mean
          </p>
        </div>

        {/* Median vs Mean */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-semibold">Median vs Mean</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            ${result.median.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Mean: ${result.mean.toLocaleString()} (skew:{" "}
            {((result.mean - result.median) / result.median * 100).toFixed(1)}%)
          </p>
        </div>

        {/* Downside P90 */}
        <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-semibold">Downside P90</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            ${downside90.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            10% chance costs exceed by this amount
          </p>
        </div>

        {/* Downside P95 */}
        <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4">
          <div className="flex items-center gap-2 text-red-400">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-semibold">Extreme Downside P95</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            ${downside95.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            5% chance of exceeding (tail risk)
          </p>
        </div>
      </div>

      {/* Volatility Components Breakdown */}
      <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/30 p-4">
        <h4 className="mb-3 text-sm font-semibold text-white">Volatility Components</h4>
        <div className="space-y-3">
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-400">Trend Uncertainty</span>
              <span className="text-white">
                {(volatilityProfile.trend_uncertainty * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={volatilityProfile.trend_uncertainty * 100}
              className="h-1.5"
            />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-400">Catastrophic Load Variance</span>
              <span className="text-white">
                {(volatilityProfile.catastrophic_load_variance * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={volatilityProfile.catastrophic_load_variance * 100}
              className="h-1.5"
            />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-400">Lives Fluctuation</span>
              <span className="text-white">
                {(volatilityProfile.lives_fluctuation * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={volatilityProfile.lives_fluctuation * 100}
              className="h-1.5"
            />
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-950/10 p-3">
        <p className="text-xs text-slate-300">
          <strong className="text-blue-400">CFO Interpretation:</strong> Budget at P50 (median)
          for planning. Reserve P90-P50 delta (${(result.p90 - result.median).toLocaleString()})
          for contingency. Use P95 for stop-loss specific attachment point modeling.
        </p>
      </div>
    </Card>
  );
}