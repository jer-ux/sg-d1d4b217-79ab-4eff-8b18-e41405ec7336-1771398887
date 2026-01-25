"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Realistic Earth globe with atmosphere and tech elements
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

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
  });

  return (
    <group>
      {/* Main Earth sphere - Brighter colors */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.5}
          metalness={0.4}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cloud layer - More visible */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.27, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Atmosphere glow - Brighter */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Latitude/longitude grid lines */}
      <GridLines />
    </group>
  );
}

// Tech grid overlay on globe - Brighter
function GridLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points: number[] = [];
    const radius = 1.26;

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
      <lineBasicMaterial color="#93c5fd" transparent opacity={0.5} />
    </lineSegments>
  );
}

// Orbiting data nodes - Brighter and glowing
function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const nodes = useMemo(() => {
    return [
      { pos: [1.8, 0.5, 0], color: "#60a5fa" },
      { pos: [-1.6, 0.8, 0.4], color: "#22d3ee" },
      { pos: [0.3, -1.7, 0.6], color: "#a78bfa" },
      { pos: [0.8, 1.5, -0.8], color: "#34d399" },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={node.color} 
            emissive={node.color}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating data particles - Much brighter
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi);
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Blue - brighter
        col[i * 3] = 0.38;
        col[i * 3 + 1] = 0.65;
        col[i * 3 + 2] = 0.98;
      } else if (colorChoice < 0.66) {
        // Cyan - brighter
        col[i * 3] = 0.13;
        col[i * 3 + 1] = 0.83;
        col[i * 3 + 2] = 0.93;
      } else {
        // Purple - brighter
        col[i * 3] = 0.66;
        col[i * 3 + 1] = 0.54;
        col[i * 3 + 2] = 0.98;
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
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} />
    </points>
  );
}

export function Hero3D() {
  return (
    <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Much brighter lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[-5, -3, -5]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[3, 2, -3]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[0, 5, 0]} intensity={1.0} color="#a78bfa" />
        
        <Earth />
        <DataNodes />
        <Particles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-5 text-sm text-gray-300 backdrop-blur-sm bg-gradient-to-t from-gray-900/90 to-transparent">
        Evidence Receipts • Value Ledger • Controls • Marketplace Delivery
      </div>
    </div>
  );
}