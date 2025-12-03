import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  projectId: string;
}

export default function AuditReport({ projectId }: Props) {
  const [notes, setNotes] = useState("");
  const [uploadedReport, setUploadedReport] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File must be less than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedReport(file);
    toast({
      title: "Report Uploaded",
      description: "Audit report has been uploaded successfully."
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your audit notes have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      {/* Auditor Notes */}
      <Card variant="flat" className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Auditor Notes
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="notes" className="text-foreground">
              Internal Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record your observations, findings, and recommendations..."
              rows={8}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              These notes are for internal record and audit trail purposes
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveNotes}>
              Save Notes
            </Button>
          </div>
        </div>
      </Card>

      {/* Upload Audit Report */}
      <Card variant="flat" className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Final Audit Report
        </h3>
        
        {uploadedReport ? (
          <div className="space-y-4">
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {uploadedReport.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(uploadedReport.size / (1024 * 1024)).toFixed(2)} MB • Uploaded just now
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => document.getElementById('report-upload')?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Replace Report
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm font-medium text-foreground mb-2">
              Upload Final Audit Report
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              PDF format, up to 10MB
            </p>
            <input
              type="file"
              id="report-upload"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button onClick={() => document.getElementById('report-upload')?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}
      </Card>

      {/* Audit Metadata */}
      <Card variant="flat" className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Audit Metadata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-foreground">Project ID</Label>
            <Input value={projectId} disabled className="mt-1.5" />
          </div>
          <div>
            <Label className="text-foreground">Auditor</Label>
            <Input value="Rajesh Kumar (ACVA-001)" disabled className="mt-1.5" />
          </div>
          <div>
            <Label className="text-foreground">Audit Start Date</Label>
            <Input value={new Date().toLocaleDateString()} disabled className="mt-1.5" />
          </div>
          <div>
            <Label className="text-foreground">Last Updated</Label>
            <Input value={new Date().toLocaleString()} disabled className="mt-1.5" />
          </div>
        </div>
      </Card>
    </div>
  );
}
