import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Shield, CheckCircle2, AlertTriangle, Clock, Database, ArrowRight, Sparkles, Award, DollarSign, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PolicyCompliance() {
  const features = [
    {
      icon: Shield,
      title: "Automated Compliance Monitoring",
      description: "Continuous real-time monitoring across ERISA, ACA, HIPAA, and 50+ state regulations with automated alerts for compliance violations and regulatory changes.",
      metrics: ["50-State Coverage", "Real-time Monitoring", "Automated Alerts"],
    },
    {
      icon: FileText,
      title: "Regulatory Reporting Engine",
      description: "Automated generation of Form 5500, 1095-B/C, SBC, SAR, and all required filings with built-in validation and electronic submission capabilities.",
      metrics: ["Auto-Generated Reports", "Built-in Validation", "Electronic Filing"],
    },
    {
      icon: Database,
      title: "Audit Trail Management",
      description: "Complete audit trails documenting all plan changes, participant communications, and administrative actions with tamper-proof logging and retention.",
      metrics: ["100% Audit Trail", "Tamper-Proof", "Long-term Retention"],
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Proactive identification of compliance risks with severity scoring, remediation workflows, and escalation protocols preventing penalties and fines.",
      metrics: ["Risk Scoring", "Remediation Workflows", "Penalty Prevention"],
    },
    {
      icon: Clock,
      title: "Regulatory Update Tracking",
      description: "Real-time monitoring of federal and state regulatory changes with impact analysis and implementation guidance keeping you always compliant.",
      metrics: ["Real-time Updates", "Impact Analysis", "Implementation Guides"],
    },
    {
      icon: Target,
      title: "Policy Version Control",
      description: "Comprehensive versioning system tracking all policy changes with approval workflows, effective dates, and historical snapshots for audit purposes.",
      metrics: ["Version History", "Approval Workflows", "Historical Snapshots"],
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "100% Compliance Rate",
      description: "Perfect compliance record across all regulatory requirements",
    },
    {
      icon: Shield,
      title: "99.8% Audit Score",
      description: "Industry-leading audit performance with complete documentation",
    },
    {
      icon: DollarSign,
      title: "Zero Penalties",
      description: "Proactive compliance preventing fines and regulatory actions",
    },
    {
      icon: Clock,
      title: "75% Time Savings",
      description: "Automation dramatically reduces compliance workload",
    },
  ];

  return (
    <>
      <SEO
        title="Policy Compliance Solutions | Kincaid IQ"
        description="Automated compliance monitoring across ERISA, ACA, HIPAA achieving 100% compliance rate and zero penalties."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-32 pb-20">
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-6">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Policy Compliance</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Stay Compliant
                  <br />
                  Automatically & Always
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Automated compliance monitoring across ERISA, ACA, HIPAA, and state regulations
                  achieving 100% compliance rate with zero penalties
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    Request Demo
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-yellow-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-orange-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-orange-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-gray-400 mb-6">{feature.description}</p>

                      <div className="space-y-2">
                        {feature.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-gray-300">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30"
                    >
                      <Icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-yellow-400">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-orange-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Compliance Performance</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-yellow-400 mb-2">100%</div>
                    <div className="text-gray-400">Compliance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-400 mb-2">99.8%</div>
                    <div className="text-gray-400">Audit Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-red-400 mb-2">$0</div>
                    <div className="text-gray-400">Penalties/Fines</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Policy Compliance maintain perfect compliance records
                  while dramatically reducing administrative burden and regulatory risk
                </p>
              </motion.div>
            </div>
          </section>

          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Ensure Perfect Compliance?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for automated compliance management
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
                  >
                    <Sparkles className="w-6 h-6" />
                    Schedule Consultation
                    <ArrowRight className="w-6 h-6" />
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