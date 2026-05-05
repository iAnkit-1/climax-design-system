// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Settings } from "lucide-react";
// import { Link } from "react-router-dom";

// const AdminSettings = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Button variant="ghost" asChild className="mb-6">
//           <Link to="/admin">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Admin Dashboard
//           </Link>
//         </Button>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Settings className="w-5 h-5" />
//               System Settings
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground">
//               Configure platform-wide settings, integrations, and system parameters.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AdminSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['adminSettings'],
    queryFn: async () => {
      const response = await api.get('/admin/settings');
      return response.data;
    }
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put('/admin/settings', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSettings'] });
      toast({ title: "Success", description: "Settings updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update settings", variant: "destructive" });
    }
  });

  const [platformSettings, setPlatformSettings] = useState({
    platformFee: 2.5,
    minCreditPrice: 10,
    maxCreditPrice: 1000,
    auditDeadlineDays: 14,
    requireAuditor: true,
    enableReferrals: true,
    registrationOpen: true
  });

  const handleSave = () => {
    updateSettingsMutation.mutate(platformSettings);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground">Configure platform-wide settings and parameters</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
              <CardDescription>General platform settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable new user registrations</p>
                </div>
                <Switch
                  checked={platformSettings.registrationOpen}
                  onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, registrationOpen: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Auditor for Projects</Label>
                  <p className="text-sm text-muted-foreground">Make auditor selection mandatory for project submission</p>
                </div>
                <Switch
                  checked={platformSettings.requireAuditor}
                  onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, requireAuditor: checked })}
                />
              </div>

              <div>
                <Label>Audit Deadline (Days)</Label>
                <Input
                  type="number"
                  value={platformSettings.auditDeadlineDays}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, auditDeadlineDays: parseInt(e.target.value) })}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">Number of days for auditors to complete review</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Settings</CardTitle>
              <CardDescription>Configure platform fees and credit pricing limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Platform Fee (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={platformSettings.platformFee}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, platformFee: parseFloat(e.target.value) })}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">Percentage fee charged on each transaction</p>
              </div>

              <div>
                <Label>Minimum Credit Price (₹)</Label>
                <Input
                  type="number"
                  value={platformSettings.minCreditPrice}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, minCreditPrice: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Maximum Credit Price (₹)</Label>
                <Input
                  type="number"
                  value={platformSettings.maxCreditPrice}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, maxCreditPrice: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
              <CardDescription>Regulatory and compliance configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Compliance settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
              <CardDescription>Configure referral program settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Referral Program</Label>
                  <p className="text-sm text-muted-foreground">Allow users to earn from referrals</p>
                </div>
                <Switch
                  checked={platformSettings.enableReferrals}
                  onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, enableReferrals: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={updateSettingsMutation.isPending}>
          {updateSettingsMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}