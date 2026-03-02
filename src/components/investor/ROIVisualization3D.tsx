import { motion } from "framer-motion";
import { useState } from "react";

export default function ROIVisualization3D() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const data = [
    { year: "2026", value: 2.5, color: "from-amber-600 to-amber-500" },
    { year: "2027", value: 5, color: "from-amber-500 to-amber-400" },
    { year: "2028", value: 10, color: "from-amber-400 to-amber-300" },
    { year: "2029", value: 20, color: "from-amber-500 to-amber-400" },
    { year: "2030", value: 30, color: "from-amber-600 to-amber-500" },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-950 to-black border border-amber-500/20">
      {/* Background grid */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 3D Chart Container */}
      <div className="relative w-full h-full px-16 py-12" style={{ perspective: "1200px" }}>
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(10deg) rotateY(-5deg)",
          }}
          animate={{
            rotateY: [-5, 5, -5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-right pr-4">
            {[30, 20, 10, 5, 0].map((val, i) => (
              <div key={i} className="text-amber-400/60 text-sm font-semibold">
                {val}x
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative w-full h-full ml-16 flex items-end justify-around gap-4">
            {data.map((item, i) => {
              const height = (item.value / maxValue) * 100;
              const isHovered = hoveredBar === i;

              return (
                <motion.div
                  key={i}
                  className="relative flex-1 max-w-[120px]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{ transformOrigin: "bottom" }}
                >
                  {/* 3D Bar */}
                  <motion.div
                    className="relative w-full cursor-pointer"
                    style={{
                      height: `${height}%`,
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${isHovered ? 50 : 0}px)`,
                    }}
                    animate={{
                      rotateY: isHovered ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Bar front face */}
                    <div
                      className={`absolute inset-0 rounded-t-xl bg-gradient-to-b ${item.color} border-2 border-amber-400/40 shadow-2xl`}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-t-xl" />
                      
                      {/* Inner glow */}
                      <motion.div
                        className="absolute inset-2 rounded-t-lg bg-gradient-to-b from-white/20 to-transparent"
                        animate={{
                          opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>

                    {/* Bar side face (3D depth) */}
                    <div
                      className={`absolute top-0 right-0 w-3 h-full bg-gradient-to-b ${item.color} opacity-60`}
                      style={{
                        transform: "translateZ(-30px) rotateY(90deg)",
                        transformOrigin: "left",
                      }}
                    />

                    {/* Floating value label */}
                    <motion.div
                      className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isHovered ? 1 : 0.8,
                        y: isHovered ? -5 : 0,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 py-2 rounded-lg bg-black/90 border-2 border-amber-400/50 backdrop-blur-sm shadow-xl shadow-amber-500/20">
                        <div className="text-2xl font-bold text-amber-100">{item.value}x</div>
                        <div className="text-xs text-gray-400">ROI</div>
                      </div>
                    </motion.div>

                    {/* Glow effect */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-t-xl bg-amber-500/30 blur-xl -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>

                  {/* X-axis label */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                    <div className={`text-sm font-bold transition-colors duration-200 ${
                      isHovered ? "text-amber-300" : "text-amber-400/80"
                    }`}>
                      {item.year}
                    </div>
                  </div>

                  {/* Base shadow */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2 bg-amber-500/20 blur-md"
                    style={{ transform: "translateZ(-50px)" }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Floor grid */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
            style={{ transform: "translateZ(-50px)" }}
          />
        </motion.div>
      </div>

      {/* Legend */}
      <div className="absolute top-6 right-6">
        <div className="px-4 py-2 rounded-lg bg-black/80 border border-amber-500/30 backdrop-blur-sm">
          <div className="text-sm text-gray-400">Expected ROI Multiple</div>
          <div className="text-xs text-amber-400 mt-1">5-Year Projection</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400">Hover bars for details • 3D auto-rotates</p>
      </div>
    </div>
  );
}