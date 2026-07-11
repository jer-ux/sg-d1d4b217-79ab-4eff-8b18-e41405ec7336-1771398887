import { DollarSign, Database, TrendingUp, BarChart3, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function ProviderUnitCostTrendEngine() {
  return (
    <EngineDetailLayout
      title="Provider Unit Cost Trend Engine"
      category="Financial & Trend"
      tagline="Separate Provider Price Inflation from Utilization—Track Per-Service Cost Increases Across Thousands of Procedure Codes"
      gradient="from-emerald-600 via-teal-600 to-cyan-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Unit Cost vs. Utilization Blindness" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Blended Trend Reporting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>"Total claims up 11%" doesn't tell you if costs rose or volumes rose</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>CFOs can't identify provider pricing abuse vs. legitimate utilization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No CPT-level unit cost trending (MRI, colonoscopy, lab tests, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot benchmark provider pricing against Medicare/FAIR Health</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">Unit Cost Trend Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Pure unit cost trend: exact same service, year-over-year price change</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Separate utilization component: frequency, mix-shift, coding intensity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>CPT-level forensics: "CT chest w/contrast +18% unit cost, volume flat"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Medicare benchmarking: "Your MRI is 285% of Medicare, up from 260%"</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Unit Cost Decomposition Algorithm" icon={DollarSign}>
        <VegasCodeBlock language="python">
{`# Provider Unit Cost Trending
def calculate_unit_cost_trend(current_claims, prior_claims, procedure_code):
    # Pure Unit Cost Trend (same service, different price)
    current_cost_per_service = (
        current_claims[procedure_code].total_allowed / 
        current_claims[procedure_code].service_count
    )
    prior_cost_per_service = (
        prior_claims[procedure_code].total_allowed / 
        prior_claims[procedure_code].service_count
    )
    
    unit_cost_trend = (current_cost_per_service / prior_cost_per_service) - 1
    
    # Utilization Trend (same price, different volume)
    current_services_pmpm = (
        current_claims[procedure_code].service_count / 
        current_claims.total_member_months
    )
    prior_services_pmpm = (
        prior_claims[procedure_code].service_count / 
        prior_claims.total_member_months
    )
    
    utilization_trend = (current_services_pmpm / prior_services_pmpm) - 1
    
    # Total Trend (Multiplicative)
    total_trend = ((1 + unit_cost_trend) * (1 + utilization_trend)) - 1
    
    # Medicare Benchmark Comparison
    medicare_rate = get_medicare_rate(procedure_code, region='national')
    commercial_rate = current_cost_per_service
    medicare_pct = (commercial_rate / medicare_rate) * 100
    
    return {
        'procedure_code': procedure_code,
        'unit_cost_trend': unit_cost_trend,
        'utilization_trend': utilization_trend,
        'total_trend': total_trend,
        'current_unit_cost': current_cost_per_service,
        'medicare_benchmark': medicare_rate,
        'medicare_pct': medicare_pct,
        'attribution': {
            'unit_cost_contribution': unit_cost_trend / total_trend * 100,
            'utilization_contribution': utilization_trend / total_trend * 100
        }
    }

# Example Output for CPT 70553 (MRI Brain w/ and w/o Contrast):
# {
#   'unit_cost_trend': 0.092,  # +9.2% unit cost inflation
#   'utilization_trend': 0.035,  # +3.5% utilization growth
#   'total_trend': 0.129,  # +12.9% total
#   'current_unit_cost': 1250,
#   'medicare_benchmark': 438,
#   'medicare_pct': 285,  # Paying 2.85x Medicare
#   'attribution': {
#       'unit_cost_contribution': 71%,  # Price is the problem
#       'utilization_contribution': 27%   # Volume is secondary
#   }
# }
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Pricing Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Database}
            label="Procedure Codes Tracked"
            value="5,000+"
            gradient="from-emerald-500 to-teal-500"
            description="Top CPT codes covering 95% of medical spend"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Benchmark Sources"
            value="Medicare + FAIR Health"
            gradient="from-teal-500 to-cyan-500"
            description="National and regional reference pricing"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Renegotiation Targets"
            value="Auto-Flagged"
            gradient="from-cyan-500 to-blue-500"
            description="Services with >250% Medicare or >15% YoY increase"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Network Negotiation Leverage" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="CT Scan Pricing Abuse"
            items={[
              "CT chest w/ contrast: $1,850 avg unit cost (up 18% YoY)",
              "Medicare rate: $520 (3.6x markup)",
              "Volume stable: 145 services PMPY (flat)",
              "Conclusion: pure price inflation, not utilization",
              "Renegotiated to 250% Medicare ($1,300), saved $80K annually"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Lab Test Trending"
            items={[
              "Comprehensive metabolic panel: $28 unit cost (up 22%)",
              "Medicare: $14 (2.0x markup)",
              "Volume up 8% (preventive care initiative)",
              "Unit cost trend = 81% of total trend",
              "Switched to reference lab, reduced to $18 per test"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="MRI Network Optimization"
            items={[
              "Hospital MRI: $2,100 avg, up 11% YoY",
              "Freestanding imaging center: $950 same quality",
              "Steered 65% of MRIs to freestanding sites",
              "Saved $145K on 250 annual MRIs",
              "Unit cost dropped 42%, utilization up 4% (appropriate access)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Know What You're Really Paying Per Service</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Separate unit cost inflation from utilization growth. Benchmark every procedure against Medicare. 
            Walk into network negotiations with CPT-level forensics.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-teal-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-teal-50 transition-all duration-200 shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105">
            Analyze Unit Costs
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}