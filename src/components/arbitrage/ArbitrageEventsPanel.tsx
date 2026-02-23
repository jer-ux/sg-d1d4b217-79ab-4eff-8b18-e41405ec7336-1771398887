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
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";
import type { DateRange } from "react-day-picker";

export function ArbitrageEventsPanel() {
  const [selectedEvent, setSelectedEvent] = useState<ArbitrageEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [minImpact, setMinImpact] = useState(0);
  const [maxImpact, setMaxImpact] = useState(1000000);
  const [minConfidence, setMinConfidence] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sortBy, setSortBy] = useState<"impact" | "date" | "severity" | "confidence">("impact");

  const filteredEvents = useMemo(() => {
    let filtered = mockArbitrageEvents;

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.event_id.toLowerCase().includes(q)
      );
    }

    // Severity filter
    if (selectedSeverity.length > 0) {
      filtered = filtered.filter((e) => selectedSeverity.includes(e.severity));
    }

    // Status filter
    if (selectedStatus.length > 0) {
      filtered = filtered.filter((e) => selectedStatus.includes(e.status));
    }

    // Category filter
    if (selectedCategory.length > 0) {
      filtered = filtered.filter((e) => selectedCategory.includes(e.category));
    }

    // Financial impact filter
    filtered = filtered.filter((e) => {
      const amount = Math.abs(e.financial_impact.amount);
      return amount >= minImpact && amount <= maxImpact;
    });

    // Confidence score filter
    if (minConfidence > 0) {
      filtered = filtered.filter((e) => e.confidence_score >= minConfidence);
    }

    // Date range filter
    if (dateRange?.from || dateRange?.to) {
      filtered = filtered.filter((e) => {
        const eventDate = new Date(e.detected_at);
        if (dateRange.from && eventDate < dateRange.from) return false;
        if (dateRange.to && eventDate > dateRange.to) return false;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
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
  }, [
    searchQuery,
    selectedSeverity,
    selectedStatus,
    selectedCategory,
    minImpact,
    maxImpact,
    minConfidence,
    dateRange,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSeverity([]);
    setSelectedStatus([]);
    setSelectedCategory([]);
    setMinImpact(0);
    setMaxImpact(1000000);
    setMinConfidence(0);
    setDateRange(undefined);
  };

  const activeFilters = [
    ...selectedSeverity.map((s) => ({ type: "severity", value: s })),
    ...selectedStatus.map((s) => ({ type: "status", value: s })),
    ...selectedCategory.map((s) => ({ type: "category", value: s })),
    ...(minImpact > 0 ? [{ type: "minImpact", value: `Min: $${minImpact.toLocaleString()}` }] : []),
    ...(maxImpact < 1000000 ? [{ type: "maxImpact", value: `Max: $${maxImpact.toLocaleString()}` }] : []),
    ...(minConfidence > 0 ? [{ type: "confidence", value: `Confidence ≥ ${(minConfidence * 100).toFixed(0)}%` }] : []),
    ...(dateRange?.from || dateRange?.to ? [{ type: "dateRange", value: "Date range" }] : []),
  ];

  const removeFilter = (filter: { type: string; value: string }) => {
    switch (filter.type) {
      case "severity":
        setSelectedSeverity(selectedSeverity.filter((s) => s !== filter.value));
        break;
      case "status":
        setSelectedStatus(selectedStatus.filter((s) => s !== filter.value));
        break;
      case "category":
        setSelectedCategory(selectedCategory.filter((s) => s !== filter.value));
        break;
      case "minImpact":
        setMinImpact(0);
        break;
      case "maxImpact":
        setMaxImpact(1000000);
        break;
      case "confidence":
        setMinConfidence(0);
        break;
      case "dateRange":
        setDateRange(undefined);
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
            selectedSeverity={selectedSeverity}
            selectedStatus={selectedStatus}
            selectedCategory={selectedCategory}
            minImpact={minImpact}
            maxImpact={maxImpact}
            minConfidence={minConfidence}
            dateRange={dateRange}
            onSeverityChange={setSelectedSeverity}
            onStatusChange={setSelectedStatus}
            onCategoryChange={setSelectedCategory}
            onMinImpactChange={setMinImpact}
            onMaxImpactChange={setMaxImpact}
            onMinConfidenceChange={setMinConfidence}
            onDateRangeChange={setDateRange}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, description, category, or ID..."
                className="pl-10 rounded-xl border-white/10 bg-black/20 text-white placeholder:text-white/40"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "impact" | "date" | "severity" | "confidence")}
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
                  onViewDetails={setSelectedEvent}
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