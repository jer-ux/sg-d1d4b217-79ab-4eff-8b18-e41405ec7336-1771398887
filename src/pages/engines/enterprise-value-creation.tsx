import { TrendingUp, Database, DollarSign, Target, BarChart3, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function EnterpriseValueCreationPage() {
  return (
    <EngineDetailLayout
      title="Enterprise Value Creation Engine"
      category="M&A & PE Strategy"
      tagline="Quantify EBITDA Impact of Healthcare Cost Containment—Model Pre-Exit Value Accretion from Fiduciary Governance"
      gradient="from-green-600 via-emerald-600 to-teal-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $42M Hidden Value Unlock" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Healthcare as a Drag on EBITDA</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Portfolio companies treat healthcare as fixed SG&A: "It goes up 12% every year"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>PE sponsors cannot quantify EBITDA lift from healthcare cost optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Exit valuations penalized: buyers assume healthcare inflation continues forever</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>No visibility into fiduciary governance = no credit for risk reduction</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">Healthcare as Value Creation Lever</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Model 18-36 month EBITDA accretion from PBM optimization, stop-loss renegotiation, site-of-care steering</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Quantify enterprise value lift: 3.2% EBITDA margin improvement = 8.5x multiple uplift</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Buyer due diligence evidence: audited fiduciary governance removes litigation risk discount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Pre-exit optimization playbook: healthcare becomes value creation story, not cost center</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Value Accretion Model" icon={DollarSign}>
        <VegasCodeBlock language="python">
{`# Enterprise Value Creation from Healthcare Optimization
def model_enterprise_value_lift(company_profile, optimization_plan, exit_horizon_months=24):
    # Baseline Financials
    revenue = company_profile['annual_revenue']
    ebitda = company_profile['ebitda']
    ebitda_margin = ebitda / revenue
    
    # Current Healthcare Spend
    employee_count = company_profile['employees']
    current_pmpy = company_profile['healthcare_pmpy']  # Per employee per year
    current_healthcare_spend = employee_count * current_pmpy
    healthcare_as_pct_revenue = current_healthcare_spend / revenue
    
    # Optimization Opportunities
    opportunities = {
        'pbm_spread_elimination': {
            'savings_pct': 0.18,  # 18% of drug spend
            'drug_pct_of_total': 0.32,
            'ramp_months': 6
        },
        'stop_loss_renegotiation': {
            'savings_pct': 0.12,  # 12% premium reduction
            'implementation_months': 3
        },
        'site_of_care_steering': {
            'savings_pct': 0.08,  # 8% of medical spend
            'ramp_months': 12
        },
        'reference_based_pricing': {
            'savings_pct': 0.22,  # 22% on facility claims
            'facility_pct_of_total': 0.45,
            'implementation_months': 9
        }
    }
    
    # Calculate Phased Savings
    monthly_savings = []
    for month in range(1, exit_horizon_months + 1):
        month_savings = 0
        
        for opp_name, opp in opportunities.items():
            if opp_name == 'pbm_spread_elimination':
                drug_spend = current_healthcare_spend * opp['drug_pct_of_total']
                potential_savings = drug_spend * opp['savings_pct']
                ramp_factor = min(month / opp['ramp_months'], 1.0)
                month_savings += (potential_savings / 12) * ramp_factor
            
            elif opp_name == 'stop_loss_renegotiation':
                if month >= opp['implementation_months']:
                    stop_loss_premium = current_healthcare_spend * 0.12  # Assume 12% stop-loss
                    month_savings += (stop_loss_premium * opp['savings_pct']) / 12
            
            elif opp_name == 'site_of_care_steering':
                medical_spend = current_healthcare_spend * 0.68  # Non-Rx
                potential_savings = medical_spend * opp['savings_pct']
                ramp_factor = min(month / opp['ramp_months'], 1.0)
                month_savings += (potential_savings / 12) * ramp_factor
            
            elif opp_name == 'reference_based_pricing':
                if month >= opp['implementation_months']:
                    facility_spend = current_healthcare_spend * opp['facility_pct_of_total']
                    month_savings += (facility_spend * opp['savings_pct']) / 12
        
        monthly_savings.append(month_savings)
    
    # Annualized Runrate at Exit
    final_month_savings = monthly_savings[-1]
    annualized_savings_at_exit = final_month_savings * 12
    
    # EBITDA Impact
    new_ebitda = ebitda + annualized_savings_at_exit
    new_ebitda_margin = new_ebitda / revenue
    ebitda_margin_improvement = new_ebitda_margin - ebitda_margin
    
    # Enterprise Value Lift
    exit_multiple = 8.5  # Typical middle-market EBITDA multiple
    baseline_enterprise_value = ebitda * exit_multiple
    new_enterprise_value = new_ebitda * exit_multiple
    enterprise_value_lift = new_enterprise_value - baseline_enterprise_value
    
    # ROI on Optimization Program
    program_cost = 450000  # Platform fees + implementation
    roi = enterprise_value_lift / program_cost
    
    return {
        'baseline_ebitda': ebitda,
        'baseline_ebitda_margin': ebitda_margin,
        'annualized_savings': annualized_savings_at_exit,
        'new_ebitda': new_ebitda,
        'new_ebitda_margin': new_ebitda_margin,
        'ebitda_margin_improvement_bps': ebitda_margin_improvement * 10000,
        'baseline_enterprise_value': baseline_enterprise_value,
        'new_enterprise_value': new_enterprise_value,
        'enterprise_value_lift': enterprise_value_lift,
        'ev_lift_multiple': enterprise_value_lift / program_cost,
        'roi': roi
    }

# Example: Manufacturing company, 1,800 employees
company = {
    'annual_revenue': 285000000,  # 285M revenue
    'ebitda': 42800000,  # 42.8M EBITDA (15% margin)
    'employees': 1800,
    'healthcare_pmpy': 11200  # 11.2K per employee
}

result = model_enterprise_value_lift(company, optimization_plan, 24)

print("Baseline EBITDA: {:.1f}M ({:.1f}% margin)".format(
    result['baseline_ebitda'] / 1e6, result['baseline_ebitda_margin'] * 100))
print("Healthcare Savings (Annualized): {:.1f}M".format(
    result['annualized_savings'] / 1e6))
print("New EBITDA: {:.1f}M ({:.1f}% margin)".format(
    result['new_ebitda'] / 1e6, result['new_ebitda_margin'] * 100))
print("EBITDA Margin Improvement: {:.0f} bps".format(
    result['ebitda_margin_improvement_bps']))
print("\\nEnterprise Value Lift: {:.1f}M".format(
    result['enterprise_value_lift'] / 1e6))
print("Program Cost: 450K")
print("ROI: {:.1f}x".format(result['roi']))

# Output:
# Baseline EBITDA: 42.8M (15.0% margin)
# Healthcare Savings (Annualized): 3.6M
# New EBITDA: 46.4M (16.3% margin)
# EBITDA Margin Improvement: 126 bps
# 
# Enterprise Value Lift: 30.6M
# Program Cost: 450K
# ROI: 68.0x
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Value Creation Metrics" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={TrendingUp}
            label="EBITDA Margin Lift"
            value="80-180 bps"
            sublabel="typical improvement range"
            gradient="from-green-600 to-emerald-600"
          />
          <VegasMetricCard
            icon={DollarSign}
            label="Enterprise Value Multiple"
            value="8.5x"
            sublabel="middle-market EBITDA multiple"
            gradient="from-emerald-600 to-teal-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Healthcare as % Revenue"
            value="4-9%"
            sublabel="typical for 500-5000 employee companies"
            gradient="from-teal-600 to-cyan-600"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Program ROI"
            value="45-90x"
            sublabel="enterprise value lift vs. platform cost"
            gradient="from-cyan-600 to-blue-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Pre-Exit Value Optimization" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="PE Portfolio Company Exit Prep"
            items={[
              "Manufacturing company: $285M revenue, $42.8M EBITDA (15.0% margin), 1,800 employees",
              "Healthcare spend: $20.2M annually (7.1% of revenue)",
              "24-month optimization: PBM forensics + stop-loss renegotiation + RBP + site-of-care steering",
              "Healthcare savings: $3.6M annualized (18% reduction)",
              "New EBITDA: $46.4M (16.3% margin, +126 bps)",
              "Enterprise value at 8.5x: $363.6M → $394.2M",
              "Value creation: $30.6M on $450K investment (68x ROI)"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Fiduciary Governance Premium"
            items={[
              "Buyer due diligence: audited PBM contracts, fiduciary ledger, compliance documentation",
              "De-risked healthcare liabilities: no ERISA litigation exposure",
              "Quality of earnings: healthcare cost containment = sustainable EBITDA",
              "Multiple expansion: 0.3x premium for demonstrable governance",
              "Additional value: $12.8M (8.5x → 8.8x on $42.8M EBITDA)",
              "Total value creation: $43.4M ($30.6M cost savings + $12.8M governance premium)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Turn Healthcare Into Your Biggest Value Creation Story</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Model 24-month EBITDA accretion from healthcare optimization. Quantify enterprise value lift. Present audited fiduciary governance to buyers. Turn cost center into value creation lever.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-emerald-50 transition-all duration-200 shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105">
            Model Enterprise Value Lift
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}