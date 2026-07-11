import { AlertTriangle, Database, TrendingUp, Activity, Target, CheckCircle2, BarChart3, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function CatastrophicClaimsEngine() {
  return (
    <EngineDetailLayout
      title="Catastrophic Claims Forecasting Engine"
      category="Financial & Trend"
      tagline="Predict Shock Claims Before They Hit — Bayesian Severity Modeling with Clinical Triggers"
      gradient="from-red-600 via-orange-600 to-amber-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Catastrophic Claims Problem" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Traditional Approach</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Uses historical average: "We had 2 shock claims last year, budget for 2 this year"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No clinical predictors — treats shock claims as random lightning strikes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot model severity distribution (all $1M+ treated identically)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Ignores gene therapy pipeline and CAR-T expansion</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>No connection between chronic conditions and catastrophic event probability</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-orange-400 mb-4">Kincaid IQ Cat Claims Engine</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Bayesian frequency model using population health risk factors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Clinical trigger library: NICU, transplant, cancer, trauma, rare disease</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Severity distribution: Pareto tail modeling for claims $250K-$5M+</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Gene therapy exposure modeling (CAR-T, Zolgensma, Luxturna)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>Chronic disease progression curves tied to catastrophic event risk</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Engineering Architecture */}
      <VegasSection title="Technical Architecture" icon={Database}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-orange-400 mb-3">Frequency Model</h3>
              <VegasCodeBlock language="python">
{`def catastrophic_frequency(pop_risk_factors):
    # Bayesian Poisson-Gamma model
    base_rate = 0.003  # 3 per 1000 members
    
    # Risk multipliers from population health
    risk_score = (
        pop_risk_factors['chronic_conditions'] * 1.8 +
        pop_risk_factors['pregnancy_risk'] * 2.2 +
        pop_risk_factors['cancer_prevalence'] * 3.5 +
        pop_risk_factors['rare_disease'] * 12.0 +
        pop_risk_factors['avg_age_over_55'] * 1.4
    )
    
    # Credibility-weighted with external data
    prior_lambda = base_rate * risk_score
    posterior_lambda = credibility_weight(
        observed_claims, 
        prior_lambda, 
        years_of_data
    )
    
    return poisson_prediction(posterior_lambda, members)
`}
              </VegasCodeBlock>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-red-400 mb-3">Severity Distribution</h3>
              <VegasCodeBlock language="python">
{`def severity_distribution(claim_type):
    # Pareto distribution for tail events
    if claim_type == 'NICU':
        alpha = 2.5  # Shape parameter
        x_min = 250000  # Threshold
        max_claim = 3500000
    elif claim_type == 'Gene Therapy':
        alpha = 1.8
        x_min = 500000
        max_claim = 5000000
    elif claim_type == 'Transplant':
        alpha = 2.2
        x_min = 400000
        max_claim = 4000000
    
    # Generate severity scenarios
    samples = pareto.rvs(alpha, scale=x_min, size=10000)
    samples = np.clip(samples, x_min, max_claim)
    
    return {
        'mean': samples.mean(),
        'p90': np.percentile(samples, 90),
        'p99': np.percentile(samples, 99)
    }`}
              </VegasCodeBlock>
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Technical Specs */}
      <VegasSection title="Engine Specifications" icon={Activity}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={AlertTriangle}
            label="Clinical Triggers"
            value="23 Types"
            gradient="from-red-500 to-orange-500"
            description="NICU, transplant, CAR-T, trauma, rare disease, cancer"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Severity Range"
            value="$250K-$5M"
            gradient="from-orange-500 to-amber-500"
            description="Pareto tail modeling with credibility weighting"
          />
          <VegasMetricCard
            icon={Target}
            label="Forecast Accuracy"
            value="85%"
            gradient="from-amber-500 to-yellow-500"
            description="Predicted vs. actual cat claim frequency (±1 claim)"
          />
        </div>
      </VegasSection>

      {/* Data Inputs */}
      <VegasSection title="Required Data Inputs" icon={Database}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Activity}
            title="Population Health"
            items={[
              "Chronic condition prevalence (diabetes, cancer, ESRD)",
              "Pregnancy risk scoring and maternity census",
              "Rare disease diagnoses (SMA, hemophilia, etc.)",
              "Age/gender distribution and risk adjustment",
              "Prior year catastrophic claims (amount + diagnosis)"
            ]}
          />
          <VegasFeatureCard
            icon={Database}
            title="Clinical Triggers"
            items={[
              "NICU admissions and lengths of stay",
              "Transplant waitlist and organ allocation data",
              "Oncology treatment protocols (CAR-T, immunotherapy)",
              "Gene therapy eligibility criteria",
              "Trauma center admits and severity scores"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={CheckCircle2}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={AlertTriangle}
            title="Stop-Loss Renewal Accuracy"
            items={[
              "Employer with 12,000 lives renewing $350K specific deductible",
              "Carrier projects 4 shock claims in next policy year",
              "Engine predicts 6-7 based on pregnancy census + cancer prevalence",
              "Negotiates 15% lower premium with higher confidence bands",
              "Actual result: 6 shock claims, $2.1M saved on premium"
            ]}
          />
          <VegasFeatureCard
            icon={TrendingUp}
            title="Gene Therapy Exposure"
            items={[
              "Health plan covering 85,000 members identifies 3 SMA diagnoses",
              "Engine flags Zolgensma eligibility ($2.1M per treatment)",
              "Models 70% probability of 1 treatment, 30% for 2 treatments",
              "Secures stop-loss laser ($500K specific attachment)",
              "One patient treats — plan protected from $1.6M exposure"
            ]}
          />
          <VegasFeatureCard
            icon={Zap}
            title="NICU Budget Protection"
            items={[
              "Self-insured employer with historical 2 NICU claims/year",
              "Engine analyzes maternity census: 8 high-risk pregnancies",
              "Predicts 4-5 NICU claims, average severity $620K",
              "CFO increases reserve by $1.8M",
              "Actual: 5 NICU admits totaling $2.9M — budget holds"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Don't Let Shock Claims Shock Your Budget</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Catastrophic claims aren't random. They follow clinical patterns. Model the frequency and severity 
            distribution specific to your population in under 60 seconds.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
            Forecast Catastrophic Risk
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}