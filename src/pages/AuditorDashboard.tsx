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
  submittedDate: string;
  status: "pending" | "in-review" | "approved" | "rejected";
  location: string;
  estimatedCredits: number;
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  }[];
  baseline: {
    energyUse: string;
    fuelType: string;
    emissionFactor: string;
    additionalityProof: string;
  };
  comments: {
    id: string;
    author: string;
    timestamp: string;
    message: string;
  }[];
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    title: "Community Solar Installation - Phase 1",
    projectType: "Rooftop Solar",
    submittedBy: "Green Energy Co.",
    submittedDate: "2025-01-10",
    status: "pending",
    location: "Karnataka, Bangalore Urban",
    estimatedCredits: 450,
    documents: [
      { id: "1", name: "installation-invoice.pdf", type: "application/pdf", url: "#", size: 2500000 },
      { id: "2", name: "site-photo-1.jpg", type: "image/jpeg", url: "#", size: 1800000 },
      { id: "3", name: "equipment-certificate.pdf", type: "application/pdf", url: "#", size: 1200000 },
    ],
    baseline: {
      energyUse: "50000",
      fuelType: "Grid Electricity",
      emissionFactor: "0.82",
      additionalityProof: "This solar installation project would not be financially viable without carbon credit incentives..."
    },
    comments: []
  },
  {
    id: "PRJ-002",
    title: "Agricultural Biogas Plant",
    projectType: "Biogas",
    submittedBy: "FarmTech Solutions",
    submittedDate: "2025-01-08",
    status: "in-review",
    location: "Punjab, Ludhiana",
    estimatedCredits: 320,
    documents: [
      { id: "4", name: "biogas-setup.jpg", type: "image/jpeg", url: "#", size: 2100000 },
      { id: "5", name: "mrv-logs.pdf", type: "application/pdf", url: "#", size: 3200000 },
    ],
    baseline: {
      energyUse: "35000",
      fuelType: "LPG",
      emissionFactor: "2.98",
      additionalityProof: "The biogas plant requires significant upfront investment that is only viable with carbon credit revenue..."
    },
    comments: [
      {
        id: "c1",
        author: "Auditor - Rajesh Kumar",
        timestamp: "2025-01-12 10:30",
        message: "Please provide additional MRV logs for the past 3 months."
      }
    ]
  },
  {
    id: "PRJ-003",
    title: "Urban Afforestation Initiative",
    projectType: "Afforestation",
    submittedBy: "EcoCity Foundation",
    submittedDate: "2025-01-05",
    status: "approved",
    location: "Maharashtra, Mumbai",
    estimatedCredits: 280,
    documents: [
      { id: "6", name: "plantation-map.pdf", type: "application/pdf", url: "#", size: 1500000 },
      { id: "7", name: "tree-count-report.pdf", type: "application/pdf", url: "#", size: 900000 },
    ],
    baseline: {
      energyUse: "N/A",
      fuelType: "N/A",
      emissionFactor: "N/A",
      additionalityProof: "This afforestation project on degraded urban land would not proceed without carbon finance..."
    },
    comments: [
      {
        id: "c2",
        author: "Auditor - Priya Sharma",
        timestamp: "2025-01-11 14:20",
        message: "All documentation verified. Project approved."
      }
    ]
  }
];

export default function AuditorDashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(MOCK_PROJECTS[0]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const userName = localStorage.getItem("userName") || "Auditor";

  const filteredProjects = MOCK_PROJECTS.filter(project => 
    statusFilter === "all" || project.status === statusFilter
  );

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
                Welcome, {userName}! Review and verify projects
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
            value={selectedProject?.id}
            onValueChange={(id) => {
              const project = MOCK_PROJECTS.find(p => p.id === id);
              setSelectedProject(project || null);
            }}
          >
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {filteredProjects.map((project) => (
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
              onSelectProject={setSelectedProject}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />
          </div>

          {/* Right: Review Pane */}
          <main className="flex-1 overflow-auto">
            {selectedProject ? (
              <ReviewPane project={selectedProject} />
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
