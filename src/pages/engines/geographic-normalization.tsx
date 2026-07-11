import { MapPin, Database, BarChart3, DollarSign, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function GeographicNormalizationEngine() {
  return (
    <EngineDetailLayout
      title="Geographic Normalization Engine"
      category="Financial & Trend"
      tagline="Adjust Healthcare Costs for Regional Price Differences—Compare New York to Alabama Apples-to-Apples"
      gradient="from-cyan-600 via-sky-600 to-blue-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Geographic Cost Distortion" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Raw Cost Comparisons</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>NYC office spends $15K PMPY, Alabama office $8K PMPY — which is efficient?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot compare multi-state employers without geographic adjustment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Trend analysis contaminated by office relocations or workforce shifts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>National benchmarks meaningless without regional cost indexing</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-cyan-400 mb-4">Geographic Normalization</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>CBSA-level cost indexing: Manhattan 1.32x, Birmingham 0.78x national avg</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Apples-to-apples comparisons: NYC $11.4K normalized, Alabama $10.3K normalized</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Clean trend analysis: workforce migration doesn't distort performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Fair benchmarking: compare to regional peers, not national averages</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="CBSA Geographic Indexing" icon={MapPin}>
        <VegasCodeBlock language="python">
{`# Geographic Cost Adjustment Framework
geographic_indices = {
    'NY-Newark-Jersey City': {
        'cbsa_code': '35620',
        'medical_index': 1.32,
        'pharmacy_index': 1.08,
        'mental_health_index': 1.18
    },
    'Birmingham-Hoover, AL': {
        'cbsa_code': '13820',
        'medical_index': 0.78,
        'pharmacy_index': 0.92,
        'mental_health_index': 0.85
    },
    'San Francisco-Oakland-Berkeley': {
        'cbsa_code': '41860',
        'medical_index': 1.45,
        'pharmacy_index': 1.12,
        'mental_health_index': 1.28
    },
    'National Average': {
        'medical_index': 1.00,
        'pharmacy_index': 1.00,
        'mental_health_index': 1.00
    }
}

def normalize_costs_by_geography(member_costs, member_locations):
    normalized_costs = []
    
    for member in member_costs:
        cbsa = member_locations[member.id].cbsa_code
        region_index = geographic_indices[cbsa]
        
        # Normalize Each Cost Component
        normalized_medical = member.medical_costs / region_index['medical_index']
        normalized_rx = member.rx_costs / region_index['pharmacy_index']
        normalized_mh = member.mental_health_costs / region_index['mental_health_index']
        
        normalized_total = normalized_medical + normalized_rx + normalized_mh
        
        normalized_costs.append({
            'member_id': member.id,
            'actual_costs': member.total_costs,
            'normalized_costs': normalized_total,
            'cbsa': cbsa,
            'adjustment_factor': member.total_costs / normalized_total
        })
    
    return normalized_costs

# Example: Multi-State Employer Comparison
# Location 1: New York (1.32x index)
#   - Actual PMPY: $15,000
#   - Normalized PMPY: $11,364 ($15K / 1.32)
# 
# Location 2: Birmingham (0.78x index)
#   - Actual PMPY: $8,000
#   - Normalized PMPY: $10,256 ($8K / 0.78)
# 
# Conclusion: Birmingham is actually LESS efficient than NYC
# when adjusted for regional cost differences.
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Regional Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={MapPin}
            label="Geographic Coverage"
            value="929 CBSAs"
            gradient="from-cyan-500 to-sky-500"
            description="Core-Based Statistical Areas covering entire US"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Cost Variance Range"
            value="0.65x to 1.55x"
            gradient="from-sky-500 to-blue-500"
            description="Lowest (rural Montana) to highest (Manhattan)"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Adjustment Precision"
            value="Service-Level"
            gradient="from-blue-500 to-indigo-500"
            description="Separate indices for medical, Rx, mental health"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Fair Comparisons" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Multi-State Cost Analysis"
            items={[
              "5 offices: NYC, SF, Chicago, Dallas, Birmingham",
              "Raw PMPY: NYC $16K, SF $18K, Birmingham $8.5K",
              "After normalization: NYC $12.1K, SF $12.4K, Birmingham $10.9K",
              "Birmingham appears cheapest raw, but least efficient normalized",
              "Focus improvement efforts on Birmingham operations"
            ]}
          />
          <VegasFeatureCard
            icon={DollarSign}
            title="Workforce Migration Impact"
            items={[
              "2024: 60% NYC, 40% remote to lower-cost states",
              "2025: 40% NYC, 60% remote",
              "Raw trend: -8.5% PMPY (looks like huge win)",
              "Normalized trend: -2.1% PMPY (actual performance)",
              "Prevented false sense of improvement from geography shift"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Regional Benchmarking"
            items={[
              "Boston office: $14.2K PMPY actual, $11.8K normalized",
              "Regional benchmark (Boston CBSA): $12.5K normalized",
              "6% below regional average (efficient)",
              "Would appear 23% above national $11.5K without normalization",
              "Fair performance assessment drives correct strategy"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Compare Costs Fairly Across Geographies</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Adjust for regional cost differences across 929 CBSAs. Make apples-to-apples comparisons. 
            Identify true performance vs. geographic artifacts.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-sky-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-sky-50 transition-all duration-200 shadow-2xl hover:shadow-sky-500/50 transform hover:scale-105">
            Normalize Costs
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}