import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero3DInvestor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nodes = [
    { id: 1, label: "AI Core", x: 50, y: 30, size: 120, delay: 0 },
    { id: 2, label: "Data Lake", x: 20, y: 50, size: 100, delay: 0.1 },
    { id: 3, label: "Analytics", x: 80, y: 50, size: 100, delay: 0.2 },
    { id: 4, label: "Evidence", x: 35, y: 70, size: 90, delay: 0.3 },
    { id: 5, label: "Trust", x: 65, y: 70, size: 90, delay: 0.4 },
    { id: 6, label: "Insights", x: 50, y: 85, size: 80, delay: 0.5 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Animated background grid */}
      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "rotateX(60deg) translateZ(-200px)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* 3D Network visualization */}
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {connections.map((conn, i) => (
              <motion.line
                key={i}
                x1={`${nodes[conn.from].x}%`}
                y1={`${nodes[conn.from].y}%`}
                x2={`${nodes[conn.to].x}%`}
                y2={`${nodes[conn.to].y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: node.delay }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl"
                style={{
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />

              {/* Node sphere */}
              <motion.div
                className="relative rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-300/50 shadow-2xl"
                style={{
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  transform: "translateZ(50px)",
                }}
                whileHover={{ scale: 1.1, translateZ: 100 }}
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                }}
              >
                {/* Inner shine */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 mt-2 text-center whitespace-nowrap"
                style={{
                  top: `${node.size}px`,
                  transform: "translateZ(50px)",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: node.delay + 0.3 }}
              >
                <div className="px-3 py-1 rounded-lg bg-black/80 border border-amber-500/30 backdrop-blur-sm">
                  <span className="text-sm font-semibold text-amber-100">{node.label}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Hero content overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-6" style={{ transform: "translateZ(100px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
              <span className="text-amber-400 text-sm font-semibold">INVESTOR PRESENTATION</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              textShadow: "0 0 80px rgba(251, 191, 36, 0.3)",
            }}
          >
            SiriusB iQ
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Algorithmic Fiduciary Intelligence Platform
            <br />
            <span className="text-amber-400">Transforming $850B benefits waste into verifiable alpha</span>
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}