import { DollarSign, Database, Target, TrendingDown, CheckCircle2, AlertTriangle, Zap, BarChart3 } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function ReferenceBasedPricingSavingsEngine() {
  return (
    <EngineDetailLayout
      title="Reference-Based Pricing Savings"
      category="Healthcare Economics Engine"
      tagline="Calculate precise RBP savings potential, model provider acceptance rates, and optimize pricing strategies with multi-year ROI projections"
      gradient="from-emerald-600 via-teal-600 to-cyan-600"
    >
      {/* Problem */}
      <VegasSection title="The PPO Premium Trap" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            You're paying 240% of Medicare rates because your broker says "that's the best network discount available." Meanwhile, reference-based pricing clients are paying 140% of Medicare and saving $4M annually. Your broker never mentioned it.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={DollarSign}
              label="Avg PPO Markup"
              value="240%"
              sublabel="of Medicare rates"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={TrendingDown}
              label="RBP Target Rate"
              value="140%"
              sublabel="of Medicare benchmark"
              gradient="from-emerald-600 to-teal-600"
            />
            <VegasMetricCard
              icon={BarChart3}
              label="Potential Savings"
              value="30-40%"
              sublabel="on medical spend"
              gradient="from-cyan-600 to-blue-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Broker says "RBP is too risky" without showing you the actual numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>You accept 180% of Medicare as "aggressive discount" when it's still overpriced</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No data on provider acceptance rates in your specific market</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>CFO can't get board approval without credible savings projections</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Data-Driven RBP Strategy" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our RBP Savings Engine analyzes your actual claims against Medicare benchmarks, models provider acceptance rates by facility type, and projects multi-year savings with implementation roadmaps. You get board-ready financial analysis before you make the move.
          </p>

          <VegasCodeBlock language="RBP Financial Model">
{`// Claims-level pricing comparison
FOR each claim IN last_24_months:
  medicare_rate = GET_medicare_base(DRG, CPT, geography)
  current_paid = claim.allowed_amount
  rbp_target = medicare_rate × TARGET_MULTIPLIER  // e.g., 140%
  
  savings_opportunity = current_paid - rbp_target
  provider_tier = CLASSIFY_provider(volume, quality, leverage)
  
  acceptance_probability = HISTORICAL_data(
    provider_tier,
    facility_type,
    service_line,
    market_competitiveness
  )
  
  risk_adjusted_savings = savings_opportunity × acceptance_probability

// Portfolio optimization
OPTIMIZE pricing_strategy TO:
  MAXIMIZE(total_savings)
  WHILE maintaining(
    provider_access_threshold,
    member_satisfaction_floor,
    balance_billing_tolerance
  )

GENERATE:
  - Multi-year savings projection
  - Implementation timeline
  - Risk mitigation plan`}
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
                <span><strong className="text-white">Medicare Rate Database:</strong> Complete DRG, CPT, and geographic adjustment tables with quarterly updates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Claims Repricing Engine:</strong> Line-item comparison of current vs. RBP rates with savings waterfall</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Provider Leverage Scoring:</strong> Market power analysis, volume concentration, quality metrics</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Acceptance Rate Modeler:</strong> Facility-specific negotiation success probability based on 500+ implementations</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Strategic Outputs</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Target Multiplier" value="120-180%" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Savings Range" value="$2M-$8M" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Acceptance Rate" value="75-95%" gradient="from-cyan-600 to-blue-600" />
              <VegasMetricCard label="Implementation" value="6-12mo" gradient="from-blue-600 to-purple-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={DollarSign}
            title="Manufacturing Company RBP Migration"
            items={[
              "3,200 lives, $22M annual medical spend",
              "Current PPO paying 220% of Medicare",
              "Engine models 145% target with 88% provider acceptance",
              "Year 1 savings projection: $4.2M (19% reduction)",
              "3-year cumulative savings: $14.8M after implementation costs"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Hybrid Strategy Optimization"
            items={[
              "CFO worried about full RBP member disruption",
              "Engine models hybrid: PPO for primary care, RBP for facility services",
              "Targets 160% on hospital/surgery, keeps existing PCP network",
              "12% total cost reduction with <5% member disruption",
              "Implemented in 4 months, hit targets within 6 months"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">See Your RBP Savings Potential</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload 12 months of claims data. Get your customized RBP financial model in under 2 hours. 
            See exactly what you're leaving on the table with your current PPO contract.
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