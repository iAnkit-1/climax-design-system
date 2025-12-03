import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  timestamp: string;
  message: string;
}

interface Props {
  comments: Comment[];
  projectId: string;
}

export default function CommentThread({ comments, projectId }: Props) {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully."
    });
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      {/* Comment List */}
      <Card variant="flat" className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Discussion Thread
        </h3>
        
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {comment.author.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">
                      {comment.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No comments yet. Start the discussion.
            </p>
          </div>
        )}
      </Card>

      {/* New Comment */}
      <Card variant="flat" className="p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Add Comment
        </h3>
        <div className="space-y-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your feedback, request additional information, or communicate with the project owner..."
            rows={4}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={!newComment.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
