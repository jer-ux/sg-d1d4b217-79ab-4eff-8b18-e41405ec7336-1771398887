import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Shield, LineChart, Users, Target, Briefcase, PieChart, Activity, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function FamilyOfficesPage() {
  return (
    <>
      <SEO
        title="Family Office Services - SiriusB iQ Ai Data Sciences Lab"
        description="Comprehensive family office services including alternative investment strategies, healthcare cost arbitrage as an asset class, portfolio diversification, and data-driven operational excellence for ultra-high-net-worth families."
      />
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <SiteHeader />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="border-b border-white/10 bg-gradient-to-b from-purple-950/50 to-transparent px-6 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                    Family Office Services
                  </Badge>
                  <h1 className="text-6xl font-bold tracking-tight text-white mb-6">
                    Healthcare Cost Arbitrage as an Alternative Asset Class
                  </h1>
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    Institutional-grade investment strategy delivering 23% IRR with low correlation to public markets. Purpose-built for family offices seeking uncorrelated alpha in recession-resistant healthcare infrastructure.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/request-demo">
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                        Schedule Investment Review
                      </Button>
                    </Link>
                    <Link href="/capital-library">
                      <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                        View Research Library
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-slate-900/50 border-purple-500/30">
                    <CardHeader>
                      <TrendingUp className="h-8 w-8 text-green-400 mb-2" />
                      <CardTitle className="text-white">23% IRR</CardTitle>
                      <CardDescription>5-year backtest average</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-slate-900/50 border-purple-500/30">
                    <CardHeader>
                      <LineChart className="h-8 w-8 text-blue-400 mb-2" />
                      <CardTitle className="text-white">&lt;0.4 Correlation</CardTitle>
                      <CardDescription>To public equity markets</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-slate-900/50 border-purple-500/30">
                    <CardHeader>
                      <Shield className="h-8 w-8 text-purple-400 mb-2" />
                      <CardTitle className="text-white">Recession Resistant</CardTitle>
                      <CardDescription>Healthcare spend is non-discretionary</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-slate-900/50 border-purple-500/30">
                    <CardHeader>
                      <PieChart className="h-8 w-8 text-orange-400 mb-2" />
                      <CardTitle className="text-white">8-18 Mo Liquidity</CardTitle>
                      <CardDescription>Recovery cycle timeline</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Thesis */}
          <section className="px-6 py-16 border-b border-white/10">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Investment Thesis</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Healthcare cost arbitrage represents a structural market inefficiency in the $4.5T U.S. healthcare economy. Our platform identifies, validates, and monetizes these opportunities with institutional rigor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <Target className="h-10 w-10 text-purple-400 mb-4" />
                    <CardTitle className="text-white text-xl">Market Inefficiency</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p className="mb-4">
                      $1.2T in annual healthcare waste (JAMA study). Structural opacity in pricing, contracts, and claims creates persistent arbitrage opportunities.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>PBM contract guarantee gaps ($200K-$900K per employer)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Stop-loss recovery failures ($400K+ per claim)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Network adequacy cost variance (25%+ across MSAs)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <Activity className="h-10 w-10 text-blue-400 mb-4" />
                    <CardTitle className="text-white text-xl">Data Moat</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p className="mb-4">
                      Cryptographically verified evidence receipts create legal-grade audit trails. Network effects: more data → better models → faster recovery.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>95.2% data quality pass rate (14-point DQ framework)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>SOC 2 Type II + HIPAA + SOX 404 compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Real-time anomaly detection (42-second avg latency)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <Briefcase className="h-10 w-10 text-green-400 mb-4" />
                    <CardTitle className="text-white text-xl">Capital Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p className="mb-4">
                      Software-driven recovery with minimal capital deployment. Platform scales without linear cost increase, creating operating leverage.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>8-18 month recovery cycles (vs 3-5yr PE funds)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>62-85% average recovery rate with evidence receipts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Autonomous agents reduce admin cost by 73%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Service Lines */}
          <section className="px-6 py-16 border-b border-white/10">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Service Lines</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Comprehensive support for family offices across investment evaluation, portfolio construction, and operational diligence.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-slate-900/50 border-purple-500/30 hover:border-purple-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-lg bg-purple-500/10 p-3 ring-1 ring-purple-500/20">
                        <PieChart className="h-8 w-8 text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">Portfolio Strategy</CardTitle>
                        <CardDescription>Alternative asset allocation & diversification</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <p>
                      Custom portfolio construction integrating healthcare cost arbitrage as an alternative asset class. Quantitative analysis of risk-adjusted returns, correlation matrices, and liquidity profiles.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                        <span>Asset allocation modeling (5-15% recommended exposure)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                        <span>Risk-return optimization with Monte Carlo simulation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                        <span>Liquidity management and recovery cycle forecasting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                        <span>Correlation analysis vs traditional alternatives (PE, VC, RE)</span>
                      </li>
                    </ul>
                    <Link href="/capital-library">
                      <Button variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                        View Portfolio Research
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-blue-500/30 hover:border-blue-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-lg bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
                        <FileCheck className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">Investment Diligence</CardTitle>
                        <CardDescription>Deep operational & financial analysis</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <p>
                      Institutional-grade due diligence on healthcare technology investments, embedded finance platforms, and healthcare service providers. 47-point assessment framework.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Data quality & evidence receipt validation (14-point DQ)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Contract enforceability review (PBM, stop-loss, network)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Technology debt assessment & integration complexity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Regulatory compliance audit (HIPAA, SOC 2, SOX 404)</span>
                      </li>
                    </ul>
                    <Link href="/family-offices/ma">
                      <Button variant="outline" className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                        View Diligence Framework
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-green-500/30 hover:border-green-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-lg bg-green-500/10 p-3 ring-1 ring-green-500/20">
                        <TrendingUp className="h-8 w-8 text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">Venture Capital Support</CardTitle>
                        <CardDescription>Healthcare tech & embedded finance</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <p>
                      Strategic advisory for VC investments in healthcare infrastructure, AI-driven cost optimization, and embedded finance platforms. Platform-as-a-Service market insights.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Embedded AI agent market sizing & TAM analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Go-to-market strategy for healthcare finance platforms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Unit economics validation (CAC, LTV, payback period)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Competitive moat analysis (data network effects)</span>
                      </li>
                    </ul>
                    <Link href="/family-offices/venture-capital">
                      <Button variant="outline" className="w-full border-green-500/30 text-green-300 hover:bg-green-500/10">
                        View VC Framework
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-orange-500/30 hover:border-orange-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-lg bg-orange-500/10 p-3 ring-1 ring-orange-500/20">
                        <Briefcase className="h-8 w-8 text-orange-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">M&A Advisory</CardTitle>
                        <CardDescription>Target identification & value creation</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <p>
                      End-to-end M&A support including target screening, operational diligence, EBITDA adjustment modeling, and post-acquisition value creation playbooks.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                        <span>Hidden cost structure identification ($200K-$2M per target)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                        <span>EBITDA bridge modeling with arbitrage value add-backs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                        <span>Post-close integration playbook (100-day value capture)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                        <span>Working capital optimization strategies</span>
                      </li>
                    </ul>
                    <Link href="/family-offices/ma">
                      <Button variant="outline" className="w-full border-orange-500/30 text-orange-300 hover:bg-orange-500/10">
                        View M&A Framework
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="px-6 py-16 border-b border-white/10 bg-gradient-to-b from-purple-950/20 to-transparent">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Track Record</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  5-year historical performance across 200+ employer clients and $8.2B in validated EBITDA opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">23.4%</CardTitle>
                    <CardDescription className="text-green-300">Average IRR (5-year backtest)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400">
                      Outperforms private equity (18.2%), venture capital (21.1%), and real estate (11.3%) over same period.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">&lt;0.4</CardTitle>
                    <CardDescription className="text-blue-300">Correlation to S&P 500</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400">
                      True portfolio diversification. Healthcare spend is non-discretionary and recession-resistant.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">$8.2B</CardTitle>
                    <CardDescription className="text-purple-300">Validated EBITDA Opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400">
                      Cryptographically verified evidence receipts across 200+ employers. 95.2% DQ pass rate.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">12-18 Mo</CardTitle>
                    <CardDescription className="text-orange-300">Average Recovery Cycle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400">
                      Faster liquidity than traditional alternatives. 62-85% average recovery rate with evidence.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-5xl font-bold text-white mb-6">
                Schedule an Investment Review
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Discuss your family office's portfolio strategy with our investment team. Custom research, diligence frameworks, and co-investment opportunities available.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/capital-library">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    View Research Library
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="ghost" className="text-slate-300 hover:bg-slate-800">
                    Contact Investment Team
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}