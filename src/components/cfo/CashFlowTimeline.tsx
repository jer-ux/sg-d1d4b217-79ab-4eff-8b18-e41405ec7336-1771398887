import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CashFlowTimeline() {
  const timeline = [
    {
      month: "Jan 2026",
      status: "completed",
      amount: "$287,500",
      description: "Q4 2025 reconciliation",
      icon: CheckCircle2,
      color: "emerald"
    },
    {
      month: "Feb 2026",
      status: "completed",
      amount: "$156,000",
      description: "PBM spread recovery",
      icon: CheckCircle2,
      color: "emerald"
    },
    {
      month: "Mar 2026",
      status: "processing",
      amount: "$412,300",
      description: "Specialty drug clawback",
      icon: Clock,
      color: "blue"
    },
    {
      month: "Apr 2026",
      status: "pending",
      amount: "$298,750",
      description: "Contract violation settlement",
      icon: AlertCircle,
      color: "orange"
    },
    {
      month: "Q2 2026",
      status: "projected",
      amount: "$1.2M",
      description: "Quarterly impact forecast",
      icon: TrendingUp,
      color: "purple"
    }
  ];

  const colorMap = {
    emerald: {
      bg: "from-emerald-500/20 to-emerald-600/20",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      icon: "bg-emerald-500/20 text-emerald-400"
    },
    blue: {
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/40",
      text: "text-blue-400",
      icon: "bg-blue-500/20 text-blue-400"
    },
    orange: {
      bg: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/40",
      text: "text-orange-400",
      icon: "bg-orange-500/20 text-orange-400"
    },
    purple: {
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/40",
      text: "text-purple-400",
      icon: "bg-purple-500/20 text-purple-400"
    }
  };

  const totalRecovered = timeline
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[$,M]/g, "")), 0);

  const totalProjected = timeline
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[$,M]/g, "")), 0);

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Savings Cash Flow Timeline</h3>
            <p className="text-sm text-slate-400">When savings hit your balance sheet</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Recovered YTD</span>
            </div>
            <div className="text-3xl font-bold text-white">${totalRecovered.toFixed(1)}M</div>
            <div className="text-xs text-emerald-300/70 mt-1">Cash in bank</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Total Impact</span>
            </div>
            <div className="text-3xl font-bold text-white">${totalProjected.toFixed(1)}M</div>
            <div className="text-xs text-purple-300/70 mt-1">Through Q2 2026</div>
          </div>
        </div>

        <div className="space-y-3">
          {timeline.map((item, idx) => {
            const Icon = item.icon;
            const colors = colorMap[item.color as keyof typeof colorMap];
            
            return (
              <motion.div
                key={item.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-lg p-4`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.month}</div>
                        <div className="text-xs text-slate-400">{item.description}</div>
                      </div>
                      <div className={`text-lg font-bold ${colors.text} whitespace-nowrap ml-4`}>
                        {item.amount}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium ${colors.text} uppercase tracking-wide`}>
                        {item.status}
                      </span>
                      {item.status === "completed" && (
                        <span className="text-xs text-slate-500">• Deposited</span>
                      )}
                      {item.status === "processing" && (
                        <span className="text-xs text-slate-500">• 7-10 business days</span>
                      )}
                    </div>
                  </div>
                </div>

                {idx < timeline.length - 1 && (
                  <div className="absolute left-9 top-14 bottom-[-12px] w-px bg-gradient-to-b from-slate-600 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-emerald-400 font-semibold">18% average recovery</span>
              <span> • Direct deposit to operating account • No vendor delays</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}