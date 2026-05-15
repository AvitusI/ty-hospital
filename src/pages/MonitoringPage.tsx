
import { useState } from "react";
import { 
  Monitor, AlertTriangle, CheckCircle, Wifi, WifiOff, 
  RefreshCw, Filter, Search, ArrowDown, ArrowUp, Clock, Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Alert interface
interface Alert {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  hospital: string;
  device?: string;
  timestamp: string;
  status: "new" | "acknowledged" | "resolved";
  priority: "high" | "medium" | "low";
}

// Live Stream Status interface
interface LiveStreamStatus {
  id: string;
  hospitalName: string;
  region: string;
  status: "online" | "degraded" | "offline";
  bandwidth: number;
  latency: number;
  lastChecked: string;
  uptime: number;
  viewers: number;
}

// System Health interface
interface SystemHealth {
  id: string;
  component: string;
  status: "operational" | "degraded" | "outage";
  message: string;
  lastUpdated: string;
}

// Sample Tanzania MoH monitoring data
const initialAlerts: Alert[] = [
  {
    id: "ALT-001",
    type: "error",
    title: "TV Offline",
    message: "TV device in Main Reception has been offline for more than 24 hours",
    hospital: "Mbeya Referral Hospital",
    device: "TV-MRH-001",
    timestamp: "2024-04-03 08:45:22",
    status: "new",
    priority: "high",
  },
  {
    id: "ALT-002",
    type: "warning",
    title: "Low Storage Space",
    message: "TV device is running low on storage space (< 10% remaining)",
    hospital: "Dodoma Regional Hospital",
    device: "TV-DRH-001",
    timestamp: "2024-04-03 09:12:05",
    status: "acknowledged",
    priority: "medium",
  },
  {
    id: "ALT-003",
    type: "error",
    title: "Content Delivery Failure",
    message: "Failed to deliver scheduled content to multiple devices",
    hospital: "Kilimanjaro Christian Medical Centre",
    timestamp: "2024-04-03 07:30:18",
    status: "new",
    priority: "high",
  },
  {
    id: "ALT-004",
    type: "warning",
    title: "Network Degradation",
    message: "Network performance issues detected at hospital",
    hospital: "Bugando Medical Centre",
    timestamp: "2024-04-02 16:45:33",
    status: "acknowledged",
    priority: "medium",
  },
  {
    id: "ALT-005",
    type: "info",
    title: "Content Update Available",
    message: "New COVID-19 vaccination guidelines available for publishing",
    hospital: "All Hospitals",
    timestamp: "2024-04-02 14:22:10",
    status: "new",
    priority: "low",
  },
  {
    id: "ALT-006",
    type: "warning",
    title: "Scheduled Maintenance",
    message: "System maintenance scheduled for tonight at 02:00 AM",
    hospital: "All Hospitals",
    timestamp: "2024-04-03 09:00:00",
    status: "acknowledged",
    priority: "low",
  },
  {
    id: "ALT-007",
    type: "error",
    title: "Content Approval Required",
    message: "Emergency cholera prevention content awaiting approval",
    hospital: "Ministry of Health",
    timestamp: "2024-04-03 08:15:45",
    status: "new",
    priority: "high",
  },
];

const initialStreamStatus: LiveStreamStatus[] = [
  {
    id: "STR-001",
    hospitalName: "Muhimbili National Hospital",
    region: "Dar es Salaam",
    status: "online",
    bandwidth: 4.8,
    latency: 120,
    lastChecked: "2 minutes ago",
    uptime: 99.8,
    viewers: 58,
  },
  {
    id: "STR-002",
    hospitalName: "Kilimanjaro Christian Medical Centre",
    region: "Kilimanjaro",
    status: "degraded",
    bandwidth: 2.1,
    latency: 450,
    lastChecked: "5 minutes ago",
    uptime: 96.2,
    viewers: 22,
  },
  {
    id: "STR-003",
    hospitalName: "Mbeya Referral Hospital",
    region: "Mbeya",
    status: "offline",
    bandwidth: 0,
    latency: 0,
    lastChecked: "15 minutes ago",
    uptime: 82.5,
    viewers: 0,
  },
  {
    id: "STR-004",
    hospitalName: "Dodoma Regional Hospital",
    region: "Dodoma",
    status: "online",
    bandwidth: 3.9,
    latency: 180,
    lastChecked: "3 minutes ago",
    uptime: 98.7,
    viewers: 24,
  },
  {
    id: "STR-005",
    hospitalName: "Bugando Medical Centre",
    region: "Mwanza",
    status: "online",
    bandwidth: 4.2,
    latency: 150,
    lastChecked: "1 minute ago",
    uptime: 99.1,
    viewers: 32,
  },
];

const systemHealthData: SystemHealth[] = [
  {
    id: "SYS-001",
    component: "Content Delivery Network",
    status: "operational",
    message: "All systems operational",
    lastUpdated: "2024-04-03 09:30:00",
  },
  {
    id: "SYS-002",
    component: "Database Servers",
    status: "operational",
    message: "All systems operational",
    lastUpdated: "2024-04-03 09:30:00",
  },
  {
    id: "SYS-003",
    component: "API Services",
    status: "operational",
    message: "All systems operational",
    lastUpdated: "2024-04-03 09:30:00",
  },
  {
    id: "SYS-004",
    component: "Storage Services",
    status: "degraded",
    message: "Experiencing higher than normal latency",
    lastUpdated: "2024-04-03 09:15:22",
  },
  {
    id: "SYS-005",
    component: "Authentication Services",
    status: "operational",
    message: "All systems operational",
    lastUpdated: "2024-04-03 09:30:00",
  },
  {
    id: "SYS-006",
    component: "SMS Notification Service",
    status: "outage",
    message: "Service currently unavailable",
    lastUpdated: "2024-04-03 08:45:12",
  },
  {
    id: "SYS-007",
    component: "Monitoring Services",
    status: "operational",
    message: "All systems operational",
    lastUpdated: "2024-04-03 09:30:00",
  },
];

export default function MonitoringPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [streamStatus, setStreamStatus] = useState<LiveStreamStatus[]>(initialStreamStatus);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(alerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter alerts based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = alerts.filter((alert) => 
      alert.title.toLowerCase().includes(query.toLowerCase()) || 
      alert.message.toLowerCase().includes(query.toLowerCase()) || 
      alert.hospital.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAlerts(filtered);
  };

  // View alert details
  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsAlertDialogOpen(true);
  };

  // Acknowledge alert
  const handleAcknowledgeAlert = (alert: Alert) => {
    const updatedAlerts = alerts.map(a => {
      if (a.id === alert.id) {
        return { ...a, status: "acknowledged" as const };
      }
      return a;
    });
    
    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    toast({
      title: "Alert Acknowledged",
      description: `${alert.title} has been acknowledged.`,
    });
  };

  // Resolve alert
  const handleResolveAlert = (alert: Alert) => {
    const updatedAlerts = alerts.map(a => {
      if (a.id === alert.id) {
        return { ...a, status: "resolved" as const };
      }
      return a;
    });
    
    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    toast({
      title: "Alert Resolved",
      description: `${alert.title} has been resolved.`,
    });

    if (isAlertDialogOpen) {
      setIsAlertDialogOpen(false);
    }
  };

  // Refresh monitoring data
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh with a delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Monitoring Data Refreshed",
        description: "All monitoring data has been updated.",
      });
    }, 1500);
  };

  // Get summary statistics
  const alertStats = {
    total: alerts.length,
    unresolved: alerts.filter(a => a.status !== "resolved").length,
    high: alerts.filter(a => a.priority === "high" && a.status !== "resolved").length,
    medium: alerts.filter(a => a.priority === "medium" && a.status !== "resolved").length,
    low: alerts.filter(a => a.priority === "low" && a.status !== "resolved").length,
  };

  // Get system health summary
  const systemHealthSummary = {
    operational: systemHealthData.filter(s => s.status === "operational").length,
    degraded: systemHealthData.filter(s => s.status === "degraded").length,
    outage: systemHealthData.filter(s => s.status === "outage").length,
  };

  // Overall system status
  const overallStatus = systemHealthSummary.outage > 0 
    ? "outage" 
    : systemHealthSummary.degraded > 0 
      ? "degraded" 
      : "operational";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Real-time Monitoring</h2>
          <p className="text-muted-foreground">
            Monitor the health of the Tanzania MoH TV network and content delivery system
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} /> 
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className={cn(
          overallStatus === "operational" && "border-green-500",
          overallStatus === "degraded" && "border-amber-500",
          overallStatus === "outage" && "border-red-500",
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {overallStatus === "operational" && <CheckCircle className="h-4 w-4 mr-2 text-green-500" />}
              {overallStatus === "degraded" && <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />}
              {overallStatus === "outage" && <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />}
              <span className={cn(
                "font-bold capitalize",
                overallStatus === "operational" && "text-green-500",
                overallStatus === "degraded" && "text-amber-500",
                overallStatus === "outage" && "text-red-500",
              )}>
                {overallStatus}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {systemHealthSummary.operational} of {systemHealthData.length} systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertStats.unresolved}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-red-500 font-medium mr-1">{alertStats.high} high</span> |
              <span className="text-amber-500 font-medium mx-1">{alertStats.medium} medium</span> |
              <span className="text-blue-500 font-medium ml-1">{alertStats.low} low</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">TV Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="text-center px-2 py-1 bg-green-100 rounded-md flex-1">
                <div className="text-xl font-bold text-green-600">42</div>
                <div className="text-xs text-green-600">Online</div>
              </div>
              <div className="text-center px-2 py-1 bg-amber-100 rounded-md flex-1">
                <div className="text-xl font-bold text-amber-600">7</div>
                <div className="text-xs text-amber-600">Warning</div>
              </div>
              <div className="text-center px-2 py-1 bg-red-100 rounded-md flex-1">
                <div className="text-xl font-bold text-red-600">3</div>
                <div className="text-xs text-red-600">Offline</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.8%</div>
            <div className="flex items-center text-xs mt-1">
              <span className="text-green-500 mr-1">↑ 0.3%</span>
              <span className="text-muted-foreground">from last hour</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="streams">Live Streams</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search alerts by title, message or hospital..."
                className="pl-8 bg-white"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <AlertsTable 
            alerts={filteredAlerts}
            onViewAlert={handleViewAlert}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onResolveAlert={handleResolveAlert}
          />
        </TabsContent>

        <TabsContent value="streams">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Bandwidth</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Viewers</TableHead>
                    <TableHead>Last Checked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {streamStatus.map((stream) => (
                    <TableRow key={stream.id}>
                      <TableCell>
                        <Badge 
                          className={cn(
                            "w-[80px] flex justify-center",
                            stream.status === "online" && "bg-green-500 hover:bg-green-600",
                            stream.status === "degraded" && "bg-amber-500 hover:bg-amber-600",
                            stream.status === "offline" && "bg-red-500 hover:bg-red-600",
                          )}
                        >
                          {stream.status === "online" && <Wifi className="h-3 w-3 mr-1" />}
                          {stream.status === "degraded" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {stream.status === "offline" && <WifiOff className="h-3 w-3 mr-1" />}
                          {stream.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{stream.hospitalName}</TableCell>
                      <TableCell>{stream.region}</TableCell>
                      <TableCell>{stream.bandwidth > 0 ? `${stream.bandwidth} Mbps` : '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {stream.latency > 0 ? (
                            <>
                              <Badge
                                className={cn(
                                  "h-2 w-2 rounded-full mr-1",
                                  stream.latency < 200 && "bg-green-500",
                                  stream.latency >= 200 && stream.latency < 400 && "bg-amber-500",
                                  stream.latency >= 400 && "bg-red-500",
                                )}
                              />
                              {stream.latency} ms
                            </>
                          ) : '-'}
                        </div>
                      </TableCell>
                      <TableCell>{stream.uptime > 0 ? `${stream.uptime}%` : '-'}</TableCell>
                      <TableCell>{stream.viewers}</TableCell>
                      <TableCell>{stream.lastChecked}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemHealthData.map((component) => (
                    <TableRow key={component.id}>
                      <TableCell>
                        <Badge 
                          className={cn(
                            component.status === "operational" && "bg-green-500",
                            component.status === "degraded" && "bg-amber-500",
                            component.status === "outage" && "bg-red-500",
                          )}
                        >
                          {component.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{component.component}</TableCell>
                      <TableCell>{component.message}</TableCell>
                      <TableCell>{component.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Alert Detail Dialog */}
      <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Alert Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected alert
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {selectedAlert.type === "error" && <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />}
                  {selectedAlert.type === "warning" && <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />}
                  {selectedAlert.type === "info" && <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />}
                  <h3 className="text-lg font-semibold">{selectedAlert.title}</h3>
                </div>
                <Badge 
                  className={cn(
                    selectedAlert.priority === "high" && "bg-red-500",
                    selectedAlert.priority === "medium" && "bg-amber-500",
                    selectedAlert.priority === "low" && "bg-blue-500",
                  )}
                >
                  {selectedAlert.priority} priority
                </Badge>
              </div>
              
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Message</h4>
                  <p className="mt-1">{selectedAlert.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Hospital</h4>
                    <p className="mt-1 font-medium">{selectedAlert.hospital}</p>
                  </div>
                  
                  {selectedAlert.device && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Device ID</h4>
                      <p className="mt-1 font-medium">{selectedAlert.device}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                    <Badge 
                      className={cn(
                        "mt-1",
                        selectedAlert.status === "new" && "bg-blue-500",
                        selectedAlert.status === "acknowledged" && "bg-amber-500",
                        selectedAlert.status === "resolved" && "bg-green-500",
                      )}
                    >
                      {selectedAlert.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Timestamp</h4>
                    <p className="mt-1">{selectedAlert.timestamp}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Recommended Actions</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {selectedAlert.type === "error" && selectedAlert.title.includes("Offline") && (
                    <>
                      <li>Check physical connection of the TV device</li>
                      <li>Verify hospital network connectivity</li>
                      <li>Attempt remote restart of the device</li>
                      <li>Contact hospital IT administrator</li>
                    </>
                  )}
                  {selectedAlert.title.includes("Storage") && (
                    <>
                      <li>Delete old or unused content from the device</li>
                      <li>Verify proper content rotation schedule</li>
                      <li>Consider upgrading device storage</li>
                    </>
                  )}
                  {selectedAlert.title.includes("Content Delivery") && (
                    <>
                      <li>Check CDN status and connectivity</li>
                      <li>Verify hospital network bandwidth</li>
                      <li>Attempt rescheduling content delivery</li>
                    </>
                  )}
                  {selectedAlert.title.includes("Approval") && (
                    <>
                      <li>Review pending content in Content Management</li>
                      <li>Approve or reject based on MoH guidelines</li>
                      <li>Prioritize emergency public health content</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedAlert && selectedAlert.status !== "resolved" && (
              <div className="flex w-full justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAlertDialogOpen(false)}
                >
                  Close
                </Button>
                <div className="space-x-2">
                  {selectedAlert.status === "new" && (
                    <Button 
                      variant="secondary" 
                      onClick={() => handleAcknowledgeAlert(selectedAlert)}
                    >
                      Acknowledge
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleResolveAlert(selectedAlert)}
                  >
                    Mark as Resolved
                  </Button>
                </div>
              </div>
            )}
            {selectedAlert && selectedAlert.status === "resolved" && (
              <Button 
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Alerts table component
function AlertsTable({ 
  alerts,
  onViewAlert,
  onAcknowledgeAlert,
  onResolveAlert,
}: { 
  alerts: Alert[],
  onViewAlert: (alert: Alert) => void,
  onAcknowledgeAlert: (alert: Alert) => void,
  onResolveAlert: (alert: Alert) => void,
}) {
  if (alerts.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-500 opacity-50 mb-4" />
          <h3 className="text-lg font-medium">No active alerts</h3>
          <p className="text-sm text-muted-foreground">All systems are operating normally</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Alert</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <Badge 
                    className={cn(
                      alert.status === "new" && "bg-blue-500 hover:bg-blue-600",
                      alert.status === "acknowledged" && "bg-amber-500 hover:bg-amber-600",
                      alert.status === "resolved" && "bg-green-500 hover:bg-green-600",
                    )}
                  >
                    {alert.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-start">
                    {alert.type === "error" && <AlertTriangle className="h-4 w-4 mr-2 text-red-500 mt-0.5" />}
                    {alert.type === "warning" && <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />}
                    {alert.type === "info" && <CheckCircle className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />}
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[250px]">
                        {alert.message}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{alert.hospital}</TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "border",
                      alert.priority === "high" && "border-red-200 text-red-600 bg-red-50",
                      alert.priority === "medium" && "border-amber-200 text-amber-600 bg-amber-50",
                      alert.priority === "low" && "border-blue-200 text-blue-600 bg-blue-50",
                    )}
                    variant="outline"
                  >
                    {alert.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-xs">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    {alert.timestamp}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewAlert(alert)}>
                    View
                  </Button>
                  {alert.status === "new" && (
                    <Button variant="ghost" size="sm" onClick={() => onAcknowledgeAlert(alert)}>
                      Acknowledge
                    </Button>
                  )}
                  {alert.status !== "resolved" && (
                    <Button variant="ghost" size="sm" onClick={() => onResolveAlert(alert)}>
                      Resolve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
