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

// Mock detailed project data
const PROJECT_DETAILS: Record<string, any> = {
  "PRJ-001": {
    id: "PRJ-001",
    title: "Rooftop Solar Installation - Mumbai",
    seller: "Green Energy Co.",
    sellerEmail: "contact@greenenergy.co.in",
    sellerPhone: "+91 98765 43210",
    type: "Rooftop Solar",
    status: "verified",
    credits: 450,
    submittedDate: "2024-01-15",
    verifiedDate: "2024-01-24",
    location: {
      address: "Bandra Kurla Complex, Block G",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      coordinates: "19.0596° N, 72.8656° E",
    },
    baseline: {
      energyUse: "50000",
      fuelType: "Grid Electricity",
      emissionFactor: "0.82",
      annualGeneration: "75,000 kWh",
      capacityInstalled: "50 kW",
      additionalityProof:
        "This solar installation project would not be financially viable without carbon credit incentives. The project replaces grid electricity which has a high emission factor in Maharashtra.",
    },
    documents: [
      {
        id: "1",
        name: "Installation Invoice.pdf",
        type: "Invoice",
        size: "2.5 MB",
        uploadedAt: "2024-01-15",
      },
      {
        id: "2",
        name: "Site Photos - Before.zip",
        type: "Photos",
        size: "15.8 MB",
        uploadedAt: "2024-01-15",
      },
      {
        id: "3",
        name: "Site Photos - After.zip",
        type: "Photos",
        size: "18.2 MB",
        uploadedAt: "2024-01-15",
      },
      {
        id: "4",
        name: "Equipment Certification.pdf",
        type: "Certificate",
        size: "1.2 MB",
        uploadedAt: "2024-01-15",
      },
      {
        id: "5",
        name: "Grid Connection Approval.pdf",
        type: "Approval",
        size: "0.8 MB",
        uploadedAt: "2024-01-15",
      },
      {
        id: "6",
        name: "MRV Data Logs.xlsx",
        type: "Data",
        size: "3.4 MB",
        uploadedAt: "2024-01-20",
      },
    ],
    auditor: {
      name: "ACVA India",
      verifiedAt: "2024-01-24",
      signature: "Digitally Signed",
      report: "Audit Report - PRJ-001.pdf",
    },
    mrvChecklist: [
      { item: "Baseline emissions calculated", status: "verified" },
      { item: "Project boundary defined", status: "verified" },
      { item: "Additionality demonstrated", status: "verified" },
      { item: "Leakage assessment complete", status: "verified" },
      { item: "Monitoring plan established", status: "verified" },
      { item: "Data quality procedures in place", status: "verified" },
    ],
    auditTrail: [
      {
        date: "2024-01-15 09:30",
        action: "Project Submitted",
        user: "Green Energy Co.",
        details: "Initial submission with all required documents",
      },
      {
        date: "2024-01-16 10:15",
        action: "Assigned to Auditor",
        user: "System",
        details: "Automatically assigned to ACVA India",
      },
      {
        date: "2024-01-18 14:20",
        action: "Document Review Started",
        user: "ACVA India",
        details: "Auditor began reviewing baseline emissions data",
      },
      {
        date: "2024-01-22 11:45",
        action: "Site Verification Completed",
        user: "ACVA India",
        details: "Physical site inspection completed successfully",
      },
      {
        date: "2024-01-24 16:00",
        action: "Project Verified",
        user: "ACVA India",
        details: "All verification criteria met. 450 credits approved.",
      },
    ],
    blockchain: {
      hash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3a1b2c3d4e5f6",
      network: "Polygon",
      timestamp: "2024-01-24T16:05:00Z",
    },
  },
  "PRJ-002": {
    id: "PRJ-002",
    title: "Biogas Plant - Rural Tamil Nadu",
    seller: "EcoFarm Solutions",
    sellerEmail: "info@ecofarm.in",
    sellerPhone: "+91 87654 32109",
    type: "Biogas",
    status: "pending",
    credits: 320,
    submittedDate: "2024-01-18",
    verifiedDate: null,
    location: {
      address: "Kanchipuram District",
      city: "Kanchipuram",
      state: "Tamil Nadu",
      pincode: "631502",
      coordinates: "12.8352° N, 79.7036° E",
    },
    baseline: {
      energyUse: "35000",
      fuelType: "LPG",
      emissionFactor: "2.98",
      annualGeneration: "45,000 m³ biogas",
      capacityInstalled: "100 m³/day",
      additionalityProof:
        "The biogas plant requires significant upfront investment that is only viable with carbon credit revenue. Replaces LPG usage in rural households.",
    },
    documents: [
      {
        id: "1",
        name: "Biogas Setup Invoice.pdf",
        type: "Invoice",
        size: "1.8 MB",
        uploadedAt: "2024-01-18",
      },
      {
        id: "2",
        name: "Plant Photos.zip",
        type: "Photos",
        size: "12.4 MB",
        uploadedAt: "2024-01-18",
      },
      {
        id: "3",
        name: "MRV Logs Q4 2023.pdf",
        type: "Data",
        size: "3.2 MB",
        uploadedAt: "2024-01-18",
      },
    ],
    auditor: null,
    mrvChecklist: [
      { item: "Baseline emissions calculated", status: "verified" },
      { item: "Project boundary defined", status: "verified" },
      { item: "Additionality demonstrated", status: "pending" },
      { item: "Leakage assessment complete", status: "pending" },
      { item: "Monitoring plan established", status: "verified" },
      { item: "Data quality procedures in place", status: "pending" },
    ],
    auditTrail: [
      {
        date: "2024-01-18 11:00",
        action: "Project Submitted",
        user: "EcoFarm Solutions",
        details: "Initial submission",
      },
      {
        date: "2024-01-19 09:30",
        action: "Under Review",
        user: "Admin",
        details: "Project queued for auditor assignment",
      },
    ],
    blockchain: null,
  },
};

const AdminProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const project = PROJECT_DETAILS[projectId || ""] || PROJECT_DETAILS["PRJ-001"];

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