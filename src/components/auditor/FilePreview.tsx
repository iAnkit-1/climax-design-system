// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { FileText, Image as ImageIcon, Download, ExternalLink } from "lucide-react";

// interface Document {
//   id: string;
//   name: string;
//   type: string;
//   url: string;
//   size: number;
// }

// interface Props {
//   documents: Document[];
// }

// export default function FilePreview({ documents }: Props) {
//   const [selectedDoc, setSelectedDoc] = useState<Document | null>(documents[0] || null);

//   const formatFileSize = (bytes: number): string => {
//     if (bytes < 1024) return bytes + ' B';
//     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
//     return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
//   };

//   const isImage = (type: string) => type.includes('image');
//   const isPDF = (type: string) => type.includes('pdf');

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Document List */}
//       <div className="lg:col-span-1 space-y-3">
//         <h3 className="text-sm font-semibold text-foreground mb-3">
//           Uploaded Documents ({documents.length})
//         </h3>
//         {documents.map((doc) => (
//           <Card
//             key={doc.id}
//             variant="flat"
//             className={`p-4 cursor-pointer transition-all hover:shadow-md ${
//               selectedDoc?.id === doc.id ? "ring-2 ring-primary" : ""
//             }`}
//             onClick={() => setSelectedDoc(doc)}
//           >
//             <div className="flex items-start gap-3">
//               {isPDF(doc.type) ? (
//                 <FileText className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
//               ) : (
//                 <ImageIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
//               )}
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-foreground truncate">
//                   {doc.name}
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   {formatFileSize(doc.size)}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Preview Pane */}
//       <div className="lg:col-span-2">
//         {selectedDoc ? (
//           <Card variant="flat" className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-foreground">
//                   {selectedDoc.name}
//                 </h3>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {formatFileSize(selectedDoc.size)} • {selectedDoc.type}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm">
//                   <Download className="w-4 h-4 mr-2" />
//                   Download
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <ExternalLink className="w-4 h-4 mr-2" />
//                   Open
//                 </Button>
//               </div>
//             </div>

//             {/* Preview Area */}
//             <div className="border border-border rounded-lg bg-muted/30 overflow-hidden">
//               {isImage(selectedDoc.type) ? (
//                 <div className="aspect-video flex items-center justify-center p-8">
//                   <div className="text-center">
//                     <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                     <p className="text-sm text-muted-foreground">
//                       Image preview: {selectedDoc.name}
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-2">
//                       Click "Open" to view full image
//                     </p>
//                   </div>
//                 </div>
//               ) : isPDF(selectedDoc.type) ? (
//                 <div className="aspect-video flex items-center justify-center p-8">
//                   <div className="text-center">
//                     <FileText className="w-16 h-16 text-destructive mx-auto mb-4" />
//                     <p className="text-sm text-muted-foreground">
//                       PDF document: {selectedDoc.name}
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-2">
//                       Click "Download" or "Open" to view PDF contents
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="aspect-video flex items-center justify-center p-8">
//                   <div className="text-center">
//                     <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                     <p className="text-sm text-muted-foreground">
//                       Preview not available for this file type
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </Card>
//         ) : (
//           <Card variant="flat" className="p-12 text-center">
//             <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//             <p className="text-sm text-muted-foreground">
//               Select a document to preview
//             </p>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye, 
  File, 
  FileImage, 
  FileArchive,
  ExternalLink
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id?: string;
  name: string;
  type: string;
  url: string;
}

interface Props {
  documents: Document[];
}

export default function FilePreview({ documents }: Props) {
  const { toast } = useToast();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return <FileText className="w-8 h-8 text-red-500" />;
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return <FileImage className="w-8 h-8 text-blue-500" />;
    if (['zip', 'rar', '7z'].includes(extension || '')) return <FileArchive className="w-8 h-8 text-yellow-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const getFullUrl = (url: string) => {
    // If URL already starts with http, return as is
    if (url.startsWith('http')) {
      return url;
    }
    
    // Get the base URL from environment or window location
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // Ensure the URL has a leading slash
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    
    return `${baseURL}${normalizedUrl}`;
  };

  const handleView = (doc: Document) => {
    try {
      const fullUrl = getFullUrl(doc.url);
      const fileExtension = doc.name.split('.').pop()?.toLowerCase();
      
      console.log('Opening file:', fullUrl);
      
      // For PDFs and images, open in new tab
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'].includes(fileExtension || '')) {
        window.open(fullUrl, '_blank');
      } else {
        // For other files, download instead
        handleDownload(doc);
      }
      
      toast({
        title: "Opening File",
        description: `${doc.name} is opening in a new tab.`,
      });
    } catch (err) {
      console.error('View error:', err);
      toast({
        title: "View Failed",
        description: "Could not open the file. Try downloading it instead.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (doc: Document) => {
    try {
      const fullUrl = getFullUrl(doc.url);
      
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `${doc.name} is being downloaded.`,
      });
    } catch (err) {
      console.error('Download error:', err);
      toast({
        title: "Download Failed",
        description: "Could not download the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!documents || documents.length === 0) {
    return (
      <Card variant="flat" className="p-12 text-center">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Documents</h3>
        <p className="text-sm text-muted-foreground">
          No documents have been uploaded for this project yet.
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <Card key={doc.id || index} variant="flat" className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getFileIcon(doc.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate mb-1" title={doc.name}>
                    {doc.name}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {doc.type?.split('/')[1]?.toUpperCase() || 'FILE'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(doc)}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(doc)}
                      className="flex-1"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Optional: Simple Preview Modal for Images (if you still want inline preview) */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="truncate">{selectedDoc?.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedDoc) {
                      window.open(getFullUrl(selectedDoc.url), '_blank');
                    }
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open in New Tab
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedDoc && handleDownload(selectedDoc)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto min-h-0">
            {selectedDoc && (
              selectedDoc.name.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={getFullUrl(selectedDoc.url)}
                  className="w-full h-[70vh]"
                  title={selectedDoc.name}
                />
              ) : ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => selectedDoc.name.toLowerCase().endsWith(ext)) ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <img
                    src={getFullUrl(selectedDoc.url)}
                    alt={selectedDoc.name}
                    className="max-w-full max-h-[60vh] object-contain"
                    onError={(e) => {
                      console.error('Image load error:', e);
                      toast({
                        title: "Load Failed",
                        description: "Could not load the image. Try opening in new tab.",
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-4">
                    Preview not available for this file type.
                  </p>
                  <Button onClick={() => selectedDoc && handleDownload(selectedDoc)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download File
                  </Button>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}