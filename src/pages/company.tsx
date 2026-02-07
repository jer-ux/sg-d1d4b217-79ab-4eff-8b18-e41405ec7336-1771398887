import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Sparkles, Database, GitBranch } from "lucide-react";

function Block({
  title,
  desc,
  bullets = [],
  icon,
  delay = 0,
}: {
  title: string;
  desc: string;
  bullets?: string[];
  icon?: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 p-8 backdrop-blur-xl"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Glowing border effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent" />
      </div>

      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        {icon && (
          <motion.div
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        )}
        
        <div className="text-lg font-semibold text-white/95">{title}</div>
        <div className="mt-3 text-base leading-relaxed text-white/70">{desc}</div>
        
        {bullets.length > 0 && (
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {bullets.map((b, idx) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.2 + idx * 0.1 }}
                className="flex gap-3"
              >
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Company() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Enhanced ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          className="absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-blue-500/10 blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-purple-500/10 blur-[120px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        {/* Hero section with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <motion.div 
            className="text-xs tracking-[0.3em] text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            COMPANY
          </motion.div>
          
          <motion.h1 
            className="mt-6 text-5xl font-semibold leading-tight text-white/95 sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Built for fiduciary-grade decisioning.
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Kincaid IQ is an evidence-first operating system. The point isn't dashboards. The point
            is provability: every KPI is backed by receipts, attachments, and integrity verification.
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              href="/platform"
              className="group relative overflow-hidden rounded-full border border-white/10 bg-black/40 px-8 py-4 text-base text-white/80 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/5"
            >
              <span className="relative z-10">Explore platform →</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Link>
            <Link
              href="/request-demo"
              className="group relative overflow-hidden rounded-full border border-white/10 bg-white/10 px-8 py-4 text-base text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/15"
            >
              <span className="relative z-10">Request demo →</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Leadership section with premium 3D card */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="group relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 p-10 backdrop-blur-xl"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative" style={{ transform: "translateZ(30px)" }}>
            <div className="text-lg font-semibold text-white/95">Leadership</div>
            <div className="mt-8 flex items-start gap-6">
              <div className="flex-1">
                <div className="text-2xl font-medium text-white/95">Founder & CEO</div>
                <motion.a
                  href="https://linkedin.com/in/shrack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-4 inline-flex items-center gap-3 text-base text-white/70 transition-colors hover:text-white/95"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg 
                    className="h-6 w-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </motion.svg>
                  <span className="relative">
                    View LinkedIn Profile →
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/90 transition-all duration-300 group-hover/link:w-full" />
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature blocks with staggered 3D animations */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Block
            title="What we believe"
            desc="If it can't be verified, it doesn't belong in the board room."
            bullets={[
              "Evidence is the unit of truth (not opinions, not slides)",
              "Receipts + manifests + hashes create defensible posture",
              "Confidence gating prevents authority inversion",
              "Exports must be portable and auditable",
            ]}
            icon={<Shield className="h-6 w-6 text-blue-400" />}
            delay={0.7}
          />
          <Block
            title="How we operate"
            desc='Systems thinking + governance engineering, not "consulting theater."'
            bullets={[
              "Versioned KPIs with lineage + data quality gates",
              "Immutable artifacts and reproducible transforms",
              "Audit events for overrides and approvals",
              "Security-by-default data access patterns",
            ]}
            icon={<Database className="h-6 w-6 text-purple-400" />}
            delay={0.8}
          />
          <Block
            title="Who it's for"
            desc="Executives and fiduciaries who need clarity at speed."
            bullets={[
              "CFO: quantify EBITDA drag, recoverable value, and risk",
              "CHRO: governance-grade workforce and plan decisions",
              "Board/Owners: integrity-verified exports with receipts",
              "Investors/Lenders: fewer surprises, tighter control",
            ]}
            icon={<Sparkles className="h-6 w-6 text-emerald-400" />}
            delay={0.9}
          />
          <Block
            title="Investor Verification Portal"
            desc="Cryptographically signed proof delivery. Read receipts. Chain-of-custody for sensitive disclosures."
            icon={<GitBranch className="h-6 w-6 text-amber-400" />}
            delay={1.0}
          />
        </div>

        {/* Floating particles effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}