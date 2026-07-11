import { Eye, Database, TrendingUp, BarChart3, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function VisionTrendAnalysisEngine() {
  return (
    <EngineDetailLayout
      title="Vision Trend Analysis Engine"
      category="Financial & Trend"
      tagline="Predict Vision Claims with Material/Frame Upgrade Tracking and Exam Frequency Modeling"
      gradient="from-emerald-600 via-teal-600 to-cyan-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Vision Benefit Blind Spot" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Flat-Rate Vision Pricing</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Carriers charge $6-8 PMPM regardless of your material upgrade patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No insight into progressive lens adoption vs. single vision usage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot predict contact lens reimbursement impact when adding that benefit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Utilization rate assumptions static (50% exam, 40% materials) despite demographics</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">Vision Trend Intelligence</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Material-level tracking: single vision $85, progressive $220, premium progressive $380</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Upgrade trend: aging workforce shifts to progressives (+$135 per member shift)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Contact lens impact: adding reimbursement adds $2.20 PMPM (12% uptake at $220 annual)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Demographic modeling: 25-35 age bracket = 35% utilization, 45+ = 68% utilization</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Vision Utilization Model" icon={Eye}>
        <VegasCodeBlock language="python">
{`# Vision Trend Forecasting Framework
vision_service_types = {
    'exam': {'base_cost': 45, 'frequency_annual': 0.52},
    'single_vision': {'base_cost': 85, 'upgrade_rate': 0.35},
    'progressive': {'base_cost': 220, 'upgrade_rate': 0.25},
    'premium_progressive': {'base_cost': 380, 'upgrade_rate': 0.08},
    'contacts': {'base_cost': 220, 'utilization_rate': 0.12},
    'frames': {'allowance': 150, 'out_of_pocket_avg': 45}
}

def calculate_vision_pmpm_by_age(population_demographics, benefit_design):
    """
    Forecast vision PMPM based on age distribution and material choices
    """
    total_cost = 0
    total_members = 0
    
    for age_band, member_count in population_demographics.items():
        # Age-based utilization rates
        if age_band == '18-25':
            exam_util = 0.35
            materials_util = 0.28
            progressive_pct = 0.02
        elif age_band == '26-35':
            exam_util = 0.42
            materials_util = 0.35
            progressive_pct = 0.08
        elif age_band == '36-45':
            exam_util = 0.58
            materials_util = 0.48
            progressive_pct = 0.35
        elif age_band == '46-55':
            exam_util = 0.68
            materials_util = 0.62
            progressive_pct = 0.75
        else:  # 56+
            exam_util = 0.72
            materials_util = 0.68
            progressive_pct = 0.85
        
        # Calculate costs for this age band
        exam_cost = member_count * exam_util * vision_service_types['exam']['base_cost']
        
        # Materials mix
        materials_users = member_count * materials_util
        progressive_users = materials_users * progressive_pct
        single_vision_users = materials_users * (1 - progressive_pct)
        
        materials_cost = (
            single_vision_users * vision_service_types['single_vision']['base_cost'] +
            progressive_users * vision_service_types['progressive']['base_cost']
        )
        
        # Contacts (if benefit includes)
        if benefit_design['contacts_allowance'] > 0:
            contacts_cost = member_count * vision_service_types['contacts']['utilization_rate'] * \
                          vision_service_types['contacts']['base_cost']
        else:
            contacts_cost = 0
        
        total_cost += exam_cost + materials_cost + contacts_cost
        total_members += member_count
    
    pmpm = total_cost / (total_members * 12)
    
    return pmpm

def forecast_benefit_change_impact(baseline_pmpm, change_type):
    """
    Model impact of vision benefit design changes
    """
    impacts = {
        'add_contact_lens_allowance': 1.32,  # +32% ($220 allowance, 12% utilization)
        'increase_frame_allowance_150_to_200': 1.08,  # +8% (members upgrade frames)
        'add_lasik_discount': 1.00,  # 0% (discount program, no plan cost)
        'increase_exam_frequency_24mo_to_12mo': 1.45,  # +45% (doubles eligible exams)
        'progressive_upgrade_incentive': 0.95  # -5% (negotiate better progressive pricing)
    }
    
    new_pmpm = baseline_pmpm * impacts[change_type]
    
    return {
        'baseline': baseline_pmpm,
        'change': change_type,
        'projected_pmpm': new_pmpm,
        'impact_pct': (impacts[change_type] - 1) * 100
    }

# Example: Workforce Aging Impact
# 2023 Demographics:
#   - 18-35: 45% of workforce
#   - 36-55: 40%
#   - 56+: 15%
#   - PMPM: $6.20
#
# 2028 Demographics (5 years later):
#   - 18-35: 35% (lower hiring)
#   - 36-55: 45%
#   - 56+: 20%
#   - Progressive lens usage: 35% → 52%
#   - Projected PMPM: $8.40 (+35% from demographic shift alone)
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Vision Cost Drivers" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Eye}
            label="Exam Utilization"
            value="50-55%"
            gradient="from-emerald-500 to-teal-500"
            description="Percentage of members getting annual eye exams"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Progressive Adoption"
            value="+4% YoY"
            gradient="from-teal-500 to-cyan-500"
            description="Workforce aging drives progressive lens growth"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Contact Lens Impact"
            value="+$2.20 PMPM"
            gradient="from-cyan-500 to-sky-500"
            description="Typical cost when adding $220 contact allowance"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Vision Benefit Strategy" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Contact Lens Allowance Decision"
            items={[
              "Baseline: $6.80 PMPM, 1,200 employees, no contact benefit",
              "Employees requesting $220 annual contact lens allowance",
              "Uptake model: 12% adoption (144 employees)",
              "Cost: 144 × $220 / 14,400 member-months = +$2.20 PMPM",
              "New PMPM: $9.00 (32% increase). Approved as retention tool for younger employees"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Demographic Shift Forecasting"
            items={[
              "2024: 38% progressive users, $7.20 PMPM",
              "Actuarial projection: workforce aging 2% per year (boomers delaying retirement)",
              "2029: 52% progressive users (progressive cost $220 vs. single $85)",
              "Materials PMPM: $4.20 → $5.85 (+39% from mix shift alone)",
              "Total vision PMPM: $7.20 → $9.10 (5-year compound 4.8% annually)"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Network vs. Out-of-Network"
            items={[
              "VSP network: $6.80 PMPM, 85% in-network utilization",
              "Switch to EyeMed: quoted $6.20 PMPM, smaller network",
              "Out-of-network usage concern: 25% vs. 15% current",
              "Engine models: OON reimbursement $40 lower on progressives",
              "Decision: stay with VSP, broader access worth $0.60 PMPM premium"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">See Your Vision Costs Clearly</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Track material upgrade patterns. Model demographic aging impact. 
            Forecast benefit design changes before renewal.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-teal-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-teal-50 transition-all duration-200 shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105">
            Analyze Vision Trend
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}