import { Smile, Database, TrendingUp, BarChart3, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function DentalTrendAnalysisEngine() {
  return (
    <EngineDetailLayout
      title="Dental Trend Analysis Engine"
      category="Financial & Trend"
      tagline="Predict Dental Claims Trend with Utilization Pattern Recognition and Benefit Design Impact Modeling"
      gradient="from-sky-600 via-blue-600 to-indigo-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Dental Benefit Black Box" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Generic Dental Pricing</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Carriers apply flat 3-5% trend regardless of your population's utilization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No visibility into preventive vs. restorative vs. major service mix shifts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Benefit design changes (adding ortho, raising maximums) impact ignored in renewal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot forecast impact of network changes or fee schedule adjustments</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-sky-400 mb-4">Dental Trend Intelligence</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sky-400 mt-1">✓</span>
                <span>Service-level trending: preventive +2%, restorative +4%, major +6%, ortho +8%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 mt-1">✓</span>
                <span>Utilization pattern analysis: new workforce driving preventive uptake vs. aging driving major</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 mt-1">✓</span>
                <span>Benefit design impact: adding ortho coverage adds $8-12 PMPM in year 1</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 mt-1">✓</span>
                <span>Network leverage: DPPO vs. DHO vs. discount plans compared on unit cost</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Service Category Decomposition" icon={Smile}>
        <VegasCodeBlock language="python">
{`# Dental Trend Decomposition Model
dental_service_categories = {
    'preventive': ['D1110', 'D1120', 'D1208'],  # Cleanings, fluoride, exams
    'basic_restorative': ['D2140', 'D2150', 'D2160'],  # Fillings, amalgams
    'endodontics': ['D3310', 'D3320', 'D3330'],  # Root canals
    'periodontics': ['D4210', 'D4240', 'D4260'],  # Gum treatments
    'major_restorative': ['D2740', 'D2750', 'D2790'],  # Crowns, bridges
    'oral_surgery': ['D7140', 'D7210', 'D7250'],  # Extractions
    'orthodontics': ['D8080', 'D8090']  # Braces, aligners
}

def analyze_dental_trend(claims_current, claims_prior):
    """
    Decompose dental trend into unit cost, utilization, and mix shift
    """
    trend_components = {}
    
    for category, cdt_codes in dental_service_categories.items():
        # Filter claims to category
        current_cat = claims_current[claims_current.cdt_code.isin(cdt_codes)]
        prior_cat = claims_prior[claims_prior.cdt_code.isin(cdt_codes)]
        
        # Calculate metrics
        current_pmpm = current_cat.allowed.sum() / member_months_current
        prior_pmpm = prior_cat.allowed.sum() / member_months_prior
        
        current_util = len(current_cat) / member_months_current  # Services PMPM
        prior_util = len(prior_cat) / member_months_prior
        
        current_unit = current_cat.allowed.mean()
        prior_unit = prior_cat.allowed.mean()
        
        # Trend decomposition
        unit_cost_trend = (current_unit / prior_unit) - 1
        utilization_trend = (current_util / prior_util) - 1
        total_trend = (current_pmpm / prior_pmpm) - 1
        
        trend_components[category] = {
            'pmpm_current': current_pmpm,
            'pmpm_prior': prior_pmpm,
            'total_trend': total_trend,
            'unit_cost_trend': unit_cost_trend,
            'utilization_trend': utilization_trend
        }
    
    return trend_components

def forecast_benefit_design_change(baseline_pmpm, change_type):
    """
    Predict impact of benefit design modifications
    """
    impact_factors = {
        'add_ortho': 1.25,  # +25% increase (ages 8-18 pent-up demand)
        'increase_annual_max_1500_to_2000': 1.04,  # +4% (major service utilization)
        'reduce_preventive_copay_to_zero': 1.02,  # +2% (utilization increase)
        'add_implant_coverage': 1.08,  # +8% (high unit cost, moderate uptake)
        'switch_DPPO_to_DHO': 0.88  # -12% (network discount improvement)
    }
    
    new_pmpm = baseline_pmpm * impact_factors[change_type]
    
    return {
        'baseline_pmpm': baseline_pmpm,
        'change': change_type,
        'projected_pmpm': new_pmpm,
        'dollar_impact': new_pmpm - baseline_pmpm,
        'percent_impact': impact_factors[change_type] - 1
    }

# Example: Multi-Year Dental Trend
# 2023: $42 PMPM
#   - Preventive: $18 (43%)
#   - Basic Restorative: $12 (29%)
#   - Major: $10 (24%)
#   - Ortho: $2 (5%)
#
# 2024: $45 PMPM (+7.1% total trend)
#   - Preventive: $19 (+5.6% — utilization up 3%, unit cost +2.5%)
#   - Basic: $13 (+8.3% — unit cost driven, fee schedule increase)
#   - Major: $11 (+10% — aging workforce, more crowns)
#   - Ortho: $2 (flat — no new ortho benefit additions)
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Dental Trend Drivers" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Smile}
            label="Preventive Utilization"
            value="65-75%"
            gradient="from-sky-500 to-blue-500"
            description="Percentage of members using preventive services annually"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Major Service Growth"
            value="+6-8% YoY"
            gradient="from-blue-500 to-indigo-500"
            description="Crowns, bridges, implants trend highest"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Ortho Impact"
            value="+$8-12 PMPM"
            gradient="from-indigo-500 to-purple-500"
            description="First-year utilization when adding orthodontic coverage"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Dental Benefit Optimization" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Ortho Coverage Decision"
            items={[
              "CFO considering adding ortho benefit for retention",
              "Baseline: $42 PMPM dental, 850 employees (180 children ages 8-18)",
              "Ortho uptake model: 25% of eligible children in year 1",
              "Cost: 45 kids × $4,500 avg = $202K / 10,200 member-months = +$19.80 PMPM",
              "New PMPM: $61.80 (47% increase). CFO deferred, focused on retention via other benefits"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Network Strategy Analysis"
            items={[
              "Current: DPPO network, $48 PMPM",
              "Alternative: Switch to DHO (Delta Dental HMO), quoted $38 PMPM",
              "Engine validates: DHO fee schedule 18% lower on major services",
              "Utilization risk: DHO primary care dentist requirement reduces access",
              "Decision: hybrid plan (DPPO for major, DHO pricing for basic)"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Utilization Pattern Shift"
            items={[
              "2023: Preventive 68% utilization, Major 12%, Ortho 0%",
              "2024: Preventive 72%, Major 14%, Ortho 3% (new benefit)",
              "Trend: +11% PMPM ($42 → $46.62)",
              "Decomposition: 4% unit cost, 3% utilization, 4% mix shift (ortho)",
              "Carrier quoted +5% flat trend — actual was +11% due to ortho adoption"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Forecast Your Dental Trend with Precision</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Decompose dental trend by service category. Model benefit design changes before implementing. 
            Compare network options on unit cost and utilization.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105">
            Analyze Dental Trend
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}