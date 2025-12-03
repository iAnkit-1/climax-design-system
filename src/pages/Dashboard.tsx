import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

// Mock function to determine user role - In production, this would come from authentication
const getUserRole = (): "buyer" | "seller" | "auditor" | "admin" | null => {
  // This is a mock implementation. In production, get this from your auth system
  const mockRole = localStorage.getItem("userRole") as "buyer" | "seller" | "auditor" | "admin" | null;
  return mockRole;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
    
    // Show onboarding for new users (check if they've seen it before)
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding && !role) {
      setShowOnboarding(true);
    }
  }, []);

  const handleRoleSelect = (role: "buyer" | "seller" | "auditor" | "admin") => {
    // Mock role selection - In production, this would be set during signup/login
    localStorage.setItem("userRole", role);
    localStorage.setItem("hasSeenOnboarding", "true");
    setUserRole(role);
    
    // Navigate to appropriate dashboard
    switch (role) {
      case "buyer":
        navigate("/dashboard/buyer");
        break;
      case "seller":
        navigate("/dashboard/seller");
        break;
      case "auditor":
        navigate("/auditor-dashboard");
        break;
      case "admin":
        navigate("/admin");
        break;
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <OnboardingModal 
        open={showOnboarding} 
        onOpenChange={handleOnboardingComplete}
        userType="seller"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Choose your role to access the appropriate dashboard. In production, this would be determined by your account type.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card 
                className="hover-card cursor-pointer" 
                onClick={() => handleRoleSelect("buyer")}
              >
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">Buyer</h3>
                    <p className="text-xs text-muted-foreground">
                      Purchase and manage carbon credits
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover-card cursor-pointer" 
                onClick={() => handleRoleSelect("seller")}
              >
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">Seller</h3>
                    <p className="text-xs text-muted-foreground">
                      Submit and track sustainability projects
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover-card cursor-pointer" 
                onClick={() => handleRoleSelect("auditor")}
              >
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-info" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">Auditor</h3>
                    <p className="text-xs text-muted-foreground">
                      Verify and validate project submissions
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover-card cursor-pointer" 
                onClick={() => handleRoleSelect("admin")}
              >
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">Admin</h3>
                    <p className="text-xs text-muted-foreground">
                      Manage platform and oversee operations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
