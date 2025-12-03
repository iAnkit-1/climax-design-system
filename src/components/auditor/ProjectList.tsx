import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, MapPin, Calendar } from "lucide-react";
import { Project } from "@/pages/AuditorDashboard";

interface Props {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  statusFilter: string;
  onFilterChange: (status: string) => void;
}

const STATUS_COLORS = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "in-review": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  approved: "bg-green-500/10 text-green-600 border-green-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20"
};

const STATUS_LABELS = {
  pending: "Pending",
  "in-review": "In Review",
  approved: "Approved",
  rejected: "Rejected"
};

export default function ProjectList({
  projects,
  selectedProject,
  onSelectProject,
  statusFilter,
  onFilterChange
}: Props) {
  return (
    <div className="w-80 border-r border-border bg-card h-[calc(100vh-73px)] flex flex-col">
      {/* Filter */}
      <div className="p-4 border-b border-border">
        <Select value={statusFilter} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects ({projects.length})</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            variant="flat"
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedProject?.id === project.id
                ? "ring-2 ring-primary shadow-md"
                : ""
            }`}
            onClick={() => onSelectProject(project)}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {project.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {project.id}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs shrink-0 ${STATUS_COLORS[project.status]}`}
                >
                  {STATUS_LABELS[project.status]}
                </Badge>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(project.submittedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Leaf className="w-3 h-3" />
                  <span>{project.estimatedCredits} credits</span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  By: <span className="font-medium text-foreground">{project.submittedBy}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No projects found for this filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
