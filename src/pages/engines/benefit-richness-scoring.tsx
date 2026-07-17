import { Award, Database, Target, AlertTriangle, CheckCircle2, BarChart3, Users, Zap, TrendingUp } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function BenefitRichnessPage() {
  return (
    <EngineDetailLayout
      title="Benefit Richness Scoring Engine"
      category="Strategic Benchmarking"
      tagline="Quantify Plan Generosity Across Medical, Rx, and Ancillary—Know Your Competitive Position vs. Peer Deciles"
      gradient="from-purple-600 via-fuchsia-600 to-pink-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Cost vs. Value Confusion" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Spend-Based Thinking</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>$15K PEPY could be stingy (high cost, low value) or generous (efficient delivery)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Cannot quantify competitive position vs. peer deciles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>No visibility into which benefit categories drive perceived value</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Overpaying for mediocre coverage or delivering premium efficiently?</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-purple-400 mb-4">Richness-Based Intelligence</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>Composite score (0-100) separates cost from actuarial value</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>Peer percentile ranking by industry/region/size cohort</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>Category-level visibility: medical, rx, dental, vision, mental health, etc.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>Strategic insights: over-investment zones vs. competitive gaps</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Composite Richness Algorithm" icon={Database}>
        <VegasCodeBlock language="python">
{`# Benefit Richness Scoring Engine
def calculate_richness_score(plan_design, benchmark_cohort):
    component_scores = {}
    
    # Medical Plan Richness (40% weight)
    medical_factors = {
        'deductible_individual': plan_design.deductible_individual,
        'deductible_family': plan_design.deductible_family,
        'oop_max_individual': plan_design.oop_max_individual,
        'oop_max_family': plan_design.oop_max_family,
        'coinsurance': plan_design.coinsurance,
        'pcp_copay': plan_design.pcp_copay,
        'specialist_copay': plan_design.specialist_copay,
        'er_copay': plan_design.er_copay,
        'network_breadth': plan_design.network_provider_count / benchmark_cohort.avg_network_size
    }
    
    # Score each factor (0-100, lower deductible/copay = higher score)
    medical_score = 0
    for factor, value in medical_factors.items():
        if factor in ['deductible_individual', 'deductible_family', 'oop_max_individual', 'oop_max_family']:
            # Inverse scoring: lower is better
            peer_median = benchmark_cohort.median(factor)
            score = max(0, min(100, 100 - ((value - peer_median) / peer_median * 50)))
        elif factor == 'network_breadth':
            # Direct scoring: higher is better
            score = min(100, value * 100)
        else:  # copays
            peer_median = benchmark_cohort.median(factor)
            score = max(0, min(100, 100 - ((value - peer_median) / peer_median * 50)))
        
        medical_score += score / len(medical_factors)
    
    component_scores['medical'] = medical_score
    
    # Pharmacy Richness (30% weight)
    pharmacy_factors = {
        'tier_count': 5 if plan_design.specialty_tier else 4,  # More tiers = worse
        'generic_copay': plan_design.tier1_copay,
        'preferred_brand_copay': plan_design.tier2_copay,
        'nonpreferred_brand_copay': plan_design.tier3_copay,
        'specialty_copay': plan_design.tier4_copay if hasattr(plan_design, 'tier4_copay') else None,
        'prior_auth_prevalence': plan_design.prior_auth_drug_count / plan_design.total_formulary_drugs
    }
    
    pharmacy_score = 0
    scored_factors = 0
    for factor, value in pharmacy_factors.items():
        if value is None:
            continue
        peer_median = benchmark_cohort.median(factor)
        if factor in ['tier_count', 'prior_auth_prevalence']:
            # Inverse: fewer tiers/lower PA = better
            score = max(0, min(100, 100 - ((value - peer_median) / peer_median * 50)))
        else:  # copays
            score = max(0, min(100, 100 - ((value - peer_median) / peer_median * 50)))
        pharmacy_score += score
        scored_factors += 1
    
    component_scores['pharmacy'] = pharmacy_score / scored_factors
    
    # Ancillary Richness (30% weight)
    ancillary_factors = {
        'dental_annual_max': plan_design.dental_annual_max,
        'dental_preventive_coverage': 1.0 if plan_design.dental_preventive_pct == 100 else 0.5,
        'vision_exam_frequency': 12 if plan_design.vision_exam_months == 12 else 24,
        'mental_health_parity': 1.0 if plan_design.mental_health_parity else 0.0,
        'fertility_max': plan_design.fertility_lifetime_max if hasattr(plan_design, 'fertility_lifetime_max') else 0,
        'hsa_employer_contribution': plan_design.hsa_employer_annual if hasattr(plan_design, 'hsa_employer_annual') else 0
    }
    
    ancillary_score = 0
    for factor, value in ancillary_factors.items():
        peer_median = benchmark_cohort.median(factor)
        if peer_median > 0:
            # Direct scoring: higher is better for ancillary
            score = min(100, (value / peer_median) * 100)
        else:
            score = 100 if value > 0 else 0
        ancillary_score += score / len(ancillary_factors)
    
    component_scores['ancillary'] = ancillary_score
    
    # Composite Richness Score
    composite_score = (
        component_scores['medical'] * 0.40 +
        component_scores['pharmacy'] * 0.30 +
        component_scores['ancillary'] * 0.30
    )
    
    # Peer Percentile
    peer_scores = [calculate_richness_score(peer, benchmark_cohort)['composite'] 
                   for peer in benchmark_cohort.peers]
    percentile = sum(1 for s in peer_scores if s < composite_score) / len(peer_scores) * 100
    
    return {
        'composite': composite_score,
        'percentile': percentile,
        'medical': component_scores['medical'],
        'pharmacy': component_scores['pharmacy'],
        'ancillary': component_scores['ancillary'],
        'peer_cohort_size': len(benchmark_cohort.peers)
    }

# Example: Score your plan
your_plan = load_plan_design('2024')
peer_group = load_benchmark_cohort(industry='technology', region='west', size='5000-10000')

result = calculate_richness_score(your_plan, peer_group)

print("Benefit Richness Score: {:.0f}/100".format(result['composite']))
print("Peer Percentile: {:.0f}th".format(result['percentile']))
print("Medical: {:.0f}/100".format(result['medical']))
print("Pharmacy: {:.0f}/100".format(result['pharmacy']))
print("Ancillary: {:.0f}/100".format(result['ancillary']))
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Richness Intelligence" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={Award}
            label="Composite Score"
            value="0-100"
            sublabel="weighted: 40% medical, 30% rx, 30% ancillary"
            gradient="from-purple-600 to-fuchsia-600"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Peer Percentile"
            value="Industry Rank"
            sublabel="vs. size/region/sector cohort"
            gradient="from-fuchsia-600 to-pink-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Category Breakdown"
            value="10+ Factors"
            sublabel="deductibles, copays, network, formulary, etc."
            gradient="from-pink-600 to-rose-600"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Strategic Insights"
            value="Over/Under"
            sublabel="investment zones vs. competitive gaps"
            gradient="from-rose-600 to-red-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Strategic Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Talent Acquisition ROI"
            items={[
              "Tech unicorn (2,800 employees): recruiting struggled vs. FAANG",
              "Richness analysis revealed: 95th percentile specialist copays (unused by 22-34 workforce)",
              "But: 40th percentile mental health coverage (high-demand segment)",
              "Strategic reallocation:",
              "  - Specialist copay: 95th → 65th percentile (saved $1.6M)",
              "  - Mental health: 40th → 90th percentile (invested $1.2M)",
              "Net employer savings: $400K annually",
              "Employee satisfaction: +18 points",
              "Offer acceptance rate: +14% (from 72% to 86%)",
              "Time-to-fill: -23% reduction"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Union Negotiation Defense"
            items={[
              "Manufacturing (12,000 employees): union demanded 'poverty benefits' narrative",
              "Richness scoring showed: 82nd percentile overall vs. regional competitors",
              "Category breakdown:",
              "  - Medical: 78th percentile",
              "  - Pharmacy: 85th percentile",
              "  - Dental: 80th percentile",
              "Third-party actuarial validation confirmed scoring",
              "Union outcome: accepted 2.5% wage increase vs. demanded 4.5%",
              "Company avoided: $8M in benefit concessions",
              "Labor relations: preserved 3-year peace, avoided strike"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Know Your True Competitive Position</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Score your plan richness. Benchmark vs. peer deciles. Identify over-investment and competitive gaps. Make data-driven benefit decisions.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
            Score Benefit Richness
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}