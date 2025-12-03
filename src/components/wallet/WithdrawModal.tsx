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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Building2 } from "lucide-react";

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
  onWithdraw: (amount: number, accountDetails: any) => void;
}

export const WithdrawModal = ({ 
  open, 
  onOpenChange, 
  availableBalance,
  onWithdraw 
}: WithdrawModalProps) => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const handleWithdraw = () => {
    const amt = parseInt(amount);
    if (amt > 0 && amt <= availableBalance) {
      onWithdraw(amt, {
        accountNumber,
        ifscCode,
        accountHolder
      });
      setAmount("");
      setAccountNumber("");
      setIfscCode("");
      setAccountHolder("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Transfer funds to your bank account</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Withdrawals are processed within 2-3 business days. A processing fee of 2% applies.
            </AlertDescription>
          </Alert>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (₹)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={100}
              max={availableBalance}
            />
            <p className="text-sm text-muted-foreground">
              Available: ₹{availableBalance.toLocaleString()}
            </p>
          </div>

          {/* Bank Details */}
          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-primary" />
              <Label className="text-base">Bank Account Details</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-holder">Account Holder Name</Label>
              <Input
                id="account-holder"
                placeholder="As per bank records"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input
                id="ifsc"
                placeholder="E.g., SBIN0001234"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          {/* Fee Breakdown */}
          {amount && parseInt(amount) > 0 && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Withdrawal Amount</span>
                <span className="font-medium">₹{parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Processing Fee (2%)</span>
                <span className="font-medium text-destructive">
                  -₹{Math.round(parseInt(amount) * 0.02).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="font-semibold">You'll Receive</span>
                <span className="text-xl font-bold text-primary">
                  ₹{Math.round(parseInt(amount) * 0.98).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleWithdraw}
            disabled={
              !amount || 
              parseInt(amount) < 100 || 
              parseInt(amount) > availableBalance ||
              !accountNumber ||
              !ifscCode ||
              !accountHolder
            }
          >
            Submit Withdrawal Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
