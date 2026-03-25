import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Shield, BarChart3, FileText, Users, Award } from "lucide-react";
import Link from "next/link";

export function PBMLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900">
            <Award className="h-4 w-4" />
            AI-Powered PBM Contract Intelligence
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900">
            Know What's In Your PBM Contract
            <span className="block text-blue-600">Before You Sign</span>
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-600">
            Independent, AI-powered analysis of pharmacy benefit manager contracts. 
            Score contracts 0-100 across 35 critical issues. Get executive-ready reports 
            and negotiation leverage in minutes.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/pbm/signup">
              <Button size="lg" className="gap-2">
                Start Free Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pbm/demo">
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            The Hidden Costs in PBM Contracts
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">Weak Audit Rights</h3>
              <p className="text-slate-600">
                87% of PBM contracts lack comprehensive audit provisions, leaving millions unverified
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">Hidden Spread Pricing</h3>
              <p className="text-slate-600">
                Unclear MAC pricing methodology costs employers an average of 15-25% in hidden margins
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">Rebate Opacity</h3>
              <p className="text-slate-600">
                73% of contracts lack explicit rebate pass-through language, costing employers millions annually
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            How It Works
          </h2>
          
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 font-semibold">Upload Contract</h3>
              <p className="text-sm text-slate-600">
                Securely upload your PBM contract PDF
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 font-semibold">AI Analysis</h3>
              <p className="text-sm text-slate-600">
                AI evaluates 35 issues across 10 key provisions
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 font-semibold">Get Reports</h3>
              <p className="text-sm text-slate-600">
                Receive executive-ready scorecards and guides
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                4
              </div>
              <h3 className="mb-2 font-semibold">Negotiate</h3>
              <p className="text-sm text-slate-600">
                Use model language and talking points to improve terms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outputs Section */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Executive-Ready Outputs
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="mb-3 text-xl font-semibold">Quick Look Report</h3>
              <p className="mb-4 text-slate-600">
                One-page triage assessment showing Good, Concern, or Red Flag status for each key provision
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Executive summary and recommendation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Designed for C-suite and board review
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 text-xl font-semibold">Detailed Scorecard</h3>
              <p className="mb-4 text-slate-600">
                Comprehensive 0-100 score with provision-by-provision breakdown and rating bands
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Color-coded risk indicators
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Key findings and evidence
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 text-xl font-semibold">Negotiation Guide</h3>
              <p className="mb-4 text-slate-600">
                Actionable recommendations with model language, talking points, and before-signing checklist
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Issue-by-issue improvement roadmap
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Negotiation strategy and priorities
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 text-xl font-semibold">Comparison Report</h3>
              <p className="mb-4 text-slate-600">
                Side-by-side analysis showing improvements, regressions, and remaining gaps between contract versions
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Score delta and trend analysis
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  Procurement validation support
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Built For
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 font-semibold">Employers & CFOs</h3>
              <p className="text-sm text-slate-600">
                Know what you're signing. Protect your bottom line with evidence-based contract analysis
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Shield className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 font-semibold">Benefits Consultants</h3>
              <p className="text-sm text-slate-600">
                Add premium contract review to your service offering. Demonstrate value with data
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 font-semibold">Plan Fiduciaries</h3>
              <p className="text-sm text-slate-600">
                Meet ERISA prudence standards with documented contract evaluation and oversight
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="px-6 py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Independent. Evidence-Based. Employer-First.
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            We don't sell PBM services. We don't take rebates. We don't have carrier relationships. 
            Our only mission is helping employers understand and improve their contracts using 
            explicit language analysis and industry best practices.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="mb-2 text-3xl font-bold text-blue-400">35</div>
              <div className="text-sm text-slate-400">Critical Issues Analyzed</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-blue-400">10</div>
              <div className="text-sm text-slate-400">Key Provision Categories</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-blue-400">0-100</div>
              <div className="text-sm text-slate-400">Transparent Scoring Scale</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-4xl font-bold text-slate-900">
            Ready to Analyze Your Contract?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Join employers, brokers, and fiduciaries using AI-powered contract intelligence 
            to negotiate better PBM terms
          </p>
          <Link href="/pbm/signup">
            <Button size="lg" className="gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}