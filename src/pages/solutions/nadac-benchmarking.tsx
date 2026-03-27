import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  Database, 
  Download, 
  FileText, 
  Filter, 
  Info, 
  Search, 
  ShieldAlert, 
  TrendingDown, 
  TrendingUp, 
  Zap 
} from "lucide-react";
import { SEO } from "@/components/SEO";

// Mock Data for NADAC Claims Benchmark
const benchmarkMetrics = {
  totalClaims: "1,245,892",
  timeframe: "Q1 - Q4 2025",
  totalPbmBilled: "$14,250,400",
  totalNadacCost: "$9,120,600",
  totalSpreadIdentified: "$5,129,800",
  spreadPercentage: "36%",
  criticalAnomalies: 4218,
};

const anomalyClaims = [
  { id: "CLM-99281", ndc: "00093-3147-01", drug: "Atorvastatin 40mg", type: "Generic", pharmacy: "CVS #1042", billed: 45.20, nadac: 3.15, spread: 42.05, variance: 1335, status: "critical" },
  { id: "CLM-99282", ndc: "68180-0720-01", drug: "Rosuvastatin 20mg", type: "Generic", pharmacy: "Walgreens #44", billed: 38.50, nadac: 2.80, spread: 35.70, variance: 1275, status: "critical" },
  { id: "CLM-99283", ndc: "00093-7152-56", drug: "Lisinopril 20mg", type: "Generic", pharmacy: "Mail Order (Owned)", billed: 22.00, nadac: 1.50, spread: 20.50, variance: 1366, status: "critical" },
  { id: "CLM-99284", ndc: "60505-2579-08", drug: "Aripiprazole 10mg", type: "Generic", pharmacy: "Independent Rx", billed: 25.40, nadac: 4.20, spread: 21.20, variance: 504, status: "warning" },
  { id: "CLM-99285", ndc: "00004-0068-01", drug: "Adalimumab-adaz 40mg", type: "Biosimilar", pharmacy: "Specialty (Owned)", billed: 2150.00, nadac: 1850.00, spread: 300.00, variance: 16, status: "warning" },
  { id: "CLM-99286", ndc: "00378-0018-01", drug: "Amoxicillin 10mg", type: "Generic", pharmacy: "CVS #1042", billed: 18.50, nadac: 1.20, spread: 17.30, variance: 1441, status: "critical" },
];

