// Client-side user role management
// NOTE: In production, this should be replaced with proper backend authentication

export type UserRole = "buyer" | "seller" | "auditor" | "admin" | null;

export const getUserRole = (): UserRole => {
  return localStorage.getItem("userRole") as UserRole;
};

export const getUserName = (): string => {
  return localStorage.getItem("userName") || "User";
};

export const getUserEmail = (): string => {
  return localStorage.getItem("userEmail") || "";
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("userRole");
};

export const getDashboardPath = (role: UserRole): string => {
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

export const logout = (): void => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("hasSeenOnboarding");
};
