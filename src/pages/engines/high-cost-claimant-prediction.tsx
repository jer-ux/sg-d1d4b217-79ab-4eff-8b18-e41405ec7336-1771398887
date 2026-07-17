import { Target, Database, TrendingUp, AlertTriangle, CheckCircle2, BarChart3, Zap, DollarSign } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function HighCostClaimantPredictionPage() {
  return (
    <EngineDetailLayout
      title="High-Cost Claimant Prediction Engine"
      category="Population Health & Risk"
      tagline="Identify members on trajectory to $100K+ annual claims before catastrophic costs hit—deploy intensive care management 6-12 months early"
      gradient="from-red-600 via-rose-600 to-pink-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $8.4M Blind Spot" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Reactive High-Cost Management</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Identify high-cost claimants AFTER they've already incurred $150K in claims</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Miss early intervention window when care coordination could prevent complications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>Deploy case management only when member is already in crisis: too late to bend cost curve</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                <span>80% of high-cost claimants unpredictable: no prior high spend year</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">Predictive High-Cost Identification</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Flag members 6-12 months BEFORE they cross $100K threshold using early signals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Deploy care management proactively: specialty navigation, prior auth support, treatment optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Prevent avoidable complications: medication adherence, follow-up compliance, alternative sites of care</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Reduce 15-25% of projected high-cost claims through early intervention</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Implementation */}
      <VegasSection title="Predictive Risk Algorithm" icon={Database}>
        <VegasCodeBlock language="python">
{`# High-Cost Claimant Prediction Model
def predict_high_cost_trajectory(member, claims_history, clinical_data):
    risk_score = 0
    
    # Clinical Complexity Signals (30 points)
    chronic_conditions = count_chronic_conditions(member)
    if chronic_conditions >= 3:
        risk_score += 15  # Multi-morbidity
    
    if has_recent_diagnosis(member, ['cancer', 'ms', 'crohns', 'rheumatoid_arthritis']):
        risk_score += 15  # High-cost condition onset
    
    # Utilization Velocity (25 points)
    recent_admits = count_admissions_last_6_months(member)
    if recent_admits >= 2:
        risk_score += 12  # Increasing hospitalization rate
    
    specialty_visits = count_specialty_visits_last_3_months(member)
    if specialty_visits >= 4:
        risk_score += 8  # Accelerating specialty engagement
    
    er_visits = count_er_visits_last_6_months(member)
    if er_visits >= 3:
        risk_score += 5  # Unmanaged condition signals
    
    # Pharmacy Patterns (20 points)
    specialty_drugs = get_specialty_medications(member)
    if len(specialty_drugs) >= 2:
        risk_score += 10  # Multiple high-cost drugs
    
    if has_new_specialty_start_last_90_days(member):
        risk_score += 10  # Recent high-cost therapy initiation
    
    # Prior Cost Trajectory (15 points)
    ytd_cost = sum_claims_ytd(member)
    prior_year_cost = sum_claims_prior_year(member)
    
    if ytd_cost > (prior_year_cost * 1.5):
        risk_score += 15  # Accelerating cost trend
    
    # Care Gaps (10 points)
    if medication_adherence(member) < 0.70:
        risk_score += 5  # Non-adherent pattern
    
    if missed_follow_ups_last_6_months(member) >= 2:
        risk_score += 5  # Care coordination gaps
    
    # Cap at 100
    risk_score = min(risk_score, 100)
    
    # Predict 12-month cost trajectory
    if risk_score >= 75:
        projected_cost = 185000  # High probability $100K+
        intervention_priority = 'CRITICAL'
    elif risk_score >= 60:
        projected_cost = 95000
        intervention_priority = 'HIGH'
    elif risk_score >= 45:
        projected_cost = 55000
        intervention_priority = 'MODERATE'
    else:
        projected_cost = ytd_cost * 1.2
        intervention_priority = 'STANDARD'
    
    return {
        'risk_score': risk_score,
        'projected_12mo_cost': projected_cost,
        'intervention_priority': intervention_priority,
        'recommended_actions': generate_care_plan(member, risk_score)
    }

# Monthly cohort refresh
high_risk_cohort = []
for member in active_members:
    prediction = predict_high_cost_trajectory(member, claims, clinical)
    
    if prediction['intervention_priority'] in ['CRITICAL', 'HIGH']:
        high_risk_cohort.append({
            'member': member,
            'prediction': prediction
        })
        
        # Alert care manager
        assign_case_manager(member, prediction)

print(f"High-risk cohort: {len(high_risk_cohort)} members")
print(f"Projected savings opportunity: {sum(p['projected_12mo_cost'] * 0.20 for p in high_risk_cohort):,.0f}")
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Capabilities */}
      <VegasSection title="Core Capabilities" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <VegasMetricCard
            icon={Target}
            label="Prediction Window"
            value="6-12 mo"
            sublabel="lead time before $100K threshold"
            gradient="from-red-600 to-rose-600"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Model Accuracy"
            value="78%"
            sublabel="correctly identify future high-cost"
            gradient="from-rose-600 to-pink-600"
          />
          <VegasMetricCard
            icon={DollarSign}
            label="Intervention Impact"
            value="15-25%"
            sublabel="cost reduction via early management"
            gradient="from-pink-600 to-fuchsia-600"
          />
          <VegasMetricCard
            icon={BarChart3}
            label="Monthly Refresh"
            value="Real-time"
            sublabel="updated as claims post"
            gradient="from-fuchsia-600 to-purple-600"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Target}
            title="Cancer Diagnosis Early Detection"
            items={[
              "Member diagnosed with Stage 2 breast cancer in January",
              "Risk score: 88/100 (new specialty oncology, multiple specialists, accelerating ER visits)",
              "Projected 12-month cost: $220K without intervention",
              "Care manager intervention: specialty pharmacy navigation, clinical trial matching, second opinion coordination",
              "Actual 12-month cost: $165K (25% reduction from proactive support)",
              "Member satisfaction: 9.8/10 on care coordination"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Program-Level Impact"
            items={[
              "10,000 member population baseline analysis",
              "High-risk cohort identified: 187 members (1.9% of population)",
              "Projected aggregate cost without intervention: $28.4M",
              "Care management deployed: intensive case management for CRITICAL tier (62 members)",
              "Actual aggregate cost: $23.1M (18.7% reduction)",
              "Net savings: $5.3M after program costs",
              "Per-high-risk-member savings: $28,300"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Predict Before the Cost Spike</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Identify members on trajectory to catastrophic costs 6-12 months early. Deploy intensive care management before complications escalate. Turn reactive crisis response into proactive cost prevention.
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