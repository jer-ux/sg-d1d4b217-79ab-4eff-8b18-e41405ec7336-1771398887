/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Automated Report Email Scheduler
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Plus, 
  X,
  AlertCircle
} from "lucide-react";

interface EmailSchedule {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  recipients: string[];
  includeCharts: boolean;
  includeRawData: boolean;
  nextRunDate: Date;
  isActive: boolean;
}

interface EmailSchedulerProps {
  analysisId: string;
  analysisName: string;
}

export function EmailScheduler({ analysisId, analysisName }: EmailSchedulerProps) {
  const [schedules, setSchedules] = useState<EmailSchedule[]>([
    {
      id: "1",
      name: "Monthly Board Report",
      frequency: "monthly",
      recipients: ["cfo@company.com", "ceo@company.com"],
      includeCharts: true,
      includeRawData: false,
      nextRunDate: new Date(2026, 8, 1),
      isActive: true
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Partial<EmailSchedule>>({
    frequency: "monthly",
    recipients: [],
    includeCharts: true,
    includeRawData: false,
    isActive: true
  });
  const [newRecipient, setNewRecipient] = useState("");

  const handleCreateSchedule = () => {
    if (!newSchedule.name || !newSchedule.recipients || newSchedule.recipients.length === 0) {
      return;
    }

    const schedule: EmailSchedule = {
      id: Date.now().toString(),
      name: newSchedule.name,
      frequency: newSchedule.frequency as any,
      recipients: newSchedule.recipients,
      includeCharts: newSchedule.includeCharts || false,
      includeRawData: newSchedule.includeRawData || false,
      nextRunDate: calculateNextRun(newSchedule.frequency as any),
      isActive: true
    };

    setSchedules([...schedules, schedule]);
    setIsCreating(false);
    setNewSchedule({
      frequency: "monthly",
      recipients: [],
      includeCharts: true,
      includeRawData: false,
      isActive: true
    });
  };

  const calculateNextRun = (frequency: string) => {
    const now = new Date();
    switch (frequency) {
      case "daily":
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case "weekly":
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case "monthly":
        return new Date(now.getFullYear(), now.getMonth() + 1, 1);
      case "quarterly":
        return new Date(now.getFullYear(), now.getMonth() + 3, 1);
      default:
        return now;
    }
  };

  const toggleSchedule = (id: string) => {
    setSchedules(prev =>
      prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const addRecipient = () => {
    if (newRecipient && newRecipient.includes("@")) {
      setNewSchedule(prev => ({
        ...prev,
        recipients: [...(prev.recipients || []), newRecipient]
      }));
      setNewRecipient("");
    }
  };

  const removeRecipient = (email: string) => {
    setNewSchedule(prev => ({
      ...prev,
      recipients: (prev.recipients || []).filter(r => r !== email)
    }));
  };

  const frequencyLabels = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Email Reports</h2>
          </div>
          <p className="text-muted-foreground">
            Schedule automated reports for this analysis
          </p>
        </div>

        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
        )}
      </div>

      {/* Create New Schedule */}
      {isCreating && (
        <Card className="p-6 border-primary">
          <h3 className="font-semibold text-lg mb-4">Create Email Schedule</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="scheduleName">Schedule Name</Label>
              <Input
                id="scheduleName"
                placeholder="e.g., Monthly Board Report"
                value={newSchedule.name || ""}
                onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newSchedule.frequency}
                onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value as any })}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <Label>Recipients</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="email@company.com"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addRecipient()}
                />
                <Button onClick={addRecipient} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newSchedule.recipients?.map((email) => (
                  <Badge key={email} variant="secondary" className="gap-1">
                    {email}
                    <button onClick={() => removeRecipient(email)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <Label htmlFor="includeCharts">Include Charts</Label>
              <Switch
                id="includeCharts"
                checked={newSchedule.includeCharts}
                onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, includeCharts: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <Label htmlFor="includeRawData">Include Raw Data (CSV)</Label>
              <Switch
                id="includeRawData"
                checked={newSchedule.includeRawData}
                onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, includeRawData: checked })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateSchedule} className="flex-1">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Create Schedule
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Existing Schedules */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{schedule.name}</h4>
                  <Badge variant={schedule.isActive ? "default" : "secondary"}>
                    {schedule.isActive ? "Active" : "Paused"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {analysisName} • {frequencyLabels[schedule.frequency]}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSchedule(schedule.id)}
                >
                  {schedule.isActive ? "Pause" : "Resume"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteSchedule(schedule.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Next run: {schedule.nextRunDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{schedule.recipients.length} recipients</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {schedule.recipients.map((email) => (
                <Badge key={email} variant="outline" className="text-xs">
                  {email}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground">
              {schedule.includeCharts && (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Charts included
                </div>
              )}
              {schedule.includeRawData && (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Raw data (CSV)
                </div>
              )}
            </div>
          </Card>
        ))}

        {schedules.length === 0 && !isCreating && (
          <Card className="p-12 text-center">
            <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold mb-2">No Scheduled Reports</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set up automated email reports to stay informed
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Schedule
            </Button>
          </Card>
        )}
      </div>

      {schedules.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">About Email Reports</h4>
              <p className="text-sm text-muted-foreground">
                Scheduled reports will re-run the simulation with current parameters and send 
                updated results. Reports include an executive summary, key metrics, and optional 
                charts or raw data.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}