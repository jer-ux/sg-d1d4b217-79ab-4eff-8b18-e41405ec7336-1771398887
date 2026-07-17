import { Users, Database, TrendingUp, AlertTriangle, CheckCircle2, Target, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function PEPYNormalizationPage() {
  return (
    <EngineDetailLayout
      title="PEPY Normalization Engine"
      category="Workforce Analytics"
      tagline="Convert PMPM to Per-Employee-Per-Year—Account for Dependent Ratios, Part-Time Mix, and Coverage Tier Distribution"
      gradient="from-cyan-600 via-blue-600 to-indigo-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The PMPM vs. PEPY Confusion" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">PMPM Misinterpretation</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>CFOs compare $450 PMPM across companies without adjusting for dependent coverage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Company A: 70% single coverage vs. Company B: 55% family coverage (not apples-to-apples)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Part-time employees skew PMPM calculations (50% FTE with full benefits)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Cannot compare healthcare cost as % of payroll without PEPY conversion</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-cyan-400 mb-4">PEPY Normalization</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Convert PMPM → PEPY using actual coverage tier distribution (single, +spouse, +children, family)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Adjust for dependent ratios: 2.2 covered lives per family tier vs. 1.0 for single</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>FTE normalization: part-time employee cost allocated correctly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Apples-to-apples benchmarking across employers with different coverage patterns</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="PMPM to PEPY Conversion Algorithm" icon={Database}>
        <VegasCodeBlock language="python">
{`# PEPY Normalization from PMPM
def convert_pmpm_to_pepy(claims_data, enrollment_data):
    # Step 1: Calculate total cost and member months
    total_cost = claims_data.total_paid_claims
    total_member_months = claims_data.total_member_months
    pmpm = total_cost / total_member_months
    
    # Step 2: Analyze coverage tier distribution
    tier_distribution = enrollment_data.groupby('coverage_tier').agg({
        'employee_count': 'count',
        'covered_lives': 'sum'
    })
    
    # Coverage Tier Typical Ratios:
    # Single: 1.0 life per employee
    # Employee + Spouse: 2.0 lives per employee
    # Employee + Children: 2.8 lives per employee (avg 1.8 kids)
    # Family: 3.2 lives per employee (spouse + 2.2 kids avg)
    
    tier_ratios = {
        'single': 1.0,
        'employee_spouse': 2.0,
        'employee_children': 2.8,
        'family': 3.2
    }
    
    # Step 3: Calculate average lives per employee
    total_employees = tier_distribution['employee_count'].sum()
    total_covered_lives = tier_distribution['covered_lives'].sum()
    avg_lives_per_employee = total_covered_lives / total_employees
    
    # Step 4: Convert PMPM to PEPY
    # PEPY = PMPM × 12 months × avg_lives_per_employee
    pepy = pmpm * 12 * avg_lives_per_employee
    
    # Step 5: FTE Adjustment (if applicable)
    if 'fte_status' in enrollment_data.columns:
        avg_fte = enrollment_data['fte_hours'].mean() / 2080  # 2080 = full-time annual hours
        pepy_fte_adjusted = pepy / avg_fte
    else:
        pepy_fte_adjusted = pepy
    
    return {
        'pmpm': pmpm,
        'avg_lives_per_employee': avg_lives_per_employee,
        'pepy': pepy,
        'pepy_fte_adjusted': pepy_fte_adjusted,
        'tier_distribution': tier_distribution,
        'total_employees': total_employees,
        'total_covered_lives': total_covered_lives
    }

# Benchmarking Example
def compare_pepy_across_employers(company_a, company_b):
    a_result = convert_pmpm_to_pepy(company_a.claims, company_a.enrollment)
    b_result = convert_pmpm_to_pepy(company_b.claims, company_b.enrollment)
    
    return {
        'company_a': {
            'pmpm': a_result['pmpm'],
            'pepy': a_result['pepy'],
            'lives_per_employee': a_result['avg_lives_per_employee']
        },
        'company_b': {
            'pmpm': b_result['pmpm'],
            'pepy': b_result['pepy'],
            'lives_per_employee': b_result['avg_lives_per_employee']
        },
        'variance': {
            'pmpm_diff': ((b_result['pmpm'] / a_result['pmpm']) - 1) * 100,
            'pepy_diff': ((b_result['pepy'] / a_result['pepy']) - 1) * 100
        }
    }

# Example Output:
# Company A (Tech, 75% single coverage):
#   PMPM: $420
#   Avg Lives/Employee: 1.4
#   PEPY: $7,056
# 
# Company B (Manufacturing, 60% family coverage):
#   PMPM: $485 (+15.5% vs. A)
#   Avg Lives/Employee: 2.6
#   PEPY: $15,132 (+114% vs. A)
# 
# Interpretation: Company B's PMPM looks 15% higher, but PEPY is 114% higher
# due to much higher dependent coverage. True cost per employee is far worse.
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Normalization Intelligence" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={Users}
            label="Coverage Tiers"
            value="4 Types"
            sublabel="single, +spouse, +children, family"
            gradient="from-cyan-600 to-blue-600"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Typical Lives/Employee"
            value="1.6-2.4"
            sublabel="depends on industry and demographics"
            gradient="from-blue-600 to-indigo-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="FTE Adjustment"
            value="Automated"
            sublabel="part-time workforce normalization"
            gradient="from-indigo-600 to-violet-600"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Benchmarking"
            value="Apples-to-Apples"
            sublabel="vs. industry peers"
            gradient="from-violet-600 to-purple-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Misleading PMPM Benchmark"
            items={[
              "CFO saw industry PMPM benchmark: $425",
              "Company's PMPM: $485 (14% above benchmark, looked bad)",
              "PEPY analysis revealed:",
              "  - Company: 62% family coverage (avg 2.5 lives/employee)",
              "  - Benchmark: 70% single coverage (avg 1.5 lives/employee)",
              "Company PEPY: $14,550",
              "Benchmark PEPY: $7,650 (adjusted for coverage mix)",
              "True variance: +90% (much worse than PMPM suggested)",
              "Triggered benefits redesign to reduce family-tier uptake"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Part-Time Workforce PEPY"
            items={[
              "Retail employer: 40% part-time workforce (avg 0.6 FTE)",
              "PMPM: $380 (looked competitive)",
              "PEPY unadjusted: $6,840",
              "PEPY FTE-adjusted: $11,400 (true cost per full-time equivalent)",
              "Comparison: peer full-time employers at $9,200 PEPY FTE-adjusted",
              "Company was actually 24% more expensive per FTE",
              "Redesigned part-time eligibility rules, saved $1.8M annually"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Comparing PMPM Without Context</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Convert PMPM to PEPY. Account for dependent ratios and part-time mix. Compare apples-to-apples. Know your true cost per employee.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-cyan-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-cyan-50 transition-all duration-200 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105">
            Normalize to PEPY
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}