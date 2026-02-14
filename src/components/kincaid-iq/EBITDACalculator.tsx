import { DollarSign, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { calculateEBITDAImpact } from "@/lib/kincaid-iq/actuarial";

type Props = {
  netSavings: number;
  years?: number;
};

export function EBITDACalculator({ netSavings, years = 5 }: Props) {
  const [revenue, setRevenue] = useState(50000000); // $50M default
  const [currentEBITDAMargin, setCurrentEBITDAMargin] = useState(12); // 12% default

  const currentEBITDA = revenue * (currentEBITDAMargin / 100);
  const ebitdaImpact = calculateEBITDAImpact(netSavings, revenue);
  const newEBITDA = currentEBITDA + netSavings;
  const newEBITDAMargin = (newEBITDA / revenue) * 100;
  const marginExpansion = newEBITDAMargin - currentEBITDAMargin;

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-emerald-500/10 p-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">EBITDA Impact Calculator</h3>
          <p className="text-sm text-slate-400">Model P&L benefit from healthcare savings</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6 space-y-4 rounded-lg border border-slate-700 bg-slate-800/30 p-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Annual Revenue</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="border-slate-700 bg-slate-900 pl-9 text-white"
              placeholder="50000000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-300">Current EBITDA Margin (%)</Label>
          <Input
            type="number"
            step="0.1"
            value={currentEBITDAMargin}
            onChange={(e) => setCurrentEBITDAMargin(Number(e.target.value))}
            className="border-slate-700 bg-slate-900 text-white"
            placeholder="12"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm text-slate-400">Current EBITDA</p>
          <p className="mt-1 text-2xl font-bold text-white">
            ${(currentEBITDA / 1000000).toFixed(1)}M
          </p>
          <p className="mt-1 text-xs text-slate-500">{currentEBITDAMargin.toFixed(1)}% margin</p>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
          <p className="text-sm text-slate-400">New EBITDA</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            ${(newEBITDA / 1000000).toFixed(1)}M
          </p>
          <p className="mt-1 text-xs text-emerald-500">{newEBITDAMargin.toFixed(1)}% margin</p>
        </div>

        <div className="rounded-lg border border-violet-500/30 bg-violet-950/20 p-4">
          <p className="text-sm text-slate-400">{years}-Year Savings</p>
          <p className="mt-1 text-2xl font-bold text-violet-400">
            ${(netSavings / 1000000).toFixed(1)}M
          </p>
          <p className="mt-1 text-xs text-violet-500">{ebitdaImpact.toFixed(2)}% of revenue</p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
          <p className="text-sm text-slate-400">Margin Expansion</p>
          <p className="mt-1 text-2xl font-bold text-amber-400">
            +{marginExpansion.toFixed(2)}%
          </p>
          <p className="mt-1 text-xs text-amber-500">EBITDA pts improvement</p>
        </div>
      </div>

      {/* Board-Ready Summary */}
      <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-950/20 p-4">
        <p className="text-sm font-medium text-blue-300">Board-Ready Summary:</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Healthcare cost compression strategies are projected to deliver{" "}
          <span className="font-semibold text-emerald-400">
            ${(netSavings / 1000000).toFixed(1)}M
          </span>{" "}
          in cumulative savings over {years} years, expanding EBITDA margin from{" "}
          <span className="font-semibold text-white">{currentEBITDAMargin.toFixed(1)}%</span> to{" "}
          <span className="font-semibold text-emerald-400">{newEBITDAMargin.toFixed(1)}%</span>,
          a {marginExpansion.toFixed(2)}pp improvement representing{" "}
          <span className="font-semibold text-violet-400">{ebitdaImpact.toFixed(1)}%</span> of
          annual revenue.
        </p>
      </div>
    </Card>
  );
}