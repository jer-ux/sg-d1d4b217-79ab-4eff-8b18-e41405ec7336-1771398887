import { useState, useMemo } from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { LedgerEntry, LedgerState, LedgerCategory } from "@/lib/ledger/types";
import { mockLedgerEntries, mockLedgerSummary } from "@/lib/ledger/mock";
import { LedgerSummaryCards } from "@/components/ledger/LedgerSummaryCards";
import { LedgerFilters } from "@/components/ledger/LedgerFilters";
import { LedgerTable } from "@/components/ledger/LedgerTable";
import { LedgerDetailModal } from "@/components/ledger/LedgerDetailModal";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Plus, Search, Download } from "lucide-react";

export default function LedgerPage() {
  // State
  const [entries, setEntries] = useState<LedgerEntry[]>(mockLedgerEntries);
  const [selectedEntry, setSelectedEntry] = useState<LedgerEntry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Filters
  const [selectedStates, setSelectedStates] = useState<LedgerState[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<LedgerCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { toast } = useToast();

  // Filter Logic
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      // Search
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        entry.id.toLowerCase().includes(searchLower) ||
        entry.title.toLowerCase().includes(searchLower) ||
        entry.description.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // State Filter
      if (selectedStates.length > 0 && !selectedStates.includes(entry.state)) {
        return false;
      }

      // Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(entry.category)) {
        return false;
      }

      return true;
    });
  }, [entries, searchQuery, selectedStates, selectedCategories]);

  // Handlers
  const handleEntryClick = (entry: LedgerEntry) => {
    setSelectedEntry(entry);
    setIsDetailOpen(true);
  };

  const handleStateToggle = (state: LedgerState) => {
    setSelectedStates(prev => 
      prev.includes(state) 
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const handleCategoryToggle = (category: LedgerCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedStates([]);
    setSelectedCategories([]);
    setSearchQuery("");
  };

  const handleApprove = (entryId: string) => {
    setEntries(prev => prev.map(e => 
      e.id === entryId 
        ? { 
            ...e, 
            state: "approved" as LedgerState,
            auditTrail: [
              ...e.auditTrail,
              {
                timestamp: new Date().toISOString(),
                actor: "current-user@company.com",
                action: "approved" as const,
                previousState: e.state,
                newState: "approved" as LedgerState,
                reason: "Approved via ledger interface"
              }
            ]
          }
        : e
    ));
    
    toast({
      title: "Entry Approved",
      description: `${entryId} has been approved and is ready for realization.`,
    });
    
    setIsDetailOpen(false);
  };

  const handleRealize = (entryId: string) => {
    setEntries(prev => prev.map(e => 
      e.id === entryId 
        ? { 
            ...e, 
            state: "realized" as LedgerState,
            realizedValue: e.estimatedValue,
            recognitionDate: new Date().toISOString(),
            auditTrail: [
              ...e.auditTrail,
              {
                timestamp: new Date().toISOString(),
                actor: "current-user@company.com",
                action: "realized" as const,
                previousState: e.state,
                newState: "realized" as LedgerState,
                previousValue: 0,
                newValue: e.estimatedValue,
                reason: "Value realized and confirmed"
              }
            ]
          }
        : e
    ));
    
    toast({
      title: "Value Realized",
      description: `${entryId} has been marked as realized.`,
    });
    
    setIsDetailOpen(false);
  };

  const handleDispute = (entryId: string) => {
    setEntries(prev => prev.map(e => 
      e.id === entryId 
        ? { 
            ...e, 
            state: "at-risk" as LedgerState,
            auditTrail: [
              ...e.auditTrail,
              {
                timestamp: new Date().toISOString(),
                actor: "current-user@company.com",
                action: "disputed" as const,
                previousState: e.state,
                newState: "at-risk" as LedgerState,
                reason: "Dispute raised - requires review"
              }
            ]
          }
        : e
    ));
    
    toast({
      title: "Dispute Raised",
      description: `${entryId} has been flagged for review.`,
      variant: "destructive"
    });
    
    setIsDetailOpen(false);
  };

  return (
    <>
      <SEO 
        title="Verified Savings Ledger | SiriusB iQ"
        description="Finance-grade value tracking with evidence receipts and audit trails"
      />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-bold text-white">Verified Savings Ledger</h1>
              <div className="flex items-center gap-3">
                <Link href="/ledger/reconciliation">
                  <Button variant="outline">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Reconciliation
                  </Button>
                </Link>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </div>
            </div>
            <p className="text-white/60">
              Auditable value ledger with receipts, owners, and board-ready reporting
            </p>
          </div>

          <div className="mb-6">
            <LedgerSummaryCards summary={mockLedgerSummary} />
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-1">
              <LedgerFilters
                selectedStates={selectedStates}
                selectedCategories={selectedCategories}
                onStateToggle={handleStateToggle}
                onCategoryToggle={handleCategoryToggle}
                onClearAll={handleClearFilters}
              />
            </div>

            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search by ID, title, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="text-sm text-white/60 mb-4">
                Showing {filteredEntries.length} of {entries.length} entries
              </div>

              <LedgerTable entries={filteredEntries} onEntryClick={handleEntryClick} />
            </div>
          </div>
        </div>
      </div>

      <LedgerDetailModal
        entry={selectedEntry}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onApprove={handleApprove}
        onRealize={handleRealize}
        onDispute={handleDispute}
      />
    </>
  );
}