import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  DollarSign,
  AlertTriangle,
  FileCheck2,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  Clock,
  Target,
  BarChart3,
  Link as LinkIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ContractObligation {
  id: string;
  vendor: string;
  category: string;
  annualValue: number;
  status: "compliant" | "warning" | "critical";
  costVariance: number;
  projectedCost: number;
  actualCost: number;
  issues: string[];
  evidenceCount: number;
  lastAudit: string;
}

interface EvidenceLink {
  id: string;
  type: "receipt" | "audit" | "invoice" | "contract";
  title: string;
  timestamp: string;
  confidence: number;
}

const mockContracts: ContractObligation[] = [
  {
    id: "pbm-cvs-2024",
    vendor: "CVS Caremark",
    category: "PBM Services",
    annualValue: 8400000,
    status: "critical",
    costVariance: 1260000,
    projectedCost: 7200000,
    actualCost: 8460000,
    issues: [
      "Spread pricing detected: $890K variance",
      "Missing rebate pass-through documentation",
      "Specialty claims 22% over projection"
    ],
    evidenceCount: 47,
    lastAudit: "2 hours ago"
  },
  {
    id: "tpa-uhc-2024",
    vendor: "UnitedHealthcare",
    category: "TPA Administration",
    annualValue: 2100000,
    status: "compliant",
    costVariance: -45000,
    projectedCost: 2145000,
    actualCost: 2100000,
    issues: [],
    evidenceCount: 32,
    lastAudit: "5 hours ago"
  },
  {
    id: "stoploss-aetna-2024",
    vendor: "Aetna Stop-Loss",
    category: "Stop-Loss Insurance",
    annualValue: 3200000,
    status: "warning",
    costVariance: 280000,
    projectedCost: 2920000,
    actualCost: 3200000,
    issues: [
      "Two large claims exceeded specific limit",
      "Aggregate corridor nearing threshold"
    ],
    evidenceCount: 28,
    lastAudit: "1 day ago"
  },
  {
    id: "broker-lockton-2024",
    vendor: "Lockton Companies",
    category: "Broker Services",
    annualValue: 450000,
    status: "compliant",
    costVariance: 0,
    projectedCost: 450000,
    actualCost: 450000,
    issues: [],
    evidenceCount: 18,
    lastAudit: "3 hours ago"
  },
  {
    id: "specialty-accredo-2024",
    vendor: "Accredo Specialty",
    category: "Specialty Pharmacy",
    annualValue: 4800000,
    status: "warning",
    costVariance: 620000,
    projectedCost: 4180000,
    actualCost: 4800000,
    issues: [
      "GLP-1 utilization 34% above forecast",
      "Gene therapy claim: $1.2M single patient"
    ],
    evidenceCount: 41,
    lastAudit: "6 hours ago"
  }
];

const mockEvidenceLinks: EvidenceLink[] = [
  {
    id: "rec-001",
    type: "receipt",
    title: "CVS Monthly Claims Summary - June 2026",
    timestamp: "2 hours ago",
    confidence: 0.94
  },
  {
    id: "aud-002",
    type: "audit",
    title: "Q2 PBM Audit Report - Independent CPA",
    timestamp: "1 day ago",
    confidence: 0.98
  },
  {
    id: "inv-003",
    type: "invoice",
    title: "CVS Invoice #CVS-2026-06-847",
    timestamp: "3 days ago",
    confidence: 0.96
  },
  {
    id: "con-004",
    type: "contract",
    title: "Master Service Agreement - CVS 2024-2027",
    timestamp: "45 days ago",
    confidence: 1.0
  }
];

