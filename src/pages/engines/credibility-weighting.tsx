import { Target, Database, TrendingUp, BarChart3, AlertTriangle, CheckCircle2, Zap, Scale } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function CredibilityWeightingEngine() {
  return (
    <EngineDetailLayout
      title="Credibility Weighting Engine"
      category="Financial & Trend"
      tagline="Blend Your Small-Group Experience with Industry Benchmarks—Know When Your Data is Too Thin to Trust"
      gradient="from-amber-600 via-orange-600 to-red-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Small Sample Problem" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">100% Own-Experience Reliance</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>125-employee group: one $800K cancer claim = 25% PMPM spike (statistical noise)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Small groups: random variation dominates true trend signal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot distinguish luck (no large claims) from good management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Renewal pricing volatile: 8% trend one year, 18% next (same population)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-amber-400 mb-4">Credibility Weighting</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Actuarial credibility: "125 lives = 22% credible, blend 78% industry benchmark"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Statistical stability: smooth random noise, preserve real signals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Fair attribution: large claim luck vs. chronic disease management effectiveness</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Stable forecasts: credibility-weighted trend converges to predictable renewal</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Actuarial Credibility Formula" icon={Scale}>
        <VegasCodeBlock language="python">
{`# Limited Fluctuation Credibility (Bühlmann-Straub)
import math

def calculate_credibility_factor(exposure, expected_claims=1082, k=1000):
    """
    Calculate credibility Z based on exposure size
    
    exposure: Number of member-months
    expected_claims: Expected number of claims
    k: Full credibility standard (typically 1,000 - 1,500 claims)
    """
    # Square root rule for partial credibility
    if exposure < 12:  # Less than 1 year
        return 0.0
    
    z = math.sqrt(expected_claims / k)
    
    # Cap at 1.0 (full credibility)
    return min(z, 1.0)

def credibility_weighted_estimate(own_experience, benchmark, credibility_z):
    """
    Blend own experience with industry benchmark
    """
    weighted_estimate = (credibility_z * own_experience) + 
                        ((1 - credibility_z) * benchmark)
    
    return {
        'own_experience': own_experience,
        'benchmark': benchmark,
        'credibility_factor': credibility_z,
        'weighted_estimate': weighted_estimate,
        'own_weight_pct': credibility_z * 100,
        'benchmark_weight_pct': (1 - credibility_z) * 100
    }

# Credibility by Group Size
# (Assuming 1.2 claims PMPM avg)

# 50 lives (600 member-months/year):
#   Expected claims: 720
#   Credibility: sqrt(720/1082) = 81.5% → 0.815
#   Estimate: 81.5% own + 18.5% benchmark

# 125 lives (1,500 member-months):
#   Expected claims: 1,800
#   Credibility: sqrt(1800/1082) = 129% → capped at 1.00 (full credibility)
#   Estimate: 100% own experience

# 25 lives (300 member-months):
#   Expected claims: 360
#   Credibility: sqrt(360/1082) = 57.7% → 0.577
#   Estimate: 57.7% own + 42.3% benchmark

# Example Application:
# 75-life group (900 member-months)
#   - Own PMPM: $1,450 (one large claim spike)
#   - Industry benchmark: $950
#   - Credibility: sqrt(1080/1082) = 99.9% ≈ 1.00
#   - Weighted: (1.00 × $1,450) + (0.00 × $950) = $1,450
#
# BUT if we use Large Claim Pooling:
#   - Remove claims >$100K, recalculate
#   - Own PMPM (pooled): $875
#   - Credibility on pooled: 1.00
#   - Weighted: $875 (the volatile spike is removed)
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Statistical Stability" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Database}
            label="Full Credibility Threshold"
            value="1,000+ Lives"
            gradient="from-amber-500 to-orange-500"
            description="Groups above this size: 100% own experience weight"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Partial Credibility Range"
            value="50-999 Lives"
            gradient="from-orange-500 to-red-500"
            description="Blended weighting: 22% to 95% own experience"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Forecast Stability"
            value="+42%"
            gradient="from-red-500 to-rose-500"
            description="Credibility models reduce renewal volatility"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Stable Trend Estimation" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Small Group Volatility Smoothing"
            items={[
              "85-employee group: $1,580 PMPM (includes $650K cancer case)",
              "Remove large claim: $920 PMPM base",
              "Benchmark: $965 PMPM for similar industry/region",
              "Credibility: 88%",
              "Weighted estimate: (0.88 × $920) + (0.12 × $965) = $926",
              "Renewal based on $926, not $1,580 (stable pricing)"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Year-to-Year Trend Stability"
            items={[
              "2023: 110 employees, $1,120 PMPM (low year, no large claims)",
              "2024: 115 employees, $1,380 PMPM (2 large claims)",
              "Raw YoY: +23.2% (looks like disaster)",
              "Credibility-weighted: both years blend with $985 benchmark",
              "2023 weighted: $1,048, 2024 weighted: $1,142",
              "True trend: +9.0% (more realistic for pricing/budgeting)"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Self-Funded Group Confidence"
            items={[
              "450-employee group considering self-funding",
              "Carrier renewal: +14% (one bad year spike)",
              "Credibility analysis: 98% own experience weight",
              "Weighted trend: +11.2% (less volatile)",
              "Self-funded specific excess: $200K attachment",
              "Predicted PMPM range with 90% confidence: $1,050-$1,180",
              "CFO approved self-funding with credible forecasts"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Know When Your Data is Too Small to Trust</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Apply actuarial credibility theory to small groups. Blend your experience with industry benchmarks. 
            Smooth random noise, preserve real signals, forecast with confidence.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
            Apply Credibility Theory
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}