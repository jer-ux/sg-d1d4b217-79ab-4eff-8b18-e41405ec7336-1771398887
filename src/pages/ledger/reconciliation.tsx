import { SEO } from "@/components/SEO";
import { mockReconciliationReport } from "@/lib/ledger/mock";
import { ReconciliationReport } from "@/components/ledger/ReconciliationReport";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ReconciliationPage() {
  return (
    <>
      <SEO
        title="Reconciliation Report — Verified Savings Ledger"
        description="Finance-native reconciliation reporting with exceptions, audit trails, and board-ready summaries."
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

          <ReconciliationReport report={mockReconciliationReport} />
        </div>
      </div>
    </>
  );
}