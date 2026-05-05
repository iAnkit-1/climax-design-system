// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { 
//   Search, 
//   Download, 
//   CheckCircle, 
//   Flag, 
//   FileText,
//   Link2,
//   ArrowLeft
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/api";

// interface Project {
//   id: string;
//   title: string;
//   seller: string;
//   type: string;
//   status: "pending" | "verified" | "rejected" | "flagged";
//   credits: number;
//   submittedDate: string;
// }

// const AdminProjects = () => {
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
//   const [auditTrailOpen, setAuditTrailOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [icmLinkOpen, setIcmLinkOpen] = useState(false);

//   const { data: projects = [], isLoading } = useQuery({
//     queryKey: ['adminProjects'],
//     queryFn: async () => {
//       const response = await api.get('/projects');
//       return response.data.map((proj: any) => ({
//         id: proj._id,
//         title: proj.title,
//         seller: proj.seller?.name || "Unknown Seller",
//         type: proj.projectType || "Unknown",
//         status: proj.status || "pending",
//         credits: proj.credits || 0,
//         submittedDate: proj.createdAt || new Date().toISOString()
//       })) as Project[];
//     }
//   });

//   const filteredProjects = projects.filter(project =>
//     project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     project.seller.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSelectAll = () => {
//     if (selectedProjects.length === filteredProjects.length) {
//       setSelectedProjects([]);
//     } else {
//       setSelectedProjects(filteredProjects.map(p => p.id));
//     }
//   };

//   const handleSelectProject = (id: string) => {
//     setSelectedProjects(prev =>
//       prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
//     );
//   };

//   const handleBulkApprove = () => {
//     toast({
//       title: "Projects Approved",
//       description: `${selectedProjects.length} project(s) have been approved and verified.`,
//     });
//     setSelectedProjects([]);
//   };

//   const handleBulkFlag = () => {
//     toast({
//       title: "Projects Flagged",
//       description: `${selectedProjects.length} project(s) have been flagged for review.`,
//       variant: "destructive",
//     });
//     setSelectedProjects([]);
//   };

//   const handleExportAuditPackage = () => {
//     toast({
//       title: "Export Started",
//       description: "Preparing audit package ZIP file for download...",
//     });
//   };

//   const handleLinkToICM = (project: Project) => {
//     setSelectedProject(project);
//     setIcmLinkOpen(true);
//   };

//   const confirmICMLink = () => {
//     toast({
//       title: "ICM Registry Linked",
//       description: `Project ${selectedProject?.id} has been linked to Indian Carbon Market registry.`,
//     });
//     setIcmLinkOpen(false);
//   };

//   const viewAuditTrail = (project: Project) => {
//     setSelectedProject(project);
//     setAuditTrailOpen(true);
//   };

//   const getStatusBadge = (status: string) => {
//     const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
//       verified: "default",
//       pending: "secondary",
//       rejected: "destructive",
//       flagged: "destructive"
//     };
//     return (
//       <Badge variant={variants[status] || "outline"}>
//         {status}
//       </Badge>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Button variant="ghost" asChild className="mb-6">
//           <Link to="/admin">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Admin Dashboard
//           </Link>
//         </Button>

//         <Card>
//           <CardHeader>
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <CardTitle>Projects Management</CardTitle>
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={handleExportAuditPackage}
//                   disabled={selectedProjects.length === 0}
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Export Package
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* Search and Bulk Actions */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search projects by ID, title, or seller..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
              
//               {selectedProjects.length > 0 && (
//                 <div className="flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="primary"
//                     onClick={handleBulkApprove}
//                   >
//                     <CheckCircle className="w-4 h-4 mr-2" />
//                     Approve ({selectedProjects.length})
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={handleBulkFlag}
//                   >
//                     <Flag className="w-4 h-4 mr-2" />
//                     Flag ({selectedProjects.length})
//                   </Button>
//                 </div>
//               )}
//             </div>

//             {/* Projects Table */}
//             <div className="rounded-md border overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-12">
//                       <Checkbox
//                         checked={selectedProjects.length === filteredProjects.length}
//                         onCheckedChange={handleSelectAll}
//                         aria-label="Select all projects"
//                       />
//                     </TableHead>
//                     <TableHead>Project ID</TableHead>
//                     <TableHead>Title</TableHead>
//                     <TableHead>Seller</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="text-right">Credits</TableHead>
//                     <TableHead>Submitted</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredProjects.map((project) => (
//                     <TableRow key={project.id}>
//                       <TableCell>
//                         <Checkbox
//                           checked={selectedProjects.includes(project.id)}
//                           onCheckedChange={() => handleSelectProject(project.id)}
//                           aria-label={`Select ${project.id}`}
//                         />
//                       </TableCell>
//                       <TableCell className="font-medium">{project.id}</TableCell>
//                       <TableCell className="max-w-xs truncate">
//                         <Link 
//                           to={`/admin/projects/${project.id}`}
//                           className="hover:text-primary hover:underline"
//                         >
//                           {project.title}
//                         </Link>
//                       </TableCell>
//                       <TableCell>{project.seller}</TableCell>
//                       <TableCell>{project.type}</TableCell>
//                       <TableCell>{getStatusBadge(project.status)}</TableCell>
//                       <TableCell className="text-right">{project.credits.toLocaleString()}</TableCell>
//                       <TableCell>{new Date(project.submittedDate).toLocaleDateString()}</TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => viewAuditTrail(project)}
//                           >
//                             <FileText className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleLinkToICM(project)}
//                             disabled={project.status !== "verified"}
//                           >
//                             <Link2 className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Audit Trail Modal */}
//       <Dialog open={auditTrailOpen} onOpenChange={setAuditTrailOpen}>
//         <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Audit Trail - {selectedProject?.id}</DialogTitle>
//             <DialogDescription>
//               Complete history of actions and verification steps
//             </DialogDescription>
//           </DialogHeader>
          
