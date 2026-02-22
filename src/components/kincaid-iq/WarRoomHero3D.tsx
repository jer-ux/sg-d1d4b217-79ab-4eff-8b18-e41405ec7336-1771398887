"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

interface Alert {
  id: string;
  message: string;
  value: string;
  timestamp: string;
  severity: "high" | "medium" | "low";
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface VegasBeam {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  color: string;
  intensity: number;
}

const ALERT_TYPES = [
  { message: "Rebate variance detected", value: "$142K", severity: "high" as const },
  { message: "Formulary steering detected", value: "$89K", severity: "medium" as const },
  { message: "MAC pricing variance", value: "3.2%", severity: "high" as const },
  { message: "Wegovy adoption acceleration", value: "+24%", severity: "medium" as const },
  { message: "Specialty pharmacy markup", value: "$156K", severity: "high" as const },
  { message: "AWP deviation identified", value: "4.1%", severity: "low" as const },
  { message: "GLP-1 utilization spike", value: "+18%", severity: "medium" as const },
  { message: "Spread differential anomaly", value: "$203K", severity: "high" as const },
];

export function WarRoomHero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [vegasBeams, setVegasBeams] = useState<VegasBeam[]>([]);
  const [hoveredOverlay, setHoveredOverlay] = useState<string | null>(null);
  
  // Dynamic metrics
  const [ebitdaImpact, setEbitdaImpact] = useState(-3.29);
  const [glp1Percent, setGlp1Percent] = useState(14.1);
  const [alertCount, setAlertCount] = useState(3);
  const [systemStatus, setSystemStatus] = useState<"ACTIVE MONITORING" | "DEEP SCAN MODE" | "ALERT CONDITION">("ACTIVE MONITORING");
  
