import { Award, Database, Target, DollarSign, CheckCircle2, AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function CentersOfExcellenceROIEngine() {
  return (
    <EngineDetailLayout
      title="Centers of Excellence ROI"
      category="Healthcare Economics Engine"
      tagline="Model financial impact of Centers of Excellence programs, quantify quality improvements, and optimize provider selection with multi-year cost-quality analysis"
      gradient="from-amber-600 via-yellow-600 to-lime-600"
    >
      {/* Problem */}
      <VegasSection title="The Volume-Over-Value Trap" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your members are getting knee replacements at 47 different hospitals with wildly different outcomes. Complication rates range from 3% to 18%. Costs vary $12K to $38K. But nobody's steering them to the high-quality, lower-cost providers because you don't have the data to prove ROI.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Quality Variation"
              value="6x"
              sublabel="complication rate range"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={DollarSign}
              label="Cost Variation"
              value="3.2x"
              sublabel="same procedure range"
              gradient="from-orange-600 to-amber-600"
            />
            <VegasMetricCard
              icon={TrendingUp}
              label="COE Avg Savings"
              value="22-35%"
              sublabel="per procedure"
              gradient="from-emerald-600 to-teal-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Can't prove which hospitals actually deliver better outcomes at lower cost</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Members resist travel incentives without transparent quality data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>CFO won't approve COE program without credible ROI projections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No baseline to measure actual program performance against targets</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Evidence-Based Provider Selection" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our COE ROI Engine combines claims data, quality registries, and outcomes databases to identify true Centers of Excellence. You get provider-specific cost-quality scores, member steerage models, and multi-year financial projections with implementation roadmaps.
          </p>

          <VegasCodeBlock language="COE Selection Algorithm">
{`// Provider performance scoring
FOR each provider IN target_service_line:
  quality_score = COMPOSITE(
    risk_adjusted_outcomes,
    complication_rates,
    readmission_rates,
    patient_satisfaction,
    registry_certifications
  )
  
  cost_efficiency = CALCULATE(
    total_episode_cost,
    ADJUSTED_FOR: case_mix, geography, patient_complexity
  )
  
  value_score = RANK(quality_score / cost_efficiency)
  
  IF value_score > EXCELLENCE_THRESHOLD:
    ADD_TO coe_candidate_list

// ROI projection
baseline_volume = historical_procedures_last_24mo
coe_steerage_rate = MODEL(incentive_tier, distance, satisfaction)
projected_savings = (baseline_cost - coe_cost) × steerage_volume

OPTIMIZE program_design TO:
  MAXIMIZE(net_savings)
  WHILE maintaining(
    member_access_standards,
    quality_floor,
    satisfaction_threshold
  )

GENERATE:
  - Provider scorecard by procedure
  - Member incentive structure
  - 3-year financial projection
  - Implementation timeline`}
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
                <span><strong className="text-white">Provider Quality Scoring:</strong> Risk-adjusted outcomes, registry certifications, volume thresholds</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Episode Cost Analyzer:</strong> Total cost of care from pre-op through 90-day follow-up</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Steerage Model:</strong> Member behavior prediction based on incentive design and geographic access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">ROI Forecaster:</strong> Multi-year savings projection with program implementation costs</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Program Outputs</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Quality Tier" value="Platinum-Gold" gradient="from-amber-600 to-yellow-600" />
              <VegasMetricCard label="Steerage Rate" value="30-60%" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Year 1 Savings" value="$400K-$2M" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Quality Improvement" value="40-65%" gradient="from-cyan-600 to-blue-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Award}
            title="Joint Replacement COE Program"
            items={[
              "2,800 lives, 42 knee/hip replacements annually",
              "Engine identifies 3 platinum-tier orthopedic centers",
              "Quality scores: 94/100 vs. network avg 76/100",
              "Episode cost: $16,200 vs. network avg $24,800",
              "Year 1: 28 steered cases, $241K savings, zero complications"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Bariatric Surgery Excellence Network"
            items={[
              "12,000 lives, high obesity prevalence",
              "Engine models 5-year bariatric surgery opportunity",
              "Selects 2 centers: 1.2% complication vs. 7.4% national avg",
              "Total episode cost $18,500 vs. $26,900 elsewhere",
              "3-year program: 67 surgeries, $563K savings, 91% satisfaction"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-lime-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-amber-600 via-yellow-600 to-lime-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Build Your COE Network</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop sending members to average providers charging premium prices. Identify true Centers of Excellence 
            with data-driven quality and cost analysis before you launch the program.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-amber-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-amber-50 transition-all duration-200 shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}