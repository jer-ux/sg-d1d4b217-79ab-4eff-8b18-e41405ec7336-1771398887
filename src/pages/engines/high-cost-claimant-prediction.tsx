import { Target, Database, TrendingUp, Brain, CheckCircle2, AlertTriangle, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function HighCostClaimantPredictionEngine() {
  return (
    <EngineDetailLayout
      title="High-Cost Claimant Prediction Engine"
      category="Financial & Trend"
      tagline="Identify Members Likely to Exceed $50K Before They Incur $10K — Early Intervention Cuts Episode Cost by 30-50%"
      gradient="from-amber-600 via-orange-600 to-red-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $50K Member You Didn't See Coming" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Reactive Care Management</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Wait until member hits $25K-$50K before case management triggers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>By then, treatment path is locked in — limited intervention leverage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Miss the window to steer to Centers of Excellence or value-based networks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No differentiation between $50K trajectory vs. $250K catastrophic path</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-orange-400 mb-4">Predictive High-Cost Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Flag members at $5K-$10K who will cross $50K within 12 months</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Early intervention window: steer to high-value providers before treatment starts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Risk stratification: chronic disease progression vs. acute event likelihood</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Expected episode cost range (P50/P75/P90) for budget planning</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="ML Architecture" icon={Brain}>
        <VegasCodeBlock language="python">
{`# Gradient Boosting Model
def predict_high_cost_risk(member):
    features = {
        'chronic_conditions': count_chronic_dx(member),
        'specialty_visits': rolling_count(90, 'cardiology|oncology'),
        'pharmacy_complexity': unique_drug_classes(member),
        'ed_utilization': ed_visits_last_6mo(member),
        'procedure_escalation': imaging_frequency_trend(member),
        'medication_adherence': calculate_mpr(member),
        'biometric_trajectory': hba1c_trend(member),
        'care_fragmentation': unique_providers_90d(member)
    }
    
    risk_score = xgboost_model.predict_proba(features)[1]
    
    if risk_score > 0.75:
        expected_cost = estimate_episode_cost(member, risk_score)
        interventions = recommend_care_pathways(member)
        
        return {
            'risk_tier': 'HIGH',
            'probability': risk_score,
            'expected_12mo_cost': expected_cost,
            'interventions': interventions
        }
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Engine Performance" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Brain}
            label="Prediction Accuracy"
            value="AUC 0.82"
            gradient="from-orange-500 to-red-500"
            description="Top 5% precision: 54% will exceed $50K"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Intervention Window"
            value="8-14 months"
            gradient="from-red-500 to-amber-500"
            description="Lead time before crossing $50K threshold"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Cost Reduction"
            value="35%"
            gradient="from-amber-500 to-yellow-500"
            description="Average episode cost savings via early steering"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Intervention Outcomes" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Oncology Steering"
            items={[
              "Member flagged at $8K with imaging + biopsy pattern",
              "Care navigator scheduled at NCI-designated center",
              "Episode cost: $62K vs. predicted $98K at community hospital",
              "36% savings + superior outcomes"
            ]}
          />
          <VegasFeatureCard
            icon={Brain}
            title="Diabetes Progression"
            items={[
              "Model detected insulin dose escalation + missed appointments",
              "Enrolled in intensive diabetes management program",
              "HbA1c stabilized, avoided hospitalization",
              "Predicted cost $85K, actual $34K"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Musculoskeletal Care"
            items={[
              "Flagged for back surgery at high-cost facility",
              "Steered to spine center with bundled payment",
              "Surgery + PT + follow-up: $28K vs. $67K",
              "58% cost reduction, faster recovery time"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Intervene Before It's Too Late</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Identify your next $50K+ members when they're still at $10K. Get the intervention window you need to steer, 
            manage, and reduce episode costs by 30-50%.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
            Deploy Predictive Model
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}