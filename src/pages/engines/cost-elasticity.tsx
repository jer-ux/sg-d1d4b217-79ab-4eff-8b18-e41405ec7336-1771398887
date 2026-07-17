import { TrendingUp, Database, DollarSign, AlertTriangle, CheckCircle2, Target, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function CostElasticityPage() {
  return (
    <EngineDetailLayout
      title="Cost Elasticity Engine"
      category="Member Behavior Economics"
      tagline="Model How Deductibles, Copays, and Coinsurance Drive Utilization—Predict Demand Response Before Design Changes Go Live"
      gradient="from-cyan-600 via-blue-600 to-indigo-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Unintended Consequence Risk" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Blind Cost-Share Increases</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Raise deductible $500: saves employer money, but by how much? Depends on utilization change</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Cannot predict if members delay high-value care (preventive, chronic disease management)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Wrong elasticity assumption → $2M employer savings become $400K (members avoid care entirely)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Health outcomes degrade: delayed care → worse A1C, higher ER utilization</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-cyan-400 mb-4">Elasticity-Informed Design</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Service-specific elasticity coefficients: ER (-0.32), preventive (-0.18), elective surgery (-0.55)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Income-stratified response: low earners 2.4× more price-sensitive than high earners</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Scenario modeling: test $250/$500/$1000 deductible increases before implementation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Optimize employer savings while protecting access to high-value care</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Price Sensitivity Algorithm" icon={Database}>
        <VegasCodeBlock language="python">
{`# Cost Elasticity Forecasting Engine
service_elasticity_map = {
    'preventive_care': -0.18,           # Low elasticity: critical care
    'primary_care_visit': -0.25,
    'specialist_visit': -0.35,
    'er_visit': -0.32,                 # Moderate: members defer if possible
    'urgent_care': -0.28,
    'diagnostic_imaging': -0.42,       # Higher: members skip if cost-share increases
    'elective_surgery': -0.55,         # Highest: very discretionary
    'physical_therapy': -0.48,
    'mental_health_visit': -0.38,
    'generic_rx': -0.15,               # Low: clinically necessary
    'brand_rx': -0.40,                 # Higher: members switch or skip
    'specialty_rx': -0.22              # Low-moderate: high clinical need
}

def model_elasticity_impact(current_plan, proposed_plan, population_census):
    utilization_changes = []
    
    for service, elasticity in service_elasticity_map.items():
        # Calculate cost-share change
        current_cost_share = calculate_member_cost_share(current_plan, service)
        proposed_cost_share = calculate_member_cost_share(proposed_plan, service)
        
        pct_change_cost_share = (proposed_cost_share - current_cost_share) / current_cost_share
        
        # Income stratification (low earners 2.4× more sensitive)
        income_adjusted_elasticity = {}
        for member in population_census:
            if member.salary < 50000:
                multiplier = 2.4
            elif member.salary < 80000:
                multiplier = 1.6
            elif member.salary < 120000:
                multiplier = 1.0
            else:
                multiplier = 0.6  # High earners least sensitive
            
            member_elasticity = elasticity * multiplier
            
            # Utilization change = elasticity × % cost-share change
            utilization_change = member_elasticity * pct_change_cost_share
            
            if member.id not in income_adjusted_elasticity:
                income_adjusted_elasticity[member.id] = {}
            income_adjusted_elasticity[member.id][service] = utilization_change
        
        # Aggregate population-level impact
        baseline_volume = get_service_volume(service, current_plan, population_census)
        avg_utilization_change = sum(income_adjusted_elasticity[m.id][service] 
                                     for m in population_census) / len(population_census)
        projected_volume = baseline_volume * (1 + avg_utilization_change)
        
        # Financial impact
        employer_baseline_cost = baseline_volume * get_plan_cost_per_service(service, current_plan)
        employer_projected_cost = projected_volume * get_plan_cost_per_service(service, proposed_plan)
        
        utilization_changes.append({
            'service': service,
            'elasticity': elasticity,
            'baseline_volume': baseline_volume,
            'projected_volume': projected_volume,
            'volume_change_pct': avg_utilization_change,
            'employer_cost_baseline': employer_baseline_cost,
            'employer_cost_projected': employer_projected_cost,
            'employer_savings': employer_baseline_cost - employer_projected_cost
        })
    
    # Total impact
    total_baseline_cost = sum(u['employer_cost_baseline'] for u in utilization_changes)
    total_projected_cost = sum(u['employer_cost_projected'] for u in utilization_changes)
    total_employer_savings = total_baseline_cost - total_projected_cost
    
    # Health outcome risk assessment
    high_value_services = ['preventive_care', 'primary_care_visit', 'generic_rx']
    high_value_volume_loss = sum(
        abs(u['volume_change_pct']) for u in utilization_changes 
        if u['service'] in high_value_services and u['volume_change_pct'] < 0
    ) / len(high_value_services)
    
    health_risk_score = 'HIGH' if high_value_volume_loss > 0.08 else 'MEDIUM' if high_value_volume_loss > 0.04 else 'LOW'
    
    return {
        'total_employer_savings': total_employer_savings,
        'utilization_changes': utilization_changes,
        'health_outcome_risk': health_risk_score,
        'high_value_care_impact': high_value_volume_loss,
        'recommendation': 'APPROVE' if health_risk_score == 'LOW' else 'MODIFY'
    }

# Example: Model $500 deductible increase
current = load_plan('2024')
proposed = load_plan('2024')
proposed.deductible_individual += 500
proposed.deductible_family += 1000

census = load_population_census()
result = model_elasticity_impact(current, proposed, census)

print("Projected Employer Savings: {:,.0f}".format(result['total_employer_savings']))
print("Health Outcome Risk: {}".format(result['health_outcome_risk']))
print("High-Value Care Impact: {:.1%}".format(result['high_value_care_impact']))
print("Recommendation: {}".format(result['recommendation']))

if result['recommendation'] == 'MODIFY':
    print("\\nWarning: Proposed deductible increase reduces high-value care utilization by {:.1%}".format(
        result['high_value_care_impact']))
    print("Consider exempting preventive services from deductible (value-based design)")
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Elasticity Intelligence" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={BarChart3}
            label="Service Coefficients"
            value="15+ Services"
            sublabel="preventive, primary, specialist, ER, Rx, etc."
            gradient="from-cyan-600 to-blue-600"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Income Stratification"
            value="2.4× Range"
            sublabel="low earners far more price-sensitive"
            gradient="from-blue-600 to-indigo-600"
          />
          <VegasMetricCard
            icon={DollarSign}
            label="Scenario Modeling"
            value="Pre-Launch"
            sublabel="test design changes before implementation"
            gradient="from-indigo-600 to-purple-600"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Health Protection"
            value="Risk Score"
            sublabel="flag high-value care impact"
            gradient="from-purple-600 to-fuchsia-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Strategic Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Deductible Optimization"
            items={[
              "Financial services company: 8,200 employees, needed $4M savings",
              "Proposed: $750 → $1,500 deductible (2× increase)",
              "Traditional ROI model: $4.2M employer savings (assumed no utilization change)",
              "Elasticity modeling revealed:",
              "  - Overall utilization decline: -12% (members defer care)",
              "  - Preventive care drop: -18% (high-value services impacted)",
              "  - Actual employer savings: $2.1M (50% of projected, not $4.2M)",
              "  - Health risk: HIGH (chronic disease management disrupted)",
              "Modified approach: $750 → $1,250 deductible + VBID (zero copay preventive)",
              "Results: $3.4M employer savings, LOW health risk, 89% employee approval"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Specialty Rx Tier Change"
            items={[
              "Manufacturing client: 6,500 employees, pharmacy costs up 14%",
              "Proposed: Move high-cost biologics from Tier 3 ($70 copay) to Tier 4 (30% coinsurance, avg $380)",
              "Elasticity analysis:",
              "  - Specialty Rx elasticity: -0.22 (low, clinically necessary)",
              "  - 444% cost-share increase → -97% projected fill rate drop",
              "  - Members would abandon therapy (not sustainable)",
              "Alternative tested: Tier 3 copay $70 → $120 (71% increase)",
              "  - Elasticity impact: -16% fill rate (members stay on therapy)",
              "  - Employer savings: $1.2M annually (vs. $400K from Tier 4 abandonment)",
              "Implementation outcome: saved employer money while preserving adherence"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Test Design Changes Before Launch</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Model utilization response across 15+ services. Stratify by income. Predict employer savings. Flag high-value care impact. Optimize benefit design.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-cyan-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-cyan-50 transition-all duration-200 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105">
            Model Cost Elasticity
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}