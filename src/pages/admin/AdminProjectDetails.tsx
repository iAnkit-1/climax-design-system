import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Building2,
  FileText,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Calculator,
  Leaf,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const AdminProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: rawProject, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    },
    enabled: !!projectId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !rawProject) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center space-y-4">
        <XCircle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-bold text-foreground">Project Not Found</h2>
        <Button variant="outline" asChild>
          <Link to="/admin/projects">Return to Registry</Link>
        </Button>
      </div>
    );
  }

  // Safe mappings bridging DB structure to UI layout
  const project = {
    id: rawProject._id,
    title: rawProject.title,
    seller: rawProject.seller?.name || "Unknown Seller",
    sellerEmail: rawProject.seller?.email || "N/A",
    sellerPhone: "N/A", // Not stored in standard DB schema
    type: rawProject.projectType || "Unknown",
    status: rawProject.status || "pending",
    credits: rawProject.credits || 0,
    submittedDate: rawProject.createdAt,
    verifiedDate: rawProject.status === 'verified' ? rawProject.updatedAt : null,
    location: {
      address: rawProject.location?.address || "N/A",
      city: rawProject.location?.district || "N/A",
      state: rawProject.location?.state || "N/A",
      pincode: rawProject.location?.pincode || "N/A",
      coordinates: "GPS Mapping Underway",
    },
    baseline: {
      energyUse: rawProject.energyUse || "N/A",
      fuelType: rawProject.fuelType || "N/A",
      emissionFactor: rawProject.emissionFactor || "N/A",
      capacityInstalled: "Under Audit",
      additionalityProof: rawProject.additionalityProof || "N/A",
    },
    documents: (rawProject.documents || []).map((doc: any, i: number) => ({
      id: i.toString(),
      name: doc.name || `Document_${i+1}`,
      type: "Evidence",
      size: "Remote File",
      uploadedAt: rawProject.createdAt,
    })),
    auditor: rawProject.selectedAuditor ? {
      name: rawProject.selectedAuditor.name || "Assigned",
      verifiedAt: rawProject.status === 'verified' ? rawProject.updatedAt : "Pending",
      report: "Pending Generation",
    } : null,
    mrvChecklist: [
      { item: "Baseline emissions calculated", status: rawProject.energyUse ? "verified" : "pending" },
      { item: "Additionality demonstrated", status: rawProject.additionalityProof ? "verified" : "pending" },
    ],
    auditTrail: [
      {
        date: new Date(rawProject.createdAt).toLocaleString(),
        action: "Project Submitted",
        user: rawProject.seller?.name,
        details: "Initial submission recorded to ledger",
      }
    ],
    blockchain: rawProject.status === 'verified' ? {
      hash: "Tx_0x... (Mocked for Ledger Demo)",
      network: "Solana Simulation",
      timestamp: new Date().toISOString(),
    } : null,
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
      verified: { variant: "default", icon: CheckCircle2 },
      pending: { variant: "secondary", icon: Clock },
      rejected: { variant: "destructive", icon: XCircle },
      flagged: { variant: "destructive", icon: XCircle },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/admin/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {project.title}
                </h1>
                {getStatusBadge(project.status)}
              </div>
              <p className="text-muted-foreground">
                {project.id} • Submitted on{" "}
                {new Date(project.submittedDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Package
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="baseline">Baseline Data</TabsTrigger>
            <TabsTrigger value="mrv">MRV Checklist</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Project Type
                      </p>
                      <p className="font-medium">{project.type}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calculator className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Credits
                      </p>
                      <p className="font-medium">
                        {project.credits.toLocaleString()} tCO₂e
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Submitted Date
                      </p>
                      <p className="font-medium">
                        {new Date(project.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {project.verifiedDate && (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Verified Date
                        </p>
                        <p className="font-medium">
                          {new Date(project.verifiedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Seller Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Organization
                      </p>
                      <p className="font-medium">{project.seller}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{project.sellerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{project.sellerPhone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{project.location.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.location.city}, {project.location.state} -{" "}
                        {project.location.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Coordinates
                      </p>
                      <p className="font-medium">
                        {project.location.coordinates}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Auditor Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Verification Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.auditor ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Auditor
                          </p>
                          <p className="font-medium">{project.auditor.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Verified On
                          </p>
                          <p className="font-medium">
                            {new Date(
                              project.auditor.verifiedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(project.auditor.report)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Audit Report
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Pending verification
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Blockchain Info */}
            {project.blockchain && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Blockchain Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Transaction Hash
                      </p>
                      <p className="font-mono text-sm break-all">
                        {project.blockchain.hash}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://polygonscan.com/tx/${project.blockchain.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Polygonscan
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.documents.map((doc: any) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size} • Uploaded{" "}
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(doc.name)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Baseline Tab */}
          <TabsContent value="baseline">
            <Card>
              <CardHeader>
                <CardTitle>Baseline Emissions Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Annual Energy Use
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {parseFloat(project.baseline.energyUse).toLocaleString()}{" "}
                      kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Fuel Type
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {project.baseline.fuelType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Emission Factor
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {project.baseline.emissionFactor} kg CO₂/kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Capacity Installed
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {project.baseline.capacityInstalled}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-sm font-medium mb-2">Additionality Proof</p>
                  <p className="text-muted-foreground">
                    {project.baseline.additionalityProof}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MRV Checklist Tab */}
          <TabsContent value="mrv">
            <Card>
              <CardHeader>
                <CardTitle>MRV Verification Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.mrvChecklist.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <span>{item.item}</span>
                      <Badge
                        variant={
                          item.status === "verified" ? "default" : "secondary"
                        }
                        className="gap-1"
                      >
                        {item.status === "verified" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Trail Tab */}
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Complete Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.auditTrail.map((entry: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-4 border-b last:border-0"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="font-medium">{entry.action}</p>
                          <span className="text-xs text-muted-foreground">
                            {entry.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          By: {entry.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entry.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProjectDetails;