import { Activity, Database, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function CaseMixAdjustmentEngine() {
  return (
    <EngineDetailLayout
      title="Case Mix Adjustment Engine"
      category="Financial & Trend"
      tagline="Normalize for Disease Burden—Compare Diabetic Population to Healthy Population Apples-to-Apples"
      gradient="from-rose-600 via-red-600 to-orange-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Hidden Acuity Variable" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Unadjusted Cost Comparisons</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Group A: $950 PMPM. Group B: $1,200 PMPM. Which has better care management?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot tell if cost difference is efficiency or disease burden (diabetes, cancer, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Trend contaminated by new chronic disease diagnoses vs. actual cost inflation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Penalizes employers who hire/retain employees with chronic conditions</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-rose-400 mb-4">Case Mix Adjustment</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-1">✓</span>
                <span>HCC-based risk scoring: each chronic condition adds to population burden</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-1">✓</span>
                <span>Apples-to-apples: $950 PMPM → $1,080 adjusted, $1,200 PMPM → $980 adjusted</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-1">✓</span>
                <span>Clean trend: new diabetes diagnosis impact separated from utilization growth</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-1">✓</span>
                <span>Fair comparison: sicker population managed well vs. healthy population managed poorly</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="HCC Risk Adjustment Model" icon={Activity}>
        <VegasCodeBlock language="python">
{`# Hierarchical Condition Category (HCC) Risk Adjustment
hcc_risk_weights = {
    'HCC001': 0.302,  # HIV/AIDS
    'HCC008': 0.331,  # Metastatic Cancer
    'HCC018': 0.318,  # Diabetes with Chronic Complications
    'HCC019': 0.104,  # Diabetes without Complication
    'HCC085': 0.323,  # Congestive Heart Failure
    'HCC096': 0.368,  # Specified Heart Arrhythmias
    'HCC108': 0.191,  # Vascular Disease
    'HCC111': 0.302,  # Chronic Obstructive Pulmonary Disease
    'HCC134': 0.497,  # Dialysis Status (ESRD)
    # ... 86 total HCCs in CMS-HCC V28 model
}

def calculate_case_mix_index(population, claims_history):
    """
    Calculate population-level case mix index using HCC model
    """
    total_risk_score = 0
    
    for member in population:
        # Extract diagnoses from claims history
        diagnoses = extract_diagnoses(claims_history, member.id)
        
        # Map diagnoses to HCCs
        member_hccs = map_diagnoses_to_hccs(diagnoses)
        
        # Calculate member risk score (additive across HCCs)
        member_risk = 1.0  # Baseline healthy member
        for hcc in member_hccs:
            member_risk += hcc_risk_weights[hcc]
        
        total_risk_score += member_risk
    
    # Population Case Mix Index
    case_mix_index = total_risk_score / len(population)
    
    return case_mix_index

def adjust_costs_for_case_mix(actual_costs_pmpm, case_mix_index):
    """
    Normalize costs to a standard case mix of 1.0 (healthy population)
    """
    adjusted_costs = actual_costs_pmpm / case_mix_index
    
    return {
        'actual_pmpm': actual_costs_pmpm,
        'case_mix_index': case_mix_index,
        'adjusted_pmpm': adjusted_costs,
        'disease_burden_impact': (case_mix_index - 1.0) * 100
    }

# Example: Two Employers
# Employer A (Tech Startup):
#   - Actual PMPM: $950
#   - Case Mix Index: 0.88 (healthier than average)
#   - Adjusted PMPM: $1,080 ($950 / 0.88)
#
# Employer B (Manufacturing):
#   - Actual PMPM: $1,200
#   - Case Mix Index: 1.22 (22% sicker than average)
#   - Adjusted PMPM: $984 ($1,200 / 1.22)
#
# Conclusion: Manufacturing is actually MORE cost-efficient 
# when adjusted for their higher disease burden
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Acuity Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Activity}
            label="Condition Categories"
            value="86 HCCs"
            gradient="from-rose-500 to-red-500"
            description="CMS-HCC V28 model covering all major chronic conditions"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Risk Score Range"
            value="0.6x to 8.5x"
            gradient="from-red-500 to-orange-500"
            description="Healthy young adult vs. multi-comorbid dialysis patient"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Adjustment Precision"
            value="±3% PMPM"
            gradient="from-orange-500 to-amber-500"
            description="Accurate disease burden normalization"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Fair Performance Benchmarking" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Manufacturing vs. Tech"
            items={[
              "Manufacturer: $1,180 PMPM, Case Mix 1.35 (chronic disease heavy)",
              "Tech firm: $920 PMPM, Case Mix 0.82 (young/healthy)",
              "Adjusted: Manufacturer $874, Tech $1,122",
              "Manufacturer is 22% MORE efficient when disease-adjusted",
              "Tech firm has care management opportunity despite lower raw costs"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Chronic Disease Trend Isolation"
            items={[
              "2023: $985 PMPM, Case Mix 1.08",
              "2024: $1,095 PMPM, Case Mix 1.18 (+11% raw trend)",
              "2023 adjusted: $912, 2024 adjusted: $928",
              "True trend: +1.8% (not +11%)",
              "9.2% of apparent trend was new chronic diagnoses (aging workforce)"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Diabetes Management ROI"
            items={[
              "Diabetic cohort (n=85): $18,500 PMPY vs. $24,000 national benchmark",
              "Case Mix Index: 2.15 (HCC018 + comorbidities)",
              "Expected costs given acuity: $23,800",
              "Actual: $18,500 = 22% better than predicted",
              "Disease management program delivering $450K savings"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Compare Performance, Not Disease Burden</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Adjust for chronic disease acuity using HCC risk scores. Benchmark fairly across different health profiles. 
            Separate new diagnoses from cost trend.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-red-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-red-50 transition-all duration-200 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105">
            Adjust for Case Mix
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}