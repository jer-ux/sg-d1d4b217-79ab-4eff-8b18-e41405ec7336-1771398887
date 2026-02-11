import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { LucideIcon } from "lucide-react";

function IconShape({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

export function AnimatedIcon3D({ 
  icon: Icon, 
  color 
}: { 
  icon: LucideIcon; 
  color: string; 
}) {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-2xl">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color={color} />
          <IconShape color={color} />
        </Canvas>
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <Icon className="w-8 h-8 z-10" style={{ color, filter: `drop-shadow(0 0 10px ${color})` }} />
      </div>
    </div>
  );
}