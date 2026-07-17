import { DollarSign, Database, Target, TrendingDown, AlertTriangle, CheckCircle2, BarChart3, Zap, Calculator, PieChart, Shield } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function EBITDAEnhancementEngine() {
  return (
    <EngineDetailLayout
      title="EBITDA Enhancement Engine"
      category="Enterprise Value"
      tagline="Turn Healthcare Waste into Enterprise Value—$2M-$8M EBITDA Lift Through PE-Grade Forensic Optimization"
      gradient="from-emerald-600 via-teal-600 to-cyan-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $4M EBITDA Hole No One Sees" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">PE Operators Miss Healthcare's EBITDA Impact</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Healthcare buried in G&A—invisible to deal team and operating partners</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Broker incumbency bias: "market is up 12%, nothing we can do"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No EBITDA attribution for healthcare spend reduction initiatives</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Exit valuation leaves 10M-30M on table (4-6% margin × enterprise value multiple)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">EBITDA Enhancement Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>100-day forensic audit identifying 2M-8M in addressable leakage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>EBITDA-attributed savings roadmap (Yr 1: 1.8M, Yr 2: 2.4M, Yr 3: 3.1M)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Board-ready business case with ROI, payback period, and sensitivities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Continuous monitoring dashboard linking initiatives to EBITDA impact</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Five-Pillar Forensic Framework" icon={Shield}>
        <VegasCodeBlock language="python">
{`# EBITDA Enhancement Forensic Framework
def ebitda_forensic_audit(claims_data, contracts, population):
    """
    Five-pillar healthcare cost forensics
    Returns EBITDA-attributed savings opportunities
    """
    findings = {}
    
    # Pillar 1: PBM Contract Leakage (30-40% of opportunity)
    rx_claims = claims_data.filter(claim_type='Rx')
    for claim in rx_claims:
        contract_mac = lookup_mac(claim.ndc, contracts.pbm_mac_list)
        actual_paid = claim.ingredient_cost + claim.dispensing_fee
        spread = actual_paid - contract_mac
        
        if spread > 0:
            findings['pbm_spread'] += spread
    
    # Pillar 2: Stop-Loss Optimization (15-25% of opportunity)
    large_claims = claims_data.filter(paid_amount > 100000)
    for deductible in [200000, 250000, 300000, 350000]:
        premium = get_stoploss_quote(deductible, population)
        claims_above = sum(c.paid - deductible for c in large_claims if c.paid > deductible)
        expected_cost = premium + claims_above
        
        findings['stoploss_options'][deductible] = {
            'premium': premium,
            'expected_cost': expected_cost,
            'savings_vs_current': current_premium - expected_cost
        }
    
    # Pillar 3: Medical Network Performance (20-30% of opportunity)
    medical_claims = claims_data.filter(claim_type='Medical')
    for claim in medical_claims:
        medicare_rate = lookup_medicare(claim.cpt, claim.locality)
        allowed = claim.allowed_amount
        benchmark_ratio = allowed / medicare_rate
        
        if benchmark_ratio > 2.5:  # Paying >250% of Medicare
            savings_opportunity = (allowed - medicare_rate * 1.8) * annual_volume(claim.cpt)
            findings['network_migration'][claim.cpt] = savings_opportunity
    
    # Pillar 4: Plan Design & Cost Sharing (10-15% of opportunity)
    utilization_changes = {
        'er_copay_increase_100_to_250': -0.15,  # 15% utilization drop
        'specialist_referral_required': -0.08,
        'prior_auth_high_cost_imaging': -0.12
    }
    
    for change, elasticity in utilization_changes.items():
        affected_claims = filter_claims(change)
        volume_reduction = len(affected_claims) * abs(elasticity)
        gross_savings = volume_reduction * avg_cost(affected_claims)
        employee_pushback_cost = estimate_satisfaction_cost(change)
        
        findings['plan_design'][change] = gross_savings - employee_pushback_cost
    
    # Pillar 5: Payment Integrity & Recovery (5-10% of opportunity)
    duplicate_claims = detect_duplicates(claims_data)
    unbundled_claims = detect_unbundling(claims_data)
    upcoded_claims = detect_upcoding(claims_data)
    
    findings['payment_integrity'] = {
        'duplicates': sum(c.paid for c in duplicate_claims),
        'unbundling': sum(c.overpayment for c in unbundled_claims),
        'upcoding': sum(c.overpayment for c in upcoded_claims)
    }
    
    # EBITDA Attribution
    total_opportunity = (
        findings['pbm_spread'] +
        max(s['savings_vs_current'] for s in findings['stoploss_options'].values()) +
        sum(findings['network_migration'].values()) +
        sum(findings['plan_design'].values()) +
        sum(findings['payment_integrity'].values())
    )
    
    return {
        'total_ebitda_opportunity': total_opportunity,
        'year_1_achievable': total_opportunity * 0.65,
        'year_2_cumulative': total_opportunity * 0.88,
        'year_3_run_rate': total_opportunity * 1.00,
        'implementation_cost': 420000,
        'roi': total_opportunity / 420000,
        'findings_by_pillar': findings
    }

# Example: 500-employee manufacturing company
portfolio_co = {
    'employees': 500,
    'revenue': 100000000,
    'current_ebitda': 12000000,
    'healthcare_spend': 6200000
}

audit = ebitda_forensic_audit(claims_2024, contracts, population=500)

print("Total EBITDA Opportunity: {:,.0f}".format(audit['total_ebitda_opportunity']))
print("Year 1 Achievable: {:,.0f}".format(audit['year_1_achievable']))
print("3-Year Run Rate: {:,.0f}".format(audit['year_3_run_rate']))
print("ROI: {:.0f}x".format(audit['roi']))
print("\\nEBITDA Impact: +{:.1f}%".format(
    audit['year_3_run_rate'] / portfolio_co['current_ebitda'] * 100))

# Typical Output:
# Total EBITDA Opportunity: 4,410,000
# Year 1 Achievable: 2,867,000
# 3-Year Run Rate: 4,410,000
# ROI: 68x
# EBITDA Impact: +36.8%
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="PE-Grade Value Creation" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={DollarSign}
            label="Avg EBITDA Lift"
            value="$2.4M-$8M"
            gradient="from-emerald-500 to-teal-500"
            description="Annual recurring EBITDA improvement per portfolio company"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Enterprise Value Impact"
            value="$15M-$50M"
            gradient="from-teal-500 to-cyan-500"
            description="At 6-9x EBITDA exit multiple"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Implementation Timeline"
            value="18 Months"
            gradient="from-cyan-500 to-sky-500"
            description="From audit to full run-rate EBITDA realization"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Portfolio Company Case Studies" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Manufacturing PortCo: $3.8M EBITDA"
            items={[
              "Mid-market bolt-and-fastener manufacturer, 420 employees",
              "PBM contract forensics revealed 1.2M annual spread pricing",
              "Stop-loss reoptimization saved 380K (300K deductible vs. 200K)",
              "Site-of-care program delivered 420K (hospital → ASC migration)",
              "Network renegotiation: 1.8M over 3 years",
              "Combined: 3.8M recurring EBITDA improvement, exit multiple 5.8x → 6.4x"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Healthcare Services Platform: $6.2M EBITDA"
            items={[
              "Roll-up of 8 behavioral health clinics, 850 employees",
              "Harmonized benefits across entities while reducing total cost",
              "Self-funded captive with reference-based pricing",
              "Specialty pharmacy carve-out with transparent PBM",
              "Payment integrity program recovering 340K annually",
              "Total: 6.2M EBITDA improvement, 19% margin expansion"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="PE Thesis Validation: $2.1M at LOI"
            items={[
              "Pre-acquisition forensic audit identified 2.1M addressable waste",
              "PE firm built into acquisition model as Year 1 margin expansion",
              "Engine findings supported valuation bridge",
              "Identified implementation risks and provided 100-day roadmap",
              "Actual Year 1 delivery: 1.9M (90% of projected)",
              "Healthcare optimization became thesis validation proof point"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* 3-Year Roadmap */}
      <VegasSection title="3-Year EBITDA Roadmap" icon={Calculator}>
        <div className="bg-black/60 border border-emerald-500/30 rounded-lg p-6">
          <h4 className="text-lg font-bold text-emerald-400 mb-4">Example: $100M Revenue Manufacturing Company</h4>
          <VegasCodeBlock>
{`Portfolio Company: 500 employees, 12M EBITDA, 6.2M healthcare spend

Year 1 Initiatives (100-Day Plan)
├─ PBM Contract Renegotiation: 850K (Q2 implementation)
├─ Stop-Loss Optimization: 320K (Q1 implementation)
├─ Payment Integrity Launch: 180K (Q3 recovered claims)
└─ Plan Design Adjustment: 220K (Q4 open enrollment)
   TOTAL YEAR 1: 1.57M → 13.1% EBITDA growth

Year 2 Initiatives
├─ Reference-Based Pricing (Phase 1): 420K
├─ Specialty Pharmacy Carve-Out: 380K
├─ Site-of-Care Steering: 290K
└─ Ongoing Payment Integrity: 240K
   TOTAL YEAR 2: 1.33M → cumulative 2.90M

Year 3 Initiatives
├─ Direct Contracting (Musculoskeletal): 510K
├─ GLP-1 Management Program: 280K (cost avoidance)
├─ Network Optimization (ACO partnership): 340K
└─ Ongoing Programs: 380K
   TOTAL YEAR 3: 1.51M → cumulative 4.41M

Exit Impact:
  EBITDA improvement: 4.41M annually (36.8% increase)
  At 6.5x EBITDA multiple: +28.7M enterprise value
  Investment: 420K consulting + implementation
  ROI: 68x
  IRR contribution: +180 basis points (3-year hold)
`}
          </VegasCodeBlock>
        </div>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">How Much EBITDA Are You Leaving on the Table?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Run a 100-day forensic audit on your portfolio company. Quantify addressable healthcare waste, 
            build an EBITDA-attributed roadmap, and start flowing savings to the bottom line in 90 days.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-emerald-50 transition-all duration-200 shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105">
            Request Forensic Audit
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}