import Link from "next/link";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Database, 
  Map, 
  Target, 
  TrendingUp, 
  Users, 
  Building2,
  ChevronRight,
  CheckCircle2,
  Shield,
  FileText,
  BarChart3,
  Zap,
  Globe,
  AlertCircle
} from "lucide-react";

export default function SalesIQ() {
  return (
    <>
      <SEO
        title="Sales IQ™ - Sales Intelligence Platform | Kincaid IQ"
        description="Win on proprietary intelligence, not contact volume. 14+ data sources, 50-state regulatory map, SBI™ opacity scoring, and recoverable capital modeling for the self-funded benefits market."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                Sales Intelligence Platform
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Sales IQ™
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                Winning the Self-Funded Benefits Market with Proprietary Intelligence
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                Win on regulatory-grade intelligence, not contact volume
              </p>

              {/* Key Metrics */}
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
                <Card className="bg-blue-500/10 border-blue-500/30 p-6">
                  <div className="text-5xl font-bold text-blue-400 mb-2">14+</div>
                  <div className="text-sm text-gray-300">data providers integrated</div>
                  <div className="text-xs text-gray-400 mt-1">parallel enrichment engine</div>
                </Card>
                <Card className="bg-purple-500/10 border-purple-500/30 p-6">
                  <div className="text-5xl font-bold text-purple-400 mb-2">191k+</div>
                  <div className="text-sm text-gray-300">employer prospects</div>
                  <div className="text-xs text-gray-400 mt-1">DOL EFAST2 powered</div>
                </Card>
                <Card className="bg-cyan-500/10 border-cyan-500/30 p-6">
                  <div className="text-5xl font-bold text-cyan-400 mb-2">50</div>
                  <div className="text-sm text-gray-300">state regulatory map</div>
                  <div className="text-xs text-gray-400 mt-1">PBM & broker compliance</div>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                    Request Platform Demo
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    Contact Sales Intelligence Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Strategic Thesis */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">The Strategic Thesis</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                The durable competitive advantage is proprietary intelligence about the buyer's own plan that the buyer doesn't have about itself
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-slate-800/50 border-red-500/30 p-8">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">The Market Problem</h3>
                <p className="text-gray-300 mb-4">
                  Self-funded benefits sale is asymmetric information by design. The employer-fiduciary pays but is the least-informed party. Broker and PBM are best-informed and compensated in invisible ways.
                </p>
                <p className="text-sm text-red-300">
                  Generic sales tools (ZoomInfo, Apollo) tell you <span className="font-semibold">who to call</span> — they do nothing to close the asymmetry.
                </p>
              </Card>

              <Card className="bg-slate-800/50 border-emerald-500/30 p-8">
                <Target className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">The Sales IQ Bet</h3>
                <p className="text-gray-300 mb-4">
                  A seller who opens by quoting the prospect's own Form 5500 broker-comp ratio, PBM spread exposure, and recoverable capital is selling from a position no contact database can match.
                </p>
                <p className="text-sm text-emerald-300">
                  <span className="font-semibold">Find → Frame → Engage</span> differentiated by regulatory and actuarial depth, not data volume.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* The Three Modules */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Three Vertically Integrated Modules</h2>
              <p className="text-xl text-gray-300">
                The complete go-to-market engine for self-funded benefits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Module 1: Account Intel Hub */}
              <Card className="bg-gradient-to-b from-blue-500/10 to-slate-800/50 border-blue-500/30 p-8 hover:border-blue-500/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-10 h-10 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">Account Intel Hub</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  The Enrichment Layer — parallel lookup across 14+ data providers into one 360° dossier
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Unified Search by domain or company name</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Contact Discovery (HR, Benefits, CFO) with verified emails</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Technographic Stack (Workday, Paylocity via BuiltWith)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Buying Signals (funding, hiring, intent)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Intel Stack Ranking (meta-score on data providers)</span>
                  </div>
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  FIND
                </Badge>
              </Card>

              {/* Module 2: Sales IQ Console */}
              <Card className="bg-gradient-to-b from-purple-500/10 to-slate-800/50 border-purple-500/30 p-8 hover:border-purple-500/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Map className="w-10 h-10 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">Sales IQ Console</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  The Regulatory Framing Layer — 50-state map of PBM and broker-compensation reform
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Interactive Regulatory Map (color-coded by priority)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">State Intelligence Panel (spread, rebate, broker-comp rules)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Market Norms (spread vs pass-through prevalence)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">AI Sales Angle Generator (email subjects, LinkedIn openers)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Compliance Alerts Feed (high-severity risks)</span>
                  </div>
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  FRAME
                </Badge>
              </Card>

              {/* Module 3: Sales OS */}
              <Card className="bg-gradient-to-b from-cyan-500/10 to-slate-800/50 border-cyan-500/30 p-8 hover:border-cyan-500/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-10 h-10 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Sales OS</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  The Pre-Call Intelligence Engine — federal filings → evidence-based briefings
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">National Prospect Explorer (191k+ employers, DuckDB)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Shady Broker Index™ (0-100 opacity score)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Recoverable Capital Estimator (PBM spread, rebate, medical)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Pre-Call Briefings (one-page dossiers)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">AI Call Opener (35-word evidence-anchored intro)</span>
                  </div>
                </div>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  ENGAGE
                </Badge>
              </Card>
            </div>
          </div>
        </section>

        {/* The Moat - What Others Don't Have */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">The Strategic Moat</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Five capabilities absent across the entire horizontal competitive set
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-slate-800/50 border-emerald-500/30 p-8">
                <Shield className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Form 5500 / DOL Plan Data</h3>
                <p className="text-sm text-gray-300">
                  191k+ employers, DuckDB-powered, with broker-comp ratios, PBM spend, stop-loss attachment — no ZoomInfo or Apollo has this.
                </p>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30 p-8">
                <Map className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">50-State Regulatory Map</h3>
                <p className="text-sm text-gray-300">
                  PBM/broker transparency laws by state, priority tiers, compliance strictness — the "why now, why here" of the pitch.
                </p>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30 p-8">
                <Target className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Proprietary Opacity Score</h3>
                <p className="text-sm text-gray-300">
                  SBI™ (Shady Broker Index) 0-100 score: Opacity × 0.30 + Renewal-Bias × 0.25 + Rebate-Distortion × 0.25 + Spread-Linkage × 0.20
                </p>
              </Card>

              <Card className="bg-slate-800/50 border-blue-500/30 p-8">
                <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Recoverable Capital Model</h3>
                <p className="text-sm text-gray-300">
                  MODELED low/high: (Rx × 0.30 × 0.12) rebate + (Rx × 0.08 × 0.30) biosimilar + (Medical × 0.035) mismanagement
                </p>
              </Card>

              <Card className="bg-slate-800/50 border-amber-500/30 p-8">
                <FileText className="w-12 h-12 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">AI Call-Opener from Filings</h3>
                <p className="text-sm text-gray-300">
                  "I noticed your UHC plan has a 6.8% broker-comp rate..." — 35 words, evidence-anchored, from their own Form 5500.
                </p>
              </Card>

              <Card className="bg-slate-800/50 border-rose-500/30 p-8">
                <Zap className="w-12 h-12 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Evidence-Tiered Outputs</h3>
                <p className="text-sm text-gray-300">
                  CERTIFIED / MODELED / INSUFFICIENT_EVIDENCE discipline inherited from platform doctrine — every claim is defensible.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Data Providers */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">14+ Data Provider Integrations</h2>
              <p className="text-xl text-gray-300">
                Parallel enrichment with provider-quality meta-ranking
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-blue-500/30 p-6">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Firmographic</h3>
                <p className="text-sm text-gray-300">Apollo, Clearbit, D&B Direct+, HubSpot, Salesforce</p>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30 p-6">
                <Building2 className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Technographic</h3>
                <p className="text-sm text-gray-300">BuiltWith, Wappalyzer, TheirStack (50k+ categories)</p>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30 p-6">
                <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Intent Signals</h3>
                <p className="text-sm text-gray-300">Crunchbase, Bombora, ZoomInfo</p>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/40 p-6 md:col-span-3">
                <Globe className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Federal Data Sources</h3>
                <p className="text-sm text-gray-300">DOL EFAST2 (Form 5500), SEC EDGAR, SAM.gov, CMS, IRS 990, BLS QCEW</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Go-to-Market Positioning */}
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">The Wedge: Broker Displacement</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                SBI™ identifies incumbents with high opacity (>70 "RED"), recoverable capital quantifies the prize, AI opener weaponizes their own filing
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/30 p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">1</div>
                <h3 className="text-lg font-bold text-white mb-2">Identify</h3>
                <p className="text-sm text-gray-300">Sales OS surfaces prospects with SBI™ > 70 (RED opacity)</p>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30 p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
                <h3 className="text-lg font-bold text-white mb-2">Quantify</h3>
                <p className="text-sm text-gray-300">Recoverable Capital Model prices the opportunity in dollars</p>
              </Card>

              <Card className="bg-slate-800/50 border-blue-500/30 p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
                <h3 className="text-lg font-bold text-white mb-2">Open</h3>
                <p className="text-sm text-gray-300">AI Call-Opener from their own Form 5500 filing</p>
              </Card>

              <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">4</div>
                <h3 className="text-lg font-bold text-white mb-2">Expand</h3>
                <p className="text-sm text-gray-300">Account Intel Hub + Sales IQ Console for ongoing relationship</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Win on Intelligence, Not Volume
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Request a platform demo to see how Sales IQ™ arms your team with the asymmetric intelligence that closes deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                  Request Platform Demo
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Contact Sales Intelligence Team
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