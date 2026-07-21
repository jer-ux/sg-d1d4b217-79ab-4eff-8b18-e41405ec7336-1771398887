import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Pill, HeartPulse, CheckCircle2, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ClaimsTelemetryMeter() {
  const [healthClaims, setHealthClaims] = useState(0);
  const [rxClaims, setRxClaims] = useState(0);
  const [verifiedHealth, setVerifiedHealth] = useState(0);
  const [verifiedRx, setVerifiedRx] = useState(0);

  useEffect(() => {
    // Simulate real-time claim monitoring
    const healthInterval = setInterval(() => {
      setHealthClaims(prev => {
        const increment = Math.floor(Math.random() * 8) + 3;
        return prev + increment;
      });
      setVerifiedHealth(prev => prev + Math.floor(Math.random() * 7) + 2);
    }, 1200);

    const rxInterval = setInterval(() => {
      setRxClaims(prev => {
        const increment = Math.floor(Math.random() * 12) + 5;
        return prev + increment;
      });
      setVerifiedRx(prev => prev + Math.floor(Math.random() * 10) + 4);
    }, 1500);

    return () => {
      clearInterval(healthInterval);
      clearInterval(rxInterval);
    };
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Health Claims Monitor */}
      <Card className="relative bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border-2 border-blue-500/30 p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <HeartPulse className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Health Claims</h3>
              <p className="text-xs text-blue-300/70">Real-Time Monitoring</p>
            </div>
          </div>

          {/* Live Counter */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-1">
              <motion.span
                key={healthClaims}
                initial={{ scale: 1.2, color: "#60a5fa" }}
                animate={{ scale: 1, color: "#ffffff" }}
                className="text-5xl font-black text-white"
              >
                {healthClaims.toLocaleString()}
              </motion.span>
              <span className="text-sm font-semibold text-blue-300">claims</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-300/80">
              <Activity className="w-3 h-3 animate-pulse text-blue-400" />
              <span>Processing continuously</span>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-black/40 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Verified</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <motion.span
                key={verifiedHealth}
                initial={{ scale: 1.2, color: "#34d399" }}
                animate={{ scale: 1, color: "#10b981" }}
                className="text-3xl font-black text-green-400"
              >
                {verifiedHealth.toLocaleString()}
              </motion.span>
              <span className="text-xs text-green-300/70">evidence-backed</span>
            </div>
            <div className="mt-3 h-2 bg-black/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min((verifiedHealth / healthClaims) * 100, 100)}%` }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Live Pulse Indicator */}
          <div className="absolute top-4 right-4">
            <div className="relative">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </Card>

      {/* Rx Claims Monitor */}
      <Card className="relative bg-gradient-to-br from-purple-950/40 to-pink-950/40 border-2 border-purple-500/30 p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
              <Pill className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Rx Claims</h3>
              <p className="text-xs text-purple-300/70">Continuous Verification</p>
            </div>
          </div>

          {/* Live Counter */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-1">
              <motion.span
                key={rxClaims}
                initial={{ scale: 1.2, color: "#c084fc" }}
                animate={{ scale: 1, color: "#ffffff" }}
                className="text-5xl font-black text-white"
              >
                {rxClaims.toLocaleString()}
              </motion.span>
              <span className="text-sm font-semibold text-purple-300">claims</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-300/80">
              <Activity className="w-3 h-3 animate-pulse text-purple-400" />
              <span>Validating against NADAC</span>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-black/40 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider">Verified</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <motion.span
                key={verifiedRx}
                initial={{ scale: 1.2, color: "#34d399" }}
                animate={{ scale: 1, color: "#10b981" }}
                className="text-3xl font-black text-green-400"
              >
                {verifiedRx.toLocaleString()}
              </motion.span>
              <span className="text-xs text-green-300/70">benchmarked</span>
            </div>
            <div className="mt-3 h-2 bg-black/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min((verifiedRx / rxClaims) * 100, 100)}%` }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Live Pulse Indicator */}
          <div className="absolute top-4 right-4">
            <div className="relative">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Stats Bar */}
      <div className="md:col-span-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-4 text-center">
            <div className="text-xs text-emerald-300/70 mb-1 uppercase tracking-wider">Total Monitored</div>
            <div className="text-2xl font-black text-white">{(healthClaims + rxClaims).toLocaleString()}</div>
          </div>
          <div className="bg-black/40 border border-green-500/20 rounded-xl p-4 text-center">
            <div className="text-xs text-green-300/70 mb-1 uppercase tracking-wider">Verified</div>
            <div className="text-2xl font-black text-green-400">{(verifiedHealth + verifiedRx).toLocaleString()}</div>
          </div>
          <div className="bg-black/40 border border-blue-500/20 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <div className="text-xs text-blue-300/70 uppercase tracking-wider">Accuracy</div>
            </div>
            <div className="text-2xl font-black text-blue-400">
              {((verifiedHealth + verifiedRx) / (healthClaims + rxClaims) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}