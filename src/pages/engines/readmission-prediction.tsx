import { RotateCcw, Database, Brain, AlertTriangle, CheckCircle2, Target, Zap, TrendingDown } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function ReadmissionPredictionEngine() {
  return (
    <EngineDetailLayout
      title="Readmission Prediction"
      category="Predictive AI Engine"
      tagline="Predict 30-day hospital readmissions at discharge using ML models trained on admission diagnoses, comorbidities, social factors, and discharge planning quality to trigger targeted interventions"
      gradient="from-orange-600 via-red-600 to-rose-600"
    >
      <VegasSection title="The $26K CMS Penalty" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            A heart failure patient discharged Friday afternoon. No follow-up PCP appointment scheduled. Medications reconciliation incomplete. Patient lives alone, no transportation. Tuesday morning: readmitted via ER with fluid overload. CMS flags it as preventable readmission—your plan pays the full $32K second admission PLUS $26K penalty. The hospital knew the patient was high-risk but discharged anyway. Your care management team never got the flag.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="30-Day Readmits"
              value="15-22%"
              sublabel="of all discharges"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={RotateCcw}
              label="CMS Penalty"
              value="Up to $26K"
              sublabel="per preventable readmit"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={Target}
              label="Preventable %"
              value="62-78%"
              sublabel="with proper intervention"
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
                <span>No discharge risk stratification: treat all discharges equally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Late intervention: care manager gets involved after readmission occurs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Missing social factors: focus only on clinical diagnosis, ignore transportation/support gaps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Hospital handoff failure: discharge summaries arrive 5-7 days late, too slow to act</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      <VegasSection title="At-Discharge Risk Scoring" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Readmission Prediction Engine scores every hospital discharge in real-time using ML models trained on admission diagnoses, comorbidity burden, prior utilization history, discharge planning quality, medication complexity, and social determinants to predict 30-day readmission risk with 84-91% accuracy, triggering automated transitional care protocols.
          </p>

          <VegasCodeBlock language="Readmission Prediction ML Pipeline">
{`// Real-time discharge risk scoring
TRIGGER: RECEIVE hospital_discharge_notification

FEATURES = EXTRACT from:
  
  // Admission characteristics
  primary_diagnosis (ICD-10)
  secondary_diagnoses_count
  DRG_complexity_score
  length_of_stay
  ICU_days
  
  // Comorbidity burden
  charlson_comorbidity_index
  chronic_condition_count
  diabetes_with_complications
  heart_failure_stage
  COPD_severity
  kidney_disease_stage
  
  // Utilization history (12 months)
  prior_admissions_12mo
  prior_readmissions_count
  ED_visits_6mo
  PCP_visit_frequency
  specialist_engagement
  
  // Discharge planning quality
  follow_up_appointment_scheduled (Y/N)
  days_to_follow_up
  medication_reconciliation_complete
  discharge_summary_quality_score
  patient_education_documented
  
  // Medication complexity
  medication_count_at_discharge
  new_medications_added
  high_risk_medications
  anticoagulation_therapy
  insulin_regimen_changes
  
  // Social determinants
  lives_alone (Y/N)
  transportation_access
  health_literacy_score
  prior_medication_adherence
  income_level_proxy

// LACE Index (traditional baseline)
lace_score = 
  L: length_of_stay_points +
  A: acuity_admission_type +
  C: comorbidity_burden +
  E: ED_visits_6mo

// Enhanced ML model
MODEL = LightGBM(
  objective: "binary",
  num_leaves: 64,
  learning_rate: 0.03,
  feature_fraction: 0.8
)

TRAIN on:
  - 42K discharge events
  - 8,200 readmission outcomes
  - 5-fold cross-validation

VALIDATE:
  - AUC-ROC: 0.89 (vs. 0.72 for LACE alone)
  - Precision@20%: 0.68
  - Sensitivity: 0.84 (catch 84% of readmissions)

// Generate prediction at discharge
readmission_risk = MODEL.predict(discharge_features)

risk_tier = CLASSIFY:
  IF readmission_risk > 0.50: "Extreme Risk"
  IF 0.30-0.50: "High Risk"
  IF 0.15-0.30: "Moderate Risk"
  ELSE: "Low Risk"

// Auto-trigger interventions
IF risk_tier IN ["Extreme Risk", "High Risk"]:
  ASSIGN transitional_care_nurse within 24 hours
  REQUIRE post_discharge_call within 48 hours
  SCHEDULE home_health_visit if gaps identified
  FLAG medication_therapy_management review
  ESCALATE to care_manager if social_barriers present

OUTPUT:
  "Patient: Jane Smith (Discharge: CHF exacerbation)
   30-day readmission risk: 58% (Extreme Risk)
   Top risk factors:
     - Lives alone, limited mobility
     - No follow-up appointment scheduled at discharge
     - 6 new medications added (polypharmacy)
     - Prior readmission 60 days ago
     - Low health literacy, prior non-adherence
   Auto-triggered interventions:
     ✓ Transitional care nurse assigned (Mary Johnson)
     ✓ Home health visit scheduled for Day 2 post-discharge
     ✓ PCP appointment booked for Day 5
     ✓ Medication sync + home delivery arranged
     ✓ Transportation assistance activated"`}
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
                <span><strong className="text-white">Real-Time Scoring:</strong> Predict risk at moment of discharge, not days later</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Social Factor Integration:</strong> Include transportation, support, literacy barriers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Automated Workflows:</strong> Trigger care protocols based on risk tier</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">LACE Enhancement:</strong> 24% AUC improvement over traditional LACE index</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Model Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="AUC-ROC" value="0.89" sublabel="vs. 0.72 for LACE" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Sensitivity" value="84%" sublabel="catch rate" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Precision@20%" value="68%" sublabel="top-quintile accuracy" gradient="from-cyan-600 to-blue-600" />
              <VegasMetricCard label="Intervention Time" value="<24 hours" sublabel="from discharge" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={RotateCcw}
            title="CHF Readmission Prevention"
            items={[
              "Patient discharged Friday PM, model flagged 58% readmit risk",
              "Drivers: Lives alone, no follow-up scheduled, 6 new meds",
              "Transitional care nurse assigned within 24 hours",
              "Home visit Day 2: medication reconciliation, education",
              "PCP appointment Day 5, transportation arranged",
              "Outcome: Zero readmissions in 90 days, avoided $32K + penalty"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="System-Wide Impact"
            items={[
              "Implemented engine across 18K annual discharges",
              "Baseline readmission rate: 18.4%",
              "Post-implementation: 11.2% (39% reduction)",
              "Prevented 1,296 readmissions annually",
              "Cost savings: $34M (readmissions + penalties avoided)",
              "Quality scores improved, CMS Star Rating increased from 3.5 to 4.5"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Readmissions Before They Happen</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Score every discharge in real-time. Auto-trigger transitional care for high-risk patients. 
            Prevent 62-78% of readmissions with proper intervention. Save millions in penalties and second admissions.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}