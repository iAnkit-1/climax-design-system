import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Link2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const AdminRegistry = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/admin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-5 h-5" />
                ICM Registry Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Connect verified carbon credit projects to the Indian Carbon Market (ICM) government registry.
                This integration ensures compliance with national regulations and enables transparent tracking.
              </p>
              
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Registry Status: Connected</p>
                <p className="text-sm text-muted-foreground">Last synced: 2 hours ago</p>
              </div>

              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open ICM Portal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Registry integration settings and configuration options.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistry;
