/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Correlation Matrix Visualizer
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CorrelationVisualizerProps {
  variables: string[];
  matrix: number[][];
  causalChain?: {
    from: string;
    to: string;
    effect: string;
  }[];
}

export function CorrelationVisualizer({
  variables,
  matrix,
  causalChain
}: CorrelationVisualizerProps) {
  
  // Color scale for correlation strength
  const getColor = (value: number) => {
    if (value > 0.7) return "bg-blue-600";
    if (value > 0.4) return "bg-blue-400";
    if (value > 0.2) return "bg-blue-200";
    if (value > -0.2) return "bg-slate-100";
    if (value > -0.4) return "bg-red-200";
    if (value > -0.7) return "bg-red-400";
    return "bg-red-600";
  };
  
  const getTextColor = (value: number) => {
    const absValue = Math.abs(value);
    return absValue > 0.4 ? "text-white" : "text-slate-700";
  };

  return (
    <div className="space-y-6">
      
      {/* Correlation Matrix Heatmap */}
      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Correlation Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2"></th>
                {variables.map(v => (
                  <th key={v} className="p-2 text-sm font-medium text-slate-700">
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variables.map((rowVar, i) => (
                <tr key={rowVar}>
                  <td className="p-2 text-sm font-medium text-slate-700">
                    {rowVar}
                  </td>
                  {variables.map((colVar, j) => (
                    <td key={colVar} className="p-0">
                      <div
                        className={`
                          ${getColor(matrix[i][j])} 
                          ${getTextColor(matrix[i][j])}
                          h-16 flex items-center justify-center
                          text-sm font-semibold
                          transition-all hover:scale-105
                          cursor-pointer
                        `}
                        title={`${rowVar} ↔ ${colVar}: ${matrix[i][j].toFixed(2)}`}
                      >
                        {matrix[i][j].toFixed(2)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="text-slate-600">Correlation:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span>Strong Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-100 rounded border"></div>
            <span>Weak</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>Strong Negative</span>
          </div>
        </div>
      </Card>

      {/* Causal Chain Visualization */}
      {causalChain && (
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Causal Relationships</h3>
          <div className="space-y-3">
            {causalChain.map((link, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                  {link.from}
                </Badge>
                <div className="flex-1 flex items-center gap-2">
                  <div className="h-px flex-1 bg-slate-300"></div>
                  <span className="text-sm text-slate-600 whitespace-nowrap">
                    {link.effect}
                  </span>
                  <div className="h-px flex-1 bg-slate-300"></div>
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">
                  {link.to}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Sample Data Preview */}
      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sample Correlated Values</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {variables.map(v => (
                  <th key={v} className="px-4 py-2 text-left font-medium text-slate-700">
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-2 font-mono">0.0812</td>
                <td className="px-4 py-2 font-mono">1.021</td>
                <td className="px-4 py-2 font-mono">1.047</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-2 font-mono">0.0764</td>
                <td className="px-4 py-2 font-mono">1.009</td>
                <td className="px-4 py-2 font-mono">1.039</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">0.0945</td>
                <td className="px-4 py-2 font-mono">1.051</td>
                <td className="px-4 py-2 font-mono">1.066</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-600 mt-3">
          Variables move together according to correlation matrix
        </p>
      </Card>
    </div>
  );
}