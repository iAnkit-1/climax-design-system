import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  TrendingUp, 
  Leaf, 
  ArrowRight,
  Download,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { UserProfileDropdown } from "@/components/dashboard/UserProfileDropdown";

const BuyerDashboard = () => {
  const userName = localStorage.getItem("userName") || "User";
  
  const kpis = [
    {
      title: "Total Credits Purchased",
      value: "1,250",
      icon: Leaf,
      trend: "+150 this month",
      color: "text-success"
    },
    {
      title: "Credits Retired",
      value: "820",
      icon: FileText,
      trend: "65.6% of portfolio",
      color: "text-primary"
    },
    {
      title: "Portfolio Value",
      value: "₹18.75L",
      icon: TrendingUp,
      trend: "+12.3% this month",
      color: "text-accent"
    },
    {
      title: "Available Credits",
      value: "430",
      icon: ShoppingCart,
      trend: "Ready to use",
      color: "text-info"
    }
  ];

  const recentPurchases = [
    {
      id: "TXN-2401",
      project: "Community Solar Installation - Phase 1",
      credits: 250,
      price: "₹3,75,000",
      date: "2025-01-15",
      status: "completed"
    },
    {
      id: "TXN-2398",
      project: "Agricultural Biogas Plant",
      credits: 180,
      price: "₹2,70,000",
      date: "2025-01-12",
      status: "completed"
    },
    {
      id: "TXN-2395",
      project: "Urban Afforestation Initiative",
      credits: 120,
      price: "₹1,80,000",
      date: "2025-01-08",
      status: "completed"
    }
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
              <span className="text-xl font-semibold text-foreground">ClimaX</span>
            </Link>
            
            <nav className="space-y-2">
              <NavLink 
                to="/dashboard/buyer" 
                end
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Overview</span>
              </NavLink>
              
              <NavLink
                to="/marketplace"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Marketplace</span>
              </NavLink>

              <NavLink
                to="/wallet"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-climax"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <Leaf className="w-5 h-5" />
                <span>My Wallet</span>
              </NavLink>
            </nav>

            {/* User Profile at Bottom */}
            <div className="mt-auto pt-6 border-t border-border">
              <div className="flex items-center gap-3 px-3 py-2">
                <UserProfileDropdown />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground">Buyer Account</p>
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
                  <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Buyer Dashboard</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Welcome back, {userName}!
                  </p>
                </div>
                <div className="lg:hidden">
                  <UserProfileDropdown />
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/marketplace">
                  <span>Browse Credits</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {kpi.trend}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Purchases */}
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle>Recent Purchases</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/transactions">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-2 px-2">
                  <div className="space-y-4 min-w-[320px]">
                    {recentPurchases.map((purchase) => (
                      <div 
                        key={purchase.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b last:border-0 gap-3"
                      >
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-foreground">
                              {purchase.project}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {purchase.credits} credits
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                            <span>{purchase.id}</span>
                            <span>{purchase.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:text-right gap-2">
                          <p className="text-sm font-semibold text-foreground">{purchase.price}</p>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Download className="w-3 h-3 sm:mr-1" />
                            <span className="hidden sm:inline">Receipt</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-success mb-2">820</div>
                    <p className="text-sm text-muted-foreground">Credits Retired</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Equivalent to 820 tonnes CO₂ offset
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">12</div>
                    <p className="text-sm text-muted-foreground">Projects Supported</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Across 6 Indian states
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-2">95%</div>
                    <p className="text-sm text-muted-foreground">Verification Rate</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      All credits verified by ACVA
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
