import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trees, Droplets, Wind, Home } from "lucide-react";

interface ImpactMetric {
  label: string;
  value: string;
  icon: typeof Trees;
  equivalent: string;
}

const impactMetrics: ImpactMetric[] = [
  {
    label: "CO₂e Avoided",
    value: "1,840 tons",
    icon: Wind,
    equivalent: "400 cars off road/year"
  },
  {
    label: "Trees Equivalent",
    value: "92,000",
    icon: Trees,
    equivalent: "Planted and grown for 10 years"
  },
  {
    label: "Energy Saved",
    value: "2.3M kWh",
    icon: Droplets,
    equivalent: "230 homes powered/year"
  },
  {
    label: "Households Impacted",
    value: "450",
    icon: Home,
    equivalent: "Direct beneficiaries"
  }
];

export const ImpactSummary = () => {
  return (
    <Card variant="credit">
      <CardHeader>
        <CardTitle>Environmental Impact Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.equivalent}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
