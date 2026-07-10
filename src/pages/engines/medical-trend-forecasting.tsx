import { TrendingUp, Database, BarChart3, Activity, AlertCircle, CheckCircle2, Cpu, GitBranch, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function MedicalTrendForecastingEngine() {
  return (
    <EngineDetailLayout
      title="Medical Trend Forecasting"
      category="Financial & Trend Engine"
      icon={TrendingUp}
      description="Predict medical claims trend 12-36 months forward using credibility-weighted historical experience, population health adjustments, and Monte Carlo simulation"
    >
      {/* Problem Statement */}
      <VegasSection title="The $2M Budget Blindspot" gradient="from-red-500/10 to-orange-500/10">
        <div className="space-y-6">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-300 mb-3">CFOs Are Flying Blind on Healthcare Budgets</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  CFOs setting annual benefits budgets face carrier renewal quotes with opaque trend assumptions (typically 8-12%), 
                  but have no independent way to validate if those projections reflect their actual population.
                </p>
                <p className="text-red-300 font-bold text-lg">
                  Result: $500K-$2M in annual budget overruns or under-funding that triggers mid-year scrambles.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/60 border border-red-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Without This Engine
              </h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Accept carrier trend estimates at face value (no validation)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Budget based on industry averages that don't reflect your demographics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Miss population health inflection points (aging workforce, GLP-1 adoption)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>No credibility adjustment for small employers with volatile claims</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Can't defend budget assumptions to boards or PE sponsors</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 border border-emerald-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                With This Engine
              </h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Independent trend validation specific to your population</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Credibility-weighted forecasts blend your data with industry benchmarks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Decompose trend into utilization vs. unit cost drivers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Scenario planning for GLP-1 adoption, specialty drug launches, network changes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Board-ready forecast documentation with confidence intervals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Engineering Architecture */}
      <VegasSection title="Engineering Architecture" gradient="from-cyan-500/10 to-blue-500/10">
        <div className="space-y-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <VegasMetricCard label="Compute Complexity" value="O(n log n)" sublabel="Per forecast iteration" />
            <VegasMetricCard label="Data Volume" value="2-3 years" sublabel="Historical claims window" />
            <VegasMetricCard label="Simulations" value="10,000+" sublabel="Monte Carlo runs" />
            <VegasMetricCard label="Output Latency" value="<30 sec" sublabel="Full forecast generation" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Four-Stage Pipeline</h3>
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
                        <h4 className="text-lg font-bold text-white">Stage 1: Data Ingestion & Credibility Weighting</h4>
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 font-mono">TRANSFORM</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Analyze 24-36 months of medical claims by service category (inpatient, outpatient, professional, ancillary). 
                        Calculate credibility Z-score based on claim volume: higher volume = higher confidence in your historical trend, 
                        lower volume = blend more heavily with industry benchmarks.
                      </p>
                      <VegasCodeBlock>{`# Bühlmann Credibility Formula
Z = sqrt(n / (n + k))
where:
  n = observed claim count
  k = credibility factor (typically 1,082 for medical)

Final_Trend = (Z × Your_Historical_Trend) + ((1-Z) × Industry_Benchmark)

Example:
  500 claims → Z = 0.57 (57% your data, 43% benchmark)
  5,000 claims → Z = 0.91 (91% your data, 9% benchmark)`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Stage 2: Trend Decomposition</h4>
                        <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300 font-mono">ANALYZE</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Break total trend into three components: <strong className="text-white">Utilization</strong> (are members using more services?), 
                        <strong className="text-white"> Unit Cost</strong> (are prices per service increasing?), and 
                        <strong className="text-white"> Mix Shift</strong> (are members moving to higher-cost services?).
                      </p>
                      <VegasCodeBlock>{`# Multiplicative Decomposition
Total_Trend = [(1 + Utilization%) × (1 + Unit_Cost%) × (1 + Mix_Shift%)] - 1

Example Calculation:
  Utilization: +3.2% (members using 3.2% more services)
  Unit Cost: +5.1% (prices rising 5.1%)
  Mix Shift: +0.8% (shift to higher-cost services)
  
Total = [(1.032 × 1.051 × 1.008) - 1] = 9.3% trend

Insight: 5.1 / 9.3 = 55% of trend is unit cost
→ Network negotiation problem, not utilization problem`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-emerald-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Stage 3: Population Health Adjustments</h4>
                        <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-300 font-mono">FORECAST</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Layer in known population changes: aging workforce (adds 0.5-1.0% trend per year), GLP-1 adoption curve 
                        (subtracts 0.3-0.8% long-term), specialty drug pipeline (oncology, gene therapy), and plan design changes. 
                        This transforms a backward-looking trend into a forward-looking forecast.
                      </p>
                      <VegasCodeBlock>{`# Population Adjustment Factors
Aging_Impact = (Average_Age_Next_Year - Average_Age_This_Year) × 0.012
  → Each year of average age adds ~1.2% trend

GLP1_Impact = -0.008 × Penetration_Rate × Compliance_Factor
  → 50% penetration at 80% compliance = -0.32% trend

Specialty_Pipeline = Sum(Drug_Launch_Probabilities × Expected_PMPM)
  → CAR-T therapies, gene therapy launches

Forward_Trend = Base_Trend + Aging + GLP1 + Pipeline + Plan_Design`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-fuchsia-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GitBranch className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Stage 4: Monte Carlo Simulation</h4>
                        <span className="px-2 py-0.5 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded text-xs text-fuchsia-300 font-mono">SIMULATE</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Run 10,000 simulations varying utilization, unit cost, and population health assumptions within expected ranges. 
                        Output 50th percentile (median), 75th percentile (conservative budget), and 90th percentile (worst-case) forecasts.
                      </p>
                      <VegasCodeBlock>{`# Monte Carlo Algorithm
for i in 1 to 10000:
  utilization = random_normal(mean=3.2%, std_dev=1.5%)
  unit_cost = random_normal(mean=5.1%, std_dev=2.0%)
  mix_shift = random_normal(mean=0.8%, std_dev=0.5%)
  
  simulated_trend[i] = (1 + utilization) × (1 + unit_cost) × (1 + mix_shift) - 1

# Percentile Outputs
P50 = median(simulated_trend)        # 50% chance of staying below
P75 = percentile_75(simulated_trend) # 75% chance (conservative)
P90 = percentile_90(simulated_trend) # 90% chance (worst-case)

CFO chooses risk tolerance → budget at P75 or P90`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Data Flows */}
      <VegasSection title="Data Flows & Integration" gradient="from-orange-500/10 to-yellow-500/10">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Required Input Schemas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/60 border border-orange-500/30 rounded-lg p-6">
              <h4 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Medical Claims Feed
              </h4>
              <VegasCodeBlock>{`{
  "member_id": "M123456",
  "service_date": "2025-03-15",
  "category": "OUTPATIENT",
  "paid_amount": 1250.00,
  "service_units": 1,
  "primary_diagnosis": "I10",
  "member_months": 1
}

Categories:
- INPATIENT (hospital stays)
- OUTPATIENT (surgeries, procedures)
- PROFESSIONAL (office visits)
- ANCILLARY (lab, imaging)
- PHARMACY (Rx claims)`}</VegasCodeBlock>
            </div>

            <div className="bg-black/60 border border-yellow-500/30 rounded-lg p-6">
              <h4 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Employee Census
              </h4>
              <VegasCodeBlock>{`{
  "member_id": "M123456",
  "date_of_birth": "1978-06-22",
  "gender": "F",
  "zip_code": "46240",
  "plan_tier": "FAMILY",
  "coverage_start": "2024-01-01",
  "employment_status": "ACTIVE"
}

Used for:
- Age/gender risk adjustment
- Geographic normalization
- Coverage continuity analysis`}</VegasCodeBlock>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 mt-8">Engine Outputs</h3>
          <VegasFeatureGrid>
            <VegasFeatureCard
              icon={Target}
              title="12/24/36-Month Forecast"
              description="Median, 75th, 90th percentile trend projections with confidence bands for conservative budget planning"
            />
            <VegasFeatureCard
              icon={BarChart3}
              title="Trend Decomposition"
              description="Utilization vs. unit cost vs. mix shift attribution chart showing which component is driving trend"
            />
            <VegasFeatureCard
              icon={CheckCircle2}
              title="Carrier Comparison"
              description="Your independent forecast vs. carrier renewal assumptions with variance analysis"
            />
            <VegasFeatureCard
              icon={Cpu}
              title="Budget Impact Model"
              description="Dollar impact at P50/P75/P90 scenarios to inform CFO budget decisions"
            />
            <VegasFeatureCard
              icon={Zap}
              title="Scenario Analysis"
              description="What-if modeling for GLP-1 adoption, network changes, plan design modifications"
            />
            <VegasFeatureCard
              icon={CheckCircle2}
              title="Board Executive Summary"
              description="Methodology documentation + key findings in board-ready format with fiduciary defense"
            />
          </VegasFeatureGrid>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Deployments" gradient="from-purple-500/10 to-fuchsia-500/10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-blue-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-blue-400 mb-2">CFO Annual Budget</div>
              <div className="text-2xl font-black text-white mb-3">$1.8M Saved</div>
              <p className="text-white/70 text-sm leading-relaxed">
                5,000-life self-insured employer receives carrier renewal with 11.2% medical trend. Engine projects 8.4% based on 
                credibility-weighted historical + aging workforce adjustment. CFO builds budget at 9.0% (75th percentile), 
                saving $1.8M vs. carrier estimate. Mid-year actuals come in at 8.9% — forecast validated.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-purple-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-purple-400 mb-2">PE Due Diligence</div>
              <div className="text-2xl font-black text-white mb-3">$2.3M Thesis</div>
              <p className="text-white/70 text-sm leading-relaxed">
                PE firm evaluating portfolio company sees benefits spend trending at 14% annually. Engine reveals trend is 100% 
                unit cost (no utilization increase) — a network negotiation problem, not a population health problem. 
                Deal proceeds with $2.3M cost-savings thesis tied to network renegotiation in year 1.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-emerald-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-emerald-400 mb-2">Broker Value Defense</div>
              <div className="text-2xl font-black text-white mb-3">Contract Renewed</div>
              <p className="text-white/70 text-sm leading-relaxed">
                Broker under threat from RFP uses engine to demonstrate client's actual trend is 2.8% below market 
                (due to care management programs broker implemented). Quantifies $4.2M in 3-year value delivered — 
                contract renewed with expanded scope.
              </p>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Validate Your Medical Trend?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop accepting carrier trend estimates at face value. Run an independent, credibility-weighted forecast 
            specific to your population in under 30 seconds.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}