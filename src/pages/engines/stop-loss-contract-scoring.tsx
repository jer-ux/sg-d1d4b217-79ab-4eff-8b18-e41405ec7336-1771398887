import { Shield, Database, AlertTriangle, Target, CheckCircle2, DollarSign, Zap, TrendingDown } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function StopLossContractScoringEngine() {
  return (
    <EngineDetailLayout
      title="Stop-Loss Contract Scoring"
      category="Fiduciary & Governance Engine"
      tagline="Score stop-loss contracts across 35 provisions including laser language, run-in/run-out, margin transparency, and pooling terms to prevent hidden carrier profits"
      gradient="from-emerald-600 via-teal-600 to-cyan-600"
    >
      {/* Problem */}
      <VegasSection title="The $3.1M Pooling Trap" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your stop-loss carrier quoted a "competitive" $125 specific deductible with 12/12 coverage. Looks standard. Then a $2.8M cancer claim hits in month 11. Carrier denies: "Run-in period applies—claim incurred before contract start." Your actuary reviews the contract: pooling charges retroactively increased premium by 18% over three years. That "competitive" contract cost you $3.1M in hidden carrier profit.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Hidden Margin"
              value="15-28%"
              sublabel="typical carrier profit markup"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={Shield}
              label="Laser Triggers"
              value="$150-250K"
              sublabel="most carriers laser threshold"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={DollarSign}
              label="Plans Auditing"
              value="<5%"
              sublabel="independent contract review"
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
                <span>Can't identify unfavorable terms: no framework to evaluate complex stop-loss language</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Pooling charges hidden: retroactive premium increases not disclosed upfront</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Run-in/run-out gaps: coverage holes allow carriers to deny legitimate claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Laser abuse: carriers trigger lasers at low thresholds to increase premiums</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="35-Point Stop-Loss Audit" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Stop-Loss Contract Scoring Engine evaluates agreements across 35 critical provisions (deductible levels, laser language, pooling charges, run-in/run-out, margin transparency, terminal liability), scores each provision 0-100, identifies unfavorable terms, and generates negotiation recommendations.
          </p>

          <VegasCodeBlock language="Stop-Loss Contract Scoring Algorithm">
{`// 35-point stop-loss contract evaluation
CONTRACT_PROVISIONS = [
  deductible_structure,
  laser_provisions,
  pooling_charges,
  run_in_run_out,
  margin_transparency,
  terminal_liability,
  claim_administration
]

FOR each provision IN CONTRACT_PROVISIONS:
  
  // Deductible Structure (6 provisions)
  IF provision == deductible_structure:
    SCORE:
      - Specific deductible competitive? (15 pts)
      - Aggregate corridor reasonable? (15 pts)
      - Contract basis (12/12 vs 15/12)? (15 pts)
      - Deductible stacking prohibited? (15 pts)
      - Family vs individual aggregation clear? (20 pts)
      - Lifetime maximum adequate? (20 pts)
  
  // Laser Provisions (7 provisions)
  IF provision == laser_provisions:
    SCORE:
      - Laser threshold ≥$250K? (20 pts)
      - 60-day advance notice required? (15 pts)
      - Medical justification required? (15 pts)
      - Laser premium formula disclosed? (15 pts)
      - Max laser premium cap defined? (15 pts)
      - Removal criteria specified? (10 pts)
      - Appeal rights included? (10 pts)
  
  // Pooling Charges (5 provisions)
  IF provision == pooling_charges:
    SCORE:
      - Pooling charge formula disclosed? (25 pts)
      - Historical loss ratio provided? (20 pts)
      - Retroactive adjustment prohibited? (25 pts)
      - Cap on pooling charge increase? (15 pts)
      - Annual transparency report required? (15 pts)
  
  // Run-In/Run-Out (4 provisions)
  IF provision == run_in_run_out:
    SCORE:
      - 12/12 coverage guaranteed? (30 pts)
      - No run-in period exclusions? (30 pts)
      - 12-month run-out minimum? (20 pts)
      - Terminal liability transferrable? (20 pts)
  
  // ... 3 more provision categories ...

// Calculate composite score
total_score = WEIGHTED_AVERAGE(all provisions)

risk_classification = CLASSIFY:
  IF total_score < 55: "High Risk — unfavorable terms, renegotiate"
  IF 55-70: "Moderate Risk — improvements needed"
  IF 70-85: "Low Risk — adequate protections"
  IF > 85: "Optimal — best-in-class terms"

// Generate negotiation strategy
FOR each low_scoring_provision:
  IDENTIFY market_standard FROM benchmark_database
  CALCULATE cost_impact OF unfavorable_term
  PRIORITIZE BY expected_savings

OUTPUT:
  - Overall contract score
  - Provision-by-provision analysis
  - Negotiation priority ranking
  - Cost impact quantification`}
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
                <span><strong className="text-white">35-Provision Scorecard:</strong> Evaluate deductibles, lasers, pooling, run-in/out, margin disclosure</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Hidden Margin Detector:</strong> Calculate true carrier profit from pooling and laser charges</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Coverage Gap Identifier:</strong> Find run-in/run-out holes that allow claim denials</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Benchmark Comparator:</strong> Score against top-quartile stop-loss terms</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Scoring Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Typical Score" value="52-68" sublabel="broker-negotiated contracts" gradient="from-orange-600 to-red-600" />
              <VegasMetricCard label="Target Score" value="85+" sublabel="optimal terms" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Hidden Margin" value="$800K-2.1M" sublabel="identified per 10K lives" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Review Time" value="<90 min" sublabel="complete contract audit" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={DollarSign}
            title="Pooling Charge Recovery"
            items={[
              "Contract provision: 'Pooling charge based on claims experience'",
              "Engine score: 25/100 on pooling transparency",
              "Hidden issue: Retroactive premium increases averaging 18% annually",
              "Carrier couldn't justify loss ratio when pressed",
              "Renegotiated: Fixed pooling charge with 5% annual cap",
              "3-year savings: $1.4M in avoided pooling charges"
            ]}
          />
          <VegasFeatureCard
            icon={Shield}
            title="Laser Threshold Negotiation"
            items={[
              "Original contract: $150K laser threshold",
              "Engine flagged: 15/100 (Critical risk)",
              "Carrier triggered 14 lasers over 2 years",
              "Lasers added $420K annual premium",
              "Renegotiated: $300K threshold + medical justification required",
              "Year 1 post-renewal: Only 2 lasers, saved $310K"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Overpaying for Stop-Loss</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Score your stop-loss contract across 35 provisions. Identify hidden carrier margins. 
            Negotiate optimal terms. Turn stop-loss from a black box into a transparent, competitive bid.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-teal-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-teal-50 transition-all duration-200 shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}