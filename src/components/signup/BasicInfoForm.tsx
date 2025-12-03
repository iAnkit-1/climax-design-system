import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check } from "lucide-react";

interface BasicInfoFormProps {
  role: string;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization?: string;
    password: string;
    confirmPassword: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-center gap-2 text-sm">
    {met ? (
      <Check className="w-4 h-4 text-success" />
    ) : (
      <AlertCircle className="w-4 h-4 text-muted-foreground" />
    )}
    <span className={met ? "text-success" : "text-muted-foreground"}>{text}</span>
  </div>
);

export const BasicInfoForm = ({ role, formData, errors, onChange }: BasicInfoFormProps) => {
  const needsOrganization = role === "seller" || role === "auditor";
  
  // Password validation checks
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Basic Information</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              error={errors.firstName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              error={errors.lastName}
            />
          </div>
        </div>

        {/* Organization (if needed) */}
        {needsOrganization && (
          <div className="space-y-2">
            <Label htmlFor="organization">Organization Name *</Label>
            <Input
              id="organization"
              placeholder="Acme Corp"
              value={formData.organization || ""}
              onChange={(e) => onChange("organization", e.target.value)}
              error={errors.organization}
            />
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={errors.email}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            error={errors.phone}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            error={errors.password}
          />
          
          {/* Password Requirements */}
          <div className="mt-3 p-4 rounded-[var(--radius)] bg-muted space-y-2">
            <p className="text-sm font-medium text-foreground mb-2">Password must contain:</p>
            <PasswordRequirement met={passwordChecks.length} text="At least 8 characters" />
            <PasswordRequirement met={passwordChecks.uppercase} text="One uppercase letter" />
            <PasswordRequirement met={passwordChecks.lowercase} text="One lowercase letter" />
            <PasswordRequirement met={passwordChecks.number} text="One number" />
            <PasswordRequirement met={passwordChecks.special} text="One special character" />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            success={passwordsMatch ? "Passwords match" : undefined}
          />
        </div>
      </div>
    </div>
  );
};
