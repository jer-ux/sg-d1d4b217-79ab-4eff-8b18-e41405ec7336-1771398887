import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import * as THREE from "three";

interface Bar3DProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  value: string;
  onHover: (label: string, value: string) => void;
}

function Bar3D({ position, height, color, label, value, onHover }: Bar3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onPointerOver={() => {
          setHovered(true);
          onHover(label, value);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.2}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {label}
      </Text>
    </group>
  );
}

export function RiskDistribution3D() {
  const [hoveredInfo, setHoveredInfo] = useState({ label: "", value: "" });

  const riskData = [
    { label: "Very Low", height: 1.2, color: "#10b981", value: "15.2%" },
    { label: "Low", height: 2.1, color: "#22c55e", value: "28.4%" },
    { label: "Moderate", height: 3.8, color: "#eab308", value: "35.7%" },
    { label: "High", height: 2.5, color: "#f97316", value: "16.1%" },
    { label: "Very High", height: 1.0, color: "#ef4444", value: "4.6%" },
  ];

  const handleHover = (label: string, value: string) => {
    setHoveredInfo({ label, value });
  };

  return (
    <div className="relative w-full h-[500px] rounded-2xl bg-gray-900/50 border border-gray-800 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xl font-bold mb-1">Risk Distribution</h3>
        <p className="text-sm text-gray-400">Member population by risk score</p>
        {hoveredInfo.label && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-700"
          >
            <p className="text-sm font-semibold">{hoveredInfo.label}</p>
            <p className="text-lg font-bold text-purple-400">{hoveredInfo.value}</p>
          </motion.div>
        )}
      </div>
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 6, 8]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {riskData.map((data, index) => (
          <Bar3D
            key={index}
            position={[(index - 2) * 1.5, 0, 0]}
            height={data.height}
            color={data.color}
            label={data.label}
            value={data.value}
            onHover={handleHover}
          />
        ))}

        {/* Grid */}
        <gridHelper args={[12, 12, "#374151", "#1f2937"]} position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}