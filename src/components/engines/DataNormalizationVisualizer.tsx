import { CheckCircle, AlertCircle, Clock, Database, FileCheck, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface NormalizationStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startTime?: number;
  endTime?: number;
  recordsProcessed?: number;
  issues?: string[];
}

interface DataSource {
  type: 'medical_claims' | 'pharmacy_claims' | 'members' | 'financials' | 'contracts';
  detected: boolean;
  recordCount: number;
  quality: 'high' | 'medium' | 'low';
  mappedFields: number;
  totalFields: number;
}

export function DataNormalizationVisualizer({ 
  isProcessing,
  onComplete 
}: { 
  isProcessing: boolean;
  onComplete?: (result: any) => void;
}) {
  const [steps, setSteps] = useState<NormalizationStep[]>([
    { id: 'detect', name: 'Detecting Data Sources', status: 'pending' },
    { id: 'validate', name: 'Validating Schema', status: 'pending' },
    { id: 'normalize', name: 'Normalizing Records', status: 'pending' },
    { id: 'enrich', name: 'Enriching Data', status: 'pending' },
    { id: 'route', name: 'Routing to Engines', status: 'pending' },
  ]);

  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isProcessing) return;

    // Simulate data source detection
    setTimeout(() => {
      setDataSources([
        { type: 'medical_claims', detected: true, recordCount: 45820, quality: 'high', mappedFields: 12, totalFields: 12 },
        { type: 'pharmacy_claims', detected: true, recordCount: 18350, quality: 'high', mappedFields: 11, totalFields: 11 },
        { type: 'members', detected: true, recordCount: 2847, quality: 'high', mappedFields: 9, totalFields: 9 },
        { type: 'financials', detected: true, recordCount: 1, quality: 'high', mappedFields: 5, totalFields: 5 },
        { type: 'contracts', detected: true, recordCount: 3, quality: 'medium', mappedFields: 4, totalFields: 5 },
      ]);
    }, 500);

    // Process steps sequentially
    const processStep = (index: number) => {
      if (index >= steps.length) {
        if (onComplete) {
          onComplete({
            success: true,
            sourcesDetected: 5,
            totalRecords: 67021,
            enginesReady: 85,
          });
        }
        return;
      }

      setCurrentStep(index);
      
      // Start step
      setSteps(prev => prev.map((step, i) => 
        i === index ? { ...step, status: 'processing', startTime: Date.now() } : step
      ));

      // Complete step after random delay
      const duration = 800 + Math.random() * 1200;
      setTimeout(() => {
        setSteps(prev => prev.map((step, i) => 
          i === index ? { 
            ...step, 
            status: 'completed', 
            endTime: Date.now(),
            recordsProcessed: index === 2 ? 67021 : undefined 
          } : step
        ));

        // Move to next step
        setTimeout(() => processStep(index + 1), 300);
      }, duration);
    };

    processStep(0);
  }, [isProcessing]);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getQualityBg = (quality: string) => {
    switch (quality) {
      case 'high': return 'bg-emerald-500/20 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 border-amber-500/30';
      case 'low': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Processing Steps */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          Universal Schema Normalization
        </h3>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const isActive = step.status === 'processing';
            const isCompleted = step.status === 'completed';
            const isPending = step.status === 'pending';

            return (
              <div
                key={step.id}
                className={`relative flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-800/30 border-slate-700/30'
                }`}>
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {isCompleted && (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  )}
                  {isActive && (
                    <div className="relative">
                      <Clock className="w-6 h-6 text-cyan-400 animate-spin" />
                      <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm animate-pulse" />
                    </div>
                  )}
                  {isPending && (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-600" />
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white">{step.name}</div>
                  {step.recordsProcessed && (
                    <div className="text-sm text-gray-400 mt-1">
                      {step.recordsProcessed.toLocaleString()} records processed
                    </div>
                  )}
                  {step.startTime && step.endTime && (
                    <div className="text-xs text-gray-500 mt-1">
                      Completed in {((step.endTime - step.startTime) / 1000).toFixed(2)}s
                    </div>
                  )}
                </div>

                {/* Active Animation */}
                {isActive && (
                  <div className="absolute right-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detected Data Sources */}
      {dataSources.length > 0 && (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-purple-400" />
            Detected Data Sources
          </h3>

          <div className="grid gap-3">
            {dataSources.map((source) => (
              <div
                key={source.type}
                className={`p-4 rounded-lg border ${getQualityBg(source.quality)} transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white capitalize">
                    {source.type.replace('_', ' ')}
                  </div>
                  <div className={`text-sm font-bold ${getQualityColor(source.quality)} uppercase`}>
                    {source.quality}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Records</div>
                    <div className="font-bold text-white">
                      {source.recordCount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Field Coverage</div>
                    <div className="font-bold text-white">
                      {source.mappedFields}/{source.totalFields}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      source.quality === 'high' ? 'bg-emerald-500' :
                      source.quality === 'medium' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(source.mappedFields / source.totalFields) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
              <div className="text-2xl font-bold text-cyan-400">5</div>
              <div className="text-xs text-gray-400 mt-1">Sources Detected</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
              <div className="text-2xl font-bold text-purple-400">67,021</div>
              <div className="text-xs text-gray-400 mt-1">Total Records</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
              <div className="text-2xl font-bold text-emerald-400">98%</div>
              <div className="text-xs text-gray-400 mt-1">Data Quality</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}