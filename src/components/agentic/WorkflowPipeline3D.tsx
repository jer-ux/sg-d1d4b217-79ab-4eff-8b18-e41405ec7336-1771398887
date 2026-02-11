import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface DataParticle {
  id: number;
  progress: number;
  speed: number;
  color: string;
}

function FlowingParticles({ stage }: { stage: number }) {
  const particlesRef = useRef<THREE.Group>(null);
  
  const particles = useMemo<DataParticle[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      color: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"][Math.floor(Math.random() * 4)],
    }));
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        if (particle) {
          particle.progress += particle.speed;
          if (particle.progress > 1) particle.progress = 0;
          
          const x = (particle.progress - 0.5) * 8;
          const y = Math.sin(particle.progress * Math.PI * 2) * 0.3;
          child.position.set(x + (stage - 3) * 2, y, 0);
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle) => (
        <mesh key={particle.id}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={particle.color} emissive={particle.color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function PipelineStage({ 
  position, 
  label, 
  stage 
}: { 
  position: [number, number, number]; 
  label: string; 
  stage: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + stage) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.8}
            roughness={0.2}
            emissive="#1e40af"
            emissiveIntensity={0.3}
          />
        </mesh>
        <Text
          position={[0, -1, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
        <FlowingParticles stage={stage} />
      </group>
    </Float>
  );
}

function Pipeline() {
  const stages = [
    { label: "Ingest", position: [-4, 0, 0] as [number, number, number] },
    { label: "Classify", position: [-2, 0, 0] as [number, number, number] },
    { label: "Policy", position: [0, 0, 0] as [number, number, number] },
    { label: "Evidence", position: [2, 0, 0] as [number, number, number] },
    { label: "Monitor", position: [4, 0, 0] as [number, number, number] },
  ];

  const linePoints = stages.map(s => new THREE.Vector3(s.position[0], s.position[1], s.position[2]));

  return (
    <>
      <Line
        points={linePoints}
        color="#3b82f6"
        lineWidth={2}
        dashed={false}
      />
      {stages.map((stage, index) => (
        <PipelineStage
          key={index}
          position={stage.position}
          label={stage.label}
          stage={index}
        />
      ))}
    </>
  );
}

export function WorkflowPipeline3D() {
  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#3b82f6" />
        
        <Pipeline />
        
        <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
}