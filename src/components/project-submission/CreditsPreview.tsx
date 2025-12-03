import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Leaf, Calendar } from "lucide-react";
import { ProjectFormData } from "@/pages/ProjectSubmission";
import { useEffect } from "react";

interface Props {
  data: ProjectFormData;
}

export default function CreditsPreview({ data }: Props) {
  // Calculate estimated credits based on emissions data
  const calculateCredits = (): number => {
    const energyUse = parseFloat(data.energyUse) || 0;
    const emissionFactor = parseFloat(data.emissionFactor) || 0;
    
    // Formula: (Annual Energy Use × Emission Factor) / 1000
    // Result is in tonnes of CO2 equivalent, which equals carbon credits
    const credits = (energyUse * emissionFactor) / 1000;
    return Math.round(credits);
  };
  
  const estimatedCredits = calculateCredits();
  const estimatedValue = estimatedCredits * 850; // ₹850 per credit (average)
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Estimated Credits Preview
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Projected carbon credit generation based on your project data
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="project" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Credits</p>
              <p className="text-2xl font-bold text-foreground">
                {estimatedCredits.toLocaleString()}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            tonnes CO₂e per year
          </Badge>
        </Card>
        
        <Card variant="credit" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Value</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{estimatedValue.toLocaleString()}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            @ ₹850 per credit
          </Badge>
        </Card>
      </div>
      
      <Card variant="flat" className="p-6">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Project Timeline
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Verification: 2-4 weeks after submission
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Credit Issuance: Upon successful verification
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                Trading: Immediately after issuance
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground font-medium mb-2">
          📊 Calculation Method
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Credits = (Annual Energy Use × Emission Factor) ÷ 1,000
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Energy Use: {parseFloat(data.energyUse || "0").toLocaleString()} kWh/year</p>
          <p>Emission Factor: {data.emissionFactor} kg CO₂/kWh</p>
          <p className="font-medium text-foreground mt-2">
            = {estimatedCredits.toLocaleString()} tonnes CO₂e/year
          </p>
        </div>
      </div>
      
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> This is an estimate based on the data provided. 
          Final credit allocation will be determined by the auditor after thorough verification 
          and may vary based on actual monitoring data.
        </p>
      </div>
    </div>
  );
}
