"use client";

import { Quote, TrendingUp, Clock, DollarSign, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  quote: string;
  impact: string;
  metric: string;
  role: string;
  company: string;
  companySize: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "time" | "cost" | "risk" | "governance";
}

export function QuantifiedTestimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "We found $2.3M in undocumented rebates and spread that our broker insisted 'didn't exist.' The forensic evidence was undeniable in contract renegotiation.",
      impact: "$2.3M recovered",
      metric: "in hidden rebates",
      role: "CFO",
      company: "Manufacturing Company",
      companySize: "12,000 employees",
      icon: DollarSign,
      category: "cost"
    },
    {
      quote: "Contract compliance audit that would've taken our consultant 6 weeks was done in 48 hours. The board-ready report had every citation, every discrepancy, every dollar tied to evidence.",
      impact: "40 days saved",
      metric: "on forensic audit",
      role: "VP of Benefits",
      company: "Healthcare System",
      companySize: "8,500 employees",
      icon: Clock,
      category: "time"
    },
    {
      quote: "During M&A due diligence, we discovered the target company had $4.7M in unrecorded pharmacy liabilities. The forensic trail prevented a catastrophic acquisition.",
      impact: "$4.7M exposure",
      metric: "identified pre-close",
      role: "Private Equity Operating Partner",
      company: "PE Firm",
      companySize: "15 portfolio companies",
      icon: Shield,
      category: "risk"
    },
    {
      quote: "When the DOL audit came, we had three years of fiduciary documentation ready in 24 hours. Every decision was evidence-backed. The auditor called it 'textbook governance.'",
      impact: "Clean DOL audit",
      metric: "with 24hr response",
      role: "CHRO",
      company: "Financial Services Firm",
      companySize: "6,200 employees",
      icon: Shield,
      category: "governance"
    },
    {
      quote: "Replaced 320 hours per year of manual benefits analysis with automated forensic scans. My team now focuses on strategy instead of spreadsheet archaeology.",
      impact: "320 hours/year",
      metric: "analyst time saved",
      role: "Director of Total Rewards",
      company: "Technology Company",
      companySize: "4,800 employees",
      icon: Clock,
      category: "time"
    },
    {
      quote: "Our previous PBM claimed 'industry-standard spreads.' The platform showed we were paying 187% above NADAC on 23 high-volume drugs. Contract terminated within 90 days.",
      impact: "$1.8M annual",
      metric: "spread reduction",
      role: "Benefits Consultant",
      company: "Independent Advisory Firm",
      companySize: "50+ clients",
      icon: TrendingUp,
      category: "cost"
    }
  ];

  const categoryColors = {
    time: { border: "border-blue-800/50", bg: "bg-blue-950/20", text: "text-blue-400" },
    cost: { border: "border-emerald-800/50", bg: "bg-emerald-950/20", text: "text-emerald-400" },
    risk: { border: "border-amber-800/50", bg: "bg-amber-950/20", text: "text-amber-400" },
    governance: { border: "border-purple-800/50", bg: "bg-purple-950/20", text: "text-purple-400" }
  };

  return (
    <div className="w-full py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Outcomes, Not Opinions
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Real impact from benefits leaders who chose forensic intelligence over consultant reassurances
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => {
            const Icon = testimonial.icon;
            const colors = categoryColors[testimonial.category];

            return (
              <Card
                key={idx}
                className={`${colors.border} ${colors.bg} border-2 p-6 flex flex-col`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {testimonial.impact}
                    </div>
                    <div className="text-sm text-slate-400">{testimonial.metric}</div>
                  </div>
                </div>

                <div className="flex-1">
                  <Quote className="w-6 h-6 text-slate-600 mb-2" />
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="font-semibold text-white">{testimonial.role}</div>
                  <div className="text-sm text-slate-400">{testimonial.company}</div>
                  <Badge variant="outline" className="mt-2 border-slate-700 text-slate-400">
                    {testimonial.companySize}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Average client finds <span className="text-white font-semibold">$847 PEPY</span> in undocumented leakage within first 90 days
          </p>
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            Read Full Case Studies
          </a>
        </div>
      </div>
    </div>
  );
}