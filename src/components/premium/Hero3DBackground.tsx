import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, type }: { position: [number, number, number]; color: string; type: 'sphere' | 'torus' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {type === 'sphere' ? (
        <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Sphere>
      ) : (
        <TorusKnot ref={meshRef} args={[0.8, 0.3, 128, 16]} position={position}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={0.6}
          />
        </TorusKnot>
      )}
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = new Float32Array(3000);
  for (let i = 0; i < 3000; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 50;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 50;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Hero3DBackground() {
  return (
    <div className="absolute inset-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ec4899" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[0, 10, -10]} intensity={1} color="#3b82f6" />
        
        <FloatingShape position={[-4, 2, 0]} color="#ec4899" type="sphere" />
        <FloatingShape position={[4, -2, -2]} color="#8b5cf6" type="torus" />
        <FloatingShape position={[0, 3, -3]} color="#3b82f6" type="sphere" />
        <FloatingShape position={[-3, -3, -1]} color="#06b6d4" type="torus" />
        <FloatingShape position={[3, 1, -4]} color="#a855f7" type="sphere" />
        
        <ParticleField />
      </Canvas>
    </div>
  );
}