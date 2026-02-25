import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Interactive3DCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient: string;
  delay?: number;
}

export function Interactive3DCard({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  gradient,
  delay = 0 
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <motion.a
        href={href}
        style={{
          rotateX,
          rotateY,
        }}
        whileHover={{ scale: 1.05 }}
        className="block relative h-full p-8 rounded-3xl cursor-pointer group overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" 
             style={{ background: gradient }} 
        />
        
        {/* Glass card */}
        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden">
          {/* Neon glow overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-30"
            animate={{
              background: [
                `radial-gradient(circle at 0% 0%, ${gradient.split(',')[0].replace('linear-gradient(135deg,', '').trim()}, transparent 60%)`,
                `radial-gradient(circle at 100% 100%, ${gradient.split(',')[1].trim()}, transparent 60%)`,
                `radial-gradient(circle at 0% 100%, ${gradient.split(',')[0].replace('linear-gradient(135deg,', '').trim()}, transparent 60%)`,
                `radial-gradient(circle at 100% 0%, ${gradient.split(',')[1].trim()}, transparent 60%)`,
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            animate={{
              backgroundPosition: ["0% 0%", "200% 200%"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
          />

          <div className="relative h-full p-8 flex flex-col">
            {/* Icon with glow effect */}
            <motion.div
              className="mb-6"
              whileHover={{ 
                rotateY: 360,
                scale: 1.2,
                transition: { duration: 0.8 }
              }}
            >
              <div className="relative inline-block">
                <motion.div 
                  className="absolute inset-0 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: gradient }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative p-4 rounded-2xl bg-slate-800/50 backdrop-blur-sm ring-2 ring-white/10 group-hover:ring-white/30 transition-all">
                  <Icon className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
            </motion.div>

            <motion.h3 
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              {title}
            </motion.h3>

            <motion.p 
              className="text-gray-400 flex-grow group-hover:text-gray-300 transition-colors"
            >
              {description}
            </motion.p>

            {/* Sparkle effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}