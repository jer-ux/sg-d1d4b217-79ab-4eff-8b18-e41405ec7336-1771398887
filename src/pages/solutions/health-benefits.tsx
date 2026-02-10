import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, Activity, TrendingUp, Shield, ArrowRight, CheckCircle2, Zap, Target, Award, Star, DollarSign, Brain, BarChart3, Clock, FileText, Settings } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function HealthBenefits() {
  const [activeTab, setActiveTab] = useState("medical");

  const benefitPrograms = {
    medical: [
      {
        plan: "Comprehensive PPO",
        description: "Nationwide provider network with maximum flexibility and choice",
        features: ["$500-$2,000 deductibles", "80/20 coinsurance", "$3,000-$6,000 OOP max", "Nationwide network", "No referrals required"],
        enrollment: "47% of members",
      },
      {
        plan: "High-Performance Network",
        description: "Narrow network focused on quality and cost efficiency",
        features: ["$1,000-$3,000 deductibles", "90/10 coinsurance", "$2,000-$4,000 OOP max", "Centers of Excellence", "Care coordination"],
        enrollment: "31% of members",
      },
      {
        plan: "Consumer-Driven HSA",
        description: "High deductible health plan paired with health savings account",
        features: ["$2,800-$5,600 deductibles", "100% after deductible", "$3,000-$6,000 OOP max", "HSA contributions", "Tax advantages"],
        enrollment: "22% of members",
      },
    ],
    wellness: [
      {
        program: "Preventive Care Incentives",
        description: "Rewards for annual physicals, cancer screenings, and wellness visits",
        participation: "87% engagement",
        impact: "$1,247 per member savings",
      },
      {
        program: "Chronic Condition Management",
        description: "Care coordination for diabetes, hypertension, asthma, and heart disease",
        participation: "94% of eligible members",
        impact: "34% reduction in ER visits",
      },
      {
        program: "Mental Health & EAP",
        description: "Integrated behavioral health with 24/7 counseling access",
        participation: "23% utilization",
        impact: "41% improvement in productivity",
      },
      {
        program: "Fitness & Lifestyle",
        description: "Gym memberships, fitness trackers, nutrition counseling",
        participation: "64% engagement",
        impact: "18% reduction in BMI",
      },
    ],
    pharmacy: [
      {
        tier: "Tier 1 - Generic",
        copay: "$10",
        coverage: "90%",
        examples: "Lisinopril, Metformin, Atorvastatin",
      },
      {
        tier: "Tier 2 - Preferred Brand",
        copay: "$40",
        coverage: "80%",
        examples: "Advair, Januvia, Eliquis",
      },
      {
        tier: "Tier 3 - Non-Preferred Brand",
        copay: "$80",
        coverage: "70%",
        examples: "Specialty generics, new brands",
      },
      {
        tier: "Tier 4 - Specialty",
        copay: "20% coinsurance",
        coverage: "$250 min / $1,000 max",
        examples: "Biologics, oncology, rare disease",
      },
    ],
  };

  const memberServices = [
    {
      service: "Digital Member Portal",
      description: "24/7 access to benefits information, claims history, ID cards, and provider search",
      features: ["Real-time eligibility", "Claims tracking", "EOB downloads", "Find a doctor", "Telehealth access"],
      adoption: "94.7%",
      icon: Activity,
    },
    {
      service: "Mobile App",
      description: "Full-featured iOS and Android apps for benefits management on-the-go",
      features: ["Digital ID cards", "Virtual care", "Rx refills", "Cost estimator", "Live chat support"],
      adoption: "82.3%",
      icon: Settings,
    },
    {
      service: "Concierge Support",
      description: "Dedicated benefits advisors to help navigate claims, appeals, and provider issues",
      features: ["Phone & chat support", "Claim assistance", "Appeal guidance", "Provider navigation", "Billing resolution"],
      satisfaction: "96.8%",
      icon: Users,
    },
    {
      service: "Health Advocacy",
      description: "Expert clinical support for complex medical situations and treatment decisions",
      features: ["Nurse hotline", "Second opinions", "Treatment planning", "Cost negotiations", "Care coordination"],
      satisfaction: "98.2%",
      icon: Heart,
    },
  ];

  const costMetrics = [
    {
      metric: "Per Member Per Month (PMPM)",
      employer: "$847",
      employee: "$312",
      total: "$1,159",
      trend: "-3.2% vs prior year",
    },
    {
      metric: "Annual Cost Per Employee",
      employer: "$10,164",
      employee: "$3,744",
      total: "$13,908",
      trend: "-$462 vs prior year",
    },
    {
      metric: "Plan Utilization Rate",
      employer: "N/A",
      employee: "N/A",
      total: "87.3%",
      trend: "+2.1% vs prior year",
    },
    {
      metric: "Generic Dispensing Rate",
      employer: "N/A",
      employee: "N/A",
      total: "91.4%",
      trend: "+1.8% vs prior year",
    },
  ];

  const qualityMetrics = [
    { measure: "HEDIS Comprehensive Diabetes Care", score: "94.2%", benchmark: "90th percentile" },
    { measure: "Breast Cancer Screening", score: "89.7%", benchmark: "85th percentile" },
    { measure: "Controlling High Blood Pressure", score: "87.3%", benchmark: "80th percentile" },
    { measure: "Annual Wellness Visit", score: "78.9%", benchmark: "75th percentile" },
    { measure: "Antidepressant Medication Management", score: "82.4%", benchmark: "75th percentile" },
  ];

  const caseStudy = {
    client: "Manufacturing Company - 8,500 Employees",
    challenge: "Rising healthcare costs (12% annual increase) and declining member satisfaction (72%)",
    solution: "Comprehensive benefits redesign with enhanced wellness programs and narrow networks",
    timeline: "12-month implementation",
    results: [
      { metric: "Cost Reduction", value: "$15.3M", change: "-18.2%" },
      { metric: "Member Satisfaction", value: "96.8%", change: "+24.8%" },
      { metric: "Wellness Participation", value: "87%", change: "+43%" },
      { metric: "Preventive Care", value: "92%", change: "+28%" },
    ],
  };

  return (
    <>
      <SEO
        title="Health Benefits Administration & Wellness Programs | SiriusB iQ"
        description="Comprehensive health benefits platform with 96.8% member satisfaction, integrated wellness programs, and $15.3M cost savings through innovative plan design."
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <Link href="/actuarial-benefits" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Solutions
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30">
                      <Heart className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-cyan-400 font-semibold mb-1">Premium Solution</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        Health Benefits Administration
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    End-to-end health benefits platform delivering exceptional member experiences, comprehensive wellness programs, and measurable cost savings through innovative plan design and technology.
                  </p>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {[
                  { label: "Member Satisfaction", value: "96.8%", icon: Star },
                  { label: "Annual Cost Savings", value: "$15.3M", icon: DollarSign },
                  { label: "Portal Adoption", value: "94.7%", icon: Activity },
                  { label: "Active Members", value: "500K+", icon: Users },
                ].map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benefit Programs */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Comprehensive Benefit Programs</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["medical", "wellness", "pharmacy"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "medical" ? "Medical Plans" : tab === "wellness" ? "Wellness Programs" : "Pharmacy Benefits"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "medical" && benefitPrograms.medical.map((plan, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{plan.plan}</h3>
                        <p className="text-gray-400">{plan.description}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm whitespace-nowrap ml-4">
                        {plan.enrollment}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-5 gap-4 mt-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {activeTab === "wellness" && benefitPrograms.wellness.map((program, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2">{program.program}</h3>
                        <p className="text-gray-400 mb-4">{program.description}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-1">Participation Rate</p>
                        <p className="text-2xl font-bold text-cyan-400">{program.participation}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-1">Measurable Impact</p>
                        <p className="text-2xl font-bold text-green-400">{program.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "pharmacy" && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-4 px-6 text-gray-400 font-semibold">Tier</th>
                          <th className="text-left py-4 px-6 text-gray-400 font-semibold">Copay/Coinsurance</th>
                          <th className="text-left py-4 px-6 text-gray-400 font-semibold">Plan Coverage</th>
                          <th className="text-left py-4 px-6 text-gray-400 font-semibold">Examples</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benefitPrograms.pharmacy.map((tier, index) => (
                          <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                            <td className="py-4 px-6 font-semibold">{tier.tier}</td>
                            <td className="py-4 px-6 text-cyan-400 font-semibold">{tier.copay}</td>
                            <td className="py-4 px-6 text-green-400">{tier.coverage}</td>
                            <td className="py-4 px-6 text-gray-400 text-sm">{tier.examples}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Member Services */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Digital Member Services</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {memberServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all"
                    >
                      <Icon className="w-10 h-10 text-cyan-400 mb-4" />
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold">{service.service}</h3>
                        {service.adoption && (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold">
                            {service.adoption} adoption
                          </span>
                        )}
                        {service.satisfaction && (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold">
                            {service.satisfaction} satisfaction
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-6">{service.description}</p>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Cost & Quality Metrics */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Cost Metrics */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Cost Metrics</h2>
                  <div className="space-y-4">
                    {costMetrics.map((item, index) => (
                      <div key={index} className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                        <p className="text-sm text-gray-400 mb-3">{item.metric}</p>
                        <div className="grid grid-cols-3 gap-4 mb-2">
                          {item.employer !== "N/A" && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Employer</p>
                              <p className="text-xl font-bold">{item.employer}</p>
                            </div>
                          )}
                          {item.employee !== "N/A" && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Employee</p>
                              <p className="text-xl font-bold">{item.employee}</p>
                            </div>
                          )}
                          <div className={item.employer === "N/A" ? "col-span-3" : ""}>
                            <p className="text-xs text-gray-500 mb-1">Total</p>
                            <p className="text-xl font-bold text-cyan-400">{item.total}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">{item.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Metrics */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Quality Metrics (HEDIS)</h2>
                  <div className="space-y-4">
                    {qualityMetrics.map((item, index) => (
                      <div key={index} className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-gray-300 font-medium">{item.measure}</p>
                          <Award className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-3xl font-bold text-green-400">{item.score}</p>
                            <p className="text-sm text-gray-500 mt-1">Performance Rate</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-cyan-400">{item.benchmark}</p>
                            <p className="text-sm text-gray-500 mt-1">vs National</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Study */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Success Story</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{caseStudy.client}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Challenge</p>
                    <p className="text-gray-300">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Solution</p>
                    <p className="text-gray-300">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Timeline</p>
                    <p className="text-gray-300">{caseStudy.timeline}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-4">Measurable Results</p>
                  <div className="grid md:grid-cols-4 gap-6">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="text-center p-6 rounded-xl bg-black/50 border border-gray-800">
                        <div className="text-3xl font-bold text-green-400 mb-1">{result.value}</div>
                        <div className="text-sm text-gray-400 mb-2">{result.metric}</div>
                        <div className="text-xs text-green-400">{result.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Process */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Implementation Process</h2>
              <div className="space-y-6">
                {[
                  {
                    phase: "Discovery & Assessment",
                    duration: "2-3 weeks",
                    activities: ["Current state analysis", "Member demographics review", "Cost benchmarking", "Vendor evaluation", "Goals alignment"],
                  },
                  {
                    phase: "Plan Design & Strategy",
                    duration: "3-4 weeks",
                    activities: ["Benefit plan modeling", "Network configuration", "Wellness program design", "Communication planning", "Technology selection"],
                  },
                  {
                    phase: "Vendor Setup & Integration",
                    duration: "6-8 weeks",
                    activities: ["Carrier contracting", "System configuration", "Data migration", "Portal customization", "Testing & validation"],
                  },
                  {
                    phase: "Enrollment & Launch",
                    duration: "4-6 weeks",
                    activities: ["Employee communications", "Benefits education", "Open enrollment", "Training sessions", "Go-live support"],
                  },
                  {
                    phase: "Ongoing Management",
                    duration: "Continuous",
                    activities: ["Performance monitoring", "Member support", "Utilization management", "Quarterly business reviews", "Plan optimization"],
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-grow p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold">{step.phase}</h3>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm">
                          {step.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {step.activities.map((activity, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/30"
              >
                <Heart className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Transform Your Health Benefits Program
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Deliver exceptional member experiences while achieving measurable cost savings
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}