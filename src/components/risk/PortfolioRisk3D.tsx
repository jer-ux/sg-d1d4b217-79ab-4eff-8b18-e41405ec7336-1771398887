import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import * as THREE from "three";

interface ClusterBar3DProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  value: string;
  onHover: (info: { category: string; metric: string; value: string }) => void;
  category: string;
}

function ClusterBar3D({ position, height, color, label, value, onHover, category }: ClusterBar3DProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={[position[0], height / 2, position[2]]}
      onPointerOver={() => {
        setHovered(true);
        onHover({ category, metric: label, value });
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.6 : 0.3}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

export function PortfolioRisk3D() {
  const [hoveredInfo, setHoveredInfo] = useState<{ category: string; metric: string; value: string } | null>(null);

  const portfolioData = [
    {
      category: "Medical",
      color: "#8b5cf6",
      metrics: [
        { label: "Claims", height: 3.2, value: "$124M" },
        { label: "Risk", height: 2.8, value: "High" },
        { label: "Trend", height: 2.1, value: "+8.2%" },
      ],
    },
    {
      category: "Rx",
      color: "#ec4899",
      metrics: [
        { label: "Claims", height: 2.5, value: "$87M" },
        { label: "Risk", height: 3.5, value: "V.High" },
        { label: "Trend", height: 3.0, value: "+12.4%" },
      ],
    },
    {
      category: "Dental",
      color: "#06b6d4",
      metrics: [
        { label: "Claims", height: 1.2, value: "$24M" },
        { label: "Risk", height: 1.5, value: "Low" },
        { label: "Trend", height: 1.0, value: "+3.1%" },
      ],
    },
    {
      category: "Vision",
      color: "#10b981",
      metrics: [
        { label: "Claims", height: 0.8, value: "$8M" },
        { label: "Risk", height: 1.0, value: "V.Low" },
        { label: "Trend", height: 0.7, value: "+1.8%" },
      ],
    },
  ];

  return (
    <div className="relative w-full h-[500px] rounded-2xl bg-gray-900/50 border border-gray-800 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xl font-bold mb-1">Portfolio Risk Analysis</h3>
        <p className="text-sm text-gray-400">Multi-dimensional risk view across benefit lines</p>
        {hoveredInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-700"
          >
            <p className="text-xs text-gray-400">{hoveredInfo.category}</p>
            <p className="text-sm font-semibold">{hoveredInfo.metric}</p>
            <p className="text-lg font-bold text-purple-400">{hoveredInfo.value}</p>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex gap-3">
        {portfolioData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-400">{item.category}</span>
          </div>
        ))}
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[10, 8, 10]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={18}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={1.2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.6} />

        {portfolioData.map((category, catIdx) => (
          <group key={catIdx} position={[(catIdx - 1.5) * 2.5, 0, 0]}>
            {category.metrics.map((metric, metIdx) => (
              <ClusterBar3D
                key={metIdx}
                position={[metIdx * 0.7 - 0.7, 0, 0]}
                height={metric.height}
                color={category.color}
                label={metric.label}
                value={metric.value}
                onHover={setHoveredInfo}
                category={category.category}
              />
            ))}
            <Text
              position={[0, -0.4, 0]}
              fontSize={0.25}
              color="#9ca3af"
              anchorX="center"
              anchorY="middle"
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {category.category}
            </Text>
          </group>
        ))}

        <gridHelper args={[15, 15, "#374151", "#1f2937"]} position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}