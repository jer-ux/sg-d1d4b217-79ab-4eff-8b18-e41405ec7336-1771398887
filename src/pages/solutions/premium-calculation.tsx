import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, ArrowLeft, DollarSign, CheckCircle2, FileText, BarChart3, Sparkles, Calculator } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function PremiumCalculationSolution() {
  const kpis = [
    { label: "Calculation Accuracy", value: "99.4%", trend: "+1.8%" },
    { label: "Processing Speed", value: "2.1s", trend: "-42%" },
    { label: "Premium Optimization", value: "$3.8M", trend: "+24%" },
    { label: "Error Rate", value: "0.06%", trend: "-0.3%" }
  ];

  const complianceFrameworks = [
    { name: "NAIC Model Laws", description: "Insurance premium rate adequacy standards" },
    { name: "ACA Section 1312", description: "Qualified health plan premium calculation rules" },
    { name: "ERISA §3(16)", description: "Administrator duties for premium collection" },
    { name: "IRC §419A", description: "Tax treatment of qualified asset accounts" }
  ];

  const techStack = [
    { component: "Pricing Engine", tech: "Python + NumPy", purpose: "Advanced actuarial calculations" },
    { component: "Rate Database", tech: "PostgreSQL + Redis", purpose: "Fast premium rate lookup" },
    { component: "Risk Models", tech: "scikit-learn + XGBoost", purpose: "Predictive risk scoring" },
    { component: "Integration Layer", tech: "REST + WebSocket", purpose: "Real-time premium updates" }
  ];

  const calculationFactors = [
    { factor: "Age Band", impact: "High", adjustable: true },
    { factor: "Geographic Region", impact: "Medium", adjustable: true },
    { factor: "Plan Type", impact: "High", adjustable: false },
    { factor: "Coverage Level", impact: "High", adjustable: true },
    { factor: "Tobacco Use", impact: "Medium", adjustable: false },
    { factor: "Family Size", impact: "Medium", adjustable: true }
  ];

  return (
    <>
      <SEO 
        title="Premium Calculation Solution | SiriusB iQ"
        description="AI-powered premium calculation engine with 99.4% accuracy and real-time rate optimization"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Vegas Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-red-900/20" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236, 72, 153, 0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }}
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <Nav />

        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/">
              <Button variant="ghost" className="mb-8 text-pink-400 hover:text-pink-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Solutions
              </Button>
            </Link>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <motion.div
                className="inline-block p-4 rounded-2xl mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(239, 68, 68, 0.2))",
                  boxShadow: "0 0 60px rgba(236, 72, 153, 0.4), inset 0 0 60px rgba(239, 68, 68, 0.2)"
                }}
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <Calculator className="w-16 h-16 text-pink-400" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Premium Calculation
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Lightning-fast premium calculation engine with 99.4% accuracy and real-time rate optimization
              </p>
            </motion.div>

            {/* KPI Dashboard */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-pink-400" />
                Performance Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(239, 68, 68, 0.1))",
                      boxShadow: "0 0 40px rgba(236, 72, 153, 0.3)"
                    }}
                  >
                    <div className="relative z-10">
                      <p className="text-sm text-gray-400 mb-2">{kpi.label}</p>
                      <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                      <p className="text-sm text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {kpi.trend}
                      </p>
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Calculation Factors */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-red-400" />
                Rating Factors
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculationFactors.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(236, 72, 153, 0.1))",
                      boxShadow: "0 0 40px rgba(239, 68, 68, 0.3)"
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-3">{item.factor}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Impact Level:</span>
                      <span className={`text-sm font-bold ${item.impact === "High" ? "text-red-400" : "text-yellow-400"}`}>
                        {item.impact}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">User Adjustable:</span>
                      <span className={`text-sm font-bold ${item.adjustable ? "text-green-400" : "text-gray-500"}`}>
                        {item.adjustable ? "Yes" : "No"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Legal & Compliance */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FileText className="w-8 h-8 text-pink-400" />
                Compliance Standards
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceFrameworks.map((framework, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(239, 68, 68, 0.1))",
                      boxShadow: "0 0 40px rgba(236, 72, 153, 0.3)"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{framework.name}</h3>
                        <p className="text-gray-400">{framework.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Technical Architecture */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-red-400" />
                Technical Stack
              </h2>
              
              <div className="space-y-4">
                {techStack.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: -10 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(236, 72, 153, 0.1))",
                      boxShadow: "0 0 40px rgba(239, 68, 68, 0.3)"
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Component</p>
                        <p className="text-lg font-bold text-white">{item.component}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Technology</p>
                        <p className="text-lg font-bold text-red-400">{item.tech}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Purpose</p>
                        <p className="text-lg text-gray-300">{item.purpose}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <Link href="/request-demo">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button 
                    size="lg"
                    className="text-2xl px-12 py-8 rounded-2xl relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(239, 68, 68, 0.3))",
                      boxShadow: "0 0 60px rgba(236, 72, 153, 0.6)"
                    }}
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    See Live Calculation Demo
                    <Sparkles className="w-6 h-6 ml-3" />
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}