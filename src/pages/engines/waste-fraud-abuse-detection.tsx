import { ShieldAlert, Database, AlertTriangle, DollarSign, CheckCircle2, Target, Zap, Eye } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function WasteFraudAbuseDetectionEngine() {
  return (
    <EngineDetailLayout
      title="Waste, Fraud, and Abuse Detection"
      category="Healthcare Economics Engine"
      tagline="Identify fraudulent billing patterns, wasteful care, and abusive practices with AI-powered anomaly detection that protects 1-2% of annual spend"
      gradient="from-red-600 via-crimson-600 to-rose-600"
    >
      {/* Problem */}
      <VegasSection title="The Silent Theft" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            FBI estimates healthcare fraud costs $80B annually—about 3% of total spend. Provider bills for services never rendered. Member uses dead relative's insurance card. Pharmacy dispenses brand drugs but bills for expensive specialty meds. Your claims system pays it all because nobody's watching.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Fraud/Waste Rate"
              value="1-3%"
              sublabel="of healthcare spend"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={DollarSign}
              label="Typical Recovery"
              value="$300K-$1M"
              sublabel="per 5,000 lives annually"
              gradient="from-orange-600 to-amber-600"
            />
            <VegasMetricCard
              icon={ShieldAlert}
              label="Detection Time"
              value="6-18mo"
              sublabel="traditional methods"
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
                <span>Provider bills for phantom office visits—pays for 18 months before anyone notices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Member lets unemployed sibling use their insurance card—costs you $47K</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Pharmacy systematically overbills by $8-$12 per claim—adds up to $180K</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No real-time detection: fraud discovered only during annual audits</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="AI-Powered Fraud Detection" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Waste, Fraud, and Abuse Engine runs continuous behavioral analysis across providers, members, and pharmacies. Machine learning models flag statistical outliers, cross-reference claims against clinical plausibility, and prioritize investigations by fraud probability and financial impact.
          </p>

          <VegasCodeBlock language="Fraud Detection Algorithm">
{`// Provider behavioral analysis
FOR each provider:
  pattern_score = ANALYZE(
    billing_frequency vs peers,
    diagnosis_code_distribution,
    upcoding_propensity,
    service_mix_anomalies,
    weekend_billing_spikes
  )
  
  IF pattern_score > FRAUD_THRESHOLD:
    total_exposure = provider_payments_last_24mo
    FLAG "High-risk provider - investigate"

// Member eligibility verification
FOR each high_cost_claim:
  IF member_age inconsistent_with_diagnosis OR
     utilization_spike_after_coverage_start OR
     duplicate_member_id_usage_different_locations:
    FLAG "Identity fraud - verify eligibility"

// Pharmacy abuse detection
FOR each pharmacy:
  dispense_patterns = CHECK(
    brand_vs_generic_ratio,
    specialty_drug_concentration,
    early_refill_frequency,
    off_label_billing
  )
  
  IF dispense_patterns indicate_systematic_overbilling:
    annual_overcharge = ESTIMATE_total_impact
    FLAG "Pharmacy investigation - recover"

// Clinical plausibility check
IF procedure NOT medically_necessary_for_diagnosis OR
   service_frequency exceeds_clinical_guidelines OR
   anatomically_impossible_claim:
  FLAG "Wasteful or fraudulent - deny/recover"`}
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
                <span><strong className="text-white">Provider Profiling:</strong> Peer comparison, billing pattern analysis, specialty-specific outlier detection</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Member Identity Verification:</strong> Biometric flags, eligibility cross-checks, usage pattern anomalies</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Clinical Plausibility Engine:</strong> Diagnosis-procedure matching, anatomical validation, guideline adherence</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">ML Anomaly Scoring:</strong> Supervised learning trained on confirmed fraud cases</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Detection Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Detection Rate" value="1-3%" gradient="from-red-600 to-orange-600" />
              <VegasMetricCard label="False Positive" value="<8%" gradient="from-orange-600 to-amber-600" />
              <VegasMetricCard label="Avg Time to Detect" value="7-14d" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Recovery Rate" value="65-85%" gradient="from-teal-600 to-cyan-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={ShieldAlert}
            title="Phantom Billing Ring"
            items={[
              "Engine flags provider billing 220 office visits/month",
              "Peer average: 85 visits/month for same specialty",
              "Cross-reference shows 40% of visits lack supporting documentation",
              "Investigation reveals $340K in phantom billing over 14 months",
              "Full recovery via provider settlement, contract termination"
            ]}
          />
          <VegasFeatureCard
            icon={Eye}
            title="Member Identity Fraud"
            items={[
              "ML flags member with sudden $78K utilization spike",
              "Pattern: maternity + NICU claims, member age 53, hysterectomy history",
              "Investigation: daughter using mother's insurance card",
              "Recovered $78K, terminated coverage, referred to law enforcement",
              "Engine identified 6 similar cases same year, $240K total recovery"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-crimson-600 to-rose-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-crimson-600 to-rose-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Paying for Fraud</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload your claims data. Our AI will flag suspicious patterns in under 24 hours. 
            See exactly where fraud, waste, and abuse are costing you money.
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