//           <div className="space-y-4 mt-4">
//             {[
//               {
//                 date: "2024-01-20 14:30",
//                 action: "Project Submitted",
//                 user: selectedProject?.seller,
//                 details: "Initial project submission with all required documents"
//               },
//               {
//                 date: "2024-01-21 10:15",
//                 action: "Assigned to Auditor",
//                 user: "System",
//                 details: "Automatically assigned to ACVA India for verification"
//               },
//               {
//                 date: "2024-01-22 09:45",
//                 action: "Document Review Started",
//                 user: "ACVA India",
//                 details: "Auditor began reviewing baseline emissions data"
//               },
//               {
//                 date: "2024-01-23 16:20",
//                 action: "MRV Checklist Completed",
//                 user: "ACVA India",
//                 details: "All MRV verification items marked as complete"
//               },
//               {
//                 date: "2024-01-24 11:00",
//                 action: "Project Approved",
//                 user: "ACVA India",
//                 details: "Digital signature confirmed, project verified"
//               }
//             ].map((entry, idx) => (
//               <div key={idx} className="flex gap-4 pb-4 border-b last:border-0">
//                 <div className="flex-shrink-0">
//                   <div className="w-2 h-2 rounded-full bg-primary mt-2" />
//                 </div>
//                 <div className="flex-1 space-y-1">
//                   <div className="flex items-start justify-between">
//                     <p className="font-medium text-foreground">{entry.action}</p>
//                     <span className="text-xs text-muted-foreground">{entry.date}</span>
//                   </div>
//                   <p className="text-sm text-muted-foreground">By: {entry.user}</p>
//                   <p className="text-sm text-muted-foreground">{entry.details}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* ICM Link Modal */}
//       <Dialog open={icmLinkOpen} onOpenChange={setIcmLinkOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Link to ICM Registry</DialogTitle>
//             <DialogDescription>
//               Connect this project to the Indian Carbon Market registry
//             </DialogDescription>
//           </DialogHeader>
          
//           <div className="space-y-4 mt-4">
//             <div className="p-4 bg-muted rounded-lg space-y-2">
//               <p className="text-sm font-medium">Project: {selectedProject?.id}</p>
//               <p className="text-sm text-muted-foreground">{selectedProject?.title}</p>
//               <p className="text-sm text-muted-foreground">Credits: {selectedProject?.credits.toLocaleString()}</p>
//             </div>
            
//             <div className="space-y-2">
//               <label className="text-sm font-medium">ICM Registry ID</label>
//               <Input placeholder="Enter ICM registry identifier" />
//             </div>
            
//             <div className="flex justify-end gap-2 pt-4">
//               <Button variant="outline" onClick={() => setIcmLinkOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={confirmICMLink}>
//                 Confirm Link
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminProjects;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function AdminProjects() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: projects, isLoading } = useQuery({
    queryKey: ['adminProjects', statusFilter, typeFilter, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (typeFilter !== 'all') params.append('projectType', typeFilter);
      if (search) params.append('search', search);
      const response = await api.get(`/admin/projects?${params}`);
      return response.data;
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProjects'] });
      toast({ title: "Success", description: "Project deleted successfully" });
    }
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      verified: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      flagged: "bg-purple-100 text-purple-800"
    };
    return variants[status] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Project Management</h1>
        <p className="text-muted-foreground">Manage and review carbon credit projects</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="rooftop-solar">Rooftop Solar</SelectItem>
                <SelectItem value="biogas">Biogas</SelectItem>
                <SelectItem value="afforestation">Afforestation</SelectItem>
                <SelectItem value="waste-to-energy">Waste to Energy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.map((project: any) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.seller?.name || 'Unknown'}</TableCell>
                    <TableCell className="capitalize">{project.projectType?.replace(/-/g, ' ')}</TableCell>
                    <TableCell>{project.credits?.toLocaleString() || 0}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(`/projects/${project._id}`, '_blank')}
                        >
                          <Eye className="w-4 h-4 hidden" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this project?')) {
                              deleteProjectMutation.mutate(project._id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}