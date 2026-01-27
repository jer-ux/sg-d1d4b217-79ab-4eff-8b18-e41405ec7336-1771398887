import { LedgerEntry, LedgerState } from "@/lib/ledger/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock, TrendingUp, XCircle, Shield, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LedgerTableProps {
  entries: LedgerEntry[];
  onEntryClick?: (entry: LedgerEntry) => void;
}

const stateColors: Record<LedgerState, string> = {
  identified: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  approved: "bg-green-500/20 text-green-300 border-green-500/30",
  realized: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "at-risk": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  disputed: "bg-red-500/20 text-red-300 border-red-500/30",
  rejected: "bg-gray-500/20 text-gray-300 border-gray-500/30"
};

const categoryLabels: Record<string, string> = {
  "cost-reduction": "Cost Reduction",
  "revenue-enhancement": "Revenue Enhancement",
  "productivity-gain": "Productivity Gain",
  "risk-avoidance": "Risk Avoidance",
  "working-capital": "Working Capital",
  "capex-avoidance": "CapEx Avoidance"
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function LedgerTable({ entries, onEntryClick }: LedgerTableProps) {
  return (
    <div className="k-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-medium text-white/60">ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Title</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/60">State</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-white/60">Est. Value</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-white/60">Realized</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Owner</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-white/60">DQ</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-white/60">Recon</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const dqStatus = entry.dqTests ? (
                entry.dqTests.every(t => t.status === "PASS") ? "PASS" :
                entry.dqTests.some(t => t.status === "FAIL") ? "FAIL" : "WARN"
              ) : null;
              
              const reconStatus = entry.reconciliation ? (
                entry.reconciliation.every(r => r.status === "PASS") ? "PASS" :
                entry.reconciliation.some(r => r.status === "FAIL") ? "FAIL" : "WARN"
              ) : null;

              return (
                <tr
                  key={entry.id}
                  onClick={() => onEntryClick(entry)}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm text-white/80">{entry.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-white">{entry.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {categoryLabels[entry.category]}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={stateColors[entry.state]}>{entry.state}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-white font-medium">
                      {formatCurrency(entry.estimatedValue)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-emerald-400 font-medium">
                      {entry.realizedValue > 0 ? formatCurrency(entry.realizedValue) : "—"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-white/70">{entry.owner.split("@")[0]}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {dqStatus === "PASS" && <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />}
                    {dqStatus === "WARN" && <AlertCircle className="w-4 h-4 text-amber-400 inline" />}
                    {dqStatus === "FAIL" && <XCircle className="w-4 h-4 text-rose-400 inline" />}
                    {!dqStatus && <span className="text-white/30">—</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {reconStatus === "PASS" && <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />}
                    {reconStatus === "WARN" && <AlertCircle className="w-4 h-4 text-amber-400 inline" />}
                    {reconStatus === "FAIL" && <XCircle className="w-4 h-4 text-rose-400 inline" />}
                    {!reconStatus && <span className="text-white/30">—</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-white/70">
                      {new Date(entry.dueDate).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}