import { FileText, Database, AlertTriangle, Target, CheckCircle2, Eye, Zap, DollarSign } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function PBMContractScoringEngine() {
  return (
    <EngineDetailLayout
      title="PBM Contract Scoring"
      category="Fiduciary & Governance Engine"
      tagline="Score PBM contracts across 45 contractual provisions, identify missing protections and loopholes, and generate redline recommendations for negotiation"
      gradient="from-orange-600 via-red-600 to-rose-600"
    >
      {/* Problem */}
      <VegasSection title="The $4.2M Loophole" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your PBM contract says "pass-through pricing" on specialty drugs. Sounds transparent. Then you discover they define "acquisition cost" as "the price we negotiated"—not the actual invoice price. That ambiguity cost you $4.2M over three years because they marked up specialty Rx 28% and called it "pass-through." One word change ("invoice-based" vs. "negotiated") would have prevented it.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Contract Leakage"
              value="$2-8M"
              sublabel="per 10K lives annually"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={Eye}
              label="Loopholes Avg"
              value="12-18"
              sublabel="per typical PBM contract"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={FileText}
              label="Plans Reviewing"
              value="<12%"
              sublabel="independent contract audit"
              gradient="from-rose-600 to-pink-600"
            />
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-orange-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Can't score contract quality: no framework to evaluate 200-page agreements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Ambiguous definitions: "reasonable", "market-based", "acquisition cost" undefined</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Missing audit rights: can't validate claims, rebates, or spread pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>No performance guarantees: PBM promises oral "savings", nothing contractual</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="45-Point Contract Audit" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our PBM Contract Scoring Engine evaluates agreements across 45 critical provisions (pricing definitions, audit rights, guarantee enforceability, rebate pass-through, data transparency), scores each provision 0-100, identifies missing protections, and generates redline recommendations for negotiation.
          </p>

          <VegasCodeBlock language="PBM Contract Scoring Algorithm">
{`// 45-point contract evaluation
CONTRACT_SECTIONS = [
  pricing_definitions,
  rebate_pass_through,
  audit_rights,
  data_transparency,
  performance_guarantees,
  termination_provisions,
  conflict_disclosures
]

FOR each section IN CONTRACT_SECTIONS:
  
  // Pricing Definitions (10 provisions)
  IF section == pricing_definitions:
    SCORE:
      - AWP discount clearly defined? (10 pts)
      - "Acquisition cost" = actual invoice? (15 pts)
      - MAC defined with update frequency? (10 pts)
      - Dispensing fee fixed or variable? (10 pts)
      - Specialty drug markup disclosed? (15 pts)
      - Brand-generic arbitrage prohibited? (10 pts)
      - Spread pricing prohibited? (15 pts)
      - Reasonable and customary defined? (10 pts)
      - Administrative fees itemized? (5 pts)
  
  // Rebate Pass-Through (8 provisions)
  IF section == rebate_pass_through:
    SCORE:
      - 100% of manufacturer rebates passed? (20 pts)
      - Rebate timing (≤60 days)? (15 pts)
      - Admin fees < 3% of rebates? (15 pts)
      - Market check definition objective? (10 pts)
      - Rebate aggregators disclosed? (15 pts)
      - Retroactive rebate clawback prohibited? (10 pts)
      - Rebate reporting quarterly minimum? (10 pts)
      - Audit rights on rebate calculations? (5 pts)
  
  // ... 5 more sections (37 more provisions) ...

// Calculate composite score
total_score = WEIGHTED_AVERAGE(all provisions)

risk_classification = CLASSIFY:
  IF total_score < 50: "High Risk — major renegotiation required"
  IF 50-70: "Moderate Risk — targeted improvements needed"
  IF 70-85: "Low Risk — minor enhancements"
  IF > 85: "Well-Protected — best-in-class contract"

// Generate redline
FOR each low_scoring_provision:
  SUGGEST replacement_language FROM best_practice_library
  FLAG "Priority: Critical" IF provision_score < 30

OUTPUT:
  - Overall contract score
  - Section-by-section breakdown
  - Redline document with recommended changes
  - Negotiation priority ranking`}
          </VegasCodeBlock>
        </div>
      </VegasSection>

      {/* Technical Specs */}
      <VegasSection title="Engineering Architecture" icon={Database}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Core Components</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">45-Provision Scorecard:</strong> Evaluate pricing, rebates, audits, guarantees, transparency</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Loophole Detector:</strong> Identify ambiguous definitions and missing protections</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Redline Generator:</strong> Suggest replacement language from best-practice library</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Benchmark Comparison:</strong> Compare against top-quartile contract terms</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Scoring Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Typical Score" value="45-62" sublabel="broker-negotiated contracts" gradient="from-orange-600 to-red-600" />
              <VegasMetricCard label="Target Score" value="85+" sublabel="best-in-class protection" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Leakage Reduction" value="$1.8-4.2M" sublabel="per 10K lives annually" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Audit Time" value="<2 hours" sublabel="complete contract review" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={DollarSign}
            title="Specialty Drug Pricing Loophole"
            items={[
              "Contract language: 'Pass-through pricing based on acquisition cost'",
              "Engine score on this provision: 15/100 (Critical)",
              "Issue: 'Acquisition cost' not defined as actual invoice",
              "PBM interpreted as 'our negotiated rate' (28% markup)",
              "Redline: Changed to 'invoice-based acquisition cost with 30-day proof'",
              "Renegotiated contract, annual savings: $1.9M"
            ]}
          />
          <VegasFeatureCard
            icon={Eye}
            title="Rebate Audit Rights"
            items={[
              "Original contract: No rebate audit rights",
              "Engine flagged: 0/100 on audit provisions",
              "PBM claimed $42 PMPM in rebates",
              "Post-renegotiation: Quarterly rebate reports + independent audit rights",
              "First audit discovered: $8 PMPM rebate retention by PBM",
              "3-year recovery: $2.4M + ongoing transparency"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Close the Loopholes</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Score your PBM contract across 45 provisions. Identify missing protections. 
            Generate redline recommendations. Stop accepting broker boilerplate—demand best-in-class protection.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-red-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-red-50 transition-all duration-200 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}