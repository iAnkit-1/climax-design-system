import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Star, CheckCircle2 } from "lucide-react";
import { ProjectFormData } from "@/pages/ProjectSubmission";

interface Props {
  data: ProjectFormData;
  updateData: (data: Partial<ProjectFormData>) => void;
}

const AUDITORS = [
  {
    id: "acva-001",
    name: "ACVA (Accredited Carbon Verification Authority)",
    rating: 4.9,
    projects: 150,
    specialty: "Renewable Energy",
    turnaround: "2-3 weeks",
    fee: "₹25,000",
    badge: "Gold Certified"
  },
  {
    id: "acva-002",
    name: "Green Verify India",
    rating: 4.7,
    projects: 98,
    specialty: "Afforestation & Biogas",
    turnaround: "3-4 weeks",
    fee: "₹20,000",
    badge: "Certified"
  },
  {
    id: "acva-003",
    name: "EcoAudit Solutions",
    rating: 4.8,
    projects: 120,
    specialty: "Waste-to-Energy",
    turnaround: "2-3 weeks",
    fee: "₹22,000",
    badge: "Gold Certified"
  }
];

export default function AuditorSelection({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Select Auditor
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Choose an accredited auditor to verify your project
        </p>
      </div>
      
      <RadioGroup
        value={data.selectedAuditor}
        onValueChange={(value) => updateData({ selectedAuditor: value })}
        className="space-y-4"
      >
        {AUDITORS.map((auditor) => (
          <Card
            key={auditor.id}
            variant="auditor"
            className={`p-6 cursor-pointer transition-all ${
              data.selectedAuditor === auditor.id
                ? "ring-2 ring-primary shadow-lg"
                : "hover:shadow-md"
            }`}
            onClick={() => updateData({ selectedAuditor: auditor.id })}
          >
            <div className="flex items-start gap-4">
              <RadioGroupItem value={auditor.id} id={auditor.id} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Label
                      htmlFor={auditor.id}
                      className="text-base font-semibold text-foreground cursor-pointer"
                    >
                      {auditor.name}
                    </Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        {auditor.badge}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        {auditor.rating}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {auditor.projects} projects verified
                      </div>
                    </div>
                  </div>
                  {data.selectedAuditor === auditor.id && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Specialty</p>
                    <p className="text-sm font-medium text-foreground">
                      {auditor.specialty}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Turnaround</p>
                    <p className="text-sm font-medium text-foreground">
                      {auditor.turnaround}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Verification Fee</p>
                    <p className="text-sm font-medium text-foreground">
                      {auditor.fee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </RadioGroup>
      
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <p className="text-sm text-foreground font-medium mb-2">
          💡 Auditor Selection Tips
        </p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Choose an auditor specialized in your project type</li>
          <li>• All listed auditors are ACVA-certified</li>
          <li>• Verification fees are payable after credit issuance</li>
        </ul>
      </div>
    </div>
  );
}
