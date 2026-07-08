/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Collaboration Tools - Comments, Sharing, Mentions
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Share2, Users, AtSign } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  authorInitials: string;
  content: string;
  timestamp: Date;
  mentions: string[];
}

interface CollaborativeFeaturesProps {
  analysisId: string;
  onCommentAdded: (comment: string, mentions: string[]) => void;
  onShare: (recipients: string[]) => void;
}

export function CollaborativeFeatures({
  analysisId,
  onCommentAdded,
  onShare
}: CollaborativeFeaturesProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      authorInitials: "SC",
      content: "The high inflation scenario shows concerning results. We should discuss mitigation strategies in tomorrow's meeting.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      mentions: []
    },
    {
      id: "2",
      author: "Michael Torres",
      authorInitials: "MT",
      content: "@CFO The 95th percentile projections exceed our contingency budget. Recommend increasing stop-loss coverage.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      mentions: ["CFO"]
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareRecipients, setShareRecipients] = useState<string[]>([]);

  const teamMembers = [
    { name: "CFO", email: "cfo@company.com" },
    { name: "CHRO", email: "chro@company.com" },
    { name: "CEO", email: "ceo@company.com" },
    { name: "Benefits Team", email: "benefits@company.com" }
  ];

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    // Extract mentions
    const mentionRegex = /@(\w+)/g;
    const mentions = [...newComment.matchAll(mentionRegex)].map(m => m[1]);

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      authorInitials: "YO",
      content: newComment,
      timestamp: new Date(),
      mentions
    };

    setComments([...comments, comment]);
    onCommentAdded(newComment, mentions);
    setNewComment("");
  };

  const handleShare = () => {
    if (shareRecipients.length > 0) {
      onShare(shareRecipients);
      setIsSharing(false);
      setShareRecipients([]);
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const toggleRecipient = (email: string) => {
    setShareRecipients(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  return (
    <div className="space-y-6">
      {/* Comments Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Comments</h3>
          <Badge variant="secondary">{comments.length}</Badge>
        </div>

        <div className="space-y-4 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {comment.authorInitials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(comment.timestamp)}
                  </span>
                  {comment.mentions.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <AtSign className="h-3 w-3 mr-1" />
                      {comment.mentions.length}
                    </Badge>
                  )}
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Add a comment... Use @CFO or @CHRO to mention team members"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {teamMembers.map((member) => (
                <Button
                  key={member.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => setNewComment(prev => prev + `@${member.name} `)}
                  className="h-7 text-xs"
                >
                  <AtSign className="h-3 w-3 mr-1" />
                  {member.name}
                </Button>
              ))}
            </div>
            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Comment
            </Button>
          </div>
        </div>
      </Card>

      {/* Sharing Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Share Analysis</h3>
        </div>

        {!isSharing ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Share this analysis with team members. They'll receive a link with read access.
            </p>
            <Button onClick={() => setIsSharing(true)} variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Share with Team
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select team members to share with:
            </p>

            <div className="space-y-2">
              {teamMembers.map((member) => {
                const isSelected = shareRecipients.includes(member.email);

                return (
                  <button
                    key={member.email}
                    onClick={() => toggleRecipient(member.email)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {member.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.email}</div>
                      </div>
                      {isSelected && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                disabled={shareRecipients.length === 0}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSharing(false);
                  setShareRecipients([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Activity Summary */}
      <Card className="p-4 bg-muted">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Activity Summary</span>
        </div>
        <p className="text-xs text-muted-foreground">
          3 team members have viewed this analysis • Last updated 2 hours ago
        </p>
      </Card>
    </div>
  );
}