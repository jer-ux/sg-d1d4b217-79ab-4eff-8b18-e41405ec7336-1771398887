import * as React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Database, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  GitBranch,
  Sparkles
} from "lucide-react";

export function PremiumGraphics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DataFlowVisualization />
      <KPIDashboardPreview />
      <EvidenceReceipt3D />
      <ArbitrageDetectionViz />
      <div className="lg:col-span-2">
        <NetworkGraphAnimation />
      </div>
    </div>
  );
}

// Animated Data Flow Visualization - ENHANCED
export function DataFlowVisualization() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-blue-950/40 shadow-[0_0_80px_rgba(59,130,246,0.15)]">
      {/* Enhanced background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Glowing flowing particles - BRIGHTER */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,1),0_0_40px_rgba(59,130,246,0.5)]"
          initial={{ x: -20, y: Math.random() * 280 + 20 }}
          animate={{
            x: ["0%", "100%"],
            opacity: [0, 1, 1, 0.7, 0],
            scale: [0.8, 1.2, 1, 0.9, 0.7],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pipeline stages - ENHANCED */}
      <div className="absolute inset-0 flex items-center justify-around px-8">
        {["Source", "Transform", "Validate", "Output"].map((stage, idx) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div 
              className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-400/50 bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              animate={{
                boxShadow: [
                  "0_0_30px_rgba(59,130,246,0.4)",
                  "0_0_50px_rgba(59,130,246,0.6)",
                  "0_0_30px_rgba(59,130,246,0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
            >
              <Database className="h-7 w-7 text-blue-300" />
            </motion.div>
            <span className="text-sm font-medium text-white/90">{stage}</span>
          </motion.div>
        ))}
      </div>

      {/* Connecting lines with animation */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 120 160 Q 250 120, 380 160 T 640 160"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// Interactive KPI Dashboard Preview - ENHANCED
export function KPIDashboardPreview() {
  const metrics = [
    { label: "Verified Savings", value: "$14.2M", change: "+8.3%", trend: "up" },
    { label: "Active Events", value: "47", change: "-12%", trend: "down" },
    { label: "Receipts Generated", value: "1,248", change: "+24%", trend: "up" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-emerald-950/40 via-blue-950/30 to-purple-950/40 p-6 shadow-[0_0_80px_rgba(16,185,129,0.15)]">
      {/* Animated gradient overlay - ENHANCED */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.25) 0%, transparent 60%)",
            "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.25) 0%, transparent 60%)",
            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.25) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Live KPI Dashboard</h3>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-sm text-emerald-400"
          >
            <Activity className="h-4 w-4" />
            <span className="font-medium">Live</span>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <div className="text-xs font-medium text-white/70">{metric.label}</div>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-3xl font-bold text-white">{metric.value}</span>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    metric.trend === "up" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              
              {/* Enhanced mini sparkline */}
              <div className="mt-4 flex h-10 items-end justify-between gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-full rounded-t ${
                      metric.trend === "up" ? "bg-emerald-400/40" : "bg-rose-400/40"
                    }`}
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${Math.random() * 100}%`,
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ 
                      delay: idx * 0.15 + i * 0.05, 
                      duration: 0.4,
                      opacity: { duration: 2, repeat: Infinity, delay: i * 0.1 }
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Evidence Receipt 3D Card - ENHANCED
export function EvidenceReceipt3D() {
  return (
    <motion.div
      className="relative h-[340px] w-full perspective-1000"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative h-full w-full rounded-2xl border-2 border-white/20 bg-gradient-to-br from-blue-950/50 via-purple-950/40 to-blue-950/50 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.5),0_0_80px_rgba(59,130,246,0.2)] backdrop-blur-xl"
        whileHover={{ rotateY: 5, rotateX: -5 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Enhanced holographic shine effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              "linear-gradient(225deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(59,130,246,0.3)]" />

        <div className="relative space-y-4" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Evidence Receipt</h3>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle2 className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </motion.div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/10">
              <span className="text-white/70">Receipt ID</span>
              <span className="font-mono font-medium text-white">RCP-2026-001847</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/10">
              <span className="text-white/70">Source Hash</span>
              <span className="font-mono text-xs text-emerald-400 font-medium">sha256:7a3f...b91c</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/10">
              <span className="text-white/70">Transform Hash</span>
              <span className="font-mono text-xs text-blue-400 font-medium">sha256:9d1e...4a2f</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/10">
              <span className="text-white/70">Verification</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4" />
                42/42 Tests Pass
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/10">
              <span className="text-white/70">Freshness</span>
              <span className="text-white font-medium">2.4 hours</span>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/15 p-3 text-sm text-emerald-300 font-medium shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-5 w-5" />
            <span>VERIFIED • Audit-grade provenance locked</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Arbitrage Detection Visualization - ENHANCED
export function ArbitrageDetectionViz() {
  const events = [
    { id: "AE-10901", severity: "high", variance: "+11.8%", type: "SEC × 5500" },
    { id: "AE-10902", severity: "medium", variance: "-3.2%", type: "Plan × Actual" },
    { id: "AE-10903", severity: "high", variance: "+8.4%", type: "Filing × Ledger" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-rose-950/40 via-orange-950/30 to-rose-950/40 p-6 shadow-[0_0_80px_rgba(244,63,94,0.15)]">
      {/* Enhanced radar scan effect */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400/30"
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-400/20"
        animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Arbitrage Detection Engine</h3>
          <div className="flex items-center gap-2 text-sm text-rose-400 font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>3 Active</span>
          </div>
        </div>

        <div className="space-y-3">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm transition-all hover:border-rose-400/40 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/15 to-rose-500/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              />
              
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-white/80">{event.id}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        event.severity === "high"
                          ? "bg-rose-400/25 text-rose-300 border border-rose-400/30"
                          : "bg-amber-400/25 text-amber-300 border border-amber-400/30"
                      }`}
                    >
                      {event.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-base font-medium text-white">{event.type} Variance</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-rose-400">{event.variance}</span>
                  <ArrowRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Network Graph Animation - ENHANCED
export function NetworkGraphAnimation() {
  const nodes = 8;
  const nodePositions = [...Array(nodes)].map((_, i) => {
    const angle = (i / nodes) * Math.PI * 2;
    const radius = 80;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-purple-950/40 via-blue-950/30 to-purple-950/40 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="h-full w-full" viewBox="-150 -150 300 300">
          {/* Enhanced connection lines */}
          {nodePositions.map((node, i) =>
            nodePositions.slice(i + 1).map((targetNode, j) => (
              <motion.line
                key={`line-${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="rgba(139, 92, 246, 0.4)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: (i + j) * 0.2,
                }}
              />
            ))
          )}

          {/* Enhanced nodes */}
          {nodePositions.map((node, i) => (
            <motion.g key={`node-${i}`}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="10"
                fill="rgba(139, 92, 246, 0.4)"
                stroke="rgba(139, 92, 246, 0.8)"
                strokeWidth="2"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="5"
                fill="rgba(139, 92, 246, 1)"
                animate={{
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
              {/* Glowing halo */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="15"
                fill="none"
                stroke="rgba(139, 92, 246, 0.6)"
                strokeWidth="1"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            </motion.g>
          ))}

          {/* Enhanced central hub */}
          <motion.circle
            cx="0"
            cy="0"
            r="16"
            fill="rgba(139, 92, 246, 0.5)"
            stroke="rgba(139, 92, 246, 1)"
            strokeWidth="3"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
          <motion.circle
            cx="0"
            cy="0"
            r="8"
            fill="rgba(139, 92, 246, 1)"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">Data Integration Network</span>
        <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
          <GitBranch className="h-4 w-4" />
          <span>{nodes} Sources Connected</span>
        </div>
      </div>
    </div>
  );
}

// Gradient Mesh Background - ENHANCED
export function GradientMeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-blue-500/15 blur-[140px]"
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-purple-500/15 blur-[140px]"
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/3 h-[700px] w-[700px] rounded-full bg-emerald-500/15 blur-[140px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-amber-500/12 blur-[130px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.18, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}