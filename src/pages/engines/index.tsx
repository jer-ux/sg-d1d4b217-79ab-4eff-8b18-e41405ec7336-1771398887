import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import {
  TrendingUp,
  Activity,
  Shield,
  BarChart3,
  Calculator,
  Users,
  FileText,
  AlertTriangle,
  Zap,
  Database,
  Target,
  Pill,
  HeartPulse,
  Building2,
  Briefcase,
  DollarSign
} from "lucide-react";

const engineCategories = [
  {
    id: "forecasting",
    name: "Forecasting & Trend",
    count: 12,
    color: "blue",
    icon: TrendingUp,
    description: "Predictive models for cost trends and utilization",
    engines: []
  },
  {
    id: "normalization",
    name: "Data Normalization",
    count: 8,
    color: "purple",
    icon: Activity,
    description: "Statistical adjustment and standardization",
    engines: []
  },
  {
    id: "risk",
    name: "Risk Analytics",
    count: 6,
    color: "red",
    icon: Shield,
    description: "Risk modeling and exposure analysis",
    engines: []
  },
  {
    id: "interventions",
    name: "Interventions",
    count: 9,
    color: "green",
    icon: Target,
    description: "Cost optimization and intervention modeling",
    engines: []
  },
  {
    id: "pharmacy",
    name: "Pharmacy Intelligence",
    count: 7,
    color: "amber",
    icon: Pill,
    description: "Drug economics and formulary analytics",
    engines: []
  },
  {
    id: "governance",
    name: "Governance & Compliance",
    count: 8,
    color: "slate",
    icon: FileText,
    description: "Fiduciary oversight and contract scoring",
    engines: []
  }
];

const allEngines = [
  {
    id: "medical-trend",
    name: "Medical Trend Forecasting",
    category: "forecasting",
    description: "Time-series forecasting for medical cost trends",
    href: "/engines/medical-trend-forecasting",
    complexity: "Standard"
  },
  {
    id: "rx-trend",
    name: "Rx Trend Forecasting",
    category: "forecasting",
    description: "Pharmacy trend forecasting with drug pipeline analysis",
    href: "/engines/rx-trend-forecasting",
    complexity: "Advanced"
  },
  {
    id: "monte-carlo",
    name: "Monte Carlo Forecasting",
    category: "forecasting",
    description: "Probabilistic forecasting with uncertainty quantification",
    href: "/engines/monte-carlo-forecasting",
    complexity: "Expert"
  },
  {
    id: "ebitda",
    name: "EBITDA Enhancement",
    category: "interventions",
    description: "Enterprise value optimization through healthcare cost reduction",
    href: "/engines/ebitda-enhancement",
    complexity: "Advanced"
  },
  {
    id: "large-claimant",
    name: "Large Claimant Prediction",
    category: "risk",
    description: "Predictive modeling for catastrophic claim probability",
    href: "/engines/large-claimant-prediction",
    complexity: "Advanced"
  }
];

export default function EnginesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEngines = selectedCategory
    ? allEngines.filter(engine => engine.category === selectedCategory)
    : allEngines;

  return (
    <>
      <Head>
        <title>Universal Intelligence Engines | Kincaid Health Data Sciences Lab</title>
        <meta
          name="description"
          content="50+ specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20 text-sm">
              Universal Intelligence Platform
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Intelligence Engines
            </motion.h1>
            <p className="text-xl text-gray-300 mb-4 max-w-4xl mx-auto">
              50+ Specialized Actuarial Engines for Healthcare Analytics
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              Modular, composable intelligence for forecasting, risk modeling, and decision automation
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: "50+", label: "Specialized Engines", color: "violet" },
                { value: "12", label: "Engine Categories", color: "purple" },
                { value: "API", label: "First Architecture", color: "fuchsia" },
                { value: "Real-time", label: "Orchestration", color: "pink" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-3xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All Engines
            </Button>
            {engineCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </motion.div>

          {/* Engines Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredEngines.map((engine, idx) => {
              const categoryInfo = engineCategories.find(c => c.id === engine.category);
              const CategoryIcon = categoryInfo?.icon || Activity;
              
              return (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, rotateY: 3, z: 50 }}
                  className="perspective-1000"
                >
                  <Link href={engine.href}>
                    <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-violet-500/50 transition-all h-full transform-gpu hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-6 h-6 text-violet-400" />
                          </div>
                          <Badge variant="outline" className="text-xs border-slate-600">
                            {categoryInfo?.name}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-violet-300 transition-colors">
                          {engine.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400 mb-4">{engine.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Learn more →</span>
                          <Badge variant="secondary" className="bg-slate-800/50">
                            {engine.complexity}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}