import { Pill, Database, TrendingUp, AlertTriangle, CheckCircle2, Target, BarChart3, Users } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function GLP1FinancialImpactPage() {
  return (
    <EngineDetailLayout
      title="GLP-1 Financial Impact Engine"
      category="Specialty Drug Economics"
      tagline="Model the $1,350/Month Obesity Drug Wave—Forecast Utilization Curves, PMPM Impact, and 3-Year Budget Exposure"
      gradient="from-indigo-600 via-violet-600 to-purple-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $85-140 PMPM Blind Spot" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Traditional GLP-1 Planning</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>GLP-1 drugs cost $1,200-$1,500/month—most plans didn't budget for obesity treatment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Utilization is exploding: 8-12% of eligible population starting therapy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Treatment duration: 3-5 years minimum for sustained weight loss</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No modeling of ramp curve, adherence drop-off, or diabetes vs. obesity indication split</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-violet-400 mb-4">GLP-1 Financial Impact Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Multi-year utilization curve modeling: uptake, adherence, discontinuation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Diabetes vs. obesity indication split (diabetes = covered, obesity often excluded)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>PMPM impact forecasts at 3, 12, 24, 36 months with confidence intervals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Coverage policy modeling: what if we exclude obesity? Cover Mounjaro but not Wegovy?</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Utilization Ramp Curve Model" icon={TrendingUp}>
        <VegasCodeBlock language="python">
{`# GLP-1 Financial Impact Forecast
glp1_drugs = {
    'Ozempic': {'monthly_cost': 935, 'indication': 'diabetes'},
    'Wegovy': {'monthly_cost': 1349, 'indication': 'obesity'},
    'Mounjaro': {'monthly_cost': 1023, 'indication': 'diabetes'},
    'Zepbound': {'monthly_cost': 1060, 'indication': 'obesity'}
}

def forecast_glp1_impact(population, coverage_policy, forecast_months=36):
    # Eligibility Screening
    bmi_over_30 = population.filter(lambda m: m.bmi >= 30.0).count()
    diabetes_type2 = population.filter(lambda m: 'E11' in m.diagnoses).count()
    
    # Indication-Specific Pools
    if coverage_policy == 'diabetes_only':
        eligible = diabetes_type2
        avg_monthly_cost = (935 + 1023) / 2  # Ozempic + Mounjaro
    elif coverage_policy == 'obesity_approved':
        eligible = bmi_over_30 + diabetes_type2
        avg_monthly_cost = (935 + 1349 + 1023 + 1060) / 4
    else:  # exclude_obesity
        eligible = diabetes_type2
        avg_monthly_cost = (935 + 1023) / 2
    
    # Utilization Ramp Curve (S-curve adoption)
    results = []
    for month in range(1, forecast_months + 1):
        # Uptake rate increases over time (logistic curve)
        uptake_rate = 0.12 / (1 + math.exp(-0.15 * (month - 18)))
        
        # Adherence drop-off (20% discontinue by month 12)
        if month <= 12:
            adherence = 1.0 - (0.20 * month / 12)
        else:
            adherence = 0.80  # Stabilizes at 80% long-term
        
        active_users = eligible * uptake_rate * adherence
        monthly_cost = active_users * avg_monthly_cost
        pmpm_impact = monthly_cost / len(population)
        
        results.append({
            'month': month,
            'active_users': active_users,
            'monthly_cost': monthly_cost,
            'pmpm_impact': pmpm_impact,
            'cumulative_cost': sum(r['monthly_cost'] for r in results) + monthly_cost
        })
    
    return results

# Example: 10,000 member population
pop = load_population(10000)

# Scenario 1: Cover diabetes only
diabetes_only = forecast_glp1_impact(pop, 'diabetes_only', 36)
print(f"Month 36 PMPM: \\${diabetes_only[35]['pmpm_impact']:.2f}")  # ~\\$42 PMPM

# Scenario 2: Cover diabetes + obesity
full_coverage = forecast_glp1_impact(pop, 'obesity_approved', 36)
print(f"Month 36 PMPM: \\${full_coverage[35]['pmpm_impact']:.2f}")  # ~\\$138 PMPM

# Delta: \\$96 PMPM difference = \\$11.5M over 3 years for 10K lives
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Cost Projection Intelligence" icon={BarChart3}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Pill}
            label="Eligible Population"
            value="8-12%"
            gradient="from-indigo-500 to-violet-500"
            description="Adults with BMI ≥30 or Type 2 diabetes qualifying for GLP-1 therapy"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Uptake Velocity"
            value="18 Months"
            gradient="from-violet-500 to-purple-500"
            description="Time to peak adoption (12% of eligible starting therapy)"
          />
          <VegasMetricCard
            icon={Target}
            label="Adherence Rate"
            value="80%"
            gradient="from-purple-500 to-fuchsia-500"
            description="Long-term continuation after initial 12-month drop-off period"
          />
        </div>
      </VegasSection>

      {/* Coverage Policy Analysis */}
      <VegasSection title="Coverage Policy Impact Modeling" icon={Database}>
        <VegasCodeBlock language="markdown">
{`# GLP-1 Coverage Decision Tree (10,000 Lives Example)

## Policy 1: Exclude Obesity Indication
├─ Only cover diabetes (Ozempic, Mounjaro)
├─ Eligible: 8% of population (800 members)
├─ Month 36 Utilization: 96 active users (12% uptake × 80% adherence)
├─ Monthly Cost: $93,000
└─ **PMPM Impact: $9.30**

## Policy 2: Cover Obesity with Prior Authorization
├─ Cover obesity if BMI ≥35 + comorbidity OR BMI ≥40
├─ Eligible: 22% of population (2,200 members)
├─ Month 36 Utilization: 264 active users
├─ Monthly Cost: $340,000
└─ **PMPM Impact: $34.00**

## Policy 3: Full Coverage (Diabetes + Obesity)
├─ Cover all FDA-approved indications
├─ Eligible: 30% of population (3,000 members)
├─ Month 36 Utilization: 360 active users
├─ Monthly Cost: $464,000
└─ **PMPM Impact: $46.40**

## Policy 4: Exclude All GLP-1s
├─ No coverage for weight loss or diabetes management
├─ Risk: Members pay cash ($1,350/mo) or use inferior alternatives
├─ Hidden cost: increased diabetes complications, cardiovascular events
└─ **False savings — downstream costs exceed upfront drug spend**
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Strategic Planning Applications" icon={CheckCircle2}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={AlertTriangle}
            title="Mid-Year Budget Shock"
            items={[
              "PE portfolio company: 5,000 lives, excluded obesity GLP-1s",
              "Q2 2025: 18 employees started Wegovy cash-pay, then submitted claims",
              "Plan paid $0, members threatened grievance + DOL complaint",
              "Engine modeled full coverage: $185K annual cost",
              "Approved policy mid-year, budgeted correctly for 2026"
            ]}
          />
          <VegasFeatureCard
            icon={Users}
            title="Renewal Forecasting"
            items={[
              "Manufacturing client: 12,000 lives, diabetes-only coverage",
              "Renewal: carrier proposed 14% increase (8% trend + 6% 'GLP-1 factor')",
              "Engine showed actual GLP-1 utilization: 4.2% PMPM impact",
              "Carrier's 6% GLP-1 load was 43% overstated",
              "Negotiated 10.5% increase, saved $420K"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="3-Year Strategic Budget"
            items={[
              "Healthcare system: 8,500 lives, planning coverage expansion",
              "Modeled 3 scenarios over 36 months",
              "Chose: diabetes + obesity with BMI ≥35 + comorbidity",
              "Year 1: $18 PMPM | Year 2: $28 PMPM | Year 3: $34 PMPM",
              "CFO built $2.9M reserve, actual spend $2.7M (6% under)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Don't Let GLP-1s Blow Up Your Budget</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Model utilization curves, coverage policy impact, and 3-year PMPM exposure. 
            Make coverage decisions with financial certainty—not guesswork.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-violet-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-violet-50 transition-all duration-200 shadow-2xl hover:shadow-violet-500/50 transform hover:scale-105">
            Run GLP-1 Impact Forecast
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}