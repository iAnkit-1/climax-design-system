import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  projectId: string;
  projectTitle: string;
  actionType: "approve" | "reject";
}

export default function SignatureModal({
  isOpen,
  onClose,
  onSubmit,
  projectId,
  projectTitle,
  actionType
}: Props) {
  const [signature, setSignature] = useState("");
  const [reason, setReason] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!signature.trim()) {
      toast({
        title: "Signature Required",
        description: "Please enter your digital signature to confirm.",
        variant: "destructive"
      });
      return;
    }

    if (actionType === "reject" && !reason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive"
      });
      return;
    }

    setIsConfirming(true);
    
    // Simulate Blockchain cryptographic signing delay securely
    setTimeout(() => {
      toast({
        title: actionType === "approve" ? "Project Approved" : "Project Rejected",
        description: `${projectTitle} has been ${actionType === "approve" ? "verified" : "rejected"} securely.`
      });
      setIsConfirming(false);
      onSubmit(); // Fire actual database execution handler
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {actionType === "approve" ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <DialogTitle>
              {actionType === "approve" ? "Approve Project" : "Reject Project"}
            </DialogTitle>
          </div>
          <DialogDescription>
            This action requires your digital signature for verification and audit trail purposes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Important Notice
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your decision will be permanently recorded with timestamp and signature.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Project</p>
            <p className="text-sm font-medium text-foreground">{projectTitle}</p>
            <p className="text-xs text-muted-foreground mt-1">ID: {projectId}</p>
          </div>

          {/* Rejection Reason (only for reject) */}
          {actionType === "reject" && (
            <div>
              <Label htmlFor="reason" className="text-foreground">
                Reason for Rejection <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide detailed reason for rejection..."
                rows={4}
                className="mt-1.5"
              />
            </div>
          )}

          {/* Timestamp */}
          <div>
            <Label className="text-foreground">Timestamp</Label>
            <Input
              value={new Date().toLocaleString()}
              disabled
              className="mt-1.5"
            />
          </div>

          {/* Digital Signature */}
          <div>
            <Label htmlFor="signature" className="text-foreground">
              Digital Signature <span className="text-destructive">*</span>
            </Label>
            <Input
              id="signature"
              type="password"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Enter your signature PIN"
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Enter your 4-digit auditor signature PIN
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isConfirming}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`flex-1 ${
              actionType === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isConfirming ? "Processing..." : `Confirm ${actionType === "approve" ? "Approval" : "Rejection"}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
