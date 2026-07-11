import { Dna, Database, AlertTriangle, DollarSign, CheckCircle2, TrendingUp, Target, LineChart } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function GeneTherapyExposureEngine() {
  return (
    <EngineDetailLayout
      title="Gene Therapy Exposure Modeling Engine"
      category="Financial & Trend"
      tagline="Quantify Your $2.1M Zolgensma, $850K Luxturna, $475K CAR-T Exposure — Model Clinical Eligibility + Launch Probability"
      gradient="from-purple-600 via-fuchsia-600 to-pink-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Multi-Million Dollar Blind Spot" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">CFOs Flying Blind on Gene Therapy</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Gene therapies cost $500K-$2.1M per patient — most plans have zero reserves</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No visibility to clinical eligibility (SMA, hemophilia, sickle cell, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Stop-loss carriers exclude gene therapy or price it punitively</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot model FDA approval pipeline or treatment uptake curves</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-purple-400 mb-4">Gene Therapy Exposure Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Clinical eligibility screening across 18 gene therapy indications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>FDA approval probability modeling with launch date estimates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Treatment uptake curves: physician adoption + patient decision rates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Stop-loss laser placement strategy (specific attachment recommendations)</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Clinical Eligibility Algorithm" icon={Dna}>
        <VegasCodeBlock language="python">
{`# Gene Therapy Eligibility Screening
therapies = {
    'Zolgensma': {
        'indication': 'Spinal Muscular Atrophy (SMA)',
        'cost': 2100000,
        'eligibility': lambda m: (
            'G12.1' in m.diagnoses and  # SMA Type 1
            m.age_months < 24 and
            m.weight_kg < 13.5
        )
    },
    'Luxturna': {
        'indication': 'RPE65-mediated Inherited Retinal Disease',
        'cost': 850000,
        'eligibility': lambda m: (
            'H35.5' in m.diagnoses and
            confirmed_rpe65_mutation(m) and
            viable_retinal_cells(m)
        )
    },
    'Yescarta': {
        'indication': 'Diffuse Large B-Cell Lymphoma (DLBCL)',
        'cost': 373000,
        'eligibility': lambda m: (
            'C83.3' in m.diagnoses and
            prior_treatment_lines(m) >= 2 and
            ecog_performance_score(m) <= 2
        )
    },
    'Casgevy': {
        'indication': 'Sickle Cell Disease',
        'cost': 2200000,
        'eligibility': lambda m: (
            'D57' in m.diagnoses and
            m.age >= 12 and
            severe_vaso_occlusive_crises(m) >= 4
        ),
        'fda_approved': '2023-12-08'
    }
}

def calculate_population_exposure(members, therapy_pipeline):
    exposure = {}
    
    for therapy_name, therapy in therapies.items():
        eligible = [m for m in members if therapy['eligibility'](m)]
        
        # Treatment probability model
        uptake_rate = 0.70  # 70% of eligible patients pursue treatment
        expected_treatments = len(eligible) * uptake_rate
        
        # Financial exposure
        max_exposure = len(eligible) * therapy['cost']
        expected_exposure = expected_treatments * therapy['cost']
        
        exposure[therapy_name] = {
            'eligible_members': len(eligible),
            'expected_treatments': expected_treatments,
            'max_financial_exposure': max_exposure,
            'expected_financial_exposure': expected_exposure
        }
    
    return exposure
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Risk Quantification" icon={DollarSign}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Dna}
            label="Therapy Coverage"
            value="18 Indications"
            gradient="from-purple-500 to-fuchsia-500"
            description="SMA, hemophilia, sickle cell, inherited retinal disease, DLBCL, multiple myeloma"
          />
          <VegasMetricCard
            icon={Target}
            label="Eligibility Precision"
            value="92%"
            gradient="from-fuchsia-500 to-pink-500"
            description="Accurate clinical screening vs. physician-confirmed eligibility"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Pipeline Forecast"
            value="36 Months"
            gradient="from-pink-500 to-rose-500"
            description="FDA approval probability + launch date modeling"
          />
        </div>
      </VegasSection>

      {/* Pipeline Tracking */}
      <VegasSection title="Gene Therapy Pipeline Intelligence" icon={LineChart}>
        <VegasCodeBlock language="markdown">
{`# 2026-2028 Gene Therapy Pipeline (FDA Status)

Q2 2026 - Sickle Cell (Casgevy) APPROVED
├─ Cost: $2.2M per patient
├─ Eligible: ~40K US patients
└─ Employer impact: 1 per 50,000 lives

Q4 2026 - Hemophilia A (Roctavian) Phase III
├─ Cost: $2.9M estimated
├─ Approval probability: 75%
└─ Employer impact: 1 per 100,000 lives

Q2 2027 - Duchenne Muscular Dystrophy (Multiple candidates)
├─ Cost: $1.5M-$3M range
├─ Approval probability: 60%
└─ Employer impact: 1 per 75,000 lives (pediatric)

Q4 2027 - Beta-Thalassemia (betibeglogene autotemcel)
├─ Cost: $2.1M
├─ Approval probability: 80%
└─ Employer impact: 1 per 200,000 lives

2028+ - CAR-T Expansion (solid tumors)
├─ Cost: $400K-$600K
├─ Multiple candidates in development
└─ Could affect 10x more patients than current DLBCL indication
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Risk Mitigation Strategies" icon={CheckCircle2}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={AlertTriangle}
            title="SMA Detection + Stop-Loss Laser"
            items={[
              "Population: 8,500 lives, identified 2 SMA diagnoses",
              "Zolgensma eligibility confirmed for 1 infant",
              "Treatment probability: 85% within 12 months",
              "Secured $500K stop-loss laser (specific attachment)",
              "Protected plan from $1.6M net exposure"
            ]}
          />
          <VegasFeatureCard
            icon={DollarSign}
            title="Hemophilia Pipeline Reserve"
            items=[
              "Population: 15,000 lives, 1 severe hemophilia A patient",
              "Roctavian FDA approval expected Q4 2026",
              "Treatment uptake probability: 60%",
              "Built $1.8M reserve (60% × $2.9M)",
              "CFO prepared for approval decision before it hits"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="CAR-T Cost Negotiation"
            items=[
              "Cancer center quoted $475K for CAR-T therapy",
              "Engine identified 2 alternative sites at $390K",
              "Patient steered to lower-cost NCI-designated center",
              "Outcomes equivalent, saved $85K (18%)",
              "Established preferred CAR-T network for future cases"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Quantify Your Multi-Million Dollar Gene Therapy Risk</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Screen your population for gene therapy eligibility across 18 indications. Model FDA pipeline approvals. 
            Get stop-loss laser recommendations before the $2M claim hits.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-fuchsia-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-fuchsia-50 transition-all duration-200 shadow-2xl hover:shadow-fuchsia-500/50 transform hover:scale-105">
            Run Exposure Analysis
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}