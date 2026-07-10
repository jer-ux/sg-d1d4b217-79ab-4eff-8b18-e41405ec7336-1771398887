import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Play, Upload } from "lucide-react";
import { useState } from "react";
import { DataNormalizationVisualizer } from "@/components/engines/DataNormalizationVisualizer";
import { EngineExecutionDashboard } from "@/components/engines/EngineExecutionDashboard";
import Footer from "@/components/Footer";

export default function EnginesDemoPage() {
  const [stage, setStage] = useState<'idle' | 'uploading' | 'normalizing' | 'executing' | 'complete'>('idle');

  const handleStartDemo = () => {
    setStage('uploading');
    setTimeout(() => setStage('normalizing'), 1000);
  };

  const handleNormalizationComplete = () => {
    setStage('executing');
  };

  return (
    <>
      <Head>
        <title>Engine Execution Demo | Kincaid IQ</title>
        <meta name="description" content="Watch 30+ engines process healthcare data in real-time" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/engines"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Engines</span>
              </Link>

              {stage === 'idle' && (
                <button
                  onClick={handleStartDemo}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50">
                  <Play className="w-5 h-5" />
                  Start Demo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 text-sm font-medium">Live Demo</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Watch Engines Process Data
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time visualization of data normalization and parallel engine execution. 
              Upload once, run 30+ engines simultaneously.
            </p>
          </div>

          {/* Demo Stage */}
          {stage === 'idle' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Ready to Process Healthcare Data
                </h2>
                <p className="text-gray-400 mb-8">
                  Click "Start Demo" to see how the Universal Engine SDK normalizes raw data 
                  and routes it to 30+ specialized engines for parallel execution.
                </p>
                <button
                  onClick={handleStartDemo}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                  <Play className="w-6 h-6" />
                  Start Demo
                </button>
              </div>
            </div>
          )}

          {stage === 'uploading' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/50 rounded-2xl p-12 text-center animate-pulse">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Uploading Sample Data
                </h2>
                <p className="text-gray-400">
                  Medical claims, Rx claims, member census, financials, contracts...
                </p>
              </div>
            </div>
          )}

          {(stage === 'normalizing' || stage === 'executing' || stage === 'complete') && (
            <div className="space-y-8">
              {/* Data Normalization */}
              <DataNormalizationVisualizer
                isProcessing={stage === 'normalizing'}
                onComplete={handleNormalizationComplete}
              />

              {/* Engine Execution Dashboard */}
              {(stage === 'executing' || stage === 'complete') && (
                <EngineExecutionDashboard isRunning={stage === 'executing'} />
              )}
            </div>
          )}

          {/* Info Cards */}
          {stage === 'idle' && (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Data Normalization</h3>
                <p className="text-gray-400 text-sm">
                  Watch the SDK detect data sources, validate schemas, and normalize to universal format
                </p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Routing</h3>
                <p className="text-gray-400 text-sm">
                  See how engines are automatically selected based on available data
                </p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Parallel Execution</h3>
                <p className="text-gray-400 text-sm">
                  Monitor 30+ engines processing simultaneously with real-time progress
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}