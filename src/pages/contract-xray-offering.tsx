import React, { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, TrendingUp, Clock, Users, FileText, BarChart3, Zap, ArrowRight, Lock, AlertTriangle, Target, Scale, DollarSign, FileSearch } from "lucide-react";
import Link from "next/link";

export default function ContractXRayOffering() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SEO
        title="Rx Defense IQ Contract X-Ray | Nautilus Health Institute"
        description="Your PBM contract is a crime scene. We have the forensics. Actuarially-anchored, evidence-spine-governed PBM contract forensic engine for ERISA fiduciaries."
      />
      <SiteHeader />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section - Crime Scene Positioning */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-slate-900 to-black text-white py-24">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          
          {/* Animated gradient orbs - more ominous */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30 animate-fade-in">
                Forensic Contract Intelligence
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
                Your PBM contract is a crime scene.
              </h1>
              <p className="text-3xl md:text-4xl font-bold text-red-400 mb-4 animate-slide-up delay-100">
                We have the forensics.
              </p>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto animate-slide-up delay-200">
                Rx Defense IQ Contract X-Ray<sup className="text-sm">™</sup> is the only actuarially-anchored, 
                evidence-spine-governed PBM contract forensic engine built for ERISA fiduciaries who refuse to lose.
              </p>
              <div className="bg-slate-800/50 border border-red-500/30 rounded-lg p-4 mb-8 animate-slide-up delay-300">
                <p className="text-lg font-semibold text-red-300">
                  Most PBM contracts are written to be misunderstood.<br />
                  Ours are written to be prosecuted.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-400">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold transition-all hover:scale-105 hover:shadow-xl">
                  Request Forensic Review
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all hover:scale-105">
                  Download Evidence Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Block */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* The Problem */}
                <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-lg p-8 hover:shadow-2xl transition-all">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-red-900">The Problem</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Your PBM contract is <strong>80 pages of deliberately engineered ambiguity</strong>. 
                    Spread pricing buried in footnotes. MAC lists that reset quarterly without notice. 
                    AWP discounts that look aggressive until you price the actual dispensed drug.
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Specialty carve-outs that swallow your margin in silence.
                  </p>
                  <p className="text-slate-700 leading-relaxed font-semibold">
                    Your broker reviewed it. Your legal team blessed it. Nobody ran the math.
                  </p>
                </div>

                {/* The Solution */}
                <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-lg p-8 hover:shadow-2xl transition-all">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <FileSearch className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-green-900">The Solution</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    <strong>Rx Defense IQ Contract X-Ray</strong> dissects every clause, guarantee, 
                    and pricing mechanism in your PBM agreement against <strong>757,000+ rows</strong> of 
                    national DOL disclosure data, live benchmark baselines, and the Kincaid 7-Gate Enforcement Chain.
                  </p>
                  <p className="text-slate-700 leading-relaxed font-semibold">
                    Every finding carries a provenance trail. Every claim carries a number. 
                    Every number carries a citation.
                  </p>
                  <p className="text-green-700 font-bold text-lg mt-4">
                    No anchor, no claim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Feature Blocks */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Forensic Intelligence Layer
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Five evidence-anchored capabilities that transform contract review from opinion to prosecution
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {/* 1. The Evidence Spine */}
              <Card className="p-8 bg-white border-l-4 border-l-blue-600 hover:shadow-2xl transition-all hover:-translate-x-2 duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">The Evidence Spine</h3>
                    <p className="text-slate-700 text-lg leading-relaxed mb-4">
                      Your audit means nothing without lineage. Every finding in Contract X-Ray is traceable 
                      to its source — <strong>claim line, contract clause, benchmark cohort, and DOL filing</strong>. 
                    </p>
                    <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                      When your fiduciary record is challenged, your defense is already built.
                    </p>
                  </div>
                </div>
              </Card>

              {/* 2. 7-Gate Enforcement Chain */}
              <Card className="p-8 bg-white border-l-4 border-l-amber-600 hover:shadow-2xl transition-all hover:-translate-x-2 duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">7-Gate Enforcement Chain</h3>
                    <p className="text-slate-700 text-lg leading-relaxed mb-4">
                      From contractual language to economic exposure, every finding passes <strong>seven verification gates</strong> before 
                      it ever reaches your desk.
                    </p>
                    <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                      This isn't a consultant's opinion. It's machine-enforced actuarial logic.
                    </p>
                  </div>
                </div>
              </Card>

              {/* 3. Shadow Tax Quantification */}
              <Card className="p-8 bg-white border-l-4 border-l-red-600 hover:shadow-2xl transition-all hover:-translate-x-2 duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Shadow Tax Quantification</h3>
                    <p className="text-slate-700 text-lg leading-relaxed mb-4">
                      Contract X-Ray calculates the <strong>hidden economic transfer</strong> your plan is absorbing — 
                      the spread, the rebate withholding, the DIR fee equivalent — and expresses it as what it is: 
                      <strong> a shadow tax on your working families</strong>.
                    </p>
                    <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                      Named. Quantified. Documented.
                    </p>
                  </div>
                </div>
              </Card>

              {/* 4. Benchmark Intelligence */}
              <Card className="p-8 bg-white border-l-4 border-l-purple-600 hover:shadow-2xl transition-all hover:-translate-x-2 duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Benchmark Intelligence</h3>
                    <p className="text-slate-700 text-lg leading-relaxed mb-4">
                      Your contract doesn't exist in a vacuum. Contract X-Ray positions every pricing term, 
                      dispensing fee, and guarantee structure against <strong>national cohort data</strong> from 
                      comparable plan designs, plan sizes, and industry verticals.
                    </p>
                    <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                      You'll know not just what you're paying — but what you should be paying.
                    </p>
                  </div>
                </div>
              </Card>

              {/* 5. ERISA Fiduciary Armor */}
              <Card className="p-8 bg-white border-l-4 border-l-green-600 hover:shadow-2xl transition-all hover:-translate-x-2 duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">ERISA Fiduciary Armor</h3>
                    <p className="text-slate-700 text-lg leading-relaxed mb-4">
                      <strong>ERISA Section 3(21)</strong> doesn't care what your broker told you. 
                      Contract X-Ray produces a <strong>documented, timestamped, evidence-anchored forensic record</strong> designed 
                      to meet the prudent expert standard.
                    </p>
                    <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                      When the DOL comes calling, you'll have an answer that holds.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Persona Callouts - CFO, CHRO, Fiduciary */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Built For Decision Makers Who Matter
              </h2>
              <p className="text-xl text-slate-600">
                Every stakeholder gets the evidence they need, in the language they understand
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* CFO */}
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">For the CFO</h3>
                <p className="text-slate-700 text-center leading-relaxed">
                  Your PBM contract is a <strong>revenue recognition document</strong> dressed as a health benefit. 
                  Contract X-Ray tells you what you're actually buying — and what it's actually costing.
                </p>
              </Card>

              {/* CHRO */}
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">For the CHRO</h3>
                <p className="text-slate-700 text-center leading-relaxed">
                  The benefits your employees depend on are being <strong>quietly eroded</strong> by contract mechanics 
                  nobody explained to you. Contract X-Ray makes the invisible visible — and makes the inexcusable accountable.
                </p>
              </Card>

              {/* Plan Fiduciary */}
              <Card className="p-8 bg-gradient-to-br from-green-50 to-white border-2 border-green-200 hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">For the Plan Fiduciary</h3>
                <p className="text-slate-700 text-center leading-relaxed">
                  Your duty of prudence <strong>doesn't end at signing. It begins there.</strong> Contract X-Ray gives you 
                  the evidence chain that proves you looked — and found what others missed.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* 4-Tier Product Structure */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Contract X-Ray Product Tiers
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                From quick triage to continuous accountability. Start where you are. Expand when ready.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Tier 1: Quick Screen */}
              <Card className="p-6 bg-white border-2 border-slate-200 hover:border-blue-400 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 group">
                <div className="mb-4">
                  <Badge className="bg-blue-100 text-blue-700">Tier 1</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Quick Screen</h3>
                <p className="text-slate-600 mb-4 min-h-[3rem]">Fast contract triage. Know if deeper forensics are worth it.</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900 mb-1">$1,500</div>
                  <p className="text-sm text-slate-500">One-time analysis</p>
                </div>

                <div className="space-y-3 mb-6 min-h-[280px]">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Quick Look Report (1 page)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">10-question forensic assessment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Good/Concern/Red Flag ratings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">48-hour turnaround</span>
                  </div>
                </div>

                <Button className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all" variant="outline">
                  Start Triage
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>

              {/* Tier 2: Full Contract X-Ray */}
              <Card className="p-6 bg-white border-2 border-red-400 hover:border-red-500 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 relative group">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white shadow-lg">Most Popular</Badge>
                </div>
                <div className="mb-4 mt-2">
                  <Badge className="bg-red-100 text-red-700">Tier 2</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors">Full Forensic X-Ray</h3>
                <p className="text-slate-600 mb-4 min-h-[3rem]">Complete dissection. Evidence-anchored findings. Prosecution-ready.</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900 mb-1">$4,500</div>
                  <p className="text-sm text-slate-500">One-time analysis</p>
                </div>

                <div className="space-y-3 mb-6 min-h-[280px]">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Everything in Quick Screen, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Contract X-Ray Scorecard (0-100)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">35 issues / 10 provisions / Evidence Spine</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Board Snapshot (executive brief)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Contract Vault storage (90 days)</span>
                  </div>
                </div>

                <Button className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg group-hover:shadow-xl transition-all">
                  Get Full Forensics
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>

              {/* Tier 3: Negotiation OS */}
              <Card className="p-6 bg-white border-2 border-green-400 hover:border-green-500 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 group">
                <div className="mb-4">
                  <Badge className="bg-green-100 text-green-700">Tier 3</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">Negotiation OS</h3>
                <p className="text-slate-600 mb-4 min-h-[3rem]">Turn findings into leverage. Model provisions. Track negotiation delta.</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900 mb-1">$9,500</div>
                  <p className="text-sm text-slate-500">One-time analysis + tools</p>
                </div>

                <div className="space-y-3 mb-6 min-h-[280px]">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Everything in Full X-Ray, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Negotiation Guide (gap analysis)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Model contract provisions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Prosecution-grade talking points</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Compare Report (before/after)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Negotiation Delta Memo</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg group-hover:shadow-xl transition-all">
                  Access Negotiation OS
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>

              {/* Tier 4: Continuous Accountability */}
              <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-2 border-slate-700 hover:border-slate-600 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
                
                <div className="mb-4 relative z-10">
                  <Badge className="bg-slate-700 text-slate-100">Tier 4</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2 relative z-10 group-hover:text-red-300 transition-colors">Continuous Accountability</h3>
                <p className="text-slate-300 mb-4 min-h-[3rem] relative z-10">Ongoing forensics. Renewal Watch. Full evidence system.</p>
                
                <div className="mb-6 relative z-10">
                  <div className="text-3xl font-bold mb-1">$18,000/yr</div>
                  <p className="text-sm text-slate-400">Annual subscription</p>
                </div>

                <div className="space-y-3 mb-6 min-h-[280px] relative z-10">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Everything in Negotiation OS, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Unlimited contract versions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Renewal Watch (change detection)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Contract Vault (unlimited)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Fiduciary Risk Trend Dashboard</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Benchmark drift alerts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Quarterly Renewal Decision Briefs</span>
                  </div>
                </div>

                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 shadow-lg group-hover:shadow-xl transition-all relative z-10">
                  Enable Continuous Forensics
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-slate-600">
                Not sure which tier fits? <Link href="/contact" className="text-red-600 hover:underline font-medium">Schedule a forensic consultation</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA - The Big Distinction */}
        <section className="py-20 bg-gradient-to-br from-red-950 via-slate-900 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-700 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                You negotiated a contract.<br />
                You signed a document.<br />
                <span className="text-red-400">You probably don't know the difference.</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 animate-fade-in delay-100">
                Rx Defense IQ Contract X-Ray was built for the moment you decide to find out.
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-200">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold transition-all hover:scale-105 hover:shadow-2xl">
                  Request Your Forensic Review
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all hover:scale-105">
                  Download Product Guide
                </Button>
              </div>
              <p className="text-sm text-red-300 mt-6 font-semibold animate-fade-in delay-300">
                No anchor, no claim.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}