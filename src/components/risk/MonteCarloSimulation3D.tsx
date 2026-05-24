import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera, Line } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

interface SimulationBar3DProps {
  position: [number, number, number];
  height: number;
  percentile: number;
  value: string;
  onHover: (percentile: number, value: string) => void;
}

function SimulationBar3D({ position, height, percentile, value, onHover }: SimulationBar3DProps) {
  const [hovered, setHovered] = useState(false);
  
  const color = useMemo(() => {
    if (percentile <= 50) return "#10b981";
    if (percentile <= 75) return "#eab308";
    if (percentile <= 95) return "#f97316";
    return "#ef4444";
  }, [percentile]);

  return (
    <mesh
      position={[position[0], height / 2, position[2]]}
      onPointerOver={() => {
        setHovered(true);
        onHover(percentile, value);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <boxGeometry args={[0.15, height, 0.15]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.7 : 0.4}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  );
}

function ConfidenceInterval() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 8 - 4;
      const normalDist = Math.exp(-Math.pow(i - 50, 2) / 400);
      const y = normalDist * 3.5;
      pts.push(new THREE.Vector3(x, y, -0.5));
    }
    return pts;
  }, []);

  return (
    <Line
      points={points}
      color="#8b5cf6"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
}

export function MonteCarloSimulation3D() {
  const [hoveredInfo, setHoveredInfo] = useState<{ percentile: number; value: string } | null>(null);

  const simulationData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= 100; i += 5) {
      const normalDist = Math.exp(-Math.pow(i - 50, 2) / 400);
      const height = normalDist * 3.5 + Math.random() * 0.3;
      const value = `$${(180 + (i - 50) * 0.8 + Math.random() * 10).toFixed(1)}M`;
      data.push({
        percentile: i,
        height,
        value,
        position: [(i / 100) * 8 - 4, 0, 0] as [number, number, number],
      });
    }
    return data;
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-2xl bg-gray-900/50 border border-gray-800 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xl font-bold mb-1">Monte Carlo Simulation</h3>
        <p className="text-sm text-gray-400">10,000 scenarios - Loss distribution analysis</p>
        {hoveredInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-700"
          >
            <p className="text-sm font-semibold">{hoveredInfo.percentile}th Percentile</p>
            <p className="text-lg font-bold text-purple-400">{hoveredInfo.value}</p>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 z-10 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-xs text-gray-400">≤50th (Low Risk)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-xs text-gray-400">50-75th (Moderate)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-xs text-gray-400">75-95th (High)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-xs text-gray-400">>95th (Extreme)</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <div className="px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-700">
          <p className="text-xs text-gray-400">Expected Loss</p>
          <p className="text-lg font-bold text-green-400">$187.2M</p>
          <p className="text-xs text-gray-400 mt-1">99.5% VaR</p>
          <p className="text-lg font-bold text-red-400">$224.8M</p>
        </div>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 6, 12]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={18}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.4} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {simulationData.map((data, index) => (
          <SimulationBar3D
            key={index}
            position={data.position}
            height={data.height}
            percentile={data.percentile}
            value={data.value}
            onHover={(p, v) => setHoveredInfo({ percentile: p, value: v })}
          />
        ))}

        <ConfidenceInterval />

        {/* Axis labels */}
        <Text
          position={[-4.5, -0.5, 0]}
          fontSize={0.2}
          color="#6b7280"
          anchorX="center"
        >
          P5
        </Text>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color="#6b7280"
          anchorX="center"
        >
          P50
        </Text>
        <Text
          position={[4.5, -0.5, 0]}
          fontSize={0.2}
          color="#6b7280"
          anchorX="center"
        >
          P95
        </Text>

        <gridHelper args={[12, 24, "#374151", "#1f2937"]} position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}