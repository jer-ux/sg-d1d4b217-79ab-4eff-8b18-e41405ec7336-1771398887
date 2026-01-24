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
      {/* Main Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a8a"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.27, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Latitude/longitude grid lines */}
      <GridLines />
    </group>
  );
}

// Tech grid overlay on globe
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
      <lineBasicMaterial color="#60a5fa" transparent opacity={0.25} />
    </lineSegments>
  );
}

// Orbiting data nodes
function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const nodes = useMemo(() => {
    return [
      { pos: [1.8, 0.5, 0], color: "#3b82f6" },
      { pos: [-1.6, 0.8, 0.4], color: "#06b6d4" },
      { pos: [0.3, -1.7, 0.6], color: "#8b5cf6" },
      { pos: [0.8, 1.5, -0.8], color: "#10b981" },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  );
}

// Floating data particles
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
        col[i * 3] = 0.23;
        col[i * 3 + 1] = 0.51;
        col[i * 3 + 2] = 0.96;
      } else if (colorChoice < 0.66) {
        col[i * 3] = 0.02;
        col[i * 3 + 1] = 0.71;
        col[i * 3 + 2] = 0.83;
      } else {
        col[i * 3] = 0.54;
        col[i * 3 + 1] = 0.36;
        col[i * 3 + 2] = 0.96;
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
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.7} />
    </points>
  );
}

export function Hero3D() {
  return (
    <div className="relative h-[420px] w-full k-panel k-glow overflow-hidden">
      <div className="absolute inset-0 k-grid opacity-70" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[3, 2, -3]} intensity={0.6} color="#06b6d4" />
        
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
      <div className="absolute inset-x-0 bottom-0 p-5 text-xs text-white/65 backdrop-blur-sm bg-black/20">
        Evidence Receipts • Value Ledger • Controls • Marketplace Delivery
      </div>
    </div>
  );
}