import { Shield, TrendingUp } from "lucide-react";

interface KincaidIQLogoProps {
  variant?: "full" | "icon" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function KincaidIQLogo({ 
  variant = "full", 
  size = "md",
  className = "" 
}: KincaidIQLogoProps) {
  const sizeClasses = {
    sm: { container: "h-8", text: "text-lg", icon: "w-6 h-6", subtext: "text-[8px]" },
    md: { container: "h-12", text: "text-2xl", icon: "w-8 h-8", subtext: "text-[10px]" },
    lg: { container: "h-16", text: "text-3xl", icon: "w-10 h-10", subtext: "text-xs" },
    xl: { container: "h-24", text: "text-5xl", icon: "w-16 h-16", subtext: "text-sm" }
  };

  const s = sizeClasses[size];

  if (variant === "icon") {
    return (
      <div className={`relative ${s.container} aspect-square ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-burgundy to-gold rounded-lg opacity-90" />
        <div className="absolute inset-0.5 bg-slate-950 rounded-lg flex items-center justify-center">
          <div className="relative">
            <Shield className={`${s.icon} text-gold`} strokeWidth={1.5} />
            <TrendingUp className={`${s.icon} text-burgundy absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50`} strokeWidth={2} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className={`font-serif font-bold ${s.text} text-navy tracking-tight leading-none`}>
          KINCAID <span className="text-burgundy">IQ</span>
        </div>
        <div className={`font-sans ${s.subtext} text-slate-400 tracking-[0.2em] uppercase mt-0.5`}>
          Data Sciences Lab
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${s.container} aspect-square`}>
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-burgundy to-gold rounded-lg opacity-90" />
        <div className="absolute inset-0.5 bg-slate-950 rounded-lg flex items-center justify-center">
          <div className="relative">
            <Shield className={`${s.icon} text-gold`} strokeWidth={1.5} />
            <TrendingUp className={`${s.icon} text-burgundy absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50`} strokeWidth={2} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className={`font-serif font-bold ${s.text} text-navy tracking-tight leading-none`}>
          KINCAID <span className="text-burgundy">IQ</span>
        </div>
        <div className={`font-sans ${s.subtext} text-slate-400 tracking-[0.2em] uppercase mt-0.5`}>
          Data Sciences Lab
        </div>
      </div>
    </div>
  );
}