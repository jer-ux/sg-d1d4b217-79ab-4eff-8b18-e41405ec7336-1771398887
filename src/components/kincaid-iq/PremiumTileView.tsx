"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingDown, Shield, Activity, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TileProps {
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  href: string;
  gradient: string;
}

function PremiumTile({ title, subtitle, metric, metricLabel, description, icon: Icon, accentColor, href, gradient }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.02, z: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500"
          style={{ background: gradient }}
          animate={{ opacity: isHovered ? 0.4 : 0 }}
        />

        {/* Main card */}
        <motion.div
          className="relative h-[400px] rounded-3xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ background: gradient }}
          />

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            }}
            animate={{
              x: isHovered ? ["-100%", "200%"] : "-100%",
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          />

          {/* Content */}
          <div className="relative h-full p-8 flex flex-col" style={{ transform: "translateZ(50px)" }}>
            {/* Icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: gradient,
                boxShadow: `0 8px 32px ${accentColor}40`,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>

            {/* Title */}
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
              <p className="text-sm text-white/50">{subtitle}</p>
            </div>

            {/* Metric */}
            <motion.div
              className="mt-auto mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-1" style={{ color: accentColor }}>
                {metric}
              </div>
              <div className="text-sm text-white/60">{metricLabel}</div>
            </motion.div>

            {/* Description */}
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {description}
            </p>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: accentColor }}
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Reflection effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
            style={{ transform: "translateZ(25px)" }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}

export function PremiumTileView() {
  const tiles: TileProps[] = [
    {
      title: "EBITDA Impact",
      subtitle: "Margin Leakage Analysis",
      metric: "$3.29M",
      metricLabel: "5-year cumulative exposure",
      description: "Real-time quantification of PBM spread differentials, rebate retention, and structural arbitrage impact on enterprise margin.",
      icon: TrendingDown,
      accentColor: "#ef4444",
      href: "/war-room",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    },
    {
      title: "Arbitrage Events",
      subtitle: "Active Variance Signals",
      metric: "127",
      metricLabel: "Identified opportunities",
      description: "Continuous monitoring across formulary tiers, specialty channels, and therapeutic classes to surface pricing inefficiencies.",
      icon: Target,
      accentColor: "#f59e0b",
      href: "/arbitrage-events",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
    {
      title: "GLP-1 Exposure",
      subtitle: "Utilization Trajectory",
      metric: "14.1%",
      metricLabel: "Projected 2030 penetration",
      description: "Multi-year diffusion modeling tracking weight loss and diabetes medication adoption with $18K average annual cost.",
      icon: Activity,
      accentColor: "#06b6d4",
      href: "/kincaid-iq#modeling",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    },
    {
      title: "Fiduciary Grade",
      subtitle: "Audit-Ready Evidence",
      metric: "SOC 2",
      metricLabel: "Type II certified",
      description: "Every calculation backed by immutable evidence lineage, disclosed assumptions, and board-ready reconciliation to P&L impact.",
      icon: Shield,
      accentColor: "#10b981",
      href: "/platform",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            LIVE INTELLIGENCE DASHBOARD
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            The War Room Command Center
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Four-tile executive interface delivering real-time pharmacy benefit economics intelligence with board-ready precision
          </p>
        </motion.div>

        {/* Tiles grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ perspective: "2000px" }}
        >
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <PremiumTile {...tile} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link href="/war-room">
            <motion.button
              className="px-8 py-4 rounded-2xl font-semibold text-black"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)",
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Enter Full War Room Interface
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}