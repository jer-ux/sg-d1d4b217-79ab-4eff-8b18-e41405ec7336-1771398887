import { motion } from "framer-motion";

export function NeonGlow({ children, color1, color2 }: { children: React.ReactNode; color1: string; color2: string }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl"
        animate={{
          background: [
            `radial-gradient(circle at 50% 50%, ${color1}, transparent 70%)`,
            `radial-gradient(circle at 50% 50%, ${color2}, transparent 70%)`,
            `radial-gradient(circle at 50% 50%, ${color1}, transparent 70%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}