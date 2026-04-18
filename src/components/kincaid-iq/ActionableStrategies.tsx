import { Target, TrendingUp, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ExecutiveReport } from "@/lib/kincaid-iq/types";

type ActionableStrategiesProps = {
  report: ExecutiveReport;
};

export function ActionableStrategies({ report }: ActionableStrategiesProps) {
  const { actionable_strategy } = report;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-green-500/20 bg-gradient-to-br from-green-950/20 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Immediate Recovery Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actionable_strategy.immediate_recovery.map((action, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-green-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-300 mb-1">
                    {action.action}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getDifficultyColor(action.difficulty)}>
                      {action.difficulty} difficulty
                    </Badge>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      {action.timeline}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Recovery Potential</div>
                  <div className="text-lg font-bold text-green-400">
                    {formatCurrency(action.estimated_recovery)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 rounded-lg bg-green-950/20 border border-green-500/30">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div className="text-xs text-green-400">
                <span className="font-medium">Total Recovery Potential:</span>{" "}
                {formatCurrency(
                  actionable_strategy.immediate_recovery.reduce(
                    (sum, a) => sum + a.estimated_recovery,
                    0
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-950/20 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Contract Leverage Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actionable_strategy.contract_leverage.map((point, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-300"
              >
                <div className="flex items-start gap-2">
                  <div className="text-blue-400 font-bold">{idx + 1}.</div>
                  <div>{point}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-400" />
            Structural Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actionable_strategy.structural_recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-300"
              >
                <div className="flex items-start gap-2">
                  <div className="text-purple-400 font-bold">→</div>
                  <div>{rec}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}