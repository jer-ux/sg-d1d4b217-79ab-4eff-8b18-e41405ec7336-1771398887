import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Users, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export function InstantROICalculator() {
  const [employees, setEmployees] = useState(500);
  const [avgMonthlyRx, setAvgMonthlyRx] = useState(12);

  // Average savings per prescription when switching to Cost Plus
  const avgSavingsPerRx = 147; // Conservative estimate based on formulary data
  
  const monthlyRxVolume = employees * avgMonthlyRx;
  const monthlySavings = monthlyRxVolume * avgSavingsPerRx;
  const annualSavings = monthlySavings * 12;
  const threeYearSavings = annualSavings * 3;
  const fiveYearSavings = annualSavings * 5;

  return (
    <Card className="bg-gradient-to-br from-[#0F172A] via-[#090D16] to-cyan-950/10 border-cyan-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <CardHeader className="border-b border-zinc-900 pb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs font-mono uppercase">
              <Calculator className="w-3 h-3 inline mr-1.5" />
              ROI Projection Engine
            </Badge>
            <CardTitle className="text-2xl font-serif font-bold text-white">
              Instant Savings Calculator
            </CardTitle>
            <p className="text-sm text-zinc-400 font-light">
              Model your organization's immediate cost reduction by switching to transparent Cost Plus pricing
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-cyan-400 opacity-40" />
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        
        {/* Input Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Employees Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                Total Employees:
              </label>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {employees.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[employees]}
              onValueChange={(val) => setEmployees(val[0])}
              max={5000}
              min={50}
              step={50}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>50</span>
              <span>2,500</span>
              <span>5,000</span>
            </div>
          </div>

          {/* Avg Monthly Rx Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                Avg Monthly Rx/Employee:
              </label>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {avgMonthlyRx}
              </span>
            </div>
            <Slider
              value={[avgMonthlyRx]}
              onValueChange={(val) => setAvgMonthlyRx(val[0])}
              max={30}
              min={5}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>5</span>
              <span>17</span>
              <span>30</span>
            </div>
          </div>

        </div>

        {/* Big Annual Savings Display */}
        <motion.div 
          key={annualSavings}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 p-8 rounded-2xl border border-cyan-500/20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.1),transparent_50%)]" />
          <div className="relative z-10 space-y-3">
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Projected Annual Savings
            </p>
            <p className="text-6xl md:text-7xl font-black font-serif text-white tracking-tight">
              ${(annualSavings / 1000000).toFixed(2)}M
            </p>
            <p className="text-sm text-zinc-400">
              Based on {monthlyRxVolume.toLocaleString()} monthly prescriptions at ${avgSavingsPerRx} avg savings per Rx
            </p>
          </div>
        </motion.div>

        {/* Timeline Projection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-950/60 p-6 rounded-xl border border-zinc-900 text-center space-y-2"
          >
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Year 1</p>
            <p className="text-3xl font-black text-green-400 font-mono">
              ${(annualSavings / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-zinc-500">First year impact</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-950/60 p-6 rounded-xl border border-cyan-500/20 text-center space-y-2"
          >
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">3-Year Total</p>
            <p className="text-3xl font-black text-cyan-400 font-mono">
              ${(threeYearSavings / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-zinc-500">Cumulative savings</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 p-6 rounded-xl border border-cyan-500/30 text-center space-y-2"
          >
            <p className="text-[10px] font-mono text-white uppercase tracking-widest">5-Year Total</p>
            <p className="text-3xl font-black text-white font-mono">
              ${(fiveYearSavings / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-cyan-400">Maximum ROI timeline</p>
          </motion.div>

        </div>

        {/* Bottom insight note */}
        <div className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/10 flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-300 leading-relaxed">
            Cost Plus Drug Company eliminates hidden spread pricing, rebate retention, and DIR fees. 
            Calculations based on conservative industry benchmarks from actual employer implementations.
          </p>
        </div>

      </CardContent>
    </Card>
  );
}