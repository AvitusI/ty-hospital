
import { useState } from "react";
import { 
  Video, Search, Filter, Plus, Edit, Trash2, Calendar, Clock, 
  FileVideo, Table as TableIcon, Image, Play, Pause, AlertTriangle, CheckCircle, File 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Content item interface
interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "video" | "infographic" | "announcement";
  fileUrl: string;
  thumbnailUrl: string;
  duration: string;
  status: "active" | "scheduled" | "draft" | "archived";
  priority: "high" | "medium" | "low";
  targetRegions: string[];
  targetHospitalTypes: string[];
  createdAt: string;
  publishedAt: string | null;
  viewCount: number;
  completionRate: number;
  approvalStatus: "approved" | "pending" | "rejected";
  tags: string[];
}

// Sample Tanzania health content data
const initialContent: ContentItem[] = [
  {
    id: "CONT-001",
    title: "COVID-19 Vaccination Campaign",
    description: "Educational video explaining the importance of COVID-19 vaccination and addressing common concerns.",
    type: "video",
    fileUrl: "/videos/covid-vaccination.mp4",
    thumbnailUrl: "/thumbnails/covid-vaccination.jpg",
    duration: "2:30",
    status: "active",
    priority: "high",
    targetRegions: ["All Regions"],
    targetHospitalTypes: ["national", "regional", "district", "health-center"],
    createdAt: "2023-12-01",
    publishedAt: "2023-12-05",
    viewCount: 23450,
    completionRate: 78,
    approvalStatus: "approved",
    tags: ["COVID-19", "vaccination", "public health"]
  },
  {
    id: "CONT-002",
    title: "Malaria Prevention Guidelines",
    description: "Key strategies for preventing malaria in Tanzania, including bed net usage and environmental management.",
    type: "video",
    fileUrl: "/videos/malaria-prevention.mp4",
    thumbnailUrl: "/thumbnails/malaria-prevention.jpg",
    duration: "3:15",
    status: "active",
    priority: "high",
    targetRegions: ["Dar es Salaam", "Mwanza", "Mbeya", "Tanga", "Kigoma"],
    targetHospitalTypes: ["all"],
    createdAt: "2024-01-10",
    publishedAt: "2024-01-15",
    viewCount: 18920,
    completionRate: 85,
    approvalStatus: "approved",
    tags: ["malaria", "prevention", "mosquito nets"]
  },
  {
    id: "CONT-003",
    title: "Maternal Health Infographic",
    description: "Visual guide on prenatal care, nutrition, and warning signs during pregnancy.",
    type: "infographic",
    fileUrl: "/images/maternal-health.jpg",
    thumbnailUrl: "/thumbnails/maternal-health.jpg",
    duration: "1:00",
    status: "active",
    priority: "medium",
    targetRegions: ["All Regions"],
    targetHospitalTypes: ["all"],
    createdAt: "2024-02-05",
    publishedAt: "2024-02-07",
    viewCount: 12560,
    completionRate: 92,
    approvalStatus: "approved",
    tags: ["maternal health", "pregnancy", "prenatal care"]
  },
  {
    id: "CONT-004",
    title: "Diabetes Awareness Program",
    description: "Information about diabetes symptoms, prevention, and management strategies for Tanzanians.",
    type: "video",
    fileUrl: "/videos/diabetes-awareness.mp4",
    thumbnailUrl: "/thumbnails/diabetes-awareness.jpg",
    duration: "4:45",
    status: "active",
    priority: "medium",
    targetRegions: ["Dar es Salaam", "Arusha", "Mwanza", "Dodoma"],
    targetHospitalTypes: ["national", "regional"],
    createdAt: "2024-01-20",
    publishedAt: "2024-01-25",
    viewCount: 9870,
    completionRate: 72,
    approvalStatus: "approved",
    tags: ["diabetes", "chronic disease", "health education"]
  },
  {
    id: "CONT-005",
    title: "Child Vaccination Schedule",
    description: "Complete guide to the Tanzania national immunization schedule for children.",
    type: "infographic",
    fileUrl: "/images/vaccination-schedule.jpg",
    thumbnailUrl: "/thumbnails/vaccination-schedule.jpg",
    duration: "0:45",
    status: "active",
    priority: "high",
    targetRegions: ["All Regions"],
    targetHospitalTypes: ["all"],
    createdAt: "2024-02-15",
    publishedAt: "2024-02-18",
    viewCount: 15230,
    completionRate: 90,
    approvalStatus: "approved",
    tags: ["child health", "vaccination", "immunization"]
  },
  {
    id: "CONT-006",
    title: "Tuberculosis Awareness",
    description: "Educational content on TB symptoms, prevention, and the importance of completing treatment.",
    type: "video",
    fileUrl: "/videos/tb-awareness.mp4",
    thumbnailUrl: "/thumbnails/tb-awareness.jpg",
    duration: "3:30",
    status: "active",
    priority: "medium",
    targetRegions: ["All Regions"],
    targetHospitalTypes: ["all"],
    createdAt: "2024-01-05",
    publishedAt: "2024-01-10",
    viewCount: 11450,
    completionRate: 81,
    approvalStatus: "approved",
    tags: ["tuberculosis", "TB", "infectious disease"]
  },
  {
    id: "CONT-007",
    title: "Cholera Prevention Campaign",
    description: "Emergency announcement for cholera prevention measures in affected regions.",
    type: "announcement",
    fileUrl: "/announcements/cholera-prevention.txt",
    thumbnailUrl: "/thumbnails/cholera-prevention.jpg",
    duration: "1:30",
    status: "active",
    priority: "high",
    targetRegions: ["Dar es Salaam", "Tanga", "Zanzibar"],
    targetHospitalTypes: ["all"],
    createdAt: "2024-03-01",
    publishedAt: "2024-03-01",
    viewCount: 8950,
    completionRate: 95,
    approvalStatus: "approved",
    tags: ["cholera", "emergency", "water safety"]
  },
  {
    id: "CONT-008",
    title: "HIV Testing Awareness",
    description: "Information on the importance of HIV testing, treatment options, and support services.",
    type: "video",
    fileUrl: "/videos/hiv-testing.mp4",
    thumbnailUrl: "/thumbnails/hiv-testing.jpg",
    duration: "5:15",
    status: "scheduled",
    priority: "high",
    targetRegions: ["All Regions"],
    targetHospitalTypes: ["all"],
    createdAt: "2024-03-10",
    publishedAt: "2024-04-15",
    viewCount: 0,
    completionRate: 0,
    approvalStatus: "approved",
    tags: ["HIV", "AIDS", "testing", "public health"]
  },
  {
    id: "CONT-009",
    title: "Nutrition Guidelines for Pregnant Women",
    description: "Detailed nutritional guidance for pregnant women in Tanzania.",
    type: "infographic",
    fileUrl: "/images/pregnancy-nutrition.jpg",
    thumbnailUrl: "/thumbnails/pregnancy-nutrition.jpg",
    duration: "1:15",
    status: "draft",
    priority: "medium",
    targetRegions: ["All Regions"],
    targetHospitalTypes: ["all"],
    createdAt: "2024-03-15",
    publishedAt: null,
    viewCount: 0,
    completionRate: 0,
    approvalStatus: "pending",
    tags: ["nutrition", "pregnancy", "maternal health"]
  },
];

