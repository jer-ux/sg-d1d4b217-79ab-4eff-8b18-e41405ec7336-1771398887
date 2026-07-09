import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProvisionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
  details: string[];
}

export function ProvisionCard({
  icon: Icon,
  title,
  description,
  isActive,
  onToggle,
  details,
}: ProvisionCardProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-800 overflow-hidden hover:border-amber-500/30 transition-all">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-start gap-4 hover:bg-slate-900/30 transition-colors"
      >
        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-amber-400" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-slate-400">{description}</p>
            </div>
            <div className="flex-shrink-0">
              {isActive ? (
                <ChevronDown className="w-5 h-5 text-amber-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </div>
        </div>
      </button>

      {isActive && (
        <div className="px-6 pb-6 pt-0">
          <div className="border-t border-slate-800 pt-6">
            <ul className="space-y-3">
              {details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-300">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}