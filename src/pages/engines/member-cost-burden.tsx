import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Users,
  BarChart3,
  FileText,
  Download,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MemberCostBurdenEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Member Cost Burden Engine | Kincaid IQ</title>
        <meta
          name="description"
          content="Quantify employee out-of-pocket healthcare costs and financial strain to optimize benefit design."
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
                <DollarSign className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Member Cost Burden Engine</h1>
                <p className="text-neutral-400 mt-1">
                  Quantify employee out-of-pocket costs and financial strain
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                Healthcare Economics
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Benefit Design
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                Affordability Analysis
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
                  The Member Cost Burden Engine calculates total employee out-of-pocket healthcare spend across
                  premiums, deductibles, copays, coinsurance, and non-covered services. It segments employees by
                  income level, family status, and utilization to identify populations experiencing financial
                  hardship. The analysis quantifies affordability metrics, compares to wage data, and models the
                  impact of benefit design changes on employee financial wellness.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4"
                  >
                    <DollarSign className="h-5 w-5 text-amber-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Total Cost Burden Calculation</h3>
                    <p className="text-xs text-neutral-400">
                      Sum premiums, deductibles, copays, coinsurance, and out-of-network costs per employee
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <Users className="h-5 w-5 text-blue-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Population Segmentation</h3>
                    <p className="text-xs text-neutral-400">
                      Segment by income, family status, chronic conditions, and utilization patterns
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4"
                  >
                    <TrendingUp className="h-5 w-5 text-emerald-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Benefit Design Impact Modeling</h3>
                    <p className="text-xs text-neutral-400">
                      Simulate how changes to deductibles, copays, or plan design affect cost burden
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
                      <p className="text-white font-medium">Employee Financial Wellness</p>
                      <p className="text-sm text-neutral-400">
                        High out-of-pocket costs create financial stress, reduce care adherence, and contribute
                        to employee dissatisfaction and turnover.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Benefit Competitiveness</p>
                      <p className="text-sm text-neutral-400">
                        Candidates and employees compare affordability across employers. Excessive cost burden
                        makes your benefits package less competitive.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Optimize Plan Design</p>
                      <p className="text-sm text-neutral-400">
                        Understand which cost-sharing levers (deductibles, copays, HSA contributions) provide
                        the best balance between employee affordability and plan cost.
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
                      <DollarSign className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Affordability Benchmarking</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Compare employee cost burden as a percentage of wages against industry benchmarks and ACA
                    affordability thresholds to assess competitiveness.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Identified 18% of employees exceed 10%
                    of income on healthcare
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">High-Burden Population Analysis</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Identify employees facing disproportionate out-of-pocket costs due to chronic conditions,
                    family size, or high utilization events.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 240 employees with >$8K annual
                    out-of-pocket spend
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Plan Design Optimization</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Model how deductible changes, copay adjustments, or HSA contributions shift cost burden
                    across employee segments while managing total plan cost.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> $1,200 deductible reduction saves
                    employees $980K annually
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Care Avoidance Risk</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Flag populations where high cost-sharing may deter necessary care, leading to worse health
                    outcomes and higher long-term costs.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Found 14% delay care due to
                    out-of-pocket costs
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Key Insights & Metrics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">$4,800</div>
                    <div className="text-sm text-neutral-400">Average employee annual out-of-pocket spend</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">8.2%</div>
                    <div className="text-sm text-neutral-400">
                      Of median employee income spent on healthcare
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">22%</div>
                    <div className="text-sm text-neutral-400">
                      Of employees exceed 10% income threshold
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Premium Contribution Trends</h3>
                    <p className="text-sm text-neutral-400">
                      Employee premium contributions have grown 78% in the past decade, outpacing wage growth by
                      2.4x
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Family Coverage Disparity</h3>
                    <p className="text-sm text-neutral-400">
                      Family coverage members face 3.2x higher out-of-pocket costs than single coverage,
                      disproportionately affecting lower-income households
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Chronic Condition Impact</h3>
                    <p className="text-sm text-neutral-400">
                      Employees with 2+ chronic conditions average $9,200 annual OOP costs vs. $2,100 for
                      healthy employees
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
                      <h3 className="text-white font-semibold">Premium & Enrollment Data Collection</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Gather employee premium contributions by plan tier, payroll deductions, and enrollment
                      elections
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-white font-semibold">Claims & Cost-Sharing Analysis</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Calculate total deductibles, copays, coinsurance, and out-of-network costs from claims
                      data by member
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-white font-semibold">Income & Wage Mapping</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Match OOP costs to employee W-2 income data to calculate burden as percentage of wages
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                        4
                      </div>
                      <h3 className="text-white font-semibold">Segmentation & Risk Stratification</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Group employees by income quartile, family size, chronic conditions, and utilization to
                      identify high-burden populations
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                        5
                      </div>
                      <h3 className="text-white font-semibold">Benefit Design Impact Simulation</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Model scenarios (lower deductibles, enhanced copay tiers, HSA employer contributions) and
                      quantify OOP impact by segment
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Employee premium contribution records
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Medical and pharmacy claims data
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    W-2 wage and income data
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Plan design documents (SPDs)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Enrollment and eligibility files
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Health risk assessment data
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
                  Get a comprehensive member cost burden assessment with segmentation, affordability metrics,
                  and benefit design optimization scenarios.
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