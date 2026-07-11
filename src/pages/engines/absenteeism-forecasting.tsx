import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingDown,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AbsenteeismForecastingEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Absenteeism Forecasting Engine | Kincaid IQ</title>
        <meta
          name="description"
          content="Predict absenteeism patterns and quantify the productivity cost of employee absence before it hits your bottom line."
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
                <Calendar className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Absenteeism Forecasting Engine</h1>
                <p className="text-neutral-400 mt-1">
                  Predict absence patterns and quantify hidden productivity costs
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                Workforce Analytics
              </Badge>
              <Badge variant="outline" className="border-rose-500/30 text-rose-400">
                Cost Modeling
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Predictive Forecasting
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
                  The Absenteeism Forecasting Engine predicts employee absence patterns by analyzing historical
                  PTO data, health claims, seasonal trends, and workforce demographics. It quantifies the true
                  cost of absenteeism—including lost productivity, overtime coverage, and workflow
                  disruption—so HR and finance teams can deploy targeted interventions where they'll have the
                  greatest impact.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4"
                  >
                    <Calendar className="h-5 w-5 text-amber-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Pattern Recognition</h3>
                    <p className="text-xs text-neutral-400">
                      Identify seasonal spikes, chronic absentees, and department-level absence clusters
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-lg p-4"
                  >
                    <DollarSign className="h-5 w-5 text-rose-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Cost Quantification</h3>
                    <p className="text-xs text-neutral-400">
                      Calculate direct and indirect costs: wages, coverage, lost output, and delayed projects
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <TrendingDown className="h-5 w-5 text-blue-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Intervention Design</h3>
                    <p className="text-xs text-neutral-400">
                      Target wellness programs, flexible scheduling, and attendance incentives to high-impact
                      segments
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
                      <p className="text-white font-medium">Uncover Hidden Costs</p>
                      <p className="text-sm text-neutral-400">
                        Most organizations underestimate absenteeism costs by 30-50%. This engine reveals the
                        full financial impact including replacement labor and lost throughput.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Predict Staffing Needs</p>
                      <p className="text-sm text-neutral-400">
                        Forecast absence rates by department and season to optimize staffing levels and avoid
                        expensive overtime or understaffing crises.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Improve Retention</p>
                      <p className="text-sm text-neutral-400">
                        Chronic absenteeism often signals burnout, health issues, or disengagement. Early
                        intervention can prevent costly turnover.
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
                      <Clock className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Seasonal Staffing Planning</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Predict flu season absence spikes, summer PTO patterns, and holiday staffing needs. Schedule
                    temporary workers or adjust project timelines before understaffing impacts operations.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 18% reduction in emergency staffing
                    costs
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-rose-500/20 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Chronic Absentee Identification</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Flag employees with frequent short-term absences that signal health issues, burnout, or
                    disengagement. Deploy HR interventions, wellness resources, or accommodation discussions.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 25% improvement in attendance rates
                    post-intervention
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Cost Center Analysis</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Calculate department-level absenteeism costs to inform budget decisions. Identify which
                    units bear the highest productivity losses and where wellness investments will yield the
                    best ROI.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> $1.2M in quantified productivity
                    loss recovered
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Wellness Program Targeting</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Correlate health claims with absence patterns to design targeted interventions. Focus flu
                    shot campaigns, ergonomic assessments, or stress reduction programs on high-impact cohorts.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 3.5x ROI on wellness spend
                    optimization
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Key Insights & Metrics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">8.7%</div>
                    <div className="text-sm text-neutral-400">Average annual absence rate across workforce</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">$2.8M</div>
                    <div className="text-sm text-neutral-400">Total annual productivity loss from absences</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">34%</div>
                    <div className="text-sm text-neutral-400">Of absences concentrated in 12% of employees</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Seasonal Patterns</h3>
                    <p className="text-sm text-neutral-400">
                      December and January show 42% higher absence rates due to flu season and holiday PTO
                      overlap
                    </p>
                  </div>

                  <div className="border-l-4 border-rose-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Department Variance</h3>
                    <p className="text-sm text-neutral-400">
                      Customer service teams have 2.3x higher absence rates than office staff, driven by
                      burnout and inflexible schedules
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Health Correlation</h3>
                    <p className="text-sm text-neutral-400">
                      Employees with chronic conditions miss 6.2 more days per year; targeted wellness could
                      reduce 40% of this gap
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
                      <h3 className="text-white font-semibold">Data Collection</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Aggregate PTO records, sick leave, FMLA claims, short-term disability, and health claims
                      data across your organization
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-white font-semibold">Pattern Analysis</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Apply time-series forecasting to identify seasonal trends, day-of-week patterns, and
                      employee-level absence trajectories
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-white font-semibold">Cost Modeling</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Calculate total cost of absence including base wages, overtime coverage, productivity
                      loss multipliers, and project delays
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-sm font-bold">
                        4
                      </div>
                      <h3 className="text-white font-semibold">Segmentation & Targeting</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Segment workforce into high, medium, and low-impact absentee cohorts with tailored
                      intervention recommendations for each group
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                        5
                      </div>
                      <h3 className="text-white font-semibold">ROI Projection</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Model expected savings from wellness programs, flexible work policies, and health
                      interventions targeted at high-cost absence drivers
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    PTO and sick leave records
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    FMLA and disability claims
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Health and wellness program data
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Employee demographics and tenure
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Department staffing levels
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Payroll and compensation data
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
                  Get a complete absenteeism forecast with cost quantification and intervention roadmap within
                  72 hours.
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