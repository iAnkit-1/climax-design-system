import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Wifi, WifiOff } from "lucide-react";
import { ProjectFormData } from "@/pages/ProjectSubmission";

interface Props {
  data: ProjectFormData;
  updateData: (data: Partial<ProjectFormData>) => void;
}

export default function IoTConnectorForm({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          IoT Data Connector
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Connect IoT devices for real-time monitoring (optional)
        </p>
      </div>
      
      <Card variant="flat" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {data.iotConnected ? (
              <Wifi className="w-5 h-5 text-accent" />
            ) : (
              <WifiOff className="w-5 h-5 text-muted-foreground" />
            )}
            <div>
              <Label className="text-foreground font-medium">
                Enable IoT Integration
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Connect smart meters or sensors for automated data collection
              </p>
            </div>
          </div>
          <Switch
            checked={data.iotConnected}
            onCheckedChange={(checked) => updateData({ iotConnected: checked })}
          />
        </div>
        
        {data.iotConnected && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <Label htmlFor="iotDeviceId" className="text-foreground">
                Device ID
              </Label>
              <Input
                id="iotDeviceId"
                value={data.iotDeviceId}
                onChange={(e) => updateData({ iotDeviceId: e.target.value })}
                placeholder="e.g., DEVICE-1234-5678"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Enter your IoT device identifier for data sync
              </p>
            </div>
            
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-foreground font-medium mb-2">
                Coming Soon: Real-time Monitoring
              </p>
              <p className="text-xs text-muted-foreground">
                IoT integration will enable automatic data collection from smart meters, 
                sensors, and monitoring devices. This feature is currently in development.
              </p>
            </div>
          </div>
        )}
      </Card>
      
      {!data.iotConnected && (
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            IoT integration is optional. You can continue with manual data reporting 
            and enable IoT connectivity later from your project dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
