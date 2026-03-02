import { motion } from "framer-motion";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Slide3DProps {
  image: string;
  title: string;
  description: string;
  isActive: boolean;
}

function Card3D({ image }: { image: string }) {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[4, 3, 0.1]} />
      <meshStandardMaterial
        color="#18181b"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function Slide3D({ image, title, description, isActive }: Slide3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: isActive ? 0 : 180, opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative w-full h-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Front Face - Slide Image */}
      <div
        className="absolute inset-0"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black shadow-2xl shadow-amber-500/10">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
          
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-amber-100 mb-2">
                {title}
              </h2>
              <p className="text-gray-300">
                {description}
              </p>
            </motion.div>
          </div>

          {/* 3D Border Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}