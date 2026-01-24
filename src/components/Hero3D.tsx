"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo } from "react";

function Orb() {
  const config = useMemo(
    () => ({
      thickness: 0.8,
      roughness: 0.15,
      transmission: 1,
      ior: 1.5,
      chromaticAberration: 0.03,
      backside: true,
    }),
    []
  );

  return (
    <Float speed={1.2} rotationIntensity={0.7} floatIntensity={0.6}>
      <mesh>
        <sphereGeometry args={[1.25, 128, 128]} />
        <MeshTransmissionMaterial {...config} />
      </mesh>

      <mesh scale={1.38}>
        <torusGeometry args={[1.05, 0.015, 16, 220]} />
        <meshStandardMaterial color="#9bb4ff" emissive="#4b7cff" emissiveIntensity={0.6} />
      </mesh>

      <mesh scale={1.55} rotation={[0.2, 0.4, 0]}>
        <torusGeometry args={[1.05, 0.01, 16, 220]} />
        <meshStandardMaterial color="#66f2ff" emissive="#1ea7ff" emissiveIntensity={0.35} />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="relative h-[420px] w-full k-panel k-glow overflow-hidden">
      <div className="absolute inset-0 k-grid opacity-70" />
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <pointLight position={[-3, -2, 2]} intensity={0.8} />
        <Orb />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 p-5 text-xs text-white/65">
        Evidence Receipts • Value Ledger • Controls • Marketplace Delivery
      </div>
    </div>
  );
}