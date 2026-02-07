import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, ArrowLeft, TrendingUp, CheckCircle2, FileText, Sparkles, PieChart } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ClaimsAnalyticsSolution() {
  const kpis = [
    { label: "Claims Accuracy", value: "99.2%", trend: "+1.5%" },
    { label: "Processing Time", value: "2.4 hrs", trend: "-48%" },
    { label: "Fraud Detection", value: "97.8%", trend: "+5.2%" },
    { label: "Cost Avoidance", value: "$8.1M", trend: "+22%" }
  ];

  const complianceFrameworks = [
    { name: "29 CFR 2560.503-1", description: "Claims procedure requirements" },
    { name: "ERISA §503", description: "Claims notification and appeal procedures" },
    { name: "HIPAA §1171", description: "Administrative simplification standards" },
    { name: "ACA §2719", description: "Internal claims & appeals processes" }
  ];

  const techStack = [
    { component: "Analytics Engine", tech: "Apache Spark + ML", purpose: "Real-time claims pattern detection" },
    { component: "Fraud Detection", tech: "TensorFlow + XGBoost", purpose: "AI-powered anomaly detection" },
    { component: "Data Warehouse", tech: "Snowflake + dbt", purpose: "Historical claims analysis" },
    { component: "Visualization", tech: "D3.js + React", purpose: "Interactive dashboards" }
  ];

  const analyticsCapabilities = [
    { capability: "Predictive Modeling", accuracy: "96.5%", use_case: "Claims cost forecasting" },
    { capability: "Trend Analysis", accuracy: "94.8%", use_case: "Utilization patterns" },
    { capability: "Fraud Detection", accuracy: "97.8%", use_case: "Anomaly identification" },
    { capability: "Provider Analysis", accuracy: "95.2%", use_case: "Network optimization" },
    { capability: "Member Segmentation", accuracy: "93.7%", use_case: "Risk stratification" },
    { capability: "Cost Modeling", accuracy: "96.1%", use_case: "Budget planning" }
  ];

  return (
    <>
      <SEO 
        title="Claims Analytics Solution | SiriusB iQ"
        description="Advanced claims analytics with 99.2% accuracy and real-time fraud detection"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-yellow-900/20" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 146, 60, 0.15) 1px, transparent 0)`,
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
              <Button variant="ghost" className="mb-8 text-orange-400 hover:text-orange-300">
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
                  background: "linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(234, 179, 8, 0.2))",
                  boxShadow: "0 0 60px rgba(251, 146, 60, 0.4)"
                }}
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <PieChart className="w-16 h-16 text-orange-400" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Claims Analytics
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Advanced claims analytics with 99.2% accuracy and AI-powered fraud detection
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-orange-400" />
                Analytics Performance
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
                      background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(234, 179, 8, 0.1))",
                      boxShadow: "0 0 40px rgba(251, 146, 60, 0.3)"
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
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0"
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
                <Sparkles className="w-8 h-8 text-yellow-400" />
                Analytics Capabilities
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsCapabilities.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(251, 146, 60, 0.1))",
                      boxShadow: "0 0 40px rgba(234, 179, 8, 0.3)"
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{item.capability}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="text-yellow-400 font-bold">{item.accuracy}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Use Case:</span>
                        <p className="text-orange-400 mt-1">{item.use_case}</p>
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
                <FileText className="w-8 h-8 text-orange-400" />
                Regulatory Compliance
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
                      background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(234, 179, 8, 0.1))",
                      boxShadow: "0 0 40px rgba(251, 146, 60, 0.3)"
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
                <Sparkles className="w-8 h-8 text-orange-400" />
                Technology Stack
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
                      background: "linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(251, 146, 60, 0.1))",
                      boxShadow: "0 0 40px rgba(234, 179, 8, 0.3)"
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Component</p>
                        <p className="text-lg font-bold text-white">{item.component}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Technology</p>
                        <p className="text-lg font-bold text-yellow-400">{item.tech}</p>
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
                      background: "linear-gradient(135deg, rgba(251, 146, 60, 0.3), rgba(234, 179, 8, 0.3))",
                      boxShadow: "0 0 60px rgba(251, 146, 60, 0.6)"
                    }}
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    View Analytics Demo
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