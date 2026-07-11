import { Calendar, Database, TrendingUp, BarChart3, AlertTriangle, CheckCircle2, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function SeasonalityAdjustmentEngine() {
  return (
    <EngineDetailLayout
      title="Seasonality Adjustment Engine"
      category="Financial & Trend"
      tagline="Remove Monthly/Quarterly Cost Patterns—Isolate True Trend from Predictable Calendar Effects"
      gradient="from-blue-600 via-indigo-600 to-purple-600"
    >
      {/* Problem Statement */}
      <VegasSection title="The Calendar Noise Problem" icon={AlertTriangle}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black text-red-400 mb-4">Raw Month-to-Month Comparisons</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>"Q1 claims are always 15% higher than Q3" — deductible resets vs. summer lull</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cannot distinguish seasonal pattern from real trend shifts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Holiday impacts (elective procedures deferred in Dec, flu season spikes)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span>Business days per month vary (20-23 days) affecting outpatient volumes</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black text-blue-400 mb-4">Seasonality Adjustment</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Monthly index factors: Jan 1.12x, Aug 0.91x (remove predictable patterns)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Clean trend analysis: compare seasonally-adjusted values only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Deductible reset modeling: isolate Q1 high-acuity case front-loading</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Business day normalization: PMPM per business day removes calendar artifacts</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Technical Architecture */}
      <VegasSection title="Seasonal Decomposition Model" icon={Calendar}>
        <VegasCodeBlock language="python">
{`# Seasonal Adjustment Framework
monthly_seasonal_factors = {
    'January': 1.12,    # Deductible reset, elective procedures scheduled
    'February': 1.08,   # Continued deductible optimization
    'March': 1.05,      # Deductible satisfied, utilization normalizing
    'April': 0.98,      # Spring lull
    'May': 0.95,        # Pre-summer drop
    'June': 0.94,       # Summer vacation begins
    'July': 0.92,       # Peak vacation season
    'August': 0.91,     # Continued summer lull
    'September': 1.02,  # Back-to-school checkups
    'October': 1.04,    # Flu season begins
    'November': 0.97,   # Holiday deferrals begin
    'December': 0.93    # Year-end holidays, elective procedures deferred
}

def seasonally_adjust_costs(monthly_claims):
    """
    Remove seasonal patterns to expose true underlying trend
    """
    adjusted_claims = []
    
    for month_data in monthly_claims:
        month_name = month_data.month
        actual_pmpm = month_data.total_claims / month_data.member_months
        
        # Remove seasonal effect
        seasonal_factor = monthly_seasonal_factors[month_name]
        adjusted_pmpm = actual_pmpm / seasonal_factor
        
        adjusted_claims.append({
            'month': month_name,
            'actual_pmpm': actual_pmpm,
            'seasonal_factor': seasonal_factor,
            'seasonally_adjusted_pmpm': adjusted_pmpm
        })
    
    return adjusted_claims

def calculate_deseasonalized_trend(current_period, prior_period):
    """
    Compare same months year-over-year OR use seasonally-adjusted values
    """
    # Method 1: Year-over-year (natural deseasonalization)
    yoy_trend = (current_period.pmpm / prior_period.pmpm) - 1
    
    # Method 2: Seasonally-adjusted month-to-month
    current_adjusted = current_period.pmpm / monthly_seasonal_factors[current_period.month]
    prior_adjusted = prior_period.pmpm / monthly_seasonal_factors[prior_period.month]
    mom_trend = (current_adjusted / prior_adjusted) - 1
    
    return {
        'yoy_trend': yoy_trend,
        'mom_seasonally_adjusted': mom_trend
    }

# Example: Q1 vs. Q3 Comparison
# Q1 Actual: $1,085 PMPM (Jan 1.12x, Feb 1.08x, Mar 1.05x avg = 1.083x)
# Q1 Adjusted: $1,002 ($1,085 / 1.083)
#
# Q3 Actual: $945 PMPM (Jul 0.92x, Aug 0.91x, Sep 1.02x avg = 0.950x)
# Q3 Adjusted: $995 ($945 / 0.950)
#
# Without adjustment: looks like 14.8% decline (panic!)
# With adjustment: actually 0.7% improvement (normal variance)
`}
        </VegasCodeBlock>
      </VegasSection>

      {/* Metrics */}
      <VegasSection title="Calendar Intelligence" icon={Target}>
        <div className="grid md:grid-cols-3 gap-6">
          <VegasMetricCard
            icon={Calendar}
            label="Seasonal Range"
            value="0.91x to 1.12x"
            gradient="from-blue-500 to-indigo-500"
            description="August (lowest) to January (highest) pattern"
          />
          <VegasMetricCard
            icon={TrendingUp}
            label="Adjustment Precision"
            value="±4% PMPM"
            gradient="from-indigo-500 to-purple-500"
            description="Removes monthly noise from trend analysis"
          />
          <VegasMetricCard
            icon={CheckCircle2}
            label="Forecast Accuracy"
            value="+35%"
            gradient="from-purple-500 to-violet-500"
            description="Seasonal models improve budget predictions"
          />
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Clean Trend Analysis" icon={Zap}>
        <VegasFeatureGrid>
          <VegasFeatureCard
            icon={Target}
            title="Deductible Reset Impact"
            items={[
              "January PMPM: $1,250 (12% above annual avg)",
              "High-cost electives scheduled early (ortho, cardio)",
              "Seasonally adjusted: $1,116 (true underlying rate)",
              "Without adjustment: Jan looks like anomaly requiring investigation",
              "With adjustment: recognized as predictable deductible optimization"
            ]}
          />
          <VegasFeatureCard
            icon={BarChart3}
            title="Monthly Variance Explanation"
            items={[
              "CFO sees July PMPM $890, Aug PMPM $865 (-2.8% drop)",
              "Board asks: 'What changed? New program working?'",
              "Seasonal analysis: July 0.92x, Aug 0.91x factors",
              "Adjusted: July $967, Aug $950 (-1.8% = normal variance)",
              "Answer: summer vacation pattern, not program impact"
            ]}
          />
          <VegasFeatureCard
            icon={CheckCircle2}
            title="Budget Forecasting"
            items={[
              "Prior model: flat $950 PMPM x 12 months = $11.4M budget",
              "Actual experience: wildly over/under by month",
              "Seasonal model: $950 avg x monthly factors",
              "New budget: Jan $1,064, Aug $865, total $11.4M",
              "Monthly variance reduced from ±18% to ±6%"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Remove Calendar Noise from Your Trend</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Adjust for predictable monthly patterns. Compare apples-to-apples across quarters. 
            Budget with seasonal intelligence.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-indigo-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105">
            Deseasonalize Costs
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}