import { CheckCircle, XCircle, Clock, Zap, TrendingUp, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface EngineExecution {
  id: string;
  name: string;
  category: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime?: number;
  endTime?: number;
  executionTimeMs?: number;
  result?: any;
}

const engineCategories = [
  { id: 'financial', name: 'Financial & Trend', color: 'cyan', count: 20 },
  { id: 'economics', name: 'Healthcare Economics', color: 'emerald', count: 20 },
  { id: 'fiduciary', name: 'Fiduciary & Governance', color: 'purple', count: 25 },
  { id: 'workforce', name: 'Workforce & HC', color: 'amber', count: 20 },
  { id: 'predictive', name: 'Predictive AI', color: 'indigo', count: 20 },
  { id: 'pe_cfo', name: 'PE & CFO', color: 'rose', count: 20 },
];

const sampleEngines = [
  { id: 'medical-trend', name: 'Medical Trend Forecasting', category: 'financial' },
  { id: 'rx-trend', name: 'Rx Trend Forecasting', category: 'financial' },
  { id: 'cat-claims', name: 'Catastrophic Claims', category: 'financial' },
  { id: 'high-cost', name: 'High-Cost Claimant', category: 'financial' },
  { id: 'glp1', name: 'GLP-1 Financial Impact', category: 'financial' },
  { id: 'gene-therapy', name: 'Gene Therapy Exposure', category: 'financial' },
  { id: 'oncology', name: 'Oncology Cost Projection', category: 'financial' },
  { id: 'inflation', name: 'Inflation Decomposition', category: 'financial' },
  { id: 'provider-cost', name: 'Provider Unit Cost', category: 'financial' },
  { id: 'utilization', name: 'Utilization Trend', category: 'financial' },
  { id: 'geographic', name: 'Geographic Normalization', category: 'financial' },
  { id: 'risk-adjust', name: 'Risk Adjustment', category: 'financial' },
  { id: 'specialty-pharma', name: 'Specialty Pharmacy', category: 'economics' },
  { id: 'biosimilar', name: 'Biosimilar Adoption', category: 'economics' },
  { id: 'pbm-spread', name: 'PBM Spread Detection', category: 'economics' },
  { id: 'reference-pricing', name: 'Reference-Based Pricing', category: 'economics' },
  { id: 'erisa-scoring', name: 'ERISA Fiduciary Scoring', category: 'fiduciary' },
  { id: 'pbm-contract', name: 'PBM Contract Scoring', category: 'fiduciary' },
  { id: 'hidden-revenue', name: 'Hidden Revenue Detection', category: 'fiduciary' },
  { id: 'conflict-interest', name: 'Conflict of Interest', category: 'fiduciary' },
  { id: 'workforce-risk', name: 'Workforce Health Risk', category: 'workforce' },
  { id: 'absenteeism', name: 'Absenteeism Forecasting', category: 'workforce' },
  { id: 'presenteeism', name: 'Presenteeism Impact', category: 'workforce' },
  { id: 'large-claimant-pred', name: 'Large Claimant Prediction', category: 'predictive' },
  { id: 'admission-pred', name: 'Hospital Admission', category: 'predictive' },
  { id: 'fraud-detection', name: 'Fraud Detection', category: 'predictive' },
  { id: 'ebitda', name: 'EBITDA Enhancement', category: 'pe_cfo' },
  { id: 'cash-flow', name: 'Cash Flow Forecasting', category: 'pe_cfo' },
  { id: 'synergy', name: 'Synergy Valuation', category: 'pe_cfo' },
];

export function EngineExecutionDashboard({ isRunning }: { isRunning: boolean }) {
  const [engines, setEngines] = useState<EngineExecution[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    queued: 0,
    running: 0,
    completed: 0,
    failed: 0,
    avgExecutionTime: 0,
  });

  useEffect(() => {
    if (!isRunning) return;

    // Initialize engines
    const initialEngines = sampleEngines.map(engine => ({
      ...engine,
      status: 'queued' as const,
      progress: 0,
    }));
    setEngines(initialEngines);

    // Simulate parallel execution
    const executeEngine = (index: number) => {
      if (index >= initialEngines.length) return;

      const engine = initialEngines[index];
      
      // Start engine
      setEngines(prev => prev.map((e, i) => 
        i === index ? { ...e, status: 'running', startTime: Date.now() } : e
      ));

      // Simulate progress
      const progressInterval = setInterval(() => {
        setEngines(prev => prev.map((e, i) => {
          if (i !== index || e.status !== 'running') return e;
          const newProgress = Math.min(100, e.progress + Math.random() * 30);
          return { ...e, progress: newProgress };
        }));
      }, 200);

      // Complete engine
      const duration = 1000 + Math.random() * 3000;
      setTimeout(() => {
        clearInterval(progressInterval);
        const success = Math.random() > 0.05; // 95% success rate
        
        setEngines(prev => prev.map((e, i) => 
          i === index ? {
            ...e,
            status: success ? 'completed' : 'failed',
            progress: 100,
            endTime: Date.now(),
            executionTimeMs: duration,
            result: success ? { impact: Math.random() * 1000000 } : undefined,
          } : e
        ));
      }, duration);
    };

    // Start engines in batches (parallel execution)
    const batchSize = 6;
    let currentBatch = 0;

    const startNextBatch = () => {
      const start = currentBatch * batchSize;
      const end = Math.min(start + batchSize, initialEngines.length);
      
      for (let i = start; i < end; i++) {
        setTimeout(() => executeEngine(i), Math.random() * 500);
      }

      currentBatch++;
      if (end < initialEngines.length) {
        setTimeout(startNextBatch, 2000);
      }
    };

    startNextBatch();
  }, [isRunning]);

  // Update stats
  useEffect(() => {
    const queued = engines.filter(e => e.status === 'queued').length;
    const running = engines.filter(e => e.status === 'running').length;
    const completed = engines.filter(e => e.status === 'completed').length;
    const failed = engines.filter(e => e.status === 'failed').length;
    
    const completedEngines = engines.filter(e => e.executionTimeMs);
    const avgTime = completedEngines.length > 0
      ? completedEngines.reduce((sum, e) => sum + (e.executionTimeMs || 0), 0) / completedEngines.length
      : 0;

    setStats({
      total: engines.length,
      queued,
      running,
      completed,
      failed,
      avgExecutionTime: avgTime,
    });
  }, [engines]);

  const getCategoryColor = (category: string) => {
    const cat = engineCategories.find(c => c.id === category);
    return cat?.color || 'gray';
  };

  const getCategoryStats = (categoryId: string) => {
    const categoryEngines = engines.filter(e => e.category === categoryId);
    const completed = categoryEngines.filter(e => e.status === 'completed').length;
    const total = categoryEngines.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
          <div className="relative">
            <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
            <div className="text-sm text-gray-400 mt-1">Total Engines</div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
          <div className="relative">
            <div className="text-3xl font-bold text-amber-400">{stats.queued}</div>
            <div className="text-sm text-gray-400 mt-1">Queued</div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 relative overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
          <div className="relative">
            <div className="text-3xl font-bold text-cyan-400">{stats.running}</div>
            <div className="text-sm text-gray-400 mt-1">Running</div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
          <div className="relative">
            <div className="text-3xl font-bold text-emerald-400">{stats.completed}</div>
            <div className="text-sm text-gray-400 mt-1">Completed</div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
          <div className="relative">
            <div className="text-3xl font-bold text-purple-400">{(stats.avgExecutionTime / 1000).toFixed(1)}s</div>
            <div className="text-sm text-gray-400 mt-1">Avg Time</div>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Category Progress
        </h3>

        <div className="space-y-3">
          {engineCategories.map(category => {
            const catStats = getCategoryStats(category.id);
            return (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white font-medium">{category.name}</span>
                  <span className="text-gray-400">
                    {catStats.completed}/{catStats.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${category.color}-600 to-${category.color}-400 rounded-full transition-all duration-500`}
                    style={{ width: `${catStats.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engine List */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Engine Execution Log
        </h3>

        <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2">
          {engines.map((engine, index) => (
            <div
              key={engine.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                engine.status === 'running'
                  ? `bg-${getCategoryColor(engine.category)}-500/10 border-${getCategoryColor(engine.category)}-500/30 shadow-lg`
                  : engine.status === 'completed'
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : engine.status === 'failed'
                  ? 'bg-red-500/5 border-red-500/20'
                  : 'bg-slate-800/30 border-slate-700/30'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {engine.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                  {engine.status === 'failed' && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  {engine.status === 'running' && (
                    <div className="relative">
                      <Clock className="w-5 h-5 text-cyan-400 animate-spin" />
                      <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm animate-pulse" />
                    </div>
                  )}
                  {engine.status === 'queued' && (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                  )}
                </div>

                {/* Engine Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm">{engine.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-${getCategoryColor(engine.category)}-500/20 text-${getCategoryColor(engine.category)}-400`}>
                      {engineCategories.find(c => c.id === engine.category)?.name}
                    </span>
                  </div>
                  
                  {engine.status === 'running' && (
                    <div className="mt-2">
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${getCategoryColor(engine.category)}-600 to-${getCategoryColor(engine.category)}-400 rounded-full transition-all duration-300`}
                          style={{ width: `${engine.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {engine.executionTimeMs && (
                    <div className="text-xs text-gray-500 mt-1">
                      {(engine.executionTimeMs / 1000).toFixed(2)}s
                    </div>
                  )}
                </div>

                {/* Result Indicator */}
                {engine.status === 'completed' && engine.result && (
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400">
                      ${(engine.result.impact / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-gray-500">Impact</div>
                  </div>
                )}

                {engine.status === 'running' && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Summary */}
      {stats.completed + stats.failed === stats.total && stats.total > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Execution Complete</h3>
              <p className="text-gray-400 text-sm">All {stats.total} engines have finished processing</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">{stats.completed}</div>
              <div className="text-xs text-gray-400 mt-1">Successful</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
              <div className="text-xs text-gray-400 mt-1">Failed</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">
                {((stats.completed / stats.total) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">Success Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}