import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, ShieldCheck, ShieldX, Loader2, Hash, Clock, Leaf, MapPin } from "lucide-react";

interface VerificationResult {
  valid: boolean;
  hash: string;
  projectName: string;
  creditType: string;
  quantity: number;
  vintage: string;
  registry: string;
  country: string;
  status: string;
  issuanceDate: string;
  retirementDate?: string;
}

import api from "@/lib/api";

const VerifyCCC = () => {
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null | undefined>(undefined);

  const handleVerify = async () => {
    if (!hash.trim()) return;
    setLoading(true);
    setResult(undefined);
    try {
      const response = await api.get(`/wallet/verify/${hash.trim()}`);
      setResult(response.data);
    } catch (error) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Blockchain Verified</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Verify Carbon Credit Certificate
            </h1>
            <p className="text-muted-foreground text-lg mb-10">
              Enter the blockchain verification hash to authenticate your carbon credit certificate instantly.
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <Input
                placeholder="0x088fb154432282c7d8359d3f779da5102fd8ccc9..."
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                className="font-mono text-sm h-12"
              />
              <Button
                onClick={handleVerify}
                disabled={loading || !hash.trim()}
                className="h-12 px-8"
                variant="primary"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Verify
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Example: 0x088fb154432282c7d8359d3f779da5102fd8ccc9439dd107b0bdd96b29dc3d6e
            </p>
          </div>
        </section>

        {/* Result */}
        <section className="py-12 px-4 max-w-3xl mx-auto">
          {loading && (
            <Card>
              <CardContent className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
                <span className="text-muted-foreground">Verifying on blockchain...</span>
              </CardContent>
            </Card>
          )}

          {result !== undefined && !loading && result === null && (
            <Card className="border-destructive/30">
              <CardContent className="flex flex-col items-center py-16 text-center">
                <ShieldX className="w-16 h-16 text-destructive mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Certificate Not Found</h3>
                <p className="text-muted-foreground max-w-md">
                  The verification hash you entered could not be found on the blockchain.
                  Please check the hash and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {result && !loading && (
            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Certificate Verified</CardTitle>
                    <p className="text-sm text-muted-foreground">This carbon credit certificate is authentic</p>
                  </div>
                  <Badge className="ml-auto bg-primary/10 text-primary">{result.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hash */}
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Hash className="w-4 h-4" />
                    Verification Hash
                  </div>
                  <p className="font-mono text-xs break-all text-foreground">{result.hash}</p>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5" /> Project Name
                    </p>
                    <p className="font-medium text-foreground">{result.projectName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Credit Type</p>
                    <p className="font-medium text-foreground">{result.creditType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium text-foreground">{result.quantity.toLocaleString()} tCO₂e</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Vintage</p>
                    <p className="font-medium text-foreground">{result.vintage}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Registry</p>
                    <p className="font-medium text-foreground">{result.registry}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Country
                    </p>
                    <p className="font-medium text-foreground">{result.country}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Issuance Date
                    </p>
                    <p className="font-medium text-foreground">{result.issuanceDate}</p>
                  </div>
                  {result.retirementDate && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Retirement Date</p>
                      <p className="font-medium text-foreground">{result.retirementDate}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyCCC;
