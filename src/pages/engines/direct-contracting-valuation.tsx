import { Handshake, Database, Target, DollarSign, CheckCircle2, AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function DirectContractingValuationEngine() {
  return (
    <EngineDetailLayout
      title="Direct Contracting Valuation"
      category="Healthcare Economics Engine"
      tagline="Value direct provider contracts, model bundled payment economics, and optimize direct-to-employer arrangements with multi-year ROI analysis"
      gradient="from-blue-600 via-indigo-600 to-purple-600"
    >
      {/* Problem */}
      <VegasSection title="The Middleman Tax" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            You're paying a hospital network $18,000 for a knee replacement while the hospital would accept $12,000 direct. But your broker and carrier need their cut, so you're stuck with the markup. Direct contracting eliminates the middleman—if you can value it correctly.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={DollarSign}
              label="Network Markup"
              value="35-50%"
              sublabel="vs. direct contract rates"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={TrendingUp}
              label="Direct Contract Savings"
              value="25-40%"
              sublabel="on targeted services"
              gradient="from-emerald-600 to-teal-600"
            />
            <VegasMetricCard
              icon={Handshake}
              label="Implementation Time"
              value="3-6mo"
              sublabel="per contract"
              gradient="from-blue-600 to-purple-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Provider quotes $14K bundled rate but you can't verify if that's competitive</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No baseline to compare against network rates or alternative providers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Can't model volume guarantees, quality incentives, or shared savings structures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>CFO kills deal because ROI analysis is speculative</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Precision Contract Valuation" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Direct Contracting Engine models every economic variable: historical utilization by service line, competitive benchmarking, quality-adjusted pricing, volume commitment economics, and multi-year total cost projections. You negotiate with actuarial precision.
          </p>

          <VegasCodeBlock language="Contract Valuation Model">
{`// Service-line utilization baseline
historical_volume = AGGREGATE(
  last_36_months_claims 
  WHERE service_category = TARGET_service
)

// Competitive rate benchmarking
FOR each service_code:
  network_rate = current_ppo_allowed
  medicare_rate = cms_base × geographic_adj
  direct_quote = provider_proposal
  
  fair_value_range = PERCENTILE(
    [medicare_rate × 1.3, medicare_rate × 1.6],
    market_competitiveness_index
  )
  
  IF direct_quote > fair_value_range[75]:
    FLAG "Overpriced - negotiate down"
  ELSE IF direct_quote < fair_value_range[25]:
    FLAG "Suspiciously low - verify quality"

// Multi-year ROI projection
year_1_savings = (network_rate - direct_rate) × projected_volume
implementation_cost = steerage_program + care_coordination
risk_reserve = savings × 0.15  // Quality/access buffer

net_3yr_roi = CALCULATE(
  cumulative_savings - implementation_cost - risk_reserve,
  ADJUSTED_FOR: volume_variance, quality_outcomes, satisfaction
)

GENERATE board_presentation WITH:
  - Savings waterfall by service line
  - Break-even analysis
  - Risk scenarios (best/base/worst)`}
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
                <span><strong className="text-white">Service-Line Utilization Analyzer:</strong> 36-month historical volume trends by CPT/DRG with seasonal adjustment</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Fair Value Calculator:</strong> Medicare benchmarking, market rate surveys, quality-adjusted pricing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Volume Commitment Optimizer:</strong> Guarantee vs. upside models with risk-sharing structures</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Multi-Year ROI Forecaster:</strong> Implementation costs, steerage success rates, member satisfaction impact</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Valuation Outputs</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Fair Value Range" value="$$-$$$" gradient="from-blue-600 to-indigo-600" />
              <VegasMetricCard label="Year 1 ROI" value="15-35%" gradient="from-indigo-600 to-purple-600" />
              <VegasMetricCard label="Break-Even" value="6-18mo" gradient="from-purple-600 to-pink-600" />
              <VegasMetricCard label="Risk Score" value="Low-High" gradient="from-pink-600 to-red-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Handshake}
            title="Orthopedic Center Bundle Contract"
            items={[
              "Provider quotes $13,500 all-in for knee replacement",
              "Engine shows network average: $21,300",
              "Fair value range: $11,800-$15,200 based on Medicare + quality",
              "CFO negotiates down to $12,200 with 12-case volume guarantee",
              "Year 1 savings: $109K on 12 cases, ROI: 340% after steerage costs"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Multi-Specialty Employer Direct Contract"
            items={[
              "Health system offers bundled primary care + specialty at 30% discount",
              "Engine models 3-year utilization across 15 service lines",
              "Identifies $1.8M savings opportunity with quality protections",
              "CFO structures shared savings: 70/30 split above baseline",
              "3-year actual savings: $2.1M vs. $1.8M projection"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Value Your Next Direct Contract</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop guessing if a provider's bundle quote is fair. Upload your claims history and get a complete 
            contract valuation model in under 90 minutes—before you sit down to negotiate.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-indigo-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}