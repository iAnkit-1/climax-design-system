import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

interface Props {
  projectId: string;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "mrv-1",
    label: "Project documentation is complete",
    description: "All required documents (invoices, certificates, photos) are uploaded",
    checked: false
  },
  {
    id: "mrv-2",
    label: "Baseline emissions calculated correctly",
    description: "Energy use, fuel type, and emission factors are accurate",
    checked: false
  },
  {
    id: "mrv-3",
    label: "Additionality proof is sufficient",
    description: "Clear evidence that project wouldn't happen without carbon credits",
    checked: false
  },
  {
    id: "mrv-4",
    label: "Monitoring plan is adequate",
    description: "MRV logs and data collection methodology are appropriate",
    checked: false
  },
  {
    id: "mrv-5",
    label: "Location verification completed",
    description: "Geographic coordinates and site details are verified",
    checked: false
  },
  {
    id: "mrv-6",
    label: "Permanence assured",
    description: "Project demonstrates long-term emission reductions",
    checked: false
  },
  {
    id: "mrv-7",
    label: "No double counting risk",
    description: "Credits won't be claimed by multiple parties",
    checked: false
  },
  {
    id: "mrv-8",
    label: "Leakage assessment done",
    description: "Potential emission increases elsewhere are evaluated",
    checked: false
  }
];

export default function MRVChecklist({ projectId }: Props) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const completedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card variant="flat" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              MRV Verification Checklist
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Complete all items before approving the project
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {completedCount}/{totalCount}
            </p>
            <p className="text-xs text-muted-foreground">items completed</p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      {/* Checklist Items */}
      <Card variant="flat" className="p-6">
        <div className="space-y-6">
          {checklist.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 pb-6 border-b border-border last:border-0 last:pb-0"
            >
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={() => toggleItem(item.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor={item.id}
                  className={`text-sm font-medium cursor-pointer ${
                    item.checked ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
              {item.checked && (
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Completion Message */}
      {progress === 100 && (
        <Card variant="flat" className="p-6 bg-green-500/5 border-green-500/20">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                All MRV criteria verified
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                You can now proceed to approve this project
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
