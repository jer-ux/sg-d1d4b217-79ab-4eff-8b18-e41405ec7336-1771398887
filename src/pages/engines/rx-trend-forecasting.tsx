import { Pill, Database, TrendingUp, Activity, AlertTriangle, CheckCircle2, BarChart3, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function RxTrendForecastingEngine() {
  return (
    <EngineDetailLayout
      title="Rx Trend Forecasting Engine"
      category="Financial & Trend"
      tagline="Pharmacy Trend Intelligence That Accounts for GLP-1s, Biosimilars, and Formulary Shifts"
      gradient="from-emerald-600 via-teal-600 to-cyan-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Rx Trend Blindspot" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Traditional Pharmacy Trend</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Uses industry averages (12-15%) regardless of formulary design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Ignores GLP-1 penetration and biosimilar adoption rates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot model PBM formulary changes mid-year</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Treats specialty and traditional Rx as one monolithic trend</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No connection to actual rebate performance or spread pricing</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">Kincaid IQ Rx Trend Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Decomposes trend into utilization, unit cost, and mix shift components</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Models GLP-1 adoption curves and gene therapy penetration separately</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Predicts formulary migration impact (Tier 1→3 shift scenarios)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Separates specialty vs. traditional trend with credibility weighting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Integrates actual rebate yield and spread pricing into net trend</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Engineering Architecture */}
      <VegasSection title="Technical Architecture" icon={Database}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-cyan-400 mb-3">Decomposition Model</h3>
              <VegasCodeBlock language="python">
{`Rx_Trend = (Utilization_Trend × Unit_Cost_Trend × Mix_Shift_Factor) - Rebate_Yield

Components:
├─ Utilization Trend
│  ├─ Scripts PMPM change
│  ├─ Days supply trend
│  └─ GLP-1 new starts
├─ Unit Cost Trend
│  ├─ WAC inflation
│  ├─ Biosimilar substitution
│  └─ Generic dispensing rate
├─ Mix Shift Factor
│  ├─ Specialty penetration
│  ├─ Formulary tier migration
│  └─ High-cost drug adoption
└─ Net Rebate Yield
   ├─ Manufacturer rebates
   ├─ Formulary rebates
   └─ PBM spread pricing`}
              </VegasCodeBlock>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-emerald-400 mb-3">GLP-1 Adoption Curve</h3>
              <VegasCodeBlock language="python">
{`def glp1_penetration(month, pop_diabetic, pop_obese):
    # Logistic adoption with clinical guidelines
    base_eligible = pop_diabetic * 0.35 + pop_obese * 0.12
    
    # Market penetration curve (S-curve)
    time_factor = 1 / (1 + exp(-0.3 * (month - 18)))
    
    # PMPM impact
    glp1_users = base_eligible * time_factor
    avg_cost = 1200  # Monthly Ozempic/Wegovy
    
    incremental_pmpm = (glp1_users * avg_cost) / total_members
    
    return {
        'pmpm_impact': incremental_pmpm,
        'users': glp1_users,
        'penetration_rate': time_factor
    }`}
              </VegasCodeBlock>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Technical Specs */}
      <VegasSection title="Engine Specifications" icon={Activity}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={BarChart3}
            label="Trend Decomposition"
            value="7 Layers"
            gradient="from-emerald-500 to-teal-500"
            description="Utilization, unit cost, mix, specialty, rebate, spread, biosimilar"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Forecast Horizon"
            value="36 Months"
            gradient="from-teal-500 to-cyan-500"
            description="Rolling 3-year with quarterly recalibration"
          />
          <VegasMetricCard
            icon={Target}
            label="Accuracy"
            value="±2.5%"
            gradient="from-cyan-500 to-blue-500"
            description="MAPE vs actual Rx spend (credibility-weighted)"
          />
        </div>
      </VegasSection>

      {/* Data Inputs */}
      <VegasSection title="Required Data Inputs" icon={Database}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Pill}
            title="Claims Data"
            items={[
              "NDC-level pharmacy claims (12-36 months)",
              "Days supply and quantity dispensed",
              "Retail vs. mail order vs. specialty",
              "Formulary tier and copay structure",
              "Rejected claims and prior authorizations"
            ]}
          />
          <VegasFeatureCard
            icon={Database}
            title="Rebate & Pricing"
            items={[
              "Manufacturer rebate guarantee schedules",
              "Formulary rebate contractual terms",
              "PBM spread pricing methodology",
              "AWP, WAC, and MAC pricing files",
              "Biosimilar launch dates and adoption curves"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={CheckCircle2}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={TrendingUp}
            title="Renewal Forecasting"
            items={[
              "Employer with 8,500 lives projects 18.2% Rx trend",
              "Engine decomposes: 12% utilization, 8% unit cost, -2% rebates",
              "GLP-1 adoption adds 3.2% incremental PMPM",
              "Specialty penetration increases from 42% to 48%",
              "CFO approves budget with ±2% variance tolerance"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="PBM Contract Validation"
            items={[
              "Plan sponsor guaranteed 15% trend by PBM",
              "Actual trend running 22% at 6 months",
              "Engine identifies: spread pricing +4%, formulary tier shift +3%",
              "Recovers $1.8M in contract guarantee shortfall",
              "Renegotiates rebate pass-through terms"
            ]}
          />
          <VegasFeatureCard
            icon={Zap}
            title="Formulary Redesign Modeling"
            items={[
              "Health plan evaluating closed vs. open formulary",
              "Engine models 15% Tier 3 migration scenario",
              "Predicts $4.2M savings from generic substitution",
              "Offsets by $1.1M in specialty tier exceptions",
              "Net PMPM reduction: $18.50 (14% savings)"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Accepting Pharmacy Trend at Face Value</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your PBM gave you a 15% trend estimate. Is that utilization? Unit cost? GLP-1 adoption? 
            Spread pricing? Get the decomposition in 30 seconds.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-teal-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-teal-50 transition-all duration-200 shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105">
            Run Rx Trend Analysis
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}