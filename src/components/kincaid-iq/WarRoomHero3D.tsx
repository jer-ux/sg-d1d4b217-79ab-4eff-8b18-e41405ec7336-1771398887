"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, AlertTriangle, LineChart, Activity, Shield, Zap, Eye } from "lucide-react";

interface Alert {
  id: number;
  type: "variance" | "glp1" | "spread";
  message: string;
  value: string;
  timestamp: Date;
}

export function WarRoomHero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, type: "variance", message: "Rebate variance detected", value: "$142K", timestamp: new Date() },
    { id: 2, type: "spread", message: "Spread differential alert", value: "2.8%", timestamp: new Date() },
    { id: 3, type: "glp1", message: "GLP-1 utilization spike", value: "+18%", timestamp: new Date() }
  ]);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [ebitdaImpact, setEbitdaImpact] = useState(-3.29);
  const [glp1Percent, setGlp1Percent] = useState(14.1);
  const [systemStatus, setSystemStatus] = useState<"active" | "scanning" | "alert">("active");
  const [hoveredOverlay, setHoveredOverlay] = useState<string | null>(null);

  // Dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate metrics slightly
      setEbitdaImpact(prev => prev + (Math.random() - 0.5) * 0.02);
      setGlp1Percent(prev => prev + (Math.random() - 0.5) * 0.1);
      setActiveAlerts(Math.floor(Math.random() * 2) + 2); // 2-3 alerts

      // Cycle system status
      setSystemStatus(prev => {
        const statuses: Array<"active" | "scanning" | "alert"> = ["active", "scanning", "alert"];
        const currentIndex = statuses.indexOf(prev);
        return statuses[(currentIndex + 1) % 3];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Add new alerts periodically
  useEffect(() => {
    const alertMessages = [
      { type: "variance" as const, message: "Formulary steering detected", value: "$89K" },
      { type: "spread" as const, message: "MAC pricing variance", value: "3.2%" },
      { type: "glp1" as const, message: "Wegovy adoption acceleration", value: "+24%" },
      { type: "variance" as const, message: "Specialty pharmacy markup", value: "$156K" },
      { type: "spread" as const, message: "AWP deviation identified", value: "4.1%" }
    ];

    const interval = setInterval(() => {
      const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
      const newAlert: Alert = {
        id: Date.now(),
        ...randomAlert,
        timestamp: new Date()
      };

      setAlerts(prev => {
        const updated = [newAlert, ...prev].slice(0, 5); // Keep only last 5
        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

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
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: Math.random() * 100,
        maxLife: 100,
        color: Math.random() > 0.6 ? "#06b6d4" : Math.random() > 0.3 ? "#ef4444" : "#f59e0b"
      });
    }

    const animate = () => {
      frame++;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Draw perspective grid with mouse influence
      const mouseInfluence = 30;
      const mouseFactor = {
        x: (mousePos.x / window.innerWidth - 0.5) * mouseInfluence,
        y: (mousePos.y / window.innerHeight - 0.5) * mouseInfluence
      };

      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1;

      for (let i = 0; i < gridLines; i++) {
        const y = (h / gridLines) * i;
        const offset = Math.sin(frame * 0.01 + i * 0.5) * 20 + mouseFactor.y;
        
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(w, y + offset);
        ctx.stroke();
      }

      for (let i = 0; i < gridLines; i++) {
        const x = (w / gridLines) * i;
        const offset = Math.cos(frame * 0.01 + i * 0.5) * 15 + mouseFactor.x;
        
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, h);
        ctx.stroke();
      }

      // Draw and update particles with mouse attraction
      particles.forEach((p) => {
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.life <= 0) {
          p.life = p.maxLife;
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.vx = (Math.random() - 0.5) * 0.8;
          p.vy = (Math.random() - 0.5) * 0.8;
        }

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color.replace(")", `, ${alpha})`).replace("rgb", "rgba");
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = p.color.replace(")", `, ${alpha * 0.2})`).replace("rgb", "rgba");
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Scanning lines
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
  }, [mousePos]);

  const statusColors = {
    active: { bg: "bg-green-500", text: "text-green-400", border: "border-green-500/30" },
    scanning: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/30" },
    alert: { bg: "bg-red-500", text: "text-red-400", border: "border-red-500/30" }
  };

  const statusLabels = {
    active: "ACTIVE MONITORING",
    scanning: "DEEP SCAN MODE",
    alert: "ALERT CONDITION"
  };

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, rgba(2, 6, 23, 1) 70%)" }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left - System Status (Interactive) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`absolute top-8 left-8 bg-black/80 border ${statusColors[systemStatus].border} backdrop-blur-sm p-4 rounded-lg pointer-events-auto cursor-pointer transition-all hover:scale-105`}
          onMouseEnter={() => setHoveredOverlay("status")}
          onMouseLeave={() => setHoveredOverlay(null)}
        >
          <div className={`text-xs ${statusColors[systemStatus].text} font-mono mb-2 flex items-center gap-2`}>
            <Shield className="w-3 h-3" />
            SYSTEM STATUS
          </div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <motion.div 
              className={`w-2 h-2 ${statusColors[systemStatus].bg} rounded-full`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-white/80 font-medium">{statusLabels[systemStatus]}</span>
          </div>
          <div className="text-xs text-white/50">Real-time analytics enabled</div>
          
          <AnimatePresence>
            {hoveredOverlay === "status" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-3 pt-3 border-t border-white/10 text-xs text-white/60"
              >
                <div className="flex justify-between mb-1">
                  <span>Uptime</span>
                  <span className="text-green-400">99.97%</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Points</span>
                  <span className="text-cyan-400">2.4M+</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Top Right - Alert Monitor (Interactive with live alerts) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 right-8 bg-black/80 border border-red-500/30 backdrop-blur-sm p-4 rounded-lg pointer-events-auto cursor-pointer transition-all hover:scale-105 max-w-sm"
          onMouseEnter={() => setHoveredOverlay("alerts")}
          onMouseLeave={() => setHoveredOverlay(null)}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
            <div className="text-xs text-red-400 font-mono">VARIANCE ALERTS</div>
          </div>
          <motion.div 
            key={activeAlerts}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-white"
          >
            {activeAlerts}
          </motion.div>
          <div className="text-xs text-white/50">Pending arbitrage signals</div>

          <AnimatePresence>
            {hoveredOverlay === "alerts" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/10 space-y-2 max-h-40 overflow-y-auto"
              >
                {alerts.slice(0, 3).map((alert, i) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-xs bg-red-500/10 rounded p-2"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-red-300 font-medium">{alert.message}</span>
                      <span className="text-red-400 font-bold">{alert.value}</span>
                    </div>
                    <div className="text-white/40 text-[10px]">
                      {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Left - EBITDA Tracker (Live updating) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-8 left-8 bg-black/80 border border-cyan-500/30 backdrop-blur-sm p-4 rounded-lg pointer-events-auto cursor-pointer transition-all hover:scale-105"
          onMouseEnter={() => setHoveredOverlay("ebitda")}
          onMouseLeave={() => setHoveredOverlay(null)}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-cyan-400" />
            <div className="text-xs text-cyan-400 font-mono">EBITDA IMPACT</div>
          </div>
          <motion.div 
            key={Math.floor(ebitdaImpact * 100)}
            className="text-2xl font-bold text-red-400"
          >
            -${Math.abs(ebitdaImpact).toFixed(2)}M
          </motion.div>
          <div className="text-xs text-white/50">5-year cumulative (Base Case)</div>

          <AnimatePresence>
            {hoveredOverlay === "ebitda" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-3 pt-3 border-t border-white/10 text-xs space-y-1"
              >
                <div className="flex justify-between">
                  <span className="text-white/60">Annual Impact</span>
                  <span className="text-red-400 font-medium">-$0.97M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Margin Drag</span>
                  <span className="text-red-400 font-medium">-5.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Recovery Potential</span>
                  <span className="text-green-400 font-medium">$2.1M</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Right - GLP-1 Monitor (Live updating) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-8 right-8 bg-black/80 border border-amber-500/30 backdrop-blur-sm p-4 rounded-lg pointer-events-auto cursor-pointer transition-all hover:scale-105"
          onMouseEnter={() => setHoveredOverlay("glp1")}
          onMouseLeave={() => setHoveredOverlay(null)}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <div className="text-xs text-amber-400 font-mono">GLP-1 EXPOSURE</div>
          </div>
          <motion.div 
            key={Math.floor(glp1Percent * 10)}
            className="text-2xl font-bold text-white"
          >
            {glp1Percent.toFixed(1)}%
          </motion.div>
          <div className="text-xs text-white/50">2030 projected adoption</div>

          <AnimatePresence>
            {hoveredOverlay === "glp1" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-3 pt-3 border-t border-white/10 text-xs space-y-1"
              >
                <div className="flex justify-between">
                  <span className="text-white/60">Current (2026)</span>
                  <span className="text-amber-400 font-medium">3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Growth Rate</span>
                  <span className="text-amber-400 font-medium">+35% YoY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Avg. Annual Cost</span>
                  <span className="text-red-400 font-medium">$18,000</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Center - Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm font-semibold tracking-widest text-cyan-400 mb-4 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
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
              className="mt-8 text-sm text-white/50 max-w-2xl mx-auto px-4 flex items-center justify-center gap-4"
            >
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Real-time intelligence
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <LineChart className="w-3 h-3" />
                Multi-year projections
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Fiduciary-grade
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ y: [0, 700, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950 pointer-events-none" />
    </div>
  );
}