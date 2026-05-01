// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CheckCircle2, XCircle, MessageSquare, FileText, Calculator, Upload } from "lucide-react";
// import { Project } from "@/pages/AuditorDashboard";
// import FilePreview from "./FilePreview";
// import CommentThread from "./CommentThread";
// import MRVChecklist from "./MRVChecklist";
// import SignatureModal from "./SignatureModal";
// import AuditReport from "./AuditReport";
// import RequestChangesModal from "./RequestChangesModal";
// import { useToast } from "@/hooks/use-toast";

// interface Props {
//   project: Project;
//   onStatusChange?: (projectId: string, newStatus: string) => void;
// }

// export default function ReviewPane({ project, onStatusChange }: Props) {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showSignatureModal, setShowSignatureModal] = useState(false);
//   const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
//   const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

//   const handleAction = (action: "approve" | "reject") => {
//     setActionType(action);
//     setShowSignatureModal(true);
//   };

//   const handleRequestChanges = (changes: any) => {
//     toast({
//       title: "Changes Requested",
//       description: `Request sent to ${project.submittedBy}. They have ${changes.deadline} days to respond.`,
//     });
//     onStatusChange?.(project.id, "flagged", changes.description);
//   };

//   return (
//     <div className="h-[calc(100vh-73px)] flex flex-col">
//       {/* Project Header */}
//       <div className="border-b border-border bg-card">
//         <div className="container max-w-6xl mx-auto px-6 py-6">
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <h2 className="text-2xl font-bold text-foreground">
//                   {project.title}
//                 </h2>
//                 <Badge variant="outline" className="text-xs">
//                   {project.projectType}
//                 </Badge>
//               </div>
//               <p className="text-sm text-muted-foreground">
//                 {project.id} • Submitted by {project.submittedBy} on{" "}
//                 {new Date(project.submittedDate).toLocaleDateString()}
//               </p>
//             </div>
            
//             {/* Action Buttons */}
//             {['pending', 'in-review', 'flagged'].includes(project.status) && (
//               <div className="flex flex-wrap gap-2">
//                 <Button
//                   variant="outline"
//                   className="text-amber-600 border-amber-600 hover:bg-amber-50"
//                   onClick={() => setShowRequestChangesModal(true)}
//                 >
//                   <MessageSquare className="w-4 h-4 mr-2" />
//                   Request Changes
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="text-red-600 border-red-600 hover:bg-red-50"
//                   onClick={() => handleAction("reject")}
//                 >
//                   <XCircle className="w-4 h-4 mr-2" />
//                   Reject
//                 </Button>
//                 <Button
//                   className="bg-green-600 hover:bg-green-700"
//                   onClick={() => handleAction("approve")}
//                 >
//                   <CheckCircle2 className="w-4 h-4 mr-2" />
//                   Approve
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex-1 overflow-auto">
//         <div className="container max-w-6xl mx-auto px-6 py-6">
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="mb-6">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="documents">Documents</TabsTrigger>
//               <TabsTrigger value="baseline">Baseline Data</TabsTrigger>
//               <TabsTrigger value="mrv">MRV Checklist</TabsTrigger>
//               <TabsTrigger value="comments">Comments</TabsTrigger>
//               <TabsTrigger value="audit">Audit Report</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="space-y-6">
//               {/* Project Summary */}
//               <Card variant="flat" className="p-6">
//                 <h3 className="text-lg font-semibold text-foreground mb-4">
//                   Project Summary
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Location</p>
//                     <p className="text-sm font-medium text-foreground">{project.location}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Project Type</p>
//                     <p className="text-sm font-medium text-foreground">{project.projectType}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Estimated Credits</p>
//                     <p className="text-sm font-medium text-foreground">
//                       {project.estimatedCredits} tonnes CO₂e/year
//                     </p>
//                   </div>
//                 </div>
//               </Card>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <Card variant="flat" className="p-4">
//                   <div className="flex items-center gap-3">
//                     <FileText className="w-5 h-5 text-primary" />
//                     <div>
//                       <p className="text-sm text-muted-foreground">Documents</p>
//                       <p className="text-xl font-bold text-foreground">
//                         {project.documents.length}
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//                 <Card variant="flat" className="p-4">
//                   <div className="flex items-center gap-3">
//                     <MessageSquare className="w-5 h-5 text-accent" />
//                     <div>
//                       <p className="text-sm text-muted-foreground">Comments</p>
//                       <p className="text-xl font-bold text-foreground">
//                         {project.comments.length}
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//                 <Card variant="flat" className="p-4">
//                   <div className="flex items-center gap-3">
//                     <Calculator className="w-5 h-5 text-blue-500" />
//                     <div>
//                       <p className="text-sm text-muted-foreground">Status</p>
//                       <p className="text-xl font-bold text-foreground capitalize">
//                         {project.status.replace("-", " ")}
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="documents">
//               <FilePreview documents={project.documents} />
//             </TabsContent>

