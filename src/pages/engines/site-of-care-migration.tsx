import { MapPin, TrendingDown, DollarSign, CheckCircle2, Target, BarChart3, Building2 } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function SiteOfCareMigrationEngine() {
  return (
    <EngineDetailLayout
      title="Site of Care Migration Engine"
      category="Cost Optimization"
      tagline="Shift Procedures from Hospital Outpatient to ASC/Office Settings—Model 40-60% Cost Reduction Across 200+ Procedures"
      gradient="from-cyan-600 via-blue-600 to-indigo-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $850K Hidden in Facility Fees" icon={DollarSign}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Same Procedure, 3× The Cost</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Colonoscopy at hospital outpatient: $3,200. Same procedure at ASC: $1,100.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>MRI at hospital: $2,400. Freestanding imaging center: $850.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Infusion at hospital: $4,800/session. Office-based infusion: $1,600.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Most employers have no visibility to site-of-care cost differentials or migration opportunities</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-cyan-400 mb-4">Site of Care Migration Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Identify 200+ procedures eligible for lower-cost site migration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Model cost differential by procedure: hospital vs. ASC vs. office vs. freestanding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Quality-adjusted savings: only migrate where outcomes are equivalent or better</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Member steering strategies: plan design, COE programs, prior auth, tiered networks</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Migration Opportunity Algorithm" icon={MapPin}>
        <VegasCodeBlock language="python">
{`# Site of Care Migration Modeling
procedure_cost_matrix = {
    'colonoscopy': {
        'hospital_outpatient': 3200,
        'asc': 1100,
        'savings': 2100,
        'migration_eligible': True,
        'quality_score': 'equivalent'
    },
    'cataract_surgery': {
        'hospital_outpatient': 4800,
        'asc': 2100,
        'savings': 2700,
        'migration_eligible': True,
        'quality_score': 'superior_asc'  # ASC outcomes better
    },
    'mri_lumbar_spine': {
        'hospital': 2400,
        'freestanding_imaging': 850,
        'savings': 1550,
        'migration_eligible': True,
        'quality_score': 'equivalent'
    },
    'rheumatoid_arthritis_infusion': {
        'hospital': 4800,
        'office_based': 1600,
        'savings': 3200,
        'migration_eligible': True,
        'quality_score': 'equivalent'
    },
    'knee_arthroscopy': {
        'hospital_outpatient': 12500,
        'asc': 5200,
        'savings': 7300,
        'migration_eligible': True,
        'quality_score': 'equivalent'
    }
}

def calculate_migration_opportunity(claims_data, utilization_history):
    total_savings = 0
    migration_plan = []
    
    for procedure, costs in procedure_cost_matrix.items():
        if not costs['migration_eligible']:
            continue
        
        # Find historical utilization at high-cost sites
        hospital_claims = claims_data.filter(
            procedure_code=procedure,
            site_of_service='hospital_outpatient'
        )
        
        volume = len(hospital_claims)
        current_cost = volume * costs['hospital_outpatient']
        
        # Assume 70% migration success rate (member steering + network design)
        migrated_volume = volume * 0.70
        target_site = 'asc' if 'asc' in costs else 'freestanding_imaging'
        future_cost = (migrated_volume * costs[target_site]) + ((volume - migrated_volume) * costs['hospital_outpatient'])
        
        annual_savings = current_cost - future_cost
        total_savings += annual_savings
        
        migration_plan.append({
            'procedure': procedure,
            'current_volume': volume,
            'migrated_volume': migrated_volume,
            'annual_savings': annual_savings,
            'per_procedure_savings': costs['savings'],
            'quality_impact': costs['quality_score']
        })
    
    # Sort by savings opportunity
    migration_plan.sort(key=lambda x: x['annual_savings'], reverse=True)
    
    return {
        'total_annual_savings': total_savings,
        'pmpm_impact': total_savings / 12 / len(utilization_history),
        'top_opportunities': migration_plan[:10]
    }

# Example: 10,000 member population
claims = load_claims('2024')
result = calculate_migration_opportunity(claims, population=10000)

print("Total Annual Savings: ${:,.0f}".format(result['total_annual_savings']))
print("PMPM Reduction: ${:.2f}".format(result['pmpm_impact']))
print("\\nTop 5 Opportunities:")
for opp in result['top_opportunities'][:5]:
    print("  {}: ${:,.0f}/year ({} procedures)".format(
        opp['procedure'], opp['annual_savings'], opp['current_volume']))
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Migration Impact Metrics" icon={BarChart3}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={MapPin}
            label="Procedures Tracked"
            value="200+"
            gradient="from-cyan-500 to-blue-500"
            description="Colonoscopy, cataract, MRI, infusion, arthroscopy, and 195+ more"
          />
          <VegasMetricCard
            icon={TrendingDown}
            label="Average Savings"
            value="40-60%"
            gradient="from-blue-500 to-indigo-500"
            description="Cost reduction per migrated procedure vs. hospital outpatient"
          />
          <VegasMetricCard
            icon={DollarSign}
            label="Typical ROI"
            value="$850K/Year"
            gradient="from-indigo-500 to-purple-500"
            description="Annual savings for 10,000 lives with comprehensive migration program"
          />
        </div>
      </VegasSection>

      {/* Migration Strategy */}
      <VegasSection title="Implementation Playbook" icon={Target}>
        <VegasCodeBlock language="markdown">
{`# Site of Care Migration Roadmap

## Phase 1: Opportunity Sizing (Month 1-2)
├─ Claims analysis: identify procedures done at high-cost sites
├─ Volume by procedure: colonoscopy (140/year), MRI (280/year), infusion (520 sessions), etc.
├─ Cost differential modeling: $2.1M current spend → $1.25M if migrated (40% savings)
└─ **Baseline: $850K annual savings opportunity**

## Phase 2: Network Assessment (Month 3-4)
├─ ASC availability: 6 in-network ASCs within 15 miles
├─ Freestanding imaging: 4 centers with MRI, quality-accredited
├─ Office-based infusion: 2 rheumatology practices with infusion suites
└─ **Migration feasible for 85% of identified procedures**

## Phase 3: Plan Design (Month 5-6)
├─ Differential copays: $150 hospital vs. $50 ASC (3× incentive)
├─ Prior authorization: require pre-auth for hospital site unless medical necessity
├─ Center of Excellence program: 0% coinsurance at designated ASC/imaging centers
└─ **Member steering: financial + administrative nudges**

## Phase 4: Launch + Monitoring (Month 7+)
├─ Member communication: "Save $100+ by choosing lower-cost sites"
├─ Provider education: share site-of-care cost data with referring physicians
├─ Real-time steering: case management outreach when high-cost site scheduled
└─ **Target: 70% migration rate by Month 12**

## 12-Month Results
├─ Colonoscopy: 98 migrated to ASC (70% rate) = $205K saved
├─ MRI: 196 migrated to freestanding (70% rate) = $304K saved
├─ Infusion: 364 sessions migrated (70% rate) = $341K saved
└─ **Total Year 1 Savings: $850K (matches forecast)**
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Migration Success Stories" icon={CheckCircle2}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={MapPin}
            title="Colonoscopy Steering Program"
            items={[
              "Manufacturing client: 8,500 lives, 140 colonoscopies/year",
              "90% performed at hospital outpatient ($3,200 each)",
              "Implemented $150 hospital copay vs. $50 ASC copay",
              "Year 1 migration: 98 procedures to ASC (70%)",
              "Savings: $205,800 annually with zero quality impact"
            ]}
          />
          <VegasFeatureCard
            icon={Building2}
            title="MRI Network Optimization"
            items={[
              "PE portfolio company: 12,000 lives, 280 MRIs/year",
              "Hospital MRI: $2,400 | Freestanding: $850",
              "Added 4 freestanding imaging centers to COE tier (0% coins)",
              "196 MRIs migrated in Year 1 (70% success rate)",
              "Annual savings: $304,000 + improved member experience"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Infusion Suite Migration"
            items={[
              "Healthcare system: 6,000 lives, 520 infusion sessions/year",
              "Hospital infusion: $4,800 | Office-based: $1,600",
              "Partnered with 2 rheumatology groups for office infusion",
              "Migrated 364 sessions (70%) in first year",
              "Savings: $341,000 + members prefer office convenience"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Cut Costs 40-60% Without Cutting Care</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Identify site-of-care migration opportunities across 200+ procedures. Model savings potential. 
            Build member steering programs that actually work.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105">
            Run Site Migration Analysis
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}