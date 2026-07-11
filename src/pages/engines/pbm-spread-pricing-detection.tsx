import { Eye, Database, AlertTriangle, DollarSign, CheckCircle2, Target, Zap, Search } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function PBMSpreadPricingDetectionEngine() {
  return (
    <EngineDetailLayout
      title="PBM Spread Pricing Detection"
      category="Healthcare Economics Engine"
      tagline="Detect hidden spread between ingredient cost reimbursed to pharmacy vs. amount billed to plan, quantify total spread revenue, and identify recoverable overcharges"
      gradient="from-red-600 via-rose-600 to-pink-600"
    >
      {/* Problem */}
      <VegasSection title="The Hidden Profit Layer" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your PBM says they reimburse pharmacies "at cost." But when you audit the claims, you find they reimbursed the pharmacy $42 for a generic—and billed you $87. That $45 difference? It's called spread. Your PBM pocketed it. Multiply that across 500,000 Rx claims and you've funded their Vegas trip.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={DollarSign}
              label="Spread Per Claim"
              value="$2-$12"
              sublabel="average hidden markup"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={AlertTriangle}
              label="Spread PMPM"
              value="$8-$22"
              sublabel="typical plan leakage"
              gradient="from-rose-600 to-pink-600"
            />
            <VegasMetricCard
              icon={Eye}
              label="Detection Rate"
              value="<15%"
              sublabel="plans audit spread"
              gradient="from-pink-600 to-fuchsia-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Can't see spread: PBM report shows "plan cost" not actual pharmacy reimbursement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No benchmark: don't know if $87 for generic atorvastatin is fair or inflated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Retroactive recovery impossible: spread captured monthly, audit happens yearly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Contract vague on "at cost" definition—PBM uses that ambiguity</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Real-Time Spread Detection" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our PBM Spread Pricing Detection Engine benchmarks every claim against NADAC + MAC pricing, identifies outlier reimbursements, flags spread revenue opportunities, and generates audit reports with recoverable overcharges itemized by NDC and pharmacy.
          </p>

          <VegasCodeBlock language="Spread Detection Algorithm">
{`// Real-time claim audit
FOR each claim IN pharmacy_claims:
  plan_cost = claim.ingredient_cost + claim.dispensing_fee
  
  // Benchmark ingredient cost
  nadac_price = GET_nadac(claim.ndc, claim.fill_date)
  mac_price = GET_mac(claim.ndc, state, claim.fill_date)
  benchmark = MIN(nadac_price, mac_price)
  
  // Calculate spread
  spread = plan_cost - (benchmark + reasonable_dispensing_fee)
  
  IF spread > $5 OR spread_percent > 15%:
    // High spread detected
    FLAG claim for audit
    
    recovery_opportunity = spread × claim.quantity
    
    CATEGORIZE spread:
      IF spread > $50: "Extreme outlier — likely error or fraud"
      IF spread $10-$50: "Significant spread — review contract"
      IF spread $5-$10: "Moderate spread — track trend"
  
  // Aggregate by pharmacy
  pharmacy_total_spread = SUM(spread BY pharmacy_id)
  IF pharmacy_total_spread > $50K:
    FLAG "High-spread pharmacy — investigate relationship with PBM"

// Generate recovery report
total_spread = SUM(all flagged claims)
potential_recovery = total_spread × recovery_probability
  where recovery_probability = 60-80% (contract dependent)

OUTPUT:
  - Total spread PMPM
  - Top 20 NDCs by spread revenue
  - High-spread pharmacies
  - Recoverable amount by month`}
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
                <span><strong className="text-white">NADAC Benchmark:</strong> Compare plan cost vs. National Average Drug Acquisition Cost</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">MAC Pricing:</strong> Validate against Maximum Allowable Cost by state</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Spread Aggregator:</strong> Calculate total spread PMPM and by pharmacy</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Recovery Engine:</strong> Generate itemized audit report with recovery targets</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Detection Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Spread Detection" value="85-95%" sublabel="claims flagged" gradient="from-red-600 to-rose-600" />
              <VegasMetricCard label="Avg Spread/Claim" value="$3-$18" sublabel="varies by NDC" gradient="from-rose-600 to-pink-600" />
              <VegasMetricCard label="Total Leakage" value="$500K-$2M" sublabel="annual per 10K lives" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Recovery Rate" value="60-75%" sublabel="contract dependent" gradient="from-teal-600 to-cyan-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Search}
            title="Generic Atorvastatin Spread Audit"
            items={[
              "Claim: Generic atorvastatin 40mg, 90-day supply",
              "Plan cost billed: $87",
              "NADAC benchmark: $9.50 (90 tablets)",
              "Reasonable dispensing fee: $12",
              "Expected cost: $21.50",
              "Detected spread: $65.50 per claim",
              "Annual recovery on this NDC alone: $245K"
            ]}
          />
          <VegasFeatureCard
            icon={AlertTriangle}
            title="High-Spread Pharmacy Network"
            items={[
              "Identified 12 pharmacies with >$100K annual spread",
              "Common ownership: PBM-affiliated specialty pharmacy chain",
              "Total spread from these 12: $1.8M/year",
              "Contract breach: 'at cost' reimbursement clause violated",
              "Audit demand sent, recovery negotiated: $1.1M",
              "New contract clause: mandatory NADAC validation"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Expose Hidden Spread Revenue</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Benchmark every claim against NADAC + MAC. Detect spread pricing in real-time. 
            Generate audit reports with itemized recovery targets. Stop funding PBM profit margins.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-rose-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-rose-50 transition-all duration-200 shadow-2xl hover:shadow-rose-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}