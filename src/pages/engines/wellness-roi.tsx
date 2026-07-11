import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle2,
  Activity,
  Heart,
  BarChart3,
  FileText,
  Download,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WellnessROIEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Wellness ROI Engine | Kincaid IQ</title>
        <meta
          name="description"
          content="Measure the true return on wellness program investments and optimize spend across health initiatives."
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
              <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Wellness ROI Engine</h1>
                <p className="text-neutral-400 mt-1">
                  Measure program effectiveness and optimize wellness investments
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                Wellness Analytics
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                ROI Measurement
              </Badge>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                Program Optimization
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
                  The Wellness ROI Engine quantifies the financial impact of wellness programs by linking
                  participation data to health outcomes, claims cost reductions, and productivity improvements.
                  Stop guessing whether wellness investments are paying off—this engine delivers hard metrics
                  that prove program value or identify where to reallocate budgets for maximum impact.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4"
                  >
                    <DollarSign className="h-5 w-5 text-emerald-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Cost Impact Measurement</h3>
                    <p className="text-xs text-neutral-400">
                      Link program participation to claims cost trends and medical spending reductions
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <Activity className="h-5 w-5 text-blue-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Productivity Gains</h3>
                    <p className="text-xs text-neutral-400">
                      Quantify reduced absenteeism, improved presenteeism, and enhanced workforce performance
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4"
                  >
                    <Target className="h-5 w-5 text-purple-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Portfolio Optimization</h3>
                    <p className="text-xs text-neutral-400">
                      Identify high-ROI programs to expand and low-performers to eliminate or redesign
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
                      <p className="text-white font-medium">Prove Program Value</p>
                      <p className="text-sm text-neutral-400">
                        CFOs demand ROI metrics. Demonstrate wellness programs deliver measurable financial
                        returns, not just feel-good initiatives.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Optimize Spend Allocation</p>
                      <p className="text-sm text-neutral-400">
                        Shift budgets from low-engagement programs to high-impact initiatives that actually
                        move the needle on health outcomes and costs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Increase Engagement</p>
                      <p className="text-sm text-neutral-400">
                        Understand which wellness offerings drive participation and use those insights to boost
                        overall program adoption.
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
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Heart className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Chronic Disease Management ROI</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Compare medical costs for employees enrolled in diabetes, hypertension, or weight
                    management programs versus non-participants. Prove programs reduce complications and ER
                    visits.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> $3.20 saved for every $1 spent on
                    disease management
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Fitness Program Value</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Track gym memberships, step challenges, and fitness incentives against absenteeism rates
                    and preventive care utilization. Justify expanding or cutting gym subsidies with data.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 22% reduction in sick days for
                    active participants
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Target className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Mental Health Support ROI</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Measure EAP utilization, therapy session engagement, and stress management workshop
                    attendance against productivity metrics and behavioral health claims costs.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 4.1x ROI on mental health program
                    investments
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Incentive Program Effectiveness</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Assess whether biometric screening incentives, HSA contributions, or premium discounts
                    actually drive preventive care engagement and health improvements.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> $850 net savings per engaged employee
                    annually
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Key Insights & Metrics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">3.4x</div>
                    <div className="text-sm text-neutral-400">Average ROI across all wellness programs</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">$1.8M</div>
                    <div className="text-sm text-neutral-400">Annual medical cost savings from participation</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">47%</div>
                    <div className="text-sm text-neutral-400">Employee wellness program engagement rate</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Top Performing Programs</h3>
                    <p className="text-sm text-neutral-400">
                      Disease management (5.2x ROI), mental health support (4.1x), and smoking cessation (3.8x)
                      deliver highest returns
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Engagement Patterns</h3>
                    <p className="text-sm text-neutral-400">
                      Virtual programs see 2.3x higher participation than on-site offerings; mobile app
                      integrations boost engagement by 62%
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Cost Avoidance</h3>
                    <p className="text-sm text-neutral-400">
                      Every 10% increase in wellness participation correlates with 2.8% reduction in annual
                      medical trend
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
                      <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-sm font-bold">
                        1
                      </div>
                      <h3 className="text-white font-semibold">Program Inventory</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Catalog all wellness offerings including costs, participation data, and engagement
                      metrics across disease management, fitness, mental health, and preventive programs
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-white font-semibold">Participant Matching</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Link program participants to their medical claims, pharmacy utilization, and HR records
                      while maintaining privacy compliance
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-white font-semibold">Outcome Analysis</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Compare health outcomes, claims costs, and productivity metrics between participants and
                      matched control groups
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                        4
                      </div>
                      <h3 className="text-white font-semibold">ROI Calculation</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Calculate hard dollar savings (reduced claims, avoided ER visits) and soft dollar gains
                      (productivity, retention) minus program costs
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                        5
                      </div>
                      <h3 className="text-white font-semibold">Optimization Recommendations</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Rank programs by ROI and participation to guide expansion, redesign, or elimination
                      decisions
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Wellness program enrollment and participation
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Medical and pharmacy claims history
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Biometric screening results
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Absenteeism and productivity data
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Program costs and vendor invoices
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Employee satisfaction surveys
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <BarChart3 className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run This Analysis</h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Get a comprehensive wellness ROI analysis with program-by-program breakdowns and optimization
                  recommendations within 5 business days.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
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