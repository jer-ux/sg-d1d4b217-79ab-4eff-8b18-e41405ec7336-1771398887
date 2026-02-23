"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";

export const PremiumBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#fbbf24" />
        
        {/* Floating Distorted Spheres */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
          <Sphere args={[1, 64, 64]} position={[-3, 2, -5]}>
            <MeshDistortMaterial color="#a855f7" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
          </Sphere>
        </Float>
        
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
          <Sphere args={[0.8, 64, 64]} position={[4, -2, -6]}>
            <MeshDistortMaterial color="#3b82f6" distort={0.5} speed={1.5} roughness={0.1} metalness={0.9} />
          </Sphere>
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
          <Sphere args={[0.6, 64, 64]} position={[2, 3, -7]}>
            <MeshDistortMaterial color="#fbbf24" distort={0.3} speed={2.5} roughness={0.3} metalness={0.7} />
          </Sphere>
        </Float>

        {/* Particle Field */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={3000}
              array={new Float32Array(
                Array.from({ length: 3000 }, () => [
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20,
                ]).flat()
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.02} color="#a855f7" transparent opacity={0.6} />
        </points>
      </Canvas>
    </div>
  );
};