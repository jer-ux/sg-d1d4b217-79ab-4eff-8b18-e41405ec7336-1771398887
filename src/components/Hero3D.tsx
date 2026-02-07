"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Enhanced Earth globe with richer atmosphere and tech elements
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.06;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = t * 0.03;
    }
    if (glowRef.current) {
      const pulse = Math.sin(t * 0.5) * 0.1 + 0.9;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Main Earth sphere - Much brighter and more vibrant */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshStandardMaterial
          color="#4f86f7"
          roughness={0.4}
          metalness={0.5}
          emissive="#2563eb"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Cloud layer - More visible */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.32, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Atmosphere glow - Much brighter */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring - pulsing */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Latitude/longitude grid lines */}
      <GridLines />
    </group>
  );
}

// Tech grid overlay on globe - Brighter and more visible
function GridLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points: number[] = [];
    const radius = 1.31;

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = (90 - lat) * (Math.PI / 180);
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );
      }
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const theta = lon * (Math.PI / 180);
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const phi = (i / segments) * Math.PI;
        points.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#93c5fd" transparent opacity={0.6} />
    </lineSegments>
  );
}

// Orbiting data nodes - Brighter with animated glow
function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const nodes = useMemo(() => {
    return [
      { pos: [1.9, 0.6, 0], color: "#60a5fa", size: 0.1 },
      { pos: [-1.7, 0.9, 0.5], color: "#22d3ee", size: 0.09 },
      { pos: [0.4, -1.8, 0.7], color: "#a78bfa", size: 0.11 },
      { pos: [0.9, 1.6, -0.9], color: "#34d399", size: 0.08 },
      { pos: [-1.2, -1.3, 0.3], color: "#f59e0b", size: 0.09 },
      { pos: [1.5, -0.8, -0.6], color: "#ec4899", size: 0.1 },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos as [number, number, number]}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial 
            color={node.color} 
            emissive={node.color}
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating data particles - Much more vibrant
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi);
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const colorChoice = Math.random();
      if (colorChoice < 0.25) {
        // Bright blue
        col[i * 3] = 0.38;
        col[i * 3 + 1] = 0.65;
        col[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.5) {
        // Bright cyan
        col[i * 3] = 0.13;
        col[i * 3 + 1] = 0.83;
        col[i * 3 + 2] = 0.93;
      } else if (colorChoice < 0.75) {
        // Bright purple
        col[i * 3] = 0.66;
        col[i * 3 + 1] = 0.54;
        col[i * 3 + 2] = 0.98;
      } else {
        // Emerald
        col[i * 3] = 0.2;
        col[i * 3 + 1] = 0.83;
        col[i * 3 + 2] = 0.6;
      }
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={1.0} />
    </points>
  );
}

export function Hero3D() {
  return (
    <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/30 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Much brighter, more dramatic lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={3.0} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={2.0} color="#60a5fa" />
        <pointLight position={[-5, -3, -5]} intensity={2.0} color="#3b82f6" />
        <pointLight position={[3, 2, -3]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#a78bfa" />
        <pointLight position={[2, -4, 2]} intensity={1.2} color="#34d399" />
        
        <Earth />
        <DataNodes />
        <Particles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          target={[0, 0, 0]}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-6 text-sm text-orange-400 backdrop-blur-sm bg-gradient-to-t from-gray-900/95 to-transparent font-semibold">
        Evidence Receipts • Value Ledger • Controls • Marketplace Delivery
      </div>
    </div>
  );
}