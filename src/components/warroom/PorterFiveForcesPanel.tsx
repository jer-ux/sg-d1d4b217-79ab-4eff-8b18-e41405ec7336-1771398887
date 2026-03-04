import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Building2, Repeat, UserPlus, Package, 
  Shield, TrendingUp, AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

type Force = {
  id: string;
  name: string;
  icon: React.ElementType;
  strength: "low" | "moderate" | "high";
  score: number;
  factors: string[];
  impact: string;
  mitigation: string;
};

export function PorterFiveForcesPanel() {
  const forces: Force[] = [
    {
      id: "rivalry",
      name: "Competitive Rivalry",
      icon: Users,
      strength: "high",
      score: 78,
      factors: [
        "Multiple TPA and benefits consultants",
        "Big 4 consulting entering healthcare",
        "New AI-powered analytics startups",
        "Traditional ASO providers adding tech"
      ],
      impact: "Pressure on pricing and differentiation",
      mitigation: "Evidence-backed approach and cryptographic verification create unique moat"
    },
    {
      id: "suppliers",
      name: "Supplier Power",
      icon: Building2,
      strength: "moderate",
      score: 52,
      factors: [
        "PBMs have significant pricing control",
        "Limited number of major carriers",
        "Pharmacy networks concentrated",
        "Data providers have leverage"
      ],
      impact: "Cost pressure and negotiating constraints",
      mitigation: "War Room transparency exposes supplier practices, strengthens client negotiating position"
    },
    {
      id: "buyers",
      name: "Buyer Power",
      icon: UserPlus,
      strength: "high",
      score: 82,
      factors: [
        "Employers can switch consultants easily",
        "Price-sensitive CFOs",
        "Multiple solution options available",
        "ROI-driven decision making"
      ],
      impact: "Must demonstrate clear, measurable value",
      mitigation: "Evidence receipts and verified savings ledger provide irrefutable ROI proof"
    },
    {
      id: "substitutes",
      name: "Threat of Substitutes",
      icon: Repeat,
      strength: "moderate",
      score: 58,
      factors: [
        "DIY analytics platforms",
        "In-house benefits teams",
        "Traditional consulting firms",
        "Point solution vendors"
      ],
      impact: "Clients may attempt to build internally or use alternatives",
      mitigation: "Agentic automation and continuous innovation create switching costs"
    },
    {
      id: "entrants",
      name: "Threat of New Entrants",
      icon: Package,
      strength: "moderate",
      score: 61,
      factors: [
        "Low initial capital requirements",
        "Tech talent widely available",
        "Open source AI tools accessible",
        "Cloud infrastructure commoditized"
      ],
      impact: "Market attractiveness draws new competitors",
      mitigation: "Network effects from evidence library and regulatory expertise create barriers"
    }
  ];

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "high":
        return {
          bg: "from-red-500/10 to-orange-500/10",
          border: "border-red-500/30",
          text: "text-red-400",
          badge: "bg-red-500/20 border-red-500/30 text-red-300"
        };
      case "moderate":
        return {
          bg: "from-yellow-500/10 to-amber-500/10",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
          badge: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
        };
      case "low":
        return {
          bg: "from-green-500/10 to-emerald-500/10",
          border: "border-green-500/30",
          text: "text-green-400",
          badge: "bg-green-500/20 border-green-500/30 text-green-300"
        };
      default:
        return {
          bg: "from-gray-500/10 to-slate-500/10",
          border: "border-gray-500/30",
          text: "text-gray-400",
          badge: "bg-gray-500/20 border-gray-500/30 text-gray-300"
        };
    }
  };

  const overallThreat = Math.round(
    forces.reduce((sum, f) => sum + f.score, 0) / forces.length
  );

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <Card className="bg-white/5 backdrop-blur-xl border-blue-500/20 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Porter's Five Forces Analysis
            </h3>
            <p className="text-white/60">
              Competitive landscape assessment for strategic positioning
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/40 mb-1">Overall Industry Intensity</div>
            <div className="text-4xl font-bold text-yellow-400">{overallThreat}</div>
            <Badge className="mt-2 bg-yellow-500/20 border-yellow-500/30 text-yellow-300">
              Moderate Threat
            </Badge>
          </div>
        </div>

        {/* Forces Grid */}
        <div className="grid gap-6">
          {forces.map((force, idx) => {
            const colors = getStrengthColor(force.strength);
            const Icon = force.icon;

            return (
              <motion.div
                key={force.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${colors.bg} border ${colors.border} p-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-white/5 border ${colors.border}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-white">{force.name}</h4>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{force.score}</div>
                            <div className="text-xs text-white/40">Threat Score</div>
                          </div>
                          <Badge className={colors.badge}>
                            {force.strength.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs font-semibold text-white/70 mb-2">Key Factors</div>
                          <ul className="space-y-1">
                            {force.factors.map((factor, i) => (
                              <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                                <span className="text-amber-400 mt-1">•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white/70 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" />
                            Business Impact
                          </div>
                          <p className="text-sm text-white/60 mb-3">{force.impact}</p>
                          <div className="text-xs font-semibold text-white/70 mb-2 flex items-center gap-2">
                            <Shield className="w-3 h-3 text-green-400" />
                            Our Mitigation
                          </div>
                          <p className="text-sm text-green-400/80">{force.mitigation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Strategic Positioning Summary */}
        <Card className="mt-6 bg-blue-500/5 border-blue-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h4 className="text-xl font-bold text-white">Strategic Positioning</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-semibold text-blue-300 mb-2">Competitive Advantages</div>
              <ul className="space-y-1 text-sm text-white/60">
                <li>• Evidence-backed verification moat</li>
                <li>• Regulatory expertise barrier</li>
                <li>• Network effects from data library</li>
                <li>• Agentic automation switching costs</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-yellow-300 mb-2">Key Vulnerabilities</div>
              <ul className="space-y-1 text-sm text-white/60">
                <li>• High buyer power requires ROI proof</li>
                <li>• Competitive rivalry intensifying</li>
                <li>• Technology barriers lowering</li>
                <li>• PBM supplier concentration</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-green-300 mb-2">Strategic Imperatives</div>
              <ul className="space-y-1 text-sm text-white/60">
                <li>• Deepen evidence library moat</li>
                <li>• Accelerate agentic capabilities</li>
                <li>• Build regulatory expertise</li>
                <li>• Create client success stories</li>
              </ul>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
}