// Content item type icons
const contentTypeIcons = {
  video: FileVideo,
  infographic: Image,
  announcement: AlertTriangle
};

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>(content);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "video" as const,
      duration: "",
      priority: "medium" as const,
      tags: "",
      targetRegions: "All Regions",
    },
  });

  // Filter content based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = content.filter((item) => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase()) || 
      item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredContent(filtered);
  };

  // Open dialog to add new content
  const handleAddContent = () => {
    setSelectedContent(null);
    form.reset({
      title: "",
      description: "",
      type: "video",
      duration: "",
      priority: "medium",
      tags: "",
      targetRegions: "All Regions",
    });
    setIsAddDialogOpen(true);
  };

  // Open dialog to edit content
  const handleEditContent = (item: ContentItem) => {
    setSelectedContent(item);
    form.reset({
      title: item.title,
      description: item.description,
      type: item.type,
      duration: item.duration,
      priority: item.priority,
      tags: item.tags.join(", "),
      targetRegions: item.targetRegions.join(", "),
    });
    setIsEditDialogOpen(true);
  };

  // Open confirmation dialog to delete content
  const handleDeletePrompt = (item: ContentItem) => {
    setSelectedContent(item);
    setIsDeleteDialogOpen(true);
  };

  // Delete content
  const handleDeleteContent = () => {
    if (selectedContent) {
      const updatedContent = content.filter(c => c.id !== selectedContent.id);
      setContent(updatedContent);
      setFilteredContent(updatedContent.filter((item) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
      toast({
        title: "Content Deleted",
        description: `${selectedContent.title} has been removed from the system.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  // Open schedule dialog for content
  const handleScheduleContent = (item: ContentItem) => {
    setSelectedContent(item);
    setIsScheduleDialogOpen(true);
  };

  // Submit new content form
  const onSubmitAdd = (data: any) => {
    const newContent: ContentItem = {
      id: `CONT-${(content.length + 1).toString().padStart(3, '0')}`,
      title: data.title,
      description: data.description,
      type: data.type,
      fileUrl: "/placeholder.mp4",
      thumbnailUrl: "/placeholder.jpg",
      duration: data.duration,
      status: "draft",
      priority: data.priority,
      targetRegions: data.targetRegions.split(",").map((r: string) => r.trim()),
      targetHospitalTypes: ["all"],
      createdAt: new Date().toISOString().split('T')[0],
      publishedAt: null,
      viewCount: 0,
      completionRate: 0,
      approvalStatus: "pending",
      tags: data.tags.split(",").map((tag: string) => tag.trim()),
    };
    
    const updatedContent = [...content, newContent];
    setContent(updatedContent);
    setFilteredContent(updatedContent.filter((item) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
    
    toast({
      title: "Content Created",
      description: `${data.title} has been created and is pending approval.`,
    });
    setIsAddDialogOpen(false);
  };

  // Submit edit content form
  const onSubmitEdit = (data: any) => {
    if (selectedContent) {
      const updatedContent = content.map(c => {
        if (c.id === selectedContent.id) {
          return {
            ...c,
            title: data.title,
            description: data.description,
            type: data.type,
            duration: data.duration,
            priority: data.priority,
            targetRegions: data.targetRegions.split(",").map((r: string) => r.trim()),
            tags: data.tags.split(",").map((tag: string) => tag.trim()),
            approvalStatus: "pending",
          };
        }
        return c;
      });
      
      setContent(updatedContent);
      setFilteredContent(updatedContent.filter((item) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
      
      toast({
        title: "Content Updated",
        description: `${data.title} has been updated and is pending review.`,
      });
      setIsEditDialogOpen(false);
    }
  };

  // Handle publish/unpublish content
  const handleTogglePublish = (item: ContentItem) => {
    const updatedContent = content.map(c => {
      if (c.id === item.id) {
        if (c.status === "active") {
          return {
            ...c,
            status: "archived",
            publishedAt: null
          };
        } else {
          return {
            ...c,
            status: "active",
            publishedAt: new Date().toISOString().split('T')[0]
          };
        }
      }
      return c;
    });
    
    setContent(updatedContent);
    setFilteredContent(updatedContent.filter((c) => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
    
    toast({
      title: item.status === "active" ? "Content Archived" : "Content Published",
      description: `${item.title} has been ${item.status === "active" ? "archived" : "published"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
          <p className="text-muted-foreground">
            Upload, manage and schedule health education content for hospital TVs
          </p>
        </div>
        <Button onClick={handleAddContent} className="bg-health-blue hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Content
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Content Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all content types
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {content.filter(c => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently broadcasting
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {content.filter(c => c.approvalStatus === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {content.filter(c => c.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Emergency/critical health information
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search content by title, description or tags..."
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
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ContentTable 
            items={filteredContent}
            onEdit={handleEditContent}
            onDelete={handleDeletePrompt}
            onSchedule={handleScheduleContent}
            onTogglePublish={handleTogglePublish}
          />
        </TabsContent>

        <TabsContent value="active">
          <ContentTable 
            items={filteredContent.filter(c => c.status === "active")}
            onEdit={handleEditContent}
            onDelete={handleDeletePrompt}
            onSchedule={handleScheduleContent}
            onTogglePublish={handleTogglePublish}
          />
        </TabsContent>

        <TabsContent value="scheduled">
          <ContentTable 
            items={filteredContent.filter(c => c.status === "scheduled")}
            onEdit={handleEditContent}
            onDelete={handleDeletePrompt}
            onSchedule={handleScheduleContent}
            onTogglePublish={handleTogglePublish}
          />
        </TabsContent>

        <TabsContent value="draft">
          <ContentTable 
            items={filteredContent.filter(c => c.status === "draft" || c.approvalStatus === "pending")}
            onEdit={handleEditContent}
            onDelete={handleDeletePrompt}
            onSchedule={handleScheduleContent}
            onTogglePublish={handleTogglePublish}
          />
        </TabsContent>
      </Tabs>
      
      {/* Add Content Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
            <DialogDescription>
              Create new health education content for the MoH TV network
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a detailed description of the content"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="video">Video</option>
                        <option value="infographic">Infographic</option>
                        <option value="announcement">Emergency Announcement</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (mm:ss)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 02:30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High (Emergency)</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="targetRegions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Regions</FormLabel>
                      <FormControl>
                        <Input placeholder="All Regions or comma-separated list" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Comma-separated tags" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Upload Content File</FormLabel>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <File className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <Button type="button" variant="outline" className="mr-2">Choose File</Button>
                    <span className="text-sm text-muted-foreground">or drag and drop</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    MP4, JPG, PNG or PDF up to 100MB
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Create Content</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Content Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Update existing content information and settings
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              {/* Same form fields as Add Content Dialog */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a detailed description of the content"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="video">Video</option>
                        <option value="infographic">Infographic</option>
                        <option value="announcement">Emergency Announcement</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (mm:ss)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 02:30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High (Emergency)</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="targetRegions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Regions</FormLabel>
                      <FormControl>
                        <Input placeholder="All Regions or comma-separated list" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Comma-separated tags" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedContent && (
                <div>
                  <FormLabel>Current Content File</FormLabel>
                  <div className="mt-2 flex items-center p-2 border rounded-md">
                    {selectedContent.type === "video" && <FileVideo className="h-5 w-5 mr-2 text-blue-600" />}
                    {selectedContent.type === "infographic" && <Image className="h-5 w-5 mr-2 text-green-600" />}
                    {selectedContent.type === "announcement" && <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />}
                    <span className="text-sm">{selectedContent.fileUrl.split('/').pop()}</span>
                    <Button type="button" variant="ghost" size="sm" className="ml-auto">Replace</Button>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
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
              Are you sure you want to delete "{selectedContent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteContent}>Delete Content</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Content</DialogTitle>
            <DialogDescription>
              Set broadcast schedule for {selectedContent?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Schedule Type</h4>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input type="radio" id="immediate" name="schedule-type" className="mr-2" defaultChecked />
                  <label htmlFor="immediate" className="text-sm">Immediate</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="scheduled" name="schedule-type" className="mr-2" />
                  <label htmlFor="scheduled" className="text-sm">Scheduled</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="recurring" name="schedule-type" className="mr-2" />
                  <label htmlFor="recurring" className="text-sm">Recurring</label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <Input type="time" className="mt-1" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Target Hospitals</label>
              <select 
                className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="all">All Hospitals</option>
                <option value="national">National Hospitals Only</option>
                <option value="regional">Regional Hospitals Only</option>
                <option value="district">District Hospitals Only</option>
                <option value="custom">Custom Selection</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Priority Override</label>
              <select 
                className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="default">Use Default Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High (Emergency)</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Display Duration</label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div className="flex items-center">
                  <span className="text-sm mr-2">Repeat</span>
                  <Input type="number" min="1" defaultValue="1" className="w-16" />
                  <span className="text-sm ml-2">times</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Every</span>
                  <Input type="number" min="1" defaultValue="60" className="w-16" />
                  <span className="text-sm ml-2">minutes</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast({
                title: "Content Scheduled",
                description: `${selectedContent?.title} has been scheduled for broadcast.`,
              });
              setIsScheduleDialogOpen(false);
            }}>Save Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Content table component
function ContentTable({ 
  items,
  onEdit,
  onDelete,
  onSchedule,
  onTogglePublish
}: { 
  items: ContentItem[],
  onEdit: (item: ContentItem) => void,
  onDelete: (item: ContentItem) => void,
  onSchedule: (item: ContentItem) => void,
  onTogglePublish: (item: ContentItem) => void,
}) {
  if (items.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Video className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium">No content found</h3>
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
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const IconComponent = contentTypeIcons[item.type];
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge variant="outline" className="font-normal flex gap-1">
                        <IconComponent className="h-3.5 w-3.5" />
                        <span className="capitalize">{item.type}</span>
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[250px]">
                      {item.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        item.status === "active" && "bg-green-500",
                        item.status === "scheduled" && "bg-blue-500",
                        item.status === "draft" && "bg-gray-500",
                        item.status === "archived" && "bg-gray-500"
                      )}
                    >
                      {item.status}
                    </Badge>
                    {item.approvalStatus !== "approved" && (
                      <Badge variant="outline" className="ml-1 text-amber-500 border-amber-200">
                        {item.approvalStatus}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "border",
                        item.priority === "high" && "border-red-200 text-red-600 bg-red-50",
                        item.priority === "medium" && "border-amber-200 text-amber-600 bg-amber-50",
                        item.priority === "low" && "border-blue-200 text-blue-600 bg-blue-50",
                      )}
                      variant="outline"
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      {item.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.viewCount > 0 ? (
                      <div className="text-sm">{item.viewCount.toLocaleString()} <span className="text-xs text-muted-foreground">({item.completionRate}%)</span></div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not played yet</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => onSchedule(item)}>
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onTogglePublish(item)}>
                      {item.status === "active" ? <Pause className="h-4 w-4 text-red-500" /> : <Play className="h-4 w-4 text-green-500" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
