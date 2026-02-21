import { X, ChevronLeft, Shield, AlertTriangle, TrendingUp, TrendingDown, ExternalLink, FileText, CheckCircle2, Star, Users, Pill as PillIcon } from "lucide-react";
import { useState } from "react";
import type { TileData } from "./executiveTypes";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

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
      nextTitle = `${item.category} Breakdown`;
      nextData = {
        category: item.category,
        items: generateLevel2Data(tile.key, item),
        summary: item,
        tileKey: tile.key
      };
    } else if (nextLevel === 3) {
      nextTitle = `${item.subcategory} Details`;
      nextData = {
        subcategory: item.subcategory,
        transactions: generateLevel3Data(tile.key, item),
        summary: item,
        tileKey: tile.key
      };
    } else if (nextLevel === 4) {
      nextTitle = `Evidence Receipt`;
      nextData = {
        transaction: item,
        receipt: generateLevel4Data(tile.key, item),
        tileKey: tile.key
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
                  <span className="rounded-full bg-amber-500/20 px-2 py-1 text-amber-400">Level {currentLevel.level} of 4</span>
                  <span className="text-zinc-600">→</span>
                  {drillStack.slice(0, 3).map((level, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      {idx > 0 && <span className="text-zinc-600">→</span>}
                      <span className={level.level === currentLevel.level ? "text-zinc-100 font-medium" : "text-zinc-500"}>
                        {level.title.substring(0, 20)}{level.title.length > 20 ? "..." : ""}
                      </span>
                    </span>
                  ))}
                  {drillStack.length > 3 && <span className="text-zinc-600">...</span>}
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
  const trendData = generateTrendData(tile.key);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl font-bold text-zinc-100">{tile.value}</div>
            {tile.delta && (
              <div className="mt-2 flex items-center gap-2 text-sm text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span>{tile.delta}</span>
              </div>
            )}
            {tile.subtitle && <div className="mt-2 text-sm text-zinc-400">{tile.subtitle}</div>}
          </div>
          <div className="h-16 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#trendGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <TrendingDown className="h-4 w-4 text-amber-400" />
          Contributing Factors (Click to drill down)
        </h3>
        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(cat)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-amber-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-zinc-100">{cat.category}</div>
                    {cat.severity && (
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        cat.severity === "critical" ? "bg-rose-500/20 text-rose-400" :
                        cat.severity === "high" ? "bg-amber-500/20 text-amber-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {cat.severity}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{cat.description}</div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold text-zinc-100">{cat.value}</div>
                  <div className="mt-1 text-xs text-zinc-500">{cat.impact}</div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-amber-400 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-blue-300">Evidence-Backed Analysis</div>
            <div className="mt-1 text-xs text-zinc-400">
              All metrics traced to source receipts: vendor invoices, contracts, 5500s, and claim data. Click any factor to see proof.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level2Content({ data, onDrillDown }: { data: any; onDrillDown: (item: any) => void }) {
  const chartData = generateChartData(data.tileKey, data.category);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="text-sm text-zinc-400">{data.category}</div>
        <div className="mt-2 flex items-baseline gap-3">
          <div className="text-2xl font-bold text-zinc-100">{data.summary.value}</div>
          {data.summary.trend && (
            <div className={`text-sm ${data.summary.trend === "up" ? "text-rose-400" : "text-emerald-400"}`}>
              {data.summary.trend === "up" ? "↑" : "↓"} vs last period
            </div>
          )}
        </div>
        <div className="mt-1 text-xs text-zinc-500">{data.summary.impact}</div>
        
        <div className="mt-4 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#52525b" fontSize={10} />
              <YAxis stroke="#52525b" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }}
                labelStyle={{ color: "#a1a1aa" }}
              />
              <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <FileText className="h-4 w-4 text-amber-400" />
          Detailed Breakdown (Click to see transactions)
        </h3>
        <div className="space-y-3">
          {data.items.map((item: any, idx: number) => (
            <button
              key={idx}
              onClick={() => onDrillDown(item)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-amber-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-zinc-100">{item.subcategory}</div>
                    {item.verified !== undefined && (
                      item.verified ? 
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" /> :
                        <AlertTriangle className="h-3 w-3 text-amber-400" />
                    )}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{item.details}</div>
                  <div className="mt-2 text-xs text-zinc-500">
                    {item.count} transactions • Last: {item.lastOccurred}
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-base font-bold text-zinc-100">{item.amount}</div>
                  <div className={`mt-1 text-xs ${item.trend === "up" ? "text-rose-400" : "text-emerald-400"}`}>
                    {item.trend === "up" ? "↑" : "↓"} {item.change}
                  </div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-amber-400 group-hover:translate-x-1" />
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
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="text-sm text-zinc-400">{data.subcategory}</div>
        <div className="mt-2 text-xl font-bold text-zinc-100">{data.summary.amount}</div>
        <div className="mt-1 text-xs text-zinc-500">{data.summary.count} individual transactions</div>
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-zinc-900/60 p-3">
            <div className="text-xs text-zinc-400">Verified</div>
            <div className="mt-1 text-sm font-bold text-emerald-400">
              {Math.floor(data.summary.count * 0.87)}
            </div>
          </div>
          <div className="rounded-lg bg-zinc-900/60 p-3">
            <div className="text-xs text-zinc-400">Pending</div>
            <div className="mt-1 text-sm font-bold text-amber-400">
              {Math.floor(data.summary.count * 0.10)}
            </div>
          </div>
          <div className="rounded-lg bg-zinc-900/60 p-3">
            <div className="text-xs text-zinc-400">Flagged</div>
            <div className="mt-1 text-sm font-bold text-rose-400">
              {Math.floor(data.summary.count * 0.03)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <ExternalLink className="h-4 w-4 text-amber-400" />
          Individual Transactions (Click to see evidence receipt)
        </h3>
        <div className="space-y-3">
          {data.transactions.map((tx: any, idx: number) => (
            <button
              key={idx}
              onClick={() => onDrillDown(tx)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-amber-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm font-medium text-zinc-100">{tx.id}</div>
                    {tx.verified ? (
                      <Shield className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-amber-400" />
                    )}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{tx.description}</div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span>{tx.source}</span>
                    {tx.receiptCount && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400">{tx.receiptCount} receipts</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-base font-bold text-zinc-100">{tx.amount}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-400">
                    <span>View Receipt</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-amber-400 group-hover:translate-x-1" />
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
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-zinc-900/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-400">Transaction ID</div>
            <div className="mt-1 font-mono text-lg font-bold text-zinc-100">{data.transaction.id}</div>
          </div>
          {data.transaction.verified && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-3 py-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Verified</span>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-zinc-300">{data.transaction.description}</div>
        <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
          <span>{data.transaction.date}</span>
          <span>•</span>
          <span>{data.transaction.source}</span>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <FileText className="h-4 w-4 text-amber-400" />
          Evidence Receipt
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-sm text-zinc-400">Confidence Score</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 rounded-full bg-zinc-800">
                <div 
                  className={`h-full rounded-full ${
                    receipt.confidence >= 0.9 ? "bg-emerald-500" : 
                    receipt.confidence >= 0.7 ? "bg-amber-500" : 
                    "bg-rose-500"
                  }`}
                  style={{ width: `${receipt.confidence * 100}%` }}
                />
              </div>
              <span className={`font-bold text-sm ${
                receipt.confidence >= 0.9 ? "text-emerald-400" : 
                receipt.confidence >= 0.7 ? "text-amber-400" : 
                "text-rose-400"
              }`}>
                {Math.round(receipt.confidence * 100)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-sm text-zinc-400">Data Quality Tests</span>
            <span className="font-bold text-sm text-zinc-100">{receipt.dqPassed}/{receipt.dqTotal} passed</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-sm text-zinc-400">Data Freshness</span>
            <span className="font-bold text-sm text-zinc-100">{receipt.freshness}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-sm text-zinc-400">Data Owner</span>
            <span className="font-bold text-sm text-zinc-100">{receipt.owner}</span>
          </div>
          <div className="rounded-lg bg-zinc-900/60 p-3">
            <div className="text-sm text-zinc-400 mb-2">Cryptographic Hash</div>
            <div className="font-mono text-xs text-amber-400 break-all">{receipt.hash}</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <TrendingDown className="h-4 w-4 text-blue-400" />
          Source Lineage & Provenance
        </h3>
        <div className="space-y-3">
          {receipt.lineage.map((step: any, idx: number) => (
            <div key={idx} className="flex items-start gap-3 rounded-lg bg-zinc-900/60 p-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-200">{step.system}</div>
                <div className="mt-1 font-mono text-xs text-zinc-500">{step.timestamp}</div>
              </div>
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
            </div>
          ))}
        </div>
      </div>

      {receipt.attachments && receipt.attachments.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <FileText className="h-4 w-4 text-purple-400" />
            Attached Documents ({receipt.attachments.length})
          </h3>
          <div className="space-y-2">
            {receipt.attachments.map((att: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-500/20 p-2">
                    <FileText className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-200">{att.name}</div>
                    <div className="text-xs text-zinc-500">{att.type} • {att.size}</div>
                  </div>
                </div>
                <button className="text-xs text-amber-400 hover:text-amber-300">Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {receipt.notes && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <FileText className="h-4 w-4 text-zinc-400" />
            Analyst Notes
          </h3>
          <div className="text-sm leading-relaxed text-zinc-300">{receipt.notes}</div>
        </div>
      )}

      <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
        <div className="flex items-start gap-3">
          <Star className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-amber-300">Evidence Receipt Complete</div>
            <div className="mt-1 text-xs text-zinc-400">
              This transaction has been verified with cryptographic proof, lineage tracking, and quality assurance. All source documents are attached and traceable.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced mock data generators for all 8 tiles
function generateLevel1Data(key: string) {
  const mockData: Record<string, any[]> = {
    costTrendStress: [
      { category: "Medical Trend", description: "Hospital & physician costs escalating", value: "+12.4%", impact: "High risk", severity: "critical" },
      { category: "Pharmacy Trend", description: "Rx & specialty drugs inflation", value: "+18.2%", impact: "Critical risk", severity: "critical" },
      { category: "Utilization Increase", description: "Visit frequency and complexity up", value: "+8.1%", impact: "Medium risk", severity: "high" }
    ],
    contractLeakage: [
      { category: "Pricing Errors", description: "Incorrect claim payment amounts", value: "$2.1M", impact: "Annual leakage", severity: "critical" },
      { category: "Out-of-Network", description: "Unapproved provider payments", value: "$890K", impact: "Recoverable", severity: "high" },
      { category: "Bundle Violations", description: "Missing bundled discounts", value: "$450K", impact: "Preventable", severity: "high" }
    ],
    contractCompliance: [
      { category: "SLA Violations", description: "Service level breaches by vendors", value: "23 incidents", impact: "Contract penalties due", severity: "high" },
      { category: "Rebate Tracking", description: "Missing manufacturer rebates", value: "$1.2M", impact: "Unclaimed revenue", severity: "critical" },
      { category: "Admin Fees", description: "Unexplained administrative charges", value: "$340K", impact: "Audit required", severity: "high" }
    ],
    contractAmbiguity: [
      { category: "Vague Terms", description: "Unclear pricing provisions", value: "14 clauses", impact: "Legal review needed", severity: "high" },
      { category: "Missing Definitions", description: "Undefined key terms", value: "8 items", impact: "Risk of disputes", severity: "medium" },
      { category: "Conflicting Clauses", description: "Contradictory provisions", value: "5 conflicts", impact: "Legal exposure", severity: "critical" }
    ],
    planDesignAdoption: [
      { category: "HDHP Enrollment", description: "High deductible health plan adoption", value: "67%", impact: "+12% vs target", severity: "medium" },
      { category: "HSA Contributions", description: "Health savings account funding", value: "$4.2M", impact: "Tax advantaged", severity: "medium" },
      { category: "Preventive Care", description: "Wellness program participation", value: "58%", impact: "Below benchmark", severity: "high" }
    ],
    pharmacyExposure: [
      { category: "Specialty Drugs", description: "High-cost medication claims", value: "$8.9M", impact: "+24% YoY", severity: "critical" },
      { category: "Non-Formulary", description: "Off-formulary prescriptions", value: "$2.1M", impact: "Avoidable spend", severity: "high" },
      { category: "Generic Utilization", description: "Generic substitution rate", value: "72%", impact: "Below 85% target", severity: "high" }
    ],
    benefitsNPS: [
      { category: "Promoters", description: "Highly satisfied employees (9-10)", value: "45%", impact: "Strong advocacy", severity: "medium" },
      { category: "Passives", description: "Neutral employees (7-8)", value: "38%", impact: "At risk of churn", severity: "medium" },
      { category: "Detractors", description: "Dissatisfied employees (0-6)", value: "17%", impact: "Urgent action needed", severity: "high" }
    ],
    employeeNPS: [
      { category: "Claims Experience", description: "Satisfaction with claims process", value: "62 NPS", impact: "Above benchmark", severity: "medium" },
      { category: "Provider Network", description: "Access to preferred providers", value: "58 NPS", impact: "Network gaps", severity: "high" },
      { category: "Cost Transparency", description: "Understanding of out-of-pocket costs", value: "41 NPS", impact: "Communication issue", severity: "high" }
    ]
  };
  return mockData[key] || [];
}

function generateLevel2Data(key: string, category: any) {
  const mockDataLevel2: Record<string, any[]> = {
    costTrendStress: [
      { subcategory: "Inpatient Claims", details: "Hospital admissions and procedures", count: 247, lastOccurred: "2 hours ago", amount: "$1.2M", trend: "up", change: "15%", verified: true },
      { subcategory: "Outpatient Services", details: "Clinic visits and diagnostics", count: 1432, lastOccurred: "30 min ago", amount: "$680K", trend: "down", change: "8%", verified: true },
      { subcategory: "Emergency Room", details: "ER visits and urgent care", count: 89, lastOccurred: "1 hour ago", amount: "$340K", trend: "up", change: "22%", verified: true }
    ],
    contractLeakage: [
      { subcategory: "Duplicate Payments", details: "Same claim paid twice", count: 47, lastOccurred: "4 hours ago", amount: "$890K", trend: "down", change: "12%", verified: false },
      { subcategory: "Pricing Discrepancy", details: "Amount exceeds contract rate", count: 234, lastOccurred: "1 hour ago", amount: "$1.1M", trend: "up", change: "18%", verified: false },
      { subcategory: "Unbundling", details: "Services billed separately vs bundled", count: 78, lastOccurred: "3 hours ago", amount: "$560K", trend: "up", change: "9%", verified: true }
    ],
    contractCompliance: [
      { subcategory: "Turnaround Time", details: "Claims processing exceeded SLA", count: 156, lastOccurred: "6 hours ago", amount: "$45K", trend: "up", change: "31%", verified: true },
      { subcategory: "Audit Rights", details: "Vendor denied audit access", count: 3, lastOccurred: "2 days ago", amount: "$120K", trend: "up", change: "200%", verified: false },
      { subcategory: "Performance Guarantees", details: "Service metrics below threshold", count: 12, lastOccurred: "1 day ago", amount: "$78K", trend: "down", change: "15%", verified: true }
    ],
    contractAmbiguity: [
      { subcategory: "Payment Terms", details: "Unclear pricing methodology", count: 8, lastOccurred: "5 days ago", amount: "N/A", trend: "up", change: "N/A", verified: false },
      { subcategory: "Termination Clauses", details: "Vague exit provisions", count: 5, lastOccurred: "3 days ago", amount: "N/A", trend: "up", change: "N/A", verified: false },
      { subcategory: "Liability Limits", details: "Unclear indemnification scope", count: 4, lastOccurred: "1 week ago", amount: "N/A", trend: "down", change: "N/A", verified: true }
    ],
    planDesignAdoption: [
      { subcategory: "New Enrollees", details: "Employees selecting HDHP", count: 342, lastOccurred: "1 day ago", amount: "$2.1M", trend: "up", change: "14%", verified: true },
      { subcategory: "Plan Switchers", details: "Migration from PPO to HDHP", count: 178, lastOccurred: "2 days ago", amount: "$890K", trend: "up", change: "8%", verified: true },
      { subcategory: "Opt-Outs", details: "Declined coverage entirely", count: 23, lastOccurred: "3 hours ago", amount: "-$145K", trend: "down", change: "5%", verified: true }
    ],
    pharmacyExposure: [
      { subcategory: "Oncology Drugs", details: "Cancer treatment medications", count: 89, lastOccurred: "4 hours ago", amount: "$4.2M", trend: "up", change: "28%", verified: true },
      { subcategory: "Biologics", details: "Autoimmune and specialty biologics", count: 134, lastOccurred: "2 hours ago", amount: "$3.1M", trend: "up", change: "19%", verified: true },
      { subcategory: "Orphan Drugs", details: "Rare disease medications", count: 12, lastOccurred: "1 day ago", amount: "$1.6M", trend: "up", change: "45%", verified: true }
    ],
    benefitsNPS: [
      { subcategory: "Annual Enrollment", details: "Satisfaction with enrollment process", count: 2456, lastOccurred: "1 month ago", amount: "N/A", trend: "up", change: "8 pts", verified: true },
      { subcategory: "Customer Service", details: "HR benefits support responsiveness", count: 1823, lastOccurred: "2 days ago", amount: "N/A", trend: "down", change: "3 pts", verified: true },
      { subcategory: "Plan Selection", details: "Range and quality of plan options", count: 2456, lastOccurred: "1 month ago", amount: "N/A", trend: "up", change: "5 pts", verified: true }
    ],
    employeeNPS: [
      { subcategory: "Explanation of Benefits", details: "Clarity of EOB documents", count: 3421, lastOccurred: "1 day ago", amount: "N/A", trend: "down", change: "4 pts", verified: false },
      { subcategory: "Provider Directory", details: "Accuracy of network listings", count: 2890, lastOccurred: "3 days ago", amount: "N/A", trend: "up", change: "6 pts", verified: true },
      { subcategory: "Cost Estimator Tools", details: "Pre-service cost transparency", count: 1567, lastOccurred: "1 week ago", amount: "N/A", trend: "down", change: "7 pts", verified: false }
    ]
  };
  return mockDataLevel2[key] || mockDataLevel2.costTrendStress;
}

function generateLevel3Data(key: string, item: any) {
  const mockDataLevel3: Record<string, any[]> = {
    costTrendStress: [
      { id: "CLM-2024-18492", description: "Cardiac catheterization procedure at Memorial Hospital", date: "Jan 28, 2024", source: "UnitedHealthcare EDI", amount: "$45,200", verified: true, receiptCount: 3 },
      { id: "CLM-2024-18401", description: "MRI scan with contrast - brain imaging", date: "Jan 27, 2024", source: "Cigna Claims Portal", amount: "$12,800", verified: true, receiptCount: 2 },
      { id: "CLM-2024-18365", description: "Physical therapy sessions (8 visits)", date: "Jan 26, 2024", source: "Aetna Clearinghouse", amount: "$3,200", verified: false, receiptCount: 1 },
      { id: "CLM-2024-18298", description: "Emergency appendectomy with complications", date: "Jan 25, 2024", source: "UnitedHealthcare EDI", amount: "$62,400", verified: true, receiptCount: 5 }
    ],
    contractLeakage: [
      { id: "LSE-2024-5621", description: "PBM rebate calculation discrepancy - Q4 2023", date: "Jan 29, 2024", source: "Contract Audit System", amount: "$234,000", verified: false, receiptCount: 7 },
      { id: "LSE-2024-5598", description: "Out-of-network cardiac surgery - no auth", date: "Jan 28, 2024", source: "Claims Review", amount: "$89,400", verified: false, receiptCount: 4 },
      { id: "LSE-2024-5543", description: "Duplicate payment - claim processed twice", date: "Jan 26, 2024", source: "Duplicate Detection", amount: "$23,100", verified: true, receiptCount: 2 }
    ],
    contractCompliance: [
      { id: "CMP-2024-1045", description: "Claims turnaround SLA breach - batch delay", date: "Jan 30, 2024", source: "Performance Monitoring", amount: "$15,000", verified: true, receiptCount: 3 },
      { id: "CMP-2024-1023", description: "Missing quarterly audit report from TPA", date: "Jan 25, 2024", source: "Compliance Tracking", amount: "$45,000", verified: false, receiptCount: 1 },
      { id: "CMP-2024-0998", description: "Network adequacy below contractual threshold", date: "Jan 22, 2024", source: "Network Analytics", amount: "$32,000", verified: true, receiptCount: 2 }
    ],
    contractAmbiguity: [
      { id: "AMB-2024-0234", description: "PBM contract - vague rebate sharing clause", date: "Jan 20, 2024", source: "Legal Review", amount: "N/A", verified: false, receiptCount: 4 },
      { id: "AMB-2024-0211", description: "TPA agreement - unclear data ownership terms", date: "Jan 15, 2024", source: "Contract Analysis", amount: "N/A", verified: false, receiptCount: 2 },
      { id: "AMB-2024-0198", description: "Stop-loss policy - ambiguous covered conditions", date: "Jan 10, 2024", source: "Risk Management", amount: "N/A", verified: true, receiptCount: 3 }
    ],
    planDesignAdoption: [
      { id: "ENR-2024-8923", description: "New hire elected HDHP with HSA", date: "Jan 29, 2024", source: "HRIS System", amount: "$3,200", verified: true, receiptCount: 1 },
      { id: "ENR-2024-8901", description: "Annual enrollment - switched from PPO to HDHP", date: "Jan 28, 2024", source: "Benefits Portal", amount: "$4,500", verified: true, receiptCount: 2 },
      { id: "ENR-2024-8876", description: "Mid-year change - qualified life event", date: "Jan 25, 2024", source: "Benefits Portal", amount: "$2,800", verified: true, receiptCount: 1 }
    ],
    pharmacyExposure: [
      { id: "RX-2024-34521", description: "Keytruda immunotherapy - stage 3 cancer", date: "Jan 30, 2024", source: "CVS Caremark", amount: "$18,400", verified: true, receiptCount: 3 },
      { id: "RX-2024-34498", description: "Humira injection - rheumatoid arthritis", date: "Jan 29, 2024", source: "Express Scripts", amount: "$7,200", verified: true, receiptCount: 2 },
      { id: "RX-2024-34467", description: "Spinraza - spinal muscular atrophy", date: "Jan 27, 2024", source: "Specialty Pharmacy", amount: "$125,000", verified: true, receiptCount: 5 }
    ],
    benefitsNPS: [
      { id: "NPS-2024-0145", description: "Annual enrollment survey - promoter response", date: "Jan 15, 2024", source: "Qualtrics Survey", amount: "N/A", verified: true, receiptCount: 1 },
      { id: "NPS-2024-0132", description: "Mid-year benefits survey - passive response", date: "Jan 10, 2024", source: "Employee Pulse", amount: "N/A", verified: true, receiptCount: 1 },
      { id: "NPS-2024-0098", description: "Claims experience survey - detractor feedback", date: "Jan 5, 2024", source: "Post-Claim Survey", amount: "N/A", verified: true, receiptCount: 2 }
    ],
    employeeNPS: [
      { id: "EXP-2024-2341", description: "Claims portal usability feedback - positive", date: "Jan 28, 2024", source: "User Feedback", amount: "N/A", verified: true, receiptCount: 1 },
      { id: "EXP-2024-2298", description: "Provider search tool - negative experience", date: "Jan 22, 2024", source: "Support Ticket", amount: "N/A", verified: false, receiptCount: 1 },
      { id: "EXP-2024-2276", description: "Cost estimator accuracy - mixed feedback", date: "Jan 18, 2024", source: "Feature Survey", amount: "N/A", verified: true, receiptCount: 2 }
    ]
  };
  return mockDataLevel3[key] || mockDataLevel3.costTrendStress;
}

function generateLevel4Data(key: string, transaction: any) {
  const mockReceiptData: Record<string, any> = {
    costTrendStress: {
      confidence: 0.94,
      dqPassed: 47,
      dqTotal: 50,
      freshness: "12 minutes ago",
      owner: "Claims Analytics Team",
      hash: "a3f9c8e2d4b7f3a1c9e5d8b2f4a7c3e1b9d5f2a8c4e7b1d3f5a9c2e4b8d1f3a5c7e2b4d6f9a1c3e5",
      lineage: [
        { system: "UnitedHealthcare EDI 837 Gateway", timestamp: "2024-01-28 09:15:22 UTC" },
        { system: "Kincaid IQ Claim Parser Engine", timestamp: "2024-01-28 09:15:45 UTC" },
        { system: "Data Quality Validation Engine", timestamp: "2024-01-28 09:16:03 UTC" },
        { system: "Evidence Receipt Generator", timestamp: "2024-01-28 09:16:12 UTC" },
        { system: "Cryptographic Hash Generator", timestamp: "2024-01-28 09:16:15 UTC" }
      ],
      attachments: [
        { name: "EOB_UHC_18492.pdf", type: "Explanation of Benefits", size: "248 KB" },
        { name: "Provider_Invoice_Memorial.pdf", type: "Provider Invoice", size: "156 KB" },
        { name: "Medical_Records_Excerpt.pdf", type: "Clinical Documentation", size: "1.2 MB" }
      ],
      notes: "High-value cardiac procedure verified against master fee schedule. All required documentation present including pre-authorization, medical necessity review, and provider credentials. Network status confirmed in-network with contracted rates applied. No exceptions or red flags identified during quality review."
    },
    contractLeakage: {
      confidence: 0.71,
      dqPassed: 38,
      dqTotal: 50,
      freshness: "2 hours ago",
      owner: "Contract Compliance Team",
      hash: "b4e8a3c1f9d2e7b5a4c8f1d3e9b2a7c5f4d8e1b6a3c9f2d7e4b1a8c5f3d9e2b6a4c7f1d8e3b5a9",
      lineage: [
        { system: "PBM Rebate File Upload", timestamp: "2024-01-29 14:22:18 UTC" },
        { system: "Contract Terms Comparison Engine", timestamp: "2024-01-29 14:23:05 UTC" },
        { system: "Discrepancy Detection Algorithm", timestamp: "2024-01-29 14:24:12 UTC" },
        { system: "Evidence Receipt Generator", timestamp: "2024-01-29 14:25:01 UTC" }
      ],
      attachments: [
        { name: "PBM_Rebate_Statement_Q4.xlsx", type: "Rebate Report", size: "892 KB" },
        { name: "Master_Contract_Terms.pdf", type: "Contract Document", size: "2.4 MB" },
        { name: "Rebate_Calculation_Worksheet.xlsx", type: "Analysis", size: "345 KB" },
        { name: "Email_Chain_Vendor_Response.pdf", type: "Correspondence", size: "124 KB" }
      ],
      notes: "Rebate calculation discrepancy identified during quarterly reconciliation. PBM-reported rebate total ($1.89M) differs from contract-based calculation ($2.12M). Awaiting vendor clarification on formulary tier classifications and manufacturer participation rates. Data quality flags: 12 SKUs with missing NDC codes, requiring manual review."
    },
    contractCompliance: {
      confidence: 0.88,
      dqPassed: 44,
      dqTotal: 50,
      freshness: "6 hours ago",
      owner: "Vendor Management Team",
      hash: "c5f9d3e1b7a4c2f8d1e6b3a9c7f2d5e4b1a8c6f3d9e2b5a7c4f1d8e3b6a9c2f5d7e1b4a8c3f6d9",
      lineage: [
        { system: "TPA Performance Monitoring Dashboard", timestamp: "2024-01-30 08:45:33 UTC" },
        { system: "SLA Compliance Checker", timestamp: "2024-01-30 08:46:12 UTC" },
        { system: "Contract Terms Reference Database", timestamp: "2024-01-30 08:47:05 UTC" },
        { system: "Evidence Receipt Generator", timestamp: "2024-01-30 08:48:22 UTC" }
      ],
      attachments: [
        { name: "TPA_Service_Agreement_2024.pdf", type: "Contract", size: "1.8 MB" },
        { name: "SLA_Performance_Report_January.pdf", type: "Performance Report", size: "456 KB" },
        { name: "Claims_Processing_Log.csv", type: "Raw Data", size: "3.2 MB" }
      ],
      notes: "Service level agreement breach detected: claims turnaround time exceeded 15-day contractual threshold for 156 claims in batch 2024-01-B. Root cause analysis indicates system downtime (4.2 hours) due to unscheduled maintenance. Penalty calculation: $15,000 per contract Section 8.3(b). Vendor acknowledgment received, credit memo pending."
    },
    default: {
      confidence: 0.92,
      dqPassed: 45,
      dqTotal: 50,
      freshness: "18 minutes ago",
      owner: "Data Governance Team",
      hash: "d6a1f4c9e2b8d5a7c3f1e9b4d2a6c8f5e1b7d3a9c4f2e8b1d5a3c7f9e2b6d4a1c8f3e5b9d2a7c4",
      lineage: [
        { system: "Source System Integration", timestamp: "2024-01-30 10:12:45 UTC" },
        { system: "Data Transformation Pipeline", timestamp: "2024-01-30 10:13:22 UTC" },
        { system: "Quality Assurance Engine", timestamp: "2024-01-30 10:14:08 UTC" },
        { system: "Evidence Receipt Generator", timestamp: "2024-01-30 10:15:01 UTC" }
      ],
      attachments: [
        { name: "Source_Document.pdf", type: "Source File", size: "567 KB" },
        { name: "Validation_Report.pdf", type: "QA Report", size: "234 KB" }
      ],
      notes: "Transaction verified with complete documentation and quality assurance checks. All required fields present and validated against business rules. No exceptions or anomalies detected during processing."
    }
  };
  return mockReceiptData[key] || mockReceiptData.default;
}

function generateTrendData(key: string) {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    value: Math.random() * 100 + 50
  }));
}

function generateChartData(key: string, category: string) {
  return [
    { name: "Jan", value: Math.random() * 100 + 50 },
    { name: "Feb", value: Math.random() * 100 + 50 },
    { name: "Mar", value: Math.random() * 100 + 50 },
    { name: "Apr", value: Math.random() * 100 + 50 },
    { name: "May", value: Math.random() * 100 + 50 },
    { name: "Jun", value: Math.random() * 100 + 50 }
  ];
}