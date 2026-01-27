import { useState } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CreateReceiptModal } from "@/components/ledger/CreateReceiptModal";
import { LillyEdgarEvidenceCard } from "@/components/ledger/LillyEdgarEvidenceCard";
import { FileCheck2, FileJson, Shield, Database, GitBranch, CheckCircle2 } from "lucide-react";

export default function EvidenceReceiptsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SEO
        title="Evidence Receipts • SiriusB iQ"
        description="Generate cryptographically verifiable evidence receipts that link external authoritative sources with internal data lineage, transforms, DQ tests, and reconciliation checks."
      />
      <Nav />
      <main className="min-h-screen bg-gradient-to-b from-[#0A1020] via-[#0D1629] to-[#0A1020] text-white">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold mb-6">
              <FileCheck2 className="w-4 h-4 text-blue-400" />
              Evidence Receipt System
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Evidence Receipts
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Generate cryptographically verifiable receipts that connect external authoritative sources (SEC EDGAR, CMS.gov) with internal data lineage, transforms, DQ tests, and reconciliation checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Shield className="w-8 h-8 text-green-400 mb-3" />
              <div className="text-sm font-semibold text-white mb-2">Authoritative Pointers</div>
              <div className="text-sm text-white/65">Link to external sources like SEC EDGAR and CMS.gov as evidence artifacts</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Database className="w-8 h-8 text-blue-400 mb-3" />
              <div className="text-sm font-semibold text-white mb-2">Internal Lineage</div>
              <div className="text-sm text-white/65">Track source artifacts, checksums, row counts, and load timestamps</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <GitBranch className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-sm font-semibold text-white mb-2">Transform Hashes</div>
              <div className="text-sm text-white/65">Record SQL transform versions with code hashes and query IDs</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Example: Eli Lilly SEC EDGAR Evidence</h2>
                <button
                  onClick={() => setModalOpen(true)}
                  className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-400 hover:bg-green-400/20 flex items-center gap-2"
                >
                  <FileJson className="w-4 h-4" />
                  Create Receipt (Demo)
                </button>
              </div>
              <LillyEdgarEvidenceCard />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold mb-4">Receipt Structure</h3>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white mb-2">Subject Metadata</div>
                  <div className="text-sm text-white/65">Links the receipt to a specific KPI, tile, or event with period and grain information</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white mb-2">Verification Status</div>
                  <div className="text-sm text-white/65">VERIFIED (DQ + reconciliation pass), PARTIAL (warnings), or BLOCKED (failures)</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white mb-2">Evidence Chain</div>
                  <div className="text-sm text-white/65 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>External artifacts: Authoritative pointers to SEC, CMS, etc.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Internal artifacts: Source files with checksums and row counts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Transforms: SQL code hashes, versions, and query IDs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>DQ tests: Quality gate results with pass/warn/fail status</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Reconciliation: Cross-source validation checks</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white mb-2">Policy Enforcement</div>
                  <div className="text-sm text-white/65">
                    No Receipt → No Metric | Derived metrics require internal gates | External artifacts support narrative claims only
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Key Principles</h3>
              <div className="space-y-3 text-sm text-white/75">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-white">External Authoritative Pointers:</strong> SEC EDGAR, CMS.gov, and other public sources serve as evidence artifacts that support narrative claims but do not directly verify internal metrics.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Internal Verification Gates:</strong> Any KPI or metric derived from internal data MUST pass DQ tests and reconciliation checks to achieve VERIFIED status.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Transform Hash Tracking:</strong> Every SQL transform is versioned with a code hash, ensuring reproducibility and auditability of all derived metrics.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Receipt = Proof:</strong> Each receipt is an exportable JSON artifact that can be stored, audited, and referenced by downstream systems or regulatory bodies.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <CreateReceiptModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        subjectType="KPI"
        subjectId="MEDICAL_SPEND_PMPM"
        periodStart="2025-01-01"
        periodEnd="2025-01-31"
        grain="MONTHLY"
      />
    </>
  );
}