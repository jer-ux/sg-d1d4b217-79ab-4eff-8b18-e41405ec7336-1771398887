import { AlertTriangle, TrendingDown, DollarSign, Shield, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  totalHiddenFees: number;
  pbmArbitrage: number;
  brokerOverpayment: number;
  conflictsDetected: number;
};

export function WarRoomPreview({ 
  totalHiddenFees, 
  pbmArbitrage, 
  brokerOverpayment, 
  conflictsDetected 
}: Props) {
  return (
    <Card className="border-red-500/30 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-lg bg-red-500/20 p-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">War Room Alert</h3>
          </div>
          <p className="text-slate-400">
            Analysis of your Form 5500s has identified material cost leakage opportunities
          </p>
        </div>
        <div className="rounded-full bg-red-500/20 px-4 py-1 text-sm font-semibold text-red-300 border border-red-500/30">
          {conflictsDetected} Issues Detected
        </div>
      </div>

      {/* Alert Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
          <div className="mb-2 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-400" />
            <p className="text-sm text-slate-400">Hidden Broker Fees</p>
          </div>
          <p className="text-3xl font-bold text-red-400">
            ${(totalHiddenFees / 1000000).toFixed(2)}M
          </p>
          <p className="mt-1 text-xs text-red-300/70">Undisclosed indirect comp</p>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="mb-2 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-amber-400" />
            <p className="text-sm text-slate-400">PBM Arbitrage</p>
          </div>
          <p className="text-3xl font-bold text-amber-400">
            ${(pbmArbitrage / 1000000).toFixed(2)}M
          </p>
          <p className="mt-1 text-xs text-amber-300/70">Extractable savings</p>
        </div>

        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-400" />
            <p className="text-sm text-slate-400">Broker Overpayment</p>
          </div>
          <p className="text-3xl font-bold text-orange-400">
            ${(brokerOverpayment / 1000000).toFixed(2)}M
          </p>
          <p className="mt-1 text-xs text-orange-300/70">Above market rate</p>
        </div>
      </div>

      {/* Key Findings */}
      <div className="mb-6 space-y-3">
        <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">Broker Compensation Trending Up</p>
            <p className="text-xs text-slate-400">Schedule C shows 18% increase over 3 years with no service expansion documented</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">PBM Rebate Opacity Detected</p>
            <p className="text-xs text-slate-400">Spread pricing model identified - estimated $1.2M in rebate retention annually</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">Indirect Compensation Not Disclosed</p>
            <p className="text-xs text-slate-400">Carrier overrides and contingent commissions not reported in Schedule C</p>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-slate-900 p-6">
        <div className="mb-4 flex items-start gap-4">
          <div className="rounded-lg bg-blue-500/20 p-3 flex-shrink-0">
            <Shield className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-bold text-white">
              War Room Analysis Available
            </h4>
            <p className="text-sm text-slate-300">
              Our conflict detection engine has identified ${((totalHiddenFees + pbmArbitrage + brokerOverpayment) / 1000000).toFixed(2)}M 
              in recoverable costs. Full forensic analysis with intervention roadmap available in the War Room.
            </p>
          </div>
        </div>

        <Link href="/war-room?source=kincaid-iq">
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open War Room Analysis
          </Button>
        </Link>
      </div>
    </Card>
  );
}