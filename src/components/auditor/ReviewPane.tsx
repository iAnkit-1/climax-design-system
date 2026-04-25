import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, MessageSquare, FileText, Calculator, Upload } from "lucide-react";
import { Project } from "@/pages/AuditorDashboard";
import FilePreview from "./FilePreview";
import CommentThread from "./CommentThread";
import MRVChecklist from "./MRVChecklist";
import SignatureModal from "./SignatureModal";
import AuditReport from "./AuditReport";
import RequestChangesModal from "./RequestChangesModal";
import { useToast } from "@/hooks/use-toast";

interface Props {
  project: Project;
  onStatusChange?: (projectId: string, newStatus: string) => void;
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

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col">
      {/* Project Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {project.title}
                </h2>
                <Badge variant="outline" className="text-xs">
                  {project.projectType}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.id} • Submitted by {project.submittedBy} on{" "}
                {new Date(project.submittedDate).toLocaleDateString()}
              </p>
            </div>
            
            {/* Action Buttons */}
            {['pending', 'in-review', 'flagged'].includes(project.status) && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="text-amber-600 border-amber-600 hover:bg-amber-50"
                  onClick={() => setShowRequestChangesModal(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request Changes
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
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
                  Approve
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
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="baseline">Baseline Data</TabsTrigger>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-sm font-medium text-foreground">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project Type</p>
                    <p className="text-sm font-medium text-foreground">{project.projectType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Credits</p>
                    <p className="text-sm font-medium text-foreground">
                      {project.estimatedCredits} tonnes CO₂e/year
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="flat" className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Documents</p>
                      <p className="text-xl font-bold text-foreground">
                        {project.documents.length}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="flat" className="p-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Comments</p>
                      <p className="text-xl font-bold text-foreground">
                        {project.comments.length}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="flat" className="p-4">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-xl font-bold text-foreground capitalize">
                        {project.status.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <FilePreview documents={project.documents} />
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
                        {parseFloat(project.baseline.energyUse).toLocaleString()} kWh
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Fuel Type
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {project.baseline.fuelType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Emission Factor
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {project.baseline.emissionFactor} kg CO₂/kWh
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Total Emissions Reduced
                      </p>
                      <p className="text-2xl font-bold text-accent">
                        {project.estimatedCredits} tonnes/year
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Additionality Proof
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.baseline.additionalityProof}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="mrv">
              <MRVChecklist projectId={project.id} />
            </TabsContent>

            <TabsContent value="comments">
              <CommentThread comments={project.comments} projectId={project.id} />
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
