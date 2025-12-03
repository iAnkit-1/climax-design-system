import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileCheck, XCircle } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "pending" | "rejected";
  description: string;
}

interface ProjectTimelineProps {
  items: TimelineItem[];
}

const statusConfig = {
  completed: { 
    icon: CheckCircle2, 
    color: "bg-success/10 text-success border-success/20",
    dotColor: "bg-success"
  },
  "in-progress": { 
    icon: FileCheck, 
    color: "bg-info/10 text-info border-info/20",
    dotColor: "bg-info"
  },
  pending: { 
    icon: Clock, 
    color: "bg-warning/10 text-warning border-warning/20",
    dotColor: "bg-warning"
  },
  rejected: { 
    icon: XCircle, 
    color: "bg-destructive/10 text-destructive border-destructive/20",
    dotColor: "bg-destructive"
  }
};

export const ProjectTimeline = ({ items }: ProjectTimelineProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Project Timeline</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="relative space-y-3 sm:space-y-4">
          {items.map((item, index) => {
            const config = statusConfig[item.status];
            const StatusIcon = config.icon;
            const isLast = index === items.length - 1;
            
            return (
              <div key={item.id} className="relative flex gap-2 sm:gap-4">
                {!isLast && (
                  <div className="absolute left-2 top-8 bottom-0 w-[2px] bg-border" />
                )}
                <div className={`w-4 h-4 rounded-full ${config.dotColor} mt-1.5 z-10 ring-4 ring-background flex-shrink-0`} />
                <div className="flex-1 pb-3 sm:pb-4 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h4 className="font-medium text-foreground text-sm truncate">{item.title}</h4>
                    <Badge variant="outline" className={`${config.color} text-xs w-fit`}>
                      <StatusIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}</span>
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 line-clamp-2">{item.description}</p>
                  <time className="text-xs text-muted-foreground">{item.date}</time>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
