import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectDetailsForm from "@/components/project-submission/ProjectDetailsForm";
import LocationForm from "@/components/project-submission/LocationForm";
import BaselineEmissionsForm from "@/components/project-submission/BaselineEmissionsForm";
import EvidenceUploadForm from "@/components/project-submission/EvidenceUploadForm";
import IoTConnectorForm from "@/components/project-submission/IoTConnectorForm";
import CreditsPreview from "@/components/project-submission/CreditsPreview";
import AuditorSelection from "@/components/project-submission/AuditorSelection";

export interface ProjectFormData {
  // Project Details
  title: string;
  projectType: string;
  
  // Location
  state: string;
  district: string;
  pincode: string;
  address: string;
  
  // Baseline Emissions
  energyUse: string;
  fuelType: string;
  emissionFactor: string;
  additionalityProof: string;
  
  // Evidence
  documents: File[];
  
  // IoT
  iotConnected: boolean;
  iotDeviceId: string;
  
  // Auditor
  selectedAuditor: string;
  
  // Calculated
  estimatedCredits: number;
}

const STEPS = [
  "Project Details",
  "Location",
  "Baseline Emissions",
  "Evidence Upload",
  "IoT Data",
  "Credits Preview",
  "Auditor Selection"
];

export default function ProjectSubmission() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    projectType: "",
    state: "",
    district: "",
    pincode: "",
    address: "",
    energyUse: "",
    fuelType: "",
    emissionFactor: "",
    additionalityProof: "",
    documents: [],
    iotConnected: false,
    iotDeviceId: "",
    selectedAuditor: "",
    estimatedCredits: 0
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  
  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const validateStep = (): boolean => {
    switch (currentStep) {
      case 0: // Project Details
        if (!formData.title || !formData.projectType) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill in project title and type.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 1: // Location
        if (!formData.state || !formData.district || !formData.pincode) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill in all location details.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 2: // Baseline Emissions
        if (!formData.energyUse || !formData.fuelType || !formData.emissionFactor) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill in all baseline emission details.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 3: // Evidence Upload
        if (formData.documents.length === 0) {
          toast({
            title: "Documents Required",
            description: "Please upload at least one supporting document.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 6: // Auditor Selection
        if (!formData.selectedAuditor) {
          toast({
            title: "Auditor Required",
            description: "Please select an auditor for verification.",
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSaveDraft = () => {
    localStorage.setItem("climax_project_draft", JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your project draft has been saved successfully."
    });
  };
  
  const handleSubmit = () => {
    toast({
      title: "Project Submitted",
      description: "Your project has been submitted for verification."
    });
    localStorage.removeItem("climax_project_draft");
    setTimeout(() => navigate("/dashboard"), 2000);
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProjectDetailsForm data={formData} updateData={updateFormData} />;
      case 1:
        return <LocationForm data={formData} updateData={updateFormData} />;
      case 2:
        return <BaselineEmissionsForm data={formData} updateData={updateFormData} />;
      case 3:
        return <EvidenceUploadForm data={formData} updateData={updateFormData} />;
      case 4:
        return <IoTConnectorForm data={formData} updateData={updateFormData} />;
      case 5:
        return <CreditsPreview data={formData} />;
      case 6:
        return <AuditorSelection data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Submit New Project
          </h1>
          <p className="text-muted-foreground">
            Complete all steps to register your sustainability project
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={`flex-1 text-center ${
                  index < STEPS.length - 1 ? "border-r border-border" : ""
                }`}
              >
                <div
                  className={`text-xs ${
                    index <= currentStep
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <div
                  className={`text-xs mt-1 hidden md:block ${
                    index <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Form Content */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          {renderStep()}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="w-full sm:w-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          
          <div className="flex gap-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 sm:flex-none"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 sm:flex-none"
            >
              {currentStep === STEPS.length - 1 ? "Submit" : "Next"}
              {currentStep < STEPS.length - 1 && (
                <ArrowRight className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
