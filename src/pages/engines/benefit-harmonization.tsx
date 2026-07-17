import { Users, Database, TrendingUp, AlertTriangle, CheckCircle2, Target, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function BenefitHarmonizationPage() {
  return (
    <EngineDetailLayout
      title="Benefit Harmonization Engine"
      category="M&A & PE Strategy"
      tagline="Model Post-Merger Benefit Integration—Quantify Cost of Leveling Up vs. Grandfathering vs. Tiered Harmonization"
      gradient="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $12M Integration Blind Spot" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Ad Hoc Benefit Integration</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Post-merger: "Level everyone to the richer plan" with zero cost modeling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Cannot quantify cost difference between grandfathering vs. harmonization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>No analysis of utilization changes when copays/deductibles shift</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Employee relations pressure forces upward harmonization ("fairness" = most expensive path)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-violet-400 mb-4">Harmonization Modeling Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-violet-400">✓</span>
                <span>Model 5 harmonization scenarios: status quo, level up, level down, tiered, custom hybrid</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400">✓</span>
                <span>Quantify induced demand: richer benefits → 8-15% utilization increase</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400">✓</span>
                <span>Cost-neutral harmonization: find the balanced middle ground between legacy plans</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400">✓</span>
                <span>3-year TCO with utilization elasticity, not just premium math</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Multi-Scenario Harmonization Model" icon={Database}>
        <VegasCodeBlock language="python">
{`# Benefit Harmonization Modeling
def model_harmonization_scenarios(legacy_plan_a, legacy_plan_b, combined_population):
    scenarios = {}
    
    # Scenario 1: Status Quo (Grandfather both plans)
    scenarios['status_quo'] = {
        'plan_a_cost': legacy_plan_a.annual_pmpy * legacy_plan_a.member_count,
        'plan_b_cost': legacy_plan_b.annual_pmpy * legacy_plan_b.member_count,
        'total_cost': (legacy_plan_a.annual_pmpy * legacy_plan_a.member_count) + 
                      (legacy_plan_b.annual_pmpy * legacy_plan_b.member_count),
        'admin_complexity': 'HIGH',  # Dual plan administration
        'employee_perception': 'NEGATIVE'  # Inequity concerns
    }
    
    # Scenario 2: Level Up (Everyone to richer plan)
    richer_plan = legacy_plan_a if legacy_plan_a.annual_pmpy > legacy_plan_b.annual_pmpy else legacy_plan_b
    
    # Induced demand: richer benefits increase utilization
    induced_demand_factor = calculate_utilization_elasticity(
        old_plan=legacy_plan_b if richer_plan == legacy_plan_a else legacy_plan_a,
        new_plan=richer_plan
    )  # Returns 1.08-1.15 (8-15% utilization increase)
    
    scenarios['level_up'] = {
        'total_cost': (richer_plan.annual_pmpy * combined_population.total_members * induced_demand_factor),
        'cost_increase': scenarios['status_quo']['total_cost'] * (induced_demand_factor - 1),
        'admin_complexity': 'LOW',  # Single plan
        'employee_perception': 'POSITIVE'  # Everyone wins
    }
    
    # Scenario 3: Level Down (Everyone to leaner plan)
    leaner_plan = legacy_plan_a if legacy_plan_a.annual_pmpy < legacy_plan_b.annual_pmpy else legacy_plan_b
    
    # Reverse elasticity: worse benefits suppress utilization (but not 1:1)
    suppression_factor = 0.95  # Conservative 5% utilization reduction
    
    scenarios['level_down'] = {
        'total_cost': (leaner_plan.annual_pmpy * combined_population.total_members * suppression_factor),
        'cost_savings': scenarios['status_quo']['total_cost'] - (leaner_plan.annual_pmpy * combined_population.total_members * suppression_factor),
        'admin_complexity': 'LOW',
        'employee_perception': 'VERY_NEGATIVE',  # Half the workforce gets worse benefits
        'retention_risk': 'HIGH'
    }
    
    # Scenario 4: Tiered Harmonization (Job grade tiers)
    executive_tier = design_plan(deductible=500, oop_max=3000, copay_specialist=30)
    manager_tier = design_plan(deductible=1500, oop_max=5000, copay_specialist=50)
    employee_tier = design_plan(deductible=2500, oop_max=7000, copay_specialist=75)
    
    scenarios['tiered'] = {
        'total_cost': (
            (executive_tier.pmpy * combined_population.executives) +
            (manager_tier.pmpy * combined_population.managers) +
            (employee_tier.pmpy * combined_population.employees)
        ),
        'admin_complexity': 'MEDIUM',
        'employee_perception': 'MIXED'  # Transparency around tiers required
    }
    
    # Scenario 5: Cost-Neutral Hybrid (Find the middle)
    target_cost = scenarios['status_quo']['total_cost']
    hybrid_plan = optimize_plan_design(
        target_pmpy=target_cost / combined_population.total_members,
        constraints={
            'min_deductible': min(legacy_plan_a.deductible, legacy_plan_b.deductible),
            'max_deductible': max(legacy_plan_a.deductible, legacy_plan_b.deductible),
            'preserve_rx_coverage': True
        }
    )
    
    scenarios['cost_neutral_hybrid'] = {
        'total_cost': target_cost,
        'plan_design': hybrid_plan,
        'admin_complexity': 'LOW',
        'employee_perception': 'NEUTRAL',  # Nobody gets everything, nobody loses everything
        'recommended': True
    }
    
    return scenarios

# Example Output:
# Company A (2,400 employees, $9,200 PMPY, $500 deductible)
# Company B (1,600 employees, $11,800 PMPY, $1,500 deductible)
# 
# Status Quo: $41.0M total
# Level Up: $51.2M (+$10.2M, 25% increase due to induced demand)
# Level Down: $36.8M (-$4.2M savings, HIGH retention risk)
# Tiered: $43.5M (+$2.5M, MEDIUM complexity)
# Cost-Neutral Hybrid: $41.0M (balanced design: $1,000 deductible)
# 
# Recommendation: Cost-Neutral Hybrid
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Integration Intelligence" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={Users}
            label="Scenarios Modeled"
            value="5 Paths"
            sublabel="status quo, level up/down, tiered, hybrid"
            gradient="from-violet-600 to-purple-600"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Utilization Elasticity"
            value="8-15%"
            sublabel="induced demand from richer benefits"
            gradient="from-purple-600 to-fuchsia-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Cost Variance"
            value="±25%"
            sublabel="between level up vs. level down"
            gradient="from-fuchsia-600 to-pink-600"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Optimal Path"
            value="Data-Driven"
            sublabel="cost + retention + perception"
            gradient="from-pink-600 to-rose-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Post-Merger Integration" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Manufacturing Merger"
            items={[
              "Acquirer: 2,400 employees, $9,200 PMPY, $500 deductible, 20% coinsurance",
              "Target: 1,600 employees, $11,800 PMPY, $1,500 deductible, 10% coinsurance",
              "HR proposed: level everyone to target's plan ($11,800 PMPY)",
              "Model showed: +$10.2M cost (25% increase) due to induced demand",
              "Implemented: cost-neutral hybrid ($10,250 PMPY, $1,000 deductible, 15% coinsurance)",
              "3-year savings vs. level-up: $28.4M",
              "Employee satisfaction: 78% approval (balanced fairness)"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="PE Roll-Up Strategy"
            items={[
              "Platform: 3 acquisitions over 18 months, each with different benefit designs",
              "Status quo cost: $62M annually across 5,200 employees",
              "Level-up scenario: $78M (+$16M, 26% increase)",
              "Implemented: tiered harmonization by job family",
              "Executives (8%): premium plan ($14K PMPY)",
              "Managers (22%): mid-tier ($11.5K PMPY)",
              "Employees (70%): standard ($9.8K PMPY)",
              "Total cost: $64.2M (+3.5% vs. status quo, acceptable for simplification)",
              "Admin savings: $420K annually (consolidated to single carrier)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Model Every Harmonization Path Before You Commit</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't let HR pressure force you into upward harmonization. Model 5 scenarios. Quantify induced demand. Find the cost-neutral middle. Turn benefit integration into a strategic advantage.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-violet-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-violet-50 transition-all duration-200 shadow-2xl hover:shadow-violet-500/50 transform hover:scale-105">
            Model Harmonization Scenarios
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}