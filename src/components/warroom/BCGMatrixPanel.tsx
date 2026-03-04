import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, HelpCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

type Initiative = {
  id: string;
  name: string;
  marketGrowth: number;
  relativeMarketShare: number;
  quadrant: "star" | "cash-cow" | "question-mark" | "dog";
  investment: number;
  roi: number;
};

export function BCGMatrixPanel() {
  const initiatives: Initiative[] = [
    {
      id: "1",
      name: "PBM Arbitrage Detection",
      marketGrowth: 85,
      relativeMarketShare: 92,
      quadrant: "star",
      investment: 450000,
      roi: 340
    },
    {
      id: "2",
      name: "Claims Analytics Platform",
      marketGrowth: 45,
      relativeMarketShare: 88,
      quadrant: "cash-cow",
      investment: 280000,
      roi: 520
    },
    {
      id: "3",
      name: "AI Agent Automation",
      marketGrowth: 95,
      relativeMarketShare: 35,
      quadrant: "question-mark",
      investment: 620000,
      roi: 145
    },
    {
      id: "4",
      name: "Legacy Contract Review",
      marketGrowth: 12,
      relativeMarketShare: 28,
      quadrant: "dog",
      investment: 180000,
      roi: 65
    },
    {
      id: "5",
      name: "Evidence Receipt System",
      marketGrowth: 38,
      relativeMarketShare: 95,
      quadrant: "cash-cow",
      investment: 320000,
      roi: 480
    },
    {
      id: "6",
      name: "Real-time War Room",
      marketGrowth: 78,
      relativeMarketShare: 82,
      quadrant: "star",
      investment: 890000,
      roi: 290
    }
  ];

  const quadrantConfig = {
    star: {
      label: "Stars",
      icon: Star,
      color: "from-yellow-500 to-amber-500",
      textColor: "text-yellow-400",
      strategy: "Invest heavily - high growth, high share",
      borderColor: "border-yellow-500/40"
    },
    "cash-cow": {
      label: "Cash Cows",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      textColor: "text-green-400",
      strategy: "Harvest - mature market, dominant position",
      borderColor: "border-green-500/40"
    },
    "question-mark": {
      label: "Question Marks",
      icon: HelpCircle,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      strategy: "Selective investment - high potential, uncertain",
      borderColor: "border-purple-500/40"
    },
    dog: {
      label: "Dogs",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-500",
      textColor: "text-red-400",
      strategy: "Divest or minimize - low growth, weak position",
      borderColor: "border-red-500/40"
    }
  };

  const getQuadrantInitiatives = (quadrant: string) => 
    initiatives.filter(i => i.quadrant === quadrant);

  return (
    <div className="space-y-8">
      {/* Matrix Visualization */}
      <Card className="bg-white/5 backdrop-blur-xl border-blue-500/20 p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            BCG Growth-Share Matrix
          </h3>
          <p className="text-white/60">
            Portfolio analysis of strategic initiatives across market growth and competitive position
          </p>
        </div>

        {/* 2x2 Matrix Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Question Marks (Top Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30"
          >
            <div className="absolute top-3 left-3">
              <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">
                High Growth
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-4 mt-8">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <h4 className="font-bold text-white">Question Marks</h4>
            </div>
            <p className="text-xs text-white/50 mb-4">Invest or divest decision needed</p>
            {getQuadrantInitiatives("question-mark").map((init, idx) => (
              <div key={init.id} className="mb-3 last:mb-0">
                <div className="text-sm font-semibold text-white/80">{init.name}</div>
                <div className="text-xs text-white/40">
                  ROI: {init.roi}% | Investment: ${(init.investment / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stars (Top Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30"
          >
            <div className="absolute top-3 right-3">
              <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-300">
                High Share
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-4 mt-8">
              <Star className="w-5 h-5 text-yellow-400" />
              <h4 className="font-bold text-white">Stars</h4>
            </div>
            <p className="text-xs text-white/50 mb-4">Invest aggressively for growth</p>
            {getQuadrantInitiatives("star").map((init, idx) => (
              <div key={init.id} className="mb-3 last:mb-0">
                <div className="text-sm font-semibold text-white/80">{init.name}</div>
                <div className="text-xs text-white/40">
                  ROI: {init.roi}% | Investment: ${(init.investment / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dogs (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30"
          >
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-red-500/20 border-red-500/30 text-red-300">
                Low Growth
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h4 className="font-bold text-white">Dogs</h4>
            </div>
            <p className="text-xs text-white/50 mb-4">Divest or minimize investment</p>
            {getQuadrantInitiatives("dog").map((init, idx) => (
              <div key={init.id} className="mb-3 last:mb-0">
                <div className="text-sm font-semibold text-white/80">{init.name}</div>
                <div className="text-xs text-white/40">
                  ROI: {init.roi}% | Investment: ${(init.investment / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </motion.div>

          {/* Cash Cows (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
          >
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                Low Share
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h4 className="font-bold text-white">Cash Cows</h4>
            </div>
            <p className="text-xs text-white/50 mb-4">Harvest profits, maintain position</p>
            {getQuadrantInitiatives("cash-cow").map((init, idx) => (
              <div key={init.id} className="mb-3 last:mb-0">
                <div className="text-sm font-semibold text-white/80">{init.name}</div>
                <div className="text-xs text-white/40">
                  ROI: {init.roi}% | Investment: ${(init.investment / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Strategic Recommendations */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-green-500/5 border-green-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <h5 className="font-semibold text-white">High Priority</h5>
            </div>
            <p className="text-sm text-white/60">
              Maximize investment in Stars and evaluate Question Marks for potential Star conversion
            </p>
          </Card>
          <Card className="bg-red-500/5 border-red-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h5 className="font-semibold text-white">Resource Reallocation</h5>
            </div>
            <p className="text-sm text-white/60">
              Minimize Dogs, harvest Cash Cows to fund Star and Question Mark opportunities
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}