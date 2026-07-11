import { Eye, Database, AlertTriangle, Target, CheckCircle2, DollarSign, Zap, Search } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function HiddenRevenueDetectionEngine() {
  return (
    <EngineDetailLayout
      title="Hidden Revenue Detection"
      category="Fiduciary & Governance Engine"
      tagline="Detect undisclosed vendor compensation including rebate retention, spread pricing, data monetization, and affiliate kickbacks that violate ERISA §408(b)(2) fee disclosure requirements"
      gradient="from-purple-600 via-fuchsia-600 to-pink-600"
    >
      {/* Problem */}
      <VegasSection title="The $6.4M Shadow Revenue" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your broker disclosed a $240K annual commission. Transparent, right? Then a forensic audit discovered: $1.8M in undisclosed PBM override commissions, $2.1M in captive TPA affiliate revenue, $1.2M in data monetization fees, and $1.3M in consulting kickbacks from preferred vendors. Total undisclosed compensation: $6.4M. Your disclosed $240K was 3.6% of actual revenue extracted from your plan.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Hidden Revenue"
              value="$4-12M"
              sublabel="per $100M in healthcare spend"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={Eye}
              label="Disclosure Rate"
              value="<22%"
              sublabel="of total vendor compensation"
              gradient="from-rose-600 to-pink-600"
            />
            <VegasMetricCard
              icon={DollarSign}
              label="Plans Auditing"
              value="<4%"
              sublabel="for undisclosed compensation"
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
                <span>Can't detect shadow revenue: no tools to trace undisclosed compensation flows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Affiliate relationships hidden: captive TPAs, preferred vendors, rebate aggregators undisclosed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Data monetization invisible: claims data sold to pharma, employers never informed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>ERISA §408(b)(2) violations: compensation disclosure incomplete, DOL penalties risk</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="12-Layer Revenue Tracing" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Hidden Revenue Detection Engine traces compensation flows across 12 revenue categories (rebate retention, spread pricing, data monetization, affiliate kickbacks, override commissions, administrative fees, proprietary product placement, consulting referral fees, captive reinsurance profits, performance bonuses, termination penalties, and soft-dollar arrangements), quantifies undisclosed amounts, and generates ERISA §408(b)(2) compliance reports.
          </p>

          <VegasCodeBlock language="Hidden Revenue Detection Algorithm">
{`// Trace all compensation flows
REVENUE_CATEGORIES = [
  rebate_retention,
  spread_pricing,
  data_monetization,
  affiliate_kickbacks,
  override_commissions,
  admin_fee_markups,
  proprietary_placement,
  referral_fees,
  captive_reinsurance,
  performance_bonuses,
  termination_penalties,
  soft_dollar_arrangements
]

FOR each vendor IN [broker, PBM, TPA, stop_loss, consultant]:
  
  // Layer 1: Rebate Retention
  IF vendor == PBM:
    ANALYZE rebate_flow:
      disclosed_rebates = CONTRACT.rebate_pass_through
      actual_rebates = GET_manufacturer_confirmation()
      retention = actual_rebates - disclosed_rebates
      IF retention > 0:
        FLAG "Undisclosed rebate retention: $" + retention
  
  // Layer 2: Spread Pricing
  IF vendor IN [PBM, specialty_pharmacy]:
    ANALYZE drug_pricing:
      FOR each claim:
        carrier_paid = claim.allowed_amount
        ingredient_cost = GET_invoice_or_nadac()
        spread = carrier_paid - ingredient_cost - dispensing_fee
        IF spread > $2.00:
          FLAG "Spread pricing detected: $" + spread
      total_spread = SUM(all spreads)
  
  // Layer 3: Data Monetization
  FOR each vendor WITH data_access:
    INVESTIGATE:
      - Data sharing agreements with pharma?
      - De-identification and resale terms?
      - Compensation for claims data access?
      - Member consent obtained?
    IF undisclosed_data_revenue EXISTS:
      FLAG "Data monetization: $" + estimated_value
  
  // Layer 4: Affiliate Kickbacks
  IF vendor HAS affiliate_network:
    TRACE referrals TO:
      - Captive TPA
      - Preferred stop-loss carrier
      - Rebate aggregator
      - Consulting firm
      - Wellness vendor
    FOR each referral:
      IF compensation_received AND NOT disclosed:
        FLAG "Affiliate kickback: $" + referral_fee
  
  // ... 8 more revenue layers ...

// Quantify total undisclosed compensation
total_hidden_revenue = SUM(all flagged amounts)
disclosed_compensation = CONTRACT.stated_fees
disclosure_ratio = disclosed / (disclosed + total_hidden_revenue)

GENERATE:
  - Undisclosed revenue summary by category
  - Vendor compensation breakdown
  - ERISA §408(b)(2) compliance assessment
  - DOL audit defense package`}
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
                <span><strong className="text-white">12-Layer Revenue Tracer:</strong> Detect all undisclosed compensation sources</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Affiliate Network Mapper:</strong> Identify captive TPAs and preferred vendor kickbacks</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Data Monetization Tracker:</strong> Quantify claims data resale to pharma</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">ERISA Compliance Reporter:</strong> Generate §408(b)(2) audit packages</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Detection Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Avg Hidden Revenue" value="$4.2-8.7M" sublabel="per $100M healthcare spend" gradient="from-red-600 to-rose-600" />
              <VegasMetricCard label="Detection Rate" value="94%" sublabel="undisclosed compensation found" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Recovery" value="$2.8-6.1M" sublabel="typical clawback amounts" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Audit Time" value="3-5 days" sublabel="complete revenue trace" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={DollarSign}
            title="PBM Rebate Retention Discovery"
            items={[
              "Disclosed rebates: $42 PMPM",
              "Engine traced manufacturer payments to PBM",
              "Actual rebates: $68 PMPM",
              "Undisclosed retention: $26 PMPM ($3.1M annually)",
              "Confronted PBM with evidence",
              "Settlement: $8.4M retroactive payment + full pass-through going forward"
            ]}
          />
          <VegasFeatureCard
            icon={Eye}
            title="Broker Affiliate Kickback Scheme"
            items={[
              "Broker disclosed $240K commission",
              "Engine detected captive TPA referral (broker-owned)",
              "TPA charged 18% admin fees vs. 8% market rate",
              "Hidden affiliate profit: $1.8M annually",
              "Also found: PBM override commissions $2.1M",
              "Total undisclosed: $3.9M, terminated broker relationship"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Follow the Money</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Trace all vendor compensation flows across 12 revenue categories. Detect undisclosed payments. 
            Quantify shadow revenue. Demand full ERISA §408(b)(2) compliance—no more hidden kickbacks.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-fuchsia-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-fuchsia-50 transition-all duration-200 shadow-2xl hover:shadow-fuchsia-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}