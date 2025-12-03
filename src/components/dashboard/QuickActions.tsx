import { Card, CardContent } from "@/components/ui/card";
import { Plus, UserPlus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import InviteAuditorModal from "@/components/seller/InviteAuditorModal";
import { toast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      primary: { bg: "bg-primary/10", text: "text-primary" },
      info: { bg: "bg-info/10", text: "text-info" },
      success: { bg: "bg-success/10", text: "text-success" },
    };
    return colorMap[color] || colorMap.primary;
  };

  const handleInviteAuditor = (auditorId: string, auditorName: string) => {
    toast({
      title: "Invitation Sent",
      description: `Audit invitation sent to ${auditorName}. They will review your project soon.`,
    });
  };

  return (
    <>
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        role="list"
        aria-label="Quick action shortcuts"
      >
        {/* Submit Project */}
        <div role="listitem">
          <Link 
            to="/project-submission"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[var(--radius)]"
            aria-label="Submit Project: Start a new sustainability project"
          >
            <Card className="hover-card cursor-pointer h-full transition-climax">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Submit Project</h3>
                    <p className="text-xs text-muted-foreground">Start a new sustainability project</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Invite Auditor */}
        <div role="listitem">
          <div
            onClick={() => setInviteModalOpen(true)}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[var(--radius)] cursor-pointer"
            aria-label="Invite Auditor: Request verification for your project"
          >
            <Card className="hover-card cursor-pointer h-full transition-climax">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Invite Auditor</h3>
                    <p className="text-xs text-muted-foreground">Request verification for your project</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* List Credits */}
        <div role="listitem">
          <Link 
            to="/marketplace"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[var(--radius)]"
            aria-label="List Credits: Make your credits available on marketplace"
          >
            <Card className="hover-card cursor-pointer h-full transition-climax">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">List Credits</h3>
                    <p className="text-xs text-muted-foreground">Make your credits available on marketplace</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <InviteAuditorModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInviteAuditor}
      />
    </>
  );
};