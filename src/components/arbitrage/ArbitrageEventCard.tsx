"use client";

import { ChevronRight, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

export function ArbitrageEventCard({
  event,
  onClick,
}: {
  event: ArbitrageEvent;
  onClick: () => void;
}) {
  const severityColors = {
    critical: "bg-red-500/10 text-red-400 border-red-500/20",
    high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg border border-white/10 bg-black/20 p-4 transition-all hover:border-white/20 hover:bg-white/5 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2">
          <Badge variant="outline" className={severityColors[event.severity]}>
            {event.severity.toUpperCase()}
          </Badge>
          <Badge variant="secondary" className="bg-white/5">
            {event.category}
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          {(event.confidence_score * 100).toFixed(0)}% Confidence
          <ChevronRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
        {event.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            {event.affected_claims} Claims
          </div>
          {event.root_cause_analysis && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Root Cause Identified
            </div>
          )}
        </div>
        
        {event.financial_impact && (
          <div className={`font-mono font-medium ${
            event.financial_impact.direction === 'negative' ? 'text-red-400' : 'text-green-400'
          }`}>
            {event.financial_impact.direction === 'negative' ? '-' : '+'}
            ${event.financial_impact.amount.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}