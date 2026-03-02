import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero3DInvestor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 600;

    // Particle system for the ring
    const particles: Array<{
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const particleCount = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 180;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (i / particleCount) * Math.PI * 2,
        radius: baseRadius + (Math.random() - 0.5) * 40,
        speed: 0.002 + Math.random() * 0.003,
        size: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
        color: `rgba(96, 165, 250, ${0.5 + Math.random() * 0.5})`, // Blue colors
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update particle position
        particle.angle += particle.speed;

        const x = centerX + Math.cos(particle.angle) * particle.radius;
        const y = centerY + Math.sin(particle.angle) * particle.radius;

        // Create glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, "rgba(96, 165, 250, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
          const other = particles[j];
          const otherX = centerX + Math.cos(other.angle) * other.radius;
          const otherY = centerY + Math.sin(other.angle) * other.radius;
          
          const distance = Math.hypot(x - otherX, y - otherY);
          if (distance < 50) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (1 - distance / 50)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(otherX, otherY);
            ctx.stroke();
          }
        }
      });

      // Draw central glow
      const centralGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius);
      centralGlow.addColorStop(0, "rgba(96, 165, 250, 0.1)");
      centralGlow.addColorStop(0.5, "rgba(96, 165, 250, 0.05)");
      centralGlow.addColorStop(1, "rgba(96, 165, 250, 0)");
      ctx.fillStyle = centralGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-black">
      {/* Canvas for particle ring */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-black to-black pointer-events-none" />

      {/* Additional floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Hero content overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
              <span className="text-blue-400 text-sm font-semibold">INVESTOR PRESENTATION</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              textShadow: "0 0 80px rgba(96, 165, 250, 0.5)",
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
            <span className="text-blue-400">Transforming $850B benefits waste into verifiable alpha</span>
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  );
}