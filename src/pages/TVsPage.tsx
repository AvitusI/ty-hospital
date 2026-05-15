
import { useState } from "react";
import { 
  Tv, Search, Filter, Edit, Settings, Power, AlertTriangle, Monitor, 
  RefreshCcw, Info, Wifi, WifiOff, Smartphone, HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// TV Device Interface
interface TVDevice {
  id: string;
  name: string;
  model: string;
  hospitalName: string;
  hospitalId: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  status: "online" | "offline" | "warning";
  lastOnline: string;
  lastContentPlayed: string;
  activeHours: number;
  storageUsed: number;
  storageTotal: number;
  firmwareVersion: string;
  contentScheduleId: string;
}

// Sample TV device data from Tanzanian hospitals
const initialDevices: TVDevice[] = [
  {
    id: "TV-MNH-001",
    name: "Reception TV 1",
    model: "Samsung Smart TV 43\"",
    hospitalName: "Muhimbili National Hospital",
    hospitalId: "1",
    location: "Main Reception",
    ipAddress: "192.168.1.100",
    macAddress: "00:1A:2B:3C:4D:5E",
    status: "online",
    lastOnline: "Current",
    lastContentPlayed: "COVID-19 Vaccination Campaign",
    activeHours: 8.5,
    storageUsed: 12,
    storageTotal: 32,
    firmwareVersion: "1.2.5",
    contentScheduleId: "SCH-001",
  },
  {
    id: "TV-MNH-002",
    name: "Waiting Area TV",
    model: "LG Smart TV 50\"",
    hospitalName: "Muhimbili National Hospital",
    hospitalId: "1",
    location: "Outpatient Waiting Area",
    ipAddress: "192.168.1.101",
    macAddress: "00:1A:2B:3C:4D:5F",
    status: "online",
    lastOnline: "Current",
    lastContentPlayed: "Malaria Prevention Guidelines",
    activeHours: 9.2,
    storageUsed: 10,
    storageTotal: 32,
    firmwareVersion: "1.2.5",
    contentScheduleId: "SCH-003",
  },
  {
    id: "TV-KCMC-001",
    name: "Main Lobby Display",
    model: "Sony Smart TV 55\"",
    hospitalName: "Kilimanjaro Christian Medical Centre",
    hospitalId: "2",
    location: "Main Lobby",
    ipAddress: "192.168.2.100",
    macAddress: "00:2C:3D:4E:5F:6G",
    status: "warning",
    lastOnline: "5 minutes ago",
    lastContentPlayed: "Diabetes Awareness Program",
    activeHours: 7.8,
    storageUsed: 28,
    storageTotal: 32,
    firmwareVersion: "1.2.4",
    contentScheduleId: "SCH-002",
  },
  {
    id: "TV-BMC-001",
    name: "Emergency Room Display",
    model: "Hisense Smart TV 43\"",
    hospitalName: "Bugando Medical Centre",
    hospitalId: "5",
    location: "Emergency Department",
    ipAddress: "192.168.5.100",
    macAddress: "00:5F:6G:7H:8I:9J",
    status: "offline",
    lastOnline: "2 days ago",
    lastContentPlayed: "First Aid Guidelines",
    activeHours: 0,
    storageUsed: 15,
    storageTotal: 32,
    firmwareVersion: "1.2.3",
    contentScheduleId: "SCH-005",
  },
  {
    id: "TV-MMH-001",
    name: "Maternity Ward TV",
    model: "Samsung Smart TV 32\"",
    hospitalName: "Mnazi Mmoja Hospital",
    hospitalId: "6",
    location: "Maternity Ward",
    ipAddress: "192.168.6.100",
    macAddress: "00:6G:7H:8I:9J:0K",
    status: "online",
    lastOnline: "Current",
    lastContentPlayed: "Maternal Health Infographic",
    activeHours: 6.2,
    storageUsed: 8,
    storageTotal: 16,
    firmwareVersion: "1.2.5",
    contentScheduleId: "SCH-004",
  },
  {
    id: "TV-DRH-001",
    name: "Pediatric Ward Display",
    model: "TCL Smart TV 40\"",
    hospitalName: "Dodoma Regional Hospital",
    hospitalId: "4",
    location: "Pediatric Ward",
    ipAddress: "192.168.4.100",
    macAddress: "00:4E:5F:6G:7H:8I",
    status: "warning",
    lastOnline: "Current",
    lastContentPlayed: "Child Vaccination Schedule",
    activeHours: 5.5,
    storageUsed: 15,
    storageTotal: 16,
    firmwareVersion: "1.2.5",
    contentScheduleId: "SCH-006",
  },
  {
    id: "TV-MRH-001",
    name: "General Ward TV",
    model: "Philips Smart TV 48\"",
    hospitalName: "Mbeya Referral Hospital",
    hospitalId: "3",
    location: "General Ward",
    ipAddress: "192.168.3.100",
    macAddress: "00:3D:4E:5F:6G:7H",
    status: "offline",
    lastOnline: "3 days ago",
    lastContentPlayed: "Tuberculosis Awareness",
    activeHours: 0,
    storageUsed: 12,
    storageTotal: 32,
    firmwareVersion: "1.2.2",
    contentScheduleId: "SCH-007",
  },
];

export default function TVsPage() {
  const [devices, setDevices] = useState<TVDevice[]>(initialDevices);
  const [filteredDevices, setFilteredDevices] = useState<TVDevice[]>(devices);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<TVDevice | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
      contentScheduleId: "",
    },
  });

  // Filter devices based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = devices.filter((device) => 
      device.name.toLowerCase().includes(query.toLowerCase()) || 
      device.hospitalName.toLowerCase().includes(query.toLowerCase()) || 
      device.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDevices(filtered);
  };

  // View device details
  const handleViewDevice = (device: TVDevice) => {
    setSelectedDevice(device);
    setIsDetailsDialogOpen(true);
  };

  // Open edit dialog
  const handleEditDevice = (device: TVDevice) => {
    setSelectedDevice(device);
    form.reset({
      name: device.name,
      location: device.location,
      contentScheduleId: device.contentScheduleId,
    });
    setIsEditDialogOpen(true);
  };

  // Restart device
  const handleRestartDevice = (device: TVDevice) => {
    toast({
      title: "Restart Command Sent",
      description: `Attempting to restart ${device.name} at ${device.hospitalName}.`,
    });

    // Simulate restart process
    setTimeout(() => {
      toast({
        title: "Device Restarted",
        description: `${device.name} has been successfully restarted.`,
        variant: "success",
      });
    }, 3000);
  };

  // Power on/off device
  const handlePowerToggle = (device: TVDevice) => {
    const action = device.status === "offline" ? "power on" : "power off";
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Command Sent`,
      description: `Attempting to ${action} ${device.name} at ${device.hospitalName}.`,
    });

    // Update device status in state
    setTimeout(() => {
      const updatedDevices = devices.map(d => {
        if (d.id === device.id) {
          return {
            ...d, 
            status: d.status === "offline" ? "online" : "offline",
            lastOnline: d.status === "offline" ? "Current" : "Just now"
          };
        }
        return d;
      });
      setDevices(updatedDevices);
      setFilteredDevices(updatedDevices.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.location.toLowerCase().includes(searchQuery.toLowerCase())
      ));

      toast({
        title: `Device ${device.status === "offline" ? "Powered On" : "Powered Off"}`,
        description: `${device.name} has been successfully ${device.status === "offline" ? "powered on" : "powered off"}.`,
        variant: "success",
      });
    }, 2000);
  };

  // Save device edit
  const onSubmit = (data: any) => {
    if (selectedDevice) {
      const updatedDevices = devices.map(d => {
        if (d.id === selectedDevice.id) {
          return {
            ...d,
            name: data.name,
            location: data.location,
            contentScheduleId: data.contentScheduleId
          };
        }
        return d;
      });
      
      setDevices(updatedDevices);
      setFilteredDevices(updatedDevices.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.location.toLowerCase().includes(searchQuery.toLowerCase())
      ));

      toast({
        title: "Device Updated",
        description: `${data.name} information has been updated.`,
      });
      setIsEditDialogOpen(false);
    }
  };

  // Get summary statistics
  const deviceStats = {
    total: devices.length,
    online: devices.filter(d => d.status === "online").length,
    offline: devices.filter(d => d.status === "offline").length,
    warning: devices.filter(d => d.status === "warning").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">TV Devices</h2>
        <p className="text-muted-foreground">
          Monitor and manage TV devices across Tanzanian hospitals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {new Set(devices.map(d => d.hospitalId)).size} hospitals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Online Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deviceStats.online}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((deviceStats.online / deviceStats.total) * 100)}% of total devices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Offline Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{deviceStats.offline}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((deviceStats.offline / deviceStats.total) * 100)}% of total devices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warning Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{deviceStats.warning}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((deviceStats.warning / deviceStats.total) * 100)}% of total devices
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search devices by name, hospital or location..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Devices</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
          <TabsTrigger value="warning">Warning</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DeviceListTable 
            devices={filteredDevices}
            onViewDevice={handleViewDevice}
            onEditDevice={handleEditDevice}
            onRestartDevice={handleRestartDevice}
            onPowerToggle={handlePowerToggle}
          />
        </TabsContent>

        <TabsContent value="online">
          <DeviceListTable 
            devices={filteredDevices.filter(d => d.status === "online")}
            onViewDevice={handleViewDevice}
            onEditDevice={handleEditDevice}
            onRestartDevice={handleRestartDevice}
            onPowerToggle={handlePowerToggle}
          />
        </TabsContent>

        <TabsContent value="offline">
          <DeviceListTable 
            devices={filteredDevices.filter(d => d.status === "offline")}
            onViewDevice={handleViewDevice}
            onEditDevice={handleEditDevice}
            onRestartDevice={handleRestartDevice}
            onPowerToggle={handlePowerToggle}
          />
        </TabsContent>

        <TabsContent value="warning">
          <DeviceListTable 
            devices={filteredDevices.filter(d => d.status === "warning")}
            onViewDevice={handleViewDevice}
            onEditDevice={handleEditDevice}
            onRestartDevice={handleRestartDevice}
            onPowerToggle={handlePowerToggle}
          />
        </TabsContent>
      </Tabs>
      
      {/* Device Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Device Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected TV device
            </DialogDescription>
          </DialogHeader>
          
          {selectedDevice && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedDevice.name}</h3>
                <Badge 
                  className={cn(
                    selectedDevice.status === "online" && "bg-green-500",
                    selectedDevice.status === "warning" && "bg-amber-500",
                    selectedDevice.status === "offline" && "bg-red-500"
                  )}
                >
                  {selectedDevice.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Device Information</h4>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Model:</span>
                      <span className="text-sm font-medium">{selectedDevice.model}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Hospital:</span>
                      <span className="text-sm font-medium">{selectedDevice.hospitalName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm font-medium">{selectedDevice.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Last Online:</span>
                      <span className="text-sm font-medium">{selectedDevice.lastOnline}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Active Hours:</span>
                      <span className="text-sm font-medium">{selectedDevice.activeHours} hours today</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Technical Details</h4>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">IP Address:</span>
                      <span className="text-sm font-medium">{selectedDevice.ipAddress}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">MAC Address:</span>
                      <span className="text-sm font-medium">{selectedDevice.macAddress}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Storage:</span>
                      <span className="text-sm font-medium">
                        {selectedDevice.storageUsed} GB / {selectedDevice.storageTotal} GB
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Firmware:</span>
                      <span className="text-sm font-medium">v{selectedDevice.firmwareVersion}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm text-muted-foreground">Content Schedule:</span>
                      <span className="text-sm font-medium">{selectedDevice.contentScheduleId}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Current Status</h4>
                <div className="mt-2">
                  <p className="text-sm">
                    Last content played: <span className="font-medium">{selectedDevice.lastContentPlayed}</span>
                  </p>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePowerToggle(selectedDevice)}
                  >
                    <Power className="h-3.5 w-3.5 mr-1" />
                    {selectedDevice.status === "offline" ? "Power On" : "Power Off"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestartDevice(selectedDevice)}
                  >
                    <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                    Restart Device
                  </Button>
                </div>
                <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Device Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit TV Device</DialogTitle>
            <DialogDescription>
              Update device information and settings
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter device name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location in Hospital</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Main Reception" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contentScheduleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Schedule</FormLabel>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...field}
                    >
                      <option value="SCH-001">Standard Hospital Schedule</option>
                      <option value="SCH-002">Diabetes Awareness Focus</option>
                      <option value="SCH-003">Malaria Prevention Focus</option>
                      <option value="SCH-004">Maternal Health Focus</option>
                      <option value="SCH-005">Emergency Information</option>
                      <option value="SCH-006">Children's Health Focus</option>
                      <option value="SCH-007">Tuberculosis Awareness</option>
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// TV Devices list table component
function DeviceListTable({ 
  devices,
  onViewDevice,
  onEditDevice,
  onRestartDevice,
  onPowerToggle
}: { 
  devices: TVDevice[],
  onViewDevice: (device: TVDevice) => void,
  onEditDevice: (device: TVDevice) => void,
  onRestartDevice: (device: TVDevice) => void,
  onPowerToggle: (device: TVDevice) => void,
}) {
  if (devices.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Tv className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium">No devices found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
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
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Last Online</TableHead>
              <TableHead>Storage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>
                  <Badge 
                    className={cn(
                      "w-[70px] flex justify-center",
                      device.status === "online" && "bg-green-500 hover:bg-green-600",
                      device.status === "warning" && "bg-amber-500 hover:bg-amber-600",
                      device.status === "offline" && "bg-red-500 hover:bg-red-600",
                    )}
                  >
                    {device.status === "online" && <Wifi className="h-3 w-3 mr-1" />}
                    {device.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {device.status === "offline" && <WifiOff className="h-3 w-3 mr-1" />}
                    {device.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{device.name}</div>
                  <div className="text-xs text-muted-foreground">{device.model}</div>
                </TableCell>
                <TableCell>{device.hospitalName}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>{device.lastOnline}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <HardDrive className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <div className="text-sm">
                      {device.storageUsed}/{device.storageTotal} GB
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onViewDevice(device)}>
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEditDevice(device)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onRestartDevice(device)}>
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onPowerToggle(device)}>
                    <Power className="h-4 w-4" className={cn(
                      device.status === "offline" ? "text-green-500" : "text-red-500"
                    )} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