//             <TabsContent value="baseline">
//               <Card variant="flat" className="p-6">
//                 <h3 className="text-lg font-semibold text-foreground mb-4">
//                   Baseline Emissions Data
//                 </h3>
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <p className="text-sm font-medium text-foreground mb-2">
//                         Annual Energy Use
//                       </p>
//                       <p className="text-2xl font-bold text-primary">
//                         {parseFloat(project.baseline.energyUse).toLocaleString()} kWh
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-foreground mb-2">
//                         Fuel Type
//                       </p>
//                       <p className="text-2xl font-bold text-primary">
//                         {project.baseline.fuelType}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-foreground mb-2">
//                         Emission Factor
//                       </p>
//                       <p className="text-2xl font-bold text-primary">
//                         {project.baseline.emissionFactor} kg CO₂/kWh
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-foreground mb-2">
//                         Total Emissions Reduced
//                       </p>
//                       <p className="text-2xl font-bold text-accent">
//                         {project.estimatedCredits} tonnes/year
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="pt-6 border-t border-border">
//                     <p className="text-sm font-medium text-foreground mb-2">
//                       Additionality Proof
//                     </p>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {project.baseline.additionalityProof}
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             </TabsContent>

//             <TabsContent value="mrv">
//               <MRVChecklist projectId={project.id} />
//             </TabsContent>

//             <TabsContent value="comments">
//               <CommentThread comments={project.comments} projectId={project.id} />
//             </TabsContent>

//             <TabsContent value="audit">
//               <AuditReport projectId={project.id} />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       {/* Signature Modal */}
//       {showSignatureModal && actionType && (
//         <SignatureModal
//           isOpen={showSignatureModal}
//           onClose={() => {
//             setShowSignatureModal(false);
//             setActionType(null);
//           }}
//           onSubmit={() => {
//             onStatusChange?.(project.id, actionType === "approve" ? "verified" : "rejected");
//           }}
//           projectId={project.id}
//           projectTitle={project.title}
//           actionType={actionType}
//         />
//       )}

//       {/* Request Changes Modal */}
//       <RequestChangesModal
//         isOpen={showRequestChangesModal}
//         onClose={() => setShowRequestChangesModal(false)}
//         projectId={project.id}
//         projectTitle={project.title}
//         onSubmit={handleRequestChanges}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, XCircle, MessageSquare, FileText, Calculator, 
  MapPin, Fuel, Zap, Leaf, DollarSign, Calendar, UserCheck, 
  TrendingUp, Award, ClipboardList, Wifi, WifiOff, Image, Info
} from "lucide-react";
import FilePreview from "./FilePreview";
import CommentThread from "./CommentThread";
import MRVChecklist from "./MRVChecklist";
import SignatureModal from "./SignatureModal";
import AuditReport from "./AuditReport";
import RequestChangesModal from "./RequestChangesModal";
import { useToast } from "@/hooks/use-toast";

interface Props {
  project: any; // Using any for simplicity, but you can use the Project interface from AuditorDashboard
  onStatusChange?: (projectId: string, newStatus: string, feedback?: string) => void;
}

