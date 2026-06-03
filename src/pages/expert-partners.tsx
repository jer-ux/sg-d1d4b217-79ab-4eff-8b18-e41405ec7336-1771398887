import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Award, TrendingUp, Shield, Users, CheckCircle, Briefcase, BookOpen, Target, Brain, BarChart3, FileCheck, Scale } from "lucide-react";
import { InteractivePartnershipMap } from "@/components/InteractivePartnershipMap";

export default function ExpertPartnersPage() {
  return (
    <>
      <SEO
        title="Expert Actuaries & Consultants | Kincaid IQ Intelligence Series"
        description="Partner with the industry's most qualified actuaries and consultants. FSA, MAAA, ASA credentials. Deep expertise in health benefits, risk modeling, and fiduciary compliance."
        image="/og-image.png"
      />
      <Nav />

      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Industry-Leading Expertise</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Expert Actuaries & Consultants
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              We partner with the most qualified actuaries and consultants in the industry—bringing decades of specialized expertise, rigorous credentials, and proven results to every engagement.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                  Partner With Our Experts
                </Button>
              </Link>
              <Link href="/solutions/actuarial-benefits">
                <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg">
                  View Solutions
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Credentials Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Unmatched Credentials
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our partner network holds the highest professional designations and certifications in actuarial science and employee benefits consulting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 p-8">
                <Award className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-white">FSA / MAAA</h3>
                <p className="text-gray-300">
                  Fellow of the Society of Actuaries and Member of the American Academy of Actuaries—the gold standard in actuarial credentials.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 p-8">
                <Shield className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-white">ASA / FCA</h3>
                <p className="text-gray-300">
                  Associate of the Society of Actuaries and Fellow of the Conference of Consulting Actuaries—specialized health and pension expertise.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 border-pink-500/20 p-8">
                <Scale className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-white">CEBS / RHU</h3>
                <p className="text-gray-300">
                  Certified Employee Benefit Specialist and Registered Health Underwriter—deep benefits design and compliance knowledge.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Core Expertise Areas
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Specialized knowledge spanning every dimension of health benefits, risk management, and fiduciary compliance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800/50 border-gray-700/50 p-6 hover:border-purple-500/50 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Actuarial Valuation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <span>Premium rate development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <span>Reserve adequacy analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <span>Financial forecasting models</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 p-6 hover:border-cyan-500/50 transition-all duration-300">
                <BarChart3 className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Risk Management</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <span>Stop-loss optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <span>Catastrophic claim modeling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <span>Volatility analysis & hedging</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 p-6 hover:border-pink-500/50 transition-all duration-300">
                <Brain className="w-10 h-10 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Plan Design Strategy</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                    <span>Benefit optimization modeling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                    <span>Cost-sharing structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                    <span>Network steerage analytics</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 p-6 hover:border-emerald-500/50 transition-all duration-300">
                <FileCheck className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Regulatory Compliance</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>ERISA fiduciary standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>ACA & HIPAA compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>DOL audit preparation</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 p-6 hover:border-amber-500/50 transition-all duration-300">
                <Target className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">PBM Analytics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <span>Contract forensic analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <span>Drug pricing benchmarking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <span>Rebate verification audits</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 p-6 hover:border-rose-500/50 transition-all duration-300">
                <Briefcase className="w-10 h-10 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Executive Consulting</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>Board-level strategic guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>M&A benefits due diligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>CFO cost optimization roadmaps</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Partnership Map */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Our Partner Network
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore our nationwide network of credentialed actuaries and consultants across multiple regions and specialties.
              </p>
            </div>

            <InteractivePartnershipMap />
          </div>
        </section>

        {/* Why Our Partners Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Why Our Partners Stand Apart
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-purple-900/10 to-transparent border-purple-500/20 p-8">
                <Users className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Decades of Experience</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our partner network averages 20+ years of specialized experience in health benefits consulting, with deep relationships across payers, TPAs, and regulatory agencies. They've guided Fortune 500 clients through every market cycle and regulatory shift.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/10 to-transparent border-cyan-500/20 p-8">
                <BookOpen className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Thought Leadership</h3>
                <p className="text-gray-300 leading-relaxed">
                  Published authors, industry speakers, and peer-reviewed contributors. Our partners shape best practices through active involvement in professional societies, regulatory comment periods, and academic research.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-pink-900/10 to-transparent border-pink-500/20 p-8">
                <Target className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Precision & Rigor</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every analysis undergoes peer review by credentialed actuaries. We maintain the highest professional standards—ASOP compliance, documented methodologies, and transparent assumptions in every deliverable.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-900/10 to-transparent border-emerald-500/20 p-8">
                <Shield className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Fiduciary Accountability</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our partners operate under fiduciary duty, putting client interests first. Independent, conflict-free advice backed by professional liability coverage and adherence to the strictest ethical standards.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Track Record Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Proven Results
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
                <div className="text-5xl font-bold text-purple-400 mb-2">$2.3B+</div>
                <div className="text-gray-300">Savings Identified</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
                <div className="text-5xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-gray-300">Client Engagements</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
                <div className="text-5xl font-bold text-pink-400 mb-2">98%</div>
                <div className="text-gray-300">Client Satisfaction</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
                <div className="text-5xl font-bold text-emerald-400 mb-2">Zero</div>
                <div className="text-gray-300">Audit Failures</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 border border-purple-500/30 rounded-2xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Work With the Best?
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Connect with our expert partners to unlock strategic insights, mitigate risk, and drive measurable financial impact for your organization.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/kincaid-iq-intelligence-series">
                  <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 px-8 py-6 text-lg">
                    Explore Intelligence Series
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}