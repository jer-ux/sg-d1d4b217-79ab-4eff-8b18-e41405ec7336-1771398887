import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const nodes = [
    { pos: [0, 0, 0], scale: 1.5, label: "Core" },
    { pos: [3, 1, 2], scale: 0.8, label: "AI" },
    { pos: [-3, -1, 2], scale: 0.8, label: "Data" },
    { pos: [2, -2, -1], scale: 0.8, label: "Trust" },
    { pos: [-2, 2, -1], scale: 0.8, label: "Evidence" },
    { pos: [1, 3, 1], scale: 0.6, label: "Analytics" },
    { pos: [-1, -3, 1], scale: 0.6, label: "Insights" },
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            position={node.pos as [number, number, number]}
            scale={hovered === i ? node.scale * 1.2 : node.scale}
            onPointerOver={() => setHovered(i)}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={hovered === i ? "#fbbf24" : "#f59e0b"}
              emissive={hovered === i ? "#fbbf24" : "#f59e0b"}
              emissiveIntensity={hovered === i ? 0.8 : 0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Connection Lines */}
      {nodes.map((_, i) =>
        nodes.slice(i + 1).map((_, j) => {
          const start = new THREE.Vector3(...(nodes[i].pos as [number, number, number]));
          const end = new THREE.Vector3(...(nodes[i + j + 1].pos as [number, number, number]));
          const distance = start.distanceTo(end);
          
          return (
            <mesh
              key={`${i}-${j}`}
              position={[
                (start.x + end.x) / 2,
                (start.y + end.y) / 2,
                (start.z + end.z) / 2,
              ]}
              rotation={[
                0,
                Math.atan2(end.z - start.z, end.x - start.x),
                Math.atan2(end.y - start.y, Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2)),
              ]}
            >
              <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
              <meshStandardMaterial
                color="#f59e0b"
                emissive="#f59e0b"
                emissiveIntensity={0.3}
                transparent
                opacity={0.4}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
}

function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Center position={[0, -4, 0]}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.2}
        curveSegments={12}
      >
        SiriusB iQ
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Center>
  );
}

export default function Hero3DInvestor() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
        
        <NetworkNodes />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-4 px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            Algorithmic Fiduciary
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Transforming $850B in enterprise benefits waste into verifiable alpha
          </p>
        </div>
      </div>
    </div>
  );
}