import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Search, 
  Eye, 
  AlertTriangle, 
  RefreshCw,
  Home,
  ChevronRight,
  FileText,
  Lock,
  Activity
} from "lucide-react";
import type { NISTFunction } from "@/lib/security/nist-csf";

const functionIcons: Record<NISTFunction, typeof Shield> = {
  identify: Search,
  protect: Shield,
  detect: Eye,
  respond: AlertTriangle,
  recover: RefreshCw
};

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        Home
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

interface QuickJumpNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function QuickJumpNav({ activeSection, onNavigate }: QuickJumpNavProps) {
  const sections: Array<{ id: NISTFunction; label: string }> = [
    { id: "identify", label: "Identify" },
    { id: "protect", label: "Protect" },
    { id: "detect", label: "Detect" },
    { id: "respond", label: "Respond" },
    { id: "recover", label: "Recover" }
  ];

  return (
    <Card className="p-4 sticky top-24">
      <h3 className="font-semibold mb-3 text-sm">Quick Jump</h3>
      <nav className="space-y-1">
        {sections.map(section => {
          const Icon = functionIcons[section.id];
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </Card>
  );
}

interface RelatedPagesBarProps {
  currentPage: string;
}

export function RelatedPagesBar({ currentPage }: RelatedPagesBarProps) {
  const pages = [
    { id: "nist", label: "NIST Compliance", href: "/security/nist-compliance", icon: Shield },
    { id: "privacy", label: "Privacy Policy", href: "/security/privacy-policy", icon: Lock },
    { id: "security", label: "Security Policy", href: "/security/security-policy", icon: FileText },
    { id: "audit", label: "Audit Logs", href: "#", icon: Activity }
  ];

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex gap-1 overflow-x-auto">
        {pages.map(page => {
          const Icon = page.icon;
          const isActive = currentPage === page.id;
          return (
            <Link
              key={page.id}
              href={page.href}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              {page.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

interface ScrollProgressProps {
  sections: string[];
}

export function ScrollProgress({ sections }: ScrollProgressProps) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Determine active section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Back to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors z-40"
          aria-label="Back to top"
        >
          <ChevronRight className="w-5 h-5 rotate-[-90deg]" />
        </button>
      )}
    </>
  );
}