import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Smartphone, Shield, Heart, BarChart3, Bell, CheckCircle2, ArrowRight, Sparkles, Award, DollarSign, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function MemberManagement() {
  const features = [
    {
      icon: Smartphone,
      title: "Self-Service Member Portal",
      description: "Intuitive mobile-first platform with digital ID cards, plan documents, claims history, and benefit education accessible 24/7 from any device.",
      metrics: ["94.7% Portal Adoption", "4.8/5 User Rating", "24/7 Access"],
    },
    {
      icon: Users,
      title: "Unified Member Profile",
      description: "360-degree member view consolidating enrollment, eligibility, claims, wellness participation, and communication preferences in single dashboard.",
      metrics: ["Single Source of Truth", "Real-time Updates", "Complete History"],
    },
    {
      icon: Bell,
      title: "Proactive Engagement",
      description: "Intelligent notification system with personalized alerts for preventive care, benefit deadlines, wellness opportunities, and cost-saving recommendations.",
      metrics: ["87% Engagement Rate", "Smart Notifications", "Action-Oriented"],
    },
    {
      icon: Shield,
      title: "Data Security & Privacy",
      description: "Bank-grade encryption, HIPAA-compliant infrastructure, and granular access controls protecting sensitive member information with audit trails.",
      metrics: ["HIPAA Compliant", "Zero Breaches", "Encrypted Data"],
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Machine learning algorithms deliver customized content, benefit recommendations, and care guidance based on individual member profiles and needs.",
      metrics: ["AI-Powered", "Personal Recommendations", "Smart Matching"],
    },
    {
      icon: BarChart3,
      title: "Member Analytics",
      description: "Advanced analytics tracking engagement patterns, portal usage, satisfaction scores, and intervention effectiveness driving continuous improvement.",
      metrics: ["Real-time Dashboards", "Predictive Insights", "Outcome Tracking"],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "98.3% Data Accuracy",
      description: "Industry-leading data quality with real-time validation",
    },
    {
      icon: Users,
      title: "500K+ Active Members",
      description: "Proven scalability across large member populations",
    },
    {
      icon: Smartphone,
      title: "94.7% Portal Adoption",
      description: "Exceptional member engagement and self-service utilization",
    },
    {
      icon: Award,
      title: "4.8/5 Satisfaction",
      description: "Outstanding member experience and support ratings",
    },
  ];

  return (
    <>
      <SEO
        title="Member Management Platform | Kincaid IQ"
        description="Unified member portal with self-service capabilities achieving 94.7% adoption and 500K+ active members."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Member Management</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Empower Members
                  <br />
                  With Digital Excellence
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Unified member portal with personalized self-service capabilities,
                  achieving 94.7% adoption rate and managing 500K+ active members
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-emerald-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-teal-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-teal-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-teal-400 transition-colors">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30"
                    >
                      <Icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-emerald-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-teal-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Platform Performance</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-emerald-400 mb-2">658%</div>
                    <div className="text-gray-400">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-400 mb-2">500K+</div>
                    <div className="text-gray-400">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-cyan-400 mb-2">94.7%</div>
                    <div className="text-gray-400">Portal Adoption</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Member Management achieve exceptional member engagement,
                  satisfaction scores, and operational efficiency through digital-first experiences
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
                  Ready to Transform Member Experience?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for unified member management
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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