export function CFOContractDashboard() {
  const [selectedContract, setSelectedContract] = useState<ContractObligation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const compliantCount = mockContracts.filter(c => c.status === "compliant").length;
  const warningCount = mockContracts.filter(c => c.status === "warning").length;
  const criticalCount = mockContracts.filter(c => c.status === "critical").length;

  const totalProjected = mockContracts.reduce((sum, c) => sum + c.projectedCost, 0);
  const totalActual = mockContracts.reduce((sum, c) => sum + c.actualCost, 0);
  const totalVariance = totalActual - totalProjected;

  const allIssues = mockContracts.flatMap(c => 
    c.issues.map(issue => ({ contract: c.vendor, issue, status: c.status }))
  );

  const totalEvidence = mockContracts.reduce((sum, c) => sum + c.evidenceCount, 0);

  const handleTileClick = (contract: ContractObligation) => {
    setSelectedContract(contract);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 4-Tile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tile 1: Compliance Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-950/80 to-slate-900/80 border-2 border-slate-700/50 p-6 hover:border-emerald-500/50 transition-all cursor-pointer group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                    <Shield className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Compliance Status</h3>
                    <p className="text-xs text-slate-400">Contract adherence across vendors</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-2xl font-black text-emerald-400">{compliantCount}</span>
                  </div>
                  <span className="text-xs text-emerald-300/80">Compliant</span>
                </div>
                <div className="text-center p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-2xl font-black text-amber-400">{warningCount}</span>
                  </div>
                  <span className="text-xs text-amber-300/80">Warning</span>
                </div>
                <div className="text-center p-3 bg-rose-950/30 border border-rose-500/20 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-2xl font-black text-rose-400">{criticalCount}</span>
                  </div>
                  <span className="text-xs text-rose-300/80">Critical</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Updated 2m ago
                </span>
                <span className="flex items-center gap-1 text-emerald-400 group-hover:gap-2 transition-all">
                  View details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tile 2: Cost Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-950/80 to-slate-900/80 border-2 border-slate-700/50 p-6 hover:border-rose-500/50 transition-all cursor-pointer group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-500/10 border border-rose-400/30 rounded-xl">
                    <DollarSign className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Cost Performance</h3>
                    <p className="text-xs text-slate-400">Projected vs actual spend</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Projected Annual</span>
                  <span className="text-lg font-bold text-white">${(totalProjected / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Actual YTD</span>
                  <span className="text-lg font-bold text-white">${(totalActual / 1000000).toFixed(1)}M</span>
                </div>
                <div className="pt-3 border-t border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-300">Variance</span>
                    <div className="flex items-center gap-2">
                      {totalVariance > 0 ? (
                        <TrendingUp className="w-4 h-4 text-rose-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                      )}
                      <span className={`text-xl font-black ${totalVariance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {totalVariance > 0 ? '+' : ''}{((totalVariance / totalProjected) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 text-right">
                    <span className={`text-xs font-semibold ${totalVariance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      ${Math.abs(totalVariance).toLocaleString()} {totalVariance > 0 ? 'over' : 'under'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" /> Real-time tracking
                </span>
                <span className="flex items-center gap-1 text-rose-400 group-hover:gap-2 transition-all">
                  View breakdown <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tile 3: Issue Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-950/80 to-slate-900/80 border-2 border-slate-700/50 p-6 hover:border-amber-500/50 transition-all cursor-pointer group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 border border-amber-400/30 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Issue Analysis</h3>
                    <p className="text-xs text-slate-400">Root causes for variances</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4 max-h-[180px] overflow-y-auto custom-scrollbar">
                {allIssues.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 border border-slate-700/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        item.status === 'critical' ? 'bg-rose-400' :
                        item.status === 'warning' ? 'bg-amber-400' :
                        'bg-emerald-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-400 mb-0.5">{item.contract}</div>
                        <div className="text-sm text-white leading-tight">{item.issue}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Target className="w-3 h-3" /> {allIssues.length} total issues
                </span>
                <span className="flex items-center gap-1 text-amber-400 group-hover:gap-2 transition-all">
                  View all <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tile 4: Evidence Lineage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-950/80 to-slate-900/80 border-2 border-slate-700/50 p-6 hover:border-blue-500/50 transition-all cursor-pointer group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-400/30 rounded-xl">
                    <FileCheck2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Evidence Lineage</h3>
                    <p className="text-xs text-slate-400">Full audit trail proof chain</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black text-blue-400">{totalEvidence}</span>
                  <span className="text-sm text-slate-400">receipts</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-blue-950/20 border border-blue-500/20 rounded">
                    <div className="text-xs text-slate-400">Avg Confidence</div>
                    <div className="text-lg font-bold text-blue-400">96.2%</div>
                  </div>
                  <div className="p-2 bg-blue-950/20 border border-blue-500/20 rounded">
                    <div className="text-xs text-slate-400">Data Quality</div>
                    <div className="text-lg font-bold text-blue-400">98.7%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {mockEvidenceLinks.slice(0, 3).map((link, idx) => (
                  <div key={link.id} className="flex items-center gap-2 p-2 bg-slate-900/40 border border-slate-700/30 rounded-lg text-xs">
                    <LinkIcon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0 truncate text-slate-300">{link.title}</div>
                    <span className="text-emerald-400 font-semibold flex-shrink-0">{Math.round(link.confidence * 100)}%</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> ERISA compliant
                </span>
                <span className="flex items-center gap-1 text-blue-400 group-hover:gap-2 transition-all">
                  View chain <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Contract List */}
      <Card className="bg-gradient-to-br from-slate-950/80 to-slate-900/80 border-2 border-slate-700/50 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Top Contract Obligations</h3>
        <div className="space-y-3">
          {mockContracts.map((contract) => (
            <div
              key={contract.id}
              onClick={() => handleTileClick(contract)}
              className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-700/50 rounded-lg hover:border-slate-600/80 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-3 h-3 rounded-full ${
                  contract.status === 'compliant' ? 'bg-emerald-400' :
                  contract.status === 'warning' ? 'bg-amber-400' :
                  'bg-rose-400'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{contract.vendor}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{contract.category}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Annual Value: ${(contract.annualValue / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1">Variance</div>
                  <div className={`text-sm font-bold ${
                    contract.costVariance > 0 ? 'text-rose-400' :
                    contract.costVariance < 0 ? 'text-emerald-400' :
                    'text-slate-400'
                  }`}>
                    {contract.costVariance > 0 ? '+' : ''}{((contract.costVariance / contract.projectedCost) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="text-slate-400 group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Drill-Down Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl bg-slate-950 border-l border-slate-800">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-white">
              {selectedContract?.vendor}
            </SheetTitle>
            <SheetDescription className="text-slate-400">
              {selectedContract?.category} • Annual Value: ${selectedContract && (selectedContract.annualValue / 1000000).toFixed(1)}M
            </SheetDescription>
          </SheetHeader>

          {selectedContract && (
            <div className="mt-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${
                  selectedContract.status === 'compliant' ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' :
                  selectedContract.status === 'warning' ? 'bg-amber-950/30 border-amber-500/30 text-amber-400' :
                  'bg-rose-950/30 border-rose-500/30 text-rose-400'
                }`}>
                  {selectedContract.status === 'compliant' ? <CheckCircle2 className="w-4 h-4" /> :
                   selectedContract.status === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                   <XCircle className="w-4 h-4" />}
                  <span className="text-sm font-bold capitalize">{selectedContract.status}</span>
                </div>
                <div className="text-xs text-slate-500">
                  Last audit: {selectedContract.lastAudit}
                </div>
              </div>

              {/* Cost Analysis */}
              <Card className="bg-slate-900/60 border-slate-700/50 p-4">
                <h4 className="text-sm font-bold text-white mb-4">Cost Analysis</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Projected Cost</span>
                    <span className="text-sm font-bold text-white">${selectedContract.projectedCost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Actual Cost</span>
                    <span className="text-sm font-bold text-white">${selectedContract.actualCost.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-300">Variance</span>
                    <span className={`text-lg font-black ${
                      selectedContract.costVariance > 0 ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {selectedContract.costVariance > 0 ? '+' : ''}${Math.abs(selectedContract.costVariance).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Issues */}
              {selectedContract.issues.length > 0 && (
                <Card className="bg-slate-900/60 border-slate-700/50 p-4">
                  <h4 className="text-sm font-bold text-white mb-4">Identified Issues</h4>
                  <div className="space-y-3">
                    {selectedContract.issues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-950/40 border border-slate-700/30 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 leading-relaxed">{issue}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Evidence Links */}
              <Card className="bg-slate-900/60 border-slate-700/50 p-4">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                  <span>Evidence Chain</span>
                  <span className="text-xs text-slate-500">{selectedContract.evidenceCount} receipts</span>
                </h4>
                <div className="space-y-2">
                  {mockEvidenceLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-700/30 rounded-lg hover:border-blue-500/30 transition-all cursor-pointer">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        link.type === 'receipt' ? 'bg-blue-500/10 text-blue-400' :
                        link.type === 'audit' ? 'bg-emerald-500/10 text-emerald-400' :
                        link.type === 'invoice' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        <FileCheck2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{link.title}</div>
                        <div className="text-xs text-slate-500">{link.timestamp}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-xs text-emerald-400 font-bold">{Math.round(link.confidence * 100)}%</div>
                        <Shield className="w-3 h-3 text-emerald-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                View Full Contract Analysis
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }
      `}</style>
    </div>
  );
}