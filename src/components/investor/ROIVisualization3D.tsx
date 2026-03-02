import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Box } from "@react-three/drei";
import * as THREE from "three";

function BarChart3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const data = [
    { label: "Year 1", value: 2.5, color: "#fbbf24" },
    { label: "Year 2", value: 5.0, color: "#f59e0b" },
    { label: "Year 3", value: 10.0, color: "#fbbf24" },
    { label: "Year 4", value: 18.0, color: "#f59e0b" },
    { label: "Year 5", value: 30.0, color: "#fbbf24" },
  ];

  return (
    <group ref={groupRef}>
      {data.map((item, i) => {
        const height = item.value / 2;
        const x = (i - 2) * 1.5;
        
        return (
          <group key={i} position={[x, 0, 0]}>
            {/* Bar */}
            <Box
              args={[0.8, height, 0.8]}
              position={[0, height / 2, 0]}
            >
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </Box>

            {/* Value Label */}
            <Text
              position={[0, height + 0.5, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Bold.woff"
            >
              {item.value}x
            </Text>

            {/* Year Label */}
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.25}
              color="#9ca3af"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.woff"
            >
              {item.label}
            </Text>
          </group>
        );
      })}

      {/* Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#18181b"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function ROIVisualization3D() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-amber-500/20">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-amber-100 mb-2">ROI Projection</h3>
        <p className="text-gray-400">5-Year Value Multiplier</p>
      </div>
      
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 5, 5]} intensity={0.5} color="#f59e0b" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.6}
          penumbra={0.5}
          intensity={0.8}
          color="#fbbf24"
        />

        <BarChart3D />
      </Canvas>
    </div>
  );
}