import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

interface TimelineNode {
  quarter: string;
  milestone: string;
  position: [number, number, number];
}

function TimelineNode3D({ node, index }: { node: TimelineNode; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={node.position}>
      {/* Node Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Quarter Label */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.2}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {node.quarter}
      </Text>

      {/* Milestone Text */}
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.15}
        color="#d1d5db"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
        font="/fonts/Inter-Regular.woff"
      >
        {node.milestone}
      </Text>
    </group>
  );
}

function TimelinePath({ nodes }: { nodes: TimelineNode[] }) {
  const points = nodes.map(node => new THREE.Vector3(...node.position));

  return (
    <Line
      points={points}
      color="#f59e0b"
      lineWidth={2}
      opacity={0.6}
      transparent
    />
  );
}

export default function Timeline3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const timelineNodes: TimelineNode[] = [
    { quarter: "Q1 2026", milestone: "Beta Launch", position: [-6, 0, 0] },
    { quarter: "Q2 2026", milestone: "First Enterprise Clients", position: [-4, 0.5, 0.5] },
    { quarter: "Q3 2026", milestone: "Platform v2.0", position: [-2, 1, 0] },
    { quarter: "Q4 2026", milestone: "Series A", position: [0, 0.5, -0.5] },
    { quarter: "Q1 2027", milestone: "Market Expansion", position: [2, 0, 0] },
    { quarter: "Q2 2027", milestone: "10M ARR", position: [4, 0.5, 0.5] },
    { quarter: "Q3 2027", milestone: "Strategic Partnerships", position: [6, 0, 0] },
  ];

  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 5, 5]} intensity={0.5} color="#f59e0b" />

        <group ref={groupRef}>
          <TimelinePath nodes={timelineNodes} />
          {timelineNodes.map((node, i) => (
            <TimelineNode3D key={i} node={node} index={i} />
          ))}
        </group>
      </Canvas>
    </div>
  );
}