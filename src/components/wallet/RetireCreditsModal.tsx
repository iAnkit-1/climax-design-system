import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Award } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RetireCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableCredits: number;
  onRetire: (quantity: number, reason: string) => void;
}

export const RetireCreditsModal = ({ 
  open, 
  onOpenChange, 
  availableCredits,
  onRetire 
}: RetireCreditsModalProps) => {
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    const qty = parseInt(quantity);
    if (qty > 0 && qty <= availableCredits) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    const qty = parseInt(quantity);
    onRetire(qty, reason);
    setQuantity("");
    setReason("");
    setShowConfirmation(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle>Confirm Credit Retirement</DialogTitle>
                <DialogDescription>This action cannot be undone</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You are about to permanently retire <strong>{quantity} tCO₂e</strong> carbon credits. 
                These credits will be removed from circulation and cannot be traded or sold.
              </AlertDescription>
            </Alert>

            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Credits to Retire</span>
                <span className="font-semibold">{quantity} tCO₂e</span>
              </div>
              {reason && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p className="text-sm mt-1">{reason}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm Retirement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Retire Carbon Credits</DialogTitle>
          <DialogDescription>
            Permanently remove credits from circulation to claim environmental benefit
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Retired credits cannot be traded or sold. You'll receive a retirement certificate.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (tCO₂e)</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
              max={availableCredits}
            />
            <p className="text-sm text-muted-foreground">
              Available: {availableCredits.toLocaleString()} tCO₂e
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Retirement (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="E.g., Offsetting company emissions for Q4 2024"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!quantity || parseInt(quantity) <= 0 || parseInt(quantity) > availableCredits}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
