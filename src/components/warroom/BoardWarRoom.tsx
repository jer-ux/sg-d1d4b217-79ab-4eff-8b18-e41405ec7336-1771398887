import { useState } from "react";
import { Shield, Award, AlertTriangle, ChevronRight, TrendingUp, TrendingDown, Info, FileText, Users, DollarSign, Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function BoardWarRoom() {
  const [selectedMetric, setSelectedMetric] = useState<"compliance" | "risk" | "initiatives" | "governance" | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white">Board of Directors Command Center</h3>
          <p className="text-sm text-neutral-400 mt-1">Governance, compliance & fiduciary oversight metrics</p>
        </div>
        <Badge className="bg-[#1A3A52]/20 text-[#B8860B] border border-[#1A3A52]">Executive Summary</Badge>
      </div>

      {/* Top-Level KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedMetric("compliance")}
          className={`bg-[#151B23] border rounded-lg p-5 text-left transition-all ${
            selectedMetric === "compliance" 
              ? "border-emerald-500 ring-2 ring-emerald-500/20" 
              : "border-[#2A3F54] hover:border-[#3A4F64]"
          }`}
        >
          <div className="text-xs font-mono text-neutral-400 mb-1">Fiduciary Compliance</div>
          <div className="text-2xl font-bold text-emerald-400">98%</div>
          <div className="text-xs text-emerald-400 mt-1">ERISA standards met</div>
        </button>
        
        <button
          onClick={() => setSelectedMetric("risk")}
          className={`bg-[#151B23] border rounded-lg p-5 text-left transition-all ${
            selectedMetric === "risk" 
              ? "border-yellow-500 ring-2 ring-yellow-500/20" 
              : "border-[#2A3F54] hover:border-[#3A4F64]"
          }`}
        >
          <div className="text-xs font-mono text-neutral-400 mb-1">Risk Exposure</div>
          <div className="text-2xl font-bold text-yellow-400">Low</div>
          <div className="text-xs text-neutral-400 mt-1">2 items flagged</div>
        </button>
        
        <button
          onClick={() => setSelectedMetric("initiatives")}
          className={`bg-[#151B23] border rounded-lg p-5 text-left transition-all ${
            selectedMetric === "initiatives" 
              ? "border-blue-500 ring-2 ring-blue-500/20" 
              : "border-[#2A3F54] hover:border-[#3A4F64]"
          }`}
        >
          <div className="text-xs font-mono text-neutral-400 mb-1">Contract Renewals</div>
          <div className="text-2xl font-bold text-white">Q2 2027</div>
          <div className="text-xs text-neutral-400 mt-1">Next major decision</div>
        </button>
        
        <button
          onClick={() => setSelectedMetric("governance")}
          className={`bg-[#151B23] border rounded-lg p-5 text-left transition-all ${
            selectedMetric === "governance" 
              ? "border-emerald-500 ring-2 ring-emerald-500/20" 
              : "border-[#2A3F54] hover:border-[#3A4F64]"
          }`}
        >
          <div className="text-xs font-mono text-neutral-400 mb-1">Audit Status</div>
          <div className="text-2xl font-bold text-emerald-400">Current</div>
          <div className="text-xs text-neutral-400 mt-1">Last audit: Oct 2026</div>
        </button>
      </div>

      {/* Drill-Down Panel */}
      {selectedMetric && (
        <div className="bg-[#0C1117] border border-[#1A3A52] rounded-lg p-8">
          {selectedMetric === "compliance" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Fiduciary Compliance Breakdown</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-300">ERISA Section 404 Adherence</span>
                      <span className="text-sm font-semibold text-emerald-400">100%</span>
                    </div>
                    <div className="h-2 bg-[#0F1419] rounded overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-300">DOL Reporting Standards</span>
                      <span className="text-sm font-semibold text-emerald-400">98%</span>
                    </div>
                    <div className="h-2 bg-[#0F1419] rounded overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "98%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-300">Plan Document Accuracy</span>
                      <span className="text-sm font-semibold text-emerald-400">96%</span>
                    </div>
                    <div className="h-2 bg-[#0F1419] rounded overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "96%" }} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#151B23] border border-[#2A3F54] rounded p-4">
                  <div className="text-xs font-mono text-neutral-400 mb-3">Compliance Audit Trail</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Form 5500 Filed</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">SPD Distribution Complete</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Fidelity Bond Updated</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Prohibited Transactions Review</span>
                      <Badge className="bg-yellow-900/20 text-yellow-400 border-0 text-[10px] px-2 py-0.5">In Progress</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-900/10 border border-emerald-900/40 rounded p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-neutral-300">
                    <span className="font-semibold text-emerald-400">Compliance Score: Excellent.</span> All ERISA fiduciary standards met. Minor documentation updates scheduled for Q1 2027.
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === "risk" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h4 className="text-lg font-semibold text-white">Enterprise Risk Assessment</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Vendor Concentration Risk</span>
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-0 text-xs">Medium</Badge>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                    78% of pharmacy spend concentrated with single PBM. Recommend diversification strategy for 2027 renewal.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#B8860B]">
                    <ChevronRight className="w-3 h-3" />
                    <span>Review mitigation plan</span>
                  </div>
                </div>

                <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Specialty Drug Volatility</span>
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-0 text-xs">Medium</Badge>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                    Specialty trend increased 18% YoY. Exposure to high-cost oncology and rare disease therapies rising.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#B8860B]">
                    <ChevronRight className="w-3 h-3" />
                    <span>View specialty carve-out analysis</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
                <div className="text-sm font-semibold text-white mb-4">Risk Mitigation Roadmap</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                    <div className="flex-1">
                      <div className="text-sm text-neutral-300">Q4 2026: Complete PBM contract audit</div>
                      <div className="text-xs text-emerald-400 mt-1">Completed</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                    <div className="flex-1">
                      <div className="text-sm text-neutral-300">Q1 2027: Evaluate specialty carve-out options</div>
                      <div className="text-xs text-blue-400 mt-1">In Progress - 40% complete</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neutral-600 mt-1.5" />
                    <div className="flex-1">
                      <div className="text-sm text-neutral-300">Q2 2027: Contract renegotiation & diversification</div>
                      <div className="text-xs text-neutral-400 mt-1">Scheduled</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === "initiatives" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-[#B8860B]" />
                <h4 className="text-lg font-semibold text-white">Strategic Initiatives Portfolio</h4>
              </div>

              <div className="space-y-4">
                <div className="bg-[#151B23] border border-emerald-900/40 rounded p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">PBM Contract Renegotiation</h5>
                      <p className="text-xs text-neutral-400">Target completion: Q1 2027</p>
                    </div>
                    <Badge className="bg-emerald-900/20 text-emerald-400 border-0">On Track</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Phase 1: Market analysis</span>
                      <span className="text-emerald-400 font-semibold">Complete</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Phase 2: RFP preparation</span>
                      <span className="text-blue-400 font-semibold">70% complete</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Phase 3: Vendor selection</span>
                      <span className="text-neutral-500 font-semibold">Not started</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#2A3F54]">
                    <div className="text-xs text-neutral-400">Projected Annual Impact</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">$2.4M - $3.1M savings</div>
                  </div>
                </div>

                <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">Cost-Plus Migration Analysis</h5>
                      <p className="text-xs text-neutral-400">Phase 1 of 3 complete</p>
                    </div>
                    <Badge className="bg-blue-900/20 text-blue-400 border-0">In Progress</Badge>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Benchmark analysis complete</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <div className="w-3 h-3 rounded-full border-2 border-blue-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      </div>
                      <span>Vendor due diligence in progress</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <div className="w-3 h-3 rounded-full border-2 border-neutral-600" />
                      <span>Implementation roadmap pending</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">Enhanced Fiduciary Controls</h5>
                      <p className="text-xs text-neutral-400">Ongoing optimization</p>
                    </div>
                    <Badge className="bg-emerald-900/20 text-emerald-400 border-0">Active</Badge>
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed">
                    Implementing enhanced audit rights, transparent fee disclosure requirements, and quarterly compliance reporting for all healthcare vendors.
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === "governance" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#B8860B]" />
                <h4 className="text-lg font-semibold text-white">Governance & Oversight</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
                  <div className="text-sm font-semibold text-white mb-4">Recent Board Actions</div>
                  <div className="space-y-3">
                    <div className="pb-3 border-b border-[#1F2937]">
                      <div className="text-xs text-neutral-400 mb-1">October 15, 2026</div>
                      <div className="text-sm text-neutral-200">Approved Q4 pharmacy benefit cost containment strategy</div>
                    </div>
                    <div className="pb-3 border-b border-[#1F2937]">
                      <div className="text-xs text-neutral-400 mb-1">September 22, 2026</div>
                      <div className="text-sm text-neutral-200">Authorized specialty drug carve-out feasibility study</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 mb-1">August 18, 2026</div>
                      <div className="text-sm text-neutral-200">Enhanced fiduciary liability coverage approved</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
                  <div className="text-sm font-semibold text-white mb-4">Upcoming Decisions</div>
                  <div className="space-y-3">
                    <div className="bg-[#1A3A52]/20 border border-[#1A3A52] rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-[#B8860B]" />
                        <span className="text-xs font-semibold text-[#B8860B]">Q1 2027 Board Meeting</span>
                      </div>
                      <ul className="space-y-1 text-xs text-neutral-300">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>2027 Plan Year benefit design approval</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>PBM contract renewal decision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>Fiduciary audit findings review</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-5">
                <div className="text-sm font-semibold text-white mb-4">Committee Structure</div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs font-mono text-neutral-400 mb-2">Benefits Committee</div>
                    <div className="text-xs text-neutral-300">4 members</div>
                    <div className="text-xs text-emerald-400 mt-1">Next meeting: Jan 15</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-400 mb-2">Audit Committee</div>
                    <div className="text-xs text-neutral-300">3 members</div>
                    <div className="text-xs text-emerald-400 mt-1">Next meeting: Jan 22</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-400 mb-2">Compliance Oversight</div>
                    <div className="text-xs text-neutral-300">5 members</div>
                    <div className="text-xs text-emerald-400 mt-1">Next meeting: Feb 5</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Items Summary */}
      <div className="bg-[#1A3A52]/10 border border-[#1A3A52] rounded-lg p-6">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#B8860B]" />
          Board Action Items
        </h4>
        <div className="space-y-2 text-sm text-neutral-300">
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
            <span>Review and approve Q4 pharmacy benefit cost containment strategy</span>
          </div>
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
            <span>Evaluate specialty drug carve-out proposal for 2027 plan year</span>
          </div>
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
            <span>Approve enhanced fiduciary liability coverage recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );
}