import { DollarSign, Database, Users, TrendingUp, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function PMPMNormalizationEngine() {
  return (
    <EngineDetailLayout
      title="PMPM Normalization Engine"
      category="Financial & Trend"
      tagline="Convert All Healthcare Costs to Per Member Per Month—Enable Apples-to-Apples Comparison Across Different Population Sizes"
      gradient="from-teal-600 via-cyan-600 to-blue-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Membership Fluctuation Problem" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Absolute Cost Reporting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>"Total claims: $12.5M" tells you nothing if membership changed from 950 to 1,200</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot trend costs when headcount fluctuates seasonally or due to M&A</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Mid-month enrollments/terminations distort per-capita calculations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot compare employers of different sizes (500 vs. 5,000 employees)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-teal-400 mb-4">PMPM Normalization</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-teal-400 mt-1">✓</span>
                <span>Member-months denominator: exact time-weighted exposure calculation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 mt-1">✓</span>
                <span>Clean trending: $842 PMPM vs. $915 PMPM = +8.7% trend, regardless of headcount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 mt-1">✓</span>
                <span>Mid-month accuracy: member enrolled 15 days = 0.5 member-months</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 mt-1">✓</span>
                <span>Universal comparability: 100-employee firm vs. Fortune 500, same PMPM basis</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Member-Month Calculation Engine" icon={Users}>
        <VegasCodeBlock language="python">
{`# PMPM Normalization Framework
def calculate_member_months(enrollment_data):
    """
    Calculate exact member-months accounting for:
    - Mid-month enrollments/terminations
    - Coverage tier (EE, EE+Spouse, EE+Child, Family)
    - Part-time vs. full-time status
    """
    member_months = 0
    
    for enrollment in enrollment_data:
        # Days enrolled in each month
        for month in enrollment.coverage_periods:
            days_in_month = get_days_in_month(month)
            days_enrolled = enrollment.days_covered_in_month(month)
            
            # Fractional member-month
            fraction = days_enrolled / days_in_month
            
            # Coverage tier multiplier
            covered_lives = get_covered_lives(enrollment.tier)
            
            member_months += fraction * covered_lives
    
    return member_months

def calculate_pmpm_costs(claims, enrollment):
    """
    Convert absolute costs to PMPM
    """
    total_claims = sum(claims.allowed_amount)
    total_member_months = calculate_member_months(enrollment)
    
    pmpm = total_claims / total_member_months
    
    return {
        'total_claims': total_claims,
        'member_months': total_member_months,
        'pmpm': pmpm,
        'annualized_pmpy': pmpm * 12
    }

# Example: Mid-Year Acquisition Impact
# Q1 2024: 1,000 members, $2.85M claims
#   - Member-months: 3,000 (Jan-Mar)
#   - PMPM: $950
# 
# Q2 2024: 1,450 members, $3.95M claims (acquired 450 employees in April)
#   - Member-months: 4,200 (Apr-Jun, accounting for April mid-month start)
#   - PMPM: $941
#
# Conclusion: PMPM actually DECREASED by 0.9% despite absolute 
# claims increasing 38% due to acquisition
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Normalization Precision" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Users}
            label="Enrollment Tracking"
            value="Daily Granularity"
            gradient="from-teal-500 to-cyan-500"
            description="Exact days-covered calculation for mid-month changes"
          />
          <VegasMetricCard
            icon={DollarSign}
            label="Cost Components"
            value="All Separated"
            gradient="from-cyan-500 to-blue-500"
            description="Medical, Rx, dental, vision PMPM tracked independently"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Trending Accuracy"
            value="±0.5%"
            gradient="from-blue-500 to-indigo-500"
            description="Membership fluctuation noise eliminated"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Universal Cost Comparisons" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="M&A Impact Isolation"
            items={[
              "Pre-merger: 850 employees, $8.9M annual claims",
              "Post-merger: 1,600 employees, $16.2M annual claims",
              "Absolute costs up 82% (meaningless comparison)",
              "PMPM: $871 pre-merger, $844 post-merger",
              "Acquired population was actually 3% more efficient"
            ]}
          />
          <VegasFeatureCard
            icon={Users}
            title="Seasonal Workforce Variation"
            items={[
              "Retail employer: 2,200 FT in Q1, 3,400 FT+PT in Q4 (holiday hires)",
              "Q1 claims: $5.2M, Q4 claims: $7.8M",
              "PMPM: Q1 $788, Q4 $767 (3% improvement)",
              "Without PMPM: looks like 50% cost increase",
              "Seasonal hiring actually brought healthier, younger cohort"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Peer Benchmarking"
            items={[
              "Company A: 450 employees, $4.8M claims = $889 PMPM",
              "Company B: 5,500 employees, $58.2M claims = $883 PMPM",
              "Company C: 12,000 employees, $118M claims = $820 PMPM",
              "Apples-to-apples comparison regardless of size",
              "Larger companies show economies of scale (8% lower PMPM)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Comparing Apples to Oranges</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Convert all costs to PMPM with exact member-month calculations. Trend cleanly regardless of headcount changes. 
            Benchmark against any peer, any size.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-cyan-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-cyan-50 transition-all duration-200 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105">
            Normalize to PMPM
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}