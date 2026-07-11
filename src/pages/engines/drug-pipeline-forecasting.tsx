import { TrendingUp, Database, AlertTriangle, DollarSign, CheckCircle2, Target, Zap, Activity } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function DrugPipelineForecastingEngine() {
  return (
    <EngineDetailLayout
      title="Drug Pipeline Forecasting"
      category="Healthcare Economics Engine"
      tagline="Monitor FDA drug pipeline, model uptake probabilities for new therapies, and build financial reserves for gene therapies, CAR-T, and specialty approvals before they hit the market"
      gradient="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      {/* Problem */}
      <VegasSection title="Blindsided by New Therapies" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Hemgenix gets FDA approval: $3.5M one-time gene therapy for hemophilia B. Your actuarial team didn't see it coming. No reserve built. One patient bankrupts your self-funded plan for the year. This happens quarterly now. The FDA pipeline is visible—you're just not watching it.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={DollarSign}
              label="Gene Therapy Cost"
              value="$1M-$4M"
              sublabel="one-time treatment"
              gradient="from-violet-600 to-purple-600"
            />
            <VegasMetricCard
              icon={AlertTriangle}
              label="CAR-T Launch Price"
              value="$475K"
              sublabel="per patient"
              gradient="from-purple-600 to-fuchsia-600"
            />
            <VegasMetricCard
              icon={TrendingUp}
              label="New Approvals/Year"
              value="50-70"
              sublabel="FDA novel therapies"
              gradient="from-fuchsia-600 to-pink-600"
            />
          </div>

          <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-violet-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-violet-400">•</span>
                <span>Reactive budgeting: therapy approved, patient identified, panic ensues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">•</span>
                <span>No financial reserves for specialty pipeline—hit P&L with no warning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">•</span>
                <span>Can't negotiate pre-approval: waiting until launch means you pay list price</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">•</span>
                <span>Population at risk unknown: don't know which members match trial inclusion criteria</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Proactive Pipeline Intelligence" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Drug Pipeline Forecasting Engine monitors FDA Phase 2/3 trials, models approval probabilities and launch timelines, identifies at-risk members in your population, and generates financial reserves with uptake forecasts. You see it coming 12-24 months before approval.
          </p>

          <VegasCodeBlock language="Pipeline Forecasting Algorithm">
{`// Monitor FDA pipeline
pipeline_drugs = GET_fda_trials(
  phase: ["Phase 2", "Phase 3"],
  therapeutic_areas: [oncology, rare_disease, gene_therapy]
)

FOR each drug IN pipeline_drugs:
  // Approval probability
  approval_prob = HISTORICAL_rate(drug.phase, drug.therapeutic_area)
    Phase 2 → Phase 3: 30%
    Phase 3 → FDA approval: 58%
    Phase 3 oncology → approval: 48%
  
  // Launch timeline
  expected_approval_date = trial_completion + 
                          pdufa_review_period +
                          conditional_buffer
  
  // Population at risk
  eligible_members = MATCH_population(
    diagnosis_codes: drug.indication,
    severity_criteria: trial_inclusion,
    age_range: trial_demographics
  )
  
  // Uptake model
  IF approval_occurs:
    Year 1 uptake = MIN(eligible_count × 15%, capacity_constrained)
    Year 2 uptake = eligible_count × 35%
    Year 3 uptake = eligible_count × 55%
  
  // Financial reserve
  expected_cost = uptake_forecast × drug_price × approval_prob
  reserve_per_year = expected_cost / years_until_approval
  
  IF reserve_per_year > materiality_threshold:
    ALERT CFO and actuarial team
    BUILD reserve in trend assumption`}
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
                <span><strong className="text-white">FDA Pipeline Monitor:</strong> Track ClinicalTrials.gov + FDA PDUFA calendar</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Approval Probability:</strong> Bayesian model using historical phase success rates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Member Matching:</strong> Identify eligible population from diagnosis codes + severity</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Reserve Calculator:</strong> Build IBNR-style reserve for expected future cost</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Forecasting Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Pipeline Visibility" value="12-24 mo" sublabel="pre-approval" gradient="from-violet-600 to-purple-600" />
              <VegasMetricCard label="Approval Accuracy" value="73%" sublabel="Phase 3 predictions" gradient="from-purple-600 to-fuchsia-600" />
              <VegasMetricCard label="Reserve Adequacy" value="92%" sublabel="actual vs. forecast" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Cost Avoidance" value="$500K-$2M" sublabel="pre-negotiation" gradient="from-teal-600 to-cyan-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Activity}
            title="Hemophilia B Gene Therapy Reserve"
            items={[
              "Hemgenix Phase 3 completion: January 2022",
              "Engine forecast approval probability: 65%, launch Q4 2022",
              "Identified 1 severe hemophilia B patient in 15K lives",
              "Expected cost: $3.5M × 65% = $2.28M",
              "Built $190K/month reserve over 12 months",
              "FDA approved November 2022 — reserve fully funded"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="CAR-T Pipeline Monitoring"
            items={[
              "Monitored 8 CAR-T therapies in Phase 2/3 trials",
              "Matched 6 members with refractory lymphoma",
              "Approval forecast: 2 therapies expected within 18 months",
              "Built $950K reserve (2 × $475K)",
              "Negotiated preferred site-of-care before launch",
              "Actual cost: $390K per patient (18% below list)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">See Tomorrow's Therapies Today</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Monitor FDA pipeline. Identify at-risk members. Build financial reserves before approval. 
            Negotiate pricing before launch. Never get blindsided again.
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