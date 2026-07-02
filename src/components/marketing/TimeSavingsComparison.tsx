"use client";

import { Clock, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimeSaving {
  task: string;
  manual: string;
  automated: string;
  savings: string;
}

interface TimeSavingsComparisonProps {
  title?: string;
  subtitle?: string;
  savings: TimeSaving[];
  variant?: "default" | "compact";
}

export function TimeSavingsComparison({
  title = "Stop Spending Weeks on What Takes Hours",
  subtitle = "Forensic intelligence that used to require consultants, actuaries, and legal teams — now automated with audit-grade precision",
  savings,
  variant = "default"
}: TimeSavingsComparisonProps) {
  const totalManualHours = savings.reduce((sum, item) => {
    const hours = parseInt(item.manual.match(/\d+/)?.[0] || "0");
    const days = item.manual.includes("day") ? hours * 8 : 0;
    const weeks = item.manual.includes("week") ? hours * 40 : 0;
    const months = item.manual.includes("month") ? hours * 160 : 0;
    return sum + (hours + days + weeks + months);
  }, 0);

  const totalAutomatedHours = savings.reduce((sum, item) => {
    const hours = parseInt(item.automated.match(/\d+/)?.[0] || "0");
    const minutes = item.automated.includes("min") ? hours / 60 : 0;
    return sum + (hours + minutes);
  }, 0);

  const totalSavings = totalManualHours - totalAutomatedHours;
  const percentageSaved = Math.round((totalSavings / totalManualHours) * 100);

  return (
    <div className="w-full py-16 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {variant === "default" && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-400">Manual Process</span>
            </div>
            <div className="text-3xl font-bold text-white">{totalManualHours}h</div>
            <div className="text-sm text-slate-500 mt-1">Consultant-dependent</div>
          </Card>

          <Card className="bg-blue-950/30 border-blue-800/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Kincaid iQ Automated</span>
            </div>
            <div className="text-3xl font-bold text-white">{totalAutomatedHours}h</div>
            <div className="text-sm text-slate-500 mt-1">Self-service platform</div>
          </Card>

          <Card className="bg-emerald-950/30 border-emerald-800/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Time Savings</span>
            </div>
            <div className="text-3xl font-bold text-white">{percentageSaved}%</div>
            <div className="text-sm text-slate-500 mt-1">Faster to insight</div>
          </Card>
        </div>

        {/* Detailed Comparison */}
        <div className="space-y-4">
          {savings.map((item, idx) => (
            <Card
              key={idx}
              className="bg-slate-900/30 border-slate-800 p-6 hover:border-slate-700 transition-colors"
            >
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.task}</h3>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Manual:</span>
                  </div>
                  <div className="text-xl font-bold text-slate-300 mt-1">{item.manual}</div>
                </div>

                <div className="md:col-span-1 flex justify-center">
                  <ArrowRight className="w-6 h-6 text-blue-500" />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">Automated:</span>
                  </div>
                  <div className="text-xl font-bold text-white mt-1">{item.automated}</div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-right">
                    <div className="text-emerald-400 text-sm font-medium mb-1">Saves</div>
                    <div className="text-lg font-bold text-emerald-300">{item.savings}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {variant === "default" && (
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">
              Equivalent of <span className="text-white font-semibold">2-3 full-time analysts</span> per engagement
            </p>
            <a
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              See Live Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}