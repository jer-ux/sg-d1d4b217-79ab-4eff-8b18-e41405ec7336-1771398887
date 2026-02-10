import { motion } from "framer-motion";
import Link from "next/link";
import { Users, UserCheck, UserPlus, UserMinus, ArrowRight, CheckCircle2, Zap, Target, Shield, Clock, BarChart3, Bell, Mail, Phone, MessageSquare, FileText, Calendar } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function MemberManagement() {
  const [activeTab, setActiveTab] = useState("enrollment");

  const enrollmentMetrics = {
    enrollment: [
      {
        process: "New Hire Enrollment",
        duration: "< 24 hours",
        automation: "94.7% fully automated",
        features: ["Digital onboarding portal", "Electronic signature", "Benefits decision support", "Real-time eligibility", "Automatic ID card generation"],
        satisfaction: "97.2% satisfaction rate",
      },
      {
        process: "Life Event Changes",
        duration: "< 48 hours",
        automation: "87.3% auto-adjudicated",
        features: ["Marriage/divorce", "Birth/adoption", "Dependent aging out", "Employment status change", "QLE validation"],
        satisfaction: "95.8% satisfaction rate",
      },
      {
        process: "Open Enrollment",
        duration: "Self-service",
        automation: "91.4% online completion",
        features: ["Decision support tools", "Plan comparison", "Cost calculators", "Benefits education", "Mobile-first experience"],
        satisfaction: "93.6% satisfaction rate",
      },
      {
        process: "COBRA Administration",
        duration: "Automated",
        automation: "100% compliance tracking",
        features: ["Notice generation", "Payment processing", "Eligibility tracking", "Termination handling", "Subsidy management"],
        satisfaction: "89.4% satisfaction rate",
      },
    ],
    eligibility: [
      {
        system: "Real-Time Validation",
        description: "Instant eligibility verification across all benefit plans and provider networks",
        accuracy: "99.7% accuracy",
        speed: "< 200ms response time",
        volume: "2.4M checks per month",
        integration: "EDI 270/271, HL7 FHIR, custom APIs",
      },
      {
        system: "Automated Updates",
        description: "Continuous synchronization with payroll, HR systems, and carrier platforms",
        accuracy: "99.9% data sync accuracy",
        speed: "Every 4 hours",
        volume: "847K records updated monthly",
        integration: "SAP, Workday, ADP, UltiPro",
      },
      {
        system: "Dependent Verification",
        description: "Annual audit process to ensure all covered dependents meet eligibility requirements",
        accuracy: "Identifies 3.2% ineligible dependents",
        speed: "30-day verification cycle",
        volume: "Annual audit of all dependents",
        integration: "Document imaging, third-party verification",
      },
      {
        system: "Compliance Monitoring",
        description: "Automated tracking of ACA, ERISA, HIPAA, and state-specific requirements",
        accuracy: "100% regulatory compliance",
        speed: "Real-time monitoring",
        volume: "24/7/365 compliance checks",
        integration: "IRS 1094/1095, state filings",
      },
    ],
    communication: [
      {
        channel: "Member Portal",
        description: "Self-service platform for benefits information, claims, and account management",
        adoption: "94.7% active users",
        engagement: "4.2 logins per member per month",
        features: ["Benefits overview", "Claims history", "ID cards", "Find a doctor", "Cost estimators", "Health tools"],
        satisfaction: "96.3% satisfaction",
      },
      {
        channel: "Mobile App",
        description: "iOS and Android apps with full benefits management capabilities",
        adoption: "82.3% of members",
        engagement: "8.7 sessions per user per month",
        features: ["Digital ID cards", "Telehealth", "Rx refills", "Virtual care", "Push notifications", "Biometric login"],
        satisfaction: "94.8% app store rating",
      },
      {
        channel: "Benefits Helpline",
        description: "24/7 multilingual support with specialized benefits counselors",
        adoption: "67% of members use annually",
        engagement: "Average 8.4 minute handle time",
        features: ["Phone support", "Live chat", "Video calls", "Screen sharing", "Callback scheduling", "12 languages"],
        satisfaction: "97.1% CSAT score",
      },
      {
        channel: "Proactive Outreach",
        description: "Targeted communications for preventive care, wellness programs, and benefit opportunities",
        adoption: "89% email open rate",
        engagement: "34% click-through rate",
        features: ["Email campaigns", "SMS alerts", "Push notifications", "Direct mail", "Personalized messaging", "Multi-touch sequences"],
        satisfaction: "91.2% find helpful",
      },
    ],
  };

  const dataIntegrations = [
    {
      system: "HRIS/Payroll Systems",
      description: "Bidirectional integration with HR and payroll platforms for seamless data flow",
      vendors: ["Workday", "SAP SuccessFactors", "ADP", "UltiPro", "Oracle HCM", "Ceridian"],
      frequency: "Real-time or daily",
      dataPoints: ["Demographics", "Employment status", "Compensation", "Terminations", "New hires", "Life events"],
      icon: Users,
    },
    {
      system: "Insurance Carriers",
      description: "Direct connections to medical, dental, vision, life, and disability carriers",
      vendors: ["Aetna", "UnitedHealthcare", "Cigna", "Anthem", "Kaiser", "BCBS", "Guardian", "MetLife"],
      frequency: "Daily or weekly",
      dataPoints: ["Eligibility files", "Premium billing", "Claims data", "Network updates", "ID cards", "EOBs"],
      icon: Shield,
    },
    {
      system: "Benefits Administration",
      description: "Integration with leading benefits administration platforms and exchanges",
      vendors: ["Benefitfocus", "bswift", "WEX", "Employee Navigator", "PlanSource", "Ease"],
      frequency: "Real-time",
      dataPoints: ["Enrollment elections", "Plan changes", "Dependent adds/terms", "Premium deductions", "Documents"],
      icon: FileText,
    },
    {
      system: "Wellness Platforms",
      description: "Connectivity with wellness vendors for program participation and incentives",
      vendors: ["Virgin Pulse", "WebMD ONE", "Castlight", "Rally Health", "Limeade", "Sharecare"],
      frequency: "Weekly",
      dataPoints: ["Program enrollment", "Activity tracking", "Biometric screening", "Incentive earnings", "Challenges"],
      icon: Target,
    },
  ];

  const complianceFeatures = [
    {
      requirement: "ACA Compliance",
      description: "Automated tracking and reporting for Affordable Care Act requirements",
      capabilities: [
        "1094/1095 form generation and filing",
        "Measurement period tracking",
        "Affordability calculations",
        "Minimum value determination",
        "Waiting period monitoring",
        "4980H penalty avoidance",
      ],
      status: "100% compliant since 2015",
    },
    {
      requirement: "COBRA Administration",
      description: "Full-service COBRA and state continuation management",
      capabilities: [
        "Qualifying event identification",
        "Notice generation and tracking",
        "Premium collection and remittance",
        "Subsidy handling (e.g., ARP)",
        "Termination processing",
        "Legal compliance documentation",
      ],
      status: "Zero compliance violations",
    },
    {
      requirement: "HIPAA Privacy & Security",
      description: "Comprehensive data protection and privacy controls",
      capabilities: [
        "PHI access controls and encryption",
        "Audit logging and monitoring",
        "Business Associate Agreements",
        "Breach notification procedures",
        "Security risk assessments",
        "Employee training and certification",
      ],
      status: "Annual third-party audits",
    },
    {
      requirement: "ERISA Fiduciary",
      description: "Plan sponsor fiduciary responsibility support",
      capabilities: [
        "SPD and SMM generation",
        "Form 5500 preparation support",
        "Fiduciary training",
        "Plan document compliance",
        "Claims and appeals procedures",
        "Regulatory change monitoring",
      ],
      status: "DOL audit-ready documentation",
    },
  ];

  const caseStudy = {
    client: "Technology Company - 15,000 Employees Across 12 States",
    challenge: "Disparate HR systems, manual enrollment processes (averaging 7 days), low portal adoption (42%), and rising administrative costs ($2.8M annually)",
    solution: "Comprehensive member management platform with automated enrollment, real-time eligibility, and integrated communication tools",
    timeline: "9-month phased implementation with parallel system operation",
    results: [
      { metric: "Enrollment Processing Time", value: "< 24 hours", change: "-85% reduction" },
      { metric: "Portal Adoption Rate", value: "94.7%", change: "+52.7 points" },
      { metric: "Administrative Cost", value: "$847K", change: "-$1.95M savings" },
      { metric: "Member Satisfaction", value: "96.3%", change: "+28.7 points" },
      { metric: "Data Accuracy", value: "99.7%", change: "+6.8 points" },
      { metric: "Benefits Inquiries", value: "-67%", change: "Reduced by two-thirds" },
    ],
  };

  const metrics = [
    { label: "Active Members", value: "500K+", icon: Users },
    { label: "Portal Adoption", value: "94.7%", icon: UserCheck },
    { label: "Processing Time", value: "< 24h", icon: Clock },
    { label: "Data Accuracy", value: "99.7%", icon: Target },
  ];

  return (
    <>
      <SEO
        title="Member Management & Enrollment Systems | SiriusB iQ"
        description="Comprehensive member management platform with 94.7% portal adoption, < 24-hour enrollment processing, and $1.95M administrative cost savings through automation and integration."
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
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-green-500/30">
                      <Users className="w-12 h-12 text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 font-semibold mb-1">Platform Excellence</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                        Member Management & Enrollment
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    End-to-end member lifecycle management with automated enrollment, real-time eligibility verification, and seamless integrations—delivering exceptional experiences while reducing administrative burden.
                  </p>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-green-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Member Management Capabilities */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Core Capabilities</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["enrollment", "eligibility", "communication"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "enrollment" ? "Enrollment & Life Events" : tab === "eligibility" ? "Eligibility Management" : "Member Communication"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "enrollment" && enrollmentMetrics.enrollment.map((process, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{process.process}</h3>
                        <div className="flex items-center gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <span className="text-gray-400">{process.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="text-gray-400">{process.automation}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-sm whitespace-nowrap ml-4">
                        {process.satisfaction}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-5 gap-4">
                      {process.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {activeTab === "eligibility" && enrollmentMetrics.eligibility.map((system, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all">
                    <h3 className="text-2xl font-bold mb-3">{system.system}</h3>
                    <p className="text-gray-400 mb-6">{system.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                          <p className="text-sm text-gray-500 mb-1">Accuracy Rate</p>
                          <p className="text-2xl font-bold text-green-400">{system.accuracy}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                          <p className="text-sm text-gray-500 mb-1">Processing Speed</p>
                          <p className="text-2xl font-bold text-blue-400">{system.speed}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                          <p className="text-sm text-gray-500 mb-1">Monthly Volume</p>
                          <p className="text-2xl font-bold text-purple-400">{system.volume}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                          <p className="text-sm text-gray-500 mb-1">Integration Support</p>
                          <p className="text-sm text-gray-300">{system.integration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "communication" && enrollmentMetrics.communication.map((channel, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2">{channel.channel}</h3>
                        <p className="text-gray-400 mb-4">{channel.description}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-sm whitespace-nowrap ml-4">
                        {channel.satisfaction}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-1">Adoption Rate</p>
                        <p className="text-2xl font-bold text-blue-400">{channel.adoption}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800 md:col-span-2">
                        <p className="text-sm text-gray-500 mb-1">Member Engagement</p>
                        <p className="text-2xl font-bold text-purple-400">{channel.engagement}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      {channel.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Data Integrations */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Enterprise Integrations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {dataIntegrations.map((integration, index) => {
                  const Icon = integration.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all"
                    >
                      <Icon className="w-10 h-10 text-green-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-3">{integration.system}</h3>
                      <p className="text-gray-400 mb-6">{integration.description}</p>
                      
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                          <p className="text-sm text-gray-500 mb-2">Supported Vendors</p>
                          <div className="flex flex-wrap gap-2">
                            {integration.vendors.map((vendor, idx) => (
                              <span key={idx} className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs">
                                {vendor}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-black/50 border border-gray-800">
                            <p className="text-xs text-gray-500 mb-1">Sync Frequency</p>
                            <p className="text-sm font-semibold text-blue-400">{integration.frequency}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-black/50 border border-gray-800">
                            <p className="text-xs text-gray-500 mb-1">Data Points</p>
                            <p className="text-sm font-semibold text-green-400">{integration.dataPoints.length} types</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          {integration.dataPoints.map((point, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1 h-1 rounded-full bg-green-400" />
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Compliance & Regulatory */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Compliance & Regulatory</h2>
              <div className="space-y-6">
                {complianceFeatures.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{item.requirement}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-sm whitespace-nowrap ml-4">
                        {item.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 mt-6">
                      {item.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 p-3 rounded-lg bg-black/30">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Case Study */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Success Story</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Target className="w-6 h-6 text-green-400" />
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
                  <div className="grid md:grid-cols-3 gap-6">
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

          {/* CTA Section */}
          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-green-500/30"
              >
                <Users className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Transform Your Member Management
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Automate enrollment, ensure compliance, and deliver exceptional member experiences
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    Schedule Platform Demo
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