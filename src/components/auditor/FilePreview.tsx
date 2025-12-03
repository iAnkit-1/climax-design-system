import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image as ImageIcon, Download, ExternalLink } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

interface Props {
  documents: Document[];
}

export default function FilePreview({ documents }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(documents[0] || null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImage = (type: string) => type.includes('image');
  const isPDF = (type: string) => type.includes('pdf');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Document List */}
      <div className="lg:col-span-1 space-y-3">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Uploaded Documents ({documents.length})
        </h3>
        {documents.map((doc) => (
          <Card
            key={doc.id}
            variant="flat"
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedDoc?.id === doc.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedDoc(doc)}
          >
            <div className="flex items-start gap-3">
              {isPDF(doc.type) ? (
                <FileText className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              ) : (
                <ImageIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {doc.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatFileSize(doc.size)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Pane */}
      <div className="lg:col-span-2">
        {selectedDoc ? (
          <Card variant="flat" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedDoc.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatFileSize(selectedDoc.size)} • {selectedDoc.type}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
                </Button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="border border-border rounded-lg bg-muted/30 overflow-hidden">
              {isImage(selectedDoc.type) ? (
                <div className="aspect-video flex items-center justify-center p-8">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Image preview: {selectedDoc.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Click "Open" to view full image
                    </p>
                  </div>
                </div>
              ) : isPDF(selectedDoc.type) ? (
                <div className="aspect-video flex items-center justify-center p-8">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      PDF document: {selectedDoc.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Click "Download" or "Open" to view PDF contents
                    </p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center p-8">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Preview not available for this file type
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card variant="flat" className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Select a document to preview
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
