import { LedgerEntry, LedgerState } from "@/lib/ledger/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, Receipt } from "lucide-react";
import Link from "next/link";

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
              <th className="text-left p-4 text-sm font-medium text-white/70">ID</th>
              <th className="text-left p-4 text-sm font-medium text-white/70">Title</th>
              <th className="text-left p-4 text-sm font-medium text-white/70">Category</th>
              <th className="text-left p-4 text-sm font-medium text-white/70">State</th>
              <th className="text-right p-4 text-sm font-medium text-white/70">Estimated</th>
              <th className="text-right p-4 text-sm font-medium text-white/70">Realized</th>
              <th className="text-left p-4 text-sm font-medium text-white/70">Owner</th>
              <th className="text-left p-4 text-sm font-medium text-white/70">Due</th>
              <th className="text-center p-4 text-sm font-medium text-white/70">Receipts</th>
              <th className="text-right p-4 text-sm font-medium text-white/70"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => onEntryClick?.(entry)}
              >
                <td className="p-4">
                  <div className="font-mono text-sm text-white/90">{entry.id}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-white">{entry.title}</div>
                  <div className="text-sm text-white/60 mt-0.5 line-clamp-1">{entry.description}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white/70">{categoryLabels[entry.category]}</div>
                </td>
                <td className="p-4">
                  <Badge className={stateColors[entry.state]}>
                    {entry.state}
                  </Badge>
                  {entry.blockers && entry.blockers.length > 0 && (
                    <AlertCircle className="inline-block ml-2 w-4 h-4 text-orange-400" />
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="font-mono text-sm text-white/90">
                    {formatCurrency(entry.estimatedValue)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-mono text-sm text-white/90">
                    {entry.realizedValue > 0 ? formatCurrency(entry.realizedValue) : "—"}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white/70">{entry.owner.split("@")[0]}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white/70">
                    {new Date(entry.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="inline-flex items-center gap-1">
                    <Receipt className="w-4 h-4 text-white/50" />
                    <span className="text-sm text-white/70">{entry.receipts.length}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEntryClick?.(entry);
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}