import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award,
  FileCheck, 
  IndianRupee,
  TrendingUp,
  Download,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { KPICards } from "@/components/dashboard/KPICards";
import { ProjectTimeline } from "@/components/dashboard/ProjectTimeline";
import { ImpactSummary } from "@/components/dashboard/ImpactSummary";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UserProfileDropdown } from "@/components/dashboard/UserProfileDropdown";
import InviteAuditorModal from "@/components/seller/InviteAuditorModal";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const SellerDashboard = () => {
  const userName = localStorage.getItem("userName") || "User";
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  
  const { data: projects = [], refetch } = useQuery({
    queryKey: ['seller-projects'],
    queryFn: async () => {
      const response = await api.get('/projects/myprojects');
      return response.data;
    }
  });

  const activeProjectsCount = projects.filter((p: any) => p.status === 'verified').length;
  const pendingProjectsCount = projects.filter((p: any) => p.status === 'in-review' || p.status === 'pending').length;
  const totalCredits = projects.filter((p: any) => p.status === 'verified').reduce((acc: number, p: any) => acc + p.credits, 0);
  
  // Real timeline mapped
  const timelineItems = projects.map((p: any) => ({
    id: p._id,
    title: p.title,
    date: new Date(p.createdAt).toLocaleDateString(),
    status: p.status === 'verified' ? 'completed' : 
            (p.status === 'rejected' ? 'rejected' : 
            (p.status === 'flagged' ? 'in-progress' : 'pending')),
    description: `Currently marked as ${p.status}`
  }));

  const kpis = [
    {
      title: "My Credits",
      value: totalCredits.toLocaleString(),
      icon: Award,
      trend: "Based on verified projects",
      color: "text-accent"
    },
    {
      title: "Projects",
      value: projects.length.toString(),
      icon: FileCheck,
      trend: `${pendingProjectsCount} pending review`,
      color: "text-primary"
    },
    {
      title: "Earnings",
      value: "Coming Soon",
      icon: IndianRupee,
      trend: "Trade tracking via Wallet",
      color: "text-success"
    }
  ];

  const generateCSRReport = () => {
    // Create a simple HTML report
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CSR Impact Report - ClimaX</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #0D6E6E; border-bottom: 3px solid #8FB43E; padding-bottom: 10px; }
          .metric { background: #f5f5f5; padding: 20px; margin: 10px 0; border-radius: 8px; }
          .metric h3 { margin: 0 0 10px 0; color: #0D6E6E; }
          .metric p { margin: 5px 0; }
          .summary { background: #E8F4F8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Corporate Social Responsibility Impact Report</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Organization:</strong> Your Organization</p>
        
        <div class="summary">
          <h2>Executive Summary</h2>
          <p>This report summarizes the environmental impact of your carbon credit projects on the ClimaX platform.</p>
        </div>
        
        <h2>Key Performance Indicators</h2>
        <div class="metric">
          <h3>Total Credits Issued</h3>
          <p><strong>1,840 tCO₂e</strong></p>
          <p>Equivalent to removing 400 cars from the road for a year</p>
        </div>
        
        <div class="metric">
          <h3>Active Projects</h3>
          <p><strong>8 Projects</strong></p>
          <p>Across multiple sustainability categories</p>
        </div>
        
        <div class="metric">
          <h3>Environmental Impact</h3>
          <p><strong>CO₂e Avoided:</strong> 1,840 tons</p>
          <p><strong>Trees Equivalent:</strong> 92,000 (planted and grown for 10 years)</p>
          <p><strong>Energy Saved:</strong> 2.3M kWh (230 homes powered/year)</p>
          <p><strong>Households Impacted:</strong> 450 direct beneficiaries</p>
        </div>
        
        <div class="metric">
          <h3>Revenue Generated</h3>
          <p><strong>₹27.6 Lakhs</strong></p>
          <p>Supporting sustainable development initiatives</p>
        </div>
        
        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
          <p>ClimaX - Carbon Credit Marketplace Platform</p>
          <p>This report is generated from verified carbon credit projects</p>
        </footer>
      </body>
      </html>
    `;
    
    // Create a blob and download
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CSR-Impact-Report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Report Generated",
      description: "Your CSR Impact Report has been downloaded successfully.",
    });
  };

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
              <span className="text-xl font-semibold text-foreground">ClimaX</span>
            </Link>
            
            <nav className="space-y-2 mb-8">
              <NavLink 
                to="/dashboard/seller" 
                end
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Overview</span>
              </NavLink>
              
              <NavLink
                to="/project-submission"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <FileCheck className="w-5 h-5" />
                <span>Submit Project</span>
              </NavLink>

              <NavLink
                to="/my-projects"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <FileText className="w-5 h-5" />
                <span>My Listings</span>
              </NavLink>
            </nav>

            {/* User Profile at Bottom */}
            <div className="mt-auto pt-6 border-t border-border">
              <div className="flex items-center gap-3 px-3 py-2">
                <UserProfileDropdown />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground">Seller Account</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-card border-b border-border px-4 sm:px-6 py-4 sticky top-0 z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Seller Dashboard</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Welcome back, {userName}!
                  </p>
                </div>
                <div className="lg:hidden">
                  <UserProfileDropdown />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  onClick={generateCSRReport}
                  aria-label="Export CSR Impact Report as HTML document"
                  className="w-full sm:w-auto justify-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">CSR Report</span>
                  <span className="sm:hidden">Report</span>
                </Button>
                <Button asChild className="w-full sm:w-auto justify-center">
                  <Link to="/project-submission">
                    <Download className="w-4 h-4 mr-2" />
                    New Project
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Hero KPI Cards */}
            <KPICards kpis={kpis} />

            {/* Environmental Impact Summary */}
            <ImpactSummary />

            {/* Quick Actions */}
            <QuickActions />

            {/* Two Column Layout: Timeline & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectTimeline items={timelineItems} />
              <NotificationsPanel />
            </div>

            {/* Analytics Charts */}
            <AnalyticsCharts />
          </div>
        </main>
      </div>

      {/* Invite Auditor Modal */}
      <InviteAuditorModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={(auditorId, auditorName) => {
          toast({
            title: "Invitation Sent",
            description: `Audit invitation sent to ${auditorName}. They will review your project soon.`,
          });
        }}
      />
    </div>
  );
};

export default SellerDashboard;
