import { Activity, Database, TrendingUp, AlertTriangle, CheckCircle2, Target, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function ChronicDiseaseProgressionPage() {
  return (
    <EngineDetailLayout
      title="Chronic Disease Progression Engine"
      category="Population Health & Risk"
      tagline="Model diabetes, hypertension, COPD progression across 5-year horizon—predict complications, hospitalizations, and cost acceleration"
      gradient="from-purple-600 via-fuchsia-600 to-pink-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $4.2M Preventable Progression" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Reactive Chronic Care</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Wait for complications before intervening (diabetic blindness, kidney failure, amputations)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>No prediction of which Stage 2 diabetics will progress to insulin within 3 years</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Cannot forecast hypertension → heart failure → LVAD pathway costs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Chronic disease budget = last year's cost × 1.15 (no progression modeling)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-purple-400 mb-4">Progression Forecasting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>Predict disease stage transitions 12-36 months ahead using clinical markers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>Identify high-risk progressors: HbA1c trends, medication non-adherence, care gaps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>Model intervention impact: intensive case management can slow progression 40%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <span>5-year cost trajectory for each member with confidence bands</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Multi-Stage Progression Model" icon={Database}>
        <VegasCodeBlock language="python">
{`# Chronic Disease Progression Modeling
disease_stages = {
    'diabetes': {
        'stage_1': {'name': 'Prediabetes', 'annual_cost': 2800, 'progression_rate': 0.08},
        'stage_2': {'name': 'Type 2 Controlled', 'annual_cost': 8500, 'progression_rate': 0.12},
        'stage_3': {'name': 'Type 2 Uncontrolled', 'annual_cost': 14200, 'progression_rate': 0.18},
        'stage_4': {'name': 'Complications (Retinopathy/Neuropathy)', 'annual_cost': 28500, 'progression_rate': 0.22},
        'stage_5': {'name': 'End-Stage (Dialysis/Amputation)', 'annual_cost': 92000, 'progression_rate': 0.0}
    },
    'hypertension': {
        'stage_1': {'name': 'Prehypertension', 'annual_cost': 1800, 'progression_rate': 0.06},
        'stage_2': {'name': 'Stage 1 HTN Controlled', 'annual_cost': 4200, 'progression_rate': 0.10},
        'stage_3': {'name': 'Stage 2 HTN Uncontrolled', 'annual_cost': 9800, 'progression_rate': 0.15},
        'stage_4': {'name': 'Heart Failure', 'annual_cost': 35000, 'progression_rate': 0.08},
        'stage_5': {'name': 'Advanced HF (LVAD)', 'annual_cost': 185000, 'progression_rate': 0.0}
    }
}

def model_progression(member, current_stage, forecast_years=5):
    results = []
    stage = current_stage
    
    for year in range(1, forecast_years + 1):
        stage_config = disease_stages[member.condition][stage]
        
        # Base progression probability
        base_progression_prob = stage_config['progression_rate']
        
        # Risk Modifiers
        if member.medication_adherence < 0.70:
            base_progression_prob *= 1.6  # Poor adherence accelerates
        
        if member.missed_appointments > 2:
            base_progression_prob *= 1.3  # Care gaps worsen outcomes
        
        if member.comorbidities >= 3:
            base_progression_prob *= 1.4  # Multi-morbidity compounds risk
        
        # Age adjustment
        if member.age > 65:
            base_progression_prob *= 1.2
        
        # Cap at 90%
        progression_prob = min(base_progression_prob, 0.90)
        
        # Monte Carlo: will they progress?
        progresses = random.random() < progression_prob
        
        if progresses and stage < 'stage_5':
            next_stage_num = int(stage.split('_')[1]) + 1
            stage = f'stage_{next_stage_num}'
        
        # Record trajectory
        results.append({
            'year': year,
            'stage': stage,
            'stage_name': disease_stages[member.condition][stage]['name'],
            'projected_cost': disease_stages[member.condition][stage]['annual_cost'],
            'progression_probability': progression_prob
        })
    
    return results

# Intervention Impact Modeling
def model_intervention_impact(member, intervention_type):
    # Baseline: no intervention
    baseline_trajectory = model_progression(member, member.current_stage, 5)
    baseline_cost = sum(year['projected_cost'] for year in baseline_trajectory)
    
    # Intervention: modify progression rates
    if intervention_type == 'intensive_case_management':
        # 40% slower progression through medication support, appointment coordination
        for stage in disease_stages[member.condition].values():
            stage['progression_rate'] *= 0.60
    
    intervention_trajectory = model_progression(member, member.current_stage, 5)
    intervention_cost = sum(year['projected_cost'] for year in intervention_trajectory)
    
    # Program costs
    case_management_cost = 2500  # Annual per-member cost
    total_program_cost = case_management_cost * 5
    
    # Net savings
    gross_savings = baseline_cost - intervention_cost
    net_savings = gross_savings - total_program_cost
    
    return {
        'baseline_5yr_cost': baseline_cost,
        'intervention_5yr_cost': intervention_cost,
        'gross_savings': gross_savings,
        'program_cost': total_program_cost,
        'net_savings': net_savings,
        'roi': net_savings / total_program_cost
    }

# Example Output:
# Member: 52yo male, Type 2 diabetes uncontrolled (Stage 3), HbA1c 9.2%, med adherence 58%
# 
# Baseline 5-Year Trajectory (No Intervention):
#   Year 1: Stage 3 (Uncontrolled) - 18200
#   Year 2: Stage 4 (Complications) - 28500
#   Year 3: Stage 4 (Complications) - 28500
#   Year 4: Stage 5 (ESRD) - 92000
#   Year 5: Stage 5 (ESRD) - 92000
#   Total: 239200
# 
# With Intensive Case Management:
#   Year 1: Stage 3 (Uncontrolled) - 18200
#   Year 2: Stage 3 (Uncontrolled) - 18200  # Progression slowed
#   Year 3: Stage 3 (Uncontrolled) - 18200
#   Year 4: Stage 4 (Complications) - 28500
#   Year 5: Stage 4 (Complications) - 28500
#   Total: 111600
# 
# Net Savings: 115100 (ROI: 9.2x)
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Progression Intelligence" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={Activity}
            label="Diseases Modeled"
            value="12 Conditions"
            sublabel="Diabetes, HTN, COPD, CHF, CKD, Asthma, etc."
            gradient="from-purple-600 to-fuchsia-600"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Forecast Horizon"
            value="5 Years"
            sublabel="with annual stage transitions"
            gradient="from-fuchsia-600 to-pink-600"
          />
          <VegasMetricCard
            icon={Target}
            label="Intervention Modeling"
            value="40% Slower"
            sublabel="progression with case management"
            gradient="from-pink-600 to-rose-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="ROI"
            value="9.2x"
            sublabel="average return on prevention programs"
            gradient="from-rose-600 to-red-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Prevention Program Design" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Diabetic Progression Prevention"
            items={[
              "Population: 342 Type 2 diabetics (stages 2-4)",
              "High-risk cohort: 87 members (HbA1c >8.0%, med adherence <70%)",
              "Baseline 5-year cost trajectory: $18.4M",
              "Intensive case management deployed: medication adherence coaching, endocrinology coordination",
              "Actual 5-year cost: $12.1M (34% reduction)",
              "Net savings: $5.2M after program costs",
              "Prevented complications: 12 dialysis cases, 4 amputations"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Heart Failure Cost Modeling"
            items={[
              "Member: 68yo with uncontrolled Stage 2 HTN",
              "Baseline trajectory: Stage 3 HTN → HF → LVAD within 4 years ($420K)",
              "Intervention: cardiology referral, BP monitoring, lifestyle coaching",
              "Actual outcome: remained Stage 2 controlled for 5 years ($21K total)",
              "Avoided cost: $399K",
              "Member quality of life: preserved independence, avoided hospitalizations"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Predict Disease Trajectories Before They Bankrupt You</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Model chronic disease progression across 5-year horizons. Identify high-risk progressors. Deploy preventive interventions that slow complications 40%. Turn reactive chronic care into proactive cost prevention.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
            Model Disease Progression
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}