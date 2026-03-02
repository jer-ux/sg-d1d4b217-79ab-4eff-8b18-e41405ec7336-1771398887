import { motion } from "framer-motion";
import { useState } from "react";

export default function Timeline3D() {
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  const milestones = [
    { quarter: "Q1 2026", title: "Platform Launch", description: "Core AI engine deployment", progress: 100, z: 0 },
    { quarter: "Q2 2026", title: "First Clients", description: "5 enterprise deployments", progress: 85, z: -50 },
    { quarter: "Q3 2026", title: "Market Validation", description: "$10M ARR achieved", progress: 60, z: -100 },
    { quarter: "Q4 2026", title: "Scale Phase", description: "20+ clients, Series A", progress: 40, z: -150 },
    { quarter: "Q1 2027", title: "Product Expansion", description: "New verticals launch", progress: 20, z: -200 },
    { quarter: "Q2 2027", title: "Market Leadership", description: "$50M ARR target", progress: 10, z: -250 },
    { quarter: "Q3 2027", title: "Exit Options", description: "Strategic partnerships", progress: 0, z: -300 },
  ];

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-black to-zinc-950 border border-amber-500/20">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* 3D Timeline */}
      <div className="relative w-full h-full px-12 py-8" style={{ perspective: "1500px" }}>
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(15deg)",
          }}
        >
          {/* Timeline path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d={`M 10,50 Q 25,30 50,50 T 90,50`}
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Milestones */}
          <div className="relative w-full h-full flex justify-between items-center">
            {milestones.map((milestone, i) => {
              const position = (i / (milestones.length - 1)) * 100;
              const isSelected = selectedQuarter === i;

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${position}%`,
                    transform: `translateX(-50%) translateZ(${milestone.z}px)`,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* Node */}
                  <motion.button
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedQuarter(i)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl"
                      style={{
                        width: "80px",
                        height: "80px",
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        top: "50%",
                      }}
                      animate={{
                        scale: isSelected ? [1, 1.5, 1] : 1,
                        opacity: isSelected ? [0.5, 0.8, 0.5] : 0.3,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    {/* Node circle */}
                    <div
                      className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-amber-500 border-amber-300 shadow-2xl shadow-amber-500/50"
                          : "bg-amber-900/50 border-amber-600/50 group-hover:border-amber-500/80"
                      }`}
                    >
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>

                    {/* Progress ring */}
                    {milestone.progress > 0 && (
                      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="2"
                          strokeDasharray={`${milestone.progress * 1.76} 176`}
                          className="opacity-60"
                        />
                      </svg>
                    )}
                  </motion.button>

                  {/* Info card */}
                  <motion.div
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: isSelected ? 1 : 0.7,
                      y: 0,
                      scale: isSelected ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
                  >
                    <div
                      className={`p-4 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                        isSelected
                          ? "bg-amber-950/90 border-amber-400/50 shadow-xl shadow-amber-500/30"
                          : "bg-black/70 border-amber-500/20"
                      }`}
                    >
                      <div className="text-amber-400 text-xs font-semibold mb-1">{milestone.quarter}</div>
                      <div className="text-white text-sm font-bold mb-1">{milestone.title}</div>
                      <div className="text-gray-300 text-xs">{milestone.description}</div>
                      {milestone.progress > 0 && (
                        <div className="mt-2 text-amber-400 text-xs font-semibold">
                          {milestone.progress}% Complete
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400">Click milestones to explore • Hover for 3D effect</p>
      </div>
    </div>
  );
}