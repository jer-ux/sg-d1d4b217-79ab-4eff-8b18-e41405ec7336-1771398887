import { Dices, Database, Target, TrendingUp, AlertTriangle, CheckCircle2, BarChart3, Activity, Cpu, LineChart, Shield } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function MonteCarloForecastingEngine() {
  return (
    <EngineDetailLayout
      title="Monte Carlo Forecasting"
      category="Financial & Trend Engine"
      icon={Dices}
      description="Run 10,000+ stochastic simulations to generate probability distributions for future healthcare costs, explicitly modeling tail risk and extreme events."
    >
      {/* Problem Statement */}
      <VegasSection title="The Illusion of the Single-Point Estimate" gradient="from-indigo-500/10 to-blue-500/10">
        <div className="space-y-6">
          <div className="bg-indigo-900/20 border-l-4 border-indigo-500 p-6 rounded-r-xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-indigo-300 mb-3">Deterministic Forecasts Hide Extreme Risk</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  Most actuaries deliver a single "expected cost" projection. But healthcare isn't a normal distribution—it has massive, fat tails. 
                  A 5% chance of a catastrophic NICU stay isn't reflected in the average. When that 5% event happens, the CFO's budget is destroyed.
                </p>
                <p className="text-indigo-300 font-bold text-lg">
                  If you only budget to the mean, you will be underfunded 50% of the time. You need to know the shape of the curve, not just its center.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/60 border border-red-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Deterministic Flaws
              </h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Ignores the compounding effect of multiple adverse events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Stop-loss premiums are priced blindly without understanding tail severity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Cannot answer "What is our 95% worst-case scenario?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">×</span>
                  <span>Reserves are set via heuristics, leading to trapped capital</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 border border-emerald-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Stochastic Intelligence
              </h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Cost output is a full probability distribution (P10 to P99)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Value-at-Risk (VaR) mathematically quantifies balance sheet exposure</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Optimizes stop-loss attachment points using true risk probabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Frees trapped capital by calculating exact reserve adequacy needs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Engineering Architecture */}
      <VegasSection title="Simulation Architecture" gradient="from-blue-500/10 to-cyan-500/10">
        <div className="space-y-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <VegasMetricCard label="Simulations" value="10,000+" sublabel="Standard execution depth" />
            <VegasMetricCard label="Distributions" value="Lognormal" sublabel="Cost severity modeling" />
            <VegasMetricCard label="Copulas" value="Gaussian" sublabel="Variable correlation" />
            <VegasMetricCard label="Latency" value="< 45s" sublabel="Full VaR generation" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">The Stochastic Pipeline</h3>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Stage 1: Empirical Distribution Fitting</h4>
                        <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300 font-mono">PARAMETERIZATION</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        We don't use standard normal distributions. The engine fits lognormal and Gamma distributions to your historical claim severity, 
                        and Poisson distributions to your claim frequency. We fit these separately for specific cohorts (e.g., active vs. retirees, medical vs. Rx).
                      </p>
                      <VegasCodeBlock>{`# Distribution Fitting
def fit_claim_severity(claims_array):
    # Lognormal fit for long-tail severity
    shape, loc, scale = scipy.stats.lognorm.fit(claims_array, floc=0)
    return {"mu": np.log(scale), "sigma": shape}

def fit_claim_frequency(member_months, claims_count):
    # Poisson fit for frequency
    lambda_param = claims_count / (member_months / 12)
    return {"lambda": lambda_param}`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-cyan-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Stage 2: Copula-based Correlation Matrix</h4>
                        <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-300 font-mono">DEPENDENCIES</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        Healthcare costs aren't independent. An increase in inpatient utilization correlates with an increase in specialty Rx spend. 
                        The engine uses Gaussian copulas to preserve these real-world correlations during the simulation, preventing unrealistic "perfect storm" combinations while still capturing valid compound risks.
                      </p>
                      <VegasCodeBlock>{`# Correlation injection via Cholesky decomposition
covariance_matrix = build_historical_cov_matrix(medical_trend, rx_trend, utilization_rates)
L = np.linalg.cholesky(covariance_matrix)

# Generate correlated standard normal variables
Z = np.random.normal(0, 1, size=(num_variables, num_simulations))
correlated_Z = np.dot(L, Z)`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Dices className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Stage 3: Vectorized Simulation Engine</h4>
                        <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 font-mono">EXECUTION</span>
                      </div>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        We execute 10,000 to 50,000 iterations using vectorized NumPy operations. Each "path" represents a valid future reality for the entire population over the next 12 months, calculating total gross claims, stop-loss reimbursements, and net plan liability.
                      </p>
                      <VegasCodeBlock>{`# Vectorized Execution (10,000 paths)
simulated_gross_claims = np.zeros(10000)

for path in range(10000):
    # Draw frequency and severity for this universe
    num_claims = np.random.poisson(fitted_lambda)
    claim_amounts = np.random.lognormal(fitted_mu, fitted_sigma, num_claims)
    
    # Apply Stop-Loss Logic
    reimbursed = np.maximum(0, claim_amounts - specific_deductible)
    net_claims = claim_amounts - reimbursed
    
    simulated_gross_claims[path] = np.sum(net_claims)
    
# Output distribution array ready for percentile extraction`}</VegasCodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Outputs & Metrics */}
      <VegasSection title="Strategic Output Layer" gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/80 text-lg leading-relaxed">
            The raw array of 10,000 possible futures is distilled into actionable board-level metrics. We translate stochastic math into CFO terminology: Budget targets, Value at Risk, and capital efficiency.
          </p>
          
          <VegasFeatureGrid>
            <VegasFeatureCard
              icon={Target}
              title="Confidence Intervals"
              description="P50 (Median expected), P75 (Conservative budget target), P95 (Worst case scenario)."
            />
            <VegasFeatureCard
              icon={Shield}
              title="Value at Risk (VaR)"
              description="Quantifies the maximum expected loss at a given confidence level. 'We are 95% confident costs will not exceed $X.'"
            />
            <VegasFeatureCard
              icon={LineChart}
              title="Stop-Loss Frontier"
              description="Plots specific deductible levels against total cost VaR to mathematically prove the optimal attachment point."
            />
            <VegasFeatureCard
              icon={Activity}
              title="Conditional Tail Expectation"
              description="Also known as Expected Shortfall. 'IF we breach the 95th percentile, what is the average severity of that disaster?'"
            />
          </VegasFeatureGrid>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Financial Deployments" gradient="from-orange-500/10 to-red-500/10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-orange-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-orange-400 mb-2">Stop-Loss Optimization</div>
              <div className="text-2xl font-black text-white mb-3">$450K Premium Saved</div>
              <p className="text-white/70 text-sm leading-relaxed">
                Broker advised lowering the specific deductible to $150K due to two large claims last year. The Monte Carlo simulation proved that the risk of breaching a $250K deductible did not justify the $450K premium increase. The CFO absorbed the volatility risk, backed by stochastic evidence, saving $450K.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-indigo-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-indigo-400 mb-2">Captive Feasibility</div>
              <div className="text-2xl font-black text-white mb-3">Capital Free</div>
              <p className="text-white/70 text-sm leading-relaxed">
                A mid-market employer consortium evaluating a group captive needed to determine exact reserve requirements. Deterministic models suggested holding $3M in trapped capital. The Monte Carlo engine established a 99% VaR requiring only $1.8M in collateral, instantly improving the ROI of the captive structure.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-black/70 border border-teal-500/30 rounded-xl p-6">
              <div className="text-sm font-bold text-teal-400 mb-2">Board Defensibility</div>
              <div className="text-2xl font-black text-white mb-3">Budget Approved</div>
              <p className="text-white/70 text-sm leading-relaxed">
                A CFO faced board pushback on a 9% healthcare budget increase. She presented the engine's Probability Density Function chart, showing the 9% increase aligned precisely with the P70 confidence interval, shifting the conversation from "why is this so high" to a logical discussion on enterprise risk tolerance.
              </p>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Stop Budgeting to the Average</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Protect your balance sheet. Run 10,000 realities against your population data and know exactly what your tail risk looks like.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-indigo-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105">
            Run a Simulation
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}