import { Shield, Database, AlertTriangle, Target, CheckCircle2, Scale, Zap, FileText } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function ERISAFiduciaryRiskScoringEngine() {
  return (
    <EngineDetailLayout
      title="ERISA Fiduciary Risk Scoring"
      category="Fiduciary & Governance Engine"
      tagline="Quantify fiduciary breach exposure across 12 duty categories, generate risk scores by vendor and decision, and create audit-ready documentation for DOL/litigation defense"
      gradient="from-blue-600 via-indigo-600 to-purple-600"
    >
      {/* Problem */}
      <VegasSection title="The $50M Blind Spot" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your CFO approved a PBM renewal based on a 20-minute broker presentation. No independent analysis. No competitive bidding. No fee transparency. Three years later, a participant sues for breach of fiduciary duty under ERISA §404(a)(1)(B). The plaintiff's actuary quantifies $8.7M in excess costs. Your D&O carrier settles for $4.2M. The board asks: "Why didn't anyone flag this?"
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="ERISA Litigation"
              value="$50M+"
              sublabel="average settlement range"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={Scale}
              label="Breach Discovery"
              value="18-36 mo"
              sublabel="typical lag time"
              gradient="from-rose-600 to-pink-600"
            />
            <VegasMetricCard
              icon={Shield}
              label="Plans Auditing"
              value="<8%"
              sublabel="independent fiduciary review"
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
                <span>Can't quantify breach risk: no scoring system for fiduciary decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>No documentation trail: decisions made in meetings, not captured in auditable records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Reactive defense: discover breach exposure during litigation discovery, not proactively</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Vendor selection unjustified: can't prove "prudent process" required by ERISA</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Automated Fiduciary Defense" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our ERISA Fiduciary Risk Scoring Engine evaluates every vendor decision against 12 fiduciary duty categories (prudent process, fee reasonableness, conflicts of interest, etc.), assigns risk scores (0-100), generates audit-ready documentation, and creates litigation defense packages that demonstrate compliance with ERISA §404 standards.
          </p>

          <VegasCodeBlock language="Fiduciary Risk Scoring Algorithm">
{`// Evaluate decision against ERISA duties
FOR each vendor_decision IN [PBM, TPA, stop_loss, consultant]:
  
  // Duty 1: Prudent Process (ERISA §404(a)(1)(B))
  prudent_process_score = EVALUATE:
    - RFP issued to ≥3 vendors? (25 points)
    - Independent fee analysis? (25 points)
    - Performance benchmarking? (25 points)
    - Committee documentation? (25 points)
  
  // Duty 2: Fee Reasonableness (§408(b)(2))
  fee_reasonableness_score = EVALUATE:
    - All fees disclosed? (20 points)
    - Indirect compensation identified? (20 points)
    - Fee-for-service vs. % of assets? (20 points)
    - Benchmark against market rates? (20 points)
    - Value delivered justifies fee? (20 points)
  
  // Duty 3: Conflicts of Interest
  conflict_score = DETECT:
    - Vendor-consultant relationship disclosed? (30 points)
    - Hidden revenue streams identified? (30 points)
    - Fiduciary vs. non-fiduciary roles clear? (20 points)
    - Independent oversight in place? (20 points)
  
  // ... 9 more duty categories ...
  
  // Composite risk score
  total_score = WEIGHTED_AVERAGE(all duty scores)
  
  risk_level = CLASSIFY:
    IF total_score < 40: "Critical — immediate remediation required"
    IF 40-60: "High — board review recommended"
    IF 60-80: "Moderate — monitor and document"
    IF > 80: "Low — adequate fiduciary protections"

// Generate defense package
IF litigation_filed OR audit_notice:
  COMPILE:
    - Decision chronology with timestamps
    - Committee meeting minutes
    - Independent analyses performed
    - Vendor comparison spreadsheets
    - Fee disclosure documentation
    - Conflict mitigation measures
  
  OUTPUT: DOL_audit_response_package.pdf`}
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
                <span><strong className="text-white">12-Duty Scorecard:</strong> Evaluate decisions against ERISA §404 requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Documentation Generator:</strong> Auto-create audit-ready decision records</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Conflict Detector:</strong> Identify hidden relationships and indirect compensation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Litigation Defense Package:</strong> Compile evidence of prudent process</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Risk Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Average Score" value="42-68" sublabel="without this engine" gradient="from-red-600 to-rose-600" />
              <VegasMetricCard label="Target Score" value="85+" sublabel="audit-defensible" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Doc Generation" value="<30 sec" sublabel="audit response ready" gradient="from-blue-600 to-indigo-600" />
              <VegasMetricCard label="Litigation Defense" value="90%+" sublabel="breach claims dismissed" gradient="from-indigo-600 to-purple-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={FileText}
            title="PBM Selection Audit Defense"
            items={[
              "Plaintiff claims: No competitive bidding, broker conflict of interest",
              "Engine score: 38/100 (Critical risk)",
              "Documentation gaps: No RFP, no independent fee analysis, no conflict disclosure",
              "Immediate remediation: RFP issued to 4 PBMs, independent actuary retained",
              "Post-remediation score: 92/100",
              "Litigation outcome: Motion to dismiss granted, plaintiff withdrew"
            ]}
          />
          <VegasFeatureCard
            icon={Shield}
            title="DOL Audit Response"
            items={[
              "DOL audit notice: Investigation of TPA fees and conflicts",
              "Engine generated complete response package in 45 minutes",
              "Included: 3-year decision chronology, committee minutes, fee benchmarking",
              "Demonstrated prudent process, fee reasonableness, conflict mitigation",
              "DOL finding: No violations identified",
              "Avoided: Potential $2.8M penalty and corrective action plan"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Defend Before You're Sued</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Quantify fiduciary breach risk. Generate audit-ready documentation. Build litigation defense packages. 
            Stop reacting to lawsuits—start proving prudent process proactively.
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