import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

function MetricTile({
  label,
  value,
  trend,
  status,
}: {
  label: string;
  value: string;
  trend?: string;
  status?: "good" | "warning" | "alert";
}) {
  const statusColor = {
    good: "text-emerald-400",
    warning: "text-yellow-400",
    alert: "text-red-400",
  }[status || "good"];

  const StatusIcon = {
    good: CheckCircle2,
    warning: AlertTriangle,
    alert: AlertTriangle,
  }[status || "good"];

  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="text-xs text-white/60">{label}</div>
          {status && <StatusIcon className={`h-4 w-4 ${statusColor}`} />}
        </div>
        <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
        {trend && (
          <div className="mt-2 flex items-center gap-1 text-xs text-white/60">
            {trend.startsWith("+") ? (
              <TrendingUp className="h-3 w-3 text-red-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-emerald-400" />
            )}
            <span>{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function WarRoomPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricTile
        label="Total Plan Spend (YTD)"
        value="$12.4M"
        trend="+8.2% vs. budget"
        status="warning"
      />
      <MetricTile
        label="Identified Leakage"
        value="$487K"
        trend="3.9% of total spend"
        status="alert"
      />
      <MetricTile
        label="PBM Pass-Through Variance"
        value="$142K"
        trend="+2.1% vs. contract"
        status="alert"
      />
      <MetricTile
        label="High-Cost Claimants"
        value="23"
        trend="+4 vs. prior quarter"
        status="warning"
      />
      <MetricTile
        label="Specialty Drug Spend"
        value="$2.8M"
        trend="+12.4% YoY"
        status="warning"
      />
      <MetricTile
        label="Generic Dispensing Rate"
        value="86.2%"
        trend="+1.8% vs. Q3"
        status="good"
      />
      <MetricTile
        label="Medical Trend (PMPM)"
        value="$512"
        trend="+6.1% YoY"
        status="warning"
      />
      <MetricTile
        label="Verified Savings Actions"
        value="$218K"
        trend="14 closed initiatives"
        status="good"
      />
    </div>
  );
}