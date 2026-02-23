"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface ArbitrageFiltersProps {
  selectedSeverity: string[];
  selectedStatus: string[];
  selectedCategory: string[];
  minImpact: number;
  maxImpact: number;
  minConfidence: number;
  dateRange: DateRange | undefined;
  onSeverityChange: (severity: string[]) => void;
  onStatusChange: (status: string[]) => void;
  onCategoryChange: (category: string[]) => void;
  onMinImpactChange: (value: number) => void;
  onMaxImpactChange: (value: number) => void;
  onMinConfidenceChange: (value: number) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onReset: () => void;
}

export function ArbitrageFilters({
  selectedSeverity,
  selectedStatus,
  selectedCategory,
  minImpact,
  maxImpact,
  minConfidence,
  dateRange,
  onSeverityChange,
  onStatusChange,
  onCategoryChange,
  onMinImpactChange,
  onMaxImpactChange,
  onMinConfidenceChange,
  onDateRangeChange,
  onReset,
}: ArbitrageFiltersProps) {
  const toggleFilter = (current: string[], value: string) => {
    if (current.includes(value)) {
      return current.filter((v) => v !== value);
    }
    return [...current, value];
  };

  const activeFilterCount = 
    selectedSeverity.length + 
    selectedStatus.length + 
    selectedCategory.length + 
    (minImpact > 0 ? 1 : 0) +
    (maxImpact < 1000000 ? 1 : 0) +
    (minConfidence > 0 ? 1 : 0) +
    (dateRange?.from || dateRange?.to ? 1 : 0);

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Filters</h3>
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-white/20 bg-white/5 text-white/70">
              {activeFilterCount} active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-7 px-2 text-xs text-white/60 hover:text-white hover:bg-white/10"
            >
              Reset
            </Button>
          </div>
        )}
      </div>

      {/* Financial Impact Range */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-white/70">Financial Impact Range</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={minImpact}
              onChange={(e) => onMinImpactChange(Number(e.target.value))}
              placeholder="Min ($)"
              className="flex-1 rounded-lg border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
            <span className="text-white/40">to</span>
            <Input
              type="number"
              value={maxImpact === 1000000 ? "" : maxImpact}
              onChange={(e) => onMaxImpactChange(e.target.value ? Number(e.target.value) : 1000000)}
              placeholder="Max ($)"
              className="flex-1 rounded-lg border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>
          <p className="text-xs text-white/50">
            {minImpact > 0 || maxImpact < 1000000
              ? `$${minImpact.toLocaleString()} - $${maxImpact === 1000000 ? "∞" : maxImpact.toLocaleString()}`
              : "All amounts"}
          </p>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-white/70">
          Min Confidence Score: {(minConfidence * 100).toFixed(0)}%
        </Label>
        <Slider
          value={[minConfidence * 100]}
          onValueChange={(value) => onMinConfidenceChange(value[0] / 100)}
          max={100}
          step={5}
          className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white/20"
        />
        <p className="text-xs text-white/50">
          {minConfidence === 0 ? "All confidence levels" : `≥ ${(minConfidence * 100).toFixed(0)}%`}
        </p>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-white/70">Detection Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg border-white/10 bg-black/20 text-left text-sm text-white hover:bg-white/10"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span className="text-white/40">Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-white/10 bg-[#0a0f1e]" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              className="text-white"
            />
            {dateRange?.from && (
              <div className="border-t border-white/10 p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDateRangeChange(undefined)}
                  className="w-full text-white/60 hover:text-white hover:bg-white/10"
                >
                  Clear dates
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {/* Severity */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-white/70">Severity</Label>
        <div className="flex flex-wrap gap-2">
          {["critical", "high", "medium", "low"].map((sev) => (
            <Badge
              key={sev}
              variant={selectedSeverity.includes(sev) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedSeverity.includes(sev)
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-white/10 bg-transparent text-white/60 hover:border-white/20 hover:text-white"
              }`}
              onClick={() => onSeverityChange(toggleFilter(selectedSeverity, sev))}
            >
              {sev}
            </Badge>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-white/70">Status</Label>
        <div className="flex flex-wrap gap-2">
          {["active", "investigating", "resolved"].map((status) => (
            <Badge
              key={status}
              variant={selectedStatus.includes(status) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedStatus.includes(status)
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-white/10 bg-transparent text-white/60 hover:border-white/20 hover:text-white"
              }`}
              onClick={() => onStatusChange(toggleFilter(selectedStatus, status))}
            >
              {status}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-white/70">Category</Label>
        <div className="flex flex-wrap gap-2">
          {[
            "Billing Discrepancy",
            "Duplicate Claims",
            "Eligibility Issue",
            "Coding Error",
            "Prior Authorization",
            "Network Issue",
          ].map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory.includes(cat) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedCategory.includes(cat)
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-white/10 bg-transparent text-white/60 hover:border-white/20 hover:text-white"
              }`}
              onClick={() => onCategoryChange(toggleFilter(selectedCategory, cat))}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Filter Presets */}
      <div className="space-y-3 border-t border-white/10 pt-4">
        <Label className="text-xs font-medium text-white/70">Quick Filters</Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => {
              onSeverityChange(["critical", "high"]);
              onMinImpactChange(10000);
            }}
          >
            High Priority (Critical/High, $10K+)
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => {
              onStatusChange(["active"]);
              onCategoryChange(["Duplicate Claims", "Billing Discrepancy"]);
            }}
          >
            Active Revenue Recovery
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => {
              onMinConfidenceChange(0.9);
              onMinImpactChange(5000);
            }}
          >
            High Confidence Opportunities
          </Button>
        </div>
      </div>
    </div>
  );
}