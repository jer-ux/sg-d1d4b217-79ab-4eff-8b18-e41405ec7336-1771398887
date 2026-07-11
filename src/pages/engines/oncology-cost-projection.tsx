import { HeartPulse, Database, TrendingUp, AlertTriangle, CheckCircle2, Target, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function OncologyCostProjectionEngine() {
  return (
    <EngineDetailLayout
      title="Oncology Cost Projection Engine"
      category="Financial & Trend"
      tagline="Project 12-36 Month Cancer Treatment Costs by Stage, Modality, and Site-of-Care—From Diagnosis Through Survivorship"
      gradient="from-rose-600 via-pink-600 to-fuchsia-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $400K Cancer Budget Black Box" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Traditional Cancer Cost Forecasting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Average $150K-$400K per cancer diagnosis—but massive variance by type, stage, treatment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>CFOs can't model specific oncology pipeline: who has pre-cancer signals, who's in active treatment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Site-of-care cost differentials ignored (academic center vs. community vs. COE)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No modeling of immunotherapy vs. chemotherapy cost trajectories</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-pink-400 mb-4">Oncology Projection Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Stage-specific cost modeling: Stage I breast cancer ($45K) vs. Stage IV lung ($380K)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Active cancer pipeline visibility: current patients + pre-diagnosis screening signals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Site-of-care optimization: NCI-designated center steering saves 15-30%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Treatment modality cost curves: immunotherapy, targeted therapy, CAR-T, radiation, surgery</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Cancer-Specific Forecasting Model" icon={HeartPulse}>
        <VegasCodeBlock language="python">
{`# Oncology Cost Projection
cancer_types = {
    'breast': {
        'stage_1': {'mean_cost': 45000, 'std': 12000, 'duration_months': 12},
        'stage_2': {'mean_cost': 85000, 'std': 22000, 'duration_months': 18},
        'stage_3': {'mean_cost': 165000, 'std': 45000, 'duration_months': 24},
        'stage_4': {'mean_cost': 290000, 'std': 80000, 'duration_months': 36}
    },
    'lung': {
        'stage_1': {'mean_cost': 95000, 'std': 25000, 'duration_months': 14},
        'stage_2': {'mean_cost': 175000, 'std': 48000, 'duration_months': 20},
        'stage_3': {'mean_cost': 285000, 'std': 75000, 'duration_months': 28},
        'stage_4': {'mean_cost': 380000, 'std': 110000, 'duration_months': 24}
    },
    'colorectal': {
        'stage_1': {'mean_cost': 55000, 'std': 15000, 'duration_months': 10},
        'stage_2': {'mean_cost': 95000, 'std': 28000, 'duration_months': 16},
        'stage_3': {'mean_cost': 145000, 'std': 42000, 'duration_months': 22},
        'stage_4': {'mean_cost': 240000, 'std': 70000, 'duration_months': 30}
    }
}

def project_oncology_cohort(active_cancer_members, high_risk_screening):
    total_exposure = 0
    
    # Active Treatment Pipeline
    for member in active_cancer_members:
        cancer_type = member.primary_cancer_dx
        stage = member.cancer_stage
        months_remaining = estimate_treatment_duration(member)
        
        base_cost = cancer_types[cancer_type][stage]['mean_cost']
        
        # Site-of-Care Adjustment
        if member.treating_at_coe:
            cost_multiplier = 0.85  # COE discount via negotiated rates
        elif member.treating_at_academic:
            cost_multiplier = 1.15  # Academic center premium
        else:
            cost_multiplier = 1.0
        
        projected_cost = base_cost * cost_multiplier * (months_remaining / 12)
        total_exposure += projected_cost
    
    # Pre-Diagnosis Risk Pool (screening signals)
    incidence_rate = 0.005  # 0.5% annual cancer incidence
    expected_new_cases = len(high_risk_screening) * incidence_rate
    avg_cost_new_dx = 120000  # Mixed stage distribution
    
    total_exposure += expected_new_cases * avg_cost_new_dx
    
    return {
        'current_active_treatment': len(active_cancer_members),
        'expected_new_diagnoses': expected_new_cases,
        'total_12mo_exposure': total_exposure,
        'p75_exposure': total_exposure * 1.25,
        'p90_exposure': total_exposure * 1.55
    }
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Clinical & Financial Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={HeartPulse}
            label="Cancer Types Tracked"
            value="12 Major"
            gradient="from-rose-500 to-pink-500"
            description="Breast, lung, colorectal, prostate, lymphoma, leukemia, melanoma, pancreatic, ovarian, kidney, bladder, brain"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Forecast Horizon"
            value="12-36 Months"
            gradient="from-pink-500 to-fuchsia-500"
            description="Stage-specific treatment duration modeling"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="COE Steering Savings"
            value="15-30%"
            gradient="from-fuchsia-500 to-purple-500"
            description="NCI-designated centers vs. community oncology"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Oncology Budget Planning" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Stage IV Lung Cancer"
            items={[
              "Member diagnosed Q1 2025, starting immunotherapy",
              "Projected 24-month treatment cost: $380K",
              "Steered to NCI-designated center: $325K actual",
              "14% savings + access to clinical trials"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Breast Cancer Cohort"
            items={[
              "4 active members in treatment (Stage I-III)",
              "Combined projected exposure: $285K",
              "1 high-risk screening signal (BRCA+)",
              "Total 12-month budget: $345K (includes new dx probability)"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="CAR-T Therapy Planning"
            items={[
              "2 lymphoma patients eligible for CAR-T",
              "Treatment cost: $475K each = $950K exposure",
              "Stop-loss laser placed at $400K specific",
              "Net plan exposure: $150K vs. $950K uninsured"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Know Your Oncology Exposure Before It Hits</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Project cancer treatment costs by stage, modality, and site-of-care. Budget with confidence, steer to Centers of Excellence, optimize stop-loss coverage.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-pink-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-pink-50 transition-all duration-200 shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105">
            Run Oncology Forecast
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}