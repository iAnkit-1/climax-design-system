import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { ProjectFormData } from "@/pages/ProjectSubmission";

interface Props {
  data: ProjectFormData;
  updateData: (data: Partial<ProjectFormData>) => void;
}

const FUEL_TYPES = [
  { value: "coal", label: "Coal", factor: "0.95" },
  { value: "diesel", label: "Diesel", factor: "2.68" },
  { value: "petrol", label: "Petrol", factor: "2.31" },
  { value: "natural-gas", label: "Natural Gas", factor: "2.00" },
  { value: "lpg", label: "LPG", factor: "2.98" },
  { value: "grid-electricity", label: "Grid Electricity", factor: "0.82" }
];

export default function BaselineEmissionsForm({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Baseline Emissions
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Provide data to calculate your project's emission reduction potential
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="energyUse" className="text-foreground">
            Annual Energy Use (kWh) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="energyUse"
            type="number"
            value={data.energyUse}
            onChange={(e) => updateData({ energyUse: e.target.value })}
            placeholder="e.g., 50000"
            className="mt-1.5"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Total annual energy consumption in kilowatt-hours
          </p>
        </div>
        
        <div>
          <Label htmlFor="fuelType" className="text-foreground">
            Primary Fuel Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.fuelType}
            onValueChange={(value) => {
              const fuel = FUEL_TYPES.find(f => f.value === value);
              updateData({ 
                fuelType: value,
                emissionFactor: fuel?.factor || ""
              });
            }}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              {FUEL_TYPES.map((fuel) => (
                <SelectItem key={fuel.value} value={fuel.value}>
                  {fuel.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="emissionFactor" className="text-foreground">
            Emission Factor (kg CO₂/kWh) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="emissionFactor"
            type="number"
            step="0.01"
            value={data.emissionFactor}
            onChange={(e) => updateData({ emissionFactor: e.target.value })}
            placeholder="Auto-filled based on fuel type"
            className="mt-1.5"
            readOnly
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Standard emission factor for selected fuel type
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Label htmlFor="additionalityProof" className="text-foreground">
              Additionality Proof <span className="text-destructive">*</span>
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    Additionality means your project wouldn't have happened without carbon credit incentives. 
                    Explain why this project is additional to business-as-usual scenarios.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="additionalityProof"
            value={data.additionalityProof}
            onChange={(e) => updateData({ additionalityProof: e.target.value })}
            placeholder="Explain why this project wouldn't exist without carbon credits..."
            className="mt-1.5"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
