import Head from "next/head";
import Link from "next/link";
import { Check, X, Zap, Building2, Briefcase, TrendingUp, Shield } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing - SiriusB iQ AI Data Sciences Lab</title>
        <meta
          name="description"
          content="Transparent pricing for PBM contract forensic analysis. One-time engagement or ongoing monitoring. No hidden fees."
        />
      </Head>

      <SEO
        title="Kincaid Health Pricing - Transparent, Fiduciary-First Healthcare Intelligence"
        description="Enterprise pricing for continuous forensic intelligence. No hidden fees, no commission conflicts. Pay for protection, not PBM profits."
      />

      <Nav />

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
          <div className="relative max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Transparent Pricing
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              No hidden fees. No surprise charges. Just straightforward pricing for PBM contract forensic analysis.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contract X-Ray */}
              <Card className="bg-gray-900/50 border-purple-500/30 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500/20 rounded-full p-3">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Rx PBM Defense Contract X-Ray</h3>
                    <p className="text-sm text-gray-400">One-time forensic analysis</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-white">$58K</span>
                  </div>
                  <p className="text-sm text-gray-400">Complete 15-provision contract analysis</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Complete 15-provision contract analysis</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">50+ page forensic report with red flags</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Savings quantification ($XXK identified)</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Recommended fix language for each gap</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">48-hour turnaround</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Executive presentation deck</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-500">Ongoing claims monitoring</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-500">Real-time alerts</div>
                  </div>
                </div>

                <Link href="/request-demo" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Get Started
                  </Button>
                </Link>
              </Card>

              {/* Active Monitoring */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50 p-8 relative">
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500/20 rounded-full p-3">
                    <Building2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Monthly Monitoring & RFP Navigation</h3>
                    <p className="text-sm text-gray-400">Ongoing protection + RFP support</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-gray-400 text-lg">Starting at</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-white">$3K</span>
                    <span className="text-gray-400">/ month</span>
                  </div>
                  <p className="text-sm text-gray-400">After initial Contract X-Ray engagement</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Everything in Contract X-Ray</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Monthly claims data validation</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Real-time alert when contract violations occur</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Quarterly savings reports</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Renewal analysis & recommendations</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">RFP support & vendor comparison</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">PBM RFP navigation & strategy</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Access to Kincaid IQ platform</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Dedicated success manager</div>
                  </div>
                </div>

                <Link href="/request-demo" className="block">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Get Started
                  </Button>
                </Link>
              </Card>

              {/* White-Label Partner */}
              <Card className="bg-gray-900/50 border-amber-500/30 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-500/20 rounded-full p-3">
                    <Briefcase className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Partner Program</h3>
                    <p className="text-sm text-gray-400">For brokers & consultants</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-white">0%</span>
                    <span className="text-gray-400">commission</span>
                  </div>
                  <p className="text-sm text-amber-400 font-medium">Until Kincaid IQ Broker Training is complete</p>
                  <p className="text-xs text-gray-500 mt-1">Then 30% recurring on all referrals</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Complete Kincaid IQ Broker Training required</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">White-label co-branded reports</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Your logo, your client relationship</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">48-hour turnaround for all engagements</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">Sales training & presentation templates</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">We can join client presentations</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">$17.4K commission per X-Ray engagement (30% of $58K)</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">$900/month recurring per client (30% of $3K)</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">No upfront costs or minimums</div>
                  </div>
                </div>

                <Link href="/personas/broker" className="block">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    Learn More
                  </Button>
                </Link>
              </Card>

              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-red-400" />
                  <h3 className="text-2xl font-bold text-white">PBM Contract Clarity 360*</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Statement */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Typical ROI</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-purple-500/30 p-6">
                <div className="text-4xl font-bold text-emerald-400 mb-2">8-15x</div>
                <div className="text-sm text-gray-400">Return on X-Ray investment</div>
                <div className="text-xs text-gray-500 mt-2">Based on identified contract gaps</div>
              </Card>
              <Card className="bg-gray-900/50 border-purple-500/30 p-6">
                <div className="text-4xl font-bold text-blue-400 mb-2">$3.6M</div>
                <div className="text-sm text-gray-400">Average savings identified</div>
                <div className="text-xs text-gray-500 mt-2">Per 500-employee plan</div>
              </Card>
              <Card className="bg-gray-900/50 border-purple-500/30 p-6">
                <div className="text-4xl font-bold text-purple-400 mb-2">48hrs</div>
                <div className="text-sm text-gray-400">Typical turnaround time</div>
                <div className="text-xs text-gray-500 mt-2">From contract submission to report</div>
              </Card>
            </div>
            <p className="text-gray-400">
              All engagements include our standard guarantee: If we don't identify savings opportunities worth at least 5x our fee, we'll refund 100% of your payment.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Uncover Your PBM Contract Gaps?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Get a free 3-red-flag analysis within 48 hours. No cost, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full sm:w-auto">
                  Request Free Contract Review
                </Button>
              </Link>
              <Link href="/tools/contract-health-check">
                <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 w-full sm:w-auto">
                  Try Self-Service Tool
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}