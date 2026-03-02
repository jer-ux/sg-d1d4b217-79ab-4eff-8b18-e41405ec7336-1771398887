import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Slide3DProps {
  image: string;
  title: string;
  description: string;
  isActive: boolean;
}

export default function Slide3D({ image, title, description, isActive }: Slide3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Particle border effect
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      isEdge: boolean;
    }> = [];

    // Create edge particles
    const edgeCount = 80;
    for (let i = 0; i < edgeCount; i++) {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;

      if (side === 0) { x = Math.random() * canvas.width; y = 0; }
      else if (side === 1) { x = canvas.width; y = Math.random() * canvas.height; }
      else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height; }
      else { x = 0; y = Math.random() * canvas.height; }

      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
        isEdge: true,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Keep edge particles near edges
        if (particle.isEdge) {
          const margin = 30;
          if (particle.x < margin) particle.vx = Math.abs(particle.vx);
          if (particle.x > canvas.width - margin) particle.vx = -Math.abs(particle.vx);
          if (particle.y < margin) particle.vy = Math.abs(particle.vy);
          if (particle.y > canvas.height - margin) particle.vy = -Math.abs(particle.vy);
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

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

        // Connect nearby particles
        for (let j = i + 1; j < Math.min(i + 3, particles.length); j++) {
          const other = particles[j];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive]);

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particle border canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Slide image */}
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title overlay with particle effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative">
          {/* Particle ring behind text */}
          <div className="absolute -inset-2 bg-blue-500/10 blur-xl rounded-lg" />
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-blue-100 mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}