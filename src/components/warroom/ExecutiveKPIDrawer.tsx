import React, { useState, useMemo } from "react";
import { X, TrendingUp, TrendingDown, AlertTriangle, Activity, DollarSign, Zap, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Cone, Torus } from "@react-three/drei";
import * as THREE from "three";
import type { TileData } from "./executiveTypes";

interface ExecutiveKPIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tile: TileData | null;
}

// 3D Component for Cost Trend Stress Test
function StressSpheres() {
  const meshRef = React.useRef<THREE.Group>(null);
  const spheres = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * spheres[i].speed) * 0.01;
      });
    }
  });

  return (
    <group ref={meshRef}>
      {spheres.map((sphere, i) => (
        <Sphere key={i} args={[sphere.scale, 32, 32]} position={sphere.position}>
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ef4444" : "#10b981"}
            emissive={i % 2 === 0 ? "#dc2626" : "#059669"}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      ))}
      <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          transmission={0.3}
          thickness={1}
        />
      </Sphere>
      <gridHelper args={[20, 20, "#fbbf24", "#374151"]} />
    </group>
  );
}

// 3D Component for Premium Leakage Map
function LeakageNetwork() {
  const meshRef = React.useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        Math.cos((i / 20) * Math.PI * 2) * 4,
        (Math.random() - 0.5) * 6,
        Math.sin((i / 20) * Math.PI * 2) * 4,
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.2,
    }));
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={meshRef}>
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <Cone args={[node.scale, node.scale * 2, 8]} position={node.position} rotation={[Math.PI, 0, 0]}>
            <meshStandardMaterial
              color="#ef4444"
              emissive="#dc2626"
              emissiveIntensity={0.4}
              roughness={0.3}
              metalness={0.7}
            />
          </Cone>
          {i < nodes.length - 1 && (
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 
                Math.sqrt(
                  Math.pow(nodes[i + 1].position[0] - node.position[0], 2) +
                  Math.pow(nodes[i + 1].position[1] - node.position[1], 2) +
                  Math.pow(nodes[i + 1].position[2] - node.position[2], 2)
                )
              ]} />
              <meshBasicMaterial color="#fbbf24" opacity={0.3} transparent />
            </mesh>
          )}
        </React.Fragment>
      ))}
      <Torus args={[5, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.3} />
      </Torus>
    </group>
  );
}

// 3D Component for Claims Velocity
function VelocityWaves() {
  const meshRef = React.useRef<THREE.Group>(null);
  const waves = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      radius: i * 0.8 + 1,
      speed: (8 - i) * 0.05,
    }));
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * waves[i].speed) * 0.2;
        child.scale.set(scale, scale, scale);
      });
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      {waves.map((wave, i) => (
        <Torus key={i} args={[wave.radius, 0.15, 16, 100]}>
          <meshStandardMaterial
            color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
            emissive={i % 2 === 0 ? "#2563eb" : "#7c3aed"}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8 - i * 0.08}
          />
        </Torus>
      ))}
      <Sphere args={[0.5, 32, 32]}>
        <meshPhysicalMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </group>
  );
}

// 3D Component for Network Utilization
function NetworkGrid() {
  const meshRef = React.useRef<THREE.Group>(null);
  const cubes = useMemo(() => {
    return Array.from({ length: 64 }, (_, i) => ({
      position: [
        (i % 8 - 3.5) * 1.2,
        (Math.random() - 0.5) * 4,
        (Math.floor(i / 8) - 3.5) * 1.2,
      ] as [number, number, number],
      height: Math.random() * 2 + 0.5,
      utilization: Math.random(),
    }));
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.children.forEach((child, i) => {
        const newY = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.3;
        child.position.y = cubes[i].position[1] + newY;
      });
    }
  });

  return (
    <group ref={meshRef}>
      {cubes.map((cube, i) => (
        <Box key={i} args={[0.8, cube.height, 0.8]} position={cube.position}>
          <meshStandardMaterial
            color={cube.utilization > 0.7 ? "#10b981" : cube.utilization > 0.4 ? "#fbbf24" : "#ef4444"}
            emissive={cube.utilization > 0.7 ? "#059669" : cube.utilization > 0.4 ? "#f59e0b" : "#dc2626"}
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.7}
          />
        </Box>
      ))}
      <gridHelper args={[12, 12, "#fbbf24", "#374151"]} position={[0, -3, 0]} />
    </group>
  );
}

