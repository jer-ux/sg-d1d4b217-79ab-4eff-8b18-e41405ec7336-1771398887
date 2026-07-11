import { Users, Database, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function AgeGenderRiskAdjustmentEngine() {
  return (
    <EngineDetailLayout
      title="Age/Gender Risk Adjustment Engine"
      category="Financial & Trend"
      tagline="Normalize Healthcare Costs for Demographic Mix—Compare Young Tech Workforce to Aging Manufacturing Plant"
      gradient="from-purple-600 via-violet-600 to-fuchsia-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Demographic Distortion" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Unadjusted Comparisons</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Tech startup (avg age 28): $6K PMPY. Manufacturing (avg age 52): $11K PMPY. Which is well-managed?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Trend analysis contaminated by workforce aging, retirement waves, new hires</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot benchmark against industry peers with different age profiles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Gender mix ignored: female cohorts cost 30% more (pregnancy, preventive care)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-purple-400 mb-4">Age/Gender Risk Adjustment</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>5-year age band + gender risk factors: Male 50-54 = 1.82x baseline</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Apples-to-apples: Tech $7.2K adjusted, Mfg $9.8K adjusted (both normalized to national avg age/gender mix)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Clean trend: workforce aging impact separated from utilization/pricing changes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Pregnancy cost isolation: childbearing-age female cohorts treated separately</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Demographic Risk Scoring" icon={Users}>
        <VegasCodeBlock language="python">
{`# Age/Gender Risk Adjustment Model
age_gender_factors = {
    'M_0-4': 0.52, 'F_0-4': 0.48,
    'M_5-9': 0.28, 'F_5-9': 0.26,
    'M_10-14': 0.31, 'F_10-14': 0.35,
    'M_15-19': 0.42, 'F_15-19': 0.58,
    'M_20-24': 0.48, 'F_20-24': 0.91,  # Female pregnancy costs
    'M_25-29': 0.51, 'F_25-29': 1.12,
    'M_30-34': 0.58, 'F_30-34': 1.24,
    'M_35-39': 0.69, 'F_35-39': 1.18,
    'M_40-44': 0.84, 'F_40-44': 1.08,
    'M_45-49': 1.12, 'F_45-49': 1.22,
    'M_50-54': 1.48, 'F_50-54': 1.42,
    'M_55-59': 1.95, 'F_55-59': 1.78,
    'M_60-64': 2.58, 'F_60-64': 2.24,
    'M_65+': 3.12, 'F_65+': 2.88
}

def calculate_risk_adjusted_costs(population):
    # Calculate Population Risk Score
    total_risk = 0
    for member in population:
        age_band = get_age_band(member.age)
        gender = member.gender
        risk_factor = age_gender_factors[f'{gender}_{age_band}']
        total_risk += risk_factor
    
    avg_risk = total_risk / len(population)
    
    # Risk-Adjust Actual Costs
    actual_costs_pmpy = calculate_total_costs(population) / len(population)
    risk_adjusted_costs = actual_costs_pmpy / avg_risk
    
    return {
        'population_size': len(population),
        'avg_age': calculate_avg_age(population),
        'pct_female': calculate_female_pct(population),
        'population_risk_score': avg_risk,
        'actual_costs_pmpy': actual_costs_pmpy,
        'risk_adjusted_costs_pmpy': risk_adjusted_costs
    }

# Example: Two Populations
# Tech Startup:
#   - Avg age: 28, 45% female
#   - Population risk score: 0.72
#   - Actual PMPY: $6,000
#   - Risk-adjusted PMPY: $8,333 ($6K / 0.72)
#
# Manufacturing:
#   - Avg age: 52, 25% female
#   - Population risk score: 1.55
#   - Actual PMPY: $11,000
#   - Risk-adjusted PMPY: $7,097 ($11K / 1.55)
#
# Conclusion: Manufacturing is MORE efficient when adjusted
# for their older, higher-risk workforce
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Demographic Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Users}
            label="Risk Bands"
            value="14 x 2"
            gradient="from-purple-500 to-violet-500"
            description="14 age bands x 2 genders = 28 risk factors"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Cost Variance"
            value="6.5x Range"
            gradient="from-violet-500 to-fuchsia-500"
            description="Male 65+ costs 6.5x more than child under 10"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Adjustment Precision"
            value="±2% PMPY"
            gradient="from-fuchsia-500 to-pink-500"
            description="Accurate demographic normalization"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Fair Performance Assessment" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Startup vs. Legacy Comparison"
            items={[
              "SaaS company (avg age 29): $6.2K PMPY actual",
              "Legacy manufacturer (avg age 53): $11.8K PMPY actual",
              "After risk adjustment: SaaS $8.6K, Legacy $7.6K",
              "Legacy is actually 12% MORE efficient",
              "Focus improvement on SaaS health management"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Workforce Aging Trend"
            items={[
              "2023: Avg age 44, $9.2K PMPY",
              "2024: Avg age 46, $10.5K PMPY (+14% raw trend)",
              "2023 risk-adjusted: $9.4K, 2024 risk-adjusted: $9.8K",
              "True trend: +4.3% (not +14%)",
              "10% of apparent trend was just workforce aging"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Pregnancy Cost Isolation"
            items={[
              "Female 25-34 cohort: $14.5K PMPY (high pregnancy costs)",
              "Separated pregnancy costs: $3.2K PMPY avg",
              "Non-pregnancy costs: $11.3K PMPY",
              "Benchmark female 25-34 non-pregnancy: $11.8K",
              "Actually 4% below benchmark for non-maternity care"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Penalizing Employers for Their Demographics</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Adjust for age/gender mix using 28-factor risk model. Compare apples-to-apples across different workforce profiles. 
            Separate aging from performance.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-violet-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-violet-50 transition-all duration-200 shadow-2xl hover:shadow-violet-500/50 transform hover:scale-105">
            Risk-Adjust Costs
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}