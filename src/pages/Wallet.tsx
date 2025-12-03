import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RetireCreditsModal } from "@/components/wallet/RetireCreditsModal";
import { TopUpModal } from "@/components/wallet/TopUpModal";
import { WithdrawModal } from "@/components/wallet/WithdrawModal";
import {
  generateRetirementCertificate,
  generateCertificateId,
  generateBlockchainHash,
} from "@/components/wallet/RetirementCertificate";
import {
  Wallet as WalletIcon,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  Award,
  Download,
  FileText,
  Calendar,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: string;
  type: "buy" | "sell" | "retire" | "topup" | "withdraw";
  projectName?: string;
  quantity?: number;
  amount: number;
  status: "completed" | "pending" | "processing";
  blockchainHash?: string;
  blockchainNetwork?: string;
}

const Wallet = () => {
  const { toast } = useToast();
  const [retireModalOpen, setRetireModalOpen] = useState(false);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  
  // Wallet state management
  const [creditBalance, setCreditBalance] = useState(1250);
  const [inrBalance, setInrBalance] = useState(458000);

  // Mock data
  const userRole = localStorage.getItem("userRole") || "buyer";
  const userName = localStorage.getItem("userName") || "User";

  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      date: "2024-11-18",
      type: "buy",
      projectName: "Rooftop Solar - Mumbai",
      quantity: 100,
      amount: 85000,
      status: "completed",
      blockchainHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
      blockchainNetwork: "Polygon"
    },
    {
      id: "TXN-002",
      date: "2024-11-15",
      type: "retire",
      projectName: "Wind Farm - Rajasthan",
      quantity: 50,
      amount: 0,
      status: "completed",
      blockchainHash: "0x8b3a7e42b1b2c2d3f4e5f6a7b8c9d0e1f2a3b4c5",
      blockchainNetwork: "Polygon"
    },
    {
      id: "TXN-003",
      date: "2024-11-12",
      type: "sell",
      projectName: "Biogas Plant - Tamil Nadu",
      quantity: 200,
      amount: 156000,
      status: "completed",
      blockchainHash: "0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d",
      blockchainNetwork: "Polygon"
    },
    {
      id: "TXN-004",
      date: "2024-11-10",
      type: "topup",
      amount: 100000,
      status: "completed"
    },
    {
      id: "TXN-005",
      date: "2024-11-08",
      type: "buy",
      projectName: "Afforestation - Uttarakhand",
      quantity: 300,
      amount: 276000,
      status: "completed",
      blockchainHash: "0x9f8e7d6c5b4a3928170615243f2e1d0c9b8a7f6e",
      blockchainNetwork: "Polygon"
    },
    {
      id: "TXN-006",
      date: "2024-11-05",
      type: "withdraw",
      amount: 50000,
      status: "processing"
    }
  ];

  // Chart data - last 6 months
  const chartData = [
    { month: "Jun", bought: 450, retired: 100 },
    { month: "Jul", bought: 380, retired: 150 },
    { month: "Aug", bought: 520, retired: 80 },
    { month: "Sep", bought: 410, retired: 200 },
    { month: "Oct", bought: 630, retired: 120 },
    { month: "Nov", bought: 390, retired: 180 }
  ];

  const handleRetire = (quantity: number, reason: string) => {
    // Update credit balance
    setCreditBalance(prev => prev - quantity);
    
    // Generate blockchain hash and certificate ID
    const certificateId = generateCertificateId();
    const blockchainHash = generateBlockchainHash();
    
    // Generate and download the retirement certificate
    generateRetirementCertificate({
      certificateId,
      holderName: userName,
      organization: localStorage.getItem("userOrganization") || "Your Organization",
      quantity,
      reason,
      retirementDate: new Date(),
      blockchainHash,
    });
    
    toast({
      title: "Credits Retired Successfully",
      description: `${quantity} tCO₂e has been permanently retired. Your certificate is being downloaded.`,
    });
  };

  const handleTopUp = (amount: number, method: string) => {
    // Simulate payment processing
    toast({
      title: "Payment Processing",
      description: `Processing payment via ${method === "upi" ? "UPI" : "Razorpay"}...`,
    });
    
    // Simulate successful payment after a delay
    setTimeout(() => {
      setInrBalance(prev => prev + amount);
      toast({
        title: "Top Up Successful",
        description: `₹${amount.toLocaleString()} has been added to your wallet.`,
      });
    }, 1500);
  };

  const handleWithdraw = (amount: number, accountDetails: any) => {
    toast({
      title: "Withdrawal Request Submitted",
      description: `Your withdrawal request for ₹${amount.toLocaleString()} is being processed.`,
    });
  };

  const handleDownloadCertificate = (transactionId: string) => {
    toast({
      title: "Downloading Certificate",
      description: "Your retirement certificate PDF is being generated...",
    });
  };

  const exportToCSV = () => {
    const headers = ["Date", "Type", "Project", "Quantity (tCO₂e)", "Amount (₹)", "Status"];
    const rows = transactions.map(t => [
      format(new Date(t.date), "dd/MM/yyyy"),
      t.type,
      t.projectName || "-",
      t.quantity || "-",
      t.amount,
      t.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wallet-transactions-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Transaction history has been exported to CSV.",
    });
  };

  const exportChartToCSV = () => {
    const headers = ["Month", "Credits Bought (tCO₂e)", "Credits Retired (tCO₂e)"];
    const rows = chartData.map(d => [d.month, d.bought, d.retired]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `credit-activity-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Credit activity chart data has been exported to CSV.",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowDownCircle className="w-5 h-5 text-primary" />;
      case "sell":
        return <ArrowUpCircle className="w-5 h-5 text-success" />;
      case "retire":
        return <Award className="w-5 h-5 text-accent" />;
      case "topup":
        return <TrendingUp className="w-5 h-5 text-primary" />;
      case "withdraw":
        return <ArrowUpCircle className="w-5 h-5 text-muted-foreground" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { variant: "default" as const, label: "Completed" },
      pending: { variant: "secondary" as const, label: "Pending" },
      processing: { variant: "outline" as const, label: "Processing" }
    };
    const config = variants[status as keyof typeof variants] || variants.completed;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">My Wallet</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Welcome, {userName}!
            </p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Credits Balance */}
            <Card variant="credit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WalletIcon className="w-5 h-5" />
                  Carbon Credits
                </CardTitle>
                <CardDescription>Available for trading or retirement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-3xl sm:text-5xl font-bold text-primary">
                      {creditBalance.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">tCO₂e</p>
                  </div>
                  <Button 
                    variant="accent" 
                    className="w-full min-h-[44px]"
                    onClick={() => setRetireModalOpen(true)}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Retire Credits
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* INR Balance */}
            <Card variant="project">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Wallet Balance
                </CardTitle>
                <CardDescription>Available funds for purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-3xl sm:text-5xl font-bold text-foreground">
                      ₹{inrBalance.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Indian Rupees</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 min-h-[44px]"
                      onClick={() => setTopUpModalOpen(true)}
                    >
                      <ArrowDownCircle className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Top Up</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                    {userRole === "seller" && (
                      <Button 
                        variant="outline" 
                        className="flex-1 min-h-[44px]"
                        onClick={() => setWithdrawModalOpen(true)}
                      >
                        <ArrowUpCircle className="w-4 h-4 mr-2" />
                        <span>Withdraw</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Chart */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base sm:text-lg">Credit Activity</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Last 6 months</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={exportChartToCSV} className="min-h-[44px] w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export CSV</span>
                  <span className="sm:hidden">Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bought"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Credits Bought"
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="retired"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Credits Retired"
                      dot={{ fill: "hsl(var(--accent))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Bought</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Retired</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base sm:text-lg">Recent Transactions</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Latest wallet activity</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={exportToCSV} className="min-h-[44px] w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export CSV</span>
                  <span className="sm:hidden">Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-2 sm:space-y-3">
                {transactions.map((txn) => (
                  <div 
                    key={txn.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                        {getTransactionIcon(txn.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium capitalize">{txn.type}</p>
                          {getStatusBadge(txn.status)}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {txn.projectName || "Wallet transaction"}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(txn.date), "dd MMM yyyy")}
                        </div>
                        {txn.blockchainHash && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <CheckCircle2 className="w-3 h-3 text-success" />
                            <a
                              href={`https://polygonscan.com/tx/${txn.blockchainHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              <span className="hidden sm:inline">Blockchain Verified</span>
                              <span className="sm:hidden">{txn.blockchainHash.slice(0, 6)}...{txn.blockchainHash.slice(-4)}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:text-right space-y-0 sm:space-y-1 shrink-0 sm:ml-4">
                      <div>
                        {txn.quantity && (
                          <p className="text-sm font-medium">{txn.quantity.toLocaleString()} tCO₂e</p>
                        )}
                        <p className={`text-sm ${
                          txn.type === "buy" || txn.type === "topup" ? "text-primary" :
                          txn.type === "sell" ? "text-success" :
                          "text-muted-foreground"
                        }`}>
                          {txn.type === "buy" || txn.type === "withdraw" ? "-" : "+"}
                          ₹{txn.amount.toLocaleString()}
                        </p>
                      </div>
                      {txn.type === "retire" && txn.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadCertificate(txn.id)}
                          className="min-h-[44px]"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Certificate</span>
                          <span className="sm:hidden">Cert</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <RetireCreditsModal
        open={retireModalOpen}
        onOpenChange={setRetireModalOpen}
        availableCredits={creditBalance}
        onRetire={handleRetire}
      />

      <TopUpModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
        onTopUp={handleTopUp}
      />

      <WithdrawModal
        open={withdrawModalOpen}
        onOpenChange={setWithdrawModalOpen}
        availableBalance={inrBalance}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
};

export default Wallet;
