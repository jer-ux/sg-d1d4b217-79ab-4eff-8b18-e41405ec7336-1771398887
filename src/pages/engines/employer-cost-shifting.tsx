import { TrendingDown, Database, DollarSign, AlertTriangle, CheckCircle2, Target, BarChart3, Users, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function EmployerCostShiftingPage() {
  return (
    <EngineDetailLayout
      title="Employer Cost Shifting Engine"
      category="Strategic Finance"
      tagline="Model Income-Tiered Contributions, Value-Based Design, and Pharmacy Realignment—Shift Costs Strategically, Not Blindly"
      gradient="from-amber-600 via-orange-600 to-red-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Blunt-Force Cost Shift" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Traditional Cost Shifting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Across-the-board deductible increases hit low earners hardest</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Cannot quantify retention risk per dollar shifted</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Delayed care from cost barriers → worse health outcomes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Employee morale damage disproportionate to employer savings</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-amber-400 mb-4">Strategic Cost Shifting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-amber-400">✓</span>
                <span>Income-tiered contributions: shift burden to high earners who can absorb it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400">✓</span>
                <span>Value-based design: zero cost-share for high-value care, higher for low-value</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400">✓</span>
                <span>Pharmacy tier realignment: shift where therapeutic alternatives exist</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400">✓</span>
                <span>3-5× better employer savings per unit of member friction</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Strategic Shift Optimizer" icon={Database}>
        <VegasCodeBlock language="python">
{`# Employer Cost Shifting Optimizer
def optimize_cost_shifting(current_plan, target_savings, workforce_demographics):
    shift_levers = []
    
    # Lever 1: Income-Tiered Contributions
    income_bands = [
        {'max_salary': 50000, 'contribution_pct': 0.0},   # Protect low earners
        {'max_salary': 80000, 'contribution_pct': 1.5},
        {'max_salary': 120000, 'contribution_pct': 2.5},
        {'max_salary': float('inf'), 'contribution_pct': 3.5}  # Executives absorb most
    ]
    
    tiered_savings = 0
    for band in income_bands:
        employees_in_band = workforce_demographics.filter(
            salary__lte=band['max_salary'],
            salary__gt=previous_band_max if band != income_bands[0] else 0
        )
        employee_premium = current_plan.annual_premium / 12
        monthly_shift = employee_premium * (band['contribution_pct'] / 100)
        tiered_savings += monthly_shift * len(employees_in_band) * 12
    
    shift_levers.append({
        'name': 'Income-Tiered Contributions',
        'annual_savings': tiered_savings,
        'member_friction': 'LOW',  # High earners can absorb, low earners protected
        'retention_risk': 'MINIMAL',
        'implementation_complexity': 'MEDIUM'
    })
    
    # Lever 2: Value-Based Plan Design
    vbid_changes = {
        'preventive_care': {'current_copay': 25, 'new_copay': 0, 'utilization_change': 1.12},
        'chronic_rx': {'current_copay': 10, 'new_copay': 0, 'utilization_change': 1.08},
        'brand_rx_generic_alt': {'current_copay': 35, 'new_copay': 70, 'utilization_change': 0.60},
        'er_non_urgent': {'current_copay': 150, 'new_copay': 350, 'utilization_change': 0.75}
    }
    
    vbid_net_savings = 0
    for service, params in vbid_changes.items():
        current_cost = estimate_annual_cost(service, current_plan)
        copay_shift = (params['new_copay'] - params['current_copay']) * params['utilization_change']
        volume = estimate_service_volume(service, current_plan)
        vbid_net_savings += copay_shift * volume
    
    shift_levers.append({
        'name': 'Value-Based Plan Design',
        'annual_savings': vbid_net_savings,
        'member_friction': 'LOW',  # Better access to high-value care
        'retention_risk': 'MINIMAL',
        'health_outcome_impact': 'POSITIVE'  # Encourages appropriate utilization
    })
    
    # Lever 3: Pharmacy Tier Realignment
    tier_shifts = [
        {'drug': 'Insulin Brand A', 'from_tier': 2, 'to_tier': 3, 'biosimilar_protected': True},
        {'drug': 'Statin Brand B', 'from_tier': 2, 'to_tier': 3, 'generic_alternative': True}
    ]
    
    tier_savings = 0
    for shift in tier_shifts:
        annual_rx_cost = lookup_drug_cost(shift['drug'], current_plan)
        tier_2_copay = 35
        tier_3_copay = 70
        switch_rate = 0.65  # 65% switch to lower-cost alternative
        tier_savings += (tier_3_copay - tier_2_copay) * annual_rx_cost['fills'] * switch_rate
    
    shift_levers.append({
        'name': 'Pharmacy Tier Realignment',
        'annual_savings': tier_savings,
        'member_friction': 'MEDIUM',  # Some member confusion
        'therapeutic_protection': 'MAINTAINED',  # Alternatives available
        'communication_required': True
    })
    
    # Rank by savings-to-friction ratio
    for lever in shift_levers:
        friction_score = {'LOW': 1, 'MEDIUM': 2, 'HIGH': 3}[lever['member_friction']]
        lever['efficiency_ratio'] = lever['annual_savings'] / friction_score
    
    shift_levers.sort(key=lambda x: x['efficiency_ratio'], reverse=True)
    
    # Build recommendation to hit target
    cumulative_savings = 0
    recommended_levers = []
    for lever in shift_levers:
        if cumulative_savings < target_savings:
            recommended_levers.append(lever)
            cumulative_savings += lever['annual_savings']
    
    return {
        'target_savings': target_savings,
        'total_savings': cumulative_savings,
        'recommended_levers': recommended_levers,
        'employee_impact_score': sum(1 for l in recommended_levers if l['member_friction'] == 'LOW') / len(recommended_levers)
    }

# Example: Close $5M budget gap
result = optimize_cost_shifting(
    current_plan=load_plan('2024'),
    target_savings=5000000,
    workforce_demographics=load_census()
)

print("Recommended Cost Shifts to Close 5M Gap:")
for lever in result['recommended_levers']:
    print("  {}: {:,.0f} ({} friction)".format(
        lever['name'], lever['annual_savings'], lever['member_friction']))
print("Total Savings: {:,.0f}".format(result['total_savings']))
print("Low-Friction Levers: {:.0%}".format(result['employee_impact_score']))
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Strategic Shift Intelligence" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={DollarSign}
            label="Shift Mechanisms"
            value="12 Levers"
            sublabel="income-tiered, VBID, pharmacy, spousal, etc."
            gradient="from-amber-600 to-orange-600"
          />
          <VegasMetricCard
            icon={Users}
            label="Friction Analysis"
            value="Per-Dollar"
            sublabel="member impact quantified by income/age/health"
            gradient="from-orange-600 to-red-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Efficiency Ratio"
            value="3-5×"
            sublabel="better vs. blunt deductible increases"
            gradient="from-red-600 to-rose-600"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Health Outcomes"
            value="Protected"
            sublabel="VBID maintains/improves access to high-value care"
            gradient="from-rose-600 to-pink-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Strategic Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Budget Gap Response"
            items={[
              "Technology company: needed to close $4.2M healthcare cost gap",
              "Traditional approach: $750 deductible increase across-the-board",
              "Model showed: 52% employee approval, HIGH retention risk in talent-critical roles",
              "Strategic approach implemented:",
              "  - Income-tiered contributions (0-3% of salary): $2.8M",
              "  - Pharmacy tier realignment (biosimilars protected): $900K",
              "  - VBID (zero copay preventive, higher ER non-urgent): $600K",
              "Total savings: $4.3M (hit target)",
              "Employee approval: 89% (vs. 52% for deductible increase)",
              "Turnover impact: zero change vs. projected 4% increase"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Union Negotiation"
            items={[
              "Manufacturing client: 3,200 employees, collective bargaining",
              "Union demanded: zero premium increases, richer benefits",
              "Company needed: $1.8M annual savings or wage freeze",
              "Strategic shift modeling:",
              "  - Eliminated spousal surcharge ($400/month penalty): -$1.5M cost",
              "  - Added value-based incentives for preventive completion: +$700K savings",
              "  - Net employer savings: $1.8M (hit target)",
              "Union outcome: accepted proposal unanimously",
              "Health impact: primary care access up 22%, A1C control improved 14%",
              "Labor relations: preserved 3-year peace, avoided 6-week strike"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Shifting Costs Blindly</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Model 12 shift mechanisms. Rank by efficiency ratio. Hit your savings target with minimal member friction. Protect health outcomes. Preserve talent retention.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-amber-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-amber-50 transition-all duration-200 shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105">
            Optimize Cost Shifting
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}