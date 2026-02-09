import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, Activity, Smartphone, Shield, TrendingDown, CheckCircle2, ArrowRight, Sparkles, Award, DollarSign, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function HealthBenefits() {
  const features = [
    {
      icon: Users,
      title: "Comprehensive Benefits Administration",
      description: "End-to-end platform managing enrollment, eligibility, life events, and plan changes with automated workflows and real-time validation.",
      metrics: ["50+ Plan Options", "99.8% Accuracy", "24/7 Self-Service"],
    },
    {
      icon: Activity,
      title: "Integrated Wellness Programs",
      description: "Holistic wellness platform with biometric screenings, health coaching, fitness challenges, and incentive management driving member engagement.",
      metrics: ["85% Participation", "40% Health Improvement", "Digital Health Tools"],
    },
    {
      icon: Smartphone,
      title: "Member Engagement Portal",
      description: "Intuitive mobile-first portal with digital ID cards, claims tracking, provider search, benefit education, and personalized recommendations.",
      metrics: ["94.7% Portal Adoption", "4.8/5 User Rating", "Mobile Native"],
    },
    {
      icon: Shield,
      title: "Care Coordination",
      description: "Proactive care management connecting high-risk members with case managers, disease management programs, and preventive care resources.",
      metrics: ["92% Program Completion", "35% Readmission Reduction", "Dedicated Support"],
    },
    {
      icon: TrendingDown,
      title: "Cost Management Tools",
      description: "Transparent cost estimators, pharmacy price comparison, telemedicine access, and network steerage reducing out-of-pocket expenses.",
      metrics: ["28% Cost Reduction", "Price Transparency", "Alternative Options"],
    },
    {
      icon: Target,
      title: "Population Health Analytics",
      description: "Advanced analytics identifying health trends, risk stratification, intervention opportunities, and program effectiveness measurement.",
      metrics: ["Real-time Dashboards", "Predictive Modeling", "Outcome Tracking"],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "$15.3M Cost Savings",
      description: "Comprehensive benefits optimization and care coordination",
    },
    {
      icon: Users,
      title: "96.8% Satisfaction",
      description: "Industry-leading member satisfaction and engagement scores",
    },
    {
      icon: Activity,
      title: "50+ Plan Options",
      description: "Flexible benefit designs meeting diverse employee needs",
    },
    {
      icon: Award,
      title: "500K+ Members",
      description: "Proven scalability across large, complex organizations",
    },
  ];

  return (
    <>
      <SEO
        title="Health Benefits Management Solutions | Kincaid IQ"
        description="Comprehensive benefits administration with integrated wellness programs achieving 96.8% member satisfaction and $15.3M savings."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                  <Heart className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">Health Benefits Management</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  Transform Employee Health
                  <br />
                  & Well-Being
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Comprehensive benefits administration platform with integrated wellness programs,
                  achieving 96.8% member satisfaction and $15.3M in annual savings
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-cyan-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30"
                    >
                      <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-blue-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 border border-cyan-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Return on Investment</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">612%</div>
                    <div className="text-gray-400">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-cyan-400 mb-2">$15.3M</div>
                    <div className="text-gray-400">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-400 mb-2">96.8%</div>
                    <div className="text-gray-400">Member Satisfaction</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Health Benefits achieve exceptional member satisfaction
                  while driving significant cost reduction and improved health outcomes
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
                  Ready to Transform Your Health Benefits?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for comprehensive benefits management
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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