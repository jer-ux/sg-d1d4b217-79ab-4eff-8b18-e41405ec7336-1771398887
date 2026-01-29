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
  GitBranch
} from "lucide-react";

// Animated Data Flow Visualization
export function DataFlowVisualization() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-blue-950/30">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Flowing particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-blue-400/60 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          initial={{ x: -20, y: Math.random() * 280 + 10 }}
          animate={{
            x: ["0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        />
      ))}

      {/* Pipeline stages */}
      <div className="absolute inset-0 flex items-center justify-around px-8">
        {["Source", "Transform", "Validate", "Output"].map((stage, idx) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <Database className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-white/70">{stage}</span>
          </motion.div>
        ))}
      </div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 h-full w-full">
        <motion.path
          d="M 100 150 Q 200 100, 300 150 T 500 150 T 700 150"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

// Interactive KPI Dashboard Preview
export function KPIDashboardPreview() {
  const metrics = [
    { label: "Verified Savings", value: "$14.2M", change: "+8.3%", trend: "up" },
    { label: "Active Events", value: "47", change: "-12%", trend: "down" },
    { label: "Receipts Generated", value: "1,248", change: "+24%", trend: "up" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950/30 via-blue-950/20 to-purple-950/30 p-6">
      {/* Animated gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Live KPI Dashboard</h3>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1 text-xs text-emerald-400"
          >
            <Activity className="h-3 w-3" />
            <span>Live</span>
          </motion.div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="text-xs text-white/60">{metric.label}</div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    metric.trend === "up" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              
              {/* Mini sparkline */}
              <div className="mt-3 flex h-8 items-end justify-between gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-full rounded-t ${
                      metric.trend === "up" ? "bg-emerald-400/30" : "bg-rose-400/30"
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ delay: idx * 0.15 + i * 0.05, duration: 0.3 }}
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

// Evidence Receipt 3D Card
export function EvidenceReceipt3D() {
  return (
    <motion.div
      className="relative h-[320px] w-full perspective-1000"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-blue-950/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        whileHover={{ rotateY: 5, rotateX: -5 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic shine effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/10 to-transparent"
          animate={{
            background: [
              "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              "linear-gradient(225deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative space-y-4" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Evidence Receipt</h3>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </motion.div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between rounded-lg bg-white/5 p-3">
              <span className="text-white/60">Receipt ID</span>
              <span className="font-mono text-white">RCP-2026-001847</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/5 p-3">
              <span className="text-white/60">Source Hash</span>
              <span className="font-mono text-xs text-emerald-400">sha256:7a3f...b91c</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/5 p-3">
              <span className="text-white/60">Transform Hash</span>
              <span className="font-mono text-xs text-blue-400">sha256:9d1e...4a2f</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/5 p-3">
              <span className="text-white/60">Verification</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                42/42 Tests Pass
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-white/5 p-3">
              <span className="text-white/60">Freshness</span>
              <span className="text-white">2.4 hours</span>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-300"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-4 w-4" />
            <span>VERIFIED • Audit-grade provenance locked</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Arbitrage Detection Visualization
export function ArbitrageDetectionViz() {
  const events = [
    { id: "AE-10901", severity: "high", variance: "+11.8%", type: "SEC × 5500" },
    { id: "AE-10902", severity: "medium", variance: "-3.2%", type: "Plan × Actual" },
    { id: "AE-10903", severity: "high", variance: "+8.4%", type: "Filing × Ledger" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-rose-950/30 via-orange-950/20 to-rose-950/30 p-6">
      {/* Radar scan effect */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Arbitrage Detection Engine</h3>
          <div className="flex items-center gap-1 text-xs text-rose-400">
            <AlertTriangle className="h-3 w-3" />
            <span>3 Active</span>
          </div>
        </div>

        <div className="space-y-2">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-rose-400/30 hover:bg-white/10"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-rose-500/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              />
              
              <div className="relative flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-white/60">{event.id}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        event.severity === "high"
                          ? "bg-rose-400/20 text-rose-300"
                          : "bg-amber-400/20 text-amber-300"
                      }`}
                    >
                      {event.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-white">{event.type} Variance</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-rose-400">{event.variance}</span>
                  <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Network Graph Animation
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
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-950/30 via-blue-950/20 to-purple-950/30">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="h-full w-full" viewBox="-150 -150 300 300">
          {/* Connection lines */}
          {nodePositions.map((node, i) =>
            nodePositions.slice(i + 1).map((targetNode, j) => (
              <motion.line
                key={`line-${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: (i + j) * 0.2,
                }}
              />
            ))
          )}

          {/* Nodes */}
          {nodePositions.map((node, i) => (
            <motion.g key={`node-${i}`}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="rgba(139, 92, 246, 0.3)"
                stroke="rgba(139, 92, 246, 0.6)"
                strokeWidth="2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
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
                r="4"
                fill="rgba(139, 92, 246, 0.8)"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            </motion.g>
          ))}

          {/* Central hub */}
          <motion.circle
            cx="0"
            cy="0"
            r="12"
            fill="rgba(139, 92, 246, 0.4)"
            stroke="rgba(139, 92, 246, 0.8)"
            strokeWidth="2"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="text-xs text-white/70">Data Integration Network</span>
        <div className="flex items-center gap-1 text-xs text-purple-400">
          <GitBranch className="h-3 w-3" />
          <span>{nodes} Sources Connected</span>
        </div>
      </div>
    </div>
  );
}

// Gradient Mesh Background
export function GradientMeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}