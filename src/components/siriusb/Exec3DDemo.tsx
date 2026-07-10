import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";

function RotatingCube() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#10b981" wireframe />
    </mesh>
  );
}

export function Exec3DDemo() {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-black via-neutral-900 to-black rounded-xl overflow-hidden border border-neutral-800">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <RotatingCube />
        </Canvas>
      </div>
      
      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Kincaid Health Executive Intelligence
          </h2>
          <p className="text-xl text-neutral-300">
            Real-time command center for healthcare economics and fiduciary oversight.
          </p>
        </motion.div>
      </div>
    </div>
  );
}