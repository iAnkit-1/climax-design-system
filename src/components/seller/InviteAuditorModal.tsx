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
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle2, Clock, IndianRupee } from "lucide-react";

interface InviteAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (auditorId: string, auditorName: string) => void;
}

const AUDITORS = [
  {
    id: "auditor-1",
    name: "ACVA India",
    rating: 4.9,
    reviews: 156,
    specialty: "Solar & Wind Projects",
    fee: 15000,
    turnaround: "5-7 days",
    verified: true,
    certifications: ["Gold Standard", "Verra", "ICM"],
    completedProjects: 342,
  },
  {
    id: "auditor-2",
    name: "EcoVerify Solutions",
    rating: 4.8,
    reviews: 98,
    specialty: "Biogas & Biomass",
    fee: 12000,
    turnaround: "7-10 days",
    verified: true,
    certifications: ["Verra", "ICM"],
    completedProjects: 187,
  },
  {
    id: "auditor-3",
    name: "GreenAudit Partners",
    rating: 4.7,
    reviews: 124,
    specialty: "Afforestation & REDD+",
    fee: 18000,
    turnaround: "10-14 days",
    verified: true,
    certifications: ["Gold Standard", "Verra", "UNFCCC"],
    completedProjects: 256,
  },
  {
    id: "auditor-4",
    name: "CarbonCheck India",
    rating: 4.6,
    reviews: 67,
    specialty: "Energy Efficiency",
    fee: 10000,
    turnaround: "5-7 days",
    verified: true,
    certifications: ["ICM", "BIS"],
    completedProjects: 98,
  },
  {
    id: "auditor-5",
    name: "ClimateVerify Pvt Ltd",
    rating: 4.9,
    reviews: 203,
    specialty: "All Project Types",
    fee: 20000,
    turnaround: "3-5 days",
    verified: true,
    certifications: ["Gold Standard", "Verra", "ICM", "UNFCCC"],
    completedProjects: 478,
  },
];

export default function InviteAuditorModal({
  isOpen,
  onClose,
  onInvite,
}: InviteAuditorModalProps) {
  const [selectedAuditor, setSelectedAuditor] = useState<string>("");

  const handleInvite = () => {
    const auditor = AUDITORS.find((a) => a.id === selectedAuditor);
    if (auditor) {
      onInvite(auditor.id, auditor.name);
      setSelectedAuditor("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite Auditor for Verification</DialogTitle>
          <DialogDescription>
            Select a certified auditor to verify your carbon credit project.
            The auditor will review your documentation and baseline data.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedAuditor}
            onValueChange={setSelectedAuditor}
            className="space-y-3"
          >
            {AUDITORS.map((auditor) => (
              <div
                key={auditor.id}
                className={`relative rounded-lg border p-4 cursor-pointer transition-all hover:border-primary ${
                  selectedAuditor === auditor.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border"
                }`}
                onClick={() => setSelectedAuditor(auditor.id)}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem
                    value={auditor.id}
                    id={auditor.id}
                    className="mt-1"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Label
                        htmlFor={auditor.id}
                        className="text-base font-semibold cursor-pointer"
                      >
                        {auditor.name}
                      </Label>
                      {auditor.verified && (
                        <Badge
                          variant="default"
                          className="gap-1 bg-primary/10 text-primary hover:bg-primary/10"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {auditor.specialty}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">
                          {auditor.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({auditor.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{auditor.turnaround}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <IndianRupee className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          ₹{auditor.fee.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {auditor.completedProjects} projects
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {auditor.certifications.map((cert) => (
                        <Badge
                          key={cert}
                          variant="secondary"
                          className="text-xs"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleInvite} disabled={!selectedAuditor}>
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}