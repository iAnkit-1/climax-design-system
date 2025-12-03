import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Project Approved",
    message: "Community Solar Installation - Phase 1 has been approved and 450 credits issued",
    time: "2 hours ago",
    read: false
  },
  {
    id: "2",
    type: "info",
    title: "Audit Scheduled",
    message: "Your Agricultural Biogas Plant project audit is scheduled for Jan 25, 2025",
    time: "5 hours ago",
    read: false
  },
  {
    id: "3",
    type: "warning",
    title: "Documentation Required",
    message: "Additional documentation needed for Waste-to-Energy Facility project",
    time: "1 day ago",
    read: true
  },
  {
    id: "4",
    type: "success",
    title: "Payment Received",
    message: "₹6,75,000 credited to your account for 450 carbon credits",
    time: "2 days ago",
    read: true
  },
];

const notificationConfig = {
  success: { 
    icon: CheckCircle2, 
    color: "text-success",
    bgColor: "bg-success/10"
  },
  warning: { 
    icon: AlertCircle, 
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  info: { 
    icon: Info, 
    color: "text-info",
    bgColor: "bg-info/10"
  }
};

export const NotificationsPanel = () => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="default" className="bg-primary text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" className="min-h-[44px] w-full sm:w-auto">
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <ScrollArea className="h-[300px] sm:h-[400px] pr-2 sm:pr-4">
          <div className="space-y-2 sm:space-y-3">
            {mockNotifications.map((notification) => {
              const config = notificationConfig[notification.type];
              const NotificationIcon = config.icon;
              
              return (
                <div
                  key={notification.id}
                  className={`p-3 sm:p-4 border border-border rounded-lg transition-climax hover:bg-muted/50 ${
                    !notification.read ? "bg-muted/30" : ""
                  }`}
                >
                  <div className="flex gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <NotificationIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {notification.title}
                        </h4>
                        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-6 sm:w-6 -mt-1 flex-shrink-0 min-w-[32px] sm:min-w-[24px]">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <time className="text-xs text-muted-foreground">
                        {notification.time}
                      </time>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
