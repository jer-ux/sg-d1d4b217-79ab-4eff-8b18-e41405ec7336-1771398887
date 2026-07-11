import { Package, Database, Target, DollarSign, CheckCircle2, AlertTriangle, Zap, BarChart3 } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function EpisodeOfCareValuationEngine() {
  return (
    <EngineDetailLayout
      title="Episode-of-Care Valuation"
      category="Healthcare Economics Engine"
      tagline="Bundle all services for a clinical episode into a single price—from pre-op through 90-day post-discharge—and negotiate episode-based contracts that align provider incentives"
      gradient="from-blue-600 via-indigo-600 to-purple-600"
    >
      {/* Problem */}
      <VegasSection title="Fee-for-Service Chaos" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Hip replacement costs you $47K. But that's just the surgery—surgeon bills separately, anesthesia bills separately, PT bills separately, readmission bills separately. Nobody owns the total outcome. You pay for 37 separate line items and hope quality emerges. It doesn't.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Price Variation"
              value="300-500%"
              sublabel="same episode, different providers"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={DollarSign}
              label="Readmission Cost"
              value="$15K-$40K"
              sublabel="unplanned complications"
              gradient="from-orange-600 to-amber-600"
            />
            <VegasMetricCard
              icon={Package}
              label="Fragmented Bills"
              value="20-50"
              sublabel="per episode"
              gradient="from-amber-600 to-yellow-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Provider optimizes revenue per line item, not patient outcomes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Readmissions are profitable—no incentive to prevent complications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Can't compare total cost because episode definitions vary by provider</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Post-acute care uncoordinated: SNF, home health, PT all bill separately</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Episode-Based Payment Intelligence" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Episode-of-Care Valuation Engine defines clinical episodes, aggregates all related costs, calculates fair bundled prices with quality adjustments, and generates contract language for episode-based agreements. Provider gets paid one price for the full episode—they own the outcome.
          </p>

          <VegasCodeBlock language="Episode Valuation Algorithm">
{`// Define episode
episode = {
  trigger: "Total knee replacement (DRG 470)",
  window: [-7 days pre_op, +90 days post_discharge],
  included_services: [
    pre_op_assessment,
    surgery,
    anesthesia,
    hospital_stay,
    post_acute_care,
    PT_sessions,
    follow_up_visits,
    imaging,
    related_complications
  ]
}

// Aggregate historical costs
historical_episodes = GET_claims(
  procedure_code = "27447",
  lookback = 24_months
)

FOR each episode IN historical_episodes:
  total_cost = SUM(all_related_claims)
  quality_score = CALCULATE(
    readmission_30d,
    infection_rate,
    patient_satisfaction,
    functional_outcome
  )

// Calculate bundled price
episode_price = PERCENTILE(total_cost, 40th) × 
                quality_adjustment_factor

// Risk adjustment
IF patient_age > 75 OR comorbidity_score > 3:
  episode_price += risk_premium

// Generate contract terms
contract = {
  base_price: episode_price,
  quality_bonus: +$2K if readmission < 2%,
  quality_penalty: -$3K if readmission > 5%,
  stop_loss: cap at 2× base_price for outliers
}`}
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
                <span><strong className="text-white">Episode Grouper:</strong> Clinical logic to assign claims to episodes (CMS ETGs + custom rules)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Cost Aggregator:</strong> Sum all related services within episode window</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Quality Scoring:</strong> Outcome measures, readmission rates, patient satisfaction</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Risk Adjuster:</strong> Patient acuity, comorbidities, social determinants</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Valuation Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Episode Price" value="$32K-$65K" sublabel="typical joint replacement" gradient="from-blue-600 to-indigo-600" />
              <VegasMetricCard label="Savings vs FFS" value="15-25%" sublabel="episode-based contracts" gradient="from-indigo-600 to-purple-600" />
              <VegasMetricCard label="Quality Bonus" value="$1K-$5K" sublabel="per episode" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Readmission ↓" value="30-40%" sublabel="vs. baseline" gradient="from-teal-600 to-cyan-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Package}
            title="Total Joint Replacement Bundle"
            items={[
              "Historical FFS average: $52K (range $38K-$78K)",
              "Engine calculates fair bundled price: $44K",
              "Quality bonus: $2K if 30-day readmission <2%",
              "Provider accepts bundle, invests in care coordination",
              "Readmissions drop from 4.2% to 1.8%, average cost now $42K"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Maternity Episode Contract"
            items={[
              "Prenatal through 6-week postpartum: one bundled price",
              "Uncomplicated vaginal: $9,500 all-in",
              "C-section: $12,500 all-in",
              "NICU carved out (catastrophic stop-loss)",
              "Saved 18% vs. unbundled FFS, improved prenatal visit compliance"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Pay for Outcomes, Not Line Items</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            See which episodes cost you the most. Get bundled prices benchmarked to your claims history. 
            Generate episode-based contract templates ready for negotiation.
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