export default function NadacBenchmarkingPage() {
  const [activeTab, setActiveTab] = useState<"all" | "critical" | "warning">("all");

  const filteredClaims = anomalyClaims.filter(claim => 
    activeTab === "all" ? true : claim.status === activeTab
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <SEO 
        title="Platform Architecture | NADAC Claims Benchmarking" 
        description="Fiduciary-grade claims benchmarking against the National Average Drug Acquisition Cost (NADAC)." 
      />

      {/* Top Nav / Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest text-emerald-500 uppercase">Platform Architecture</div>
              <div className="text-sm font-medium text-zinc-100">NADAC Claims Benchmarking Engine</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
            <div className="h-4 w-px bg-zinc-800"></div>
            <span className="text-emerald-400/80 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Engine Active
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Page Title & Controls */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Claims Benchmark vs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">NADAC</span>
            </h1>
            <p className="text-zinc-400 max-w-2xl">
              Programmatic anomaly detection comparing PBM billed amounts against the National Average Drug Acquisition Cost. Identifying MAC list exploitation, spread pricing, and NDC manipulation in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
              <Filter className="h-4 w-4" /> Filter Dataset
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Download className="h-4 w-4" /> Export Audit File
            </button>
          </div>
        </div>

        {/* Global Metric Scorecard */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-zinc-800 bg-black p-5 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Database className="h-16 w-16 text-zinc-400" />
            </div>
            <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1">Total Claims Analyzed</div>
            <div className="text-3xl font-black text-white">{benchmarkMetrics.totalClaims}</div>
            <div className="mt-2 text-xs text-zinc-500">Period: {benchmarkMetrics.timeframe}</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-zinc-800 bg-black p-5 shadow-lg relative overflow-hidden"
          >
            <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              Total PBM Billed
              <TrendingUp className="h-4 w-4 text-red-400" />
            </div>
            <div className="text-3xl font-black text-white">{benchmarkMetrics.totalPbmBilled}</div>
            <div className="mt-2 text-xs text-zinc-500">Amount invoiced to the plan</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-zinc-800 bg-black p-5 shadow-lg relative overflow-hidden"
          >
            <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              True Acquisition Cost (NADAC)
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{benchmarkMetrics.totalNadacCost}</div>
            <div className="mt-2 text-xs text-zinc-500">Federal benchmark baseline</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/20 to-black p-5 shadow-[0_0_30px_rgba(239,68,68,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldAlert className="h-16 w-16 text-red-500" />
            </div>
            <div className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-1">Identified Spread Pricing</div>
            <div className="text-3xl font-black text-red-400">{benchmarkMetrics.totalSpreadIdentified}</div>
            <div className="mt-2 text-xs text-red-400/70 font-medium">
              Overall Margin: {benchmarkMetrics.spreadPercentage} • {benchmarkMetrics.criticalAnomalies} critical flags
            </div>
          </motion.div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Data Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden flex flex-col h-[600px]">
              {/* Table Header / Tabs */}
              <div className="border-b border-zinc-800 bg-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white">NDC Anomaly Detection Engine</h2>
                </div>
                
                <div className="flex space-x-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                  <button 
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === "all" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
                  >
                    All Anomalies
                  </button>
                  <button 
                    onClick={() => setActiveTab("critical")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${activeTab === "critical" ? "bg-red-500/20 text-red-400" : "text-zinc-400 hover:text-zinc-200"}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Critical
                  </button>
                  <button 
                    onClick={() => setActiveTab("warning")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${activeTab === "warning" ? "bg-amber-500/20 text-amber-400" : "text-zinc-400 hover:text-zinc-200"}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Warning
                  </button>
                </div>
              </div>

              {/* Table Content */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#111] sticky top-0 z-10 border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Drug / NDC</th>
                      <th className="px-4 py-3">Pharmacy</th>
                      <th className="px-4 py-3 text-right">NADAC</th>
                      <th className="px-4 py-3 text-right">Billed</th>
                      <th className="px-4 py-3 text-right">Spread ($)</th>
                      <th className="px-4 py-3 text-right">Variance (%)</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredClaims.map((claim, idx) => (
                      <motion.tr 
                        key={claim.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <div className="font-bold text-zinc-200">{claim.drug}</div>
                          <div className="text-xs text-zinc-500 font-mono mt-0.5">{claim.ndc} • {claim.type}</div>
                        </td>
                        <td className="px-4 py-3 text-zinc-400">
                          <span className={claim.pharmacy.includes("Owned") ? "text-amber-400/80 border-b border-amber-500/30 border-dashed pb-0.5" : ""}>
                            {claim.pharmacy}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-zinc-400">${claim.nadac.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-mono text-zinc-200">${claim.billed.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-red-400/90">${claim.spread.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className={`inline-flex items-center gap-1 font-mono font-bold px-2 py-0.5 rounded ${
                            claim.variance > 1000 ? "bg-red-500/10 text-red-400" :
                            claim.variance > 100 ? "bg-amber-500/10 text-amber-400" :
                            "bg-zinc-800 text-zinc-300"
                          }`}>
                            <TrendingUp className="h-3 w-3" />
                            {claim.variance}%
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {claim.status === "critical" ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                              <AlertTriangle className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                              <Info className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-zinc-800 bg-black p-3 text-center text-xs text-zinc-500">
                Showing {filteredClaims.length} of 4,218 flagged anomalies. <button className="text-emerald-400 hover:underline">Load more</button>
              </div>
            </div>
          </div>

          {/* Right Column: Analytics & Audit Request Automation */}
          <div className="space-y-6">
            
            {/* Context Module */}
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-[#0a0a0a] to-black p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" /> Spread Distribution
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-400">Generic Maintenance Meds</span>
                    <span className="text-zinc-200 font-mono">68% of spread</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-400">PBM-Owned Pharmacy Volume</span>
                    <span className="text-zinc-200 font-mono">24% of spread</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-400">Specialty & Biosimilars</span>
                    <span className="text-zinc-200 font-mono">8% of spread</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "8%" }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-zinc-900/50 p-4 border border-zinc-800/50 text-sm text-zinc-400 leading-relaxed">
                <span className="font-semibold text-emerald-400">Algorithm Insight:</span> The PBM is heavily manipulating the MAC list for high-volume generic fills (e.g., Atorvastatin, Lisinopril). This is classic "spread pricing" designed to evade detection by hiding margin in low-dollar, high-frequency claims.
              </div>
            </div>

            {/* Audit Request Automation Layer */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-black p-6 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div className="absolute top-0 right-0 p-3 opacity-20">
                <FileText className="h-24 w-24 text-emerald-500" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 relative z-10 flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-400" /> Audit Request Automation
              </h3>
              <p className="text-sm text-zinc-400 mb-6 relative z-10">
                The system has identified sufficient variance to trigger a formal contractual audit. Generate the legally-binding audit notification package.
              </p>

              <div className="space-y-3 relative z-10 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-zinc-300">Targeting 4,218 anomalous claims</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-zinc-300">Citing CAA 2026 §3101 Requirements</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-zinc-300">Invoking 36-month lookback clause</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] relative z-10">
                <FileText className="h-4 w-4" />
                Generate Audit Package
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}