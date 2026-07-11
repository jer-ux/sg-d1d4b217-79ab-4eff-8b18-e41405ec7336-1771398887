import { TrendingUp, Database, BarChart3, PieChart, CheckCircle2, AlertTriangle, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function InflationDecompositionEngine() {
  return (
    <EngineDetailLayout
      title="Inflation Decomposition Engine"
      category="Financial & Trend"
      tagline="Separate Medical Inflation Into Three Forces: General Economy CPI, Healthcare-Specific Inflation, and Utilization Change"
      gradient="from-amber-600 via-yellow-600 to-orange-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The 12% Trend Lie" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Opaque Trend Attribution</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Carriers report "12% medical trend" with zero decomposition</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>CFOs can't tell if inflation is economic (CPI), healthcare-specific, or utilization-driven</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No basis to negotiate: "Market is up 12%" becomes a non-negotiable fact</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Wrong intervention: utilization problem requires different solution than unit cost inflation</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-amber-400 mb-4">Inflation Decomposition</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Three-component decomposition: CPI, Healthcare PPI, Utilization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Quantify each force's contribution (e.g., "5.2% of your 9.8% trend is unit cost")</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Network negotiation leverage: "Your pricing grew 2x faster than BLS Healthcare PPI"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Targeted interventions: utilization management vs. network renegotiation vs. accept macro forces</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Three-Factor Decomposition Model" icon={PieChart}>
        <VegasCodeBlock language="python">
{`# Multiplicative Trend Decomposition
def decompose_medical_trend(claims_data, macro_data):
    # Component 1: General Economic Inflation (CPI)
    cpi_start = macro_data.cpi_medical[period_start]
    cpi_end = macro_data.cpi_medical[period_end]
    cpi_inflation = (cpi_end / cpi_start) - 1
    
    # Component 2: Healthcare-Specific Inflation (above CPI)
    # Compare actual unit costs to CPI-adjusted baseline
    baseline_unit_cost = historical_unit_cost * (1 + cpi_inflation)
    actual_unit_cost = current_period_unit_cost
    healthcare_inflation = (actual_unit_cost / baseline_unit_cost) - 1
    
    # Component 3: Utilization Change
    baseline_utilization = historical_services_per_member
    actual_utilization = current_services_per_member
    utilization_change = (actual_utilization / baseline_utilization) - 1
    
    # Total Trend (Multiplicative)
    total_trend = ((1 + cpi_inflation) * 
                   (1 + healthcare_inflation) * 
                   (1 + utilization_change)) - 1
    
    # Attribution Percentages
    cpi_contribution = cpi_inflation / total_trend
    healthcare_contribution = healthcare_inflation / total_trend
    utilization_contribution = utilization_change / total_trend
    
    return {
        'total_trend': total_trend,
        'cpi_inflation': cpi_inflation,
        'healthcare_inflation': healthcare_inflation,
        'utilization_change': utilization_change,
        'attribution': {
            'cpi_pct': cpi_contribution * 100,
            'healthcare_pct': healthcare_contribution * 100,
            'utilization_pct': utilization_contribution * 100
        }
    }

# Example Output:
# Total Trend: 9.8%
#   ├─ CPI Medical Inflation: 3.2% (33% of trend)
#   ├─ Healthcare-Specific: 5.1% (52% of trend)
#   └─ Utilization Change: 1.2% (12% of trend)
# 
# Interpretation: 52% of trend is unit cost growth ABOVE general inflation
# → Network negotiation is the highest-leverage intervention
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Decomposition Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={TrendingUp}
            label="Macro Data Sources"
            value="BLS CPI-U"
            gradient="from-amber-500 to-yellow-500"
            description="Bureau of Labor Statistics Medical Care CPI"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Granularity"
            value="By Service"
            gradient="from-yellow-500 to-orange-500"
            description="Decompose separately for inpatient, outpatient, professional, Rx"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Negotiation Power"
            value="Quantified"
            gradient="from-orange-500 to-red-500"
            description="Provider pricing excess above BLS benchmarks"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Strategic Applications" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Network Renegotiation"
            items={[
              "Total trend: 11.2%, carrier blamed 'market conditions'",
              "Decomposition: 3.1% CPI, 6.8% healthcare-specific, 1.3% utilization",
              "Healthcare-specific = 61% of trend (network pricing problem)",
              "CFO challenged carrier: 'BLS Healthcare PPI is +4.2%, you're +6.8%'",
              "Renegotiated contract, reduced trend to 8.9%"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Utilization Management"
            items={[
              "Total trend: 10.5%",
              "Decomposition: 3.0% CPI, 2.8% healthcare, 4.4% utilization",
              "Utilization = 42% of trend (care management opportunity)",
              "Implemented prior authorization for high-cost imaging",
              "Reduced utilization component from 4.4% to 2.1%"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Board Transparency"
            items={[
              "CFO presented 12% budget increase to board",
              "Board questioned: 'Why so high when CPI is 3%?'",
              "Decomposition chart showed: 3% CPI + 5% provider pricing + 3.5% aging workforce",
              "Board approved budget with clear attribution",
              "CFO credibility preserved with mathematical defensibility"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Accepting "Market Trend" at Face Value</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Decompose your medical trend into CPI, healthcare-specific inflation, and utilization. Know exactly where your money is going and which lever to pull.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-amber-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-amber-50 transition-all duration-200 shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105">
            Decompose Your Trend
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}