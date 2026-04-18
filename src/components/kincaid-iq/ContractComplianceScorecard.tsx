import { Shield, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExecutiveReport } from "@/lib/kincaid-iq/types";

type ContractComplianceScorecardProps = {
  report: ExecutiveReport;
};

export function ContractComplianceScorecard({ report }: ContractComplianceScorecardProps) {
  const { contract_performance } = report;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 90) return "border-green-500/20";
    if (score >= 70) return "border-yellow-500/20";
    if (score >= 50) return "border-orange-500/20";
    return "border-red-500/20";
  };

  return (
    <Card className={`${getScoreBorderColor(contract_performance.overall_score)} bg-gradient-to-br from-slate-900 to-slate-800/50`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" />
          Contract Compliance Scorecard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Overall Score</div>
            <div className={`text-3xl font-bold ${getScoreColor(contract_performance.overall_score)}`}>
              {contract_performance.overall_score.toFixed(0)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {contract_performance.guarantees_met} of {contract_performance.guarantees_total} met
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50 border border-red-500/20">
            <div className="text-xs text-slate-400 mb-1">Recoverable Dollars</div>
            <div className="text-2xl font-bold text-red-400">
              {formatCurrency(contract_performance.total_recoverable)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Contractual violations
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50 border border-orange-500/20">
            <div className="text-xs text-slate-400 mb-1">Risk Flags</div>
            <div className="text-2xl font-bold text-orange-400">
              {contract_performance.fiduciary_risk_flags.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Fiduciary concerns
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-300">
            Performance Guarantee Status
          </div>
          {contract_performance.guarantees.map((guarantee, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${
                guarantee.met
                  ? "bg-green-950/20 border-green-500/30"
                  : "bg-red-950/20 border-red-500/30"
              }`}
            >
              <div className="flex items-start gap-2">
                {guarantee.met ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className={`text-sm font-medium ${guarantee.met ? "text-green-400" : "text-red-400"}`}>
                    {guarantee.name}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div>
                      <span className="text-slate-500">Target:</span>{" "}
                      <span className="text-slate-300 font-mono">
                        {guarantee.target.toFixed(2)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Actual:</span>{" "}
                      <span className={`font-mono ${guarantee.met ? "text-green-400" : "text-red-400"}`}>
                        {guarantee.actual.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  {!guarantee.met && guarantee.variance_dollars > 0 && (
                    <div className="mt-2 text-xs text-red-400">
                      <span className="font-medium">Exposure:</span>{" "}
                      {formatCurrency(guarantee.variance_dollars)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {contract_performance.fiduciary_risk_flags.length > 0 && (
          <div className="border-t border-slate-700 pt-4">
            <div className="text-sm font-medium text-slate-300 mb-2">
              Fiduciary Risk Flags
            </div>
            <div className="space-y-2">
              {contract_performance.fiduciary_risk_flags.map((flag, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-orange-950/20 border border-orange-500/30 text-xs"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-orange-400">{flag.flag}</div>
                      <div className="text-slate-400 mt-1">
                        <span className="font-medium">Severity:</span> {flag.severity} |{" "}
                        <span className="font-medium">Exposure:</span>{" "}
                        {formatCurrency(flag.exposure_dollars)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}