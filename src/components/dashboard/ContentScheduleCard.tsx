
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ScheduledContent {
  id: string;
  title: string;
  type: "video" | "infographic" | "announcement";
  scheduledTime: string;
  duration: string;
  status: "scheduled" | "playing" | "completed";
  priority: "high" | "medium" | "low";
}

interface ContentScheduleCardProps {
  scheduledContent: ScheduledContent[];
}

export function ContentScheduleCard({ scheduledContent }: ContentScheduleCardProps) {
  const renderContentType = (type: ScheduledContent["type"]) => {
    switch (type) {
      case "video":
        return <Video size={14} />;
      default:
        return <Video size={14} />;
    }
  };

  const renderStatusBadge = (status: ScheduledContent["status"]) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="ml-2">
            Scheduled
          </Badge>
        );
      case "playing":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 ml-2">
            Playing
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="secondary" className="ml-2">
            Completed
          </Badge>
        );
    }
  };

  const getPriorityClass = (priority: ScheduledContent["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-health-red";
      case "medium":
        return "border-l-health-amber";
      case "low":
        return "border-l-health-green";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle className="text-lg">Content Schedule</CardTitle>
        </div>
        <Button className="ml-auto" variant="outline" size="sm" asChild>
          <a href="/content">
            Manage Content
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-1">
          {scheduledContent.map((content) => (
            <div
              key={content.id}
              className={`flex items-center border-l-4 p-3 rounded-md bg-card hover:bg-accent/50 transition-colors ${getPriorityClass(
                content.priority
              )}`}
            >
              <div className="mr-3 bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                {renderContentType(content.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <p className="text-sm font-medium truncate">{content.title}</p>
                  {renderStatusBadge(content.status)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar size={12} className="mr-1" />
                  <span>{content.scheduledTime}</span>
                  <span className="mx-1">•</span>
                  <span>{content.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
