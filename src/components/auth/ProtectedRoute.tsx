import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    // Not logged in, block access and redirect
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Logged in but insufficient permissions
    // Could route them to a safe default dashboard based on their role
    switch (userRole) {
      case "buyer":
        return <Navigate to="/dashboard/buyer" replace />;
      case "seller":
        return <Navigate to="/dashboard/seller" replace />;
      case "auditor":
        return <Navigate to="/auditor-dashboard" replace />;
      case "admin":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};
