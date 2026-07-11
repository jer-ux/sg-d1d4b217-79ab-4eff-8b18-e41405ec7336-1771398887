import { Users, Database, Target, TrendingUp, CheckCircle2, AlertTriangle, Zap, FileText } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function BoardReportingEngineComponent() {
  return (
    <EngineDetailLayout
      title="Board Reporting Engine"
      category="Fiduciary & Governance Engine"
      tagline="Generate executive board reports with fiduciary risk scoring, vendor performance benchmarking, cost trend attribution, and ERISA compliance dashboards tailored for non-expert directors"
      gradient="from-slate-600 via-gray-600 to-zinc-600"
    >
      {/* Problem */}
      <VegasSection title="The 47-Slide Snoozefest" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Your broker presents the annual benefits review to the board. 47 slides of carrier jargon, utilization charts with no context, renewal rates with no benchmarking, and a recommendation to "stay the course." Directors ask: "Are we paying fair prices? Is our broker conflicted? What's our fiduciary exposure?" Broker deflects: "Industry standard." Board approves by default—they can't challenge what they don't understand. Two years later, a lawsuit alleges excessive fees. Directors: "We relied on our advisor." Plaintiff's expert: "No prudent fiduciary would accept those terms."
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={AlertTriangle}
              label="Board Breaches"
              value="$180M+"
              sublabel="2023 ERISA settlement total"
              gradient="from-orange-600 to-red-600"
            />
            <VegasMetricCard
              icon={Users}
              label="Director Literacy"
              value="<18%"
              sublabel="understand healthcare financials"
              gradient="from-red-600 to-rose-600"
            />
            <VegasMetricCard
              icon={FileText}
              label="Useful Board Decks"
              value="<9%"
              sublabel="enable informed oversight"
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
                <span>Broker-controlled narrative: vendors present only favorable metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>No independent benchmarking: can't verify "industry standard" claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Fiduciary risk invisible: board unaware of ERISA exposure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Jargon overload: non-expert directors can't assess quality</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="8-Page Executive Briefing" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Board Reporting Engine generates distilled executive briefings with plain-English summaries, independent benchmarking vs. top-quartile plans, fiduciary risk heatmaps, vendor performance scorecards, cost trend drivers with attribution, and specific board action recommendations—8 pages, zero jargon, decision-ready.
          </p>

          <VegasCodeBlock language="Board Report Generation Algorithm">
{`// Executive board report structure
REPORT_SECTIONS = [
  executive_summary,
  fiduciary_risk_dashboard,
  vendor_performance_scorecard,
  cost_trend_attribution,
  benchmark_comparison,
  action_recommendations
]

// Section 1: Executive Summary (1 page)
GENERATE executive_summary:
  - Plan health score (0-100)
  - Year-over-year cost trend
  - Top 3 risks
  - Top 3 opportunities
  - Recommended board actions (3-5 items)

// Section 2: Fiduciary Risk Dashboard (1 page)
CALCULATE fiduciary_risk:
  erisa_compliance_score = AUDIT_readiness_engine()
  vendor_fee_transparency = FEE_disclosure_analysis()
  prudent_process_documentation = PROCESS_scoring()
  conflict_of_interest_exposure = COI_detection()
  
  risk_heatmap = VISUALIZE:
    - High risk (red): score < 60
    - Medium risk (yellow): 60-80
    - Low risk (green): > 80
  
  OUTPUT:
    "Fiduciary risk score: 73/100 (Moderate Risk)
     Key exposure: PBM contract lacks rebate transparency (42/100)
     Recommendation: Require §408(b)(2) compliant disclosure by Q2"

// Section 3: Vendor Performance (1.5 pages)
FOR each vendor IN [broker, PBM, TPA, stop_loss]:
  SCORE across dimensions:
    - Cost competitiveness vs. benchmark
    - Service quality (claims accuracy, turnaround time)
    - Fee transparency (disclosed vs. actual compensation)
    - Contract favorability (client protections)
  
  overall_score = WEIGHTED_AVERAGE(dimensions)
  
  IF overall_score < 70:
    FLAG "Underperforming vendor — RFP recommended"

// Section 4: Cost Trend Attribution (1.5 pages)
DECOMPOSE cost_trend INTO:
  - Unit cost inflation (provider contracts): 42%
  - Utilization increase (member behavior): 28%
  - Mix shift (specialty drug growth): 18%
  - Population risk (aging, morbidity): 12%

COMPARE TO:
  - Carrier's stated "trend factor"
  - Independent actuarial forecast
  - Peer plan benchmarks

EXPLAIN deviations IN plain_language

// Section 5: Benchmark Comparison (2 pages)
COMPARE plan TO top_quartile_peers ON:
  - Total cost PMPM
  - Admin fees as % of claims
  - PBM spread pricing
  - Stop-loss margin
  - Network discounts
  
  FOR each metric:
    IF plan > peer_75th_percentile:
      FLAG "Above-market cost — investigate"

// Section 6: Action Recommendations (1 page)
PRIORITIZE board_actions BY:
  - Impact (cost savings or risk reduction)
  - Urgency (regulatory deadline, contract renewal)
  - Feasibility (board authority, vendor cooperation)

FORMAT AS:
  "Recommendation 1: Issue RFP for PBM services
   Rationale: Current spread pricing 2.4x market rate
   Expected savings: $1.8-2.4M annually
   Timeline: Complete by Q3 for 1/1 renewal
   Board vote required: Yes"`}
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
                <span><strong className="text-white">Plain-English Translator:</strong> Convert actuarial jargon to board-level language</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Independent Benchmarker:</strong> Compare to top-quartile plans, not broker's book</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Fiduciary Risk Scorer:</strong> Quantify ERISA exposure for non-expert directors</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Action Prioritizer:</strong> Rank recommendations by impact, urgency, feasibility</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Report Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Report Length" value="8 pages" sublabel="vs. broker's 47-slide deck" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Director Comprehension" value="94%" sublabel="understand key risks" gradient="from-teal-600 to-cyan-600" />
              <VegasMetricCard label="Prep Time" value="<3 hours" sublabel="automated generation" gradient="from-cyan-600 to-blue-600" />
              <VegasMetricCard label="Action Rate" value="87%" sublabel="recommendations adopted" gradient="from-blue-600 to-indigo-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Users}
            title="Vendor RFP Approval"
            items={[
              "Board received 8-page briefing vs. broker's 47 slides",
              "Plain-English summary: 'PBM spread pricing 2.4x market'",
              "Independent benchmark: Plan at 88th percentile cost",
              "Fiduciary risk score: 42/100 on PBM contract",
              "Recommendation: Issue RFP, expected $2.1M savings",
              "Board vote: Unanimous approval in 12 minutes"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Litigation Defense"
            items={[
              "ERISA lawsuit alleged board failed fiduciary duty",
              "Plaintiff claimed board rubber-stamped broker advice",
              "Defense: Produced quarterly board reports showing independent analysis",
              "Reports documented: benchmarking, RFPs, fee negotiations",
              "Expert witness: 'Board exercised prudent oversight'",
              "Case dismissed at summary judgment, $0 settlement"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Empower Your Board</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate plain-English board reports with independent benchmarking, fiduciary risk scoring, and 
            specific action recommendations. Turn your board from rubber-stamp to strategic oversight.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-gray-700 px-10 py-5 rounded-xl font-black text-lg hover:bg-gray-50 transition-all duration-200 shadow-2xl hover:shadow-gray-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}