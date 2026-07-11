import { Building2, Database, Brain, AlertTriangle, CheckCircle2, Target, Zap, Activity } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function HospitalAdmissionPredictionEngine() {
  return (
    <EngineDetailLayout
      title="Hospital Admission Prediction"
      category="Predictive AI Engine"
      tagline="Predict hospital admissions 30-90 days in advance using ML models trained on claims, pharmacy, labs, vitals, and social determinants to enable proactive care interventions"
      gradient="from-red-600 via-pink-600 to-rose-600"
    >
      <VegasSection title="The $47K Preventable Admission" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            A diabetic member with rising A1C, missed endocrinology appointments, and irregular insulin fills shows up at the ER with diabetic ketoacidosis. 5-day ICU stay, $47K bill, near-fatal outcome. Your care management team: "We didn't know they were deteriorating." The warning signs were there—scattered across claims, pharmacy, and lab data—but no system connected the dots until crisis hit. Reactive medicine costs 8-12x more than proactive intervention.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Preventable Admits"
              value="42-58%"
              sublabel="of hospitalizations avoidable"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={Building2}
              label="Avg Inpatient Cost"
              value="$18-52K"
              sublabel="per admission"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={Target}
              label="Intervention ROI"
              value="8-12x"
              sublabel="proactive vs. reactive"
              gradient="from-rose-600 to-pink-600"
            />
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-orange-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Reactive care management: intervene only after admission occurs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Siloed data: claims, pharmacy, labs never integrated into unified risk view</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Late identification: by the time care manager calls, patient already in hospital</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Wasted resources: high-touch outreach to stable members, miss high-risk deteriorators</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      <VegasSection title="90-Day Admission Forecasting" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Hospital Admission Prediction Engine trains gradient-boosted ML models on 250+ clinical and behavioral features (diagnoses, procedures, pharmacy adherence, lab trends, vitals, ED visits, care gaps, social determinants) to predict 30/60/90-day admission probability with 82-89% accuracy, enabling targeted interventions before crisis.
          </p>

          <VegasCodeBlock language="Admission Prediction ML Pipeline">
{`// Multi-modal feature engineering
FEATURES = ENGINEER from:
  
  // Medical claims (diagnosis progression)
  chronic_condition_count
  recent_diagnosis_codes (ICD-10)
  procedure_complexity_trend
  specialist_visit_frequency
  ED_utilization_12mo
  
  // Pharmacy (adherence signals)
  medication_adherence_score
  refill_irregularity
  medication_count (polypharmacy)
  high_risk_drug_combinations
  opioid_usage_pattern
  
  // Labs & Vitals (clinical deterioration)
  A1C_trend (diabetics)
  eGFR_decline (kidney function)
  blood_pressure_control
  weight_change_velocity
  lab_gap_days (missing tests)
  
  // Utilization patterns
  PCP_visit_gap_days
  specialist_no_show_rate
  care_plan_adherence
  readmission_history
  length_of_stay_trend
  
  // Social determinants
  transportation_barriers
  medication_cost_burden
  food_insecurity_index
  social_isolation_score

// Train gradient boosting model
MODEL = XGBoost(
  objective: "binary:logistic",
  max_depth: 8,
  learning_rate: 0.05,
  n_estimators: 500,
  scale_pos_weight: 3.2  // Address class imbalance
)

TRAIN on:
  - 180K member-months (3-year history)
  - 8,400 admission events
  - Stratified by diagnosis group

VALIDATE:
  - Holdout set: 20% of data
  - AUC-ROC: 0.87
  - Precision@10%: 0.71 (71% of top-10% actually admit)
  - F1-score: 0.74

// Generate predictions
FOR each active_member:
  admission_probability_30d = MODEL.predict(features)
  admission_probability_60d = MODEL.predict(features, horizon=60)
  admission_probability_90d = MODEL.predict(features, horizon=90)
  
  risk_tier = CLASSIFY:
    IF prob_30d > 0.40: "Imminent Risk"
    IF prob_60d > 0.25: "High Risk"  
    IF prob_90d > 0.15: "Moderate Risk"
    ELSE: "Low Risk"
  
  // SHAP explanation for care managers
  top_risk_factors = SHAP.values(member)
  
  OUTPUT:
    "Member ID: 12847
     30-day admission risk: 47% (Imminent)
     Top drivers:
       - A1C jumped 8.2 → 11.4 in 60 days
       - Missed 3 endocrinology appointments
       - Insulin fills irregular (40-day gaps)
       - Recent ED visit for hyperglycemia
       - No PCP contact in 120 days
     Recommended intervention: Urgent diabetes nurse outreach + insulin assistance program"`}
          </VegasCodeBlock>
        </div>
      </VegasSection>

      <VegasSection title="Engineering Architecture" icon={Database}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Core Components</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Multi-Modal Feature Engine:</strong> Integrate claims + pharmacy + labs + vitals + SDOH</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Gradient Boosting Model:</strong> XGBoost trained on 180K member-months</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">SHAP Explainability:</strong> Show care managers WHY member is high-risk</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Risk Stratification:</strong> Tier members into Imminent/High/Moderate/Low buckets</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Model Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="AUC-ROC" value="0.87" sublabel="discrimination accuracy" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Precision@10%" value="71%" sublabel="top-decile accuracy" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Lead Time" value="30-90 days" sublabel="before admission" gradient="from-cyan-600 to-blue-600" />
              <VegasMetricCard label="Features" value="250+" sublabel="clinical + behavioral" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Diabetic Crisis Prevention"
            items={[
              "Model flagged member with 47% 30-day admission risk",
              "Key signals: A1C spike, missed appointments, irregular insulin fills",
              "Care manager intervention: Urgent diabetes nurse outreach",
              "Connected to endocrinology, insulin assistance program",
              "Outcome: A1C stabilized, avoided $47K DKA admission",
              "ROI: $180 intervention cost vs. $47K hospital bill = 261x"
            ]}
          />
          <VegasFeatureCard
            icon={Activity}
            title="CHF Readmission Prevention"
            items={[
              "Model predicted 68% 30-day readmission risk post-discharge",
              "Drivers: Poor medication adherence, no PCP follow-up scheduled",
              "Intervention: Home health visit + medication reconciliation",
              "Cardiologist appointment within 7 days",
              "Outcome: No readmission in 90 days, stable heart function",
              "Saved $32K readmission penalty + improved quality scores"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Predict Admissions Before Crisis Hits</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Use AI to identify high-risk members 30-90 days before hospitalization. Enable proactive interventions 
            that prevent admissions, save lives, and reduce costs by 8-12x vs. reactive care.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-red-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-red-50 transition-all duration-200 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}