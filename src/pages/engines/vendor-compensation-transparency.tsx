import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Shield,
  FileSearch,
  BarChart3,
  FileText,
  Download,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VendorCompensationTransparencyEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Vendor Compensation Transparency Engine | Kincaid IQ</title>
        <meta
          name="description"
          content="Expose hidden vendor revenue streams and quantify total compensation across PBMs, TPAs, and benefits consultants."
        />
      </Head>

      <div className="min-h-screen bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/engines">
            <Button variant="ghost" className="mb-6 text-neutral-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Engines
            </Button>
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg">
                <Eye className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Vendor Compensation Transparency Engine</h1>
                <p className="text-neutral-400 mt-1">Expose hidden revenue and total compensation structures</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                Fiduciary Compliance
              </Badge>
              <Badge variant="outline" className="border-rose-500/30 text-rose-400">
                Revenue Detection
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Contract Analysis
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-neutral-900 border border-neutral-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">What It Does</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  The Vendor Compensation Transparency Engine deconstructs complex vendor compensation
                  arrangements to expose all revenue streams—not just the disclosed fees. By analyzing
                  contracts, claims data, and industry benchmarks, this engine reveals spread pricing,
                  rebate retention, administrative fees, data access charges, and other hidden compensation
                  mechanisms. Know exactly what you're paying and whether vendors are operating with full
                  transparency.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4"
                  >
                    <Search className="h-5 w-5 text-amber-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Revenue Stream Mapping</h3>
                    <p className="text-xs text-neutral-400">
                      Identify all compensation sources: fees, spreads, rebates, data sales, and undisclosed
                      revenue
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-lg p-4"
                  >
                    <DollarSign className="h-5 w-5 text-rose-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Total Compensation Calculation</h3>
                    <p className="text-xs text-neutral-400">
                      Quantify actual vendor earnings versus disclosed fees to reveal true cost of services
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <Shield className="h-5 w-5 text-blue-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Conflict Detection</h3>
                    <p className="text-xs text-neutral-400">
                      Flag arrangements where vendor incentives conflict with plan sponsor's best interests
                    </p>
                  </motion.div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Why It Matters</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">ERISA Fiduciary Requirement</p>
                      <p className="text-sm text-neutral-400">
                        Plan sponsors must understand and monitor all forms of vendor compensation to meet
                        ERISA's prudent person standard. Hidden fees create fiduciary liability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Uncover Cost Leakage</p>
                      <p className="text-sm text-neutral-400">
                        Vendors often earn 2-4x their stated fees through undisclosed spreads and rebate
                        retention. This engine exposes the real compensation picture.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Negotiation Leverage</p>
                      <p className="text-sm text-neutral-400">
                        Armed with total compensation data, you can negotiate from a position of strength and
                        demand pass-through economics or transparent pricing.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="use-cases" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <FileSearch className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">PBM Spread Pricing Exposure</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Compare ingredient costs from NADAC benchmarks to PBM charges. Quantify spread pricing on
                    every claim and calculate total hidden compensation from pharmacy markups.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Revealed $2.8M in annual undisclosed
                    PBM earnings
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-rose-500/20 rounded-lg">
                      <DollarSign className="h-5 w-5 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Rebate Retention Analysis</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Audit manufacturer rebate agreements against actual rebate payments. Identify retained
                    rebates, withheld guarantees, and phantom rebate programs that enrich the PBM.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Recovered $1.4M in withheld
                    guarantees
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Broker Compensation Disclosure</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Map all broker revenue sources including commissions, bonuses, override payments, carrier
                    profit-sharing, and volume incentives that create conflicts of interest.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Exposed 4.2x disclosed fee ratio on
                    total comp
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">TPA Revenue Audit</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Scrutinize TPA contracts for hidden fees like data access charges, network rental fees,
                    claims repricing fees, and administrative surcharges not captured in base PEPM rates.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Found $385K in undisclosed annual
                    charges
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Key Insights & Metrics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">3.2x</div>
                    <div className="text-sm text-neutral-400">
                      Average multiple of actual vs. disclosed PBM compensation
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">$4.6M</div>
                    <div className="text-sm text-neutral-400">Hidden vendor revenue exposed annually</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">68%</div>
                    <div className="text-sm text-neutral-400">Of plans have undisclosed vendor revenue streams</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Spread Pricing Prevalence</h3>
                    <p className="text-sm text-neutral-400">
                      87% of PBM contracts contain spread pricing provisions averaging 18-24% markup on generic
                      drugs
                    </p>
                  </div>

                  <div className="border-l-4 border-rose-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Rebate Retention</h3>
                    <p className="text-sm text-neutral-400">
                      Average PBM retains 22% of manufacturer rebates despite "pass-through" contract language
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Broker Compensation Opacity</h3>
                    <p className="text-sm text-neutral-400">
                      Actual broker compensation averages 4.2x disclosed fees when including overrides and
                      profit-sharing
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="methodology" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">How It Works</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                        1
                      </div>
                      <h3 className="text-white font-semibold">Contract Ingestion</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Extract all compensation provisions, fee schedules, rebate terms, and revenue-sharing
                      clauses from PBM, TPA, and broker agreements
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-white font-semibold">Claims-Based Verification</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Compare actual claims pricing to benchmark costs (NADAC, AWP, WAC) to calculate spread
                      pricing on every transaction
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-white font-semibold">Rebate Reconciliation</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Model expected rebates based on formulary utilization and manufacturer agreements, then
                      compare to actual payments received
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-sm font-bold">
                        4
                      </div>
                      <h3 className="text-white font-semibold">Hidden Fee Detection</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Scan invoices, remittance reports, and financial statements for undisclosed charges like
                      data fees, network access fees, and administrative surcharges
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                        5
                      </div>
                      <h3 className="text-white font-semibold">Total Compensation Report</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Aggregate all revenue streams into a comprehensive vendor compensation statement with
                      benchmarking against industry standards
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Vendor contracts and amendments
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Claims data with pricing details
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Rebate payment statements
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Vendor invoices and remittance reports
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Industry pricing benchmarks
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Financial disclosure documents
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <BarChart3 className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run This Analysis</h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Get a complete vendor compensation transparency report exposing all revenue streams and
                  quantifying total earnings within 7-10 business days.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Analysis
                  </Button>
                  <Button variant="outline" className="border-neutral-700 text-neutral-300">
                    <Download className="h-4 w-4 mr-2" />
                    Sample Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}