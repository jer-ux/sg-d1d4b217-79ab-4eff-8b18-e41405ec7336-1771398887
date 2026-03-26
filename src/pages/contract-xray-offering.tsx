import React from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, TrendingUp, Clock, Users, FileText, BarChart3, Zap, ArrowRight, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ContractXRayOffering() {
  return (
    <>
      <SEO
        title="Contract X-Ray Product Tiers | Nautilus Health Institute"
        description="From quick screening to continuous accountability. Choose the Contract X-Ray tier that fits your PBM contract governance needs."
      />
      <SiteHeader />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-800 to-blue-950 text-white py-24">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                Product Architecture
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Contract X-Ray<sup className="text-2xl">™</sup>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-4">
                Fiduciary-Aligned PBM Contract Standards
              </p>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Start with a quick screen. Expand to continuous governance. 
                Transform how you protect plan participants through every contract lifecycle stage.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                  Compare Tiers
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Download Product Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Philosophy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  A Product System, Not Just Reports
                </h2>
                <p className="text-xl text-slate-600">
                  Contract X-Ray grows with you—from one-time analysis to continuous contract governance
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Low-Friction Entry</h3>
                  <p className="text-slate-600">Start with Quick Screen. Get insights in minutes, not weeks.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Higher-Value Expansion</h3>
                  <p className="text-slate-600">Progress to Full X-Ray, Negotiation OS, and Continuous Accountability.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Durable Governance</h3>
                  <p className="text-slate-600">Build institutional memory. Track contract evolution. Protect fiduciary duty.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Tier Offering Model */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Choose Your Contract X-Ray Tier
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every tier builds on the previous. Start where you are. Expand when you're ready.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Tier 1: Quick Screen */}
              <Card className="p-6 bg-white border-2 border-slate-200 hover:border-blue-400 transition-all hover:shadow-xl">
                <div className="mb-4">
                  <Badge className="bg-blue-100 text-blue-700">Tier 1</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">Quick Screen</h3>
                <p className="text-slate-600 mb-4">Fast contract triage. Know if deeper analysis is worth it.</p>
                
                <div className="text-3xl font-bold text-slate-900 mb-1">$1,500</div>
                <p className="text-sm text-slate-500 mb-6">One-time analysis</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Quick Look Report (1 page)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">10-question assessment</span>
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

                <Button className="w-full" variant="outline">
                  Start with Quick Screen
                </Button>
              </Card>

              {/* Tier 2: Full Contract X-Ray */}
              <Card className="p-6 bg-white border-2 border-amber-400 hover:border-amber-500 transition-all hover:shadow-xl relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-amber-500 text-white">Most Popular</Badge>
                </div>
                <div className="mb-4 mt-2">
                  <Badge className="bg-amber-100 text-amber-700">Tier 2</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">Full Contract X-Ray</h3>
                <p className="text-slate-600 mb-4">Complete analysis. Board-ready insights. Clause-level findings.</p>
                
                <div className="text-3xl font-bold text-slate-900 mb-1">$4,500</div>
                <p className="text-sm text-slate-500 mb-6">One-time analysis</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Everything in Quick Screen, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Contract X-Ray Scorecard</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">35 issues / 10 provisions / 0-100 score</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Board Snapshot (1-page executive brief)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Contract stored in Vault (90 days)</span>
                  </div>
                </div>

                <Button className="w-full bg-amber-500 hover:bg-amber-600">
                  Get Full X-Ray
                </Button>
              </Card>

              {/* Tier 3: Negotiation OS */}
              <Card className="p-6 bg-white border-2 border-green-400 hover:border-green-500 transition-all hover:shadow-xl">
                <div className="mb-4">
                  <Badge className="bg-green-100 text-green-700">Tier 3</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">Negotiation OS</h3>
                <p className="text-slate-600 mb-4">Turn scores into strategy. Model provisions. Track negotiation progress.</p>
                
                <div className="text-3xl font-bold text-slate-900 mb-1">$9,500</div>
                <p className="text-sm text-slate-500 mb-6">One-time analysis + tools</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Everything in Full X-Ray, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Negotiation Guide (multi-page gap analysis)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Model contract provisions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Negotiation talking points</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Compare Report (before/after analysis)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Negotiation Delta Memo (progress tracking)</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Access Negotiation OS
                </Button>
              </Card>

              {/* Tier 4: Continuous Accountability */}
              <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-2 border-slate-700 hover:border-slate-600 transition-all hover:shadow-xl">
                <div className="mb-4">
                  <Badge className="bg-slate-700 text-slate-100">Tier 4</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">Continuous Accountability</h3>
                <p className="text-slate-300 mb-4">Ongoing governance. Version control. Renewal readiness. Full system.</p>
                
                <div className="text-3xl font-bold mb-1">$18,000/yr</div>
                <p className="text-sm text-slate-400 mb-6">Annual subscription</p>

                <div className="space-y-3 mb-6">
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
                    <span className="text-sm">Renewal Watch (change detection alerts)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Contract Vault (unlimited storage)</span>
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

                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                  Enable Continuous Governance
                </Button>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-slate-600">
                Not sure which tier fits your needs? <Link href="/contact" className="text-blue-600 hover:underline font-medium">Schedule a consultation</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Lifecycle-Based Product Structure */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Contract Lifecycle Coverage
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Contract X-Ray follows your contract through every stage—from procurement to renewal
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-6">
                {/* Pre-Signing Review */}
                <Card className="p-6 border-l-4 border-l-blue-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Pre-Signing Review</h3>
                      <p className="text-slate-600 mb-3">
                        Evaluate contract quality before commitment. Identify red flags. Benchmark against fiduciary standards.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Quick Screen</Badge>
                        <Badge variant="outline">Full Contract X-Ray</Badge>
                        <Badge variant="outline">Scorecard</Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Negotiation Improvement */}
                <Card className="p-6 border-l-4 border-l-green-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Negotiation Improvement</h3>
                      <p className="text-slate-600 mb-3">
                        Turn gaps into action items. Get model provisions. Build negotiation strategy. Track improvement.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Negotiation Guide</Badge>
                        <Badge variant="outline">Model Provisions</Badge>
                        <Badge variant="outline">Talking Points</Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Post-Redline Validation */}
                <Card className="p-6 border-l-4 border-l-amber-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Post-Redline Validation</h3>
                      <p className="text-slate-600 mb-3">
                        Compare original vs. negotiated terms. Quantify improvements. Verify PBM delivered on commitments.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Compare Report</Badge>
                        <Badge variant="outline">Negotiation Delta Memo</Badge>
                        <Badge variant="outline">Before-Signing Checklist</Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Ongoing Renewal Governance */}
                <Card className="p-6 border-l-4 border-l-purple-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Ongoing Renewal Governance</h3>
                      <p className="text-slate-600 mb-3">
                        Monitor contract drift. Track version history. Prepare renewal strategy. Maintain fiduciary compliance.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Renewal Watch</Badge>
                        <Badge variant="outline">Contract Vault</Badge>
                        <Badge variant="outline">Benchmark Drift Alerts</Badge>
                        <Badge variant="outline">Renewal Decision Briefs</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Named Product Modules */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Product Modules
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Each module solves a specific contract governance challenge
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Contract X-Ray Triage</h3>
                <p className="text-slate-600 text-sm">
                  Fast 10-question assessment. Know if deeper analysis is worth it. 48-hour turnaround.
                </p>
              </Card>

              <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Contract X-Ray Score</h3>
                <p className="text-slate-600 text-sm">
                  35 issues, 10 provisions, 0-100 score. Color-coded ratings. Board-ready executive dashboard.
                </p>
              </Card>

              <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Negotiation Studio</h3>
                <p className="text-slate-600 text-sm">
                  Gap analysis, model provisions, talking points, before-signing checklist. Strategy toolkit.
                </p>
              </Card>

              <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Contract X-Ray Compare</h3>
                <p className="text-slate-600 text-sm">
                  Side-by-side version analysis. Track improvements and regressions. Validate negotiation outcomes.
                </p>
              </Card>

              <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">PBM Accountability Index</h3>
                <p className="text-slate-600 text-sm">
                  Public PBM contract ratings. Market transparency. Competitive benchmarking. Procurement standard.
                </p>
              </Card>

              <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Contract Vault</h3>
                <p className="text-slate-600 text-sm">
                  Secure contract storage. Version timeline. Historical tracking. Institutional memory.
                </p>
              </Card>

              <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Renewal Watch</h3>
                <p className="text-slate-600 text-sm">
                  Change detection. Benchmark drift alerts. Automated monitoring. Renewal readiness tracking.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Board/CFO Executive Layer */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Executive Decision Layer
                </h2>
                <p className="text-xl text-slate-600">
                  Purpose-built outputs for board members, CFOs, and fiduciary committees
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    Board Snapshot
                  </h3>
                  <p className="text-slate-700 mb-4">
                    1-page executive brief. Overall contract score, key findings, fiduciary risk summary. 
                    What the board needs to know before approving a PBM contract.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Contract score (0-100)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Top 3 red flags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Fiduciary compliance status</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                    Fiduciary Risk Summary
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Provision-by-provision fiduciary risk analysis. Quantified exposure. 
                    Regulatory compliance gaps. What keeps general counsel up at night.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>CAA 2026 compliance gaps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>ERISA duty violations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Transparency requirements</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    Negotiation Delta Memo
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Before/after comparison. Score improvements. Gaps closed. 
                    Quantified negotiation outcomes for stakeholder reporting.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Score delta (+15 points)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Provisions improved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Outstanding gaps</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-600" />
                    Renewal Decision Brief
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Quarterly renewal readiness report. Contract drift tracking. 
                    Benchmark evolution. Strategic recommendations for upcoming renewal.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Renewal timeline (6-9-12 months)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Market benchmark changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Action items for next cycle</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Upsell Path Visualization */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Your Contract Governance Journey
                </h2>
                <p className="text-xl text-blue-100">
                  Most clients start with Quick Screen and expand within 90 days
                </p>
              </div>

              <div className="space-y-4">
                {/* Stage 1 */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Start: Quick Screen</h3>
                    <p className="text-blue-100 text-sm">
                      Fast triage. "Is this contract worth deeper analysis?" 
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-300 flex-shrink-0" />
                </div>

                {/* Stage 2 */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Expand: Full Contract X-Ray</h3>
                    <p className="text-blue-100 text-sm">
                      Complete scoring. Board presentation. Clause-level findings.
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-300 flex-shrink-0" />
                </div>

                {/* Stage 3 */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Negotiate: Negotiation OS</h3>
                    <p className="text-blue-100 text-sm">
                      Model provisions. Before/after comparison. Track negotiation progress.
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-300 flex-shrink-0" />
                </div>

                {/* Stage 4 */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Scale: Continuous Accountability</h3>
                    <p className="text-blue-100 text-sm">
                      Ongoing governance. Renewal readiness. Version control. Full system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-6 max-w-2xl mx-auto">
                  <p className="text-lg font-semibold mb-2">Typical Expansion Timeline</p>
                  <p className="text-blue-100">
                    Quick Screen → Full X-Ray (30 days) → Negotiation OS (60 days) → Continuous Accountability (12 months)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Architecture Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Why This Product Architecture Is Stronger
              </h2>

              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold mb-2">1. Clear Entry Point, Obvious Next Steps</h3>
                  <p className="text-slate-700">
                    Old model: "Submit contract, get reports." New model: "Start with Quick Screen ($1,500), 
                    see value immediately, expand when ready." Removes friction. Creates momentum.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-bold mb-2">2. Recurring Value, Not Just One-Time Analysis</h3>
                  <p className="text-slate-700">
                    Continuous Accountability tier creates subscription revenue. Contract Vault, Renewal Watch, 
                    and Benchmark Drift Alerts provide ongoing value beyond the initial report.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-6">
                  <h3 className="text-xl font-bold mb-2">3. Lifecycle Coverage = Strategic Positioning</h3>
                  <p className="text-slate-700">
                    Not just "analyze a contract." Cover pre-signing, negotiation, post-redline, and renewal. 
                    Becomes the contract governance system, not a point-in-time service.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-bold mb-2">4. Named Modules = Product Clarity</h3>
                  <p className="text-slate-700">
                    "Contract X-Ray Triage," "Negotiation Studio," "Renewal Watch" are product features people can talk about. 
                    "Quick Look Report" is a deliverable, not a system.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-bold mb-2">5. Executive Layer = Board Adoption</h3>
                  <p className="text-slate-700">
                    Board Snapshot, Fiduciary Risk Summary, Renewal Decision Briefs speak the language of governance. 
                    Makes Contract X-Ray a fiduciary protection tool, not just a compliance checklist.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-xl font-bold mb-2">6. Expansion Path = Revenue Growth</h3>
                  <p className="text-slate-700">
                    Tier 1 → Tier 2 → Tier 3 → Tier 4 progression creates predictable expansion revenue. 
                    Annual Continuous Accountability subscriptions build durable ARR.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to See What's in Your PBM Contract?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start with Quick Screen. Expand to full governance. Protect plan participants at every stage.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                Start with Quick Screen — $1,500
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Download Product Guide
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}