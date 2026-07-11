import { Activity, Database, TrendingUp, BarChart3, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function UtilizationTrendEngine() {
  return (
    <EngineDetailLayout
      title="Utilization Trend Engine"
      category="Financial & Trend"
      tagline="Track Services Per Member Per Year Across 50+ Care Categories—Detect Overutilization, Underutilization, and Mix-Shift"
      gradient="from-blue-600 via-indigo-600 to-violet-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Utilization Black Box" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Aggregate Utilization Reporting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>"Claims volume up 8%" doesn't tell you which services increased</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot distinguish appropriate utilization from waste</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No detection of mix-shift (ER → urgent care, inpatient → outpatient)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Missing preventive care gaps and chronic disease underutilization</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-blue-400 mb-4">Utilization Trend Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Services PMPY trending across 50+ categories (ER visits, MRIs, surgeries, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Overutilization flags: ER 4.2 PMPY vs. 2.8 benchmark</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Mix-shift detection: hospital outpatient → ASC migration saves 40%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Preventive care gaps: mammogram rate 58% vs. 75% target</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Utilization Decomposition Framework" icon={Activity}>
        <VegasCodeBlock language="python">
{`# Utilization Trend Analysis
utilization_categories = {
    'emergency_room': {
        'visits_pmpy': lambda claims: calculate_pmpy(claims, place_of_service='23'),
        'benchmark': 2.8,
        'target_range': (1.8, 3.2)
    },
    'inpatient_admits': {
        'admits_pmpy': lambda claims: calculate_pmpy(claims, revenue_code='0100-0219'),
        'benchmark': 0.065,
        'target_range': (0.050, 0.080)
    },
    'mri_ct_scans': {
        'scans_pmpy': lambda claims: calculate_pmpy(claims, cpt_prefix=['70', '71', '72', '73']),
        'benchmark': 0.95,
        'target_range': (0.70, 1.20)
    },
    'preventive_colonoscopy': {
        'procedures_pmpy': lambda claims: calculate_pmpy(claims, cpt_code='G0121'),
        'benchmark': 0.082,  # Age 50+ eligible population
        'target_range': (0.070, 0.095)
    }
}

def analyze_utilization_trends(current_claims, prior_claims, members):
    results = {}
    
    for category, config in utilization_categories.items():
        # Current Period Utilization
        current_services = count_services(current_claims, config)
        current_member_months = members.current_period_member_months
        current_pmpy = (current_services / current_member_months) * 12
        
        # Prior Period Utilization
        prior_services = count_services(prior_claims, config)
        prior_member_months = members.prior_period_member_months
        prior_pmpy = (prior_services / prior_member_months) * 12
        
        # Trend Calculation
        utilization_trend = (current_pmpy / prior_pmpy) - 1
        
        # Benchmark Variance
        benchmark_variance = (current_pmpy / config['benchmark']) - 1
        
        # Flag Status
        if current_pmpy > config['target_range'][1]:
            flag = 'OVERUTILIZATION'
        elif current_pmpy < config['target_range'][0]:
            flag = 'UNDERUTILIZATION'
        else:
            flag = 'NORMAL'
        
        results[category] = {
            'current_pmpy': current_pmpy,
            'prior_pmpy': prior_pmpy,
            'utilization_trend': utilization_trend,
            'benchmark': config['benchmark'],
            'benchmark_variance': benchmark_variance,
            'flag': flag
        }
    
    return results

# Example Output:
# {
#   'emergency_room': {
#       'current_pmpy': 4.2,
#       'prior_pmpy': 3.8,
#       'utilization_trend': 0.105,  # +10.5%
#       'benchmark': 2.8,
#       'benchmark_variance': 0.50,  # 50% above benchmark
#       'flag': 'OVERUTILIZATION'
#   },
#   'preventive_colonoscopy': {
#       'current_pmpy': 0.058,
#       'prior_pmpy': 0.062,
#       'utilization_trend': -0.065,  # -6.5%
#       'benchmark': 0.082,
#       'benchmark_variance': -0.293,  # 29% below benchmark
#       'flag': 'UNDERUTILIZATION'
#   }
# }
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Utilization Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Database}
            label="Service Categories"
            value="50+ Types"
            gradient="from-blue-500 to-indigo-500"
            description="ER, inpatient, outpatient, pharmacy, preventive, chronic care"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Benchmark Sources"
            value="Milliman MedInsight"
            gradient="from-indigo-500 to-violet-500"
            description="Industry utilization norms by age/gender"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Care Gap Detection"
            value="Automated"
            gradient="from-violet-500 to-purple-500"
            description="Preventive services underutilization flags"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Utilization Management" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="ER Overutilization"
            items={[
              "ER visits: 4.2 PMPY vs. 2.8 benchmark (50% excess)",
              "Cost per ER visit: $1,850 avg",
              "Implemented 24/7 nurse line + telemedicine",
              "Reduced ER utilization to 3.1 PMPY",
              "Saved $425K annually (1,100 avoided ER visits)"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Preventive Care Gaps"
            items={[
              "Colonoscopy screening: 58% of eligible vs. 75% target",
              "Mammography: 62% vs. 80% target",
              "Member outreach campaign: reminder letters + incentives",
              "Increased screening rates to 72% colonoscopy, 76% mammo",
              "Avoided 2 late-stage cancer diagnoses (estimated $600K savings)"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Site-of-Service Optimization"
            items={[
              "Colonoscopy: 60% hospital outpatient, 40% ASC",
              "Hospital avg: $3,200, ASC avg: $1,900 (41% savings)",
              "Steered to ASC: increased to 75% ASC utilization",
              "Same quality outcomes, saved $195K on 500 procedures"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Guessing Where Care is Being Consumed</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Track services PMPY across 50+ categories. Detect overutilization waste, close preventive care gaps, 
            and optimize site-of-service mix.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-indigo-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105">
            Analyze Utilization
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}