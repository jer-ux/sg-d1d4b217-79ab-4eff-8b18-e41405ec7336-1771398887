"use client";

import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

interface ArbitrageStatsProps {
  events: ArbitrageEvent[];
}

export function ArbitrageStats({ events }: ArbitrageStatsProps) {
  const totalImpact = events.reduce((sum, e) => sum + Math.abs(e.financial_impact.amount), 0);
  const activeCount = events.filter((e) => e.status === "active").length;
  const resolvedCount = events.filter((e) => e.status === "resolved").length;
  const criticalCount = events.filter((e) => e.severity === "critical").length;

  const stats = [
    {
      label: "Total Financial Impact",
      value: `$${totalImpact.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-400",
    },
    {
      label: "Active Events",
      value: activeCount,
      icon: AlertTriangle,
      color: "text-orange-400",
    },
    {
      label: "Critical Severity",
      value: criticalCount,
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      label: "Resolved",
      value: resolvedCount,
      icon: CheckCircle,
      color: "text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/60 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}