export function ExecutiveKPIDrawer({ isOpen, onClose, tile }: ExecutiveKPIDrawerProps) {
  if (!tile) return null;

  const getIcon = () => {
    switch (tile.key) {
      case "costTrendStress":
        return <TrendingUp className="w-6 h-6" />;
      case "premiumLeakage":
        return <DollarSign className="w-6 h-6" />;
      case "claimsVelocity":
        return <Zap className="w-6 h-6" />;
      case "networkUtil":
        return <Activity className="w-6 h-6" />;
      default:
        return <AlertTriangle className="w-6 h-6" />;
    }
  };

  const get3DVisualization = () => {
    switch (tile.key) {
      case "costTrendStress":
        return <StressSpheres />;
      case "premiumLeakage":
        return <LeakageNetwork />;
      case "claimsVelocity":
        return <VelocityWaves />;
      case "networkUtil":
        return <NetworkGrid />;
      default:
        return <StressSpheres />;
    }
  };

  const get3DDescription = () => {
    switch (tile.key) {
      case "costTrendStress":
        return "Stress factors visualized as floating spheres - red indicates negative variance, green shows positive trends";
      case "premiumLeakage":
        return "Network map showing premium leakage points - cones represent leak magnitude, connections show flow paths";
      case "claimsVelocity":
        return "Pulsing waves represent claims processing velocity - faster pulses indicate higher throughput";
      case "networkUtil":
        return "3D grid showing network utilization - green bars indicate optimal usage, red shows underutilization";
      default:
        return "";
    }
  };

  // Safe variance value - handles undefined/null cases
  const varianceValue = tile.variance || tile.delta || "0%";
  const isNegativeVariance = varianceValue.toString().includes("-");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-[101] overflow-y-auto border-l border-amber-500/20"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-amber-500/20 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-amber-500/30">
                    {getIcon()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{tile.label}</h2>
                    <p className="text-slate-400">{tile.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* 3D Visualization */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative h-[400px] rounded-xl overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-slate-900/50 to-purple-900/20"
              >
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} color="#fbbf24" />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                  <spotLight position={[0, 15, 0]} intensity={0.6} angle={0.3} penumbra={1} color="#fbbf24" />
                  {get3DVisualization()}
                  <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
                
                {/* Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-4 border border-amber-500/30">
                  <p className="text-sm text-slate-300">{get3DDescription()}</p>
                  <div className="flex gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"></div>
                      <span className="text-xs text-slate-400">Variance: {varianceValue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span className="text-xs text-slate-400">Trend: {tile.trend || "Flat"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-500/20"
                >
                  <div className="text-sm text-slate-400 mb-1">Current Value</div>
                  <div className="text-2xl font-bold text-white">{tile.value}</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-500/20"
                >
                  <div className="text-sm text-slate-400 mb-1">Framework</div>
                  <div className="text-lg font-semibold text-white">{tile.framework || "Standard"}</div>
                </motion.div>
              </div>

              {/* Variance Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800/60 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Variance Analysis</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isNegativeVariance
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {varianceValue}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-zinc-400">Trend Direction</div>
                    <div className="flex items-center gap-2">
                      {(tile.trend || "flat").toLowerCase() === "up" ? (
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      ) : (tile.trend || "flat").toLowerCase() === "down" ? (
                        <TrendingDown className="h-5 w-5 text-red-400" />
                      ) : (
                        <ArrowRight className="h-5 w-5 text-zinc-400" />
                      )}
                      <span className="text-white font-medium capitalize">{tile.trend || "Flat"}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-zinc-400">Framework</div>
                    <div className="text-white font-medium">{tile.framework || "Standard"}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}