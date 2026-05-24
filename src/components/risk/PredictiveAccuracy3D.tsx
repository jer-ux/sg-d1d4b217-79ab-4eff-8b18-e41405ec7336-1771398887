import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import * as THREE from "three";

interface AccuracyBar3DProps {
  position: [number, number, number];
  actual: number;
  predicted: number;
  month: string;
  onHover: (info: { month: string; actual: string; predicted: string; accuracy: string }) => void;
}

function AccuracyBar3D({ position, actual, predicted, month, onHover }: AccuracyBar3DProps) {
  const [hovered, setHovered] = useState(false);
  const accuracy = ((1 - Math.abs(actual - predicted) / actual) * 100).toFixed(1);

  return (
    <group position={position}>
      {/* Actual bar */}
      <mesh
        position={[-0.25, actual / 2, 0]}
        onPointerOver={() => {
          setHovered(true);
          onHover({
            month,
            actual: `$${actual.toFixed(1)}M`,
            predicted: `$${predicted.toFixed(1)}M`,
            accuracy: `${accuracy}%`,
          });
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[0.4, actual, 0.4]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={hovered ? 0.6 : 0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Predicted bar */}
      <mesh
        position={[0.25, predicted / 2, 0]}
        onPointerOver={() => {
          setHovered(true);
          onHover({
            month,
            actual: `$${actual.toFixed(1)}M`,
            predicted: `$${predicted.toFixed(1)}M`,
            accuracy: `${accuracy}%`,
          });
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[0.4, predicted, 0.4]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={hovered ? 0.6 : 0.3}
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <Text
        position={[0, -0.3, 0]}
        fontSize={0.15}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {month}
      </Text>
    </group>
  );
}

export function PredictiveAccuracy3D() {
  const [hoveredInfo, setHoveredInfo] = useState<{
    month: string;
    actual: string;
    predicted: string;
    accuracy: string;
  } | null>(null);

  const accuracyData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, i) => {
      const actual = 15 + Math.sin(i * 0.5) * 2 + Math.random() * 1;
      const predicted = actual + (Math.random() - 0.5) * 0.4;
      return {
        month,
        actual,
        predicted,
        position: [(i - 5.5) * 1.2, 0, 0] as [number, number, number],
      };
    });
  }, []);

  const overallAccuracy = useMemo(() => {
    const accuracies = accuracyData.map(d => 
      ((1 - Math.abs(d.actual - d.predicted) / d.actual) * 100)
    );
    return (accuracies.reduce((a, b) => a + b, 0) / accuracies.length).toFixed(1);
  }, [accuracyData]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl bg-gray-900/50 border border-gray-800 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xl font-bold mb-1">Predictive Model Accuracy</h3>
        <p className="text-sm text-gray-400">Actual vs Predicted Claims - 12 Month View</p>
        {hoveredInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-700"
          >
            <p className="text-xs text-gray-400">{hoveredInfo.month}</p>
            <div className="flex items-center gap-3 mt-1">
              <div>
                <p className="text-xs text-cyan-400">Actual</p>
                <p className="text-sm font-bold">{hoveredInfo.actual}</p>
              </div>
              <div>
                <p className="text-xs text-purple-400">Predicted</p>
                <p className="text-sm font-bold">{hoveredInfo.predicted}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Accuracy</p>
            <p className="text-lg font-bold text-green-400">{hoveredInfo.accuracy}</p>
          </motion.div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="px-3 py-2 rounded-lg bg-gray-800/90 border border-gray-700">
          <p className="text-xs text-gray-400">Overall Accuracy</p>
          <p className="text-2xl font-bold text-green-400">{overallAccuracy}%</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-cyan-500" />
          <span className="text-xs text-gray-400">Actual Claims</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500 opacity-80" />
          <span className="text-xs text-gray-400">Predicted Claims</span>
        </div>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 8, 16]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={12}
          maxDistance={22}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
        <ambientLight intensity={0.6} />
        <spotLight position={[15, 15, 15]} angle={0.4} penumbra={1} intensity={1.2} castShadow />
        <pointLight position={[-15, 10, -10]} intensity={0.6} />

        {accuracyData.map((data, index) => (
          <AccuracyBar3D
            key={index}
            position={data.position}
            actual={data.actual}
            predicted={data.predicted}
            month={data.month}
            onHover={setHoveredInfo}
          />
        ))}

        <gridHelper args={[20, 20, "#374151", "#1f2937"]} position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}