import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const allEngines = [
  {
    number: 1,
    name: "Medical Trend Forecast Engine",
    description: "Predict annual healthcare cost trends",
    href: "/engines/medical-trend-forecasting",
    category: "Forecasting"
  },
  {
    number: 2,
    name: "Pharmacy Trend Forecast Engine",
    description: "Forecast prescription drug inflation",
    href: "/engines/rx-trend-forecasting",
    category: "Forecasting"
  },
  {
    number: 3,
    name: "Large Claim Prediction Engine",
    description: "Identify future catastrophic claims",
    href: "/engines/catastrophic-claims-forecasting",
    category: "Risk"
  },
  {
    number: 4,
    name: "Stop-Loss Attachment Point Optimizer",
    description: "Recommend optimal deductible levels",
    href: "/engines/stop-loss-contract-scoring",
    category: "Risk"
  },
  {
    number: 5,
    name: "IBNR Reserve Engine",
    description: "Estimate incurred-but-not-reported liabilities",
    href: "/engines/ibnr-reserve-modeling",
    category: "Clinical"
  },
  {
    number: 6,
    name: "Completion Factor Engine",
    description: "Estimate claim run-out development",
    href: "/engines/credibility-weighting",
    category: "Normalization"
  },
  {
    number: 7,
    name: "PMPM Projection Engine",
    description: "Forecast Per Member Per Month costs",
    href: "/engines/pmpm-normalization",
    category: "Normalization"
  },
  {
    number: 8,
    name: "PEPY Projection Engine",
    description: "Forecast Per Employee Per Year costs",
    href: "/engines/pepy-normalization",
    category: "Normalization"
  },
  {
    number: 9,
    name: "Population Risk Scoring Engine",
    description: "Calculate overall population morbidity",
    href: "/engines/population-risk-stratification",
    category: "Risk"
  },
  {
    number: 10,
    name: "Chronic Disease Cost Engine",
    description: "Forecast costs for chronic conditions",
    href: "/engines/chronic-disease-progression",
    category: "Clinical"
  },
  {
    number: 11,
    name: "Diabetes Cost Projection Engine",
    description: "Predict diabetes-related expenditures",
    href: "/engines/chronic-disease-cost",
    category: "Clinical"
  },
  {
    number: 12,
    name: "Oncology Cost Forecast Engine",
    description: "Model future cancer treatment costs",
    href: "/engines/oncology-cost-projection",
    category: "Interventions"
  },
  {
    number: 13,
    name: "GLP-1 Financial Impact Engine",
    description: "Estimate obesity medication costs",
    href: "/engines/glp1-financial-impact",
    category: "Interventions"
  },
  {
    number: 14,
    name: "Specialty Drug Projection Engine",
    description: "Forecast specialty pharmacy spending",
    href: "/engines/specialty-pharmacy-economics",
    category: "Pharmacy"
  },
  {
    number: 15,
    name: "High-Cost Claim Detection Engine",
    description: "Identify emerging million-dollar claims",
    href: "/engines/high-cost-claimant-prediction",
    category: "Risk"
  },
  {
    number: 16,
    name: "Catastrophic Claim Simulation Engine",
    description: "Monte Carlo catastrophic loss modeling",
    href: "/engines/monte-carlo-forecasting",
    category: "Forecasting"
  },
  {
    number: 17,
    name: "Risk Adjustment Engine",
    description: "Calculate HCC and risk scores",
    href: "/engines/age-gender-risk-adjustment",
    category: "Normalization"
  },
  {
    number: 18,
    name: "ACA Premium Rating Engine",
    description: "Develop ACA premium rates",
    href: "/engines/premium-calculation",
    category: "Enterprise"
  },
  {
    number: 19,
    name: "Employer Premium Rating Engine",
    description: "Calculate self-funded contribution levels",
    href: "/engines/enterprise-value-creation",
    category: "Enterprise"
  },
  {
    number: 20,
    name: "Experience Rating Engine",
    description: "Determine renewal adjustments",
    href: "/engines/case-mix-adjustment",
    category: "Normalization"
  },
  {
    number: 21,
    name: "Credibility Weighting Engine",
    description: "Blend manual and experience rates",
    href: "/engines/credibility-weighting",
    category: "Normalization"
  },
  {
    number: 22,
    name: "Renewal Projection Engine",
    description: "Forecast next-year plan costs",
    href: "/engines/medical-trend-forecasting",
    category: "Forecasting"
  },
  {
    number: 23,
    name: "Contribution Strategy Engine",
    description: "Optimize employer/employee funding",
    href: "/engines/employer-cost-shifting",
    category: "Interventions"
  },
  {
    number: 24,
    name: "Dependent Cost Modeling Engine",
    description: "Forecast spouse and child costs",
    href: "/engines/dependent-eligibility",
    category: "Clinical"
  },
  {
    number: 25,
    name: "Age-Gender Curve Engine",
    description: "Develop demographic cost factors",
    href: "/engines/age-gender-risk-adjustment",
    category: "Normalization"
  },
  {
    number: 26,
    name: "Geographic Adjustment Engine",
    description: "Normalize regional healthcare costs",
    href: "/engines/geographic-normalization",
    category: "Normalization"
  },
  {
    number: 27,
    name: "Network Discount Valuation Engine",
    description: "Measure provider network savings",
    href: "/engines/network-disruption-modeling",
    category: "Interventions"
  },
  {
    number: 28,
    name: "Reference-Based Pricing Engine",
    description: "Estimate reimbursement alternatives",
    href: "/engines/reference-based-pricing-savings",
    category: "Interventions"
  },
  {
    number: 29,
    name: "Provider Efficiency Engine",
    description: "Score physician financial performance",
    href: "/engines/provider-unit-cost-trend",
    category: "Forecasting"
  },
  {
    number: 30,
    name: "Provider Quality Cost Engine",
    description: "Balance quality versus cost",
    href: "/engines/provider-unit-cost-trend",
    category: "Forecasting"
  },
  {
    number: 31,
    name: "Readmission Financial Risk Engine",
    description: "Estimate avoidable readmission costs",
    href: "/engines/readmission-prediction",
    category: "Risk"
  },
  {
    number: 32,
    name: "Preventive Care ROI Engine",
    description: "Quantify value of preventive services",
    href: "/engines/wellness-roi",
    category: "Interventions"
  },
  {
    number: 33,
    name: "Wellness Program ROI Engine",
    description: "Estimate financial return from wellness",
    href: "/engines/wellness-roi",
    category: "Interventions"
  },
  {
    number: 34,
    name: "Care Management Savings Engine",
    description: "Measure disease management savings",
    href: "/engines/chronic-disease-progression",
    category: "Clinical"
  },
  {
    number: 35,
    name: "PBM Contract Savings Engine",
    description: "Quantify pharmacy contract improvements",
    href: "/engines/pbm-contract-scoring",
    category: "Governance"
  },
  {
    number: 36,
    name: "Drug Rebate Valuation Engine",
    description: "Estimate manufacturer rebate values",
    href: "/engines/rebate-optimization",
    category: "Pharmacy"
  },
  {
    number: 37,
    name: "Formulary Optimization Engine",
    description: "Optimize formulary economics",
    href: "/engines/formulary-analytics",
    category: "Pharmacy"
  },
  {
    number: 38,
    name: "Fiduciary Risk Exposure Engine",
    description: "Quantify ERISA fiduciary financial risk",
    href: "/engines/erisa-fiduciary-risk-scoring",
    category: "Governance"
  },
  {
    number: 39,
    name: "Compliance Cost Exposure Engine",
    description: "Estimate regulatory financial exposure",
    href: "/engines/compliance-monitoring",
    category: "Governance"
  },
  {
    number: 40,
    name: "Fraud, Waste & Abuse Detection Engine",
    description: "Detect anomalous claim patterns",
    href: "/engines/waste-fraud-abuse-detection",
    category: "Risk"
  },
  {
    number: 41,
    name: "Monte Carlo Healthcare Simulator",
    description: "Simulate thousands of cost scenarios",
    href: "/engines/monte-carlo-forecasting",
    category: "Forecasting"
  },
  {
    number: 42,
    name: "EBITDA Healthcare Impact Engine",
    description: "Translate healthcare savings into enterprise value",
    href: "/engines/ebitda-enhancement",
    category: "Enterprise"
  },
  {
    number: 43,
    name: "Executive Actuarial Score Engine",
    description: "Produce a composite actuarial performance index",
    href: "/engines/board-reporting-engine",
    category: "Clinical"
  },
];

export default function EnginesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEngines = allEngines.filter(
    (engine) =>
      engine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engine.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Actuarial Engine | Kincaid Health Data Sciences Lab</title>
        <meta
          name="description"
          content="43 specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence."
        />
      </Head>
      <SEO
        title="Actuarial Engine | Kincaid Health Data Sciences Lab"
        description="43 specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence."
      />

      <Nav />

      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16 lg:py-24 max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Actuarial Engine
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Primary Purpose
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search engines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Engines List */}
          <div className="space-y-3">
            {filteredEngines.map((engine) => (
              <motion.div
                key={engine.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: engine.number * 0.01 }}
              >
                <Link href={engine.href}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-muted-foreground font-mono text-sm min-w-[2rem] pt-0.5">
                          {engine.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                                {engine.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {engine.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge variant="outline" className="text-xs">
                                {engine.category}
                              </Badge>
                              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredEngines.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No engines found matching "{searchQuery}"
              </p>
            </div>
          )}

          {/* Footer Stats */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              {filteredEngines.length} of {allEngines.length} engines shown
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}