import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFormData } from "@/pages/ProjectSubmission";

interface Props {
  data: ProjectFormData;
  updateData: (data: Partial<ProjectFormData>) => void;
}

const PROJECT_TYPES = [
  { value: "rooftop-solar", label: "Rooftop Solar" },
  { value: "biogas", label: "Biogas" },
  { value: "afforestation", label: "Afforestation" },
  { value: "waste-to-energy", label: "Waste to Energy" }
];

export default function ProjectDetailsForm({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Project Details
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Provide basic information about your sustainability project
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-foreground">
            Project Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            placeholder="e.g., Community Solar Installation - Phase 1"
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="projectType" className="text-foreground">
            Project Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.projectType}
            onValueChange={(value) => updateData({ projectType: value })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1.5">
            Choose the category that best describes your project
          </p>
        </div>
      </div>
    </div>
  );
}
