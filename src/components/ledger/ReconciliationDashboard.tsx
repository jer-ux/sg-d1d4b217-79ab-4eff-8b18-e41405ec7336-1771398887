import { ReconciliationReport, LedgerEntry } from "@/lib/ledger/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  FileText,
  Download,
  RefreshCw
} from "lucide-react";

interface ReconciliationDashboardProps {
  report: ReconciliationReport;
  onEntryClick?: (entry: LedgerEntry) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function ReconciliationDashboard({ report, onEntryClick }: ReconciliationDashboardProps) {
  const netChange = report.closingBalance - report.openingBalance;
  const changePercent = (netChange / report.openingBalance) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Reconciliation Report</h2>
          <p className="text-white/60 mt-1">Period: {report.period}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="k-panel p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Opening Balance</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(report.openingBalance)}</div>
        </div>

        <div className="k-panel p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Additions</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(report.additions)}</div>
        </div>

        <div className="k-panel p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Realizations</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400">{formatCurrency(report.realizations)}</div>
        </div>

        <div className="k-panel p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Closing Balance</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(report.closingBalance)}</div>
          <div className={`text-sm mt-1 ${netChange >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {netChange >= 0 ? "+" : ""}{changePercent.toFixed(1)}% from opening
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="k-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(report.byCategory).map(([category, data]) => {
            if (data.closing === 0) return null;
            const realizationRate = data.opening > 0 ? (data.realized / data.opening) * 100 : 0;
            
            return (
              <div key={category} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-white capitalize">{category.replace(/-/g, " ")}</div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {realizationRate.toFixed(0)}% realized
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-white/60">Opening</div>
                    <div className="font-medium text-white">{formatCurrency(data.opening)}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Realized</div>
                    <div className="font-medium text-emerald-400">{formatCurrency(data.realized)}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Closing</div>
                    <div className="font-medium text-white">{formatCurrency(data.closing)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exceptions & Alerts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Blocked Approvals */}
        {report.exceptions.blockedApprovals.length > 0 && (
          <div className="k-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Blocked Approvals</h3>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                {report.exceptions.blockedApprovals.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {report.exceptions.blockedApprovals.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => onEntryClick?.(entry)}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white text-sm">{entry.title}</div>
                      <div className="text-xs text-white/60 mt-1">{entry.id} • {entry.daysInState} days</div>
                    </div>
                    <div className="text-sm font-medium text-white">{formatCurrency(entry.estimatedValue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stale Disputes */}
        {report.exceptions.staleDisputes.length > 0 && (
          <div className="k-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Stale Disputes</h3>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                {report.exceptions.staleDisputes.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {report.exceptions.staleDisputes.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => onEntryClick?.(entry)}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white text-sm">{entry.title}</div>
                      <div className="text-xs text-white/60 mt-1">{entry.id} • {entry.daysInState} days</div>
                    </div>
                    <div className="text-sm font-medium text-white">{formatCurrency(entry.estimatedValue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing Receipts */}
        {report.exceptions.missingReceipts.length > 0 && (
          <div className="k-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-semibold text-white">Missing Receipts</h3>
              <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">
                {report.exceptions.missingReceipts.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {report.exceptions.missingReceipts.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => onEntryClick?.(entry)}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white text-sm">{entry.title}</div>
                      <div className="text-xs text-white/60 mt-1">{entry.id}</div>
                    </div>
                    <div className="text-sm font-medium text-white">{formatCurrency(entry.estimatedValue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overdue Realizations */}
        {report.exceptions.overdueRealizations.length > 0 && (
          <div className="k-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Overdue Realizations</h3>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                {report.exceptions.overdueRealizations.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {report.exceptions.overdueRealizations.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => onEntryClick?.(entry)}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white text-sm">{entry.title}</div>
                      <div className="text-xs text-white/60 mt-1">{entry.id} • Due {new Date(entry.dueDate).toLocaleDateString()}</div>
                    </div>
                    <div className="text-sm font-medium text-white">{formatCurrency(entry.estimatedValue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}