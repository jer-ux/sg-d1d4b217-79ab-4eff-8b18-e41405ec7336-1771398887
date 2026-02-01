import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import {
  Home,
  Shield,
  FileText,
  TrendingUp,
  Layers,
  Calendar,
  X,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "Home",
    href: "/",
    description: "Return to homepage",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: "War Room",
    href: "/war-room",
    description: "Incident management",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Evidence",
    href: "/evidence-receipts",
    description: "Verified receipts",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Arbitrage",
    href: "/arbitrage-events",
    description: "Cross-system events",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    label: "Platform",
    href: "/platform",
    description: "All capabilities",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Request Demo",
    href: "/request-demo",
    description: "Schedule a call",
  },
];

export function ToasterMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Toggle Button - Top Right */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-[7.5rem] right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-6 flex flex-col items-center justify-center gap-1.5">
          <motion.div
            className="w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full origin-center"
            animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full origin-center"
            animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-96 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-l border-gray-200 dark:border-gray-800 shadow-2xl overflow-y-auto"
          >
            {/* Menu Panel - Apple-style sidebar */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed left-0 top-0 bottom-0 w-80 z-[95] bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-r border-gray-200/50 dark:border-white/10 shadow-2xl"
            >
              {/* Menu Header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Kincaid IQ</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      AI Data Sciences Lab
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="px-3 py-4 space-y-1">
                {menuItems.map((item, index) => {
                  const isActive = router.pathname === item.href;
                  const isHovered = hoveredIndex === index;

                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative w-full text-left px-4 py-3 rounded-xl overflow-hidden group"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                      }}
                    >
                      {/* Background */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl ${
                          isActive
                            ? "bg-gray-900 dark:bg-white"
                            : "bg-gray-100 dark:bg-white/5"
                        }`}
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Content */}
                      <div className="relative flex items-center gap-4">
                        <div
                          className={`flex-shrink-0 ${
                            isActive
                              ? "text-white dark:text-black"
                              : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          } transition-colors`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-base font-medium ${
                              isActive
                                ? "text-white dark:text-black"
                                : "text-gray-900 dark:text-white"
                            } transition-colors`}
                          >
                            {item.label}
                          </div>
                          <div
                            className={`text-xs ${
                              isActive
                                ? "text-white/70 dark:text-black/70"
                                : "text-gray-500 dark:text-gray-500"
                            } transition-colors`}
                          >
                            {item.description}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 ${
                            isActive
                              ? "text-white/70 dark:text-black/70"
                              : "text-gray-400 opacity-0 group-hover:opacity-100"
                          } transition-all`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Menu Footer */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
                  <div>Press ESC to close</div>
                  <div className="text-[10px]">© 2026 Kincaid IQ. All rights reserved.</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}