import { Building2, Database, TrendingDown, DollarSign, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function SiteOfCareMigrationEngine() {
  return (
    <EngineDetailLayout
      title="Site-of-Care Migration Engine"
      category="Healthcare Economics"
      tagline="Quantify Savings from Moving Procedures from Hospital Outpatient to Ambulatory Surgery Centers or Physician Offices"
      gradient="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Hospital Markup Problem" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Status Quo Hospital Outpatient</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Colonoscopy at hospital outpatient: $4,200. Same procedure at ASC: $1,800 (57% lower)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Members default to hospital system for convenience, no cost transparency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Facility fees add $2,000-5,000 to routine procedures (MRI, infusion, imaging)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot identify migration candidates: which procedures are safe for ASC/office?</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-violet-400 mb-4">Site-of-Care Optimization</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>CPT-level cost comparison: hospital vs. ASC vs. office setting for 200+ procedures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Member steering programs: transparency tools + financial incentives to choose lower-cost site</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Quality validation: ASC outcomes equivalent/better for routine procedures (CMS data)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✓</span>
                <span>Savings waterfall: identify highest-volume, highest-spread procedures for targeted migration</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Site-of-Care Economics Model" icon={Building2}>
        <VegasCodeBlock language="python">
{`# Site-of-Care Savings Calculator
import pandas as pd

site_of_care_pricing = {
    '45378': {  # Colonoscopy with biopsy
        'hospital_outpatient': 4200,
        'asc': 1800,
        'office': None  # Not applicable
    },
    '77080': {  # DXA bone density scan
        'hospital_outpatient': 425,
        'asc': None,
        'office': 180
    },
    '96413': {  # Chemotherapy infusion
        'hospital_outpatient': 3800,
        'asc': 2400,
        'office': 1950
    },
    '70553': {  # MRI brain with contrast
        'hospital_outpatient': 2850,
        'asc': 1200,
        'office': None
    },
    '52000': {  # Cystoscopy
        'hospital_outpatient': 3100,
        'asc': 1450,
        'office': 950
    }
}

def calculate_site_migration_savings(claims_data, target_procedures):
    """
    Quantify savings from migrating procedures to lower-cost sites
    """
    savings_opportunities = []
    
    for procedure_code in target_procedures:
        # Filter claims to this procedure
        proc_claims = claims_data[claims_data.cpt_code == procedure_code]
        
        # Classify current site of service
        hosp_claims = proc_claims[proc_claims.site == 'hospital_outpatient']
        asc_claims = proc_claims[proc_claims.site == 'asc']
        
        # Calculate potential savings
        hosp_count = len(hosp_claims)
        hosp_cost = site_of_care_pricing[procedure_code]['hospital_outpatient']
        asc_cost = site_of_care_pricing[procedure_code]['asc']
        
        if asc_cost is not None:
            unit_savings = hosp_cost - asc_cost
            total_savings = hosp_count * unit_savings
            
            savings_opportunities.append({
                'procedure': procedure_code,
                'hospital_volume': hosp_count,
                'hospital_cost_each': hosp_cost,
                'asc_cost_each': asc_cost,
                'unit_savings': unit_savings,
                'savings_pct': (unit_savings / hosp_cost) * 100,
                'total_savings_potential': total_savings
            })
    
    return pd.DataFrame(savings_opportunities).sort_values('total_savings_potential', ascending=False)

def model_migration_program(baseline_claims, migration_rate=0.30):
    """
    Forecast realistic migration assuming 30% adoption in year 1
    """
    opportunities = calculate_site_migration_savings(baseline_claims, target_procedures)
    
    year_1_savings = opportunities.total_savings_potential.sum() * migration_rate
    year_2_savings = opportunities.total_savings_potential.sum() * 0.50  # 50% by year 2
    year_3_savings = opportunities.total_savings_potential.sum() * 0.65  # 65% steady state
    
    return {
        'total_opportunity': opportunities.total_savings_potential.sum(),
        'year_1_actual': year_1_savings,
        'year_2_actual': year_2_savings,
        'year_3_steady_state': year_3_savings
    }

# Example: 5,000-Employee Group
# Procedure: Colonoscopy (45378)
#   - Current: 185 procedures/year at hospital outpatient ($4,200 each)
#   - Cost: $777,000
#
# Site-of-Care Program:
#   - ASC alternative: $1,800 each
#   - Savings per case: $2,400 (57%)
#   - Year 1: 30% migration (56 cases) = $134,400 savings
#   - Year 3: 65% migration (120 cases) = $288,000 savings
#
# Across All Targetable Procedures:
#   - Total opportunity: $1.2M annually
#   - Year 1 realized: $360K (30% migration)
#   - Year 3 realized: $780K (65% migration)
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Site-of-Care Savings Potential" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={DollarSign}
            label="Colonoscopy Savings"
            value="57%"
            gradient="from-violet-500 to-purple-500"
            description="Hospital ($4,200) vs. ASC ($1,800)"
          />
          <VegasMetricCard
            icon={TrendingDown}
            label="MRI Cost Reduction"
            value="58%"
            gradient="from-purple-500 to-fuchsia-500"
            description="Hospital ($2,850) vs. Independent ($1,200)"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Typical ROI"
            value="12-18 months"
            gradient="from-fuchsia-500 to-pink-500"
            description="Payback period for migration program launch"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Migration Program Success" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Colonoscopy Migration Campaign"
            items={[
              "Baseline: 220 colonoscopies/year, 78% at hospital outpatient",
              "Hospital cost: $4,200, ASC cost: $1,800",
              "Launched transparency tool + $200 gift card incentive for ASC choice",
              "Year 1: 42% chose ASC (92 procedures migrated)",
              "Savings: 92 × $2,400 = $220,800 (net of $18,400 incentives)"
            ]}
          />
          <VegasFeatureCard
            icon={Building2}
            title="Imaging Center Strategy"
            items={[
              "MRI volume: 340/year, 85% at hospital ($2,850 each)",
              "Independent imaging center: $1,200 (same equipment, faster appointments)",
              "Member communication: price transparency + quality scores",
              "Year 1 migration: 55% (160 cases)",
              "Savings: 160 × $1,650 = $264,000 annually"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Infusion Therapy Shift"
            items={[
              "Rheumatology biologics: 85 patients, all at hospital infusion center",
              "Hospital: $3,800/infusion, Office-based: $1,950",
              "Rheumatologist opened office infusion suite",
              "Steered 60 patients (70%) to office setting",
              "Annual savings: 60 patients × 12 infusions × $1,850 = $1.33M"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Overpaying for Hospital Facility Fees</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Identify procedures safe for ASC or office migration. Quantify savings by CPT code. 
            Launch member steering programs with transparency + incentives.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
            Calculate Site Migration Savings
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}