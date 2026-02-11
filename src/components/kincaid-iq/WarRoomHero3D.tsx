"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingDown, AlertTriangle, LineChart, Activity } from "lucide-react";

export function WarRoomHero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // War Room Grid Animation
    let frame = 0;
    const gridLines = 20;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }> = [];

    // Create alert particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        maxLife: 100,
        color: Math.random() > 0.5 ? "#06b6d4" : "#ef4444"
      });
    }

    const animate = () => {
      frame++;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Clear with fade effect
      ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Draw perspective grid
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1;

      // Horizontal lines with perspective
      for (let i = 0; i < gridLines; i++) {
        const y = (h / gridLines) * i;
        const offset = Math.sin(frame * 0.01 + i * 0.5) * 20;
        
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(w, y + offset);
        ctx.stroke();
      }

      // Vertical lines with perspective
      for (let i = 0; i < gridLines; i++) {
        const x = (w / gridLines) * i;
        const offset = Math.cos(frame * 0.01 + i * 0.5) * 15;
        
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, h);
        ctx.stroke();
      }

      // Draw and update alert particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) {
          p.life = p.maxLife;
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color.replace(")", `, ${alpha})`).replace("rgb", "rgba");
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting lines between nearby particles
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = p.color.replace(")", `, ${alpha * 0.3})`).replace("rgb", "rgba");
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw scanning lines
      const scanY = (frame * 3) % h;
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      gradient.addColorStop(0, "rgba(6, 182, 212, 0)");
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.3)");
      gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 50, w, 100);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, rgba(2, 6, 23, 1) 70%)" }}
      />

      {/* War Room HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left - System Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-8 left-8 bg-black/80 border border-cyan-500/30 backdrop-blur-sm p-4 rounded-lg"
        >
          <div className="text-xs text-cyan-400 font-mono mb-2">SYSTEM STATUS</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white/80">ACTIVE MONITORING</span>
          </div>
          <div className="text-xs text-white/50 mt-1">Real-time analytics enabled</div>
        </motion.div>

        {/* Top Right - Alert Monitor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 right-8 bg-black/80 border border-red-500/30 backdrop-blur-sm p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <div className="text-xs text-red-400 font-mono">VARIANCE ALERTS</div>
          </div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-xs text-white/50">Pending arbitrage signals</div>
        </motion.div>

        {/* Bottom Left - EBITDA Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-8 left-8 bg-black/80 border border-cyan-500/30 backdrop-blur-sm p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-cyan-400" />
            <div className="text-xs text-cyan-400 font-mono">EBITDA IMPACT</div>
          </div>
          <div className="text-2xl font-bold text-red-400">-$3.29M</div>
          <div className="text-xs text-white/50">5-year cumulative (Base Case)</div>
        </motion.div>

        {/* Bottom Right - GLP-1 Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-8 right-8 bg-black/80 border border-amber-500/30 backdrop-blur-sm p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <div className="text-xs text-amber-400 font-mono">GLP-1 EXPOSURE</div>
          </div>
          <div className="text-2xl font-bold text-white">14.1%</div>
          <div className="text-xs text-white/50">2030 projected adoption</div>
        </motion.div>

        {/* Center - Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm font-semibold tracking-widest text-cyan-400 mb-4"
            >
              KINCAID IQ COMMAND CENTER
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
              style={{
                background: "linear-gradient(to bottom, #ffffff 0%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 80px rgba(6, 182, 212, 0.3)"
              }}
            >
              The War Room
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-white/70 font-light tracking-wide"
            >
              for Pharmacy Benefit Economics
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-sm text-white/50 max-w-2xl mx-auto px-4"
            >
              Real-time intelligence • Multi-year projections • Fiduciary-grade precision
            </motion.div>
          </div>
        </motion.div>

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ y: [0, 600, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950 pointer-events-none" />
    </div>
  );
}