import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface VerificationStatusProps {
  role: string;
  email: string;
}

export const VerificationStatus = ({ role, email }: VerificationStatusProps) => {
  const getDashboardPath = () => {
    switch (role) {
      case "buyer":
        return "/dashboard/buyer";
      case "seller":
        return "/dashboard/seller";
      case "auditor":
        return "/auditor-dashboard";
      case "admin":
        return "/admin";
      default:
        return "/dashboard";
    }
  };

  return (
    <div className="space-y-6 text-center animate-fade-in">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Application Submitted!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your registration has been received and is being processed.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Card variant="flat" className="p-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[var(--radius)] bg-success/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Account Created</h3>
              <p className="text-sm text-muted-foreground">
                Your account has been successfully created and secured.
              </p>
            </div>
          </div>
        </Card>

        <Card variant="flat" className="p-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[var(--radius)] bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Under Review</h3>
              <p className="text-sm text-muted-foreground">
                Our team is verifying your documents. This typically takes 24-48 hours.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Email Confirmation */}
      <Card variant="flat" className="p-6 max-w-2xl mx-auto">
        <div className="flex items-start gap-4 text-left">
          <div className="w-10 h-10 rounded-[var(--radius)] bg-info/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-info" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">Check Your Email</h3>
            <p className="text-sm text-muted-foreground mb-2">
              We've sent a confirmation email to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              You'll receive updates about your verification status via email.
            </p>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <div className="space-y-4 pt-4">
        <h3 className="font-semibold text-foreground">What's Next?</h3>
        <ul className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto text-left">
          <li className="flex items-start gap-2">
            <span className="text-primary font-semibold">1.</span>
            <span>Our verification team will review your submitted documents</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-semibold">2.</span>
            <span>You'll receive an email once verification is complete</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-semibold">3.</span>
            <span>
              {role === "buyer" && "Start browsing and purchasing carbon credits"}
              {role === "seller" && "Register your climate projects and list credits"}
              {role === "auditor" && "Begin verifying and certifying projects"}
              {role === "admin" && "Access platform management features"}
            </span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="pt-4">
        <Button variant="primary" size="lg" asChild className="group">
          <Link to={getDashboardPath()}>
            Go to Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          You can explore the platform while your verification is in progress
        </p>
      </div>
    </div>
  );
};
