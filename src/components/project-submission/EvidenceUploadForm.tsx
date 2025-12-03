import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Upload, FileText, Image as ImageIcon, X, HelpCircle } from "lucide-react";
import { ProjectFormData } from "@/pages/ProjectSubmission";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: ProjectFormData;
  updateData: (data: Partial<ProjectFormData>) => void;
}

export default function EvidenceUploadForm({ data, updateData }: Props) {
  const { toast } = useToast();
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file type
      if (!file.type.includes('pdf') && !file.type.includes('jpeg') && !file.type.includes('jpg')) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} must be PDF or JPG format.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Check file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds 10MB limit.`,
          variant: "destructive"
        });
        continue;
      }
      
      validFiles.push(file);
    }
    
    if (validFiles.length > 0) {
      updateData({ documents: [...data.documents, ...validFiles] });
      toast({
        title: "Files Added",
        description: `${validFiles.length} file(s) uploaded successfully.`
      });
    }
  };
  
  const handleDelete = (index: number) => {
    const newDocuments = data.documents.filter((_, i) => i !== index);
    updateData({ documents: newDocuments });
    toast({
      title: "File Removed",
      description: "Document has been removed from upload list."
    });
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Evidence Upload
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">
                  <strong>MRV (Monitoring, Reporting, Verification)</strong> logs are systematic records 
                  that track project activities, measure emissions reductions, and provide evidence for verification.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Upload supporting documents for project verification
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="text-foreground mb-2 block">
            Required Documents <span className="text-destructive">*</span>
          </Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm font-medium text-foreground mb-2">
              Upload project documents
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              PDF or JPG files, up to 10MB each
            </p>
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Choose Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Include: invoices, installation photos, equipment certificates, MRV logs
          </p>
        </div>
        
        {data.documents.length > 0 && (
          <div>
            <Label className="text-foreground mb-3 block">
              Uploaded Documents ({data.documents.length})
            </Label>
            <div className="space-y-2">
              {data.documents.map((file, index) => (
                <Card key={index} variant="flat" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {file.type.includes('pdf') ? (
                        <FileText className="w-5 h-5 text-destructive" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-primary" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
