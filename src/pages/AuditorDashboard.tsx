// import { useState } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import ProjectList from "@/components/auditor/ProjectList";
// import ReviewPane from "@/components/auditor/ReviewPane";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { UserProfileDropdown } from "@/components/dashboard/UserProfileDropdown";

// export interface Project {
//   id: string;
//   title: string;
//   projectType: string;
//   submittedBy: string;
//   submittedDate: string;
//   status: "pending" | "in-review" | "approved" | "rejected";
//   location: string;
//   estimatedCredits: number;
//   documents: {
//     id: string;
//     name: string;
//     type: string;
//     url: string;
//     size: number;
//   }[];
//   baseline: {
//     energyUse: string;
//     fuelType: string;
//     emissionFactor: string;
//     additionalityProof: string;
//   };
//   comments: {
//     id: string;
//     author: string;
//     timestamp: string;
//     message: string;
//   }[];
// }

// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/api";

// export default function AuditorDashboard() {
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const userName = localStorage.getItem("userName") || "Auditor";

//   const { data: projects = [], refetch } = useQuery({
//     queryKey: ['auditor-projects'],
//     queryFn: async () => {
//       const response = await api.get('/projects');
//       console.log(response);
      
//       return response.data.map((p: any) => ({
//         id: p._id,
//         title: p.title,
//         projectType: p.category || "Unknown",
//         submittedBy: p.seller?.name || "Unknown",
//         submittedDate: p.createdAt,
//         status: p.status,
//         location: p.location?.state + ", " + p.location?.country,
//         estimatedCredits: p.credits,
//         documents: [], // Wait for file system implementation or use empty array
//         baseline: {
//           energyUse: p.baseline?.energyUse || "N/A",
//           fuelType: p.baseline?.fuelType || "N/A",
//           emissionFactor: p.baseline?.emissionFactor || "N/A",
//           additionalityProof: p.baseline?.additionalityProof || "N/A"
//         },
//         comments: p.comments || []
//       }));
//     }
//   });

//   // Default to first project if none selected
//   const selectedProject = projects.find((p: any) => p.id === selectedProjectId) || projects[0] || null;

//   const filteredProjects = projects.filter((project: any) => 
//     statusFilter === "all" || project.status === statusFilter
//   );

//   const handleStatusChange = async (projectId: string, newStatus: string, feedback?: string) => {
//     try {
//       await api.put(`/projects/${projectId}/status`, { status: newStatus, feedback });
//       refetch(); // Refresh project list after update
//     } catch (error) {
//       console.error("Failed to update status", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       {/* Header */}
//       <header className="border-b border-border bg-card sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-3 sm:py-4">
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex-1 min-w-0">
//               <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
//                 Auditor Dashboard
//               </h1>
//               <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
//                 Welcome, {userName}! Review and verify projects
//               </p>
//             </div>
//             <UserProfileDropdown />
//           </div>
//         </div>
//       </header>

//       {/* Mobile: Dropdown selector */}
//       <div className="md:hidden border-b border-border bg-card">
//         <div className="container mx-auto px-4 py-3">
//           <Select
//             value={selectedProjectId || undefined}
//             onValueChange={setSelectedProjectId}
//           >
//             <SelectTrigger className="min-h-[44px]">
//               <SelectValue placeholder="Select a project" />
//             </SelectTrigger>
//             <SelectContent>
//               {filteredProjects.map((project: any) => (
//                 <SelectItem key={project.id} value={project.id} className="min-h-[44px]">
//                   {project.title} - {project.status}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Desktop: Sidebar layout */}
//       <SidebarProvider>
//         <div className="flex w-full">
//           {/* Left: Project List */}
//           <div className="hidden md:block">
//             <ProjectList
//               projects={filteredProjects}
//               selectedProject={selectedProject}
//               onSelectProject={(p) => setSelectedProjectId(p?.id || null)}
//               statusFilter={statusFilter}
//               onFilterChange={setStatusFilter}
//             />
//           </div>

//           {/* Right: Review Pane */}
//           <main className="flex-1 overflow-auto">
//             {selectedProject ? (
//               <ReviewPane project={selectedProject} onStatusChange={handleStatusChange} />
//             ) : (
//               <div className="flex items-center justify-center h-full p-8">
//                 <p className="text-muted-foreground">Select a project to review</p>
//               </div>
//             )}
//           </main>
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// }


import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProjectList from "@/components/auditor/ProjectList";
import ReviewPane from "@/components/auditor/ReviewPane";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfileDropdown } from "@/components/dashboard/UserProfileDropdown";

