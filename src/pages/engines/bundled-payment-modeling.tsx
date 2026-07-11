import { Package, Database, Target, DollarSign, CheckCircle2, AlertTriangle, Zap, BarChart3 } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function BundledPaymentModelingEngine() {
  return (
    <EngineDetailLayout
      title="Bundled Payment Modeling"
      category="Healthcare Economics Engine"
      tagline="Design and value bundled payment contracts, model risk-sharing structures, and optimize episode definitions with actuarial precision"
      gradient="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      {/* Problem */}
      <VegasSection title="The Fee-For-Service Trap" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Provider quotes $14,500 for a "bundled" knee replacement. But the bundle excludes pre-op imaging, post-acute care, readmissions, and complications. You discover this after a $9,200 surprise bill. True bundled payments transfer risk—if you can model them correctly.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Hidden Costs"
              value="35-60%"
              sublabel="of 'bundled' claims"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={DollarSign}
              label="True Bundle Savings"
              value="15-25%"
              sublabel="vs. fee-for-service"
              gradient="from-emerald-600 to-teal-600"
            />
            <VegasMetricCard
              icon={Package}
              label="Episode Duration"
              value="30-90d"
              sublabel="optimal window"
              gradient="from-purple-600 to-pink-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Provider defines "bundle" to exclude high-cost services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No historical baseline to value the proposed bundle price</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Can't model downside risk: what if complications spike?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>CFO won't approve without actuarial stop-loss analysis</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Actuarial Bundle Design" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Bundled Payment Engine models complete episodes of care from your claims history, defines optimal inclusion criteria, prices bundles actuarially, and models risk-sharing structures. You negotiate with provider-specific cost data and downside protection.
          </p>

          <VegasCodeBlock language="Bundle Valuation Model">
{`// Episode definition from claims
FOR each index_procedure:
  episode_services = IDENTIFY_all_claims(
    timeframe: trigger_date ± episode_window,
    related_services: pre_op + procedure + post_acute + readmissions,
    exclusions: unrelated_conditions
  )
  
  baseline_episode_cost = SUM(episode_services.allowed_amount)
  
  // Risk adjustment
  expected_cost = baseline_episode_cost × ADJUST_FOR(
    patient_age, comorbidity_score, procedure_complexity
  )
  
// Bundle pricing strategy
fair_bundle_price = PERCENTILE(expected_cost, 40)  // 40th %ile
provider_quote = proposed_bundle_amount

IF provider_quote > fair_bundle_price:
  savings_at_risk = provider_quote - fair_bundle_price
  NEGOTIATE_down OR FLAG "Overpriced"

// Risk-sharing structure
shared_savings_threshold = fair_bundle_price × 0.95
downside_cap = fair_bundle_price × 1.15

IF actual_cost < shared_savings_threshold:
  payer_keeps = (fair_bundle_price - actual_cost) × 0.7
  provider_shares = (fair_bundle_price - actual_cost) × 0.3
ELSE IF actual_cost > downside_cap:
  payer_pays = downside_cap  // Stop-loss protection`}
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
                <span><strong className="text-white">Episode Constructor:</strong> Claims-based episode definition with inclusion/exclusion logic</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Baseline Cost Calculator:</strong> Historical episode costs with risk adjustment</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Risk-Sharing Designer:</strong> Shared savings, downside caps, quality incentives</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Variance Simulator:</strong> Monte Carlo modeling of actual vs. expected costs</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Bundle Outputs</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Fair Value Price" value="$$,$$$ ±5%" gradient="from-violet-600 to-purple-600" />
              <VegasMetricCard label="Episode Window" value="30-90d" gradient="from-purple-600 to-fuchsia-600" />
              <VegasMetricCard label="Downside Cap" value="110-120%" gradient="from-fuchsia-600 to-pink-600" />
              <VegasMetricCard label="Shared Savings" value="70/30 split" gradient="from-pink-600 to-red-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Package}
            title="Maternity Care Bundle"
            items={[
              "Provider proposes $8,500 global maternity bundle",
              "Engine analyzes 247 deliveries over 24 months",
              "Baseline episode cost: $9,200 (prenatal through 6 weeks postpartum)",
              "Fair value: $7,800-$8,200 with NICU/C-section exclusions",
              "Negotiated $7,950 with 80/20 shared savings below $7,500"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Cardiac Surgery Bundle"
            items={[
              "Hospital quotes $42,000 CABG bundle (surgery + 30-day episode)",
              "Engine shows historical cost: $48,300 with wide variance",
              "Models 90-day episode including readmissions: $52,100",
              "CFO structures: $44,000 base + shared savings below $42,000",
              "Year 1: 14 cases, $117K savings, 1 readmission (within cap)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Design True Bundled Payments</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop accepting provider-defined "bundles" that shift risk back to you. Build actuarially sound 
            episode definitions with downside protection before you sign the contract.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}