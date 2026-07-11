import { Pill, TrendingUp, Database, Activity, DollarSign, CheckCircle2, BarChart3, Target } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function GLP1FinancialImpactEngine() {
  return (
    <EngineDetailLayout
      title="GLP-1 Financial Impact Modeling Engine"
      category="Financial & Trend"
      tagline="Model the True Cost of Ozempic, Wegovy, and Mounjaro — Beyond the Pharmacy Invoice"
      gradient="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The GLP-1 Cost Tsunami" icon={DollarSign}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">What Most CFOs See</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>"GLP-1s cost $1,200/month per member" — only the pharmacy spend</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No model for adoption rate (who's eligible, who will start treatment)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Ignores downstream medical cost changes (bariatric surgery avoidance)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot project discontinuation rates or step therapy impact</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Treats all GLP-1s identically (Ozempic vs. Wegovy vs. Mounjaro)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-violet-400 mb-4">Kincaid IQ GLP-1 Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Total cost of GLP-1: Rx + medical offsets + productivity gains</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Clinical adoption curves: diabetes vs. obesity indication split</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Medical cost offsets: bariatric surgery, diabetes complications, CVD</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Step therapy modeling: formulary restrictions + prior auth impact</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Drug-specific modeling: Ozempic, Wegovy, Mounjaro, Zepbound pricing</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Engineering Architecture */}
      <VegasSection title="Technical Architecture" icon={Database}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-purple-400 mb-3">Adoption Model</h3>
              <VegasCodeBlock language="python">
{`def glp1_adoption_forecast(population):
    # Eligible population
    diabetic_type2 = population * 0.08  # 8% prevalence
    obese_bmi_30 = population * 0.25    # 25% obesity
    
    # Clinical eligibility (FDA label + guidelines)
    diabetic_eligible = diabetic_type2 * 0.45  # A1C > 7%
    obesity_eligible = obese_bmi_30 * 0.18     # BMI > 30 + comorbidity
    
    total_eligible = diabetic_eligible + obesity_eligible
    
    # Adoption curve (logistic S-curve)
    months = np.arange(0, 36)
    penetration = 1 / (1 + np.exp(-0.25 * (months - 18)))
    
    # Apply formulary restrictions
    if step_therapy_required:
        penetration *= 0.65  # 35% deterred by prior auth
    
    glp1_users_over_time = total_eligible * penetration
    
    return glp1_users_over_time
`}
              </VegasCodeBlock>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-fuchsia-400 mb-3">Total Cost Model</h3>
              <VegasCodeBlock language="python">
{`def glp1_total_cost(users, avg_duration_months=18):
    # Direct pharmacy cost
    monthly_cost = 1200  # Ozempic/Wegovy/Mounjaro
    rx_spend = users * monthly_cost * avg_duration_months
    
    # Medical cost offsets (clinical literature)
    bariatric_surgery_avoided = users * 0.08 * 35000  # $35K/surgery
    diabetes_complication_reduction = users * 0.15 * 8500
    cvd_event_reduction = users * 0.12 * 25000
    
    total_medical_offset = (
        bariatric_surgery_avoided +
        diabetes_complication_reduction +
        cvd_event_reduction
    )
    
    # Productivity gains
    absenteeism_reduction = users * 2.5 * 250  # 2.5 days @ $250/day
    
    net_cost = rx_spend - total_medical_offset - absenteeism_reduction
    roi = (total_medical_offset + absenteeism_reduction) / rx_spend
    
    return {'net_cost': net_cost, 'roi': roi}
`}
              </VegasCodeBlock>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Technical Specs */}
      <VegasSection title="Engine Specifications" icon={Activity}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Pill}
            label="Eligible Population"
            value="12-18%"
            gradient="from-violet-500 to-purple-500"
            description="Type 2 diabetes + obesity cohorts (clinical criteria)"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Adoption Timeline"
            value="36 Months"
            gradient="from-purple-500 to-fuchsia-500"
            description="S-curve penetration with formulary restrictions"
          />
          <VegasMetricCard
            icon={DollarSign}
            label="Medical Offset"
            value="$42K"
            gradient="from-fuchsia-500 to-pink-500"
            description="Avg lifetime offset per GLP-1 user (bariatric, DM, CVD)"
          />
        </div>
      </VegasSection>

      {/* Data Inputs */}
      <VegasSection title="Required Data Inputs" icon={Database}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Activity}
            title="Population Health"
            items={[
              "Diabetes prevalence and A1C distribution",
              "BMI distribution (obesity cohort sizing)",
              "Bariatric surgery utilization (historical)",
              "Cardiovascular disease prevalence",
              "Pharmacy claims: current GLP-1 utilization"
            ]}
          />
          <VegasFeatureCard
            icon={Database}
            title="Formulary Design"
            items={[
              "GLP-1 formulary tier placement (Tier 2 vs 3)",
              "Step therapy requirements (metformin, sulfonylureas)",
              "Prior authorization criteria and approval rates",
              "Copay structure and member cost-sharing",
              "Manufacturer rebate contracts and guarantees"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={CheckCircle2}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={DollarSign}
            title="Budget Forecasting"
            items={[
              "Employer with 15,000 members projects GLP-1 spend",
              "Engine estimates 18% eligible (2,700 members)",
              "Adoption curve: 8% year 1, 18% year 2, 25% year 3",
              "Gross Rx spend: $3.2M year 1, rising to $8.1M year 3",
              "Net cost after medical offsets: $1.9M (40% ROI)"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Formulary Strategy"
            items={[
              "Health plan evaluating step therapy vs open access",
              "Step therapy reduces adoption by 35% (deterred members)",
              "Saves $2.8M in Rx spend over 3 years",
              "But loses $1.6M in bariatric surgery offsets",
              "Net savings: $1.2M — approves step therapy with MD override"
            ]}
          />
          <VegasFeatureCard
            icon={Pill}
            title="Drug Mix Modeling"
            items={[
              "Plan currently 60% Ozempic, 25% Wegovy, 15% Mounjaro",
              "Mounjaro formulary promotion (Tier 2) shifts mix to 40%",
              "Higher unit cost ($1,350/month) but superior efficacy",
              "Medical offsets increase 22% (better glycemic control)",
              "ROI improves from 1.4x to 1.8x despite higher Rx cost"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Model the True Cost of GLP-1s</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your pharmacy spend is spiking. But are you accounting for avoided bariatric surgery, 
            diabetes complications, and productivity gains? Get the full financial picture in 45 seconds.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
            Run GLP-1 Impact Model
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}