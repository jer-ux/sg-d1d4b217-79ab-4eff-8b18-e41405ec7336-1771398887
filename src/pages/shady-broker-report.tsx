import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingDown, AlertCircle, CheckCircle2, FileText, ExternalLink, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";

type ConfidenceTier = "CERTIFIED" | "MODELED" | "INSUFFICIENT_EVIDENCE";

interface SBIComponent {
  name: string;
  weight: number;
  score: number;
  confidence: ConfidenceTier;
  evidenceCount: number;
  dollarImpact: number;
}

interface SBIData {
  compositeScore: number;
  colorBand: "GREEN" | "AMBER" | "RED";
  ebitdaDrag: number;
  components: SBIComponent[];
  planYear: string;
  planName: string;
  lives: number;
}

export default function ShadyBrokerReport() {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  const mockSBIData: SBIData = {
    compositeScore: 82,
    colorBand: "RED",
    ebitdaDrag: 2847000,
    planYear: "2024",
    planName: "Midwest Manufacturing Health Plan",
    lives: 1847,
    components: [
      {
        name: "Opacity Ratio",
        weight: 0.30,
        score: 0.73,
        confidence: "MODELED",
        evidenceCount: 12,
        dollarImpact: 487000
      },
      {
        name: "Renewal Incentive Bias",
        weight: 0.25,
        score: 1.42,
        confidence: "CERTIFIED",
        evidenceCount: 8,
        dollarImpact: 892000
      },
      {
        name: "Rebate Distortion",
        weight: 0.25,
        score: 0.88,
        confidence: "CERTIFIED",
        evidenceCount: 47,
        dollarImpact: 1126000
      },
      {
        name: "Spread Pricing Linkage",
        weight: 0.20,
        score: 0.61,
        confidence: "MODELED",
        evidenceCount: 5,
        dollarImpact: 342000
      }
    ]
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          @import url('https://fonts.cdnfonts.com/css/instrument-serif');
          
          .sbi-report-page {
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          .sbi-report-page .font-display {
            font-family: 'Instrument Serif', 'Georgia', serif;
          }
          .sbi-report-page .font-mono {
            font-family: 'JetBrains Mono', 'Courier New', monospace;
          }
          
          .glass-panel {
            background: rgba(18, 16, 30, 0.42);
            backdrop-filter: blur(28px) saturate(170%);
            border: 1px solid #f5c361;
            border-radius: 22px;
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #FAF8F5 0%, #f5c361 25%, #ff5a8a 50%, #a78bfa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .confidence-chip-certified {
            background: rgba(74, 222, 128, 0.15);
            border: 1px solid rgba(74, 222, 128, 0.5);
            color: #4ade80;
          }
          
          .confidence-chip-modeled {
            background: rgba(255, 181, 71, 0.15);
            border: 1px solid rgba(255, 181, 71, 0.5);
            color: #ffb547;
          }
          
          .confidence-chip-insufficient {
            background: rgba(255, 107, 122, 0.15);
            border: 1px solid rgba(255, 107, 122, 0.5);
            color: #ff6b7a;
          }
        `}</style>
      </Head>
      
      <SEO 
        title="The Shady Broker Report | Kincaid IQ"
        description="A fiduciary-grade forensic report that quantifies broker compensation opacity and structural misalignment. Powered by the Shady Broker Index (SBI™)."
        image="/og-sbi-report.png"
      />
      
      <div className="min-h-screen bg-[#08070d] sbi-report-page relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-[#ff5a8a]/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-[#5be3d8]/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-radial from-[#a78bfa]/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-[#f5c361]/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }} />
        </div>

        <Nav />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="font-mono text-xs tracking-widest text-[#f5c361] mb-6 uppercase">
                KINCAID IQ / FORENSIC INTELLIGENCE
              </div>
              
              <h1 className="font-display text-6xl md:text-8xl font-semibold mb-6">
                <span className="gradient-text">The Shady Broker Report</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                A fiduciary-grade forensic dossier that quantifies the structural misalignment between your broker's incentive architecture and your plan's interests. Powered by the Shady Broker Index (SBI™).
              </p>
              
              <div className="font-mono text-sm text-[#f5c361] mb-10">
                $4,500 USD / 10 business days / board-defensible
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#f5c361] hover:bg-[#ffd98a] text-[#0B1220] font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg shadow-[#f5c361]/20"
                >
                  Commission the Report
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#f5c361]/50 hover:border-[#f5c361] text-[#f5c361] hover:bg-[#f5c361]/10 font-semibold px-8 py-6 text-lg rounded-2xl"
                >
                  View Sample Report
                </Button>
              </div>
            </motion.div>

            {/* Live SBI Demo - Four Tile Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
            >
              {/* Tile 1: Compensation Surface */}
              <div className="glass-panel p-8 hover:border-[#ffd98a] transition-all cursor-pointer" onClick={() => setActiveComponent(0)}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display text-2xl text-white mb-2">Compensation Surface</h3>
                    <p className="text-sm text-gray-400 font-mono">Schedule A/C Inventory</p>
                  </div>
                  <FileText className="w-6 h-6 text-[#f5c361]" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Direct Commissions</span>
                    <span className="font-mono text-white">$487,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Indirect Overrides</span>
                    <span className="font-mono text-[#ffb547]">$312,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">PBM Admin Fees</span>
                    <span className="font-mono text-white">$156,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Rebate Retention</span>
                    <span className="font-mono text-[#ff6b7a]">$1,126,000</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#f5c361]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-mono text-sm">Evidence Refs</span>
                    <span className="font-mono text-[#5be3d8]">72 anchored</span>
                  </div>
                </div>
              </div>

              {/* Tile 2: Opacity & Bias */}
              <div className="glass-panel p-8 hover:border-[#ffd98a] transition-all cursor-pointer" onClick={() => setActiveComponent(1)}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display text-2xl text-white mb-2">Opacity & Bias</h3>
                    <p className="text-sm text-gray-400 font-mono">Modeled vs. Disclosed</p>
                  </div>
                  <AlertCircle className="w-6 h-6 text-[#ffb547]" />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Opacity Ratio</span>
                    <span className="confidence-chip-modeled px-3 py-1 rounded-full font-mono text-xs">MODELED</span>
                  </div>
                  <div className="text-4xl font-mono text-[#ffb547] mb-1">0.73</div>
                  <div className="text-sm text-gray-400">30% weight • $487K gap</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Renewal Incentive Bias</span>
                    <span className="confidence-chip-certified px-3 py-1 rounded-full font-mono text-xs">CERTIFIED</span>
                  </div>
                  <div className="text-4xl font-mono text-[#4ade80] mb-1">1.42</div>
                  <div className="text-sm text-gray-400">25% weight • Broker gains outpace employer</div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#f5c361]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-mono text-sm">Transform Refs</span>
                    <span className="font-mono text-[#5be3d8]">20 sealed</span>
                  </div>
                </div>
              </div>

              {/* Tile 3: Rebate & Spread Linkage */}
              <div className="glass-panel p-8 hover:border-[#ffd98a] transition-all cursor-pointer" onClick={() => setActiveComponent(2)}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display text-2xl text-white mb-2">Rebate & Spread Linkage</h3>
                    <p className="text-sm text-gray-400 font-mono">PBM Contract Analysis</p>
                  </div>
                  <TrendingDown className="w-6 h-6 text-[#ff6b7a]" />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Rebate Distortion</span>
                    <span className="confidence-chip-certified px-3 py-1 rounded-full font-mono text-xs">CERTIFIED</span>
                  </div>
                  <div className="text-4xl font-mono text-[#ff6b7a] mb-1">0.88</div>
                  <div className="text-sm text-gray-400">25% weight • 88% passthrough vs. 100% guarantee</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Spread Pricing Linkage</span>
                    <span className="confidence-chip-modeled px-3 py-1 rounded-full font-mono text-xs">MODELED</span>
                  </div>
                  <div className="text-4xl font-mono text-[#ffb547] mb-1">0.61</div>
                  <div className="text-sm text-gray-400">20% weight • Structural correlation detected</div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#f5c361]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-mono text-sm">Policy Results</span>
                    <span className="font-mono text-[#5be3d8]">52 validated</span>
                  </div>
                </div>
              </div>

              {/* Tile 4: Composite SBI & EBITDA Drag */}
              <div className="glass-panel p-8 hover:border-[#ffd98a] transition-all cursor-pointer bg-gradient-to-br from-[#ff6b7a]/10 to-transparent" onClick={() => setActiveComponent(3)}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display text-2xl text-white mb-2">SBI™ Composite</h3>
                    <p className="text-sm text-gray-400 font-mono">sbi_v2 Formula</p>
                  </div>
                  <Shield className="w-6 h-6 text-[#ff6b7a]" />
                </div>
                
                <div className="text-center mb-6">
                  <div className="inline-block px-6 py-2 bg-[#ff6b7a]/20 border border-[#ff6b7a] rounded-full mb-4">
                    <span className="font-mono text-sm text-[#ff6b7a] uppercase tracking-wider">RED BAND</span>
                  </div>
                  <div className="text-7xl font-mono text-[#ff6b7a] font-bold mb-2">82</div>
                  <div className="text-sm text-gray-400">0–39 GREEN / 40–69 AMBER / 70–100 RED</div>
                </div>
                
                <div className="pt-6 border-t border-[#f5c361]/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">EBITDA Drag (Annual)</span>
                  </div>
                  <div className="text-3xl font-mono text-white mb-1">$2,847,000</div>
                  <div className="text-sm text-gray-400">Recoverable capital: $1.8M – $3.2M range</div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#f5c361]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-mono text-sm">SHA-256 Sealed</span>
                    <span className="font-mono text-[#5be3d8] text-xs">a4f8c2...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Constitutional Doctrine Section */}
        <section className="relative py-20 px-6 border-t border-[#f5c361]/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <Info className="w-8 h-8 text-[#f5c361]" />
                <h2 className="font-display text-4xl text-white">Constitutional Doctrine</h2>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  An SBI™ score of 82 (RED) does <span className="text-white font-semibold">not</span> mean the broker is dishonest. It means the broker's incentive structure is architecturally misaligned with the employer's interests in ways that are quantifiable, documented, and board-reportable. <span className="text-[#f5c361]">The report attacks the structure, never the person.</span>
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="font-display text-xl text-white mb-4">What the Report Is</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#4ade80] mt-0.5 flex-shrink-0" />
                        <span>Structural analysis with quantified dollar impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#4ade80] mt-0.5 flex-shrink-0" />
                        <span>Board-defensible, ERISA-grade finding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#4ade80] mt-0.5 flex-shrink-0" />
                        <span>Every claim backed by evidence primitives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#4ade80] mt-0.5 flex-shrink-0" />
                        <span>SHA-256 sealed, litigation-ready</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-white mb-4">What the Report Is Not</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-[#ff6b7a] mt-0.5 flex-shrink-0" />
                        <span>A character attack on the broker</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-[#ff6b7a] mt-0.5 flex-shrink-0" />
                        <span>A dashboard or analytics widget</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-[#ff6b7a] mt-0.5 flex-shrink-0" />
                        <span>HR-facing (this is a CFO/Board instrument)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-[#ff6b7a] mt-0.5 flex-shrink-0" />
                        <span>Speculative narrative without math backbone</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Evidence Primitives Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-5xl text-white mb-4">
                Why the Numbers Hold Up in a Deposition
              </h2>
              <p className="text-xl text-gray-400">
                Every claim carries four constitutional primitives
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "EvidenceRef",
                  description: "The raw artifact (Schedule A row, Schedule C disclosure, contract clause) with SHA-256 hash and source URI",
                  color: "#4ade80"
                },
                {
                  name: "TransformRef",
                  description: "The deterministic computation that produced the number (formula version, input hash, output hash)",
                  color: "#5be3d8"
                },
                {
                  name: "PolicyResult",
                  description: "The rule/policy/contract clause being evaluated (e.g., ERISA §408(b)(2), 100% rebate passthrough guarantee)",
                  color: "#a78bfa"
                },
                {
                  name: "Claim",
                  description: "The finding itself, with confidence tier and dollar quantification",
                  color: "#f5c361"
                }
              ].map((primitive, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-panel p-6 hover:border-[#ffd98a] transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primitive.color }} />
                    <h3 className="font-mono text-lg" style={{ color: primitive.color }}>{primitive.name}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{primitive.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="font-display text-2xl text-gray-300 italic">
                "Every figure in the report is traceable to a source document. That is the entire point."
              </p>
            </motion.div>
          </div>
        </section>

        {/* 7-Gate Chain Section */}
        <section className="relative py-20 px-6 border-t border-[#f5c361]/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-5xl text-white mb-4">
                The 7-Gate Enforcement Chain
              </h2>
              <p className="text-xl text-gray-400">
                No tile renders a dollar figure unless all upstream gates pass
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {["DEFINE", "WIRE", "VALIDATE", "PROMOTE", "COMPUTE", "GATE", "RENDER"].map((gate, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="glass-panel px-6 py-4 text-center min-w-[120px]">
                    <div className="font-mono text-xs text-[#f5c361] mb-2">0{i + 1}</div>
                    <div className="font-mono text-sm text-white font-semibold">{gate}</div>
                  </div>
                  {i < 6 && (
                    <ChevronRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f5c361]" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fiduciary Close (Notre Dame Beat) */}
        <section className="relative py-24 px-6 border-t border-[#f5c361]/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-display text-3xl text-gray-200 leading-relaxed mb-8">
                The final paragraph of every Shady Broker Report invokes fiduciary duty as the protection of plan participants: the employees whose wages funded the premium, whose health depends on the formulary, whose retirement is diminished by every dollar of structural opacity. ERISA §404(a)(1)(B), the prudent expert standard, exists because the people who pay for the plan are not the people who design it. The SBI™ closes the information asymmetry that lets that gap become extraction.
              </p>
              
              <p className="font-display text-2xl text-[#f5c361] italic">
                Dashboards show numbers. Kincaid IQ shows receipts. The receipts belong to the participants.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-12"
            >
              <h2 className="font-display text-4xl text-white mb-6">
                Commission Your Report
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                10 business days. Board-defensible. Evidence-anchored. SHA-256 sealed.
              </p>
              
              <Button
                size="lg"
                className="bg-[#f5c361] hover:bg-[#ffd98a] text-[#0B1220] font-semibold px-12 py-6 text-lg rounded-2xl shadow-lg shadow-[#f5c361]/20"
              >
                Begin Engagement — $4,500 USD
              </Button>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  <span>24-page forensic PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  <span>Evidence manifest</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  <span>Mutual NDA</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-6 border-t border-[#f5c361]/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-display text-xl text-white mb-4">Kincaid Risk Management Co.</h3>
                <p className="text-gray-400 text-sm">Carmel, Indiana</p>
              </div>
              
              <div>
                <h3 className="font-display text-xl text-white mb-4">Contact</h3>
                <p className="text-gray-400 text-sm">jer@kincaidrmc.com</p>
              </div>
              
              <div>
                <h3 className="font-display text-xl text-white mb-4">Resources</h3>
                <div className="space-y-2">
                  <Link href="https://www.linkedin.com/in/jeremiah-shrack" className="block text-gray-400 hover:text-[#f5c361] text-sm transition-colors">
                    LinkedIn
                  </Link>
                  <Link href="https://kincaidrmc.com" className="block text-gray-400 hover:text-[#f5c361] text-sm transition-colors">
                    kincaidrmc.com
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-8 border-t border-[#f5c361]/20">
              <p className="font-mono text-xs text-gray-500">
                Kincaid IQ / Forensic Series / v1.0 / SBI™ sbi_v2
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}