"use client";

// Pure CSS animated gradient background - no JavaScript dependencies
export function Hero3D() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-transparent to-cyan-900/40 animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-900/20 to-purple-900/30 animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s", animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "3s" }} />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}