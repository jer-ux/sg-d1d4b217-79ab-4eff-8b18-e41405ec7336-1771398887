import { motion } from "framer-motion";
import { Check, X, AlertTriangle, DollarSign, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeeItem {
  category: string;
  pbmFee: string | null;
  costPlusFee: string | null;
  impact: "high" | "medium" | "low";
}

const hiddenFees: FeeItem[] = [
  {
    category: "Rebate Retention",
    pbmFee: "60-85% kept by PBM",
    costPlusFee: null,
    impact: "high"
  },
  {
    category: "Spread Pricing Markup",
    pbmFee: "15-300% per claim",
    costPlusFee: null,
    impact: "high"
  },
  {
    category: "DIR Fees (Clawbacks)",
    pbmFee: "$2-45 per Rx retroactive",
    costPlusFee: null,
    impact: "high"
  },
  {
    category: "Admin/PMPM Fees",
    pbmFee: "$8-25 per member/month",
    costPlusFee: null,
    impact: "medium"
  },
  {
    category: "AWP Discount Games",
    pbmFee: "Opaque floating benchmarks",
    costPlusFee: null,
    impact: "medium"
  },
  {
    category: "Specialty Upcharges",
    pbmFee: "$500-2000 per fill",
    costPlusFee: null,
    impact: "high"
  },
  {
    category: "Formulary Placement Fees",
    pbmFee: "Pay-to-play tier positioning",
    costPlusFee: null,
    impact: "medium"
  },
  {
    category: "Hidden Manufacturer Deals",
    pbmFee: "Undisclosed pharma kickbacks",
    costPlusFee: null,
    impact: "high"
  }
];

const transparentPricing = [
  {
    category: "Drug Sourcing Cost",
    value: "Actual manufacturer price",
    verified: true
  },
  {
    category: "Transparent Markup",
    value: "Flat 15% disclosed",
    verified: true
  },
  {
    category: "Dispensing Fee",
    value: "$3.00 per Rx (fixed)",
    verified: true
  },
  {
    category: "Shipping Cost",
    value: "$5.00 flat (actual)",
    verified: true
  },
  {
    category: "Rebate Pass-Through",
    value: "100% to customer",
    verified: true
  }
];

export function MeasureMedComparison() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge className="bg-red-500/10 text-red-400 border-red-500/30 text-xs font-mono uppercase">
          <AlertTriangle className="w-3 h-3 inline mr-1.5" />
          Hidden Fee Exposure Analysis
        </Badge>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
          What Traditional PBMs Hide vs. Cost Plus Transparency
        </h2>
        <p className="text-zinc-400 text-sm">
          Side-by-side breakdown of opaque PBM fee structures compared to Mark Cuban Cost Plus Drug Company's fully transparent pricing model.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Traditional PBM Column (Red) */}
        <Card className="bg-gradient-to-br from-red-950/20 via-zinc-950 to-red-950/10 border-red-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <CardHeader className="border-b border-zinc-900 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-serif font-bold text-red-400">
                Traditional PBM Model
              </CardTitle>
              <X className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Opaque, multi-layered hidden fee structure
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-3">
            {hiddenFees.map((fee, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-xl border ${
                  fee.impact === "high" 
                    ? "bg-red-500/5 border-red-500/20" 
                    : fee.impact === "medium"
                    ? "bg-orange-500/5 border-orange-500/20"
                    : "bg-yellow-500/5 border-yellow-500/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-1">{fee.category}</p>
                    <p className="text-xs text-zinc-400 font-mono">{fee.pbmFee}</p>
                  </div>
                  <Badge 
                    className={`text-[9px] font-bold ${
                      fee.impact === "high"
                        ? "bg-red-500/10 text-red-400 border-red-500/30"
                        : fee.impact === "medium"
                        ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                    }`}
                  >
                    {fee.impact.toUpperCase()}
                  </Badge>
                </div>
              </motion.div>
            ))}

            {/* Bottom warning */}
            <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 flex items-start gap-3 mt-6">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300 leading-relaxed">
                These fees are rarely disclosed in contracts and stack multiplicatively. 
                Total hidden costs can exceed 200% of actual drug acquisition costs.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cost Plus Column (Green) */}
        <Card className="bg-gradient-to-br from-cyan-950/20 via-zinc-950 to-green-950/10 border-cyan-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <CardHeader className="border-b border-zinc-900 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-serif font-bold text-cyan-400">
                Cost Plus Transparent Model
              </CardTitle>
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Simple, transparent, auditable pricing
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-3">
            {transparentPricing.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl border bg-cyan-500/5 border-cyan-500/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-1">{item.category}</p>
                    <p className="text-xs text-cyan-300 font-mono">{item.value}</p>
                  </div>
                  {item.verified && (
                    <Check className="w-5 h-5 text-green-400 shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Eliminated Fees List */}
            <div className="pt-4 space-y-2">
              <p className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Eliminated Completely:</p>
              <div className="grid grid-cols-1 gap-2">
                {["Rebate Retention", "Spread Pricing", "DIR Fees", "Hidden Kickbacks"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                    <X className="w-3.5 h-3.5 text-red-400" />
                    <span className="line-through">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom success message */}
            <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 flex items-start gap-3 mt-6">
              <DollarSign className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-cyan-300 leading-relaxed">
                Every cost component is itemized, disclosed upfront, and auditable. 
                Zero hidden fees, zero rebate games, zero surprises.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Bottom Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="bg-zinc-950/60 p-6 rounded-xl border border-zinc-900 text-center space-y-2">
          <p className="text-xs font-mono text-zinc-500 uppercase">Traditional PBM</p>
          <p className="text-4xl font-black text-red-400 font-mono">8-12</p>
          <p className="text-xs text-zinc-400">Hidden fee layers</p>
        </div>
        <div className="bg-zinc-950/60 p-6 rounded-xl border border-zinc-900 text-center space-y-2">
          <p className="text-xs font-mono text-cyan-400 uppercase">Cost Plus Transparent</p>
          <p className="text-4xl font-black text-cyan-400 font-mono">4</p>
          <p className="text-xs text-zinc-400">Disclosed cost components</p>
        </div>
        <div className="bg-gradient-to-br from-green-950/40 to-cyan-950/40 p-6 rounded-xl border border-green-500/20 text-center space-y-2">
          <p className="text-xs font-mono text-white uppercase">Average Savings</p>
          <p className="text-4xl font-black text-white font-mono">87%</p>
          <p className="text-xs text-green-400">On common medications</p>
        </div>
      </div>

    </div>
  );
}