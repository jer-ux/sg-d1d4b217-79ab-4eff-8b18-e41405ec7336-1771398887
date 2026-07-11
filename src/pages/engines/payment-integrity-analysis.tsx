import { Shield, Database, AlertTriangle, DollarSign, CheckCircle2, Target, Zap, Search } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function PaymentIntegrityAnalysisEngine() {
  return (
    <EngineDetailLayout
      title="Payment Integrity Analysis"
      category="Healthcare Economics Engine"
      tagline="Detect claim errors, duplicate payments, and pricing anomalies with ML-powered auditing that recovers 2-4% of paid claims annually"
      gradient="from-red-600 via-orange-600 to-amber-600"
    >
      {/* Problem */}
      <VegasSection title="The 3% Leak" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Industry benchmarks show 3-5% of healthcare claims are paid incorrectly—duplicate charges, unbundling, upcoding, incorrect pricing, coding errors. On $30M annual spend, that's $900K walking out the door. Your TPA's "payment integrity" caught $120K. Where's the other $780K?
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Claim Error Rate"
              value="3-5%"
              sublabel="industry average"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={DollarSign}
              label="Recoverable Amount"
              value="$900K"
              sublabel="per $30M spend"
              gradient="from-orange-600 to-amber-600"
            />
            <VegasMetricCard
              icon={Shield}
              label="TPA Recovery Rate"
              value="10-20%"
              sublabel="of total leakage"
              gradient="from-amber-600 to-yellow-600"
            />
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>TPA catches obvious duplicates but misses unbundling and upcoding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No visibility into pricing accuracy: paying $3,200 for a $1,800 service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Can't quantify total leakage to justify recovery investment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>CFO assumes "clean claims" because TPA doesn't flag errors</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="ML-Powered Claims Auditing" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Payment Integrity Engine runs 47 automated audit rules across every claim, flags anomalies using machine learning, benchmarks pricing against fair value databases, and prioritizes recovery opportunities by ROI. Clients typically recover 2-4% of annual spend.
          </p>

          <VegasCodeBlock language="Payment Integrity Rules Engine">
{`// Multi-layer audit process
FOR each claim IN paid_claims:
  
  // Layer 1: Duplicate detection
  IF MATCH(claim_fingerprint, prior_claims, 90_days):
    FLAG "Duplicate payment - recovery target"
  
  // Layer 2: Unbundling detection
  bundled_code = CHECK_ncci_edits(procedure_codes)
  IF bundled_code EXISTS AND components_billed_separately:
    overpayment = SUM(component_payments) - bundled_rate
    FLAG "Unbundling violation - recover ${overpayment}"
  
  // Layer 3: Pricing validation
  fair_value = GET_benchmark(DRG, CPT, geography, percentile_40)
  IF claim.allowed_amount > fair_value × 1.25:
    pricing_error = claim.allowed_amount - fair_value
    FLAG "Pricing anomaly - investigate"
  
  // Layer 4: Medical necessity
  IF procedure NOT supported_by_diagnosis:
    FLAG "Coding inconsistency - medical review"
  
  // Layer 5: ML anomaly detection
  anomaly_score = MODEL_predict(
    claim.features,
    trained_on: historical_overpayments
  )
  IF anomaly_score > THRESHOLD:
    FLAG "Statistical outlier - audit"

// Prioritize recovery
RANK flags BY:
  recovery_amount DESC,
  statute_of_limitations_proximity ASC,
  provider_cooperation_history

GENERATE recovery_action_plan`}
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
                <span><strong className="text-white">47 Audit Rules:</strong> Duplicates, unbundling, upcoding, incorrect pricing, coding errors</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">ML Anomaly Detector:</strong> Pattern recognition trained on historical overpayments</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Fair Value Benchmarking:</strong> Medicare, commercial rate databases, market surveys</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Recovery Workflow:</strong> Provider outreach, documentation, appeals management</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Recovery Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Error Detection Rate" value="3-5%" gradient="from-red-600 to-orange-600" />
              <VegasMetricCard label="Recovery Success" value="60-80%" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Annual ROI" value="8-15x" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Audit Cycle" value="Monthly" gradient="from-cyan-600 to-blue-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Shield}
            title="Manufacturing Company Audit"
            items={[
              "4,200 lives, $28M annual medical spend",
              "Engine audits 24 months of paid claims",
              "Identifies $1.14M in errors (4.1% of spend)",
              "Top issues: duplicates ($340K), unbundling ($420K), pricing ($380K)",
              "Recovers $842K (74% success rate), ROI: 12x audit cost"
            ]}
          />
          <VegasFeatureCard
            icon={Search}
            title="Ongoing Payment Integrity Program"
            items={[
              "7,500 lives, continuous monthly claim audits",
              "Flags 3.6% of claims monthly for review",
              "Proactive provider education reduces future errors",
              "Year 1 recoveries: $1.8M (2.7% of spend)",
              "Year 2 error rate drops to 1.9% as providers adapt"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Find Your Missing Money</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload 24 months of paid claims. Get a complete payment integrity audit report in under 48 hours. 
            See exactly how much you're losing to preventable claim errors.
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