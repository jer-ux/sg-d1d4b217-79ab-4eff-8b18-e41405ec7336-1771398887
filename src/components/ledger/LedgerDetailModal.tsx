import { LedgerEntry } from "@/lib/ledger/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Receipt, 
  User, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  ExternalLink
} from "lucide-react";

interface LedgerDetailModalProps {
  entry: LedgerEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (entryId: string) => void;
  onRealize?: (entryId: string) => void;
  onDispute?: (entryId: string) => void;
}

const stateColors: Record<string, string> = {
  identified: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  approved: "bg-green-500/20 text-green-300 border-green-500/30",
  realized: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "at-risk": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  disputed: "bg-red-500/20 text-red-300 border-red-500/30",
  rejected: "bg-gray-500/20 text-gray-300 border-gray-500/30"
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function LedgerDetailModal({
  entry,
  isOpen,
  onClose,
  onApprove,
  onRealize,
  onDispute
}: LedgerDetailModalProps) {
  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0f] border-white/10">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl text-white">{entry.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-sm text-white/60">{entry.id}</span>
                <Badge className={stateColors[entry.state]}>{entry.state}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Estimated Value</div>
              <div className="text-2xl font-semibold text-white">
                {formatCurrency(entry.estimatedValue)}
              </div>
              {entry.realizedValue > 0 && (
                <>
                  <div className="text-sm text-white/60 mt-2">Realized</div>
                  <div className="text-xl font-semibold text-emerald-400">
                    {formatCurrency(entry.realizedValue)}
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="bg-white/5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="receipts">
              Receipts ({entry.receipts.length})
            </TabsTrigger>
            <TabsTrigger value="audit">
              Audit Trail ({entry.auditTrail.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-4">
            <div className="k-panel p-6">
              <div className="text-sm text-white/60 mb-2">Description</div>
              <div className="text-white">{entry.description}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="k-panel p-4 space-y-3">
                <div className="flex items-center gap-2 text-white/60">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Owner</span>
                </div>
                <div className="text-white">{entry.owner}</div>
              </div>

              <div className="k-panel p-4 space-y-3">
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Due Date</span>
                </div>
                <div className="text-white">
                  {new Date(entry.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </div>
              </div>

              <div className="k-panel p-4 space-y-3">
                <div className="flex items-center gap-2 text-white/60">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Confidence</span>
                </div>
                <div className="text-white">{(entry.confidence * 100).toFixed(0)}%</div>
              </div>

              <div className="k-panel p-4 space-y-3">
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Days in State</span>
                </div>
                <div className="text-white">{entry.daysInState} days</div>
              </div>
            </div>

            {entry.blockers && entry.blockers.length > 0 && (
              <div className="k-panel p-4 bg-orange-500/10 border-orange-500/30">
                <div className="flex items-center gap-2 text-orange-400 mb-3">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Blockers</span>
                </div>
                <ul className="space-y-2">
                  {entry.blockers.map((blocker, idx) => (
                    <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">•</span>
                      <span>{blocker}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              {entry.state === "identified" && (
                <Button onClick={() => onApprove?.(entry.id)} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              )}
              {entry.state === "approved" && (
                <Button onClick={() => onRealize?.(entry.id)} className="bg-emerald-600 hover:bg-emerald-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Mark as Realized
                </Button>
              )}
              {(entry.state === "identified" || entry.state === "approved") && (
                <Button 
                  onClick={() => onDispute?.(entry.id)} 
                  variant="outline"
                  className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Raise Dispute
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="receipts" className="mt-4">
            <div className="space-y-4">
              {entry.receipts.map((receipt) => (
                <div key={receipt.id} className="k-panel p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Receipt className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{receipt.description}</div>
                        <div className="text-sm text-white/60 mt-1">
                          Type: {receipt.type} • Uploaded by {receipt.uploadedBy.split("@")[0]}
                        </div>
                      </div>
                    </div>
                    {receipt.confidence && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {(receipt.confidence * 100).toFixed(0)}% confidence
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white/60">
                      {new Date(receipt.uploadedAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Receipt
                    </Button>
                  </div>
                  {receipt.lineage && receipt.lineage.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-xs text-white/50 mb-1">Data Lineage</div>
                      <div className="font-mono text-xs text-white/70">
                        {receipt.lineage.join(" → ")}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {entry.receipts.length === 0 && (
                <div className="k-panel p-8 text-center">
                  <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <div className="text-white/60">No receipts attached yet</div>
                  <Button variant="outline" className="mt-4">
                    <Receipt className="w-4 h-4 mr-2" />
                    Attach Receipt
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-4">
            <div className="space-y-3">
              {entry.auditTrail.map((audit, idx) => (
                <div key={idx} className="k-panel p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-white">{audit.action}</div>
                        <div className="text-sm text-white/60">
                          {new Date(audit.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm text-white/70 mb-2">
                        by {audit.actor.split("@")[0]}
                      </div>
                      {audit.previousState && audit.newState && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge className={stateColors[audit.previousState]}>
                            {audit.previousState}
                          </Badge>
                          <span className="text-white/40">→</span>
                          <Badge className={stateColors[audit.newState]}>
                            {audit.newState}
                          </Badge>
                        </div>
                      )}
                      {audit.reason && (
                        <div className="mt-2 text-sm text-white/60 italic">
                          "{audit.reason}"
                        </div>
                      )}
                      {audit.previousValue !== undefined && audit.newValue !== undefined && (
                        <div className="mt-2 text-sm text-white/70">
                          Value adjusted: {formatCurrency(audit.previousValue)} → {formatCurrency(audit.newValue)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}