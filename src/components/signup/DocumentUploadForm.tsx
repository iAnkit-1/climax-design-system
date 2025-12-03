import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface DocumentUploadFormProps {
  role: string;
  formData: {
    idProof?: File;
    gstDocument?: File;
    registrationDocument?: File;
    accreditationId?: string;
    certificationDocument?: File;
    yearsOfExperience?: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: File | string | undefined) => void;
}

const FileUploadBox = ({
  label,
  description,
  file,
  error,
  onFileSelect,
  onFileRemove,
  required = false,
}: {
  label: string;
  description: string;
  file?: File;
  error?: string;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  required?: boolean;
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Validate file type
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or JPG file");
      return;
    }

    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}
      </Label>
      <p className="text-sm text-muted-foreground">{description}</p>

      {!file ? (
        <div
          className={`relative border-2 border-dashed rounded-[var(--radius)] p-8 text-center transition-climax cursor-pointer ${
            dragActive
              ? "border-primary bg-primary/5"
              : error
              ? "border-destructive bg-destructive/5"
              : "border-border hover:border-primary hover:bg-muted/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        >
          <input
            id={`file-${label}`}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
          />
          <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-foreground font-medium mb-1">
            Drop file here or click to upload
          </p>
          <p className="text-xs text-muted-foreground">PDF or JPG (max 10MB)</p>
        </div>
      ) : (
        <Card variant="flat" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-success/10 flex items-center justify-center">
                <File className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                onFileRemove();
              }}
              className="p-2 hover:bg-destructive/10 rounded-[var(--radius-sm)] transition-climax"
            >
              <X className="w-4 h-4 text-destructive" />
            </button>
          </div>
        </Card>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export const DocumentUploadForm = ({ role, formData, errors, onChange }: DocumentUploadFormProps) => {
  const needsOrganizationDocs = role === "seller";
  const isAuditor = role === "auditor";

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Document Upload & KYC</h2>
        <p className="text-muted-foreground">Upload required documents for verification</p>
      </div>

      <div className="space-y-6">
        {/* ID Proof - Required for all */}
        <FileUploadBox
          label="Identity Proof"
          description="Upload your Aadhaar, PAN, Passport, or Driver's License"
          file={formData.idProof}
          error={errors.idProof}
          onFileSelect={(file) => onChange("idProof", file)}
          onFileRemove={() => onChange("idProof", undefined)}
          required
        />

        {/* Organization Documents - For Sellers */}
        {needsOrganizationDocs && (
          <>
            <FileUploadBox
              label="GST Certificate"
              description="Upload your GST registration certificate"
              file={formData.gstDocument}
              error={errors.gstDocument}
              onFileSelect={(file) => onChange("gstDocument", file)}
              onFileRemove={() => onChange("gstDocument", undefined)}
              required
            />

            <FileUploadBox
              label="Business Registration"
              description="Upload Certificate of Incorporation or Partnership Deed"
              file={formData.registrationDocument}
              error={errors.registrationDocument}
              onFileSelect={(file) => onChange("registrationDocument", file)}
              onFileRemove={() => onChange("registrationDocument", undefined)}
              required
            />
          </>
        )}

        {/* Auditor-specific fields */}
        {isAuditor && (
          <>
            <div className="space-y-2">
              <Label htmlFor="accreditationId">Accreditation ID *</Label>
              <Input
                id="accreditationId"
                placeholder="e.g., ISO-14065-12345"
                value={formData.accreditationId || ""}
                onChange={(e) => onChange("accreditationId", e.target.value)}
                error={errors.accreditationId}
              />
            </div>

            <FileUploadBox
              label="Certification Document"
              description="Upload your ISO 14065 or equivalent certification"
              file={formData.certificationDocument}
              error={errors.certificationDocument}
              onFileSelect={(file) => onChange("certificationDocument", file)}
              onFileRemove={() => onChange("certificationDocument", undefined)}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                placeholder="e.g., 5"
                min="0"
                value={formData.yearsOfExperience || ""}
                onChange={(e) => onChange("yearsOfExperience", e.target.value)}
                error={errors.yearsOfExperience}
              />
            </div>
          </>
        )}

        {/* Info Card */}
        <Card variant="flat" className="p-4 bg-info/5 border-info/20">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Secure Document Handling</p>
              <p className="text-xs text-muted-foreground">
                All documents are encrypted and stored securely. They will only be used for
                verification purposes and in compliance with data protection regulations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
