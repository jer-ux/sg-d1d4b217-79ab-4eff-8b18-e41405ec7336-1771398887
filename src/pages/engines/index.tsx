import Head from "next/head";
import Link from "next/link";
import { TrendingUp, Activity, Brain, Calculator, Database, BarChart3, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const engines = [
  {
    id: "medical-trend-forecasting",
    name: "Medical Trend Forecasting",
    category: "Core Trend Analysis",
    description: "Predictive modeling of medical cost trends using time-series analysis and credibility weighting",
    icon: TrendingUp
  },
  {
    id: "rx-trend-forecasting",
    name: "Rx Trend Forecasting",
    category: "Core Trend Analysis",
    description: "Pharmacy cost projection incorporating specialty drug adoption and biosimilar displacement",
    icon: Activity
  },
  {
    id: "dental-trend-analysis",
    name: "Dental Trend Analysis",
    category: "Core Trend Analysis",
    description: "Dental benefit cost forecasting with utilization pattern recognition",
    icon: TrendingUp
  },
  {
    id: "vision-trend-analysis",
    name: "Vision Trend Analysis",
    category: "Core Trend Analysis",
    description: "Vision benefit trend modeling with demographic adjustment factors",
    icon: Activity
  },
  {
    id: "catastrophic-claims-forecasting",
    name: "Catastrophic Claims Forecasting",
    category: "Risk Modeling",
    description: "High-dollar claim probability modeling using extreme value theory",
    icon: BarChart3
  },
  {
    id: "high-cost-claimant-prediction",
    name: "High-Cost Claimant Prediction",
    category: "Risk Modeling",
    description: "ML-based identification of future high-cost members using longitudinal data",
    icon: Brain
  },
  {
    id: "glp1-financial-impact",
    name: "GLP-1 Financial Impact Modeling",
    category: "Specialty Drug Analytics",
    description: "Economic modeling of GLP-1 adoption patterns and total cost of care impact",
    icon: Calculator
  },
  {
    id: "gene-therapy-exposure",
    name: "Gene Therapy Exposure Modeling",
    category: "Specialty Drug Analytics",
    description: "Population-based risk assessment for ultra-high-cost gene therapy utilization",
    icon: Database
  },
  {
    id: "oncology-cost-projection",
    name: "Oncology Cost Projection",
    category: "Specialty Drug Analytics",
    description: "Cancer treatment cost forecasting including novel immunotherapy adoption",
    icon: Activity
  },
  {
    id: "inflation-decomposition",
    name: "Inflation Decomposition",
    category: "Cost Analysis",
    description: "Separation of medical inflation into unit cost, utilization, and mix components",
    icon: BarChart3
  },
  {
    id: "provider-unit-cost-trend",
    name: "Provider Unit Cost Trend",
    category: "Cost Analysis",
    description: "Analysis of provider pricing changes isolated from volume effects",
    icon: TrendingUp
  },
  {
    id: "utilization-trend-engine",
    name: "Utilization Trend Engine",
    category: "Cost Analysis",
    description: "Service frequency and intensity trending independent of pricing changes",
    icon: Activity
  },
  {
    id: "geographic-normalization",
    name: "Geographic Normalization",
    category: "Risk Adjustment",
    description: "Regional cost variation adjustment using ZIP+4 level cost indices",
    icon: Database
  },
  {
    id: "age-gender-risk-adjustment",
    name: "Age/Gender Risk Adjustment",
    category: "Risk Adjustment",
    description: "Demographic standardization using actuarial age curves and gender factors",
    icon: Calculator
  },
  {
    id: "case-mix-adjustment",
    name: "Case Mix Adjustment",
    category: "Risk Adjustment",
    description: "HCC-based morbidity adjustment for population health comparison",
    icon: Brain
  },
  {
    id: "pmpm-normalization",
    name: "PMPM Normalization",
    category: "Metrics & Benchmarking",
    description: "Per-member-per-month cost standardization for plan comparison",
    icon: BarChart3
  },
  {
    id: "pepy-normalization",
    name: "PEPY Normalization",
    category: "Metrics & Benchmarking",
    description: "Per-employee-per-year metrics accounting for dependent coverage ratios",
    icon: TrendingUp
  },
  {
    id: "seasonality-adjustment",
    name: "Seasonality Adjustment",
    category: "Time Series Analysis",
    description: "Removal of calendar effects and recurring seasonal patterns from claims data",
    icon: Activity
  },
  {
    id: "credibility-weighting",
    name: "Credibility Weighting",
    category: "Statistical Modeling",
    description: "Bayesian credibility theory for small group experience rating",
    icon: Calculator
  },
  {
    id: "monte-carlo-forecasting",
    name: "Monte Carlo Forecasting",
    category: "Statistical Modeling",
    description: "Stochastic simulation generating probabilistic confidence intervals",
    icon: Brain
  }
];

const categories = Array.from(new Set(engines.map(e => e.category)));

export default function EnginesIndex() {
  return (
    <>
      <Head>
        <title>Actuarial Engines | Kincaid Health Data Sciences Lab</title>
        <meta name="description" content="20+ specialized actuarial and analytical engines powering healthcare cost intelligence" />
      </Head>
      <SEO 
        title="Actuarial Engines — Kincaid Health"
        description="Specialized analytical engines for healthcare cost forecasting, risk modeling, and trend analysis"
      />

      <Nav />

      <main className="min-h-screen bg-[#0F1419]">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-b from-black via-[#0A0E27] to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <Badge className="bg-[#1A3A52]/20 border border-[#1A3A52] text-[#B8860B] mb-4">
                ANALYTICAL INFRASTRUCTURE
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Actuarial Engines
              </h1>
              
              <p className="text-xl text-neutral-400 mb-8">
                20 specialized analytical engines powering forensic healthcare cost intelligence. Each engine represents years of actuarial research and real-world validation.
              </p>

              <div className="flex items-center gap-4">
                <Link href="/request-demo">
                  <Button className="bg-[#B8860B] hover:bg-[#9A7209] text-black font-bold">
                    Request Engine Access
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button variant="outline" className="border-[#2A3F54] text-neutral-200 hover:bg-[#151B23]">
                    Platform Overview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">20+</div>
                <div className="text-sm text-neutral-400">Specialized Engines</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">247</div>
                <div className="text-sm text-neutral-400">Organizations Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">$2.4B</div>
                <div className="text-sm text-neutral-400">Cost Variance Identified</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">94%</div>
                <div className="text-sm text-neutral-400">Forecast Accuracy</div>
              </div>
            </div>
          </div>
        </section>

        {/* Engines by Category */}
        {categories.map((category) => {
          const categoryEngines = engines.filter(e => e.category === category);
          return (
            <section key={category} className="py-12 border-b border-[#1F2937]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold text-white mb-2">
                    {category}
                  </h2>
                  <p className="text-neutral-400">
                    {categoryEngines.length} specialized engines in this domain
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryEngines.map((engine) => {
                    const Icon = engine.icon;
                    return (
                      <Link 
                        key={engine.id}
                        href={`/engines/${engine.id}`}
                        className="group block"
                      >
                        <div className="bg-[#151B23] border border-[#2A3F54] hover:border-[#B8860B]/50 hover:bg-[#1C232B] rounded-xl p-6 h-full transition-all duration-300">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-[#1A3A52]/30 border border-[#1A3A52] flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[#B8860B]" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white group-hover:text-[#B8860B] transition-colors mb-1">
                                {engine.name}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            {engine.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-[#B8860B] font-medium">
                            View Engine Details
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Deploy Enterprise Analytics Infrastructure
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              Kincaid Health's actuarial engine suite integrates directly with your data warehouse via Snowflake, Databricks, or standard claim formats.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/request-demo">
                <Button className="bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold">
                  Schedule Technical Demo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#2A3F54] text-neutral-200 hover:bg-[#151B23]">
                  Contact Sales Engineering
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}