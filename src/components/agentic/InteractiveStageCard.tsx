import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface InteractiveStageCardProps {
  stage: {
    phase: string;
    title: string;
    description: string;
    icon: LucideIcon;
    processes: string[];
    metrics: { label: string; value: string }[];
  };
  index: number;
}

export function InteractiveStageCard({ stage, index }: InteractiveStageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card content */}
      <motion.div
        className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 overflow-hidden"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
          }}
        />

        <div className="relative z-10">
          {/* Phase number with 3D effect */}
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.1, rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl font-bold bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {stage.phase}
            </div>
          </motion.div>

          {/* Icon with floating animation */}
          <motion.div
            className="mb-6"
            animate={{
              y: isHovered ? [-5, 5, -5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm">
              <stage.icon className="w-12 h-12 text-blue-400" />
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold mb-3 text-white">{stage.title}</h3>
          <p className="text-gray-400 mb-6">{stage.description}</p>

          {/* Processes with stagger animation */}
          <div className="space-y-2 mb-6">
            {stage.processes.slice(0, 3).map((process, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {process}
              </motion.div>
            ))}
          </div>

          {/* Metrics with pulse animation */}
          <div className="grid grid-cols-3 gap-4">
            {stage.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="text-2xl font-bold text-blue-400 mb-1"
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Infinity : 0,
                    delay: idx * 0.2,
                  }}
                >
                  {metric.value}
                </motion.div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated corner accents */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"
          animate={{
            rotate: isHovered ? 45 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"
          animate={{
            rotate: isHovered ? -45 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}