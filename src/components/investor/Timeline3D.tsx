import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Timeline3D() {
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const milestones = [
    { quarter: "Q1 2026", title: "Platform Launch", description: "Core AI engine deployment", progress: 100 },
    { quarter: "Q2 2026", title: "First Clients", description: "5 enterprise deployments", progress: 85 },
    { quarter: "Q3 2026", title: "Market Validation", description: "$10M ARR achieved", progress: 60 },
    { quarter: "Q4 2026", title: "Scale Phase", description: "20+ clients, Series A", progress: 40 },
    { quarter: "Q1 2027", title: "Product Expansion", description: "New verticals launch", progress: 20 },
    { quarter: "Q2 2027", title: "Market Leadership", description: "$50M ARR target", progress: 10 },
    { quarter: "Q3 2027", title: "Exit Options", description: "Strategic partnerships", progress: 0 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(96, 165, 250, ${particle.opacity})`);
        gradient.addColorStop(1, "rgba(96, 165, 250, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-black border border-blue-500/20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Timeline path */}
      <div className="relative w-full h-full px-12 py-8">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M 5,${50} L ${95},${50}`}
            stroke="url(#pathGradient)"
            strokeWidth="2"
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
              <div
                key={i}
                className="relative"
                style={{ position: "absolute", left: `${position}%`, transform: "translateX(-50%)" }}
              >
                <motion.button
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedQuarter(isSelected ? null : i)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* Particle ring glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl"
                    style={{
                      width: "60px",
                      height: "60px",
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

                  {/* Node */}
                  <div
                    className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? "bg-blue-500 border-blue-300 shadow-2xl shadow-blue-500/50"
                        : "bg-blue-950/50 border-blue-600/50 group-hover:border-blue-500/80"
                    }`}
                  >
                    <span className="text-white font-bold text-sm">{i + 1}</span>
                  </div>

                  {/* Progress ring */}
                  {milestone.progress > 0 && (
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        strokeDasharray={`${milestone.progress * 1.38} 138`}
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
                    scale: isSelected ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`p-4 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                      isSelected
                        ? "bg-blue-950/90 border-blue-400/50 shadow-xl shadow-blue-500/30"
                        : "bg-black/70 border-blue-500/20"
                    }`}
                  >
                    <div className="text-blue-400 text-xs font-semibold mb-1">{milestone.quarter}</div>
                    <div className="text-white text-sm font-bold mb-1">{milestone.title}</div>
                    <div className="text-gray-300 text-xs">{milestone.description}</div>
                    {milestone.progress > 0 && (
                      <div className="mt-2 text-blue-400 text-xs font-semibold">
                        {milestone.progress}% Complete
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-sm text-gray-400">Click milestones to explore</p>
      </div>
    </div>
  );
}