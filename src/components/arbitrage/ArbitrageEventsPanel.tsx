"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockArbitrageEvents } from "@/lib/arbitrage/mockArbitrageEvents";
import { ArbitrageEventCard } from "./ArbitrageEventCard";
import { ArbitrageFilters } from "./ArbitrageFilters";
import { ArbitrageStats } from "./ArbitrageStats";
import { ArbitrageEventDrawer } from "./ArbitrageEventDrawer";
import { useArbitrageFilters } from "@/hooks/useArbitrageFilters";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

export function ArbitrageEventsPanel() {
  const [selectedEvent, setSelectedEvent] = useState<ArbitrageEvent | null>(null);
  const { filters, updateFilter, resetFilters, activeFilterCount } = useArbitrageFilters();

  const filteredEvents = useMemo(() => {
    let filtered = mockArbitrageEvents;

    // Search filter
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.event_id.toLowerCase().includes(q)
      );
    }

    // Severity filter
    if (filters.selectedSeverity.length > 0) {
      filtered = filtered.filter((e) => filters.selectedSeverity.includes(e.severity));
    }

    // Status filter
    if (filters.selectedStatus.length > 0) {
      filtered = filtered.filter((e) => filters.selectedStatus.includes(e.status));
    }

    // Category filter
    if (filters.selectedCategory.length > 0) {
      filtered = filtered.filter((e) => filters.selectedCategory.includes(e.category));
    }

    // Financial impact filter
    filtered = filtered.filter((e) => {
      const amount = Math.abs(e.financial_impact.amount);
      return amount >= filters.minImpact && amount <= filters.maxImpact;
    });

    // Confidence score filter
    if (filters.minConfidence > 0) {
      filtered = filtered.filter((e) => e.confidence_score >= filters.minConfidence);
    }

    // Date range filter
    if (filters.dateRange?.from || filters.dateRange?.to) {
      filtered = filtered.filter((e) => {
        const eventDate = new Date(e.detected_at);
        if (filters.dateRange?.from && eventDate < filters.dateRange.from) return false;
        if (filters.dateRange?.to && eventDate > filters.dateRange.to) return false;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "impact":
          return Math.abs(b.financial_impact.amount) - Math.abs(a.financial_impact.amount);
        case "date":
          return new Date(b.detected_at).getTime() - new Date(a.detected_at).getTime();
        case "severity":
          const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        case "confidence":
          return b.confidence_score - a.confidence_score;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  const activeFilters = [
    ...filters.selectedSeverity.map((s) => ({ type: "severity", value: s })),
    ...filters.selectedStatus.map((s) => ({ type: "status", value: s })),
    ...filters.selectedCategory.map((s) => ({ type: "category", value: s })),
    ...(filters.minImpact > 0 ? [{ type: "minImpact", value: `Min: $${filters.minImpact.toLocaleString()}` }] : []),
    ...(filters.maxImpact < 1000000 ? [{ type: "maxImpact", value: `Max: $${filters.maxImpact.toLocaleString()}` }] : []),
    ...(filters.minConfidence > 0 ? [{ type: "confidence", value: `Confidence ≥ ${(filters.minConfidence * 100).toFixed(0)}%` }] : []),
    ...(filters.dateRange?.from || filters.dateRange?.to ? [{ type: "dateRange", value: "Date range" }] : []),
  ];

  const removeFilter = (filter: { type: string; value: string }) => {
    switch (filter.type) {
      case "severity":
        updateFilter("selectedSeverity", filters.selectedSeverity.filter((s) => s !== filter.value));
        break;
      case "status":
        updateFilter("selectedStatus", filters.selectedStatus.filter((s) => s !== filter.value));
        break;
      case "category":
        updateFilter("selectedCategory", filters.selectedCategory.filter((s) => s !== filter.value));
        break;
      case "minImpact":
        updateFilter("minImpact", 0);
        break;
      case "maxImpact":
        updateFilter("maxImpact", 1000000);
        break;
      case "confidence":
        updateFilter("minConfidence", 0);
        break;
      case "dateRange":
        updateFilter("dateRange", undefined);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Arbitrage Events</h2>
        <p className="text-white/60">
          Real-time monitoring of pricing discrepancies, billing errors, and cost optimization opportunities
        </p>
      </div>

      <ArbitrageStats events={filteredEvents} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ArbitrageFilters
            selectedSeverity={filters.selectedSeverity}
            selectedStatus={filters.selectedStatus}
            selectedCategory={filters.selectedCategory}
            minImpact={filters.minImpact}
            maxImpact={filters.maxImpact}
            minConfidence={filters.minConfidence}
            dateRange={filters.dateRange}
            onSeverityChange={(val) => updateFilter("selectedSeverity", val)}
            onStatusChange={(val) => updateFilter("selectedStatus", val)}
            onCategoryChange={(val) => updateFilter("selectedCategory", val)}
            onMinImpactChange={(val) => updateFilter("minImpact", val)}
            onMaxImpactChange={(val) => updateFilter("maxImpact", val)}
            onMinConfidenceChange={(val) => updateFilter("minConfidence", val)}
            onDateRangeChange={(val) => updateFilter("dateRange", val)}
            onReset={resetFilters}
          />
        </div>

        <div className="lg:col-span-3 space-y-4">
          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
              <span className="text-xs text-white/60">Active filters:</span>
              {activeFilters.map((filter, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="cursor-pointer border-white/20 bg-white/10 text-white hover:bg-white/15"
                  onClick={() => removeFilter(filter)}
                >
                  {filter.value}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={filters.searchQuery}
                onChange={(e) => updateFilter("searchQuery", e.target.value)}
                placeholder="Search events by title, description, category, or ID..."
                className="pl-10 rounded-xl border-white/10 bg-black/20 text-white placeholder:text-white/40"
              />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value as "impact" | "date" | "severity" | "confidence")}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white outline-none"
            >
              <option value="impact">Sort by Impact</option>
              <option value="date">Sort by Date</option>
              <option value="severity">Sort by Severity</option>
              <option value="confidence">Sort by Confidence</option>
            </select>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
              <p className="text-white/60">No events match your filters</p>
              <button
                onClick={resetFilters}
                className="mt-3 text-sm text-white/80 underline hover:text-white"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-white/60">
                Showing {filteredEvents.length} of {mockArbitrageEvents.length} events
              </div>
              {filteredEvents.map((event) => (
                <ArbitrageEventCard
                  key={event.event_id}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ArbitrageEventDrawer
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      />
    </div>
  );
}