import { Home, ShoppingBag, PlusCircle, Wallet, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", icon: Home, href: "/", ariaLabel: "Navigate to home page" },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag, href: "/marketplace", ariaLabel: "Browse carbon credit marketplace" },
  { id: "submit", label: "Submit", icon: PlusCircle, href: "/project-submission", ariaLabel: "Submit new project" },
  { id: "dashboard", label: "Dashboard", icon: Wallet, href: "/dashboard", ariaLabel: "View dashboard" },
  { id: "profile", label: "Profile", icon: User, href: "/dashboard", ariaLabel: "View profile and settings" },
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.href;

          return (
            <Link
              key={tab.id}
              to={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-climax min-w-[44px] min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              aria-label={tab.ariaLabel}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
