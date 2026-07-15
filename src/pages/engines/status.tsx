import { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Activity, CheckCircle2, XCircle, Clock, RefreshCw, Zap } from "lucide-react";

interface EngineStatus {
  name: string;
  endpoint: string;
  port: number;
  status: "online" | "offline" | "checking";
  latency?: number;
  version?: string;
  lastChecked?: string;
  description: string;
}

export default function EngineStatusMonitoring() {
  const [engines, setEngines] = useState<EngineStatus[]>([
    {
      name: "Medical Trend Forecast",
      endpoint: "http://localhost:8001",
      port: 8001,
      status: "checking",
      description: "Core actuarial engine for medical claims trend forecasting"
    },
    {
      name: "Rx Trend Forecast",
      endpoint: "http://localhost:8002",
      port: 8002,
      status: "checking",
      description: "Pharmacy benefit trend forecasting with GLP-1 and biosimilar modeling"
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const checkEngineHealth = async (engine: EngineStatus): Promise<EngineStatus> => {
    const startTime = performance.now();
    
    try {
      const response = await fetch(`${engine.endpoint}/health`, {
        method: "GET",
        signal: AbortSignal.timeout(5000)
      });
      
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);

      if (response.ok) {
        const data = await response.json();
        return {
          ...engine,
          status: "online",
          latency,
          version: data.version || "1.0.0",
          lastChecked: new Date().toISOString()
        };
      } else {
        return {
          ...engine,
          status: "offline",
          lastChecked: new Date().toISOString()
        };
      }
    } catch (error) {
      return {
        ...engine,
        status: "offline",
        lastChecked: new Date().toISOString()
      };
    }
  };

  const refreshAllEngines = async () => {
    setIsRefreshing(true);
    
    const updatedEngines = await Promise.all(
      engines.map(engine => checkEngineHealth(engine))
    );
    
    setEngines(updatedEngines);
    setIsRefreshing(false);
  };

  useEffect(() => {
    refreshAllEngines();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(refreshAllEngines, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, engines]);

  const onlineCount = engines.filter(e => e.status === "online").length;
  const offlineCount = engines.filter(e => e.status === "offline").length;
  const avgLatency = engines
    .filter(e => e.latency)
    .reduce((sum, e) => sum + (e.latency || 0), 0) / (engines.filter(e => e.latency).length || 1);

  return (
    <>
      <Head>
        <title>Engine Status Monitoring | Kincaid IQ Platform</title>
        <meta name="description" content="Real-time health monitoring for all Kincaid IQ actuarial engines" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Nav />

        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Engine Status</h1>
                <p className="text-slate-400">Real-time monitoring of actuarial microservices</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={refreshAllEngines}
                  disabled={isRefreshing}
                  variant="outline"
                  className="border-emerald-500/30 hover:border-emerald-500/50"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                
                <Button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  variant={autoRefresh ? "default" : "outline"}
                  className={autoRefresh ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Auto-refresh {autoRefresh ? "ON" : "OFF"}
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Engines</p>
                    <p className="text-3xl font-bold text-white mt-1">{engines.length}</p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Online</p>
                    <p className="text-3xl font-bold text-emerald-500 mt-1">{onlineCount}</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Offline</p>
                    <p className="text-3xl font-bold text-red-500 mt-1">{offlineCount}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Avg Latency</p>
                    <p className="text-3xl font-bold text-amber-500 mt-1">
                      {Math.round(avgLatency)}
                      <span className="text-sm text-slate-400 ml-1">ms</span>
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-500" />
                </div>
              </Card>
            </div>

            {/* Engine Status Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {engines.map((engine, index) => (
                <motion.div
                  key={engine.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-slate-800 p-6 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{engine.name}</h3>
                          {engine.status === "online" && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Online
                            </Badge>
                          )}
                          {engine.status === "offline" && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              <XCircle className="w-3 h-3 mr-1" />
                              Offline
                            </Badge>
                          )}
                          {engine.status === "checking" && (
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              Checking
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm">{engine.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Endpoint</p>
                        <p className="text-white text-sm font-mono">{engine.endpoint}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Port</p>
                        <p className="text-white text-sm font-mono">{engine.port}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Latency</p>
                        <p className="text-white text-sm">
                          {engine.latency ? `${engine.latency}ms` : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Version</p>
                        <p className="text-white text-sm">{engine.version || "-"}</p>
                      </div>
                    </div>

                    {engine.lastChecked && (
                      <p className="text-slate-500 text-xs mt-4">
                        Last checked: {new Date(engine.lastChecked).toLocaleTimeString()}
                      </p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Help Section */}
            <Card className="bg-slate-900/30 border-slate-800 p-6">
              <h3 className="text-lg font-bold text-white mb-3">Monitoring Information</h3>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>• Auto-refresh checks engine health every 30 seconds</p>
                <p>• Latency measures round-trip time to health endpoint</p>
                <p>• Engines must be running locally or accessible via network</p>
                <p>• Click "Refresh" to manually update status</p>
              </div>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}