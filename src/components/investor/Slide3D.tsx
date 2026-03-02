import { motion } from "framer-motion";
import { useState } from "react";

interface Slide3DProps {
  image: string;
  title: string;
  description: string;
  isActive: boolean;
}

export default function Slide3D({ image, title, description, isActive }: Slide3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
      transition={{ duration: 0.5 }}
      style={{ perspective: "2000px" }}
    >
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Card */}
        <motion.div
          className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: 1.02 }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* 3D border effect */}
            <div className="absolute inset-0 rounded-2xl border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent" />
            </div>

            {/* Slide image */}
            <div className="relative w-full h-full bg-black">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain"
              />

              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating info card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-6 rounded-xl bg-black/80 border border-amber-500/30 backdrop-blur-md">
                  <h3 className="text-2xl font-bold text-amber-100 mb-2">{title}</h3>
                  <p className="text-gray-300">{description}</p>
                  <p className="text-sm text-amber-400 mt-3">Click to flip card</p>
                </div>
              </motion.div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-bl-[100px]" />
            </div>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-950 to-black rounded-2xl border-4 border-amber-500/30"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-amber-100 mb-4">{title}</h3>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl">{description}</p>
              <p className="text-sm text-amber-400">Click to flip back</p>
            </div>
          </div>
        </motion.div>

        {/* 3D shadow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent blur-2xl transform translate-y-4 -z-10" />
      </div>
    </motion.div>
  );
}