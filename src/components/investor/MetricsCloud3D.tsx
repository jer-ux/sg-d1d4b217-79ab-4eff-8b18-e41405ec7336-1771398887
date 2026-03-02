import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MetricsCloud3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const metrics = [
    { label: "Total Market", value: "$850B", x: 50, y: 30, z: 0, size: 140 },
    { label: "TAM", value: "$120B", x: 25, y: 50, z: -50, size: 120 },
    { label: "Accuracy", value: "99.7%", x: 75, y: 50, z: -50, size: 120 },
    { label: "Time to Value", value: "90 Days", x: 35, y: 70, z: -100, size: 100 },
    { label: "CAGR", value: "23%", x: 65, y: 70, z: -100, size: 100 },
    { label: "ROI", value: "15-30x", x: 50, y: 85, z: -150, size: 90 },
  ];

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-950 to-black border border-amber-500/20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]" />

      {/* 3D Space */}
      <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg)`,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${metric.x}%`,
                top: `${metric.y}%`,
                transform: `translate(-50%, -50%) translateZ(${metric.z}px)`,
                transformStyle: "preserve-3d",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl"
                style={{
                  width: `${metric.size}px`,
                  height: `${metric.size}px`,
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />

              {/* Metric card */}
              <motion.div
                className="relative"
                style={{
                  width: `${metric.size}px`,
                  height: `${metric.size}px`,
                }}
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                whileHover={{
                  scale: 1.15,
                  rotateY: 180,
                  transition: { duration: 0.4 },
                }}
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-400/40 backdrop-blur-sm flex flex-col items-center justify-center p-4 shadow-2xl">
                  <div className="text-3xl font-bold text-amber-100 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-300 text-center">{metric.label}</div>
                </div>

                {/* Inner glow */}
                <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </motion.div>

              {/* Connection line to center */}
              <svg
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  width: "200px",
                  height: "200px",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.line
                  x1="100"
                  y1="100"
                  x2={100 + (50 - metric.x) * 2}
                  y2={100 + (30 - metric.y) * 2}
                  stroke="rgba(251, 191, 36, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </svg>
            </motion.div>
          ))}

          {/* Center hub */}
          <motion.div
            className="absolute left-1/2 top-[30%]"
            style={{
              transform: "translate(-50%, -50%) translateZ(50px)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-300/50 flex items-center justify-center shadow-2xl shadow-amber-500/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-white font-bold text-lg">iQ</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400">Move your mouse to explore • Hover metrics for details</p>
      </div>
    </div>
  );
}