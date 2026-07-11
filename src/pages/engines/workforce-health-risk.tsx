import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Heart,
  Brain,
  Pill,
  Shield,
  BarChart3,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WorkforceHealthRiskEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Workforce Health Risk Engine | Kincaid IQ</title>
        <meta
          name="description"
          content="Predict population health trajectories and identify high-risk employee segments before they become cost drivers."
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
              <div className="p-3 bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30 rounded-lg">
                <Heart className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Workforce Health Risk Engine</h1>
                <p className="text-neutral-400 mt-1">
                  Predict population health trajectories before costs escalate
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-rose-500/30 text-rose-400">
                Workforce Intelligence
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                Predictive Analytics
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Risk Stratification
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
                  The Workforce Health Risk Engine analyzes employee health data, claims patterns, and
                  demographic trends to predict which population segments will drive future healthcare costs.
                  By identifying high-risk groups before costs escalate, HR and benefits teams can deploy
                  targeted interventions that improve outcomes and reduce spending.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-lg p-4"
                  >
                    <Users className="h-5 w-5 text-rose-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Population Segmentation</h3>
                    <p className="text-xs text-neutral-400">
                      Identify high-risk cohorts by condition, age, geography, and claims velocity
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4"
                  >
                    <TrendingUp className="h-5 w-5 text-emerald-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Trajectory Forecasting</h3>
                    <p className="text-xs text-neutral-400">
                      Predict which employees will progress to chronic conditions within 12-24 months
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <Shield className="h-5 w-5 text-blue-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2">Intervention Targeting</h3>
                    <p className="text-xs text-neutral-400">
                      Deploy preventive programs to the right people at the right time for maximum ROI
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
                      <p className="text-white font-medium">Prevent Cost Escalation</p>
                      <p className="text-sm text-neutral-400">
                        Catch chronic conditions early when interventions are most effective and least expensive
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Optimize Program Spend</p>
                      <p className="text-sm text-neutral-400">
                        Focus wellness budgets on segments with highest intervention ROI
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Improve Workforce Productivity</p>
                      <p className="text-sm text-neutral-400">
                        Reduce absenteeism and presenteeism by addressing health issues proactively
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
                    <div className="p-2 bg-rose-500/20 rounded-lg">
                      <Heart className="h-5 w-5 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Chronic Disease Prevention</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Identify employees with pre-diabetes, hypertension, or elevated BMI before they develop
                    chronic conditions. Deploy targeted coaching, nutrition programs, and preventive screenings.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 30-40% reduction in diabetes
                    progression rates
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Brain className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Mental Health Outreach</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Flag employees with behavioral health risk factors like isolation, stress claims, or
                    disrupted care patterns. Connect them with EAP resources and therapy coverage.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 25% improvement in engagement and
                    productivity
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Pill className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Medication Adherence</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Detect gaps in prescription fills for chronic conditions. Trigger outreach campaigns to
                    improve medication compliance and prevent costly complications.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> $4-7 saved for every $1 spent on
                    adherence programs
                  </div>
                </Card>

                <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Activity className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">High-Cost Claimant Management</h3>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">
                    Identify employees on trajectory to become high-cost claimants. Enroll them in disease
                    management programs and care coordination services before costs spike.
                  </p>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> 15-20% reduction in catastrophic
                    claims
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Key Insights & Metrics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">23%</div>
                    <div className="text-sm text-neutral-400">
                      Of workforce at elevated chronic disease risk
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">$8.4M</div>
                    <div className="text-sm text-neutral-400">Projected 3-year cost if untreated</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">4.2x</div>
                    <div className="text-sm text-neutral-400">ROI on preventive intervention programs</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-rose-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">High-Risk Segment Identification</h3>
                    <p className="text-sm text-neutral-400">
                      18% of employees flagged for diabetes progression, 12% for cardiovascular risk, 15% for
                      mental health intervention needs
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Geographic Risk Concentration</h3>
                    <p className="text-sm text-neutral-400">
                      Southeast region shows 34% higher chronic disease prevalence than national average
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Intervention Opportunity</h3>
                    <p className="text-sm text-neutral-400">
                      $2.1M in preventable costs identified through early screening and lifestyle modification
                      programs
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
                      <div className="w-8 h-8 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                        1
                      </div>
                      <h3 className="text-white font-semibold">Data Aggregation</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Ingest medical claims, pharmacy data, biometric screenings, and health risk assessments
                      across your entire population
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-white font-semibold">Risk Stratification</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Apply predictive models to segment population into low, medium, high, and critical risk
                      tiers based on claims velocity, condition progression, and demographic factors
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-sm font-bold">
                        3
                      </div>
                      <h3 className="text-white font-semibold">Trajectory Modeling</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Forecast health outcomes over 12-24 month horizons using time-series analysis and
                      condition-specific progression algorithms
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                        4
                      </div>
                      <h3 className="text-white font-semibold">Intervention Matching</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Map high-risk segments to appropriate programs (disease management, coaching, specialty
                      care navigation) with ROI projections for each cohort
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                        5
                      </div>
                      <h3 className="text-white font-semibold">Continuous Monitoring</h3>
                    </div>
                    <p className="text-sm text-neutral-400 ml-11">
                      Track intervention effectiveness and update risk scores monthly as new claims data flows
                      in
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Medical claims history (3+ years)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Pharmacy claims and Rx patterns
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Biometric screening results
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Health risk assessment data
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Demographic and census data
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Program enrollment and engagement
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <BarChart3 className="h-6 w-6 text-rose-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run This Analysis</h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Get a complete workforce health risk assessment with intervention recommendations and ROI
                  projections within 48 hours.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-rose-500 hover:bg-rose-600 text-white">
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