"use client";

import { useState, useMemo } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockArbitrageEvents } from "@/lib/arbitrage/mockArbitrageEvents";
import { ArbitrageEventCard } from "./ArbitrageEventCard";
import { ArbitrageFilters } from "./ArbitrageFilters";
import { ArbitrageStats } from "./ArbitrageStats";
import { ArbitrageEventDrawer } from "./ArbitrageEventDrawer";
import { ArbitrageDeepAnalysis } from "./ArbitrageDeepAnalysis";
import { ArbitrageInvestigationWorkspace } from "./ArbitrageInvestigationWorkspace";
import { useArbitrageFilters } from "@/hooks/useArbitrageFilters";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

const ITEMS_PER_PAGE = 10;

export function ArbitrageEventsPanel() {
  const [selectedEvent, setSelectedEvent] = useState<ArbitrageEvent | null>(null);
  const [showLevel2, setShowLevel2] = useState(false);
  const [showLevel3, setShowLevel3] = useState(false);
  const [showLevel4, setShowLevel4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

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
    handleFilterChange();
  };

  const handleEventClick = (event: ArbitrageEvent) => {
    setSelectedEvent(event);
    setShowLevel2(true);
  };

  const handleLevel2Close = () => {
    setShowLevel2(false);
    setSelectedEvent(null);
  };

  const handleDeepAnalysisClick = () => {
    setShowLevel2(false);
    setShowLevel3(true);
  };

  const handleLevel3Close = () => {
    setShowLevel3(false);
    setShowLevel2(true);
  };

  const handleInvestigationClick = () => {
    setShowLevel3(false);
    setShowLevel4(true);
  };

  const handleLevel4Close = () => {
    setShowLevel4(false);
    setShowLevel3(true);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
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
            onSeverityChange={(val) => { updateFilter("selectedSeverity", val); handleFilterChange(); }}
            onStatusChange={(val) => { updateFilter("selectedStatus", val); handleFilterChange(); }}
            onCategoryChange={(val) => { updateFilter("selectedCategory", val); handleFilterChange(); }}
            onMinImpactChange={(val) => { updateFilter("minImpact", val); handleFilterChange(); }}
            onMaxImpactChange={(val) => { updateFilter("maxImpact", val); handleFilterChange(); }}
            onMinConfidenceChange={(val) => { updateFilter("minConfidence", val); handleFilterChange(); }}
            onDateRangeChange={(val) => { updateFilter("dateRange", val); handleFilterChange(); }}
            onReset={() => { resetFilters(); handleFilterChange(); }}
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
                onChange={(e) => { updateFilter("searchQuery", e.target.value); handleFilterChange(); }}
                placeholder="Search events by title, description, category, or ID..."
                className="pl-10 rounded-xl border-white/10 bg-black/20 text-white placeholder:text-white/40"
              />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) => { updateFilter("sortBy", e.target.value as "impact" | "date" | "severity" | "confidence"); handleFilterChange(); }}
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
                onClick={() => { resetFilters(); handleFilterChange(); }}
                className="mt-3 text-sm text-white/80 underline hover:text-white"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} events
                </span>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <div className="space-y-3">
                {paginatedEvents.map((event) => (
                  <ArbitrageEventCard
                    key={event.event_id}
                    event={event}
                    onClick={() => handleEventClick(event)}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="border-white/10 bg-black/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, idx) => (
                      page === "..." ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-white/40">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageClick(page as number)}
                          className={`border-white/10 ${
                            currentPage === page
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-black/20 text-white hover:bg-white/10"
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="border-white/10 bg-black/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Level 2: Event Overview Drawer */}
      <ArbitrageEventDrawer
        event={selectedEvent}
        open={showLevel2}
        onOpenChange={handleLevel2Close}
        onDeepAnalysisClick={handleDeepAnalysisClick}
      />

      {/* Level 3: Deep Analysis Modal */}
      <ArbitrageDeepAnalysis
        event={selectedEvent}
        open={showLevel3}
        onOpenChange={handleLevel3Close}
        onInvestigationClick={handleInvestigationClick}
      />

      {/* Level 4: Investigation Workspace */}
      <ArbitrageInvestigationWorkspace
        event={selectedEvent}
        open={showLevel4}
        onOpenChange={handleLevel4Close}
      />
    </div>
  );
}