import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  FileCheck, 
  Link2, 
  CreditCard, 
  Settings,
  Package,
  ShieldCheck,
  IndianRupee,
  UserCog
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { UserProfileDropdown } from "@/components/dashboard/UserProfileDropdown";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Admin";
  
  // Fetch Dynamic KPI data
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await api.get('/admin/stats');
      return response.data;
    }
  });

  const kpis = [
    {
      title: "Total Projects",
      value: stats?.activeProjects?.toLocaleString() || "0",
      icon: Package,
      trend: stats?.monthlyGrowth || "+0%",
      color: "text-primary"
    },
    {
      title: "Verified Credits Issued",
      value: "N/A", // Not aggregated in current stats endpoint natively
      icon: ShieldCheck,
      trend: "+0%",
      color: "text-success"
    },
    {
      title: "Marketplace Volume",
      value: `₹${(stats?.totalVolume || 0).toLocaleString()}`,
      icon: IndianRupee,
      trend: "+0%",
      color: "text-accent"
    },
    {
      title: "Registered Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      icon: UserCog,
      trend: "+0",
      color: "text-info"
    }
  ];

  const navItems = [
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Projects", path: "/admin/projects", icon: FileCheck },
    { name: "Registry Link (ICM)", path: "/admin/registry", icon: Link2 },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
    { name: "Settings", path: "/admin/settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <div className="flex">
        {/* Left Navigation */}
        <aside className="hidden lg:flex w-64 min-h-screen bg-card border-r border-border flex-col">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold text-foreground">ClimaX Admin</span>
            </Link>
            
            <nav className="space-y-2">
              <NavLink 
                to="/admin" 
                end
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Overview</span>
              </NavLink>
              
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                  activeClassName="bg-primary/10 text-primary font-medium"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* User Profile at Bottom */}
            <div className="mt-auto pt-6 border-t border-border">
              <div className="flex items-center gap-3 px-3 py-2">
                <UserProfileDropdown />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-card border-b border-border px-4 sm:px-6 py-4 sticky top-0 z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Admin Overview</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Welcome, {userName}!
                  </p>
                </div>
                <div className="lg:hidden">
                  <UserProfileDropdown />
                </div>
              </div>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/dashboard">Exit Admin</Link>
              </Button>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {kpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <Card key={kpi.title} className="hover-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {kpi.title}
                      </CardTitle>
                      <Icon className={`w-5 h-5 ${kpi.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
                      <p className="text-xs text-success mt-1 flex items-center gap-1">
                        <span>{kpi.trend}</span>
                        <span className="text-muted-foreground">from last month</span>
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 sm:py-4 min-h-[44px]"
                    onClick={() => navigate("/admin/users")}
                  >
                    <Users className="w-5 h-5 mr-3 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm sm:text-base">Manage Users</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">View and assign roles</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 sm:py-4 min-h-[44px]"
                    onClick={() => navigate("/admin/projects")}
                  >
                    <FileCheck className="w-5 h-5 mr-3 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm sm:text-base">Review Projects</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">Bulk actions & audit trails</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 sm:py-4 min-h-[44px]"
                    onClick={() => navigate("/admin/registry")}
                  >
                    <Link2 className="w-5 h-5 mr-3 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm sm:text-base">ICM Registry</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">Link to government registry</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New project submitted", user: "Green Energy Co.", time: "5 min ago", status: "pending" },
                    { action: "Credits issued", user: "Solar Solutions Ltd.", time: "1 hour ago", status: "success" },
                    { action: "Auditor verified project", user: "ACVA India", time: "2 hours ago", status: "success" },
                    { action: "Payment processed", user: "EcoTech Pvt Ltd", time: "3 hours ago", status: "success" }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === "pending" ? "bg-warning" : "bg-success"
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
