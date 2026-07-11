import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  BarChart3,
  FileText,
  Download,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TPAGovernanceScoringEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>TPA Governance Scoring Engine | Kincaid IQ</title>
        <meta
          name="description"
          content="Assess third-party administrator oversight quality and identify fiduciary governance gaps."
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
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">TPA Governance Scoring Engine</h1>
                <p className="text-neutral-400 mt-1">
                  Assess administrator oversight and fiduciary governance quality
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Fiduciary Governance
              </Badge>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                ERISA Compliance
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                Vendor Oversight
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
                  The TPA Governance Scoring Engine evaluates your third-party administrator oversight across
                  contract compliance, performance monitoring, data security, claims administration accuracy,
                  and fiduciary protocols. It produces a quantitative governance maturity score that
                  identifies specific gaps in TPA oversight and provides actionable remediation steps to meet
                  ERISA prudent person standards.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <Scale className="h-5 w-5 text-blue-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Governance Maturity Assessment</h3>
                    <p className="text-xs text-neutral-400">
                      Score TPA oversight across contract compliance, performance monitoring, and fiduciary
                      controls
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4"
                  >
                    <AlertTriangle className="h-5 w-5 text-purple-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Risk Gap Identification</h3>
                    <p className="text-xs text-neutral-400">
                      Flag missing oversight controls, documentation gaps, and compliance vulnerabilities
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4"
                  >
                    <FileCheck className="h-5 w-5 text-emerald-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Remediation Roadmap</h3>
                    <p className="text-xs text-neutral-400">
                      Prioritized action plan to elevate governance maturity and close fiduciary gaps
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
                      <p className="text-white font-medium">ERISA Fiduciary Obligation</p>
                      <p className="text-sm text-neutral-400">
                        Plan fiduciaries must prudently select and monitor TPAs. Poor oversight creates
                        personal liability for breaches and losses.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Prevent Claims Errors</p>
                      <p className="text-sm text-neutral-400">
                        Weak TPA governance leads to claims processing errors, overpayments, and member
                        complaints. Structured oversight catches issues before they compound.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Audit Readiness</p>
                      <p className="text-sm text-neutral-400">
                        DOL audits scrutinize TPA oversight documentation. A strong governance score proves
                        you've met your monitoring obligations.
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
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FileCheck className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Contract Compliance Audit</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Verify TPA is meeting contractual SLAs for claims turnaround, customer service response
                    times, data accuracy, and reporting deliverables. Document gaps for renegotiation.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Found 14 unmet SLA provisions worth
                    $180K in penalties
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Claims Accuracy Review</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Sample processed claims to measure error rates, improper payments, and adjudication
                    quality. Compare to industry benchmarks and contract standards.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Detected 4.2% error rate vs. 1.5%
                    contract threshold
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Shield className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Data Security Assessment</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Evaluate TPA's cybersecurity controls, PHI protection, breach notification protocols, and
                    BAA compliance. Identify vulnerabilities before they become incidents.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Found missing encryption on data
                    extracts
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Performance Benchmarking</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Compare TPA service levels against industry standards and peer performance. Quantify
                    whether you're getting competitive value or underperformance.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> TPA ranked bottom quartile on 6 of
                    11 metrics
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Key Insights & Metrics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">62/100</div>
                    <div className="text-sm text-neutral-400">Average TPA governance maturity score</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">73%</div>
                    <div className="text-sm text-neutral-400">
                      Of plans lack formal TPA performance monitoring
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">$420K</div>
                    <div className="text-sm text-neutral-400">Average recoveries from TPA governance audits</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Common Governance Gaps</h3>
                    <p className="text-sm text-neutral-400">
                      Missing: quarterly performance reviews (68%), claims accuracy audits (54%), cybersecurity
                      assessments (61%)
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Claims Error Exposure</h3>
                    <p className="text-sm text-neutral-400">
                      Plans with weak TPA governance average 3.8% claims error rates vs. 1.2% for well-governed
                      arrangements
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Fiduciary Risk</h3>
                    <p className="text-sm text-neutral-400">
                      87% of DOL enforcement actions cite inadequate service provider monitoring as a
                      contributory factor
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
                      <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
                        1
                      </div>
                      <h3 className="text-white font-semibold">Contract & Documentation Review</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Analyze TPA service agreement, SLAs, performance guarantees, reporting requirements, and
                      monitoring protocols to establish baseline obligations
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-white font-semibold">Performance Data Collection</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Gather claims turnaround reports, customer service metrics, data accuracy audits, and
                      operational dashboards from the TPA
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-white font-semibold">Claims Sampling & Audit</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Pull stratified sample of processed claims and validate adjudication accuracy,
                      overpayment detection, and coding compliance
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                        4
                      </div>
                      <h3 className="text-white font-semibold">Governance Control Assessment</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Evaluate plan sponsor's oversight protocols: committee reviews, audit schedules,
                      cybersecurity validations, and remediation tracking
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                        5
                      </div>
                      <h3 className="text-white font-semibold">Maturity Score & Remediation Plan</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Quantify governance maturity across 12 dimensions, benchmark against best practices, and
                      deliver prioritized remediation roadmap
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    TPA service agreements and SLAs
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Performance dashboards and reports
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Claims adjudication samples
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Audit and oversight documentation
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Cybersecurity assessment reports
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Member satisfaction surveys
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <BarChart3 className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run This Analysis</h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Get a comprehensive TPA governance maturity assessment with scored evaluation and prioritized
                  remediation plan within 5-7 business days.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
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