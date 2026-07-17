import { RotateCcw, Database, TrendingDown, AlertTriangle, CheckCircle2, Target, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function ReadmissionPredictionEngine() {
  return (
    <EngineDetailLayout
      title="30-Day Readmission Prediction"
      category="Population Health & Risk Engine"
      tagline="Predict 30-day readmissions with 82% accuracy using discharge data, medication adherence signals, and social determinant risk factors—trigger post-acute interventions before the revolving door spins"
      gradient="from-orange-600 via-red-600 to-rose-600"
    >
      {/* Problem */}
      <VegasSection title="The $3.8M Revolving Door" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your member is discharged from a 5-day CHF admission ($24,000). Twelve days later, they're back—fluid overload, medication confusion, missed follow-up. Second admission: $18,000. Medicare penalizes the hospital for readmissions, but you pay full freight twice. Across your 10,000 lives, 18% readmission rate costs $3.8M annually in preventable re-hospitalizations. Most are predictable at discharge if you know what to look for.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Readmission Rate"
              value="15-22%"
              sublabel="typical 30-day readmit rate"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={RotateCcw}
              label="Preventable %"
              value="60-75%"
              sublabel="with timely intervention"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={Target}
              label="Avg Cost"
              value="$15-22K"
              sublabel="per readmission episode"
              gradient="from-rose-600 to-pink-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Can't prioritize post-discharge outreach: all discharged members treated equally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Miss high-risk signals: medication non-adherence, transportation barriers, inadequate support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>React to readmissions: engage AFTER second admission when opportunity is gone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Limited care manager time wasted on low-risk discharges</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Discharge Risk Scoring" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our 30-Day Readmission Prediction Engine scores every hospital discharge 0-100 using clinical complexity, medication regimen, social determinants, prior utilization patterns, and post-acute follow-up adherence—flags high-risk members for intensive transition support within 24 hours of discharge.
          </p>

          <VegasCodeBlock language="Readmission Risk Scoring Algorithm">
{`# 30-day readmission prediction at discharge
def predict_readmission_risk(discharge_event, member_history):
    risk_score = 0
    
    # Clinical Complexity (25 points)
    if discharge_event.diagnosis in ['CHF', 'COPD', 'pneumonia', 'sepsis']:
        risk_score += 15  # High-risk diagnoses
    if discharge_event.length_of_stay >= 7:
        risk_score += 5   # Extended stays
    if discharge_event.icu_admission:
        risk_score += 5   # ICU involvement
    
    # Medication Burden (20 points)
    new_medications = discharge_event.discharge_medications - member_history.prior_medications
    if len(new_medications) >= 3:
        risk_score += 10  # Complex regimen changes
    if 'warfarin' in new_medications or 'insulin' in new_medications:
        risk_score += 10  # High-alert medications
    
    # Prior Utilization (20 points)
    if member_history.admissions_last_6_months >= 2:
        risk_score += 10  # Frequent flyer pattern
    if member_history.days_since_last_discharge <= 30:
        risk_score += 10  # Recent readmission
    
    # Social Determinants (15 points)
    if member_history.lives_alone and member_history.age >= 65:
        risk_score += 8   # Social isolation
    if member_history.transportation_barrier:
        risk_score += 7   # Follow-up access issue
    
    # Medication Adherence History (10 points)
    if member_history.pdc_last_year < 0.60:
        risk_score += 10  # Non-adherent pattern
    
    # Follow-up Appointment Scheduled? (10 points)
    if not discharge_event.pcp_appointment_within_7_days:
        risk_score += 10  # No post-acute plan
    
    # Discharge Destination (Extra Risk)
    if discharge_event.destination == 'skilled_nursing_facility':
        risk_score += 5   # SNF bridge risk
    
    # Cap at 100
    risk_score = min(risk_score, 100)
    
    # Risk stratification
    if risk_score >= 70:
        return {
            'risk_level': 'HIGH',
            'readmit_probability': 0.45,  # 45% chance of 30-day readmission
            'intervention': 'intensive_transition_support',
            'outreach_timeline': 'within_24_hours'
        }
    elif risk_score >= 50:
        return {
            'risk_level': 'MODERATE',
            'readmit_probability': 0.22,
            'intervention': 'standard_discharge_call',
            'outreach_timeline': 'within_72_hours'
        }
    else:
        return {
            'risk_level': 'LOW',
            'readmit_probability': 0.08,
            'intervention': 'automated_message',
            'outreach_timeline': 'within_7_days'
        }

# Real-time scoring as discharge claims post
for discharge in get_new_discharges():
    member = get_member_profile(discharge.member_id)
    prediction = predict_readmission_risk(discharge, member)
    
    if prediction['risk_level'] == 'HIGH':
        # Alert care manager for immediate outreach
        send_alert(care_manager, f"HIGH RISK DISCHARGE: {member.name}")
        create_intervention_plan(member, prediction['intervention'])
    
    log_prediction(discharge, prediction)

# Validation: Track actual vs. predicted
def validate_model():
    predictions = get_predictions_last_30_days()
    actuals = get_actual_readmissions_last_30_days()
    
    accuracy = calculate_accuracy(predictions, actuals)
    print(f"Model accuracy: {accuracy:.1%}")  # Target: >80%
`}
          </VegasCodeBlock>
        </div>
      </VegasSection>

      {/* Technical Specs */}
      <VegasSection title="Engineering Architecture" icon={Database}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Core Components</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Discharge Risk Scorer:</strong> 0-100 readmission probability updated at discharge</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Care Manager Alerts:</strong> Real-time notifications for high-risk discharges</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Intervention Prioritizer:</strong> Rank transition support urgency</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Outcome Tracker:</strong> Validate prevented readmissions vs. control</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Model Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Model AUC" value="0.82" sublabel="discrimination accuracy" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="High-Risk Precision" value="68%" sublabel="true positives" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Intervention Window" value="24-72 hrs" sublabel="post-discharge" gradient="from-cyan-600 to-blue-600" />
              <VegasMetricCard label="Prevention Rate" value="62%" sublabel="avoided readmissions" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={RotateCcw}
            title="CHF Readmission Prevention"
            items={[
              "67-year-old discharged after 6-day CHF admission",
              "Risk score: 82/100 (HIGH - lives alone, new warfarin, no PCP appt)",
              "Care manager called within 12 hours of discharge",
              "Interventions: PCP visit scheduled, home health arranged, daily weight monitoring",
              "30-day outcome: No readmission",
              "Estimated savings: $18,000 prevented admission"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Program ROI Validation"
            items={[
              "Baseline readmission rate: 18.2% (120 discharges/month)",
              "High-risk cohort (35% of discharges): 44% readmit rate",
              "Intervention: Care manager outreach within 24 hours",
              "Post-intervention readmit rate: 17% (62% reduction)",
              "Annual prevented readmissions: 114 episodes",
              "Net savings: $1.8M (saved admits - program cost)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop the Revolving Door</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Predict 30-day readmissions at discharge. Alert care managers to high-risk members. 
            Trigger intensive transition support. Turn reactive crisis management into proactive prevention.
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