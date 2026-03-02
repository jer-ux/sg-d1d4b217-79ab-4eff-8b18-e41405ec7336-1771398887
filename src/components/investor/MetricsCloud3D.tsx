import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function MetricsCloud3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const metrics = [
    { label: "Total Market", value: "$850B", x: 50, y: 30 },
    { label: "TAM", value: "$120B", x: 25, y: 50 },
    { label: "Accuracy", value: "99.7%", x: 75, y: 50 },
    { label: "Time to Value", value: "90 Days", x: 35, y: 70 },
    { label: "CAGR", value: "23%", x: 65, y: 70 },
    { label: "ROI", value: "15-30x", x: 50, y: 85 },
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

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
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

        // Glow
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

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-black border border-blue-500/20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Metrics overlaid on particle field */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.1 }}
              className="relative group cursor-pointer"
            >
              {/* Particle ring border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-sm transition-all duration-300" />
              
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-950/80 to-black/90 border border-blue-500/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-100 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-300">{metric.label}</div>
              </div>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={false}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-sm text-gray-400">Hover metrics for details</p>
      </div>
    </div>
  );
}