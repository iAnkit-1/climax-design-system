import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Shield, Wallet } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Register Project",
    description: "Submit your climate project with complete documentation and get verified by certified auditors in days, not months.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Shield,
    title: "Trusted Verification",
    description: "All credits verified by ISO-certified auditors. Blockchain-backed certificates ensure transparency and prevent double-counting.",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    icon: Wallet,
    title: "Marketplace & Wallet",
    description: "Buy, sell, or retire carbon credits seamlessly. Integrated wallet for easy transactions and real-time portfolio tracking.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent-dark",
  },
];

export const FeatureCards = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                variant="default"
                className="hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-[var(--radius)] ${feature.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
