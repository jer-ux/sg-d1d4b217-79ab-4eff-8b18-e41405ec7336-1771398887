import { useState } from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  DollarSign, 
  FileSearch, 
  Scale, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
  FileText,
  Award,
  BarChart3
} from "lucide-react";

export default function ClaimsRecoveryIQ() {
  const [selectedTier, setSelectedTier] = useState<"certified" | "modeled" | "insufficient">("certified");

  return (
    <>
      <SEO
        title="Claims Recovery IQ™ - Forensic Recovery Engine | Kincaid IQ"
        description="Recover 1.22% of total claims spend through forensic line-level reconciliation. 90-day audit cycle with ERISA-compliant demand letters and three-tier evidence standards."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                Forensic Claims Intelligence
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
                  Claims Recovery IQ™
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                Forensic Recovery Engine for Self-Funded Health Plans
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                Recovering ERISA Plan Assets at Scale, Measured as a Percentage of Spend
              </p>

              {/* Key Metric */}
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
                <Card className="bg-emerald-500/10 border-emerald-500/30 p-6">
                  <div className="text-5xl font-bold text-emerald-400 mb-2">1.22%</div>
                  <div className="text-sm text-gray-300">of total claims spend recovered</div>
                  <div className="text-xs text-gray-400 mt-1">Fortune-20 scale validation</div>
                </Card>
                <Card className="bg-blue-500/10 border-blue-500/30 p-6">
                  <div className="text-5xl font-bold text-blue-400 mb-2">$14.84M</div>
                  <div className="text-sm text-gray-300">gross recovery identified</div>
                  <div className="text-xs text-gray-400 mt-1">$1.2B annual claims, 187k lives</div>
                </Card>
                <Card className="bg-cyan-500/10 border-cyan-500/30 p-6">
                  <div className="text-5xl font-bold text-cyan-400 mb-2">90</div>
                  <div className="text-sm text-gray-300">day forensic audit cycle</div>
                  <div className="text-xs text-gray-400 mt-1">engagement to recovery</div>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Request Forensic Assessment
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    Contact Recovery Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">The Structural Problem</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Self-funded plans pay their own claims through intermediaries who aren't the risk-bearers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-slate-800/50 border-red-500/30 p-8">
                <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Principal-Agent Problem</h3>
                <p className="text-gray-300 mb-4">
                  TPAs, PBMs, and carriers adjudicate claims but don't bear the cost of error. Their incentives are neutral to overpayment — or directly aligned with it.
                </p>
                <div className="text-sm text-red-300">Information asymmetry by design</div>
              </Card>

              <Card className="bg-slate-800/50 border-amber-500/30 p-8">
                <Scale className="w-12 h-12 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">ERISA Mandate</h3>
                <p className="text-gray-300 mb-4">
                  Plan sponsors are fiduciaries under ERISA §§403-406. Recovery isn't optional — it's a legal obligation. Failure to pursue is a potential breach.
                </p>
                <div className="text-sm text-amber-300">CAA 2021 §204, CAA 2024, NSA §2799B-5</div>
              </Card>

              <Card className="bg-slate-800/50 border-emerald-500/30 p-8">
                <DollarSign className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">The Stakes</h3>
                <p className="text-gray-300 mb-4">
                  Representative engagement: $542 PMPM vs $400 peer benchmark = 35.6% above. Not all recoverable, but the signal motivates forensic audit.
                </p>
                <div className="text-sm text-emerald-300">Measurable, persistent drag</div>
              </Card>
            </div>
          </div>
        </section>

        {/* The 90-Day Forensic Cycle */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">The 90-Day Forensic Cycle</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From engagement to statutory demand in five structured phases
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  phase: "Days 1-14",
                  title: "Engagement & Preservation",
                  description: "Contingency agreement, MNDA, agency authority, litigation hold to all custodians",
                  icon: FileText,
                  color: "blue"
                },
                {
                  phase: "Days 15-90",
                  title: "Forensic Audit",
                  description: "Line-level reconciliation against plan docs, vendor contracts, federal statute",
                  icon: FileSearch,
                  color: "purple"
                },
                {
                  phase: "Days 90-104",
                  title: "Formal Demand",
                  description: "Respondent-specific statutory demand letters with 30-day cure period",
                  icon: Scale,
                  color: "amber"
                },
                {
                  phase: "Days 104-180",
                  title: "Negotiation",
                  description: "Sponsor-authorized settlement, partial recovery doesn't waive unreleased claims",
                  icon: Target,
                  color: "cyan"
                },
                {
                  phase: "Upon Recovery",
                  title: "Distribution",
                  description: "Itemized accounting, 28% contingency within 15 days, net to plan trust",
                  icon: CheckCircle2,
                  color: "emerald"
                }
              ].map((item, idx) => (
                <Card key={idx} className={`bg-slate-800/50 border-${item.color}-500/30 p-6 relative`}>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-900 border-2 border-${item.color}-500 flex items-center justify-center text-sm font-bold text-${item.color}-400">
                    {idx + 1}
                  </div>
                  <item.icon className={`w-10 h-10 text-${item.color}-400 mb-4`} />
                  <div className={`text-xs font-mono text-${item.color}-400 mb-2`}>{item.phase}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recovery Categories */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">15+ Recovery Categories</h2>
              <p className="text-xl text-gray-300">
                Line-level detection across pharmacy, facility, carrier, and risk-transfer pathways
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: "PBM Spread Pricing", icon: TrendingUp, color: "rose" },
                { category: "Formulary Rebate Retention", icon: DollarSign, color: "amber" },
                { category: "Specialty Drug DIR Clawback", icon: AlertTriangle, color: "red" },
                { category: "Outlier DRG Payments", icon: BarChart3, color: "blue" },
                { category: "Facility Fee Unbundling", icon: FileSearch, color: "purple" },
                { category: "Dialysis Overpricing", icon: Target, color: "cyan" },
                { category: "Implant Pass-Through", icon: Award, color: "emerald" },
                { category: "Observation vs Admission", icon: Clock, color: "indigo" },
                { category: "Duplicate Claims", icon: FileText, color: "orange" },
                { category: "COB Errors", icon: AlertTriangle, color: "yellow" },
                { category: "Ineligible Dependents", icon: Shield, color: "green" },
                { category: "Stop-Loss Lasering", icon: Scale, color: "teal" },
                { category: "Air Ambulance CAA Gaps", icon: TrendingUp, color: "pink" },
                { category: "Out-of-Network Billed", icon: FileSearch, color: "violet" },
                { category: "Reference-Based-Pricing Arbitrage", icon: DollarSign, color: "fuchsia" }
              ].map((item, idx) => (
                <Card key={idx} className={`bg-slate-800/50 border-${item.color}-500/30 p-6 hover:bg-slate-800/80 transition-all duration-200 cursor-default`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-400 mb-3`} />
                  <h3 className="text-sm font-semibold text-white">{item.category}</h3>
                </Card>
              ))}
              <Card className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/40 p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">15+</div>
                  <div className="text-sm text-gray-300">Detection Categories</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Three-Tier Evidence Standard */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Three-Tier Evidence Standard</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every finding is assigned exactly one confidence tier — the discipline that keeps recovery defensible
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-12">
              <Button
                variant={selectedTier === "certified" ? "default" : "outline"}
                onClick={() => setSelectedTier("certified")}
                className={selectedTier === "certified" ? "bg-emerald-500" : "border-gray-600 text-gray-300"}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                CERTIFIED
              </Button>
              <Button
                variant={selectedTier === "modeled" ? "default" : "outline"}
                onClick={() => setSelectedTier("modeled")}
                className={selectedTier === "modeled" ? "bg-amber-500" : "border-gray-600 text-gray-300"}>
                <BarChart3 className="w-4 h-4 mr-2" />
                MODELED
              </Button>
              <Button
                variant={selectedTier === "insufficient" ? "default" : "outline"}
                onClick={() => setSelectedTier("insufficient")}
                className={selectedTier === "insufficient" ? "bg-red-500" : "border-gray-600 text-gray-300"}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                INSUFFICIENT
              </Button>
            </div>

            <div className="max-w-4xl mx-auto">
              {selectedTier === "certified" && (
                <Card className="bg-emerald-500/10 border-emerald-500/30 p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">CERTIFIED Evidence</h3>
                      <p className="text-lg text-gray-300 mb-4">
                        Contract clause + claim record + remittance, fully reconciled
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-emerald-500/20">
                        <div className="text-sm text-gray-300 space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>Contract rate schedule explicitly states $X per unit</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>Claim record shows $Y billed (Y &gt; X)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>Remittance advice confirms $Y paid to vendor</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>Overpayment = $(Y-X) per unit × quantity</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-emerald-300 font-semibold">
                        → Included in demand letter with full statutory basis
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {selectedTier === "modeled" && (
                <Card className="bg-amber-500/10 border-amber-500/30 p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <BarChart3 className="w-12 h-12 text-amber-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">MODELED Evidence</h3>
                      <p className="text-lg text-gray-300 mb-4">
                        Inference from incomplete evidence, with bounds disclosed
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-amber-500/20">
                        <div className="text-sm text-gray-300 space-y-2">
                          <div className="flex items-start gap-2">
                            <BarChart3 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <span>Partial data available (e.g. contract but no remittance detail)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <BarChart3 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <span>Statistical inference from pattern analysis</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <BarChart3 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <span>Low/high bounds disclosed in finding</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <BarChart3 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <span>Conservative assumptions documented</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-amber-300 font-semibold">
                        → Separate tier in demand letter, never masquerades as CERTIFIED
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {selectedTier === "insufficient" && (
                <Card className="bg-red-500/10 border-red-500/30 p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">INSUFFICIENT EVIDENCE</h3>
                      <p className="text-lg text-gray-300 mb-4">
                        No finding issued — logged as a gap, not a recovery claim
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/20">
                        <div className="text-sm text-gray-300 space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>Evidence too fragmentary to support a recovery claim</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>Conflicting or ambiguous contract language</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>Missing critical reconciliation components</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>Red-flagged for future investigation, not included in demand</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-red-300 font-semibold">
                        → Omitted from demand letter, preserved as audit finding only
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                <span className="text-emerald-400 font-semibold">A demand is only as strong as the tier behind it.</span> We never inflate MODELED findings to CERTIFIED, and INSUFFICIENT findings never reach the demand letter.
              </p>
            </div>
          </div>
        </section>

        {/* The Representative Result */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">The Representative Result</h2>
              <p className="text-xl text-gray-300">
                Fortune-20-scale validation engagement
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Engagement Profile</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300">Annual Claims</span>
                    <span className="text-white font-semibold">$1.2184 billion</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300">Covered Lives</span>
                    <span className="text-white font-semibold">187,400</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300">Audit Cycle</span>
                    <span className="text-white font-semibold">90 days</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300">Evidence Standard</span>
                    <span className="text-white font-semibold">Three-tier (C/M/I)</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Recovery Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-emerald-500/30">
                    <span className="text-gray-300">Gross Recovery Identified</span>
                    <span className="text-emerald-400 font-semibold">$14.84M (1.22%)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-emerald-500/30">
                    <span className="text-gray-300">High-Confidence (CERTIFIED)</span>
                    <span className="text-emerald-400 font-semibold">$9.28M (0.76%)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-amber-500/30">
                    <span className="text-gray-300">Contingency Fee (28%)</span>
                    <span className="text-amber-400 font-semibold">$4.16M</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b-2 border-emerald-500">
                    <span className="text-white font-semibold">Net Client Benefit</span>
                    <span className="text-emerald-400 font-bold text-xl">$10.68M (0.88%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/40 p-8">
                <h3 className="text-xl font-bold text-white mb-4">Performance Summary</h3>
                <p className="text-gray-300 leading-relaxed">
                  On a representative Fortune-20-scale engagement of <span className="text-white font-semibold">$1.2184 billion in annual claims</span> across <span className="text-white font-semibold">187,400 covered lives</span>, the Claims Recovery IQ™ engine identified a gross recovery opportunity of <span className="text-emerald-400 font-semibold">1.22% of spend ($14.84M)</span>, of which <span className="text-emerald-400 font-semibold">0.76% of spend ($9.28M)</span> was high-confidence CERTIFIED evidence, returning a net client benefit of <span className="text-emerald-400 font-bold">0.88% of spend ($10.68M)</span> after a 28% contingency fee.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Your Forensic Recovery Assessment
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Contact our recovery team to initiate a 90-day forensic audit cycle for your self-funded health plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Request Forensic Assessment
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Contact Recovery Team
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