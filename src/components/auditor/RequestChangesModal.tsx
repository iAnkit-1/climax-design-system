import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RequestChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
  onSubmit: (changes: RequestedChanges) => void;
}

interface RequestedChanges {
  categories: string[];
  description: string;
  deadline: string;
}

const changeCategories = [
  { id: "documents", label: "Additional Documents Required" },
  { id: "baseline", label: "Baseline Data Clarification" },
  { id: "mrv", label: "MRV Evidence Insufficient" },
  { id: "photos", label: "Site Photos Required" },
  { id: "calculations", label: "Emission Calculations Review" },
  { id: "additionality", label: "Additionality Proof Needed" },
  { id: "other", label: "Other Requirements" },
];

export default function RequestChangesModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  onSubmit,
}: RequestChangesModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("7");

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = () => {
    onSubmit({
      categories: selectedCategories,
      description,
      deadline,
    });
    // Reset form
    setSelectedCategories([]);
    setDescription("");
    setDeadline("7");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <DialogTitle>Request Changes</DialogTitle>
              <DialogDescription>
                {projectId} - {projectTitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              The project submitter will be notified of these requested changes
              and the project status will be updated to "Changes Requested".
            </AlertDescription>
          </Alert>

          {/* Change Categories */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              What needs to be addressed? (Select all that apply)
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {changeCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label
                    htmlFor={category.id}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Detailed Description of Required Changes
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide specific details about what changes are needed, which documents are missing, or what clarifications you require..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Be as specific as possible to help the submitter address all
              issues in one revision.
            </p>
          </div>

          {/* Response Deadline */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Response Deadline</Label>
            <div className="flex gap-2">
              {["3", "7", "14", "30"].map((days) => (
                <Button
                  key={days}
                  type="button"
                  variant={deadline === days ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setDeadline(days)}
                  className="flex-1"
                >
                  {days} days
                </Button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedCategories.length > 0 && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <p className="text-sm font-medium">Summary</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Issues Selected:</strong> {selectedCategories.length}
                </p>
                <p>
                  <strong>Response Due:</strong>{" "}
                  {new Date(
                    Date.now() + parseInt(deadline) * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0 || !description.trim()}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}