export interface Project {
  id: string;
  title: string;
  projectType: string;
  submittedBy: string;
  submittedByEmail?: string;
  submittedDate: string;
  status: "pending" | "verified" | "rejected" | "flagged" | "retired";
  location: string;
  locationDetails?: {
    state: string;
    district: string;
    pincode: string;
    address: string;
  };
  estimatedCredits: number;
  pricePerCredit: number;
  documents: {
    id?: string;
    name: string;
    type: string;
    url: string;
    fullUrl?: string; // Add full URL for downloading
  }[];
  baseline: {
    energyUse: string;
    fuelType: string;
    emissionFactor: string;
    additionalityProof: string;
  };
  comments?: any[];
  iotConnected: boolean;
  iotDeviceId?: string;
  selectedAuditor?: string;
  vintage?: number;
  verifier?: string;
  description?: string;
  methodology?: string;
  projectStart?: string;
  certificationDate?: string;
  monitoringPeriod?: string;
  additionalBenefits?: string[];
  auditorFeedback?: string;
  imageUrl?: string;
}

import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AuditorDashboard() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const userName = localStorage.getItem("userName") || "Auditor";
  const queryClient = useQueryClient();

  const { data: projects = [], refetch } = useQuery({
    queryKey: ['auditor-projects'],
    queryFn: async () => {
      const response = await api.get('/projects');
      console.log(response);
      
      // Get the base URL from your API configuration
      const baseURL = api.defaults.baseURL || 'http://localhost:5000';
      
      const projectsData = response.data.map((p: any) => {
        // Format location string
        let locationString = "Not specified";
        if (p.location) {
          const parts = [p.location.address, p.location.district, p.location.state, p.location.pincode].filter(Boolean);
          if (parts.length > 0) {
            locationString = parts.join(", ");
          }
        }

        // Process documents to have full URLs
        const processedDocuments = (p.documents || []).map((doc: any, index: number) => ({
          id: doc._id || index.toString(),
          name: doc.name,
          type: doc.type,
          url: doc.url,
          fullUrl: doc.url ? `${baseURL}${doc.url}` : '' // Add full URL for download
        }));

        return {
          id: p._id,
          title: p.title,
          projectType: p.projectType || "Unknown",
          submittedBy: p.seller?.name || "Unknown",
          submittedByEmail: p.seller?.email,
          submittedDate: p.createdAt,
          status: p.status || "pending",
          location: locationString,
          locationDetails: p.location ? {
            state: p.location.state,
            district: p.location.district,
            pincode: p.location.pincode,
            address: p.location.address
          } : undefined,
          estimatedCredits: p.credits || 0,
          pricePerCredit: p.pricePerCredit || 0,
          documents: processedDocuments,
          baseline: {
            energyUse: p.energyUse || "N/A",
            fuelType: p.fuelType || "N/A",
            emissionFactor: p.emissionFactor || "N/A",
            additionalityProof: p.additionalityProof || "N/A"
          },
          comments: p.comments || [],
          iotConnected: p.iotConnected || false,
          iotDeviceId: p.iotDeviceId,
          selectedAuditor: p.selectedAuditor,
          vintage: p.vintage,
          verifier: p.verifier,
          description: p.description,
          methodology: p.methodology,
          projectStart: p.projectStart,
          certificationDate: p.certificationDate,
          monitoringPeriod: p.monitoringPeriod,
          additionalBenefits: p.additionalBenefits,
          auditorFeedback: p.auditorFeedback,
          imageUrl: p.imageUrl
        };
      });
      
      return projectsData;
    }
  });

  // Default to first project if none selected
  const selectedProject = projects.find((p: any) => p.id === selectedProjectId) || projects[0] || null;

  const filteredProjects = projects.filter((project: any) => 
    statusFilter === "all" || project.status === statusFilter
  );

  const handleStatusChange = async (projectId: string, newStatus: string, feedback?: string) => {
    try {
      await api.put(`/projects/${projectId}/status`, { 
        status: newStatus, 
        auditorFeedback: feedback 
      });
      refetch(); // Refresh project list after update
      queryClient.invalidateQueries({ queryKey: ['auditor-projects'] });
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                Auditor Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
                Welcome, {userName}! Review and verify carbon credit projects
              </p>
            </div>
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      {/* Mobile: Dropdown selector */}
      <div className="md:hidden border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <Select
            value={selectedProjectId || undefined}
            onValueChange={setSelectedProjectId}
          >
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {filteredProjects.map((project: any) => (
                <SelectItem key={project.id} value={project.id} className="min-h-[44px]">
                  {project.title} - {project.status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop: Sidebar layout */}
      <SidebarProvider>
        <div className="flex w-full">
          {/* Left: Project List */}
          <div className="hidden md:block">
            <ProjectList
              projects={filteredProjects}
              selectedProject={selectedProject}
              onSelectProject={(p) => setSelectedProjectId(p?.id || null)}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />
          </div>

          {/* Right: Review Pane */}
          <main className="flex-1 overflow-auto">
            {selectedProject ? (
              <ReviewPane project={selectedProject} onStatusChange={handleStatusChange} />
            ) : (
              <div className="flex items-center justify-center h-full p-8">
                <p className="text-muted-foreground">Select a project to review</p>
              </div>
            )}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}