import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, FileCheck, CreditCard, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType?: "seller" | "buyer";
}

const steps = [
  {
    id: 1,
    title: "Complete Your Profile",
    description: "Verify your identity to build trust in the marketplace",
    icon: CheckCircle2,
    action: "Complete KYC",
    href: "/get-started",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    id: 2,
    title: "Get Started with Projects",
    description: "Submit your first sustainability project or explore the marketplace",
    icon: FileCheck,
    sellerAction: "Submit Project",
    buyerAction: "Browse Marketplace",
    sellerHref: "/project-submission",
    buyerHref: "/marketplace",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    id: 3,
    title: "Connect Payment Method",
    description: "Link your payment method to start buying or receiving payments",
    icon: CreditCard,
    action: "Setup Payment",
    href: "/wallet",
    color: "text-success",
    bgColor: "bg-success/10"
  }
];

export const OnboardingModal = ({ open, onOpenChange, userType = "seller" }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to ClimaX!</DialogTitle>
          <DialogDescription>
            Let's get you set up in just 3 simple steps
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {currentStep} of {steps.length}
              </span>
              <span className="font-medium text-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-lg ${currentStepData.bgColor} flex items-center justify-center`}>
                <StepIcon className={`w-8 h-8 ${currentStepData.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {currentStepData.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.description}
                </p>
              </div>
            </div>

            {/* Step Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              {currentStep === 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-foreground">
                    <strong>Why verify?</strong> KYC verification helps maintain trust and compliance in our marketplace.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Upload government-issued ID</li>
                    <li>• Verify business registration (for organizations)</li>
                    <li>• Approval typically takes 24-48 hours</li>
                  </ul>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-2">
                  <p className="text-sm text-foreground">
                    <strong>What's next?</strong> {userType === "seller" 
                      ? "Start your sustainability journey by submitting your first project for verification."
                      : "Explore verified carbon credit projects and start offsetting your carbon footprint."
                    }
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    {userType === "seller" ? (
                      <>
                        <li>• Fill in project details and documentation</li>
                        <li>• Select a certified auditor</li>
                        <li>• Track verification progress</li>
                      </>
                    ) : (
                      <>
                        <li>• Browse verified sustainability projects</li>
                        <li>• Filter by type, location, and price</li>
                        <li>• Purchase carbon credits instantly</li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-2">
                  <p className="text-sm text-foreground">
                    <strong>Secure payments</strong> Link your payment method to enable seamless transactions.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Support for UPI, cards, and bank transfers</li>
                    <li>• Bank-grade security and encryption</li>
                    <li>• Fast withdrawals for sellers</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-2 rounded-full transition-all ${
                  step.id === currentStep
                    ? "w-8 bg-primary"
                    : step.id < currentStep
                    ? "w-2 bg-success"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-4">
            <Button variant="ghost" onClick={handleSkip}>
              {currentStep === steps.length ? "Close" : "Skip for now"}
            </Button>
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length ? (
                <Button onClick={handleNext}>
                  Next Step
                </Button>
              ) : (
                <Button asChild>
                  <Link 
                    to={
                      currentStep === 2 
                        ? (userType === "seller" ? currentStepData.sellerHref : currentStepData.buyerHref)
                        : currentStepData.href || "/"
                    }
                    onClick={() => onOpenChange(false)}
                  >
                    {currentStep === 2 
                      ? (userType === "seller" ? currentStepData.sellerAction : currentStepData.buyerAction)
                      : currentStepData.action
                    }
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
