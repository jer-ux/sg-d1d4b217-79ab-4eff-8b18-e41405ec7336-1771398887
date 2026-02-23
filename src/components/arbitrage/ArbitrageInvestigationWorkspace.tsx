import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  MessageSquare, 
  ClipboardCheck, 
  Users,
  Calendar,
  Paperclip,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

interface ArbitrageInvestigationWorkspaceProps {
  event: ArbitrageEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArbitrageInvestigationWorkspace({ 
  event, 
  open, 
  onOpenChange 
}: ArbitrageInvestigationWorkspaceProps) {
  if (!event) return null;

  const mockEvidence = [
    { id: 1, type: "Claim Data", file: "claims_export_2024-02.csv", date: "2024-02-15", status: "reviewed" },
    { id: 2, type: "Provider Contract", file: "abc_medical_contract.pdf", date: "2024-02-14", status: "pending" },
    { id: 3, type: "Audit Report", file: "internal_audit_q1.pdf", date: "2024-02-10", status: "reviewed" },
    { id: 4, type: "Email Chain", file: "provider_correspondence.eml", date: "2024-02-08", status: "new" },
  ];

  const mockNotes = [
    { id: 1, author: "Sarah Chen", date: "2024-02-15 14:30", content: "Initial review shows clear pattern of upcoding in procedure codes 99214-99215. Recommend immediate provider outreach." },
    { id: 2, author: "Michael Torres", date: "2024-02-15 11:20", content: "Cross-referenced with historical data - similar pattern detected in Q3 2023 but was not investigated at the time." },
    { id: 3, author: "Sarah Chen", date: "2024-02-14 16:45", content: "Contacted provider compliance officer. Meeting scheduled for 2/20." },
  ];

  const mockActions = [
    { id: 1, task: "Schedule provider meeting", assignee: "Sarah Chen", due: "2024-02-20", status: "in-progress" },
    { id: 2, task: "Pull 12-month historical claims data", assignee: "Data Team", due: "2024-02-18", status: "completed" },
    { id: 3, task: "Legal review of contract terms", assignee: "Legal Dept", due: "2024-02-22", status: "pending" },
    { id: 4, task: "Prepare recovery demand letter", assignee: "Sarah Chen", due: "2024-02-25", status: "pending" },
  ];

  const mockCollaborators = [
    { name: "Sarah Chen", role: "Lead Investigator", avatar: "SC" },
    { name: "Michael Torres", role: "Data Analyst", avatar: "MT" },
    { name: "Jennifer Walsh", role: "Legal Counsel", avatar: "JW" },
    { name: "David Park", role: "Compliance Officer", avatar: "DP" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-6 w-6 text-blue-400" />
              Investigation Workspace: {event.title}
            </div>
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
              Active Investigation
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-black/20 border-white/10">
            <div className="text-sm text-muted-foreground mb-1">Days Open</div>
            <div className="text-2xl font-bold">8</div>
          </Card>
          <Card className="p-4 bg-black/20 border-white/10">
            <div className="text-sm text-muted-foreground mb-1">Evidence Items</div>
            <div className="text-2xl font-bold">{mockEvidence.length}</div>
          </Card>
          <Card className="p-4 bg-black/20 border-white/10">
            <div className="text-sm text-muted-foreground mb-1">Team Members</div>
            <div className="text-2xl font-bold">{mockCollaborators.length}</div>
          </Card>
        </div>

        <Tabs defaultValue="evidence" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="actions">Action Items</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* Evidence Tab */}
          <TabsContent value="evidence" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Evidence Library</h3>
              <Button size="sm">
                <Paperclip className="mr-2 h-4 w-4" />
                Upload Evidence
              </Button>
            </div>

            <div className="space-y-2">
              {mockEvidence.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-blue-400" />
                    <div>
                      <div className="font-medium">{item.file}</div>
                      <div className="text-sm text-muted-foreground">{item.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm">{new Date(item.date).toLocaleDateString()}</div>
                      <Badge 
                        variant="outline"
                        className={
                          item.status === 'reviewed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-4">
            <Card className="p-4 bg-black/20 border-white/10">
              <div className="space-y-3 mb-4">
                <Textarea 
                  placeholder="Add investigation notes..."
                  className="min-h-[100px] bg-white/5 border-white/10"
                />
                <div className="flex justify-end">
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {mockNotes.map((note) => (
                <Card key={note.id} className="p-4 bg-black/20 border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-semibold">
                      {note.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Action Items Tab */}
          <TabsContent value="actions" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Action Items</h3>
              <Button size="sm">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                New Action
              </Button>
            </div>

            <div className="space-y-2">
              {mockActions.map((action) => (
                <div 
                  key={action.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    {action.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : action.status === 'in-progress' ? (
                      <Clock className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    )}
                    <div>
                      <div className="font-medium">{action.task}</div>
                      <div className="text-sm text-muted-foreground">
                        Assigned to: {action.assignee}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(action.due).toLocaleDateString()}
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          action.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          action.status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }
                      >
                        {action.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Investigation Team</h3>
              <Button size="sm">
                <Users className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockCollaborators.map((person, idx) => (
                <Card key={idx} className="p-4 bg-black/20 border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-lg font-semibold">
                      {person.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{person.name}</div>
                      <div className="text-sm text-muted-foreground">{person.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-4">Investigation Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="w-0.5 h-16 bg-white/10 my-2" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Investigation Initiated</div>
                    <div className="text-sm text-muted-foreground mb-1">Feb 15, 2024 - 09:00 AM</div>
                    <div className="text-xs text-muted-foreground">Automated alert triggered investigation workflow</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="w-0.5 h-16 bg-white/10 my-2" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Team Assembled</div>
                    <div className="text-sm text-muted-foreground mb-1">Feb 15, 2024 - 10:30 AM</div>
                    <div className="text-xs text-muted-foreground">4 team members assigned</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="w-0.5 h-16 bg-white/10 my-2" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Initial Evidence Collected</div>
                    <div className="text-sm text-muted-foreground mb-1">Feb 15, 2024 - 14:00 PM</div>
                    <div className="text-xs text-muted-foreground">Claims data and contracts uploaded</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Provider Meeting Scheduled</div>
                    <div className="text-sm text-muted-foreground mb-1">Upcoming - Feb 20, 2024</div>
                    <div className="text-xs text-muted-foreground">In-person meeting with compliance officer</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-6 border-t">
          <Button variant="outline" className="flex-1">
            Export Investigation Report
          </Button>
          <Button className="flex-1">
            Close Investigation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}