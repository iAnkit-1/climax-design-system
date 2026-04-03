import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RoleSelection } from "@/components/signup/RoleSelection";
import { BasicInfoForm } from "@/components/signup/BasicInfoForm";
import { DocumentUploadForm } from "@/components/signup/DocumentUploadForm";
import { VerificationStatus } from "@/components/signup/VerificationStatus";
import { toast } from "sonner";
import api from "@/lib/api";

type FormData = {
  // Step 1
  role: string;
  // Step 2
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  password: string;
  confirmPassword: string;
  // Step 3
  idProof?: File;
  gstDocument?: File;
  registrationDocument?: File;
  accreditationId?: string;
  certificationDocument?: File;
  yearsOfExperience?: string;
};

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const handleChange = (field: string, value: string | File | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.role) {
      toast.error("Please select a role to continue");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if ((formData.role === "seller" || formData.role === "auditor") && !formData.organization?.trim()) {
      newErrors.organization = "Organization name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const checks = {
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
      };

      if (!Object.values(checks).every(Boolean)) {
        newErrors.password = "Password does not meet all requirements";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before continuing");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.idProof) {
      newErrors.idProof = "Identity proof is required";
    }

    if (formData.role === "seller") {
      if (!formData.gstDocument) {
        newErrors.gstDocument = "GST certificate is required";
      }
      if (!formData.registrationDocument) {
        newErrors.registrationDocument = "Business registration is required";
      }
    }

    if (formData.role === "auditor") {
      if (!formData.accreditationId?.trim()) {
        newErrors.accreditationId = "Accreditation ID is required";
      }
      if (!formData.certificationDocument) {
        newErrors.certificationDocument = "Certification document is required";
      }
      if (!formData.yearsOfExperience?.trim()) {
        newErrors.yearsOfExperience = "Years of experience is required";
      } else if (parseInt(formData.yearsOfExperience) < 0) {
        newErrors.yearsOfExperience = "Please enter a valid number";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please upload all required documents");
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }

    if (isValid) {
      if (currentStep === 3) {
        try {
          const payload = new FormData();
          payload.append("role", formData.role);
          payload.append("name", `${formData.firstName} ${formData.lastName}`);
          payload.append("email", formData.email);
          payload.append("password", formData.password);
          payload.append("phone", formData.phone);
          if (formData.organization) payload.append("organization", formData.organization);

          // Append files if they exist
          if (formData.idProof) payload.append("document", formData.idProof);

          const { data } = await api.post('/users', payload, {
            headers: { 'Content-Type': 'multipart/form-data' } // We mapped local upload in api
          });

          // Store user info and redirect smoothly
          localStorage.setItem("userRole", formData.role);
          localStorage.setItem("userEmail", formData.email);
          localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`);
          localStorage.setItem("token", data.token);
          
          toast.success("Application submitted successfully!");
          
          setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Registration failed. Try again.");
        }
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-semibold text-foreground">ClimaX</span>
          </Link>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-climax ${
                  step === currentStep
                    ? "bg-primary text-primary-foreground shadow-climax-md"
                    : step < currentStep
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-climax ${
                    step < currentStep ? "bg-success" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Role</span>
          <span>Basic Info</span>
          <span>Documents</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card variant="default" className="p-6 md:p-8">
          {currentStep === 1 && (
            <RoleSelection selectedRole={formData.role} onRoleSelect={(role) => handleChange("role", role)} />
          )}

          {currentStep === 2 && (
            <BasicInfoForm role={formData.role} formData={formData} errors={errors} onChange={handleChange} />
          )}

          {currentStep === 3 && (
            <DocumentUploadForm role={formData.role} formData={formData} errors={errors} onChange={handleChange} />
          )}

          {currentStep === 4 && <VerificationStatus role={formData.role} email={formData.email} />}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>

              <Button variant="primary" onClick={handleNext} className="group">
                {currentStep === 3 ? "Submit Application" : "Continue"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
