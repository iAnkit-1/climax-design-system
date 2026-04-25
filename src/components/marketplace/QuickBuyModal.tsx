import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface QuickBuyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  pricePerCredit: number;
  availableCredits: number;
  projectId: string; // Added projectId
  projectImage?: string; // Added projectImage prop
}

export const QuickBuyModal = ({ 
  open, 
  onOpenChange, 
  projectTitle, 
  pricePerCredit, 
  availableCredits,
  projectId,
  projectImage // Added projectImage
}: QuickBuyModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, availableCredits));
    setQuantity(newQuantity);
  };

  const totalPrice = quantity * pricePerCredit;
  const platformFee = totalPrice * 0.025;
  const finalTotal = totalPrice + platformFee;

  const handlePurchase = async () => {
    setIsLoading(true);
    toast({
      title: "Processing Payment & Blockchain Transaction",
      description: `Recording your purchase of ${quantity} tCO₂e on Solana Devnet...`,
    });
    
    try {
      // Simulate payment animation delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await api.post('/transactions', {
        projectId,
        creditsToBuy: quantity
      });
      
      toast({
        title: "Purchase Successful!",
        description: `Transaction recorded on blockchain (Hash: ${response.data.blockchainHash?.substring(0, 10)}...). Redirecting...`,
      });
      
      onOpenChange(false);
      
      setTimeout(() => {
        navigate("/wallet");
      }, 1500);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Purchase Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Quick Buy Carbon Credits</DialogTitle>
          <DialogDescription>
            {projectTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Image Display */}
          {projectImage && (
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <img
                src={projectImage}
                alt={projectTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Verified Project</span>
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (tCO₂e)</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 10)}
                disabled={quantity <= 10}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="text-center"
                min={1}
                max={availableCredits}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 10)}
                disabled={quantity >= availableCredits}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Available: {availableCredits.toLocaleString()} tCO₂e
            </p>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Credits ({quantity} × ₹{pricePerCredit})</span>
              <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee (2.5%)</span>
              <span className="font-medium">₹{platformFee.toLocaleString()}</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wallet">Wallet Balance</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="netbanking">Net Banking</SelectItem>
              </SelectContent>
            </Select>
            {paymentMethod === "wallet" && (
              <p className="text-xs text-muted-foreground">
                Your current wallet balance will be used for this purchase
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={isLoading}>
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};