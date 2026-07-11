import { DollarSign, Database, Target, TrendingUp, CheckCircle2, AlertTriangle, Zap, BarChart3 } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function RebateOptimizationEngine() {
  return (
    <EngineDetailLayout
      title="Rebate Optimization"
      category="Healthcare Economics Engine"
      tagline="Model formulary tier changes, quantify rebate impact vs. net cost, and identify when accepting lower rebates delivers higher total savings"
      gradient="from-amber-600 via-orange-600 to-red-600"
    >
      {/* Problem */}
      <VegasSection title="The Rebate Trap" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your PBM brags about $42 PMPM in rebates. Sounds great—until you realize they steered utilization to the highest-WAC drugs to maximize their rebate revenue. Your net cost? 15% higher than it should be. Rebates aren't savings when the ingredient cost is inflated to create them.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={DollarSign}
              label="Typical Rebate"
              value="$35-$50"
              sublabel="PMPM Rx rebates"
              gradient="from-amber-600 to-orange-600"
            />
            <VegasMetricCard
              icon={AlertTriangle}
              label="Rebate Retention"
              value="15-25%"
              sublabel="PBM keeps portion"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={TrendingUp}
              label="Net Cost Impact"
              value="8-12%"
              sublabel="higher when rebate-chasing"
              gradient="from-red-600 to-rose-600"
            />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-amber-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Can't model net cost: only see gross ingredient cost and rebate separately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Formulary decisions based on rebate dollars, not total cost of care</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>No visibility into rebate-for-spread trade: PBM wins, plan loses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Generic deflection undetected: brand preferred when generic is cheaper net</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Net Cost Optimization" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Rebate Optimization Engine models formulary tier scenarios, calculates true net cost (ingredient + dispensing - rebates), identifies when lower rebates yield lower total cost, and generates alternative formularies optimized for net spend—not rebate maximization.
          </p>

          <VegasCodeBlock language="Rebate Optimization Algorithm">
{`// Current state analysis
FOR each drug IN formulary:
  gross_cost = ingredient_cost + dispensing_fee
  rebate = contracted_rebate_percent × WAC
  net_cost = gross_cost - rebate
  
  // Find therapeutic alternatives
  alternatives = GET_same_therapeutic_class(drug)
  
  FOR each alt IN alternatives:
    alt.net_cost = (alt.ingredient + alt.dispensing) - alt.rebate
  
  // Rank by net cost
  RANK alternatives BY net_cost ASC

// Scenario modeling
SCENARIO "High Rebate (Current)":
  preferred_brands = drugs with rebate > 40%
  total_rebate_pmpm = $48
  net_cost_pmpm = $285

SCENARIO "Low Rebate Generic":
  preferred_generics = lowest_net_cost
  total_rebate_pmpm = $22
  net_cost_pmpm = $242
  
  savings = $285 - $242 = $43 PMPM
  foregone_rebate = $48 - $22 = $26 PMPM
  
  NET BENEFIT = $43 - $26 = $17 PMPM
  // You save $17 PMPM by accepting lower rebates

// Implementation
IF net_savings > rebate_loss:
  RECOMMEND formulary_change
  GENERATE tier_placement_report
  FLAG utilization_targets`}
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
                <span><strong className="text-white">Net Cost Calculator:</strong> Ingredient + dispensing - rebates for every NDC</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Therapeutic Substitution Finder:</strong> Identify lower-cost alternatives in same class</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Scenario Modeler:</strong> Compare high-rebate vs. low-rebate formularies</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Utilization Shifter:</strong> Forecast member response to tier changes</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Optimization Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Net Cost Reduction" value="8-14%" sublabel="vs. rebate-chasing" gradient="from-amber-600 to-orange-600" />
              <VegasMetricCard label="Generic Deflection" value="$12-18 PMPM" sublabel="captured savings" gradient="from-orange-600 to-red-600" />
              <VegasMetricCard label="Rebate Impact" value="$20-35 PMPM" sublabel="foregone rebates" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Net Benefit" value="$8-22 PMPM" sublabel="total plan savings" gradient="from-teal-600 to-cyan-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={DollarSign}
            title="Statin Formulary Redesign"
            items={[
              "Current: Lipitor preferred (high rebate, high WAC)",
              "Rebate: $42 PMPM, Net cost: $68 PMPM",
              "Alternative: Generic atorvastatin preferred",
              "Rebate: $8 PMPM, Net cost: $28 PMPM",
              "Net savings: $40 PMPM despite $34 lower rebates",
              "Annual savings: $480K on 10K lives"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Diabetes Therapy Optimization"
            items={[
              "PBM preferred: Brand GLP-1 (rebate-maximizing)",
              "Engine analysis: Generic metformin + SGLT2i cheaper net",
              "Rebate loss: $18 PMPM",
              "Net cost savings: $52 PMPM",
              "Net benefit: $34 PMPM",
              "3-year savings: $1.2M, implementation approved"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Optimize for Net Cost, Not Rebates</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Model formulary scenarios. Calculate true net cost. Identify when accepting lower rebates 
            delivers higher total savings. Stop chasing rebates—start chasing net cost reduction.
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