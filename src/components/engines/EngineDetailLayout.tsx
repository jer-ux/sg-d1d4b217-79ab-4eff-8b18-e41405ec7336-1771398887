import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, LucideIcon } from "lucide-react";
import Footer from "@/components/Footer";

interface EngineDetailLayoutProps {
  title: string;
  category: string;
  icon: LucideIcon;
  description: string;
  children: ReactNode;
}

export function EngineDetailLayout({ title, category, icon: Icon, description, children }: EngineDetailLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Kincaid IQ Engine</title>
        <meta name="description" content={description} />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Vegas Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-cyan-600 opacity-90" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
          }} />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link href="/engines" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold">All Engines</span>
            </Link>
            
            <div className="flex items-start gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
                <div className="relative p-6 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20">
                  <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">{category}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                  {title}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Animated Vegas lights */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 via-blue-500 to-cyan-500 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {children}
          </div>
        </div>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

export function VegasSection({ title, children, gradient = "from-fuchsia-500/10 to-purple-500/10" }: { 
  title: string; 
  children: ReactNode;
  gradient?: string;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 mb-8">
        {title}
      </h2>
      <div className={`bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 rounded-2xl p-8`}>
        {children}
      </div>
    </section>
  );
}

export function VegasMetricCard({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl p-6">
        <div className="text-sm font-bold text-purple-300 mb-2">{label}</div>
        <div className="text-3xl font-black text-white mb-1">{value}</div>
        {sublabel && <div className="text-xs text-white/60">{sublabel}</div>}
      </div>
    </div>
  );
}

export function VegasCodeBlock({ children }: { children: string }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
      <pre className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-6 overflow-x-auto">
        <code className="text-sm text-cyan-300 font-mono">{children}</code>
      </pre>
    </div>
  );
}

export function VegasFeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}

export function VegasFeatureCard({ icon: Icon, title, description }: { 
  icon: LucideIcon; 
  title: string; 
  description: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all">
        <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}