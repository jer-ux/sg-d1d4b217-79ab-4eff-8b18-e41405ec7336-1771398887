import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ROIVisualization3D() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const data = [
    { year: "2026", value: 2.5 },
    { year: "2027", value: 5 },
    { year: "2028", value: 10 },
    { year: "2029", value: 20 },
    { year: "2030", value: 30 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const rings: Array<{
      radius: number;
      particles: Array<{
        angle: number;
        speed: number;
        size: number;
      }>;
    }> = [];

    // Create expanding rings
    data.forEach((item, i) => {
      const radius = 50 + (i * 40);
      const particleCount = 30 + (i * 10);
      const particles = [];

      for (let j = 0; j < particleCount; j++) {
        particles.push({
          angle: (j / particleCount) * Math.PI * 2,
          speed: 0.001 + Math.random() * 0.002,
          size: 1 + Math.random() * 2,
        });
      }

      rings.push({ radius, particles });
    });

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rings.forEach((ring, ringIndex) => {
        const isHovered = hoveredBar === ringIndex;
        const opacity = isHovered ? 0.8 : 0.4;

        ring.particles.forEach((particle) => {
          particle.angle += particle.speed;

          const x = centerX + Math.cos(particle.angle) * ring.radius;
          const y = centerY + Math.sin(particle.angle) * ring.radius;

          // Glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3);
          gradient.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);
          gradient.addColorStop(1, "rgba(96, 165, 250, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [hoveredBar]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-black border border-blue-500/20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Chart bars overlaid */}
      <div className="relative w-full h-full px-16 py-12 flex items-end justify-around gap-4">
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
              {/* Bar with particle effect */}
              <motion.div
                className="relative w-full cursor-pointer"
                style={{ height: `${height}%` }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Particle ring glow around bar */}
                <div className={`absolute -inset-2 bg-gradient-to-t from-blue-500/30 to-blue-500/10 rounded-t-xl blur-lg transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-50"
                }`} />

                {/* Bar */}
                <div className="relative h-full rounded-t-xl bg-gradient-to-t from-blue-600 to-blue-400 border-2 border-blue-400/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-t-xl" />
                </div>

                {/* Value label */}
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
                  <div className="px-4 py-2 rounded-lg bg-black/90 border-2 border-blue-400/50 backdrop-blur-sm shadow-xl shadow-blue-500/20">
                    <div className="text-2xl font-bold text-blue-100">{item.value}x</div>
                    <div className="text-xs text-gray-400">ROI</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Year label */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                <div className={`text-sm font-bold transition-colors duration-200 ${
                  isHovered ? "text-blue-300" : "text-blue-400/80"
                }`}>
                  {item.year}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute top-6 right-6 z-10">
        <div className="px-4 py-2 rounded-lg bg-black/80 border border-blue-500/30 backdrop-blur-sm">
          <div className="text-sm text-gray-400">Expected ROI Multiple</div>
          <div className="text-xs text-blue-400 mt-1">5-Year Projection</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-sm text-gray-400">Hover bars for details</p>
      </div>
    </div>
  );
}