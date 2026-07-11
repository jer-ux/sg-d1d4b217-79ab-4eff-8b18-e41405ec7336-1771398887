import { GitBranch, Database, TrendingUp, DollarSign, CheckCircle2, AlertTriangle, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function BiosimilarAdoptionModelingEngine() {
  return (
    <EngineDetailLayout
      title="Biosimilar Adoption Modeling"
      category="Healthcare Economics Engine"
      tagline="Forecast biosimilar uptake rates, model formulary tier changes, and quantify multi-year savings from switching brand biologics to biosimilar alternatives"
      gradient="from-cyan-600 via-blue-600 to-indigo-600"
    >
      {/* Problem */}
      <VegasSection title="The Biosimilar Opportunity Gap" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Biosimilars launched 5 years ago. They cost 30-60% less than brand biologics. But your utilization? Still under 15%. Why? Because your PBM and specialty pharmacy make more money on the brand. Nobody's incentivized to switch your members. You're leaving millions on the table.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={DollarSign}
              label="Biosimilar Discount"
              value="30-60%"
              sublabel="vs. brand biologics"
              gradient="from-cyan-600 to-blue-600"
            />
            <VegasMetricCard
              icon={AlertTriangle}
              label="Current Adoption"
              value="8-18%"
              sublabel="typical plan utilization"
              gradient="from-blue-600 to-indigo-600"
            />
            <VegasMetricCard
              icon={TrendingUp}
              label="Target Adoption"
              value="60-80%"
              sublabel="clinically appropriate"
              gradient="from-indigo-600 to-purple-600"
            />
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Can't model savings: don't know how many members are biosimilar-eligible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>No adoption curve: assume instant 100% conversion (never happens)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Physician resistance unquantified—no plan to overcome clinical inertia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Rebate clawback risk: brand manufacturer may reduce rebates when you switch</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Multi-Year Adoption Forecasting" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Biosimilar Adoption Modeling Engine identifies all brand biologic users eligible for biosimilar switch, models realistic adoption curves (phased over 12-24 months), accounts for physician resistance and rebate clawbacks, and generates implementation roadmaps with net savings.
          </p>

          <VegasCodeBlock language="Biosimilar Adoption Algorithm">
{`// Identify eligible population
eligible_members = GET_members_on_biologics(
  brands: ["Humira", "Remicade", "Enbrel", "Neulasta", "Avastin"]
)

FOR each member IN eligible_members:
  biosimilar_available = CHECK_fda_approval(member.drug)
  clinically_appropriate = EVALUATE(
    diagnosis_codes,
    contraindications,
    physician_specialty
  )
  
  IF biosimilar_available AND clinically_appropriate:
    member.eligible = TRUE

// Model adoption curve (S-curve)
adoption_rate(month) = max_adoption / (1 + e^(-k×(month - inflection)))
  where:
    max_adoption = 75% (not 100% — clinical resistance)
    k = steepness factor (0.3 for aggressive, 0.15 for conservative)
    inflection = 9 months (when adoption hits 50%)

// Calculate savings
FOR month IN [1..36]:
  members_switched = eligible_count × adoption_rate(month)
  
  brand_cost = members_switched × brand_price × 12
  biosimilar_cost = members_switched × biosimilar_price × 12
  gross_savings = brand_cost - biosimilar_cost
  
  // Account for rebate clawback
  rebate_loss = brand_rebate_per_member × members_switched
  
  // Implementation costs
  implementation = prior_auth_setup + physician_education + 
                   patient_outreach + step_therapy_edits
  
  net_savings(month) = gross_savings - rebate_loss - implementation

cumulative_savings = SUM(net_savings over 36 months)`}
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
                <span><strong className="text-white">Eligibility Screener:</strong> Identify members on brand biologics with FDA-approved biosimilars</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Adoption Curve:</strong> S-curve model with physician/patient resistance factors</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Rebate Impact:</strong> Model brand rebate clawback when utilization drops</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Implementation Planner:</strong> Generate formulary tier changes, PA edits, physician outreach</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Adoption Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Year 1 Adoption" value="25-35%" sublabel="realistic uptake" gradient="from-cyan-600 to-blue-600" />
              <VegasMetricCard label="Year 2 Adoption" value="55-70%" sublabel="mature utilization" gradient="from-blue-600 to-indigo-600" />
              <VegasMetricCard label="3-Year Savings" value="$1.2M-$4.5M" sublabel="per 10K lives" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="ROI" value="12-18x" sublabel="implementation cost" gradient="from-teal-600 to-cyan-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={GitBranch}
            title="Humira Biosimilar Switch Program"
            items={[
              "Population: 8,500 lives, 42 Humira users",
              "Brand cost: $6,845/month × 42 = $3.45M/year",
              "Biosimilar (Amjevita): $3,200/month × 42 = $1.61M/year",
              "Gross savings: $1.84M/year",
              "Year 1 adoption: 28% → actual savings $515K",
              "Year 2 adoption: 67% → actual savings $1.23M"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Multi-Biosimilar Formulary Strategy"
            items={[
              "Targeted: Humira, Remicade, Enbrel, Neulasta",
              "84 eligible members identified",
              "3-year cumulative savings: $2.7M",
              "Rebate clawback: -$340K (brand manufacturer penalty)",
              "Implementation cost: $180K (PA setup + education)",
              "Net savings over 3 years: $2.18M"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Unlock Biosimilar Savings Now</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            See your eligible population. Model realistic adoption curves. Generate implementation plans 
            with PA edits, physician outreach, and net savings projections.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}