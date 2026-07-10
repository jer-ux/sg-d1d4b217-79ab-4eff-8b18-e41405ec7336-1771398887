import { DollarSign, Database, Target, TrendingDown, AlertCircle, CheckCircle2, BarChart3, Zap, Calculator, PieChart, Shield } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function EBITDAEnhancementEngine() {
  return (
    <EngineDetailLayout
      title="EBITDA Enhancement"
      category="Private Equity & CFO Engine"
      icon={DollarSign}
      description="Quantify healthcare cost optimization opportunities that flow directly to EBITDA, with implementation roadmaps and 12-24 month impact models"
    >
      {/* Problem Statement */}
      <VegasSection title="The $4M EBITDA Hole No One Sees" gradient="from-red-500/10 to-orange-500/10">
        <div className="space-y-6">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-300 mb-3">PE Operators Miss Healthcare's EBITDA Contribution</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  Healthcare benefits are the #2 or #3 expense line for most portfolio companies, yet PE operators treat it as 
                  an HR administrative function, not an EBITDA optimization opportunity. The result: $2M-$8M in annual EBITDA 
                  leakage goes unaddressed because it's buried in "employee benefits" — invisible to the deal team and operating partners.
                </p>
                <p className="text-red-300 font-bold text-lg">
                  A typical $100M revenue manufacturing company with 500 employees has $4M-$6M in addressable healthcare waste. 
                  That's 4-6% EBITDA margin expansion — the difference between a 2.5x and 3.2x exit multiple.
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
                  <span>Healthcare buried in G&A — no visibility to deal team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Operating partners lack healthcare domain expertise to challenge brokers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Broker incumbency bias: "market is up 12%, nothing we can do"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>No EBITDA attribution for healthcare spend reduction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Exit valuation leaves $10M-$30M on table (4-6% margin × enterprise value multiple)</span>
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
                  <span>100-day forensic audit identifying $2M-$8M in addressable leakage</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>EBITDA-attributed savings roadmap (Yr 1: $1.8M, Yr 2: $2.4M, Yr 3: $3.1M)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Quantified implementation risk and timeline for each initiative</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Board-ready business case with ROI, payback period, and sensitivities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Continuous monitoring dashboard linking initiatives to EBITDA impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Engineering Architecture */}
      <VegasSection title="Five-Pillar Forensic Framework" gradient="from-cyan-500/10 to-blue-500/10">
        <div className="space-y-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <VegasMetricCard label="Audit Depth" value="18 vectors" sublabel="Cost leakage pathways" />
            <VegasMetricCard label="Data Volume" value="36 months" sublabel="Claims + contract history" />
            <VegasMetricCard label="Analysis Time" value="5-7 days" sublabel="Full forensic completion" />
            <VegasMetricCard label="Avg. Finding" value="$2.4M" sublabel="Annual addressable waste" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Five Forensic Pillars</h3>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-red-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Pillar 1: PBM Contract Leakage</h4>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-300 font-mono">30-40% OF EBITDA OPPORTUNITY</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Analyze Rx claims against PBM contract guarantees. Detect spread pricing (ingredient cost + dispensing fee vs. MAC list), 
                        rebate underperformance (contractual rebate % vs. actual remittance), formulary misalignment (brand Rxs where generic equivalents exist), 
                        and hidden fees (DIR clawbacks, annual administrative fees not disclosed at RFP).
                      </p>
                      <VegasCodeBlock>{`# Spread Detection Algorithm
For each Rx claim:
  Contract_MAC = lookup(NDC, contract_MAC_list)
  Actual_Paid = ingredient_cost + dispensing_fee
  Spread = Actual_Paid - Contract_MAC
  
Annual_Leakage = Sum(Spread × Scripts)

Example Finding:
  500K scripts/year
  Average spread: $4.80/script
  Annual leakage: $2.4M → flows to EBITDA if recovered

Typical Culprits:
- Specialty pharmacy spread ($15-$40/script)
- Brand-generic substitution failures ($180/script)
- DIR fee clawbacks (3-5% of ingredient cost)
- Administrative fees exceeding contract caps`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Pillar 2: Stop-Loss Insurance Optimization</h4>
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 font-mono">15-25% OF EBITDA OPPORTUNITY</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Model optimal specific and aggregate deductibles based on actual large claimant distribution. Most companies over-insure 
                        (paying too much premium for coverage they'll never use) or under-insure (exposing balance sheet to tail risk). 
                        Right-sizing stop-loss saves $300K-$900K annually for a 500-life group.
                      </p>
                      <VegasCodeBlock>{`# Monte Carlo Stop-Loss Optimization
For each deductible level ($200K, $250K, $300K, $350K):
  Run 10,000 simulations:
    - Draw large claims from historical distribution
    - Calculate net cost = Premium + Claims_Above_Deductible
  
  Expected_Cost[deductible] = Mean(net_cost)
  95th_Percentile_Cost[deductible] = P95(net_cost)

Optimal_Deductible = Min(Expected_Cost) subject to:
  95th_Percentile < Risk_Tolerance_Threshold

Example Result:
  Current: $200K deductible, $1.2M premium
  Optimal: $300K deductible, $850K premium
  EBITDA Impact: $350K annual savings
  Risk: 95th percentile cost increases $180K (acceptable)`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-emerald-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Pillar 3: Medical Network Performance</h4>
                        <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-300 font-mono">20-30% OF EBITDA OPPORTUNITY</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Compare actual allowed amounts vs. Medicare rates by procedure code and facility. Identify high-cost outliers (hospitals 
                        charging 400% of Medicare for the same procedure as a lower-cost alternative 5 miles away). Site-of-care migration 
                        (inpatient → outpatient, hospital → ASC) and reference-based pricing strategies.
                      </p>
                      <VegasCodeBlock>{`# Unit Cost Benchmarking
For each CPT code:
  Allowed_Amount = What_Plan_Paid
  Medicare_Rate = CMS_Fee_Schedule[CPT, Locality]
  Benchmark_Ratio = Allowed_Amount / Medicare_Rate

High_Cost_Procedures = filter(Benchmark_Ratio > 250%)

Savings_Opportunity = Sum(
  (Allowed - Medicare × 180%) × Claim_Volume
) for High_Cost_Procedures

Example Finding:
  Knee MRI at Hospital A: $2,800 (450% of Medicare)
  Knee MRI at Imaging Center B: $850 (140% of Medicare)
  Volume: 120 MRIs/year
  Savings: $234K if steered to Center B
  Implementation: benefit design (lower copay at preferred sites)`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Pillar 4: Plan Design & Cost Sharing</h4>
                        <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300 font-mono">10-15% OF EBITDA OPPORTUNITY</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Model employee cost-sharing strategies that reduce total cost while maintaining workforce satisfaction. 
                        High-deductible plans with HSA contributions, narrow networks, tiered copays for specialty drugs, and 
                        prior authorization for high-cost imaging reduce utilization by 8-15% with minimal employee pushback when implemented correctly.
                      </p>
                      <VegasCodeBlock>{`# Cost-Sharing Elasticity Model
For each plan design change:
  Utilization_Impact = Demand_Elasticity × Cost_Share_Change
  Employee_Premium_Change = Pass_Through_Rate × Total_Cost_Change
  
  Total_Savings = (Utilization_Impact + Plan_Premium_Impact) - Employee_Pushback_Cost

Example Scenario:
  Change: Increase ER copay $100 → $250
  Elasticity: -0.15 (15% reduction per 100% cost increase)
  ER visits: 180/year @ $2,400 average
  Utilization drop: 27 visits (15% × 180)
  Gross savings: $64,800 (27 × $2,400)
  Employee premium reduction: $32/month (share 50% of savings)
  Net EBITDA impact: +$45K/year`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-yellow-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Pillar 5: Payment Integrity & Recovery</h4>
                        <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-300 font-mono">5-10% OF EBITDA OPPORTUNITY</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Detect duplicate payments, upcoding, unbundling, and medical necessity violations in paid claims. Deploy automated 
                        prepayment edits for high-risk claim patterns. Typical recovery: 2-4% of annual medical spend, of which 50-70% is 
                        net-new EBITDA (the rest offsets future claims).
                      </p>
                      <VegasCodeBlock>{`# Payment Integrity Rules Engine
Rule Set:
1. Duplicate Claim Detection
   - Same member, CPT, date, provider within 24 hours
   
2. Unbundling Detection
   - Multiple line items that should be single procedure code
   - Example: Colonoscopy + biopsy billed separately (should be bundled)
   
3. Upcoding Detection
   - Office visit coded as Level 5 (99215) when documentation supports Level 3
   
4. Medical Necessity
   - MRI ordered without prior conservative treatment
   - Brand drug prescribed when generic clinically equivalent

Annual Recovery Example:
  Medical spend: $12M
  Claims flagged: 340 (2.8% of volume)
  Overpayment identified: $420K (3.5% of spend)
  Net recovery after appeals: $294K (70% success rate)
  → Direct EBITDA lift`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* EBITDA Attribution Model */}
      <VegasSection title="EBITDA Attribution & Tracking" gradient="from-purple-500/10 to-fuchsia-500/10">
        <div className="space-y-6">
          <p className="text-white/80 text-lg leading-relaxed">
            Every initiative is mapped to EBITDA impact with implementation timeline, success probability, and ongoing monitoring KPIs. 
            This enables PE operators to include healthcare optimization in their investment thesis and track it alongside other margin expansion initiatives.
          </p>
          
          <div className="bg-black/60 border border-purple-500/30 rounded-lg p-6">
            <h4 className="text-lg font-bold text-purple-400 mb-4">3-Year EBITDA Roadmap Example</h4>
            <VegasCodeBlock>{`Portfolio Company: Manufacturing, 500 employees, $100M revenue, $12M EBITDA
Current Healthcare Spend: $6.2M (5.0% of payroll)

Year 1 Initiatives (100-Day Plan)
├─ PBM Contract Renegotiation: $850K (Q2 implementation)
├─ Stop-Loss Optimization: $320K (Q1 implementation)
├─ Payment Integrity Launch: $180K (Q3 recovered claims)
└─ Plan Design Adjustment: $220K (Q4 open enrollment)
   TOTAL YEAR 1: $1.57M → 13.1% EBITDA growth

Year 2 Initiatives
├─ Reference-Based Pricing (Phase 1): $420K
├─ Specialty Pharmacy Carve-Out: $380K
├─ Site-of-Care Steering: $290K
└─ Ongoing Payment Integrity: $240K
   TOTAL YEAR 2: $1.33M → cumulative $2.90M

Year 3 Initiatives
├─ Direct Contracting (Musculoskeletal): $510K
├─ GLP-1 Management Program: $280K (cost avoidance)
├─ Network Optimization (ACO partnership): $340K
└─ Ongoing Programs: $380K
   TOTAL YEAR 3: $1.51M → cumulative $4.41M

Exit Impact:
  EBITDA improvement: $4.41M annually (36.8% increase)
  At 6.5x EBITDA multiple: +$28.7M enterprise value
  Investment: $420K consulting + implementation
  ROI: 68x`}</VegasCodeBlock>
          </div>

          <VegasFeatureGrid>
            <VegasFeatureCard
              icon={Target}
              title="Initiative Tracking"
              description="Each initiative has defined owner, timeline, success metrics, and EBITDA attribution model"
            />
            <VegasFeatureCard
              icon={BarChart3}
              title="Monthly EBITDA Reconciliation"
              description="Actual savings vs. projected, variance analysis, and course corrections"
            />
            <VegasFeatureCard
              icon={PieChart}
              title="Portfolio Benchmarking"
              description="Compare healthcare cost performance across portfolio companies, identify laggards"
            />
          </VegasFeatureGrid>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Portfolio Company Case Studies" gradient="from-emerald-500/10 to-teal-500/10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-emerald-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-emerald-400 mb-2">Manufacturing PortCo</div>
              <div className="text-2xl font-black text-white mb-3">$3.8M EBITDA</div>
              <p className="text-white/70 text-sm leading-relaxed">
                Mid-market bolt-and-fastener manufacturer with 420 employees. PBM contract forensics revealed $1.2M annual spread pricing, 
                stop-loss reoptimization saved $380K, site-of-care program delivered $420K. Combined with network renegotiation: 
                $3.8M recurring EBITDA improvement over 18 months. Exit multiple increased from 5.8x to 6.4x.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-blue-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-blue-400 mb-2">Healthcare Services Platform</div>
              <div className="text-2xl font-black text-white mb-3">$6.2M EBITDA</div>
              <p className="text-white/70 text-sm leading-relaxed">
                Roll-up of 8 behavioral health clinics, 850 employees. Harmonized benefits across entities while reducing total cost. 
                Self-funded captive with reference-based pricing for hospital claims. Specialty pharmacy carve-out with transparent PBM. 
                Payment integrity program recovering $340K annually. Total: $6.2M EBITDA improvement, 19% margin expansion.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-purple-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-purple-400 mb-2">PE Thesis Validation</div>
              <div className="text-2xl font-black text-white mb-3">$2.1M at LOI</div>
              <p className="text-white/70 text-sm leading-relaxed">
                Pre-acquisition forensic audit identified $2.1M in addressable healthcare waste. PE firm built this into acquisition model 
                as Year 1 margin expansion initiative. Engine findings supported valuation bridge, identified implementation risks, 
                and provided 100-day roadmap. Actual Year 1 delivery: $1.9M (90% of projected).
              </p>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">How Much EBITDA Are You Leaving on the Table?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Run a 100-day forensic audit on your portfolio company. Quantify addressable healthcare waste, 
            build an EBITDA-attributed roadmap, and start flowing savings to the bottom line in 90 days.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-emerald-50 transition-all duration-200 shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105">
            Request Forensic Audit
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}