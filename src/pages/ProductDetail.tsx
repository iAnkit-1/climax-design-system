import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuickBuyModal } from "@/components/marketplace/QuickBuyModal";
import { 
  MapPin, 
  Calendar, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Download,
  ArrowLeft,
  Clock,
  Award
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface Transaction {
  id: string;
  date: string;
  buyer: string;
  credits: number;
  price: number;
  status: "completed" | "retired";
}

const ProductDetail = () => {
  const { id } = useParams();
  const [buyModalOpen, setBuyModalOpen] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await api.get(`/projects/${id}`);
      const p = response.data;
      return {
        id: id,
        title: p.title || "Unknown Title",
        seller: p.seller?.name || "Unknown Seller",
        type: p.projectType || "Unknown Type",
        location: p.location ? `${p.location.address || ''} ${p.location.state || ''}`.trim() : "Mumbai",
        credits: p.credits || 0,
        pricePerCredit: p.pricePerCredit || 850,
        vintage: p.vintage || new Date().getFullYear(),
        verifier: p.verifier || "Gold Standard",
        status: p.status || "pending",
        description: p.description || "This large-scale rooftop solar project represents a significant step forward in renewable energy adoption.",
        methodology: p.methodology || "CDM Methodology ACM0002",
        projectStart: p.projectStart || "January 2023",
        certificationDate: p.certificationDate || "March 2024",
        monitoringPeriod: p.monitoringPeriod || "2024-2025",
        additionalBenefits: p.additionalBenefits?.length > 0 ? p.additionalBenefits : [
          "Reduces local air pollution",
          "Creates green jobs in the community"
        ],
        documents: p.documents?.length > 0 ? p.documents : [
          { name: "Project Design Document", type: "PDF", size: "2.4 MB" }
        ]
      };
    },
    enabled: !!id
  });

  const transactions: Transaction[] = [];

  if (isLoading || !project) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading project details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: { variant: "default" as const, icon: CheckCircle2, label: "Verified" },
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
      retired: { variant: "outline" as const, icon: Award, label: "Retired" }
    };
    const config = variants[status as keyof typeof variants] || variants.verified;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link to="/marketplace">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card variant="project">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-2">
                      <CardTitle className="text-3xl">{project.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(project.status)}
                        <Badge variant="secondary">{project.type}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Vintage {project.vintage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified by {project.verifier}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>{project.credits} tCO₂e available</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Project Story */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Additional Co-Benefits:</h4>
                    <ul className="space-y-2">
                      {project.additionalBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm font-medium">Methodology</p>
                      <p className="text-sm text-muted-foreground">{project.methodology}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Project Start</p>
                      <p className="text-sm text-muted-foreground">{project.projectStart}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Certification Date</p>
                      <p className="text-sm text-muted-foreground">{project.certificationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Monitoring Period</p>
                      <p className="text-sm text-muted-foreground">{project.monitoringPeriod}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.documents.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.map((txn) => (
                      <div 
                        key={txn.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{txn.buyer}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(txn.date).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-medium">{txn.credits} tCO₂e</p>
                          <Badge variant={txn.status === "retired" ? "outline" : "secondary"}>
                            {txn.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Purchase Card */}
              <Card variant="credit">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price per credit</p>
                    <p className="text-4xl font-bold text-foreground">₹{project.pricePerCredit}</p>
                    <p className="text-sm text-muted-foreground">per tCO₂e</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available Credits</span>
                      <span className="font-medium">{project.credits.toLocaleString()} tCO₂e</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Seller</span>
                      <span className="font-medium">{project.seller}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setBuyModalOpen(true)}
                    >
                      Buy 10 tCO₂e
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Retire Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About Seller</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">{project.seller}</p>
                    <p className="text-sm text-muted-foreground">
                      Verified renewable energy developer with 15+ years of experience
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Badge variant="secondary">Verified Seller</Badge>
                    <Badge variant="secondary">50+ Projects</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <QuickBuyModal
        open={buyModalOpen}
        onOpenChange={setBuyModalOpen}
        projectId={project.id}
        projectTitle={project.title}
        pricePerCredit={project.pricePerCredit}
        availableCredits={project.credits}
      />
    </div>
  );
};

export default ProductDetail;
