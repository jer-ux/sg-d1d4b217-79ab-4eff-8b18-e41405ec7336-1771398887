"use client";

import { useState } from "react";
import { ChevronDown, Shield, Users, Code, DollarSign, Zap, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "trust" | "integration" | "competition" | "pricing" | "capability";
}

export function ObjectionsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How is this different from my benefits consultant or TPA?",
      answer: "Consultants provide analysis based on what PBMs and brokers tell them. We're forensic investigators — we verify every claim with evidence trails, not trust. Think legal discovery, not PowerPoint summaries. Your consultant can use our platform to validate their own work and defend their recommendations to the C-suite.",
      icon: Shield,
      category: "competition"
    },
    {
      question: "Do I need to change PBMs or fire my broker to use this?",
      answer: "No. We're vendor-neutral audit infrastructure. We help you prove whether your current vendors are performing — and give you leverage if they're not. Many clients keep their PBM but renegotiate contracts with our forensic data. If you do switch, you'll have objective evidence to justify it to the board.",
      icon: AlertCircle,
      category: "trust"
    },
    {
      question: "What if my broker or PBM pushes back on this?",
      answer: "Good vendors welcome transparency. If your broker resists forensic audits, that's the signal you need. We've seen brokers block access to claims data, delay file transfers, and dispute contract interpretations. That resistance is exactly what fiduciaries are required to investigate. Our platform documents every obstruction for ERISA defense.",
      icon: Shield,
      category: "trust"
    },
    {
      question: "Is the AI going to replace my internal benefits team?",
      answer: "No — it makes them 10x faster and legally defensible. Your team goes from manually chasing down receipts and broker explanations to running automated forensic scans, generating board-ready reports, and focusing on strategic negotiations instead of data wrangling. We're investigative infrastructure, not a replacement for judgment.",
      icon: Users,
      category: "capability"
    },
    {
      question: "Does this work with my existing claims data warehouse or TPA feed?",
      answer: "Yes. We integrate with Snowflake, Databricks, AWS S3, Azure Data Lake, and standard SFTP feeds. If you use Express Scripts, CVS Caremark, OptumRx, or a regional TPA, we've ingested their formats before. Our data engineers handle the mapping — typically 1-2 weeks from kickoff to first audit.",
      icon: Code,
      category: "integration"
    },
    {
      question: "Can I white-label the reports for board presentations?",
      answer: "Yes. All outputs (forensic reports, executive briefs, ledger exports) support custom branding, logos, and color schemes. You can export to PowerPoint, PDF, Excel, or directly embed dashboards in your internal portals. The evidence lineage stays intact regardless of presentation format.",
      icon: Users,
      category: "capability"
    },
    {
      question: "What's the pricing model — is this a percentage of savings or flat fee?",
      answer: "Flat annual platform fee based on covered lives + data volume. No percentage-of-savings deals (creates perverse incentives). You pay for forensic infrastructure whether you find $0 or $10M in leakage — because the real value is fiduciary defense and negotiating leverage, not just dollars recovered. Enterprise pricing starts at $75K/year for 5,000 lives.",
      icon: DollarSign,
      category: "pricing"
    },
    {
      question: "How long does it take to see results?",
      answer: "First forensic scan: 48 hours after data integration. Executive War Room dashboard: live within 2 weeks. Full ledger reconciliation: 30 days for first year of claims history. M&A due diligence audit: 10 business days (we've done it in 72 hours for urgent deals).",
      icon: Zap,
      category: "capability"
    },
    {
      question: "What if you're wrong about the leakage you find?",
      answer: "Every event in our platform has documented evidence lineage — contract clause citations, claims data snapshots, third-party benchmark sources, and calculation methodology. If a PBM disputes our findings, we have the receipt trail to defend it in arbitration or litigation. That's the difference between forensic-grade vs. consultant opinions.",
      icon: Shield,
      category: "trust"
    },
    {
      question: "Is this just for companies that suspect fraud, or proactive governance?",
      answer: "Both. Proactive clients use us for continuous monitoring — catching contract drift before it becomes material. Reactive clients use us for post-incident investigation — documenting what happened for ERISA defense, M&A reps/warranties, or DOL audits. The platform serves both prevention and prosecution.",
      icon: Shield,
      category: "capability"
    }
  ];

  const categoryColors = {
    trust: "border-emerald-800/50 bg-emerald-950/20",
    integration: "border-blue-800/50 bg-blue-950/20",
    competition: "border-purple-800/50 bg-purple-950/20",
    pricing: "border-amber-800/50 bg-amber-950/20",
    capability: "border-slate-800/50 bg-slate-950/20"
  };

  return (
    <div className="w-full py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Real Questions, Direct Answers
          </h2>
          <p className="text-xl text-slate-400">
            What benefits leaders actually ask before buying forensic intelligence
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon;
            const isOpen = openIndex === idx;

            return (
              <Card
                key={idx}
                className={`border transition-all ${
                  isOpen ? categoryColors[faq.category] : "border-slate-800 bg-slate-900/30"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-start gap-4 hover:bg-slate-800/20 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    isOpen ? "bg-white/10" : "bg-slate-800/50"
                  }`}>
                    <Icon className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 pr-8">
                      {faq.question}
                    </h3>
                    {isOpen && (
                      <p className="text-slate-400 mt-3 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            Talk to a fiduciary intelligence specialist
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </Link>
        </div>
      </div>
    </div>
  );
}