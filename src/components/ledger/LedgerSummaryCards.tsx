import { LedgerSummary } from "@/lib/ledger/types";
import { TrendingUp, CheckCircle2, AlertTriangle, DollarSign } from "lucide-react";

interface LedgerSummaryCardsProps {
  summary: LedgerSummary;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function LedgerSummaryCards({ summary }: LedgerSummaryCardsProps) {
  const cards = [
    {
      title: "Identified",
      value: formatCurrency(summary.totalIdentified),
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Approved",
      value: formatCurrency(summary.totalApproved),
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10"
    },
    {
      title: "Realized",
      value: formatCurrency(summary.totalRealized),
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "At Risk",
      value: formatCurrency(summary.totalAtRisk),
      icon: AlertTriangle,
      color: "text-orange-400",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="k-panel p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-white/60">{card.title}</div>
            <div className={`${card.bg} p-2 rounded-lg`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>
          <div className="text-2xl font-semibold text-white">{card.value}</div>
        </div>
      ))}
    </div>
  );
}