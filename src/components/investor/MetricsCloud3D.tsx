import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface Metric {
  label: string;
  value: string;
  position: [number, number, number];
  color: string;
}

function MetricNode({ metric }: { metric: Metric }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={metric.position}>
        {/* Value */}
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.8}
          color={metric.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {metric.value}
        </Text>

        {/* Label */}
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.3}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
        >
          {metric.label}
        </Text>

        {/* Glow Sphere */}
        <mesh ref={meshRef} position={[0, 0, -0.5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={metric.color}
            emissive={metric.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function MetricsCloud3D() {
  const metrics: Metric[] = [
    { label: "Market Size", value: "$850B", position: [-4, 2, 0], color: "#fbbf24" },
    { label: "TAM", value: "$120B", position: [4, 2, 0], color: "#f59e0b" },
    { label: "Accuracy", value: "99.7%", position: [-3, -1, 1], color: "#fbbf24" },
    { label: "Cost Savings", value: "40%", position: [3, -1, 1], color: "#f59e0b" },
    { label: "ROI", value: "10x", position: [0, 0, 2], color: "#fbbf24" },
    { label: "Growth", value: "300%", position: [0, 3, -1], color: "#f59e0b" },
  ];

  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />

        {metrics.map((metric, i) => (
          <MetricNode key={i} metric={metric} />
        ))}
      </Canvas>
    </div>
  );
}