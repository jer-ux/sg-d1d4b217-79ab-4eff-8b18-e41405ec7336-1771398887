import { ReconciliationReport as ReportType } from "@/lib/ledger/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertCircle, FileText, Download } from "lucide-react";

interface ReconciliationReportProps {
  report: ReportType;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

const categoryLabels: Record<string, string> = {
  "cost-reduction": "Cost Reduction",
  "revenue-enhancement": "Revenue Enhancement",
  "productivity-gain": "Productivity Gain",
  "risk-avoidance": "Risk Avoidance",
  "working-capital": "Working Capital",
  "capex-avoidance": "CapEx Avoidance"
};

export function ReconciliationReport({ report }: ReconciliationReportProps) {
  const netChange = report.closingBalance - report.openingBalance;
  const isPositive = netChange >= 0;

  return (
    <div className="space-y-6">
      <div className="k-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Reconciliation Report</h2>
            <p className="text-white/60 mt-1">{report.period}</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>

        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <div className="k-panel p-4 bg-white/5">
            <div className="text-sm text-white/60 mb-1">Opening Balance</div>
            <div className="text-xl font-semibold text-white">
              {formatCurrency(report.openingBalance)}
            </div>
          </div>

          <div className="k-panel p-4 bg-blue-500/10">
            <div className="text-sm text-blue-400 mb-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Additions
            </div>
            <div className="text-xl font-semibold text-blue-300">
              {formatCurrency(report.additions)}
            </div>
          </div>

          <div className="k-panel p-4 bg-emerald-500/10">
            <div className="text-sm text-emerald-400 mb-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Realizations
            </div>
            <div className="text-xl font-semibold text-emerald-300">
              {formatCurrency(report.realizations)}
            </div>
          </div>

          <div className="k-panel p-4 bg-orange-500/10">
            <div className="text-sm text-orange-400 mb-1">Adjustments</div>
            <div className="text-xl font-semibold text-orange-300">
              {formatCurrency(report.adjustments)}
            </div>
          </div>

          <div className="k-panel p-4 bg-white/5">
            <div className="text-sm text-white/60 mb-1">Closing Balance</div>
            <div className="text-xl font-semibold text-white">
              {formatCurrency(report.closingBalance)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 k-panel bg-white/5">
          <div className="text-center">
            <div className="text-sm text-white/60 mb-1">Net Change</div>
            <div className={`text-2xl font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}{formatCurrency(netChange)}
            </div>
          </div>
        </div>
      </div>

      <div className="k-panel p-6">
        <h3 className="text-xl font-semibold text-white mb-4">By Category</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-sm font-medium text-white/70">Category</th>
                <th className="text-right p-3 text-sm font-medium text-white/70">Opening</th>
                <th className="text-right p-3 text-sm font-medium text-white/70">Realized</th>
                <th className="text-right p-3 text-sm font-medium text-white/70">Closing</th>
                <th className="text-right p-3 text-sm font-medium text-white/70">Change</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(report.byCategory).map(([category, data]) => {
                const change = data.closing - data.opening;
                return (
                  <tr key={category} className="border-b border-white/5">
                    <td className="p-3 text-white">{categoryLabels[category]}</td>
                    <td className="p-3 text-right font-mono text-white/80">
                      {formatCurrency(data.opening)}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-400">
                      {formatCurrency(data.realized)}
                    </td>
                    <td className="p-3 text-right font-mono text-white/80">
                      {formatCurrency(data.closing)}
                    </td>
                    <td className={`p-3 text-right font-mono ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {change >= 0 ? "+" : ""}{formatCurrency(change)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="k-panel p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          Exceptions & Action Items
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-white/70 mb-3">Blocked Approvals</div>
            {report.exceptions.blockedApprovals.length > 0 ? (
              <div className="space-y-2">
                {report.exceptions.blockedApprovals.map((entry) => (
                  <div key={entry.id} className="k-panel p-3 bg-orange-500/10 border-orange-500/30">
                    <div className="font-medium text-white text-sm">{entry.title}</div>
                    <div className="text-xs text-white/60 mt-1">{entry.id}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-white/40 italic">No blocked approvals</div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-white/70 mb-3">Stale Disputes</div>
            {report.exceptions.staleDisputes.length > 0 ? (
              <div className="space-y-2">
                {report.exceptions.staleDisputes.map((entry) => (
                  <div key={entry.id} className="k-panel p-3 bg-red-500/10 border-red-500/30">
                    <div className="font-medium text-white text-sm">{entry.title}</div>
                    <div className="text-xs text-white/60 mt-1">
                      {entry.id} • {entry.daysInState} days in dispute
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-white/40 italic">No stale disputes</div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-white/70 mb-3">Missing Receipts</div>
            {report.exceptions.missingReceipts.length > 0 ? (
              <div className="space-y-2">
                {report.exceptions.missingReceipts.map((entry) => (
                  <div key={entry.id} className="k-panel p-3 bg-yellow-500/10 border-yellow-500/30">
                    <div className="font-medium text-white text-sm">{entry.title}</div>
                    <div className="text-xs text-white/60 mt-1">{entry.id}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-white/40 italic">All entries have receipts</div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-white/70 mb-3">Overdue Realizations</div>
            {report.exceptions.overdueRealizations.length > 0 ? (
              <div className="space-y-2">
                {report.exceptions.overdueRealizations.map((entry) => (
                  <div key={entry.id} className="k-panel p-3 bg-orange-500/10 border-orange-500/30">
                    <div className="font-medium text-white text-sm">{entry.title}</div>
                    <div className="text-xs text-white/60 mt-1">
                      {entry.id} • Due: {new Date(entry.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-white/40 italic">No overdue realizations</div>
            )}
          </div>
        </div>
      </div>

      <div className="k-panel p-6 bg-blue-500/10 border-blue-500/30">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-medium text-white mb-1">CFO Summary</div>
            <div className="text-sm text-white/80">
              This report shows a net increase of {formatCurrency(netChange)} in the verified savings ledger during {report.period}.
              Total realized value of {formatCurrency(report.realizations)} was recognized, with {formatCurrency(report.additions)} in new opportunities identified.
              {report.exceptions.blockedApprovals.length > 0 && (
                <> There are {report.exceptions.blockedApprovals.length} entries awaiting approval.</>
              )}
              {report.exceptions.staleDisputes.length > 0 && (
                <> {report.exceptions.staleDisputes.length} disputed entries require resolution.</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}