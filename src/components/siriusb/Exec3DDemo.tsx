"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type Accent = "governance" | "data" | "ai" | "people" | "value";

interface Exec3DDemoProps {
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
  accent: Accent;
}

const accentColors: Record<Accent, string> = {
  governance: "#3b82f6", // blue
  data: "#10b981", // green
  ai: "#8b5cf6", // purple
  people: "#f59e0b", // amber
  value: "#ec4899", // pink
};

function DataNode({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function ConnectionLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} opacity={0.3} transparent />
    </line>
  );
}

function CentralCore({ accent }: { accent: Accent }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = accentColors[accent];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          distort={0.3}
          speed={2}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

function DataOrbit({ accent }: { accent: Accent }) {
  const color = accentColors[accent];
  
  const nodes: Array<{ pos: [number, number, number]; scale: number }> = useMemo(
    () => [
      { pos: [2.5, 0.5, 0], scale: 0.8 },
      { pos: [-2.5, -0.3, 0.5], scale: 0.9 },
      { pos: [0, 1.8, 2], scale: 0.7 },
      { pos: [1.5, -1.5, -1.8], scale: 0.85 },
      { pos: [-1.8, 0.8, -2.2], scale: 0.75 },
      { pos: [0.5, -2, 1.5], scale: 0.8 },
    ],
    []
  );

  return (
    <>
      {nodes.map((node, i) => (
        <DataNode key={i} position={node.pos} color={color} scale={node.scale} />
      ))}
      {nodes.map((node, i) => (
        <ConnectionLine key={`line-${i}`} start={[0, 0, 0]} end={node.pos} color={color} />
      ))}
    </>
  );
}

function AnimatedCamera({ position, lookAt }: { position: [number, number, number]; lookAt: [number, number, number] }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (cameraRef.current) {
      // Smooth camera transition
      cameraRef.current.position.lerp(new THREE.Vector3(...position), 0.05);
      
      const targetLookAt = new THREE.Vector3(...lookAt);
      const currentLookAt = new THREE.Vector3();
      cameraRef.current.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(-1).add(cameraRef.current.position);
      currentLookAt.lerp(targetLookAt, 0.05);
      cameraRef.current.lookAt(currentLookAt);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={50} near={0.1} far={1000} />;
}

function Scene({ accent }: { accent: Accent }) {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color={accentColors[accent]} />
      
      {/* Core and data nodes */}
      <CentralCore accent={accent} />
      <DataOrbit accent={accent} />

      {/* Subtle grid helper */}
      <gridHelper args={[20, 20, accentColors[accent], "#333333"]} position={[0, -3, 0]} />
    </>
  );
}

export default function Exec3DDemo({ cameraPosition, cameraLookAt, accent }: Exec3DDemoProps) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <AnimatedCamera position={cameraPosition} lookAt={cameraLookAt} />
        <Scene accent={accent} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
      </Canvas>
    </div>
  );
}