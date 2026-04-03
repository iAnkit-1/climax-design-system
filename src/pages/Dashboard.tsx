import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    switch (userRole) {
      case "buyer":
        navigate("/dashboard/buyer", { replace: true });
        break;
      case "seller":
        navigate("/dashboard/seller", { replace: true });
        break;
      case "auditor":
        navigate("/auditor-dashboard", { replace: true });
        break;
      case "admin":
        navigate("/admin", { replace: true });
        break;
      default:
        navigate("/login", { replace: true });
    }
  }, [navigate, userRole]);

  // If no role, fallback purely to login route securely, although ProtectedRoute handles undefined tokens
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // Show a blank loader while reacting to userRole redirect
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
};

export default Dashboard;
