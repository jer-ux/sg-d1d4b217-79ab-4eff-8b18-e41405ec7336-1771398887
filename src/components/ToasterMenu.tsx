import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  FileText,
  BarChart3,
  Shield,
  Bell,
  Home,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";

interface ToasterMenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
  color?: string;
}

const menuItems: ToasterMenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    href: "/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "War Room",
    href: "/war-room",
    badge: "Live",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: "Platform",
    href: "/platform",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Evidence Receipts",
    href: "/evidence-receipts",
    badge: "New",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    label: "Verified Savings",
    href: "/verified-savings-ledger",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    label: "Arbitrage Events",
    href: "/arbitrage-events",
    badge: "3",
    color: "from-yellow-500 to-orange-500",
  },
];

export function ToasterMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="fixed left-6 top-1/2 z-50 -translate-y-1/2"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          setHoveredIndex(null);
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

        {/* Menu items */}
        <div className="relative space-y-2 p-3">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <motion.div
                className="relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover background */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-20`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.2 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all">
                  {/* Icon */}
                  <motion.div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Label (expanded state) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="flex items-center gap-2 whitespace-nowrap"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-sm font-medium text-white">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`rounded-full bg-gradient-to-r ${item.color} px-2 py-0.5 text-xs font-bold text-white`}>
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Arrow indicator */}
                  <AnimatePresence>
                    {isExpanded && hoveredIndex === index && (
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                      >
                        <ChevronRight className="h-4 w-4 text-white/60" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom indicator */}
        <div className="relative border-t border-white/10 p-3">
          <div className="flex items-center justify-center">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {isExpanded && (
              <motion.span
                className="ml-2 text-xs text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                System Active
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-blue-400/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}