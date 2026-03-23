import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Send,
  AtSign,
  Paperclip,
  MoreVertical,
  UserPlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "member" | "viewer";
  lastActive: Date;
  status: "online" | "offline" | "away";
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  resolved: boolean;
  replies: Comment[];
  mentions: string[];
  attachments?: string[];
  provisionId?: string;
}

interface ApprovalRequest {
  id: string;
  requestedBy: string;
  requestedAt: Date;
  status: "pending" | "approved" | "rejected";
  approvers: {
    userId: string;
    userName: string;
    status: "pending" | "approved" | "rejected";
    timestamp?: Date;
    comment?: string;
  }[];
  dueDate: Date;
}

interface TeamCollaborationProps {
  contractId: string;
  currentUserId: string;
}

export function TeamCollaboration({ contractId, currentUserId }: TeamCollaborationProps) {
  const [activeTab, setActiveTab] = useState<"team" | "comments" | "approvals">("comments");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  useEffect(() => {
    loadCollaborationData();
  }, [contractId]);

  const loadCollaborationData = async () => {
    // Load team members
    const members: TeamMember[] = [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah@company.com",
        role: "owner",
        lastActive: new Date(),
        status: "online"
      },
      {
        id: "2",
        name: "Michael Chen",
        email: "michael@company.com",
        role: "admin",
        lastActive: new Date(Date.now() - 1000 * 60 * 5),
        status: "online"
      },
      {
        id: "3",
        name: "Jessica Williams",
        email: "jessica@company.com",
        role: "member",
        lastActive: new Date(Date.now() - 1000 * 60 * 30),
        status: "away"
      }
    ];
    setTeamMembers(members);

    // Load comments
    const mockComments: Comment[] = [
      {
        id: "c1",
        userId: "1",
        userName: "Sarah Johnson",
        content: "The spread pricing clause on page 8 is concerning. We should push back on this.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        resolved: false,
        replies: [
          {
            id: "c1-r1",
            userId: "2",
            userName: "Michael Chen",
            content: "Agreed. I've seen similar contracts where we negotiated this down to 2% max spread.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
            resolved: false,
            replies: [],
            mentions: []
          }
        ],
        mentions: ["@Michael Chen"],
        provisionId: "spread-pricing"
      },
      {
        id: "c2",
        userId: "3",
        userName: "Jessica Williams",
        content: "The rebate pass-through at 90% is below our standard. Can we benchmark this?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        resolved: false,
        replies: [],
        mentions: []
      }
    ];
    setComments(mockComments);

    // Load approval requests
    const mockApprovals: ApprovalRequest[] = [
      {
        id: "a1",
        requestedBy: "Sarah Johnson",
        requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: "pending",
        approvers: [
          {
            userId: "2",
            userName: "Michael Chen",
            status: "approved",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
            comment: "Risk assessment looks good"
          },
          {
            userId: "4",
            userName: "David Kim (CFO)",
            status: "pending"
          }
        ],
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48)
      }
    ];
    setApprovalRequests(mockApprovals);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      userId: currentUserId,
      userName: "You",
      content: newComment,
      timestamp: new Date(),
      resolved: false,
      replies: [],
      mentions: extractMentions(newComment)
    };

    setComments([...comments, comment]);
    setNewComment("");

    // Send notification to mentioned users
    if (comment.mentions.length > 0) {
      await sendMentionNotifications(comment);
    }
  };

  const extractMentions = (text: string): string[] => {
    const mentionRegex = /@(\w+\s\w+)/g;
    const mentions: string[] = [];
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    return mentions;
  };

  const sendMentionNotifications = async (comment: Comment) => {
    // Send Slack/Teams notifications
    await fetch("/api/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contractId,
        mentions: comment.mentions,
        message: comment.content,
        type: "mention"
      })
    });
  };

  const handleResolveComment = async (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, resolved: true } : c
    ));

    // Update in database
    await fetch(`/api/contracts/${contractId}/comments/${commentId}/resolve`, {
      method: "POST"
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner": return "text-purple-400 bg-purple-500/20 border-purple-500/30";
      case "admin": return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      case "member": return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30";
      case "viewer": return "text-gray-400 bg-gray-500/20 border-gray-500/30";
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "online": return "bg-emerald-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Team Collaboration</h3>
            <p className="text-sm text-gray-400">{teamMembers.length} team members</p>
          </div>
        </div>
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  className="bg-slate-800 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-white">Role</Label>
                <Select defaultValue="member">
                  <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer (Read-only)</SelectItem>
                    <SelectItem value="member">Member (Comment & Edit)</SelectItem>
                    <SelectItem value="admin">Admin (Full Access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "team"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Team ({teamMembers.length})
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "comments"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Comments ({comments.length})
        </button>
        <button
          onClick={() => setActiveTab("approvals")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "approvals"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Approvals ({approvalRequests.length})
        </button>
      </div>

      {/* Team Tab */}
      {activeTab === "team" && (
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <Card key={member.id} className="p-4 bg-slate-900/50 border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10 border-2 border-white/10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-slate-700 text-white">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${getStatusIndicator(member.status)}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{member.name}</p>
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{member.email}</p>
                    <p className="text-xs text-gray-500">
                      Last active: {member.lastActive.toLocaleString()}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuItem>View Activity</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Comments Tab */}
      {activeTab === "comments" && (
        <div className="space-y-6">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className={`p-4 ${comment.resolved ? "bg-slate-900/30 border-emerald-500/30" : "bg-slate-900/50 border-white/10"}`}>
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 border border-white/10">
                      <AvatarImage src={comment.userAvatar} />
                      <AvatarFallback className="bg-slate-700 text-white text-xs">
                        {comment.userName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">{comment.userName}</p>
                          <span className="text-xs text-gray-500">
                            {comment.timestamp.toLocaleString()}
                          </span>
                          {comment.resolved && (
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                        {!comment.resolved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResolveComment(comment.id)}
                            className="text-xs"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-gray-300">{comment.content}</p>
                      {comment.provisionId && (
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                          Related to: {comment.provisionId}
                        </Badge>
                      )}
                      {comment.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-white/10 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-2">
                              <Avatar className="w-6 h-6 border border-white/10">
                                <AvatarFallback className="bg-slate-700 text-white text-xs">
                                  {reply.userName.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-semibold text-white">{reply.userName}</p>
                                  <span className="text-xs text-gray-500">
                                    {reply.timestamp.toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* New Comment Input */}
          <Card className="p-4 bg-slate-900/50 border-white/10">
            <div className="space-y-3">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment... (Use @Name to mention someone)"
                className="bg-slate-800 border-white/10 text-white min-h-[100px]"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-gray-400">
                    <AtSign className="w-4 h-4 mr-1" />
                    Mention
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-400">
                    <Paperclip className="w-4 h-4 mr-1" />
                    Attach
                  </Button>
                </div>
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Approvals Tab */}
      {activeTab === "approvals" && (
        <div className="space-y-4">
          {approvalRequests.map((request) => (
            <Card key={request.id} className="p-4 bg-slate-900/50 border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Approval Request</p>
                    <p className="text-sm text-gray-400">
                      Requested by {request.requestedBy} • {request.requestedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={
                    request.status === "approved" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                    request.status === "rejected" ? "bg-red-500/20 text-red-300 border-red-500/30" :
                    "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                  }>
                    {request.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                    {request.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {request.status === "rejected" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {request.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Approvers:</p>
                  {request.approvers.map((approver) => (
                    <div key={approver.userId} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6 border border-white/10">
                          <AvatarFallback className="bg-slate-700 text-white text-xs">
                            {approver.userName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-white">{approver.userName}</p>
                          {approver.comment && (
                            <p className="text-xs text-gray-400">{approver.comment}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={
                        approver.status === "approved" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                        approver.status === "rejected" ? "bg-red-500/20 text-red-300 border-red-500/30" :
                        "bg-gray-500/20 text-gray-300 border-gray-500/30"
                      }>
                        {approver.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="outline" className="flex-1 text-red-400 border-red-500/30 hover:bg-red-500/10">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  Due: {request.dueDate.toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}