import { TrendingUp, Database, PieChart, AlertTriangle, CheckCircle2, Target, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function HealthcareInflationAttributionPage() {
  return (
    <EngineDetailLayout
      title="Healthcare Inflation Attribution Engine"
      category="Trend Decomposition"
      tagline="Separate Unit Cost, Utilization, and Mix Effects—Know Which Drivers Fuel 8.2% Medical Trend vs. 2.4% Economy-Wide"
      gradient="from-orange-600 via-red-600 to-rose-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Opaque Trend Explanation" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Aggregate Trend Reporting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>"Medical trend up 8.2% YoY" → no actionability. Which component drove it?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Cannot separate provider price inflation from member utilization changes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Case mix shift hidden: aging population vs. higher-acuity diagnoses</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>CFO asks "Why 8.2% vs. 2.4% CPI?" → no data-driven answer</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-orange-400 mb-4">Component-Level Attribution</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-orange-400">✓</span>
                <span>Decompose 8.2% trend: 4.8% unit cost, 2.1% utilization, 1.3% case mix</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400">✓</span>
                <span>Drill to service category: inpatient, outpatient, professional, pharmacy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400">✓</span>
                <span>Provider-specific attribution: which facilities drive unit cost inflation?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400">✓</span>
                <span>Actionable insights: renegotiate contracts, shift site-of-care, manage utilization</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Trend Decomposition Algorithm" icon={Database}>
        <VegasCodeBlock language="python">
{`# Healthcare Inflation Attribution Engine
def decompose_trend(claims_current_year, claims_prior_year, population_current, population_prior):
    # Step 1: Calculate aggregate trend
    total_cost_current = sum(c.paid_amount for c in claims_current_year)
    total_cost_prior = sum(c.paid_amount for c in claims_prior_year)
    
    pmpm_current = total_cost_current / len(population_current) / 12
    pmpm_prior = total_cost_prior / len(population_prior) / 12
    
    total_trend = (pmpm_current - pmpm_prior) / pmpm_prior
    
    # Step 2: Standardize service mix to isolate unit cost vs utilization
    service_categories = ['inpatient', 'outpatient', 'professional', 'pharmacy', 'other']
    
    component_attribution = {}
    
    for category in service_categories:
        # Filter claims by category
        current_claims = [c for c in claims_current_year if c.category == category]
        prior_claims = [c for c in claims_prior_year if c.category == category]
        
        # Unit cost trend (price per service, holding utilization constant)
        current_unit_cost = sum(c.paid_amount for c in current_claims) / len(current_claims) if current_claims else 0
        prior_unit_cost = sum(c.paid_amount for c in prior_claims) / len(prior_claims) if prior_claims else 0
        
        unit_cost_trend = (current_unit_cost - prior_unit_cost) / prior_unit_cost if prior_unit_cost > 0 else 0
        
        # Utilization trend (services per member, holding price constant)
        current_utilization = len(current_claims) / len(population_current) / 12
        prior_utilization = len(prior_claims) / len(population_prior) / 12
        
        utilization_trend = (current_utilization - prior_utilization) / prior_utilization if prior_utilization > 0 else 0
        
        # Case mix trend (severity/complexity shift)
        # Use DRG weight, CPT RVU, or diagnosis severity score as proxy
        current_avg_severity = sum(c.case_mix_weight for c in current_claims) / len(current_claims) if current_claims else 0
        prior_avg_severity = sum(c.case_mix_weight for c in prior_claims) / len(prior_claims) if prior_claims else 0
        
        case_mix_trend = (current_avg_severity - prior_avg_severity) / prior_avg_severity if prior_avg_severity > 0 else 0
        
        # Contribution to total trend
        category_pmpm_prior = sum(c.paid_amount for c in prior_claims) / len(population_prior) / 12
        category_weight = category_pmpm_prior / pmpm_prior if pmpm_prior > 0 else 0
        
        component_attribution[category] = {
            'unit_cost_trend': unit_cost_trend,
            'utilization_trend': utilization_trend,
            'case_mix_trend': case_mix_trend,
            'total_category_trend': (1 + unit_cost_trend) * (1 + utilization_trend) * (1 + case_mix_trend) - 1,
            'contribution_to_total_trend': category_weight * ((1 + unit_cost_trend) * (1 + utilization_trend) * (1 + case_mix_trend) - 1)
        }
    
    # Aggregate components
    total_unit_cost_contribution = sum(v['contribution_to_total_trend'] * (v['unit_cost_trend'] / (v['total_category_trend'] or 1)) 
                                       for v in component_attribution.values() if v['total_category_trend'] != 0)
    total_utilization_contribution = sum(v['contribution_to_total_trend'] * (v['utilization_trend'] / (v['total_category_trend'] or 1)) 
                                        for v in component_attribution.values() if v['total_category_trend'] != 0)
    total_case_mix_contribution = sum(v['contribution_to_total_trend'] * (v['case_mix_trend'] / (v['total_category_trend'] or 1)) 
                                     for v in component_attribution.values() if v['total_category_trend'] != 0)
    
    # Provider-specific unit cost attribution (top drivers)
    provider_inflation = {}
    for claim in claims_current_year:
        if claim.provider_id not in provider_inflation:
            provider_inflation[claim.provider_id] = {'current_costs': [], 'prior_costs': []}
        provider_inflation[claim.provider_id]['current_costs'].append(claim.paid_amount)
    
    for claim in claims_prior_year:
        if claim.provider_id in provider_inflation:
            provider_inflation[claim.provider_id]['prior_costs'].append(claim.paid_amount)
    
    provider_trends = []
    for provider_id, data in provider_inflation.items():
        if data['prior_costs']:
            avg_current = sum(data['current_costs']) / len(data['current_costs'])
            avg_prior = sum(data['prior_costs']) / len(data['prior_costs'])
            trend = (avg_current - avg_prior) / avg_prior
            
            provider_trends.append({
                'provider_id': provider_id,
                'provider_name': lookup_provider_name(provider_id),
                'unit_cost_trend': trend,
                'claim_volume': len(data['current_costs'])
            })
    
    provider_trends.sort(key=lambda x: abs(x['unit_cost_trend']), reverse=True)
    
    return {
        'total_trend': total_trend,
        'unit_cost_contribution': total_unit_cost_contribution,
        'utilization_contribution': total_utilization_contribution,
        'case_mix_contribution': total_case_mix_contribution,
        'category_breakdown': component_attribution,
        'top_provider_inflators': provider_trends[:20]
    }

# Example: Decompose 2024 trend
current = load_claims('2024')
prior = load_claims('2023')
pop_current = load_population('2024')
pop_prior = load_population('2023')

result = decompose_trend(current, prior, pop_current, pop_prior)

print("Total Medical Trend: {:.1%}".format(result['total_trend']))
print("\\nComponent Attribution:")
print("  Unit Cost Inflation: {:.1%}".format(result['unit_cost_contribution']))
print("  Utilization Change: {:.1%}".format(result['utilization_contribution']))
print("  Case Mix Shift: {:.1%}".format(result['case_mix_contribution']))

print("\\nCategory Breakdown:")
for cat, data in result['category_breakdown'].items():
    print("  {}: {:.1%} total ({:.1%} unit, {:.1%} util, {:.1%} mix)".format(
        cat.upper(), data['total_category_trend'], 
        data['unit_cost_trend'], data['utilization_trend'], data['case_mix_trend']))

print("\\nTop 5 Provider Inflators:")
for p in result['top_provider_inflators'][:5]:
    print("  {}: {:.1%} unit cost trend ({} claims)".format(
        p['provider_name'], p['unit_cost_trend'], p['claim_volume']))
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Attribution Intelligence" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={PieChart}
            label="3-Component Model"
            value="Unit + Util + Mix"
            sublabel="separate price, volume, and complexity"
            gradient="from-orange-600 to-red-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Category Drill-Down"
            value="5 Service Types"
            sublabel="inpatient, outpatient, professional, Rx, other"
            gradient="from-red-600 to-rose-600"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Provider Attribution"
            value="Top 20"
            sublabel="facilities driving unit cost inflation"
            gradient="from-rose-600 to-pink-600"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Actionable Insights"
            value="Strategic"
            sublabel="renegotiate, shift site, manage utilization"
            gradient="from-pink-600 to-fuchsia-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Strategic Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Board Trend Explanation"
            items={[
              "Healthcare REIT (portfolio of senior living facilities): 14,000 employees",
              "Board demand: explain 9.8% medical trend vs. 2.1% wage inflation",
              "Attribution analysis:",
              "  - Total trend: 9.8% PMPM",
              "  - Unit cost: 6.2% (orthopedic facility rates up 14.8%)",
              "  - Utilization: 2.4% (aging workforce, +1.2 years avg age)",
              "  - Case mix: 1.2% (higher-acuity diagnoses)",
              "Top provider inflator: ABC Orthopedics (18.2% unit cost trend, $4.8M annual spend)",
              "Strategic response: renegotiated ABC contract (locked 4.5% annual cap), saved $2.1M",
              "Board outcome: data-driven explanation, actionable mitigation plan approved"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Pharmacy vs. Medical Split"
            items={[
              "Technology company (8,500 employees): 12.4% total healthcare trend",
              "CFO question: 'Is it GLP-1s or something else?'",
              "Attribution revealed:",
              "  - Pharmacy: 22.8% trend (18.4% unit cost, 3.2% utilization, 1.2% mix)",
              "    - GLP-1 category: 340% unit cost trend (Wegovy/Zepbound adoption)",
              "    - Traditional Rx: 4.2% unit cost trend (manufacturer price increases)",
              "  - Medical: 6.8% trend (4.1% unit cost, 2.0% utilization, 0.7% mix)",
              "Insight: 89% of total trend driven by pharmacy, 76% from GLP-1s alone",
              "Action: implemented prior auth for obesity-indication GLP-1s, saved $3.6M"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Explain Every Point of Trend</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Decompose trend into unit cost, utilization, and case mix. Drill to categories and providers. Build data-driven mitigation plans. Answer board questions with precision.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
            Decompose Healthcare Inflation
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}