export default function ReviewPane({ project, onStatusChange }: Props) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  const handleAction = (action: "approve" | "reject") => {
    setActionType(action);
    setShowSignatureModal(true);
  };

  const handleRequestChanges = (changes: any) => {
    toast({
      title: "Changes Requested",
      description: `Request sent to ${project.submittedBy}. They have ${changes.deadline} days to respond.`,
    });
    onStatusChange?.(project.id, "flagged", changes.description);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "flagged":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "retired":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getProjectTypeDisplay = (type: string) => {
    return type.replace(/-/g, " ").replace(/_/g, " ");
  };

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col">
      {/* Project Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-2xl font-bold text-foreground">
                  {project.title}
                </h2>
                <Badge variant="outline" className="text-xs capitalize">
                  {getProjectTypeDisplay(project.projectType)}
                </Badge>
                <Badge className={`text-xs capitalize ${getStatusColor(project.status)}`}>
                  {project.status || "pending"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                ID: {project.id} • Submitted by {project.submittedBy} 
                {project.submittedByEmail && ` (${project.submittedByEmail})`} on{" "}
                {new Date(project.submittedDate).toLocaleDateString()}
              </p>
            </div>
            
            {/* Action Buttons */}
            {['pending', 'flagged'].includes(project.status) && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="text-amber-600 border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                  onClick={() => setShowRequestChangesModal(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request Changes
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={() => handleAction("reject")}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction("approve")}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Verify & Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-6xl mx-auto px-6 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap h-auto gap-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="baseline">Baseline Data</TabsTrigger>
              <TabsTrigger value="additional">Additional Info</TabsTrigger>
              <TabsTrigger value="mrv">MRV Checklist</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="audit">Audit Report</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Project Summary */}
              <Card variant="flat" className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Project Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="text-sm font-medium text-foreground">
                        {project.location || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Project Type</p>
                      <p className="text-sm font-medium text-foreground capitalize">
                        {getProjectTypeDisplay(project.projectType)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Credits</p>
                      <p className="text-sm font-medium text-foreground">
                        {project.estimatedCredits?.toLocaleString() || 0} tonnes CO₂e
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price per Credit</p>
                      <p className="text-sm font-medium text-foreground">
                        ${project.pricePerCredit?.toLocaleString() || 0} USD
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Vintage</p>
                      <p className="text-sm font-medium text-foreground">
                        {project.vintage || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    {project.iotConnected ? (
                      <Wifi className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-gray-400 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">IoT Monitoring</p>
                      <p className="text-sm font-medium text-foreground">
                        {project.iotConnected ? `Connected (${project.iotDeviceId})` : "Not connected"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="flat" className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Documents</p>
                      <p className="text-xl font-bold text-foreground">
                        {project.documents?.length || 0}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="flat" className="p-4">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="text-xl font-bold text-foreground">
                        ${((project.estimatedCredits || 0) * (project.pricePerCredit || 0)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="flat" className="p-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Verifier</p>
                      <p className="text-xl font-bold text-foreground truncate">
                        {project.verifier || "Not assigned"}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="flat" className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Methodology</p>
                      <p className="text-sm font-bold text-foreground truncate">
                        {project.methodology || "Not specified"}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Description */}
              {project.description && (
                <Card variant="flat" className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Project Description
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </Card>
              )}

              {/* Seller Info */}
              <Card variant="flat" className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Seller Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    <p className="text-sm font-medium text-foreground">
                      {project.submittedBy}
                    </p>
                  </div>
                  {project.submittedByEmail && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-sm font-medium text-foreground">
                        {project.submittedByEmail}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Location Details */}
              {project.locationDetails && (
                <Card variant="flat" className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Detailed Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.locationDetails.address && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                        <p className="text-sm font-medium text-foreground">
                          {project.locationDetails.address}
                        </p>
                      </div>
                    )}
                    {project.locationDetails.district && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">District</p>
                        <p className="text-sm font-medium text-foreground">
                          {project.locationDetails.district}
                        </p>
                      </div>
                    )}
                    {project.locationDetails.state && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">State</p>
                        <p className="text-sm font-medium text-foreground">
                          {project.locationDetails.state}
                        </p>
                      </div>
                    )}
                    {project.locationDetails.pincode && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Pincode</p>
                        <p className="text-sm font-medium text-foreground">
                          {project.locationDetails.pincode}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="documents">
              <FilePreview documents={project.documents || []} />
            </TabsContent>

            <TabsContent value="baseline">
              <Card variant="flat" className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Baseline Emissions Data
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Annual Energy Use
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {parseFloat(project.baseline?.energyUse || "0").toLocaleString()} kWh
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Fuel Type
                      </p>
                      <p className="text-2xl font-bold text-primary capitalize">
                        {project.baseline?.fuelType || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Emission Factor
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {project.baseline?.emissionFactor || "N/A"} kg CO₂/kWh
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Total Emissions Reduced
                      </p>
                      <p className="text-2xl font-bold text-accent">
                        {project.estimatedCredits?.toLocaleString() || 0} tonnes/year
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Additionality Proof
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {project.baseline?.additionalityProof || "Not provided"}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="additional">
              <Card variant="flat" className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Additional Project Information
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.methodology && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Methodology
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.methodology}
                        </p>
                      </div>
                    )}
                    {project.projectStart && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Project Start Date
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(project.projectStart).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {project.certificationDate && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Certification Date
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(project.certificationDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {project.monitoringPeriod && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Monitoring Period
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.monitoringPeriod}
                        </p>
                      </div>
                    )}
                    {project.verifier && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Verifier
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.verifier}
                        </p>
                      </div>
                    )}
                    {project.auditorFeedback && (
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-foreground mb-2">
                          Auditor Feedback
                        </p>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                          {project.auditorFeedback}
                        </p>
                      </div>
                    )}
                  </div>

                  {project.additionalBenefits && project.additionalBenefits.length > 0 && (
                    <div className="pt-6 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-3">
                        Additional Benefits
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.additionalBenefits.map((benefit: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.imageUrl && (
                    <div className="pt-6 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-3">
                        Project Image
                      </p>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="max-w-full h-auto rounded-lg border border-border"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="mrv">
              <MRVChecklist projectId={project.id} />
            </TabsContent>

            <TabsContent value="comments">
              <CommentThread comments={project.comments || []} projectId={project.id} />
            </TabsContent>

            <TabsContent value="audit">
              <AuditReport projectId={project.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && actionType && (
        <SignatureModal
          isOpen={showSignatureModal}
          onClose={() => {
            setShowSignatureModal(false);
            setActionType(null);
          }}
          onSubmit={() => {
            onStatusChange?.(project.id, actionType === "approve" ? "verified" : "rejected");
          }}
          projectId={project.id}
          projectTitle={project.title}
          actionType={actionType}
        />
      )}

      {/* Request Changes Modal */}
      <RequestChangesModal
        isOpen={showRequestChangesModal}
        onClose={() => setShowRequestChangesModal(false)}
        projectId={project.id}
        projectTitle={project.title}
        onSubmit={handleRequestChanges}
      />
    </div>
  );
}