import { Activity, Pill, AlertTriangle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TrendComponents } from "@/lib/kincaid-iq/types";

type Props = {
  components: TrendComponents;
  showFormulas?: boolean;
};

export function TrendDecompositionPanel({ components, showFormulas = true }: Props) {
  const medicalPercent = (components.medical_core / components.total_trend) * 100;
  const rxPercent = (components.rx_core / components.total_trend) * 100;
  const catastrophicPercent = (components.catastrophic_load / components.total_trend) * 100;

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-purple-500/10 p-2">
          <Activity className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Trend Decomposition</h3>
          <p className="text-sm text-slate-400">Component-level analysis</p>
        </div>
      </div>

      {/* Medical Component */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" />
            <p className="text-sm font-medium text-white">Medical Core Trend</p>
          </div>
          <p className="text-lg font-bold text-blue-400">
            {(components.medical_core * 100).toFixed(2)}%
          </p>
        </div>
        <Progress value={medicalPercent} className="h-2 bg-slate-800" />
        <p className="text-xs text-slate-500">{medicalPercent.toFixed(0)}% of total trend</p>
        {showFormulas && (
          <p className="text-xs text-slate-600">
            Industry medical trend × cost weight
          </p>
        )}
      </div>

      {/* Rx Component */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-emerald-400" />
            <p className="text-sm font-medium text-white">Rx Core Trend</p>
          </div>
          <p className="text-lg font-bold text-emerald-400">
            {(components.rx_core * 100).toFixed(2)}%
          </p>
        </div>
        <Progress value={rxPercent} className="h-2 bg-slate-800" />
        <p className="text-xs text-slate-500">{rxPercent.toFixed(0)}% of total trend</p>
        {showFormulas && (
          <p className="text-xs text-slate-600">
            Industry Rx trend × pharmacy weight
          </p>
        )}
      </div>

      {/* Catastrophic Load */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <p className="text-sm font-medium text-white">Catastrophic Load</p>
          </div>
          <p className="text-lg font-bold text-amber-400">
            {(components.catastrophic_load * 100).toFixed(2)}%
          </p>
        </div>
        <Progress value={catastrophicPercent} className="h-2 bg-slate-800" />
        <p className="text-xs text-slate-500">{catastrophicPercent.toFixed(0)}% of total trend</p>
        {showFormulas && (
          <p className="text-xs text-slate-600">
            Large claims ($100K+) distortion factor
          </p>
        )}
      </div>

      {/* Total Trend */}
      <div className="rounded-lg border border-purple-500/30 bg-purple-950/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Composite Trend Rate</p>
            <p className="text-xs text-slate-500">Medical + Rx + Catastrophic</p>
          </div>
          <p className="text-3xl font-bold text-purple-400">
            {(components.total_trend * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Methodology */}
      {showFormulas && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-900/50 p-3">
          <Info className="mt-0.5 h-4 w-4 text-slate-400" />
          <p className="text-xs text-slate-400">
            Decomposition allows independent modeling of medical, pharmacy, and catastrophic 
            components. Each can be adjusted separately for intervention scenarios.
          </p>
        </div>
      )}
    </Card>
  );
}