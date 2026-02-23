"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

interface ArbitrageEventCardProps {
  event: ArbitrageEvent;
  onViewDetails: (event: ArbitrageEvent) => void;
}

export function ArbitrageEventCard({ event, onViewDetails }: ArbitrageEventCardProps) {
  const [expanded, setExpanded] = useState(false);

  const severityColor = {
    critical: "border-red-500/50 bg-red-500/10 text-red-400",
    high: "border-orange-500/50 bg-orange-500/10 text-orange-400",
    medium: "border-yellow-500/50 bg-yellow-500/10 text-yellow-400",
    low: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  };

  const statusColor = {
    active: "bg-red-500/20 text-red-300 border-red-500/30",
    investigating: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    resolved: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-black/30 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-start gap-3 flex-1 text-left"
        >
          {expanded ? (
            <ChevronDown className="w-5 h-5 text-white/60 mt-1 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white/60 mt-1 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-white">{event.title}</span>
              <Badge className={`rounded-full px-2 py-0.5 text-xs border ${severityColor[event.severity]}`}>
                {event.severity}
              </Badge>
              <Badge className={`rounded-full px-2 py-0.5 text-xs border ${statusColor[event.status]}`}>
                {event.status}
              </Badge>
            </div>
            <div className="text-xs text-white/60 mt-1">{event.category}</div>
          </div>
        </button>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            {event.financial_impact.direction === "negative" ? (
              <TrendingDown className="w-4 h-4 text-red-400" />
            ) : (
              <TrendingUp className="w-4 h-4 text-green-400" />
            )}
            <span className="text-sm font-semibold text-white">
              ${Math.abs(event.financial_impact.amount).toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-white/50">
            Conf: {(event.confidence_score * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 pl-8">
          <div className="text-sm text-white/80">{event.description}</div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/60 mb-1">Detected</div>
              <div className="text-sm text-white/90">
                {new Date(event.detected_at).toLocaleDateString()}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/60 mb-1">Affected Claims</div>
              <div className="text-sm text-white/90">
                {event.affected_claims.toLocaleString()}
              </div>
            </div>
          </div>

          {event.root_causes && event.root_causes.length > 0 && (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3">
              <div className="text-xs text-yellow-300 font-semibold mb-2">Root Causes</div>
              <ul className="space-y-1">
                {event.root_causes.map((cause, idx) => (
                  <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            onClick={() => onViewDetails(event)}
            className="w-full rounded-xl bg-white/10 hover:bg-white/20 border border-white/20"
          >
            View Full Details
          </Button>
        </div>
      )}
    </div>
  );
}