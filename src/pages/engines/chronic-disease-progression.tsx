import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Activity, TrendingUp, Users, AlertTriangle, ArrowLeft, Database, Brain, Target, CheckCircle2, Calendar, DollarSign } from "lucide-react";

export default function ChronicDiseaseProgressionEngine() {
  const [selectedCondition, setSelectedCondition] = useState("diabetes");

  const conditions = {
    diabetes: {
      name: "Type 2 Diabetes",
      prevalence: "8.4%",
      avgCost: "$9,600",
      riskFactors: ["HbA1c >7.5%", "BMI >30", "Age >50", "Sedentary"],
      interventions: ["Disease management", "GLP-1 therapy", "Lifestyle coaching", "Monitoring tech"]
    },
    hypertension: {
      name: "Hypertension",
      prevalence: "12.1%",
      avgCost: "$4,200",
      riskFactors: ["BP >140/90", "Obesity", "High sodium", "Stress"],
      interventions: ["Medication adherence", "Diet modification", "Exercise program", "Stress management"]
    },
    asthma: {
      name: "Asthma",
      prevalence: "6.8%",
      avgCost: "$3,800",
      riskFactors: ["Environmental triggers", "Medication gaps", "Poor control", "Comorbidities"],
      interventions: ["Controller meds", "Trigger avoidance", "Inhaler technique", "Action plan"]
    }
  };

  const currentCondition = conditions[selectedCondition as keyof typeof conditions];

  return (
    <>
      <Head>
        <title>Chronic Disease Progression Engine | Kincaid iQ</title>
        <meta name="description" content="Predict chronic condition progression and optimize intervention timing with actuarial-grade modeling." />
      </Head>

      <Nav />

      <div className="min-h-screen bg-neutral-950 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Link 
            href="/engines" 
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Engines
          </Link>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wide">Predictive AI Engine</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chronic Disease Progression
            </h1>
            <p className="text-lg text-neutral-400 max-w-3xl">
              Predict which members will progress from pre-disease to chronic condition, optimize intervention timing, and prevent costly complications before they occur.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <Users className="h-8 w-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">1,847</div>
              <div className="text-sm text-neutral-400">Members at high risk</div>
              <div className="mt-3 text-xs text-purple-400">Pre-diabetic progression likely</div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6">
              <AlertTriangle className="h-8 w-8 text-amber-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$4.2M</div>
              <div className="text-sm text-neutral-400">Preventable progression cost</div>
              <div className="mt-3 text-xs text-amber-400">Next 24 months</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-6">
              <Target className="h-8 w-8 text-emerald-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">68%</div>
              <div className="text-sm text-neutral-400">Intervention success rate</div>
              <div className="mt-3 text-xs text-emerald-400">Early detection impact</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-400" />
                Condition Analysis
              </h3>
              
              <div className="flex gap-2 mb-6">
                {Object.keys(conditions).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCondition(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCondition === key
                        ? "bg-purple-500 text-white"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                    }`}
                  >
                    {conditions[key as keyof typeof conditions].name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">Population Prevalence</div>
                  <div className="text-2xl font-bold text-white">{currentCondition.prevalence}</div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">Average Annual Cost</div>
                  <div className="text-2xl font-bold text-white">{currentCondition.avgCost}</div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-2">Primary Risk Factors</div>
                  <div className="flex flex-wrap gap-2">
                    {currentCondition.riskFactors.map((factor, idx) => (
                      <span key={idx} className="px-2 py-1 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-2">Recommended Interventions</div>
                  <div className="space-y-2">
                    {currentCondition.interventions.map((intervention, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        {intervention}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-400" />
                Progression Timeline
              </h3>

              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">0-6 months</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs text-emerald-400">Current Window</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Early Detection Phase</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Identify at-risk members through lab results, medication gaps, and utilization patterns.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Action:</strong> Deploy predictive screening for 1,847 high-risk members
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1">
                    <span className="text-xs font-mono text-neutral-500">6-12 months</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Intervention Phase</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Launch targeted programs: disease management, medication adherence, lifestyle coaching.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-amber-400">Impact:</strong> Reduce progression by 42%
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1">
                    <span className="text-xs font-mono text-neutral-500">12-24 months</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Sustained Management</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Monitor outcomes, adjust protocols, prevent complications in diagnosed population.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-purple-400">Savings:</strong> $4.2M in avoided progression costs
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Business Value Drivers
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-white mb-1">42%</div>
                <div className="text-sm text-neutral-400 mb-2">Progression Reduction</div>
                <div className="text-xs text-neutral-500">Pre-diabetic to diabetic conversion rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">$6,800</div>
                <div className="text-sm text-neutral-400 mb-2">Cost Avoidance Per Member</div>
                <div className="text-xs text-neutral-500">Prevented complications over 3 years</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">18 months</div>
                <div className="text-sm text-neutral-400 mb-2">Average Delay</div>
                <div className="text-xs text-neutral-500">Time to chronic condition diagnosis</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Deploy Chronic Disease Intelligence</h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Identify high-risk members, optimize intervention timing, and prevent costly chronic disease progression.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
              >
                <Calendar className="h-5 w-5" />
                Schedule Demo
              </Link>
              <Link
                href="/engines"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors"
              >
                Explore More Engines
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}