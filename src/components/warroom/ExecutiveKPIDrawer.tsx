import { X, ChevronLeft, Shield, AlertTriangle, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { TileData } from "./executiveTypes";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";

interface DrillDownLevel {
  level: number;
  title: string;
  data: any;
}

interface ExecutiveKPIDrawerProps {
  tile: TileData;
  isOpen: boolean;
  onClose: () => void;
}

export function ExecutiveKPIDrawer({ tile, isOpen, onClose }: ExecutiveKPIDrawerProps) {
  const [drillStack, setDrillStack] = useState<DrillDownLevel[]>([
    { level: 1, title: tile.title, data: tile }
  ]);

  if (!isOpen) return null;

  const currentLevel = drillStack[drillStack.length - 1];
  const canDrillDown = currentLevel.level < 4;
  const canGoBack = drillStack.length > 1;

  const handleDrillDown = (item: any) => {
    if (currentLevel.level >= 4) return;

    const nextLevel = currentLevel.level + 1;
    let nextTitle = "";
    let nextData: any = {};

    if (nextLevel === 2) {
      // Level 2: Breakdown by contributing factors
      nextTitle = `${item.category} Breakdown`;
      nextData = {
        category: item.category,
        items: generateLevel2Data(tile.key, item),
        summary: item
      };
    } else if (nextLevel === 3) {
      // Level 3: Individual transactions/events
      nextTitle = `${item.subcategory} Details`;
      nextData = {
        subcategory: item.subcategory,
        transactions: generateLevel3Data(tile.key, item),
        summary: item
      };
    } else if (nextLevel === 4) {
      // Level 4: Full evidence receipt
      nextTitle = `Evidence Receipt`;
      nextData = {
        transaction: item,
        receipt: generateLevel4Data(tile.key, item)
      };
    }

    setDrillStack([...drillStack, { level: nextLevel, title: nextTitle, data: nextData }]);
  };

  const handleBack = () => {
    if (drillStack.length > 1) {
      setDrillStack(drillStack.slice(0, -1));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full w-full max-w-2xl overflow-hidden border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-6 py-4">
            <div className="flex items-center gap-3">
              {canGoBack && (
                <button
                  onClick={handleBack}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span>Level {currentLevel.level} of 4</span>
                  {drillStack.map((level, idx) => (
                    <span key={idx}>
                      {idx > 0 && " → "}
                      {level.level === currentLevel.level ? (
                        <span className="text-zinc-100">{level.title}</span>
                      ) : (
                        level.title
                      )}
                    </span>
                  ))}
                </div>
                <div className="mt-1 text-lg font-semibold text-zinc-100">{currentLevel.title}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {currentLevel.level === 1 && <Level1Content tile={tile} onDrillDown={handleDrillDown} />}
            {currentLevel.level === 2 && <Level2Content data={currentLevel.data} onDrillDown={handleDrillDown} />}
            {currentLevel.level === 3 && <Level3Content data={currentLevel.data} onDrillDown={handleDrillDown} />}
            {currentLevel.level === 4 && <Level4Content data={currentLevel.data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Level1Content({ tile, onDrillDown }: { tile: TileData; onDrillDown: (item: any) => void }) {
  const categories = generateLevel1Data(tile.key);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="text-4xl font-bold text-zinc-100">{tile.value}</div>
        {tile.delta && (
          <div className="mt-2 flex items-center gap-2 text-sm text-emerald-400">
            <TrendingUp className="h-4 w-4" />
            <span>{tile.delta}</span>
          </div>
        )}
        {tile.subtitle && <div className="mt-2 text-sm text-zinc-400">{tile.subtitle}</div>}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">Contributing Factors</h3>
        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(cat)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/60"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-zinc-100">{cat.category}</div>
                  <div className="mt-1 text-xs text-zinc-400">{cat.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-100">{cat.value}</div>
                  <div className="mt-1 text-xs text-zinc-500">{cat.impact}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Level2Content({ data, onDrillDown }: { data: any; onDrillDown: (item: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="text-sm text-zinc-400">{data.category}</div>
        <div className="mt-2 text-2xl font-bold text-zinc-100">{data.summary.value}</div>
        <div className="mt-1 text-xs text-zinc-500">{data.summary.impact}</div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">Detailed Breakdown</h3>
        <div className="space-y-3">
          {data.items.map((item: any, idx: number) => (
            <button
              key={idx}
              onClick={() => onDrillDown(item)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-100">{item.subcategory}</div>
                  <div className="mt-1 text-xs text-zinc-400">{item.details}</div>
                  <div className="mt-2 text-xs text-zinc-500">
                    {item.count} transactions • Last: {item.lastOccurred}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-zinc-100">{item.amount}</div>
                  <div className={`mt-1 text-xs ${item.trend === "up" ? "text-rose-400" : "text-emerald-400"}`}>
                    {item.trend === "up" ? "↑" : "↓"} {item.change}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Level3Content({ data, onDrillDown }: { data: any; onDrillDown: (item: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="text-sm text-zinc-400">{data.subcategory}</div>
        <div className="mt-2 text-xl font-bold text-zinc-100">{data.summary.amount}</div>
        <div className="mt-1 text-xs text-zinc-500">{data.summary.count} individual transactions</div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">Individual Transactions</h3>
        <div className="space-y-3">
          {data.transactions.map((tx: any, idx: number) => (
            <button
              key={idx}
              onClick={() => onDrillDown(tx)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-zinc-100">{tx.id}</div>
                    {tx.verified && <Shield className="h-3 w-3 text-emerald-400" />}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{tx.description}</div>
                  <div className="mt-2 text-xs text-zinc-500">
                    {tx.date} • {tx.source}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-zinc-100">{tx.amount}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                    <span>View Receipt</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Level4Content({ data }: { data: any }) {
  const receipt = data.receipt;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-400">Transaction ID</div>
            <div className="mt-1 font-mono text-lg font-bold text-zinc-100">{data.transaction.id}</div>
          </div>
          {data.transaction.verified && (
            <Shield className="h-8 w-8 text-emerald-400" />
          )}
        </div>
        <div className="mt-4 text-sm text-zinc-300">{data.transaction.description}</div>
        <div className="mt-2 text-xs text-zinc-500">{data.transaction.date} • {data.transaction.source}</div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">Evidence Receipt</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Confidence Score</span>
            <span className={`font-bold ${receipt.confidence >= 0.9 ? "text-emerald-400" : receipt.confidence >= 0.7 ? "text-amber-400" : "text-rose-400"}`}>
              {Math.round(receipt.confidence * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">DQ Tests</span>
            <span className="font-bold text-zinc-100">{receipt.dqPassed}/{receipt.dqTotal} passed</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Freshness</span>
            <span className="font-bold text-zinc-100">{receipt.freshness}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Owner</span>
            <span className="font-bold text-zinc-100">{receipt.owner}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Cryptographic Hash</span>
            <span className="font-mono text-xs text-zinc-100">{receipt.hash}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">Source Lineage</h3>
        <div className="space-y-2">
          {receipt.lineage.map((step: any, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-zinc-600" />
              <div className="flex-1">
                <div className="text-sm text-zinc-200">{step.system}</div>
                <div className="text-xs text-zinc-500">{step.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {receipt.notes && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">Notes</h3>
          <div className="text-sm leading-relaxed text-zinc-300">{receipt.notes}</div>
        </div>
      )}
    </div>
  );
}

// Mock data generators
function generateLevel1Data(key: string) {
  const mockData: Record<string, any[]> = {
    costTrendStress: [
      { category: "Medical Trend", description: "Hospital & physician costs", value: "+12.4%", impact: "High risk" },
      { category: "Pharmacy Trend", description: "Rx & specialty drugs", value: "+18.2%", impact: "Critical" },
      { category: "Utilization Increase", description: "Visit frequency up", value: "+8.1%", impact: "Medium risk" }
    ],
    contractLeakage: [
      { category: "Pricing Errors", description: "Incorrect claim payments", value: "$2.1M", impact: "Annual leakage" },
      { category: "Out-of-Network", description: "Unapproved providers", value: "$890K", impact: "Recoverable" },
      { category: "Bundle Violations", description: "Missing bundled discounts", value: "$450K", impact: "Preventable" }
    ]
  };
  return mockData[key] || [];
}

function generateLevel2Data(key: string, category: any) {
  return [
    { subcategory: "Inpatient Claims", details: "Hospital admissions and procedures", count: 247, lastOccurred: "2 hours ago", amount: "$1.2M", trend: "up", change: "15%" },
    { subcategory: "Outpatient Services", details: "Clinic visits and diagnostics", count: 1432, lastOccurred: "30 min ago", amount: "$680K", trend: "down", change: "8%" },
    { subcategory: "Emergency Room", details: "ER visits and urgent care", count: 89, lastOccurred: "1 hour ago", amount: "$340K", trend: "up", change: "22%" }
  ];
}

function generateLevel3Data(key: string, item: any) {
  return [
    { id: "CLM-2024-18492", description: "Cardiac catheterization procedure", date: "Jan 28, 2024", source: "UnitedHealthcare", amount: "$45,200", verified: true },
    { id: "CLM-2024-18401", description: "MRI scan with contrast", date: "Jan 27, 2024", source: "Cigna", amount: "$12,800", verified: true },
    { id: "CLM-2024-18365", description: "Physical therapy sessions (8x)", date: "Jan 26, 2024", source: "Aetna", amount: "$3,200", verified: false }
  ];
}

function generateLevel4Data(key: string, transaction: any) {
  return {
    confidence: 0.94,
    dqPassed: 47,
    dqTotal: 50,
    freshness: "12 minutes ago",
    owner: "Claims Analytics Team",
    hash: "a3f9c8e2...7d4b1a9c",
    lineage: [
      { system: "UnitedHealthcare EDI 837", timestamp: "2024-01-28 09:15:22 UTC" },
      { system: "Kincaid IQ Claim Parser", timestamp: "2024-01-28 09:15:45 UTC" },
      { system: "DQ Validation Engine", timestamp: "2024-01-28 09:16:03 UTC" },
      { system: "Evidence Receipt Generator", timestamp: "2024-01-28 09:16:12 UTC" }
    ],
    notes: "High-value cardiac procedure verified against master fee schedule. All required documentation present. Provider credentials validated. Network status confirmed."
  };
}