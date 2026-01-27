import { useState } from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { mockReconciliationReport, mockLedgerEntries } from "@/lib/ledger/mock";
import { ReconciliationDashboard } from "@/components/ledger/ReconciliationDashboard";
import { LedgerDetailModal } from "@/components/ledger/LedgerDetailModal";
import { LedgerEntry } from "@/lib/ledger/types";
import { ArrowLeft } from "lucide-react";

export default function ReconciliationPage() {
  const [selectedEntry, setSelectedEntry] = useState<LedgerEntry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleEntryClick = (entry: LedgerEntry) => {
    setSelectedEntry(entry);
    setIsDetailOpen(true);
  };

  return (
    <>
      <SEO 
        title="Reconciliation Report | Verified Savings Ledger"
        description="Executive reconciliation dashboard for verified savings tracking"
      />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link href="/ledger">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Ledger
              </Button>
            </Link>
          </div>

          <ReconciliationDashboard 
            report={mockReconciliationReport} 
            onEntryClick={handleEntryClick}
          />
        </div>
      </div>

      <LedgerDetailModal
        entry={selectedEntry}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}