  // Live alerts feed
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", message: "Rebate variance detected", value: "$142K", timestamp: "2m ago", severity: "high" },
    { id: "2", message: "GLP-1 utilization spike", value: "+18%", timestamp: "8m ago", severity: "medium" },
    { id: "3", message: "Spread differential anomaly", value: "$203K", timestamp: "15m ago", severity: "high" },
  ]);

  // Initialize Vegas beams
  useEffect(() => {
    const beams: VegasBeam[] = [];
    for (let i = 0; i < 6; i++) {
      beams.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        angle: Math.random() * 360,
        length: 150 + Math.random() * 150,
        color: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#ef4444" : "#f59e0b",
        intensity: 0.3 + Math.random() * 0.3,
      });
    }
    setVegasBeams(beams);
  }, []);

  // Animate Vegas beams - optimized with less frequent updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVegasBeams(prev => prev.map(beam => ({
        ...beam,
        angle: (beam.angle + 0.3) % 360,
        intensity: 0.3 + Math.sin(Date.now() / 1500 + beam.id) * 0.15,
      })));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Update live metrics - less frequent updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEbitdaImpact(prev => -3.27 + Math.random() * -0.04);
      setGlp1Percent(prev => 13.9 + Math.random() * 0.4);
      setAlertCount(prev => Math.floor(2 + Math.random() * 2));
      
      const statuses: ("ACTIVE MONITORING" | "DEEP SCAN MODE" | "ALERT CONDITION")[] = ["ACTIVE MONITORING", "DEEP SCAN MODE", "ALERT CONDITION"];
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Generate new alerts - less frequent
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = ALERT_TYPES[Math.floor(Math.random() * ALERT_TYPES.length)];
      setAlerts(prev => {
        const updated = [
          {
            id: Date.now().toString(),
            ...newAlert,
            timestamp: "Just now",
          },
          ...prev.slice(0, 4),
        ];
        return updated;
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Optimized particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Context setup - explicit type assertion for React 19 compatibility
    const context = (canvas as HTMLCanvasElement).getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    // Reduced particle count from 80 to 50
    const initParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initParticles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#ef4444" : "#f59e0b",
        size: 1 + Math.random() * 1.5,
        life: 1,
      });
    }
    setParticles(initParticles);

    let lastTime = Date.now();
    const targetFPS = 30; // Target 30 FPS instead of 60
    const frameInterval = 1000 / targetFPS;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastTime;

      if (elapsed > frameInterval) {
        lastTime = now - (elapsed % frameInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Simplified grid with fewer lines
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI / 6);

        const gridSize = 80; // Increased grid size for fewer lines
        const gridCount = 12; // Reduced from 20 to 12
        
        for (let i = -gridCount; i <= gridCount; i += 2) { // Skip every other line
          ctx.shadowBlur = 10; // Reduced blur
          ctx.shadowColor = "#06b6d4";
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 - Math.abs(i) / gridCount * 0.08})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-gridSize * gridCount, i * gridSize);
          ctx.lineTo(gridSize * gridCount, i * gridSize);
          ctx.stroke();

          ctx.shadowColor = "#ef4444";
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.12 - Math.abs(i) / gridCount * 0.08})`;
          ctx.beginPath();
          ctx.moveTo(i * gridSize, -gridSize * gridCount);
          ctx.lineTo(i * gridSize, gridSize * gridCount);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.restore();

        // Optimized Vegas beams
        vegasBeams.forEach(beam => {
          ctx.save();
          ctx.translate(canvas.width * beam.x / 100, canvas.height * beam.y / 100);
          ctx.rotate((beam.angle * Math.PI) / 180);

          const gradient = ctx.createLinearGradient(0, 0, beam.length, 0);
          gradient.addColorStop(0, beam.color + "00");
          gradient.addColorStop(0.5, beam.color + Math.floor(beam.intensity * 200).toString(16).padStart(2, "0"));
          gradient.addColorStop(1, beam.color + "00");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 15; // Reduced blur
          ctx.shadowColor = beam.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(beam.length, 0);
          ctx.stroke();

          ctx.restore();
        });

        // Optimized particle rendering
        const newParticles = particles.map(p => {
          let newVx = p.vx;
          let newVy = p.vy;

          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150 && distance > 0) { // Reduced influence range
            const force = (150 - distance) / 150 * 0.015; // Reduced force
            newVx += (dx / distance) * force;
            newVy += (dy / distance) * force;
          }

          let newX = p.x + newVx;
          let newY = p.y + newVy;

          if (newX < 0) newX = canvas.width;
          if (newX > canvas.width) newX = 0;
          if (newY < 0) newY = canvas.height;
          if (newY > canvas.height) newY = 0;

          ctx.shadowBlur = 10; // Reduced blur
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(newX, newY, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Simplified trail
          ctx.shadowBlur = 5;
          ctx.strokeStyle = p.color + "60";
          ctx.lineWidth = p.size * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(newX, newY);
          ctx.stroke();

          return { ...p, x: newX, y: newY, vx: newVx * 0.98, vy: newVy * 0.98 };
        });

        setParticles(newParticles);

        // Optimized connections - only draw between closer particles
        newParticles.forEach((p1, i) => {
          newParticles.slice(i + 1, i + 6).forEach(p2 => {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const opacity = (1 - distance / 100) * 0.3;
              ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.shadowBlur = 3;
              ctx.shadowColor = "#06b6d4";
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });

        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, vegasBeams]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-400 border-red-500/30";
      case "medium": return "text-amber-400 border-amber-500/30";
      case "low": return "text-cyan-400 border-cyan-500/30";
      default: return "text-white/60 border-white/10";
    }
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" onMouseMove={handleMouseMove}>
      {/* Canvas for particles, grid, and Vegas beams */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated scanning lines - optimized */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(6, 182, 212, 0.02) 50px, rgba(6, 182, 212, 0.02) 51px)",
          filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.3))",
        }}
      />

      {/* Radial spotlight - optimized */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Optimized pulsing halos */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ background: "radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)" }}
      />

      {/* Center title with optimized glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{
              textShadow: [
                "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)",
                "0 0 30px rgba(239, 68, 68, 0.4), 0 0 60px rgba(239, 68, 68, 0.2)",
                "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent mb-4"
          >
            The War Room
          </motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-xl md:text-2xl text-white/80 font-light tracking-wide"
            style={{
              textShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            }}
          >
            Pharmacy Benefit Economics
          </motion.div>
        </motion.div>
      </div>

      {/* Corner brackets - optimized animations */}
      {[
        { top: "20px", left: "20px", rotate: "0deg" },
        { top: "20px", right: "20px", rotate: "90deg" },
        { bottom: "20px", right: "20px", rotate: "180deg" },
        { bottom: "20px", left: "20px", rotate: "270deg" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16"
          style={{ ...pos }}
          animate={{
            opacity: [0.25, 0.7, 0.25],
            filter: [
              "drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))",
              "drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))",
              "drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        >
          <div className="w-full h-full border-t-2 border-l-2 border-cyan-400" style={{ transform: `rotate(${pos.rotate})` }} />
        </motion.div>
      ))}

      {/* HUD Overlays - keep as is but with optimized animations */}
      
      {/* Top Left - System Status */}
      <motion.div
        className="absolute top-8 left-8 cursor-pointer"
        onMouseEnter={() => setHoveredOverlay("status")}
        onMouseLeave={() => setHoveredOverlay(null)}
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: [
            "0 0 15px rgba(6, 182, 212, 0.2)",
            "0 0 30px rgba(6, 182, 212, 0.4)",
            "0 0 15px rgba(6, 182, 212, 0.2)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div 
          className="rounded-xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-md p-4 min-w-[220px]"
          style={{
            boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 8px rgba(6, 182, 212, 0.4)",
                  "0 0 15px rgba(6, 182, 212, 0.8)",
                  "0 0 8px rgba(6, 182, 212, 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <span className="text-xs font-medium text-cyan-400 tracking-wider">SYSTEM STATUS</span>
          </div>
          <motion.div 
            className="text-lg font-semibold text-white"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {systemStatus}
          </motion.div>
          
          <AnimatePresence>
            {hoveredOverlay === "status" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-cyan-500/20 space-y-1"
              >
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Uptime</span>
                  <span className="text-cyan-400 font-medium">99.97%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Data Points</span>
                  <span className="text-cyan-400 font-medium">2.4M+</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Top Right - Alert Monitor */}
      <motion.div
        className="absolute top-8 right-8 cursor-pointer"
        onMouseEnter={() => setHoveredOverlay("alerts")}
        onMouseLeave={() => setHoveredOverlay(null)}
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: [
            "0 0 15px rgba(239, 68, 68, 0.2)",
            "0 0 30px rgba(239, 68, 68, 0.4)",
            "0 0 15px rgba(239, 68, 68, 0.2)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <motion.div 
          className="rounded-xl border border-red-500/30 bg-slate-950/80 backdrop-blur-md p-4 min-w-[220px]"
          style={{
            boxShadow: "inset 0 0 20px rgba(239, 68, 68, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <AlertTriangle className="w-4 h-4 text-red-400" style={{ filter: "drop-shadow(0 0 5px rgba(239, 68, 68, 0.8))" }} />
            </motion.div>
            <span className="text-xs font-medium text-red-400 tracking-wider">VARIANCE ALERTS</span>
          </div>
          <div className="text-2xl font-bold text-white">{alertCount}</div>
          <div className="text-xs text-white/50 mt-1">Active signals</div>
          
          <AnimatePresence>
            {hoveredOverlay === "alerts" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-red-500/20 space-y-2 max-h-[200px] overflow-y-auto"
              >
                {alerts.slice(0, 5).map((alert, i) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`text-xs p-2 rounded border ${getSeverityColor(alert.severity)} bg-slate-900/50`}
                    style={{
                      boxShadow: `0 0 10px ${alert.severity === "high" ? "rgba(239, 68, 68, 0.3)" : alert.severity === "medium" ? "rgba(245, 158, 11, 0.3)" : "rgba(6, 182, 212, 0.3)"}`,
                    }}
                  >
                    <div className="font-medium">{alert.message}</div>
                    <div className="flex justify-between mt-1">
                      <span className={getSeverityColor(alert.severity).split(" ")[0]}>{alert.value}</span>
                      <span className="text-white/40">{alert.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom Left - EBITDA Impact */}
      <motion.div
        className="absolute bottom-8 left-8 cursor-pointer"
        onMouseEnter={() => setHoveredOverlay("ebitda")}
        onMouseLeave={() => setHoveredOverlay(null)}
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: [
            "0 0 15px rgba(239, 68, 68, 0.2)",
            "0 0 30px rgba(239, 68, 68, 0.4)",
            "0 0 15px rgba(239, 68, 68, 0.2)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <motion.div 
          className="rounded-xl border border-red-500/30 bg-slate-950/80 backdrop-blur-md p-4 min-w-[220px]"
          style={{
            boxShadow: "inset 0 0 20px rgba(239, 68, 68, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" style={{ filter: "drop-shadow(0 0 5px rgba(239, 68, 68, 0.8))" }} />
            <span className="text-xs font-medium text-red-400 tracking-wider">EBITDA IMPACT</span>
          </div>
          <motion.div 
            className="text-2xl font-bold text-red-400"
            animate={{ 
              textShadow: [
                "0 0 8px rgba(239, 68, 68, 0.4)",
                "0 0 15px rgba(239, 68, 68, 0.8)",
                "0 0 8px rgba(239, 68, 68, 0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ${ebitdaImpact.toFixed(2)}M
          </motion.div>
          <div className="text-xs text-white/50 mt-1">Cumulative leakage</div>
          
          <AnimatePresence>
            {hoveredOverlay === "ebitda" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-red-500/20 space-y-1"
              >
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Annual Impact</span>
                  <span className="text-red-400 font-medium">-$0.97M</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Margin Drag</span>
                  <span className="text-red-400 font-medium">-5.2%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Recovery Potential</span>
                  <span className="text-green-400 font-medium">$2.1M</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom Right - GLP-1 Monitor */}
      <motion.div
        className="absolute bottom-8 right-8 cursor-pointer"
        onMouseEnter={() => setHoveredOverlay("glp1")}
        onMouseLeave={() => setHoveredOverlay(null)}
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: [
            "0 0 15px rgba(245, 158, 11, 0.2)",
            "0 0 30px rgba(245, 158, 11, 0.4)",
            "0 0 15px rgba(245, 158, 11, 0.2)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <motion.div 
          className="rounded-xl border border-amber-500/30 bg-slate-950/80 backdrop-blur-md p-4 min-w-[220px]"
          style={{
            boxShadow: "inset 0 0 20px rgba(245, 158, 11, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="w-4 h-4 text-amber-400" style={{ filter: "drop-shadow(0 0 5px rgba(245, 158, 11, 0.8))" }} />
            </motion.div>
            <span className="text-xs font-medium text-amber-400 tracking-wider">GLP-1 EXPOSURE</span>
          </div>
          <motion.div 
            className="text-2xl font-bold text-amber-400"
            animate={{ 
              textShadow: [
                "0 0 8px rgba(245, 158, 11, 0.4)",
                "0 0 15px rgba(245, 158, 11, 0.8)",
                "0 0 8px rgba(245, 158, 11, 0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {glp1Percent.toFixed(1)}%
          </motion.div>
          <div className="text-xs text-white/50 mt-1">Projected 2030</div>
          
          <AnimatePresence>
            {hoveredOverlay === "glp1" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-amber-500/20 space-y-1"
              >
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Current (2026)</span>
                  <span className="text-amber-400 font-medium">3.2%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Growth Rate</span>
                  <span className="text-amber-400 font-medium">+35% YoY</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Avg. Annual Cost</span>
                  <span className="text-amber-400 font-medium">$18,000</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-radial from-transparent via-transparent to-slate-950 pointer-events-none" />
    </div>
  );
}