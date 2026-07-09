/**
 * Real-time Engine Status Indicator
 * Shows health status of all computation engines
 */

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useEngineStatus } from "@/hooks/useEngines";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function EngineStatusIndicator() {
  const { checkStatus, data, loading, error } = useEngineStatus();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [checkStatus]);

  const getOverallStatus = () => {
    if (loading) return "checking";
    if (error) return "error";
    if (!data) return "unknown";

    const engines = data.engines || {};
    const allHealthy = Object.values(engines).every(
      (e: any) => e.status === "healthy"
    );
    return allHealthy ? "healthy" : "degraded";
  };

  const status = getOverallStatus();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent transition-colors">
          {status === "checking" && (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">Engines</span>
            </>
          )}
          {status === "healthy" && (
            <>
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              <span className="text-foreground font-medium">Engines Online</span>
            </>
          )}
          {status === "degraded" && (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-amber-600 font-medium">Degraded</span>
            </>
          )}
          {status === "error" && (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-destructive" />
              <span className="text-destructive font-medium">Offline</span>
            </>
          )}
          {status === "unknown" && (
            <>
              <Activity className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Unknown</span>
            </>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Engine Status</h4>
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking engine health...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {data && data.engines && (
            <div className="space-y-2">
              {Object.entries(data.engines).map(([name, engineData]: [string, any]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    {engineData.status === "healthy" && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {engineData.status === "unhealthy" && (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    {engineData.status === "unreachable" && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm font-medium capitalize">{name}</span>
                  </div>
                  <Badge
                    variant={
                      engineData.status === "healthy"
                        ? "default"
                        : engineData.status === "unhealthy"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-xs">
                    {engineData.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Last checked: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}