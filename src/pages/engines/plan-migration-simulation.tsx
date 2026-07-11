import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Repeat,
  CheckCircle2,
  TrendingUp,
  Users,
  BarChart3,
  FileText,
  Download,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlanMigrationSimulationEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Plan Migration Simulation Engine | Kincaid IQ</title>
        <meta
          name="description"
          content="Model how employees will switch plan tiers under proposed benefit design changes and predict enrollment shifts."
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
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                <Repeat className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Plan Migration Simulation Engine</h1>
                <p className="text-neutral-400 mt-1">
                  Predict enrollment shifts under benefit design changes
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                Healthcare Economics
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Predictive Modeling
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                Benefit Strategy
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
                  The Plan Migration Simulation Engine predicts how employees will move between plan tiers when
                  you change premiums, deductibles, or cost-sharing structures. Using historical enrollment
                  behavior, utilization patterns, and behavioral economics principles, it forecasts enrollment
                  shifts at the individual level and aggregates total plan cost impacts. This allows you to
                  test benefit design scenarios before open enrollment and optimize plan offerings to balance
                  employee preferences with cost management goals.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4"
                  >
                    <Repeat className="h-5 w-5 text-purple-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Enrollment Shift Forecasting</h3>
                    <p className="text-xs text-neutral-400">
                      Predict member-level plan selection under proposed premium and benefit changes
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <Calculator className="h-5 w-5 text-blue-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Total Cost Impact Analysis</h3>
                    <p className="text-xs text-neutral-400">
                      Quantify how enrollment changes affect employer cost, employee cost burden, and plan
                      utilization
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4"
                  >
                    <TrendingUp className="h-5 w-5 text-emerald-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Scenario Optimization</h3>
                    <p className="text-xs text-neutral-400">
                      Test multiple benefit designs and identify the option that best balances cost and
                      affordability
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
                      <p className="text-white font-medium">Avoid Unintended Consequences</p>
                      <p className="text-sm text-neutral-400">
                        Premium or deductible changes can trigger unexpected migration to high-cost plans,
                        increasing total employer spend despite intended savings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Optimize Plan Design Before Rollout</p>
                      <p className="text-sm text-neutral-400">
                        Test scenarios in simulation rather than learning through costly trial-and-error during
                        open enrollment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Predict Budgetary Impact</p>
                      <p className="text-sm text-neutral-400">
                        Accurate enrollment forecasts enable precise budgeting for next year's healthcare spend
                        and contribution strategy.
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
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Repeat className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Premium Increase Impact</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Model how a proposed 8% premium increase affects enrollment distribution across PPO, HDHP,
                    and HMO tiers, and calculate net cost impact.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Predicted 18% shift from PPO to HDHP,
                    offsetting 62% of projected cost increase
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Calculator className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">New Plan Tier Introduction</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Forecast adoption of a new mid-tier EPO option positioned between existing PPO and HDHP
                    plans, including cannibalization effects.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 24% of PPO members expected to switch
                    to EPO, saving $1.2M annually
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">HSA Contribution Strategy</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Simulate how increasing employer HSA contributions to $1,500 affects HDHP enrollment and
                    total plan cost compared to premium-only incentives.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> $1,500 HSA drives 12% more HDHP
                    adoption than equivalent premium reduction
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Dependent Coverage Pricing</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Test family vs. employee-only premium structures to optimize enrollment while managing
                    adverse selection risk from high-cost families.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> Age-banded family pricing reduces
                    adverse selection by 9 percentage points
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Key Insights & Metrics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">14%</div>
                    <div className="text-sm text-neutral-400">
                      Average enrollment shift from 5% premium increase
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">3.2x</div>
                    <div className="text-sm text-neutral-400">
                      Price elasticity multiplier for high-income vs. low-income employees
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">$2.8M</div>
                    <div className="text-sm text-neutral-400">
                      Average annual cost swing from unpredicted migration
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Inertia Effect</h3>
                    <p className="text-sm text-neutral-400">
                      68% of employees stay in their current plan tier despite premium changes, but the 32% who
                      switch create outsized cost impacts
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Risk Selection Dynamics</h3>
                    <p className="text-sm text-neutral-400">
                      High-cost claimants are 2.4x more likely to migrate to richer plans when premium
                      differentials narrow, concentrating risk
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Income-Based Responsiveness</h3>
                    <p className="text-sm text-neutral-400">
                      Employees earning under $60K are 3.2x more price-sensitive than those earning over $100K
                      in plan selection
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
                      <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                        1
                      </div>
                      <h3 className="text-white font-semibold">Historical Enrollment Pattern Analysis</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Extract past enrollment decisions, premium changes, and plan switches across 3-5 years to
                      establish baseline behavior
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-white font-semibold">Member-Level Feature Engineering</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Build predictive features: age, income, family size, chronic conditions, past utilization,
                      risk score, tenure
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-white font-semibold">Choice Model Calibration</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Train discrete choice model (multinomial logit) on historical data to estimate plan
                      selection probabilities given premium/benefit changes
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                        4
                      </div>
                      <h3 className="text-white font-semibold">Scenario Simulation</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Apply proposed premium/benefit changes to current enrollment, predict new plan selection
                      for each member, aggregate results
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                        5
                      </div>
                      <h3 className="text-white font-semibold">Cost Impact Quantification</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Multiply predicted enrollment by expected claims cost per plan tier to calculate total
                      employer and employee cost under each scenario
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Historical enrollment elections (3-5 years)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Premium rates by plan tier and year
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Member demographics and income
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Claims utilization and risk scores
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Benefit design specifications (SPDs)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Proposed plan design scenarios
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <BarChart3 className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run This Analysis</h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Get enrollment forecasts and cost impact analysis for up to 5 benefit design scenarios before
                  your next open enrollment.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
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