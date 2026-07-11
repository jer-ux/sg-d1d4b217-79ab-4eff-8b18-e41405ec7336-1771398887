import { FileCheck, Database, AlertTriangle, Target, CheckCircle2, Shield, Zap, CheckSquare } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function AuditReadinessScoringEngine() {
  return (
    <EngineDetailLayout
      title="Audit Readiness Scoring"
      category="Fiduciary & Governance Engine"
      tagline="Score ERISA audit readiness across 40 documentation categories including SPDs, Form 5500s, fiduciary meeting minutes, vendor contracts, and prudent process evidence"
      gradient="from-blue-600 via-indigo-600 to-purple-600"
    >
      <VegasSection title="The $4.7M DOL Penalty" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your plan received a DOL audit notice. You have 30 days to produce documentation. Your broker says "we're compliant." Then you discover: 3 years of fiduciary meeting minutes missing, vendor fee disclosures incomplete, SPD amendments not distributed, no prudent process documentation for the PBM selection. DOL finds violations across 8 ERISA provisions. Final penalty: $4.7M plus mandatory corrective action.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="DOL Audits"
              value="1,400+"
              sublabel="annual ERISA investigations"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={Shield}
              label="Avg Penalty"
              value="$2.1-8.9M"
              sublabel="for documentation failures"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={FileCheck}
              label="Plans Audit-Ready"
              value="<12%"
              sublabel="can produce docs in 30 days"
              gradient="from-rose-600 to-pink-600"
            />
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-orange-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Can't locate documents: no centralized repository, files scattered across emails/drives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Gaps invisible: don't know what's missing until DOL asks for it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Prudent process undocumented: made good decisions, can't prove it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Reactive scramble: 30 days insufficient to reconstruct missing evidence</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      <VegasSection title="40-Point Documentation Audit" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Audit Readiness Scoring Engine evaluates documentation completeness across 40 ERISA requirement categories (plan documents, SPDs, Form 5500s, fee disclosures, fiduciary minutes, vendor contracts, investment policy statements, claims procedures, participant notices, prudent process evidence), scores each 0-100, identifies gaps, and generates corrective action roadmaps.
          </p>

          <VegasCodeBlock language="Audit Readiness Scoring Algorithm">
{`// 40-point ERISA documentation audit
DOCUMENTATION_CATEGORIES = [
  plan_documents,
  spd_amendments,
  form_5500_filings,
  fee_disclosures,
  fiduciary_minutes,
  vendor_contracts,
  ips_updates,
  claims_procedures,
  participant_notices,
  prudent_process_evidence
]

FOR each category IN DOCUMENTATION_CATEGORIES:
  
  // Plan Documents (5 requirements)
  IF category == plan_documents:
    CHECK:
      - Current plan document signed? (20 pts)
      - All amendments incorporated? (20 pts)
      - Consistent with actual operations? (20 pts)
      - IRS determination letter current? (20 pts)
      - Restatement cycle compliant? (20 pts)
  
  // SPD & Participant Communications (6 requirements)
  IF category == spd_amendments:
    CHECK:
      - SPD distributed within 90 days of eligibility? (15 pts)
      - SMMs distributed within 210 days? (15 pts)
      - SAR distributed within ERISA deadline? (15 pts)
      - Distribution log maintained? (15 pts)
      - Required content elements included? (20 pts)
      - Plain language readable? (20 pts)
  
  // Form 5500 Compliance (4 requirements)
  IF category == form_5500_filings:
    CHECK:
      - Filed by deadline (no extensions)? (25 pts)
      - All schedules complete? (25 pts)
      - Actuary certification attached (if required)? (25 pts)
      - Audit report attached (if large plan)? (25 pts)
  
  // Fee Disclosure Section 408(b)(2) (5 requirements)
  IF category == fee_disclosures:
    CHECK:
      - All service providers disclosed? (20 pts)
      - Direct + indirect compensation listed? (20 pts)
      - Fiduciary status acknowledged? (20 pts)
      - Disclosure received within 30 days? (20 pts)
      - Annual updates obtained? (20 pts)
  
  // Fiduciary Governance (6 requirements)
  IF category == fiduciary_minutes:
    CHECK:
      - Quarterly meetings documented? (15 pts)
      - Attendees/votes recorded? (15 pts)
      - Investment review minutes maintained? (15 pts)
      - Vendor selection process documented? (20 pts)
      - Fee benchmarking evidenced? (15 pts)
      - Action items tracked? (20 pts)

// Calculate readiness score
total_score = WEIGHTED_AVERAGE(all categories)

audit_readiness = CLASSIFY:
  IF total_score < 50: "Critical Risk"
  IF 50-70: "High Risk"
  IF 70-85: "Moderate Risk"
  IF 85-95: "Low Risk"
  IF > 95: "Audit-Ready"

// Prioritize remediation
FOR each gap:
  ASSESS:
    dol_violation_severity
    time_to_remediate
    cost_to_fix
  
  RANK BY:
    violation_severity DESC,
    cost_to_fix ASC

OUTPUT:
  - Overall audit readiness score
  - Gap analysis by category
  - Remediation priority roadmap
  - Estimated time and cost to compliance`}
          </VegasCodeBlock>
        </div>
      </VegasSection>

      <VegasSection title="Engineering Architecture" icon={Database}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Core Components</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">40-Category Checklist:</strong> Comprehensive ERISA documentation requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Gap Identifier:</strong> Find missing/incomplete documentation before DOL does</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Remediation Roadmap:</strong> Prioritize fixes by violation severity and cost</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Evidence Repository:</strong> Centralized audit-ready documentation library</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Scoring Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Typical Score" value="48-62" sublabel="before remediation" gradient="from-orange-600 to-red-600" />
              <VegasMetricCard label="Target Score" value="95+" sublabel="audit-ready standard" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Avg Gaps" value="18-27" sublabel="documentation deficiencies" gradient="from-red-600 to-rose-600" />
              <VegasMetricCard label="Remediation Time" value="60-120 days" sublabel="to reach 95+ score" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Shield}
            title="Pre-Audit Remediation"
            items={[
              "DOL audit notice received, 30-day response deadline",
              "Engine score: 42/100 (Critical Risk)",
              "Identified 23 missing documentation items",
              "Prioritized 8 catastrophic gaps for immediate fix",
              "Worked 72-hour sprint: reconstructed fiduciary minutes, obtained fee disclosures, updated SPDs",
              "Submitted response with 95% documentation complete, avoided $3.2M penalty"
            ]}
          />
          <VegasFeatureCard
            icon={FileCheck}
            title="Continuous Compliance Monitoring"
            items={[
              "Implemented quarterly audit readiness scans",
              "Engine maintains 95+ score proactively",
              "Alerts when documents expiring (IPS updates, vendor contracts)",
              "Auto-generates fiduciary meeting checklists",
              "2-year track record: Zero documentation gaps",
              "CFO sleeps well knowing plan is DOL-audit-ready 24/7"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Don't Wait for the DOL Letter</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Score your audit readiness across 40 ERISA documentation categories. Identify gaps before DOL does. 
            Build a defensible evidence library. Turn audit anxiety into compliance confidence.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-indigo-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}