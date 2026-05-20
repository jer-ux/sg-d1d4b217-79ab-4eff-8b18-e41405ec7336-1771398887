import Head from "next/head";
import Link from "next/link";
import { Users, Briefcase, TrendingUp, Shield, Award, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BrokerPage() {
  return (
    <>
      <Head>
        <title>For Brokers & Consultants: White-Label PBM Intelligence | Kincaid IQ</title>
        <meta
          name="description"
          content="Differentiate your practice with Kincaid IQ's white-label Contract X-Ray. Win more RFPs, protect client relationships, and earn referral commissions."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-black" />
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full mb-6">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">For Brokers & Consultants</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Stop Losing Clients to PBM Bait & Switch
            </h1>
            
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Your clients sign the PBM contract you recommended. Two years later, they discover hidden fees you didn't catch. Now they're shopping for a new broker.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Kincaid IQ's white-label Contract X-Ray makes you the broker who protects clients from PBM tricks — before they happen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 w-full sm:w-auto">
                  Partner Program Details
                </Button>
              </Link>
              <Link href="/tools/contract-health-check">
                <Button size="lg" variant="outline" className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 w-full sm:w-auto">
                  Demo the Tool
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The Broker's Dilemma */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Brokers Partner with Kincaid IQ</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-amber-500/30 p-6">
                <Award className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Win More RFPs</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Include Contract X-Ray analysis in your RFP response. Show prospects exactly where their current PBM is overcharging — before they even ask.
                </p>
                <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded p-2">
                  "The X-Ray report closed the deal. CFO said no other broker had shown them that level of detail." — Benefits consultant, TX
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-amber-500/30 p-6">
                <Shield className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Protect Client Relationships</h3>
                <p className="text-gray-400 text-sm mb-4">
                  PBMs promise savings, then raise costs year 2-3. With X-Ray, you catch the bait & switch before renewal — and prove your value.
                </p>
                <div className="text-xs text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded p-2">
                  Clients stay with brokers who protect them, not brokers who react after the damage is done.
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-amber-500/30 p-6">
                <TrendingUp className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Referral Revenue</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Earn 20% recurring commission on every Contract X-Ray engagement. Average engagement: $15K. Average client lifetime: 5 years.
                </p>
                <div className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-2">
                  10 referrals = $30K annual passive income while strengthening client relationships
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* White-Label Solution */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">White-Label Contract X-Ray</h2>
            <p className="text-center text-gray-400 mb-12">Your brand. Your client relationship. Our intelligence.</p>

            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-amber-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 rounded-full p-3 flex-shrink-0">
                    <Users className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Co-Branded Reports</h3>
                    <p className="text-gray-400 mb-4">
                      Every Contract X-Ray report carries your firm's branding. To the client, this is YOUR service — powered by Kincaid IQ's intelligence engine.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-300">
                        ✓ Your logo on every page<br/>
                        ✓ Custom cover letter template<br/>
                        ✓ Your contact info for follow-up<br/>
                        ✓ Branded presentation deck included
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-amber-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">48-Hour Turnaround</h3>
                    <p className="text-gray-400 mb-4">
                      Submit the client's PBM contract + claims data. Get back a complete 50+ page forensic analysis in 48 hours. Present to client within a week of their request.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-2xl font-bold text-blue-400">2 days</div>
                        <div className="text-xs text-gray-400">Analysis turnaround</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-2xl font-bold text-blue-400">5 days</div>
                        <div className="text-xs text-gray-400">Total to client delivery</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-2xl font-bold text-emerald-400">15+</div>
                        <div className="text-xs text-gray-400">Red flags identified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-amber-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/20 rounded-full p-3 flex-shrink-0">
                    <Award className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Sales Support Included</h3>
                    <p className="text-gray-400 mb-4">
                      We train your team on Contract X-Ray. Provide presentation templates, objection handling guides, and can join client presentations if needed.
                    </p>
                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="text-sm text-amber-300">
                        "Kincaid IQ joined our finalist presentation. Their technical depth closed a $800K account. They stayed in the background — we got 100% of the credit."
                      </div>
                      <div className="text-xs text-gray-500 mt-2">— Regional VP, National Benefits Firm</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Partner Commission Structure</h2>
            <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-5xl font-bold text-amber-400 mb-2">20%</div>
                  <div className="text-sm text-gray-400 mb-4">Recurring commission on all X-Ray engagements</div>
                  <div className="text-xs text-gray-500">Paid quarterly, as long as client remains active</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-emerald-400 mb-2">$30K</div>
                  <div className="text-sm text-gray-400 mb-4">Average annual revenue from 10 referrals</div>
                  <div className="text-xs text-gray-500">Based on $15K average engagement × 10 clients</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-3">Example: Mid-Market Employer</h4>
                <div className="text-left space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Initial X-Ray Engagement:</span>
                    <span className="text-white font-semibold">$15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your 20% Commission:</span>
                    <span className="text-amber-400 font-bold">$3,000</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                    <span>Annual Claims Monitoring (Years 2-5):</span>
                    <span className="text-white font-semibold">$8,000/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Annual Recurring:</span>
                    <span className="text-amber-400 font-bold">$1,600/year</span>
                  </div>
                  <div className="flex justify-between border-t border-amber-500/30 pt-2 mt-2 text-base">
                    <span className="text-amber-300 font-semibold">5-Year Client Value:</span>
                    <span className="text-emerald-400 font-bold text-xl">$9,400</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Become a Kincaid IQ Partner</h2>
            <p className="text-xl text-gray-400 mb-8">
              No upfront costs. No minimum commitments. Just better tools to serve your clients and grow your book.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 w-full sm:w-auto">
                  Apply for Partner Program
                </Button>
              </Link>
              <Link href="/tools/contract-health-check">
                <Button size="lg" variant="outline" className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 w-full sm:w-auto">
                  Try the Demo Tool
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Limited to 50 partner firms nationwide • Priority given to regional and national practices
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}