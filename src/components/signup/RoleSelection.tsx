import { Card } from "@/components/ui/card";
import { Building2, ShoppingBag, Shield, UserCog } from "lucide-react";

interface RoleSelectionProps {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}

const roles = [
  {
    id: "buyer",
    title: "Buyer",
    icon: ShoppingBag,
    description: "Purchase carbon credits for your organization or personal use",
  },
  {
    id: "seller",
    title: "Seller / Project Owner",
    icon: Building2,
    description: "Register climate projects and sell verified carbon credits",
  },
  {
    id: "auditor",
    title: "Auditor",
    icon: Shield,
    description: "Verify and certify carbon credit projects as an accredited auditor",
  },
  {
    id: "admin",
    title: "Admin",
    icon: UserCog,
    description: "Platform administration and management access",
  },
];

export const RoleSelection = ({ selectedRole, onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Choose Your Role</h2>
        <p className="text-muted-foreground">Select how you'll be using ClimaX platform</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <Card
              key={role.id}
              variant={isSelected ? "project" : "default"}
              className={`cursor-pointer transition-all p-6 hover-scale ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onRoleSelect(role.id)}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-[var(--radius)] ${
                  isSelected ? "bg-primary" : "bg-primary/10"
                } flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
