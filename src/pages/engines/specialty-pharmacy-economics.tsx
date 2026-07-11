import { Pill, Database, TrendingUp, DollarSign, CheckCircle2, AlertTriangle, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";
import Link from "next/link";

export default function SpecialtyPharmacyEconomicsEngine() {
  return (
    <EngineDetailLayout
      title="Specialty Pharmacy Economics"
      category="Healthcare Economics Engine"
      tagline="Model the total cost of specialty drugs—acquisition + administration + monitoring + waste—and optimize channel, formulary, and site-of-care decisions for 30-50% of Rx spend"
      gradient="from-purple-600 via-pink-600 to-rose-600"
    >
      {/* Problem */}
      <VegasSection title="The Specialty Drug Black Box" icon={AlertTriangle}>
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Specialty drugs are 2% of prescriptions but 50% of Rx spend. Your PBM says Humira costs $6,800/month. But is that acquisition cost? Does it include rebates? Administration fees? Waste? You pay the invoice and hope you're not getting fleeced. You are.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <VegasMetricCard
              icon={DollarSign}
              label="Specialty % of Rx Spend"
              value="45-55%"
              sublabel="and growing 12%/year"
              gradient="from-purple-600 to-pink-600"
            />
            <VegasMetricCard
              icon={AlertTriangle}
              label="Hidden Markup"
              value="15-40%"
              sublabel="above acquisition cost"
              gradient="from-pink-600 to-rose-600"
            />
            <VegasMetricCard
              icon={Pill}
              label="Avg Specialty Cost"
              value="$84K/yr"
              sublabel="per patient"
              gradient="from-rose-600 to-red-600"
            />
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-purple-400">✗</span> What Fails Without This Engine
            </h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Can't compare buy-and-bill vs. specialty pharmacy pricing—no total cost view</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Copay assistance programs hide true member cost burden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Rebates opaque: you don't know if you're getting your contractual share</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Biosimilars available but utilization stays low—no formulary enforcement</span>
              </li>
            </ul>
          </div>
        </div>
      </VegasSection>

      {/* Solution */}
      <VegasSection title="End-to-End Specialty Economics" icon={Target} gradient="from-emerald-500/10 to-teal-500/10">
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Our Specialty Pharmacy Economics Engine decomposes total specialty cost into acquisition, rebates, dispensing fees, administration, monitoring, and waste. It benchmarks your costs against transparent pricing databases and simulates formulary changes to quantify savings.
          </p>

          <VegasCodeBlock language="Specialty Economics Model">
{`// Total cost of specialty drug
total_cost = acquisition_cost +
             dispensing_fee +
             administration_cost +
             monitoring_cost +
             waste_cost -
             rebates -
             copay_assistance

// Example: Humira (adalimumab)
humira = {
  AWP: $7,037/month,
  PBM_invoice: $6,845/month,
  actual_acquisition: $5,950 (from 340B or MAC),
  rebate: -$1,200 (but delayed 90 days),
  dispensing_fee: +$125,
  administration: $0 (self-injectable),
  monitoring: +$85/month (labs),
  waste: +$240/year (avg 3.5% vial waste)
}

true_net_cost = $5,950 + $125 + $85 + $20 - $1,200
              = $4,980/month

// Channel comparison
buy_and_bill = physician_acquisition + admin_fee
specialty_pharmacy = PBM_price + dispensing
white_bagging = direct_ship + handling

SELECT MIN(buy_and_bill, specialty_pharmacy, white_bagging)

// Biosimilar switch simulation
IF biosimilar_available AND clinically_appropriate:
  savings = (brand_cost - biosimilar_cost) × eligible_patients
  implementation_cost = prior_auth + education
  net_savings = savings - implementation_cost`}
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
                <span><strong className="text-white">Cost Decomposition:</strong> Break specialty invoice into component costs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Rebate Intelligence:</strong> Track contractual rebates vs. actual receipts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Channel Optimizer:</strong> Compare medical vs. pharmacy benefit costs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Formulary Simulator:</strong> Model biosimilar adoption and step therapy</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Economic Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <VegasMetricCard label="Specialty PMPM" value="$120-$180" sublabel="commercial population" gradient="from-purple-600 to-pink-600" />
              <VegasMetricCard label="Channel Savings" value="12-25%" sublabel="optimized site-of-care" gradient="from-pink-600 to-rose-600" />
              <VegasMetricCard label="Biosimilar Discount" value="30-60%" sublabel="vs. brand biologics" gradient="from-emerald-600 to-teal-600" />
              <VegasMetricCard label="Rebate Recovery" value="$50K-$250K" sublabel="audit recoveries" gradient="from-teal-600 to-cyan-600" />
            </div>
          </div>
        </div>
      </VegasSection>

      {/* Use Cases */}
      <VegasSection title="Real-World Applications" icon={Zap}>
        <VegasFeatureGrid columns={2}>
          <VegasFeatureCard
            icon={Pill}
            title="Humira to Biosimilar Switch"
            items={[
              "Identified 18 Humira patients eligible for biosimilar",
              "Brand cost: $6,845/month × 18 = $123K/month",
              "Biosimilar cost: $3,200/month × 18 = $58K/month",
              "Annual savings: ($123K - $58K) × 12 = $780K",
              "80% patient conversion achieved, actual savings: $624K/year"
            ]}
          />
          <VegasFeatureCard
            icon={Target}
            title="White Bagging Oncology"
            items={[
              "Oncology infusions: $380K/year via buy-and-bill",
              "Modeled white bagging: direct specialty pharmacy to infusion center",
              "Eliminated hospital markup (avg 40%)",
              "New annual cost: $270K (29% reduction)",
              "Implemented for 12 patients, validated $110K savings"
            ]}
          />
        </VegasFeatureGrid>
      </VegasSection>

      {/* CTA */}
      <div className="relative group mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Master Specialty Pharmacy Economics</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            See your total specialty drug cost decomposed. Identify channel optimization opportunities. 
            Simulate biosimilar adoption and quantify savings before formulary changes.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-purple-50 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
            Request Engine Demo
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </EngineDetailLayout>
  );
}