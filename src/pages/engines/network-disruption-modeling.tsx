import { AlertCircle, TrendingUp, Users, Shield, DollarSign, CheckCircle2, Target, BarChart3 } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function NetworkDisruptionEngine() {
  return (
    <EngineDetailLayout
      title="Network Disruption Modeling Engine"
      category="Network Risk & Strategy"
      tagline="Model Cost Impact When Key Providers Leave Network or Facilities Close—Know Your Exposure Before the Disruption"
      gradient="from-red-600 via-orange-600 to-amber-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $840K Network Surprise" icon={AlertCircle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Disruptions Discovered at Renewal</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Key orthopedic group exits network—90 days notice, no cost modeling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Hospital merger: two systems consolidate, demand 15% rate increase or termination</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Local ASC closes—procedures shift to hospital HOPD at 2.5× cost</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Most CFOs learn about disruption impact AFTER Q2 claims spike 18%</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-orange-400 mb-4">Network Disruption Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Provider concentration analysis: identify single points of failure (5-15% of spend)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Scenario modeling: what if Group X leaves? Hospital Y closes? System Z merges?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Cost impact forecasts: OON rates, alternative in-network sites, direct contracting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Mitigation strategies: network RFP, direct contracts, member steering plans</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Concentration Risk Algorithm" icon={Users}>
        <VegasCodeBlock language="python">
{`# Network Disruption Impact Model
def analyze_network_concentration(claims_data, network_roster):
    provider_spend = {}
    
    # Aggregate spend by provider/facility
    for claim in claims_data:
        provider_id = claim.rendering_provider_npi
        facility_id = claim.facility_npi
        
        if provider_id not in provider_spend:
            provider_spend[provider_id] = {
                'name': lookup_provider_name(provider_id),
                'specialty': lookup_specialty(provider_id),
                'annual_spend': 0,
                'claim_count': 0,
                'unique_members': set()
            }
        
        provider_spend[provider_id]['annual_spend'] += claim.paid_amount
        provider_spend[provider_id]['claim_count'] += 1
        provider_spend[provider_id]['unique_members'].add(claim.member_id)
    
    total_spend = sum(p['annual_spend'] for p in provider_spend.values())
    
    # Identify concentration risk
    concentration_risk = []
    for provider_id, data in provider_spend.items():
        spend_pct = data['annual_spend'] / total_spend
        
        if spend_pct >= 0.05:  # 5%+ of total spend
            risk_level = 'CRITICAL' if spend_pct >= 0.10 else 'HIGH'
            concentration_risk.append({
                'provider': data['name'],
                'specialty': data['specialty'],
                'annual_spend': data['annual_spend'],
                'percent_of_total': spend_pct,
                'member_count': len(data['unique_members']),
                'risk_level': risk_level
            })
    
    return sorted(concentration_risk, key=lambda x: x['annual_spend'], reverse=True)

def model_provider_exit_impact(provider_id, claims_history, network_alternatives):
    # Current in-network cost
    provider_claims = claims_history.filter(provider=provider_id)
    current_annual_cost = sum(c.paid_amount for c in provider_claims)
    
    # Scenario 1: Provider goes OON
    oon_multiplier = 2.80  # OON facilities charge 280% of in-network allowed
    plan_pays_oon = 0.60  # Plan pays 60%, member pays 40%
    oon_annual_cost = current_annual_cost * oon_multiplier * plan_pays_oon
    
    # Scenario 2: Members redirect to alternative in-network
    alt_provider_rates = [lookup_rates(alt) for alt in network_alternatives]
    avg_alt_rate_multiplier = sum(alt_provider_rates) / len(alt_provider_rates)
    redirect_annual_cost = current_annual_cost * avg_alt_rate_multiplier
    
    # Scenario 3: Direct contract with exiting provider
    direct_contract_rate = 1.40  # 140% of Medicare (typical direct contract)
    direct_contract_cost = (current_annual_cost / 1.80) * direct_contract_rate  # Assume current = 180% Medicare
    
    return {
        'baseline_cost': current_annual_cost,
        'oon_scenario': {
            'annual_cost': oon_annual_cost,
            'delta': oon_annual_cost - current_annual_cost,
            'percent_increase': ((oon_annual_cost - current_annual_cost) / current_annual_cost) * 100
        },
        'redirect_scenario': {
            'annual_cost': redirect_annual_cost,
            'delta': redirect_annual_cost - current_annual_cost,
            'percent_increase': ((redirect_annual_cost - current_annual_cost) / current_annual_cost) * 100
        },
        'direct_contract_scenario': {
            'annual_cost': direct_contract_cost,
            'delta': direct_contract_cost - current_annual_cost,
            'percent_increase': ((direct_contract_cost - current_annual_cost) / current_annual_cost) * 100
        },
        'recommended': 'direct_contract_scenario'  # Lowest cost + preserves continuity
    }

# Example: Orthopedic group exit
claims = load_claims('2024')
concentration = analyze_network_concentration(claims, network)

# Model impact of top risk provider leaving
top_risk = concentration[0]  # ABC Orthopedics
impact = model_provider_exit_impact(top_risk['provider_id'], claims, find_alternatives('orthopedics'))

print(f"Provider: {top_risk['provider']} ({top_risk['percent_of_total']:.1%} of spend)")
print(f"\\nScenario Analysis:")
print(f"  OON: ${impact['oon_scenario']['annual_cost']:,.0f} (+${impact['oon_scenario']['delta']:,.0f})")
print(f"  Redirect: ${impact['redirect_scenario']['annual_cost']:,.0f} (+${impact['redirect_scenario']['delta']:,.0f})")
print(f"  Direct Contract: ${impact['direct_contract_scenario']['annual_cost']:,.0f} (+${impact['direct_contract_scenario']['delta']:,.0f})")
print(f"\\nRecommendation: Negotiate direct contract (saves ${impact['oon_scenario']['delta'] - impact['direct_contract_scenario']['delta']:,.0f} vs OON)")
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Risk Exposure Metrics" icon={Shield}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Users}
            label="Concentration Threshold"
            value="5-15%"
            gradient="from-red-500 to-orange-500"
            description="Single provider/facility share of total medical spend flagged as risk"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="OON Cost Multiplier"
            value="2.8×"
            gradient="from-orange-500 to-amber-500"
            description="Average out-of-network facility charge vs. in-network allowed amount"
          />
          <VegasMetricCard
            icon={DollarSign}
            label="Avg Disruption Impact"
            value="$460K"
            gradient="from-amber-500 to-yellow-500"
            description="Unexpected annual cost increase when high-volume provider exits"
          />
        </div>
      </VegasSection>

      {/* Common Scenarios */}
      <VegasSection title="Disruption Scenario Library" icon={AlertCircle}>
        <VegasCodeBlock language="markdown">
{`# Network Disruption Playbook

## Scenario 1: High-Volume Provider Exit
**Trigger**: Single provider/group represents 5-15% of medical spend
**Impact**: Members pay OON cost-share OR disrupt to new in-network (unknown cost)
**Risk Factors**: Specialty groups (ortho, cardiology, GI), ASCs, infusion centers
**Example**: Orthopedic group exits → $680K in-network → $1.14M OON (68% increase)

## Scenario 2: Hospital System Merger
**Trigger**: Two systems merge, one in-network, other not. Demand single contract at higher rates.
**Impact**: Typical demand: 12-20% rate increase or termination threat
**Affects**: ER, admissions, outpatient surgery, imaging
**Example**: System merger demands 15% increase on $2.8M spend = +$420K annual cost

## Scenario 3: Facility Closure
**Trigger**: Local ASC closes or hospital converts to urgent care only
**Impact**: Utilization redistributes to remaining facilities (often higher cost)
**Example**: Low-cost ASC closes → procedures shift to hospital HOPD (facility fee 2.5× higher)

## Scenario 4: Geographic Network Gap
**Trigger**: Satellite office employees (80+ people) distant from in-network facilities
**Impact**: Employees use local out-of-network hospital → all OON claims
**Solution Options**:
  1. Model cost of status quo OON leakage
  2. Negotiate direct contract with local facility
  3. Switch to broader network carrier

## Scenario 5: TPA/Carrier Network Change
**Trigger**: TPA loses contract with major hospital system mid-year
**Impact**: Facilities previously in-network suddenly OON without notice
**Example**: Regional hospital drops TPA → $1.6M annual utilization now OON
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Proactive Mitigation Success Stories" icon={CheckCircle2}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={AlertCircle}
            title="Orthopedic Group Exit"
            items={[
              "Manufacturing client: 90-day notice of group leaving network",
              "Engine identified: $680K annual spend (12% of total)",
              "Modeled 3 scenarios: OON ($1.14M), redirect ($820K), direct contract ($720K)",
              "Negotiated direct contract at 140% Medicare before exit",
              "Saved $420K vs. OON scenario + preserved continuity"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Hospital Merger Pre-Planning"
            items={[
              "PE portfolio company: two local systems announced merger",
              "Modeled $2.8M annual utilization at merged system",
              "Projected 15% rate increase demand = +$420K",
              "Proactively switched carriers to network with merged entity",
              "Actual increase: 8.5% ($238K) vs. 15% threat"
            ]}
          />
          <VegasFeatureCard
            icon={Users}
            title="Multi-Site Network Optimization"
            items={[
              "Healthcare system: 4 office locations, uneven network coverage",
              "Remote site (80 employees) had $340K OON leakage",
              "Modeled direct contract with local hospital: $280K",
              "Negotiated 3-year agreement, eliminated OON exposure",
              "Net savings: $60K annually + improved employee satisfaction"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Know Your Network Risk Before the Disruption Hits</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Identify provider concentration risk. Model exit scenarios. Build mitigation strategies 
            (direct contracts, network RFPs, alternative sites) before the 90-day notice arrives.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
            Run Network Risk Analysis
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}