import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Download } from "lucide-react";
import api from "@/lib/api";
import { format } from "date-fns";

const Certificate = () => {
  const { id } = useParams();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['wallet-transactions'],
    queryFn: async () => {
      const response = await api.get('/wallet/transactions');
      return response.data;
    }
  });

  const transaction = transactions?.find((t: any) => t._id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading certificate...</p>
        </main>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Certificate Not Found</h2>
          <Button asChild><Link to="/wallet">Back to Wallet</Link></Button>
        </main>
      </div>
    );
  }

  const certificateId = `CERT-${transaction._id.substring(0, 8).toUpperCase()}`;
  const quantity = transaction.credits || transaction.quantity || 0;
  const projectName = transaction.project?.title || transaction.projectName || "Platform Direct Issue";
  const date = new Date(transaction.createdAt || transaction.date);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 print:hidden">
            <Button variant="ghost" asChild>
              <Link to="/wallet">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Wallet
              </Link>
            </Button>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>

          <div className="bg-white p-8 sm:p-16 border-[12px] border-double border-primary/20 rounded-xl shadow-2xl relative overflow-hidden" id="certificate-content">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            
            <div className="absolute top-12 left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-12 right-12 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center text-white text-3xl font-serif font-bold shadow-lg mb-8">
                C
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-serif text-primary tracking-wider uppercase mb-2">
                {transaction.type === 'retire' ? 'Certificate of Retirement' : 'Certificate of Purchase'}
              </h1>
              <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-12">
                ClimaX Carbon Registry
              </p>

              <div className="space-y-6 mb-12">
                <p className="text-lg text-muted-foreground italic">This certifies that</p>
                <h2 className="text-3xl font-bold text-foreground">
                  {localStorage.getItem("userName") || "Valued Member"}
                </h2>
                <p className="text-lg text-muted-foreground italic">has successfully {transaction.type === 'retire' ? 'retired' : 'purchased'}</p>
                <div className="text-5xl font-bold text-accent py-4">
                  {quantity.toLocaleString()} tCO₂e
                </div>
                <p className="text-lg text-muted-foreground italic">of Verified Carbon Credits</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left border-y border-border py-8 mb-12">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Project</p>
                  <p className="font-medium">{projectName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date</p>
                  <p className="font-medium">{format(date, 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Certificate ID</p>
                  <p className="font-medium font-mono text-sm">{certificateId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Network</p>
                  <p className="font-medium">{transaction.blockchainNetwork || 'Polygon Amoy'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary">Verified Authentic</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1 w-48 truncate" title={transaction.blockchainHash}>
                      TX: {transaction.blockchainHash || 'Pending'}
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="w-48 border-b border-foreground mb-2 mx-auto sm:ml-auto sm:mr-0 h-12 flex items-end justify-center sm:justify-end pb-2">
                    <span className="font-signature text-2xl text-primary/80" style={{ fontFamily: 'cursive' }}>ClimaX Auth</span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Authorized Signatory</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Certificate;
