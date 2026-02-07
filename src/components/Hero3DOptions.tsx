"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Torus, Line } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// ============================================================
// OPTION 1: DATA NEXUS - Interconnected nodes with connections
// ============================================================

function DataNexusNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  const nodePositions = useMemo(() => {
    return [
      [0, 0, 0],
      [1.5, 0.8, 0.5],
      [-1.2, 1.0, -0.3],
      [0.5, -1.3, 0.8],
      [-0.8, -0.9, -0.6],
      [1.0, -0.5, -1.0],
      [-1.5, 0.3, 0.7],
      [0.3, 1.5, -0.5],
    ];
  }, []);

  const connections = useMemo(() => {
    const lines: number[] = [];
    const pairs = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 2], [1, 5], [2, 6], [3, 4],
      [4, 5], [5, 6], [6, 7], [7, 2]
    ];
    
    pairs.forEach(([a, b]) => {
      lines.push(...nodePositions[a], ...nodePositions[b]);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    return geometry;
  }, [nodePositions]);

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={connections}>
        <lineBasicMaterial color="#60a5fa" transparent opacity={0.4} />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#60a5fa"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Pulsing core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#60a5fa"
          emissiveIntensity={2.0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export function Hero3DDataNexus() {
  return (
    <div className="relative h-[460px] w-full rounded-2xl overflow-hidden border border-white/30 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={3.0} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={2.0} color="#60a5fa" />
        <pointLight position={[0, 0, 0]} intensity={2.0} color="#3b82f6" />
        
        <DataNexusNodes />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-6 text-sm text-orange-400 backdrop-blur-sm bg-gradient-to-t from-gray-900/95 to-transparent font-semibold">
        Interconnected Intelligence • Real-Time Analytics • EBITDA Transparency
      </div>
    </div>
  );
}

// ============================================================
// OPTION 2: NEURAL NETWORK - Brain-like pathways
// ============================================================

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }
  });

  const neurons = useMemo(() => {
    const count = 80;
    const positions: [number, number, number][] = [];
    const radius = 2.0;
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = radius * Math.pow(Math.random(), 0.5);
      
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      ]);
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {neurons.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#a78bfa" : "#22d3ee"}
            emissive={i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#a78bfa" : "#22d3ee"}
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Hero3DNeuralNetwork() {
  return (
    <div className="relative h-[460px] w-full rounded-2xl overflow-hidden border border-white/30 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} />
        <pointLight position={[-3, 2, -3]} intensity={2.0} color="#a78bfa" />
        <pointLight position={[3, -2, 3]} intensity={2.0} color="#60a5fa" />
        
        <NeuralNetwork />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-6 text-sm text-orange-400 backdrop-blur-sm bg-gradient-to-t from-gray-900/95 to-transparent font-semibold">
        AI-Powered Intelligence • Neural Processing • Fiduciary Grade Evidence
      </div>
    </div>
  );
}

// ============================================================
// OPTION 3: CUBE MATRIX - Rotating data cubes
// ============================================================

function CubeMatrix() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
  });

  const cubes = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 0) {
            positions.push([x * 1.2, y * 1.2, z * 1.2]);
          }
        }
      }
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {cubes.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[i * 0.5, i * 0.3, i * 0.7]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#60a5fa"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
      
      {/* Central cube */}
      <mesh>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={2.0}
          metalness={1.0}
          roughness={0.0}
        />
      </mesh>
    </group>
  );
}

export function Hero3DCubeMatrix() {
  return (
    <div className="relative h-[460px] w-full rounded-2xl overflow-hidden border border-white/30 bg-gradient-to-br from-gray-900 via-cyan-950 to-gray-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={3.0} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#60a5fa" />
        
        <CubeMatrix />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-6 text-sm text-orange-400 backdrop-blur-sm bg-gradient-to-t from-gray-900/95 to-transparent font-semibold">
        Structured Data • Dimensional Analysis • Receipt-Backed Verification
      </div>
    </div>
  );
}

// ============================================================
// OPTION 4: PARTICLE STORM - Dynamic particle field
// ============================================================

function ParticleStorm() {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const count = 1000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 1.5 + Math.random() * 2.5;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi);
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        col[i * 3] = 0.38; col[i * 3 + 1] = 0.65; col[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.66) {
        col[i * 3] = 0.66; col[i * 3 + 1] = 0.54; col[i * 3 + 2] = 0.98;
      } else {
        col[i * 3] = 0.13; col[i * 3 + 1] = 0.83; col[i * 3 + 2] = 0.93;
      }

      siz[i] = Math.random() * 0.05 + 0.02;
    }

    return [pos, col, siz];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
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
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export function Hero3DParticleStorm() {
  return (
    <div className="relative h-[460px] w-full rounded-2xl overflow-hidden border border-white/30 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10" />
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <pointLight position={[0, 0, 0]} intensity={3.0} color="#60a5fa" />
        
        <ParticleStorm />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-6 text-sm text-orange-400 backdrop-blur-sm bg-gradient-to-t from-gray-900/95 to-transparent font-semibold">
        Data Streams • Real-Time Processing • Evidence-Based Insights
      </div>
    </div>
  );
}

// ============================================================
// OPTION 5: HOLOGRAPHIC RING - Futuristic ring system
// ============================================================

function HolographicRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.4;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.5;
    if (coreRef.current) {
      const pulse = Math.sin(t * 2) * 0.1 + 1.0;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={2.5}
          metalness={1.0}
          roughness={0.0}
        />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#60a5fa"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.8, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref} rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[2.1, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Orbital nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={2.0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function Hero3DHolographicRing() {
  return (
    <div className="relative h-[460px] w-full rounded-2xl overflow-hidden border border-white/30 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10" />
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={3.0} />
        <pointLight position={[0, 0, 0]} intensity={3.0} color="#60a5fa" />
        <pointLight position={[3, 3, 3]} intensity={2.0} color="#a78bfa" />
        
        <HolographicRings />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-6 text-sm text-orange-400 backdrop-blur-sm bg-gradient-to-t from-gray-900/95 to-transparent font-semibold">
        Unified Platform • Connected Systems • Holistic Intelligence
      </div>
    </div>
  );
}