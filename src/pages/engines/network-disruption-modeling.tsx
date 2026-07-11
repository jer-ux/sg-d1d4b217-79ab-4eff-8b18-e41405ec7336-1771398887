import { Network, Database, AlertTriangle, TrendingDown, CheckCircle2, Target, DollarSign, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function NetworkDisruptionModelingEngine() {
  return (
    <EngineDetailLayout
      title="Network Disruption Modeling"
      category="Healthcare Economics Engine"
      tagline="Model the financial impact of provider network changes, estimate member disruption costs, and optimize network strategy with multi-year cost projections"
      gradient="from-orange-600 via-red-600 to-pink-600"
    >
      {/* Problem */}
      <VegasSection title="The Provider Network Trap" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            HR leaders get blindsided when carriers announce network changes mid-year. No warning that 40% of your members' doctors are getting dropped. No cost impact analysis. No retention strategy. Just a 90-day notice and a member revolt.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={Network}
              label="Avg Network Change Impact"
              value="$1.2M"
              sublabel="per 1,000 covered lives"
              gradient="from-red-600 to-orange-600"
            />
            <VegasMetricCard
              icon={AlertTriangle}
              label="Member Disruption Rate"
              value="38%"
              sublabel="members lose providers annually"
              gradient="from-orange-600 to-amber-600"
            />
            <VegasMetricCard
              icon={TrendingDown}
              label="Satisfaction Drop"
              value="-42pts"
              sublabel="post-network disruption"
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
                <span>Network changes announced 60 days before effective date with zero impact analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Members discover their doctor is out-of-network during appointment check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Open enrollment decisions made without understanding network stability risk</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>CFO gets $800K surprise bill when members follow providers out-of-network</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="Intelligent Network Strategy" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Network Disruption Engine runs continuous provider stability analysis, member-provider relationship mapping, and multi-scenario cost modeling. You know exactly which network moves protect members AND reduce costs.
          </p>

          <VegasCodeBlock language="Network Impact Algorithm">
{`// Real-time network stability scoring
FOR each provider IN network:
  stability_score = CALCULATE(
    contract_expiration_proximity,
    historical_termination_rate,
    reimbursement_dispute_risk,
    member_attribution_density
  )
  
  IF stability_score < THRESHOLD:
    disruption_cost = SUM(
      member_count × avg_relationship_years × switching_cost,
      out_of_network_utilization_increase,
      member_satisfaction_impact
    )
    
    GENERATE alert_with_mitigation_options

// Proactive intervention
RECOMMEND:
  - Alternative network configurations
  - Member communication timing
  - Provider retention incentives
  - Risk-adjusted budget reserves`}
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
                <span><strong className="text-white">Provider Stability Matrix:</strong> Contract expiration tracking, termination risk scoring, reimbursement negotiation status</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Member Attribution Graph:</strong> Provider-member relationship mapping, continuity scoring, switching cost estimation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Alternative Network Optimizer:</strong> Scenario modeling for narrow networks, tiered networks, reference-based pricing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Disruption Cost Forecaster:</strong> Multi-year impact projection with member satisfaction modeling</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Network Stability Score" value="0-100" gradient="from-purple-600 to-pink-600" />
              <VegasMetricCard label="Provider Risk Tiers" value="5 Levels" gradient="from-pink-600 to-red-600" />
              <VegasMetricCard label="Member Disruption %" value="Real-time" gradient="from-red-600 to-orange-600" />
              <VegasMetricCard label="Switching Cost/Member" value="$-$$$$" gradient="from-orange-600 to-amber-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Network}
            title="Pre-Renewal Network Analysis"
            items={[
              "Insurer announces 15% provider network reduction",
              "Engine maps 2,400 members to affected providers",
              "Estimates $940K disruption cost + satisfaction impact",
              "CFO negotiates network protection clause worth $1.1M",
              "Alternative: switches to broader network, saves $780K"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="Strategic Network Design"
            items={[
              "Company considering narrow network to cut 18% cost",
              "Engine models member disruption across 3 scenarios",
              "Identifies 340 high-value provider relationships",
              "Designs hybrid network: 12% cost reduction, 4% disruption",
              "Implements in 6 months with 91% member satisfaction"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Network Surprises</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Know which providers are at risk 12 months before your carrier sends the termination notice. 
            Model every network scenario before you sign the contract.
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