import { AlertCircle, TrendingUp, DollarSign, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

type BrokerData = {
  year: number;
  total_commission: number;
  indirect_comp: number;
  premium_total: number;
  lives: number;
};

type Props = {
  data: BrokerData[];
};

export function BrokerCompAnalysis({ data }: Props) {
  const latestYear = data[data.length - 1];
  const firstYear = data[0];
  
  const totalCompGrowth = ((latestYear.total_commission - firstYear.total_commission) / firstYear.total_commission) * 100;
  const premiumGrowth = ((latestYear.premium_total - firstYear.premium_total) / firstYear.premium_total) * 100;
  const arbitrageGap = totalCompGrowth - premiumGrowth;

  return (
    <div className="space-y-6">
      <Card className="border-orange-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-orange-500/10 p-2">
            <Shield className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Broker Compensation Analysis</h3>
            <p className="text-sm text-slate-400">Forensic analysis of Schedule C disclosures vs market value</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Total Compensation</p>
            <p className="mt-1 text-2xl font-bold text-white">
              ${latestYear.total_commission.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-orange-400">
              +{totalCompGrowth.toFixed(1)}% growth vs {premiumGrowth.toFixed(1)}% premium growth
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Indirect/Hidden</p>
            <p className="mt-1 text-2xl font-bold text-white">
              ${latestYear.indirect_comp.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {((latestYear.indirect_comp / latestYear.total_commission) * 100).toFixed(1)}% of total comp
            </p>
          </div>

          <div className="rounded-lg border border-orange-500/30 bg-orange-950/20 p-4">
            <p className="text-sm text-slate-400">Value Arbitrage Gap</p>
            <p className="mt-1 text-2xl font-bold text-orange-400">
              {arbitrageGap > 0 ? "+" : ""}{arbitrageGap.toFixed(1)}%
            </p>
            <p className="mt-1 text-xs text-orange-500">
              Compensation outpacing premium growth
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}