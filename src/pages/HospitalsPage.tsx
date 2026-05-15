
import { useState } from "react";
import { Hospital as HospitalIcon, Plus, Search, Filter, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Hospital {
  id: string;
  name: string;
  location: string;
  region: string;
  type: "national" | "regional" | "district" | "health-center";
  activeDevices: number;
  totalDevices: number;
  status: "online" | "partial" | "offline";
  lastPing: string;
  contact: string;
}

// Tanzania hospitals data
const initialHospitals: Hospital[] = [
  {
    id: "1",
    name: "Muhimbili National Hospital",
    location: "Dar es Salaam",
    region: "Dar es Salaam",
    type: "national",
    activeDevices: 58,
    totalDevices: 65,
    status: "online",
    lastPing: "2 minutes ago",
    contact: "+255 22 215 1367",
  },
  {
    id: "2",
    name: "Kilimanjaro Christian Medical Centre",
    location: "Moshi",
    region: "Kilimanjaro",
    type: "regional",
    activeDevices: 32,
    totalDevices: 40,
    status: "partial",
    lastPing: "5 minutes ago",
    contact: "+255 27 275 3250",
  },
  {
    id: "3",
    name: "Mbeya Referral Hospital",
    location: "Mbeya",
    region: "Mbeya",
    type: "regional",
    activeDevices: 0,
    totalDevices: 25,
    status: "offline",
    lastPing: "3 hours ago",
    contact: "+255 25 250 3377",
  },
  {
    id: "4",
    name: "Dodoma Regional Hospital",
    location: "Dodoma",
    region: "Dodoma",
    type: "regional",
    activeDevices: 18,
    totalDevices: 22,
    status: "online",
    lastPing: "7 minutes ago",
    contact: "+255 26 232 4254",
  },
  {
    id: "5",
    name: "Bugando Medical Centre",
    location: "Mwanza",
    region: "Mwanza",
    type: "regional",
    activeDevices: 24,
    totalDevices: 35,
    status: "partial",
    lastPing: "15 minutes ago",
    contact: "+255 28 250 0261",
  },
  {
    id: "6",
    name: "Mnazi Mmoja Hospital",
    location: "Zanzibar",
    region: "Zanzibar",
    type: "regional",
    activeDevices: 12,
    totalDevices: 15,
    status: "online",
    lastPing: "12 minutes ago",
    contact: "+255 24 223 3233",
  },
  {
    id: "7",
    name: "Temeke Regional Referral Hospital",
    location: "Dar es Salaam",
    region: "Dar es Salaam",
    type: "regional",
    activeDevices: 28,
    totalDevices: 30,
    status: "online",
    lastPing: "4 minutes ago",
    contact: "+255 22 285 0019",
  },
  {
    id: "8",
    name: "Iringa Regional Hospital",
    location: "Iringa",
    region: "Iringa",
    type: "regional",
    activeDevices: 0,
    totalDevices: 18,
    status: "offline",
    lastPing: "1 day ago",
    contact: "+255 26 270 0180",
  },
];

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(hospitals);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentHospital, setCurrentHospital] = useState<Hospital | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
      region: "",
      type: "regional" as const,
      totalDevices: 0,
      contact: "",
    },
  });

  // Filter hospitals based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = hospitals.filter((hospital) => 
      hospital.name.toLowerCase().includes(query.toLowerCase()) || 
      hospital.location.toLowerCase().includes(query.toLowerCase()) ||
      hospital.region.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHospitals(filtered);
  };

  // Open dialog to add a new hospital
  const handleAddHospital = () => {
    setCurrentHospital(null);
    form.reset({
      name: "",
      location: "",
      region: "",
      type: "regional",
      totalDevices: 0,
      contact: "",
    });
    setIsDialogOpen(true);
  };

  // Open dialog to edit hospital
  const handleEditHospital = (hospital: Hospital) => {
    setCurrentHospital(hospital);
    form.reset({
      name: hospital.name,
      location: hospital.location,
      region: hospital.region,
      type: hospital.type,
      totalDevices: hospital.totalDevices,
      contact: hospital.contact,
    });
    setIsDialogOpen(true);
  };

  // Open confirmation dialog to delete hospital
  const handleDeletePrompt = (hospital: Hospital) => {
    setCurrentHospital(hospital);
    setIsDeleteDialogOpen(true);
  };

  // Delete hospital
  const handleDeleteHospital = () => {
    if (currentHospital) {
      const updatedHospitals = hospitals.filter(h => h.id !== currentHospital.id);
      setHospitals(updatedHospitals);
      setFilteredHospitals(updatedHospitals.filter((hospital) => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        hospital.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.region.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      toast({
        title: "Hospital Deleted",
        description: `${currentHospital.name} has been removed from the system.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  // Handle form submission (both add and edit)
  const onSubmit = (data: any) => {
    if (currentHospital) {
      // Edit existing hospital
      const updatedHospitals = hospitals.map(h => {
        if (h.id === currentHospital.id) {
          return {
            ...h,
            name: data.name,
            location: data.location,
            region: data.region,
            type: data.type,
            totalDevices: data.totalDevices,
            contact: data.contact,
          };
        }
        return h;
      });
      setHospitals(updatedHospitals);
      setFilteredHospitals(updatedHospitals.filter((hospital) => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        hospital.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.region.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      toast({
        title: "Hospital Updated",
        description: `${data.name} information has been updated.`,
      });
    } else {
      // Add new hospital
      const newHospital: Hospital = {
        id: (hospitals.length + 1).toString(),
        name: data.name,
        location: data.location,
        region: data.region,
        type: data.type,
        activeDevices: 0,
        totalDevices: data.totalDevices,
        status: "offline",
        lastPing: "Never connected",
        contact: data.contact,
      };
      const updatedHospitals = [...hospitals, newHospital];
      setHospitals(updatedHospitals);
      setFilteredHospitals(updatedHospitals.filter((hospital) => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        hospital.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.region.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      toast({
        title: "Hospital Added",
        description: `${data.name} has been added to the system.`,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hospitals</h2>
          <p className="text-muted-foreground">
            Manage and monitor hospital TV networks across Tanzania
          </p>
        </div>
        <Button onClick={handleAddHospital} className="bg-health-blue hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Hospital
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search hospitals by name, location or region..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Devices</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                      <TableCell className="font-medium">{hospital.name}</TableCell>
                      <TableCell>{hospital.location}</TableCell>
                      <TableCell>{hospital.region}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {hospital.type.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{hospital.activeDevices}/{hospital.totalDevices}</TableCell>
                      <TableCell>
                        <Badge 
                          className={cn(
                            hospital.status === "online" && "bg-green-500 hover:bg-green-600",
                            hospital.status === "partial" && "bg-amber-500 hover:bg-amber-600",
                            hospital.status === "offline" && "bg-red-500 hover:bg-red-600",
                          )}
                        >
                          {hospital.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{hospital.contact}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditHospital(hospital)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePrompt(hospital)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="overflow-hidden">
                <div className={cn(
                  "h-2",
                  hospital.status === "online" && "bg-green-500",
                  hospital.status === "partial" && "bg-amber-500",
                  hospital.status === "offline" && "bg-red-500"
                )} />
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{hospital.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {hospital.location}, {hospital.region}
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {hospital.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Active devices:</span>
                      <span className="font-medium">{hospital.activeDevices}/{hospital.totalDevices}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Last activity:</span>
                      <span className="font-medium">{hospital.lastPing}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Contact:</span>
                      <span className="font-medium">{hospital.contact}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleEditHospital(hospital)}>
                      <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeletePrompt(hospital)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-100 h-[500px] flex items-center justify-center">
                <div className="text-center p-6">
                  <HospitalIcon size={48} className="mx-auto text-health-blue opacity-20 mb-2" />
                  <h3 className="text-xl font-semibold mb-2">Tanzania Map View</h3>
                  <p className="text-muted-foreground">
                    Interactive map showing hospital locations will be loaded here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Hospital Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentHospital ? "Edit Hospital" : "Add New Hospital"}</DialogTitle>
            <DialogDescription>
              {currentHospital 
                ? "Update hospital details and device configuration." 
                : "Add a new hospital to the ministry's monitoring system."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hospital name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City/Town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Input placeholder="Administrative region" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Hospital Type</FormLabel>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="national">National Hospital</option>
                        <option value="regional">Regional Referral</option>
                        <option value="district">District Hospital</option>
                        <option value="health-center">Health Center</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="totalDevices"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Total TV Devices</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+255..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{currentHospital ? "Save Changes" : "Add Hospital"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentHospital?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteHospital}>Delete Hospital</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
