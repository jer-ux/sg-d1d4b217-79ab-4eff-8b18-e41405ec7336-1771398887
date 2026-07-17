import { Target, Database, TrendingUp, Brain, CheckCircle2, AlertTriangle, BarChart3, Zap, LineChart, Shield } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function LargeClaimantPredictionPage() {
  return (
    <EngineDetailLayout
      title="Large Claimant Prediction Engine"
      category="Risk Prediction"
      tagline="Identify Members Likely to Exceed $250K Before They Cross $50K — 6-18 Month Lead Time for Proactive Intervention"
      gradient="from-red-600 via-orange-600 to-amber-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The $1.5M Shock No One Saw Coming" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Reactive Large Claim Management</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Large claimants only identified AFTER they've incurred $100K-$200K</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No opportunity to steer to Centers of Excellence or high-value providers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>CFO gets blindsided by claims volatility at month-end close</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Stop-loss deductibles set reactively based on last year's experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No data to negotiate with stop-loss carriers (they have pricing power)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-orange-400 mb-4">Predictive Large Claim Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Identify high-risk members 6-18 months before they cross $100K threshold</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Proactive care navigation to high-value providers (save 20-40% on episode cost)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Dynamic stop-loss pricing with carrier (quantified risk = negotiating leverage)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Budget forecasts include probabilistic large claim exposure (P50/P75/P90)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>CFO dashboard with real-time large claimant pipeline and financial exposure</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="ML Architecture" icon={Brain}>
        <VegasCodeBlock language="python">
{`# Three-Stage ML Pipeline for Large Claim Prediction

# Stage 1: Multi-Modal Feature Engineering (1,847 features)
def engineer_features(member):
    # Medical Claims Features (840)
    medical_features = {
        'diagnosis_ngrams': extract_icd10_sequences(member.claims),
        'procedure_velocity': rolling_count(member.claims, windows=[90, 180, 365]),
        'specialty_visits': count_by_specialty(member.claims, ['oncology', 'cardiology']),
        'er_frequency': count_er_visits(member.claims, period='6mo'),
        'inpatient_admits': count_admits(member.claims)
    }
    
    # Pharmacy Features (520)
    pharmacy_features = {
        'drug_classes': unique_drug_classes(member.rx_claims),
        'mpr_trends': calculate_mpr_trajectory(member.rx_claims),
        'dose_escalation': detect_dose_changes(member.rx_claims),
        'prior_auth_denials': count_pa_denials(member.rx_claims),
        'specialty_drugs': count_specialty_fills(member.rx_claims)
    }
    
    # Biometric Features (310)
    biometric_features = {
        'hba1c_trend': calculate_trend(member.labs, 'HbA1c'),
        'bmi_trajectory': calculate_trend(member.vitals, 'BMI'),
        'creatinine_trend': calculate_trend(member.labs, 'creatinine'),
        'missing_labs': count_missing_values(member.labs)
    }
    
    # Social Determinants (177)
    sdoh_features = {
        'svi_score': lookup_social_vulnerability_index(member.zip_code),
        'distance_to_oncology': calculate_distance(member.zip_code, 'oncology_center'),
        'food_desert': check_food_desert_proximity(member.zip_code),
        'transit_access': check_transit_to_dialysis(member.zip_code)
    }
    
    return combine_features(medical_features, pharmacy_features, 
                           biometric_features, sdoh_features)

# Stage 2: Gradient Boosting Ensemble
def train_prediction_model(training_data):
    # XGBoost Configuration
    xgb_model = XGBClassifier(
        max_depth=8,
        learning_rate=0.03,
        n_estimators=1500,
        subsample=0.8,
        colsample_bytree=0.8,
        objective='binary:logistic'
    )
    
    # LightGBM Configuration
    lgb_model = LGBMClassifier(
        num_leaves=127,
        learning_rate=0.03,
        n_estimators=1500,
        feature_fraction=0.8
    )
    
    # Train both models
    xgb_model.fit(training_data.X, training_data.y)
    lgb_model.fit(training_data.X, training_data.y)
    
    # Ensemble weights (optimized for precision at top 1%)
    def predict(member_features):
        xgb_score = xgb_model.predict_proba(member_features)[1]
        lgb_score = lgb_model.predict_proba(member_features)[1]
        return 0.55 * xgb_score + 0.45 * lgb_score

# Stage 3: SHAP Explainability
def explain_prediction(member, risk_score):
    shap_values = calculate_shap(member)
    
    top_drivers = sorted(shap_values, key=lambda x: abs(x.value), reverse=True)[:7]
    
    interventions = recommend_interventions(top_drivers)
    
    return {
        'risk_score': risk_score,
        'predicted_cost_range': estimate_cost_range(risk_score),
        'top_risk_drivers': top_drivers,
        'recommended_interventions': interventions,
        'expected_savings': calculate_intervention_impact(interventions)
    }

# Model Performance Metrics:
# AUC-ROC: 0.84
# Precision @ Top 1%: 68% (68 out of 100 flagged will cross $100K)
# Precision @ Top 5%: 42% (actionable for care management)
# False Positive Rate: 3.2%
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Engine Performance" icon={Target}>
        <div className="grid md:grid-cols-4 gap-6">
          <VegasMetricCard
            icon={Brain}
            label="Prediction Accuracy"
            value="AUC 0.84"
            gradient="from-red-500 to-orange-500"
            description="Top 1% precision: 68% will exceed $100K"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Lead Time"
            value="6-18 months"
            gradient="from-orange-500 to-amber-500"
            description="Intervention window before large claim"
          />
          <VegasMetricCard
            icon={Database}
            label="Feature Count"
            value="1,847"
            gradient="from-amber-500 to-yellow-500"
            description="Engineered predictors across 4 domains"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Cost Reduction"
            value="20-40%"
            gradient="from-yellow-500 to-red-500"
            description="Episode cost savings via early steering"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Intervention Outcomes" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Diabetic Crisis Averted"
            items={[
              "Model flagged member with rapidly escalating insulin dose + missed visits",
              "Care manager scheduled immediate endocrinology appointment",
              "Enrolled in continuous glucose monitoring program",
              "Member stabilized HbA1c from 11.8 → 7.4 over 6 months",
              "Avoided predicted hospitalization: saved $180K"
            ]}
          />
          <VegasFeatureCard
            icon={Brain}
            title="Cancer Early Detection"
            items={[
              "Model identified fragmented care signal across 3 different systems",
              "Navigation nurse coordinated single multi-disciplinary visit",
              "Early-stage diagnosis enabled less-aggressive treatment",
              "Episode cost: $85K vs. predicted $405K for late-stage",
              "Saved $320K + significantly improved outcome"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Maternity High-Risk"
            items={[
              "Flagged expectant mother with gestational diabetes + hypertension",
              "Enrolled in high-risk maternity program with weekly monitoring",
              "Delivered at 37 weeks (full-term) vs. predicted 31 weeks",
              "Avoided NICU stay (42 days × $12K/day)",
              "Actual cost $54K vs. predicted $504K+ — saved $450K"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* Weekly Workflow */}
      <VegasSection title="Care Management Integration" icon={Shield}>
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-orange-300 mb-6">Weekly Predictive Pipeline</h3>
          <VegasCodeBlock language="text">
{`Monday 3 AM:
1. Ingest updated claims data (medical + Rx) from prior week
2. Refresh biometric data from health portal integrations
3. Re-score all active members (5-20 minutes for 5K lives)
4. Rank by risk score descending

Monday 8 AM:
5. Care management team reviews Top 50 list:
   - New entrants (jumped into Top 50 this week)
   - Score accelerations (moved up 20+ positions)
   - Deceleration (dropped out — intervention working?)

6. Automated outreach triggers:
   - SMS to member: "Your care team wants to connect about your health goals"
   - Email to PCP: "Member X flagged for care coordination — attached clinical summary"
   - Alert to HR benefits team (if member shows benefit non-utilization)

7. Care manager assigns cases:
   - Tier 1 (Score > 0.80): Immediate phone outreach + home visit if needed
   - Tier 2 (Score 0.60-0.80): Telephonic case management
   - Tier 3 (Score 0.40-0.60): Digital nudges + educational materials

Thursday Review:
8. Track intervention outcomes:
   - Did member engage with care manager?
   - Was specialist appointment scheduled?
   - Did clinical indicators improve?

Monthly Retrospective:
9. Validate model performance:
   - Of members predicted to cross $100K, how many actually did?
   - Of interventions deployed, what was cost impact?
   - Retrain model if drift detected (AUC drops below 0.80)`}
          </VegasCodeBlock>
        </div>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Predict Large Claims Before They Hit Your Balance Sheet</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Deploy AI-powered large claimant prediction with 6-18 month lead time. Proactive care management, 
            Centers of Excellence steering, and dynamic stop-loss optimization—all driven by real-time ML scoring.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
            Request Model Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}