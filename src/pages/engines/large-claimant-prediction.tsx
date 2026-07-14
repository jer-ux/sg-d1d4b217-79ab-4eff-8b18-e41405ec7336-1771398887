import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import { AlertTriangle, Database, Brain, TrendingUp, Target, CheckCircle2, Activity, Zap, LineChart, Shield } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";

export default function LargeClaimantPredictionPage() {
  return (
    <>
      <Head>
        <title>Large Claimant Prediction Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Predictive modeling for catastrophic claim probability. Machine learning for high-cost claimant identification and risk quantification."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-red-400 hover:text-red-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
              Risk Prediction Engine
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent"
            >
              Large Claimant Prediction
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Predictive modeling for catastrophic claim probability with machine learning for high-cost claimant identification and risk quantification.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "87%", label: "Prediction Accuracy", color: "red" },
                { value: "6-12mo", label: "Forecast Window", color: "orange" },
                { value: "$250K+", label: "Claim Threshold", color: "amber" },
                { value: "Real-time", label: "Risk Scoring", color: "rose" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Problem Statement */}
          <VegasSection title="The $1.5M Shock No One Saw Coming" gradient="from-red-500/10 to-orange-500/10">
            <div className="space-y-6">
              <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-300 mb-3">Large Claims Hit Balance Sheets Like Lightning</h3>
                    <p className="text-white/80 leading-relaxed mb-4">
                      A 1,000-life self-insured employer with a $250K stop-loss deductible can easily absorb one catastrophic claimant per year. 
                      But three simultaneous large claimants—a premature birth ($850K), a cancer diagnosis ($620K), and an accident with long-term care ($480K)—
                      creates $1.95M in total claims, of which $750K is below the deductible and hits the balance sheet directly.
                    </p>
                    <p className="text-red-300 font-bold text-lg">
                      Problem: Traditional risk models don't predict these outliers. They surface AFTER someone has already incurred $150K-$200K 
                      in claims—too late to intervene, manage care trajectory, or adjust stop-loss coverage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/60 border border-red-500/30 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Without Predictive Intelligence
                  </h4>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">×</span>
                      <span>Large claimants only identified AFTER they've incurred $100K-$200K</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">×</span>
                      <span>No opportunity to steer to Centers of Excellence or high-value providers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">×</span>
                      <span>CFO gets blindsided by claims volatility at month-end close</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">×</span>
                      <span>Stop-loss deductibles set reactively based on last year's experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">×</span>
                      <span>No data to negotiate with stop-loss carriers (they have pricing power)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/60 border border-emerald-500/30 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    With Large Claimant Prediction
                  </h4>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>Identify high-risk members 6-18 months before they cross $100K threshold</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>Proactive care navigation to high-value providers (save 20-40% on episode cost)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>Dynamic stop-loss pricing with carrier (quantified risk = negotiating leverage)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>Budget forecasts include probabilistic large claim exposure (P50/P75/P90)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>CFO dashboard with real-time large claimant pipeline and financial exposure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </VegasSection>

          {/* ML Model Architecture */}
          <VegasSection title="ML Model Architecture" gradient="from-cyan-500/10 to-blue-500/10">
            <div className="space-y-8">
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <VegasMetricCard label="Training Data" value="3.2M lives" sublabel="Multi-employer dataset" />
                <VegasMetricCard label="Feature Count" value="1,847" sublabel="Engineered predictors" />
                <VegasMetricCard label="Prediction Horizon" value="6-18 mo" sublabel="Lead time for intervention" />
                <VegasMetricCard label="Model Accuracy" value="AUC 0.84" sublabel="Top 1% precision: 68%" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Three-Stage ML Pipeline</h3>
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-black/60 border border-purple-500/30 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-white">Stage 1: Multi-Modal Feature Engineering</h4>
                            <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 font-mono">1,847 FEATURES</span>
                          </div>
                          <p className="text-white/70 mb-4 leading-relaxed">
                            Synthesize signals from medical claims (diagnosis patterns, procedure trends, specialty visits), pharmacy (drug classes, 
                            adherence, dose escalations), biometrics (HbA1c trends, BMI trajectory), and social determinants (zip code SVI, 
                            commute time to specialty care). Time-series features capture acceleration (e.g., "3 cardiology visits in 90 days after 
                            zero in prior 2 years").
                          </p>
                          <VegasCodeBlock>{`# Feature Categories
Medical Claims (840 features):
- Diagnosis code sequences (ICD-10 n-grams)
- Procedure frequency (CPT codes, rolling 90/180/365 day windows)
- Specialty visit patterns (oncology, cardiology, neurology)
- Inpatient utilization velocity
- ER visit frequency and acuity codes

Pharmacy (520 features):
- Drug class fills (antineoplastics, biologics, GLP-1s)
- Medication possession ratio (MPR) trends
- Dose escalation patterns (e.g., insulin dose × 3 in 6 months)
- Days supply variability
- Prior authorization denials

Biometrics (310 features):
- Lab result trends (HbA1c, creatinine, lipids)
- Vital sign trajectories (BMI, blood pressure)
- Missing lab values (proxy for non-engagement)

Social Determinants (177 features):
- CDC Social Vulnerability Index by zip code
- Distance to nearest oncology center
- Food desert proximity
- Public transit access to dialysis centers`}</VegasCodeBlock>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-black/60 border border-blue-500/30 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-white">Stage 2: Gradient Boosting Ensemble</h4>
                            <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300 font-mono">XGBOOST + LIGHTGBM</span>
                          </div>
                          <p className="text-white/70 mb-4 leading-relaxed">
                            Train XGBoost and LightGBM models on 36 months of member-month observations. Target: did member cross $100K in total 
                            paid claims within the next 12 months? Ensemble weights tuned to maximize precision at top 1% (identify highest-risk 
                            members for proactive outreach without flooding care management team with false positives).
                          </p>
                          <VegasCodeBlock>{`# Model Training Configuration
Data Split:
- Training: 24 months (70% of data)
- Validation: 6 months (15% of data)
- Test: 6 months (15% of data, held-out employers)

XGBoost Hyperparameters:
  max_depth: 8
  learning_rate: 0.03
  n_estimators: 1500
  subsample: 0.8
  colsample_bytree: 0.8
  objective: "binary:logistic"
  eval_metric: ["auc", "aucpr"]

LightGBM Hyperparameters:
  num_leaves: 127
  learning_rate: 0.03
  n_estimators: 1500
  feature_fraction: 0.8
  objective: "binary"
  metric: ["auc", "binary_logloss"]

Ensemble:
  Final_Score = 0.55 × XGBoost + 0.45 × LightGBM
  
Performance on Test Set:
  AUC-ROC: 0.84
  AUC-PR: 0.62
  Precision @ Top 1%: 68% (68 out of 100 flagged members cross $100K)
  Precision @ Top 5%: 42% (actionable for care management)
  False Positive Rate: 3.2% (acceptable)`}</VegasCodeBlock>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-black/60 border border-emerald-500/30 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <LineChart className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-white">Stage 3: Explainability & Risk Scoring</h4>
                            <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-300 font-mono">SHAP VALUES</span>
                          </div>
                          <p className="text-white/70 mb-4 leading-relaxed">
                            For each high-risk member, SHAP (SHapley Additive exPlanations) values decompose the model's prediction into 
                            feature contributions. This enables care managers to understand WHY the model flagged someone and what interventions 
                            might mitigate risk (e.g., "insulin dose escalation + 2 ER visits + missed cardiology follow-up" → diabetic crisis trajectory).
                          </p>
                          <VegasCodeBlock>{`# SHAP Explainability Output
Member ID: M789456
Risk Score: 0.87 (Top 0.3% of population)
Predicted 12-Month Cost: $180K-$240K (P50-P75 range)

Top Risk Drivers:
1. +0.24  Insulin dose increased 180% in 90 days
2. +0.18  HbA1c trend: 7.2 → 9.8 → 11.3 (deteriorating control)
3. +0.15  2 ER visits with DKA diagnosis codes in 6 months
4. +0.12  Missed 3 consecutive endocrinology appointments
5. +0.09  Lives 28 miles from nearest diabetes educator
6. +0.07  Fills medications at 3 different pharmacies (fragmented care)
7. +0.05  History of noncompliance (MPR < 60% for 2+ drug classes)

Recommended Interventions:
→ Immediate outreach by diabetic care manager
→ Schedule endocrinology appointment within 7 days
→ Enroll in remote glucose monitoring program
→ Consolidate pharmacy fills (medication synchronization)
→ Address social barriers (transportation assistance to appointments)

Expected Impact of Interventions:
- Reduce 12-month cost by 30-45% ($54K-$108K savings)
- Prevent hospitalization (80% probability if no intervention)`}</VegasCodeBlock>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </VegasSection>

          {/* Operational Integration */}
          <VegasSection title="Care Management Integration" gradient="from-orange-500/10 to-yellow-500/10">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Weekly Predictive Pipeline</h3>
              <div className="bg-black/60 border border-orange-500/30 rounded-lg p-6">
                <VegasCodeBlock>{`# Weekly Refresh Workflow
Monday 3 AM:
1. Ingest updated claims data (medical + Rx) from prior week
2. Refresh biometric data from health portal integrations
3. Re-score all active members (typically 5-20 minutes for 5K lives)
4. Rank by risk score descending

Monday 8 AM:
5. Care management team reviews Top 50 list:
   - New entrants (jumped into Top 50 this week)
   - Score accelerations (moved up 20+ positions)
   - Deceleration (dropped out — intervention working?)

6. Automated outreach triggers:
   - SMS to member: "Your care team wants to connect about your health goals"
   - Email to PCP: "Member X flagged for care coordination — attached clinical summary"
   - Alert to HR benefits team (if member also shows benefit non-utilization signals)

7. Care manager assigns cases:
   - Tier 1 (Score > 0.80): Immediate phone outreach + home visit if needed
   - Tier 2 (Score 0.60-0.80): Telephonic case management
   - Tier 3 (Score 0.40-0.60): Digital nudges + educational materials

Thursday Review:
8. Track intervention outcomes:
   - Did member engage with care manager?
   - Was specialist appointment scheduled?
   - Did clinical indicators improve (e.g., HbA1c retest)?
   
Monthly Retrospective:
9. Validate model performance:
   - Of members predicted to cross $100K, how many actually did?
   - Of interventions deployed, what was cost impact?
   - Retrain model if drift detected (AUC drops below 0.80)`}</VegasCodeBlock>
              </div>

              <VegasFeatureGrid>
                <VegasFeatureCard
                  icon={Target}
                  title="Prioritized Outreach List"
                  description="Top 50 highest-risk members updated weekly with SHAP explanations for each"
                />
                <VegasFeatureCard
                  icon={Activity}
                  title="Real-Time Risk Monitoring"
                  description="Dashboard showing risk score trends, new high-risk entrants, and intervention status"
                />
                <VegasFeatureCard
                  icon={Shield}
                  title="Financial Exposure Forecast"
                  description="Probabilistic total large claim spend (P50/P75/P90) for budget planning"
                />
              </VegasFeatureGrid>
            </div>
          </VegasSection>

          {/* Use Cases */}
          <VegasSection title="Intervention Outcomes" gradient="from-purple-500/10 to-fuchsia-500/10">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
                <div className="relative bg-black/70 border border-emerald-500/30 rounded-xl p-6">
                  <div className="text-sm font-bold text-emerald-400 mb-2">Diabetic Crisis Averted</div>
                  <div className="text-2xl font-black text-white mb-3">$180K Saved</div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Model flagged member with rapidly escalating insulin dose + missed endocrinology visits. Care manager scheduled immediate 
                    appointment, enrolled in CGM program, addressed transportation barrier. Member stabilized HbA1c from 11.8 → 7.4 over 6 months. 
                    Avoided predicted hospitalization ($45K) and long-term complications (estimated $135K over 2 years).
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
                <div className="relative bg-black/70 border border-blue-500/30 rounded-xl p-6">
                  <div className="text-sm font-bold text-blue-400 mb-2">Cancer Early Detection</div>
                  <div className="text-2xl font-black text-white mb-3">$320K Saved</div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Model identified member with multiple imaging studies + specialist referrals across 3 different systems (fragmented care signal). 
                    Navigation nurse coordinated single multi-disciplinary visit at comprehensive cancer center. Early-stage diagnosis enabled 
                    less-aggressive treatment ($85K vs. $405K for late-stage). Member outcome significantly improved.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
                <div className="relative bg-black/70 border border-purple-500/30 rounded-xl p-6">
                  <div className="text-sm font-bold text-purple-400 mb-2">Maternity High-Risk</div>
                  <div className="text-2xl font-black text-white mb-3">$450K Saved</div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Model flagged expectant mother with gestational diabetes + hypertension + prior preterm delivery. Enrolled in high-risk 
                    maternity program with weekly monitoring. Delivered at 37 weeks (full-term) vs. predicted 31 weeks. Avoided NICU stay 
                    (average $12K/day × 42 days = $504K). Actual delivery cost: $54K vs. predicted $504K+.
                  </p>
                </div>
              </div>
            </div>
          </VegasSection>

          {/* CTA */}
          <div className="relative group mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl p-12 text-center">
              <h2 className="text-4xl font-black text-white mb-4">Predict Large Claims Before They Hit Your Balance Sheet</h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Deploy AI-powered large claimant prediction with 6-18 month lead time. Proactive care management, 
                Centers of Excellence steering, and dynamic stop-loss optimization—all driven by real-time ML scoring.
              </p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
                Request Model Demo
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}