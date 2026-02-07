import { motion } from "framer-motion";
import Link from "next/link";
import { Layers, ArrowLeft, TrendingUp, CheckCircle2, FileText, BarChart3, Sparkles, Workflow } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function PlanDesignSolution() {
  const kpis = [
    { label: "Plan Efficiency", value: "94.6%", trend: "+7.3%" },
    { label: "Design Time", value: "3.2 days", trend: "-58%" },
    { label: "Member Adoption", value: "91.4%", trend: "+12%" },
    { label: "Cost Savings", value: "$4.8M", trend: "+19%" }
  ];

  const complianceFrameworks = [
    { name: "ERISA §102", description: "Summary plan description requirements" },
    { name: "IRC §125", description: "Cafeteria plan regulations" },
    { name: "ACA §1302", description: "Essential health benefits requirements" },
    { name: "29 CFR 2520.102-3", description: "Style and format of summary plan description" }
  ];

  const techStack = [
    { component: "Design Platform", tech: "React + D3.js", purpose: "Interactive plan design interface" },
    { component: "Modeling Engine", tech: "R + Actuarial Libraries", purpose: "Cost and utilization modeling" },
    { component: "Compliance Checker", tech: "Rules Engine + NLP", purpose: "Automated regulatory validation" },
    { component: "Simulation Suite", tech: "Monte Carlo + Python", purpose: "Scenario analysis & forecasting" }
  ];

  const designComponents = [
    { component: "Coverage Tiers", options: 24, customizable: true },
    { component: "Deductible Structures", options: 18, customizable: true },
    { component: "Coinsurance Models", options: 15, customizable: true },
    { component: "Out-of-Pocket Maximums", options: 12, customizable: true },
    { component: "Network Designs", options: 21, customizable: true },
    { component: "Wellness Incentives", options: 16, customizable: true }
  ];

  return (
    <>
      <SEO 
        title="Plan Design Solution | SiriusB iQ"
        description="Advanced benefit plan design platform with 94.6% efficiency and AI-powered optimization"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-blue-900/20" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.15) 1px, transparent 0)`,
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
              <Button variant="ghost" className="mb-8 text-cyan-400 hover:text-cyan-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Solutions
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <motion.div
                className="inline-block p-4 rounded-2xl mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 0 60px rgba(6, 182, 212, 0.4)"
                }}
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <Layers className="w-16 h-16 text-cyan-400" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Plan Design
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Advanced benefit plan design platform with 94.6% efficiency and AI-powered optimization
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
                Design Performance
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
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
                      boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)"
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
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Workflow className="w-8 h-8 text-blue-400" />
                Design Components
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designComponents.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                      boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)"
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{item.component}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Design Options:</span>
                        <span className="text-blue-400 font-bold">{item.options}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Customizable:</span>
                        <span className="text-green-400 font-bold">
                          {item.customizable ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FileText className="w-8 h-8 text-cyan-400" />
                Regulatory Standards
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
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
                      boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)"
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

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-400" />
                Technology Platform
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
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                      boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)"
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Component</p>
                        <p className="text-lg font-bold text-white">{item.component}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Technology</p>
                        <p className="text-lg font-bold text-blue-400">{item.tech}</p>
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
                    className="text-2xl px-12 py-8 rounded-2xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))",
                      boxShadow: "0 0 60px rgba(6, 182, 212, 0.6)"
                    }}
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Request Design Consultation
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