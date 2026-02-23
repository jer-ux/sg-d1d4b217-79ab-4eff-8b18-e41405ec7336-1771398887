"use client";

import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";

export interface ArbitrageFilterState {
  searchQuery: string;
  selectedSeverity: string[];
  selectedStatus: string[];
  selectedCategory: string[];
  minImpact: number;
  maxImpact: number;
  minConfidence: number;
  dateRange: DateRange | undefined;
  sortBy: "impact" | "date" | "severity" | "confidence";
}

const DEFAULT_FILTERS: ArbitrageFilterState = {
  searchQuery: "",
  selectedSeverity: [],
  selectedStatus: [],
  selectedCategory: [],
  minImpact: 0,
  maxImpact: 1000000,
  minConfidence: 0,
  dateRange: undefined,
  sortBy: "impact",
};

const STORAGE_KEY = "arbitrage-filters-v1";

export function useArbitrageFilters() {
  const [filters, setFilters] = useState<ArbitrageFilterState>(DEFAULT_FILTERS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Restore dateRange if it exists
        if (parsed.dateRange?.from) {
          parsed.dateRange.from = new Date(parsed.dateRange.from);
        }
        if (parsed.dateRange?.to) {
          parsed.dateRange.to = new Date(parsed.dateRange.to);
        }
        setFilters({ ...DEFAULT_FILTERS, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load filters:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      console.error("Failed to save filters:", error);
    }
  }, [filters, isLoaded]);

  const updateFilter = <K extends keyof ArbitrageFilterState>(
    key: K,
    value: ArbitrageFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const applyPreset = (preset: Partial<ArbitrageFilterState>) => {
    setFilters((prev) => ({ ...DEFAULT_FILTERS, ...prev, ...preset }));
  };

  const activeFilterCount = 
    filters.selectedSeverity.length + 
    filters.selectedStatus.length + 
    filters.selectedCategory.length + 
    (filters.minImpact > 0 ? 1 : 0) +
    (filters.maxImpact < 1000000 ? 1 : 0) +
    (filters.minConfidence > 0 ? 1 : 0) +
    (filters.dateRange?.from || filters.dateRange?.to ? 1 : 0);

  return {
    filters,
    updateFilter,
    resetFilters,
    applyPreset,
    activeFilterCount,
    isLoaded,
  };
}