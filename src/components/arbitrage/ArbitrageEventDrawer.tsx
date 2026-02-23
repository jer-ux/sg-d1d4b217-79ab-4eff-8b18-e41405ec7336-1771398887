import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServerForm, SubmitButton } from "@/components/ui/server-form";
import { useServerAction } from "@/hooks/useServerAction";
import { investigateArbitrageEventAction, assignArbitrageEventAction } from "@/lib/actions/arbitrage";
import { X, AlertTriangle, TrendingUp, TrendingDown, Clock, User, ChevronRight } from "lucide-react";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

interface ArbitrageEventDrawerProps {
  event: ArbitrageEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeepAnalysisClick: () => void;
}

export function ArbitrageEventDrawer({ event, open, onOpenChange, onDeepAnalysisClick }: ArbitrageEventDrawerProps) {
  const { formAction: investigate, isPending: isInvestigating } = useServerAction(
    investigateArbitrageEventAction,
    () => {
      // Success callback
      console.log("Investigation started");
    }
  );

  const { formAction: assign, isPending: isAssigning } = useServerAction(
    assignArbitrageEventAction,
    () => {
      // Success callback
      console.log("Event assigned");
    }
  );

  if (!event) return null;

  const severityStyles = {
    critical: "border-red-500/50 bg-red-500/10 text-red-400",
    high: "border-orange-500/50 bg-orange-500/10 text-orange-400",
    medium: "border-yellow-500/50 bg-yellow-500/10 text-yellow-400",
    low: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-2xl mb-2">{event.title}</SheetTitle>
              <SheetDescription>{event.description}</SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Event Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Severity</div>
              <Badge className={severityStyles[event.severity as keyof typeof severityStyles]}>
                {event.severity.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Category</div>
              <Badge variant="outline">{event.category}</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Affected Claims</div>
              <div className="text-lg font-semibold">{event.affected_claims}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Detected</div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                {new Date(event.detected_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Financial Impact */}
          {event.financial_impact && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                {event.financial_impact.direction === "negative" ? (
                  <TrendingDown className="h-5 w-5 text-red-400" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-green-400" />
                )}
                Financial Impact
              </h3>
              <div className="text-2xl font-bold">
                ${event.financial_impact.amount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {event.financial_impact.direction === "negative" ? "Potential Loss" : "Savings Opportunity"}
              </div>
            </div>
          )}

          {/* Root Cause Analysis */}
          {event.root_cause_analysis && (
            <div className="space-y-3">
              <h3 className="font-semibold">Root Cause Analysis</h3>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Primary Cause:</span>
                    <p className="mt-1">{event.root_cause_analysis.primary_cause}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Contributing Factors:</span>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      {event.root_cause_analysis.contributing_factors.map((factor, idx) => (
                        <li key={idx} className="text-sm">{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Actions */}
          {event.recommended_actions && event.recommended_actions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Recommended Actions</h3>
              <div className="space-y-2">
                {event.recommended_actions.map((action, idx) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-400" />
                      <div className="flex-1">
                        <div className="font-medium">{action.action}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Priority: {action.priority} | Est. Impact: {action.estimated_impact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Analysis Button */}
          <div className="pt-4 border-t">
            <Button 
              onClick={onDeepAnalysisClick}
              className="w-full"
              variant="outline"
            >
              View Deep Analysis
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons with Server Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <ServerForm action={investigate} className="flex-1">
              <input type="hidden" name="event_id" value={event.event_id} />
              <SubmitButton className="w-full" pendingText="Starting Investigation...">
                Start Investigation
              </SubmitButton>
            </ServerForm>

            <ServerForm action={assign} className="flex-1">
              <input type="hidden" name="event_id" value={event.event_id} />
              <input type="hidden" name="assignee" value="current-user@example.com" />
              <SubmitButton variant="outline" className="w-full" pendingText="Assigning...">
                <User className="mr-2 h-4 w-4" />
                Assign to Me
              </SubmitButton>
            </ServerForm>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}