
import { useState } from "react";
import { Settings, User, Bell, Lock, Globe, Database, Server, Monitor, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  // Account settings form
  const accountForm = useForm({
    defaultValues: {
      name: "Dr. Sarah Kimaro",
      email: "sarah.kimaro@moh.go.tz",
      title: "Director of Health Education",
      phone: "+255 755 123 456",
      bio: "Leading health education initiatives at Tanzania's Ministry of Health, focusing on digital health communication strategies.",
    }
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    systemAlerts: true,
    contentApproval: true,
    deviceOffline: true,
    contentDeliveryFailure: true,
    weeklyReports: true,
    monthlyReports: true,
  });

  // Content delivery settings
  const [contentSettings, setContentSettings] = useState({
    autoPublish: false,
    contentRetry: true,
    qualityAdaptation: true,
    caching: true,
    emergencyOverride: true,
  });
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoUpdate: true,
    dataRetention: "90",
    timezone: "Africa/Dar_es_Salaam",
    language: "en-TZ",
  });

  // User management data
  const users = [
    {
      id: "1",
      name: "Dr. Sarah Kimaro",
      email: "sarah.kimaro@moh.go.tz",
      role: "Administrator",
      status: "active",
      lastActive: "Just now",
    },
    {
      id: "2",
      name: "Joseph Mwangi",
      email: "joseph.mwangi@moh.go.tz",
      role: "Content Manager",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Fatima Hassan",
      email: "fatima.hassan@moh.go.tz",
      role: "Regional Manager",
      status: "active",
      lastActive: "30 minutes ago",
    },
    {
      id: "4",
      name: "David Mkwawa",
      email: "david.mkwawa@moh.go.tz",
      role: "Technical Support",
      status: "inactive",
      lastActive: "3 days ago",
    },
  ];

  // Handle account form submission
  const onAccountSubmit = (data: any) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your account information has been updated.",
      });
      setIsSaving(false);
    }, 1000);
  };

  // Handle notification settings update
  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value,
    });
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification Settings Saved",
        description: "Your notification preferences have been updated.",
      });
      setIsSaving(false);
    }, 1000);
  };

  // Handle content settings update
  const handleContentSettingChange = (setting: string, value: boolean) => {
    setContentSettings({
      ...contentSettings,
      [setting]: value,
    });
  };

  // Save content settings
  const saveContentSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Content Delivery Settings Saved",
        description: "Your content delivery preferences have been updated.",
      });
      setIsSaving(false);
    }, 1000);
  };

  // Handle system settings update
  const handleSystemSettingChange = (setting: string, value: any) => {
    setSystemSettings({
      ...systemSettings,
      [setting]: value,
    });
  };

  // Save system settings
  const saveSystemSettings = () => {
    setIsSaving(true);
    if (systemSettings.maintenanceMode) {
      // Show confirmation for maintenance mode
      if (confirm("Enabling maintenance mode will temporarily disable access to the system for all users except administrators. Are you sure you want to proceed?")) {
        completeSystemSettingsSave();
      } else {
        setSystemSettings({
          ...systemSettings,
          maintenanceMode: false,
        });
        setIsSaving(false);
      }
    } else {
      completeSystemSettingsSave();
    }
  };

  const completeSystemSettingsSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "System Settings Saved",
        description: "Your system settings have been updated.",
        variant: systemSettings.maintenanceMode ? "destructive" : "default",
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage system configuration and user preferences for the Tanzania MoH TV network
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" /> Content Delivery
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Server className="h-4 w-4" /> System
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" /> Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-16 w-16 flex items-center justify-center text-2xl text-gray-700 font-semibold">
                      SK
                    </div>
                    <div>
                      <h3 className="font-medium">Profile Photo</h3>
                      <div className="flex mt-2">
                        <Button type="button" variant="outline" size="sm" className="mr-2">Upload</Button>
                        <Button type="button" variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={accountForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of your role and responsibilities"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This will be displayed on your profile.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-4">Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button type="button" variant="outline" className="w-full">
                        <Lock className="h-4 w-4 mr-2" /> Change Password
                      </Button>
                      <Button type="button" variant="outline" className="w-full">
                        <Lock className="h-4 w-4 mr-2" /> Enable Two-Factor Auth
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" defaultChecked />
                        <Label htmlFor="terms">Receive system update emails</Label>
                      </div>
                    </div>
                  </div>

                  <CardFooter className="px-0 pt-4 flex justify-between">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Notification Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="emailAlerts" 
                      checked={notificationSettings.emailAlerts} 
                      onCheckedChange={(checked) => 
                        handleNotificationChange("emailAlerts", !!checked)
                      }
                    />
                    <Label htmlFor="emailAlerts">Email Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="smsAlerts" 
                      checked={notificationSettings.smsAlerts} 
                      onCheckedChange={(checked) => 
                        handleNotificationChange("smsAlerts", !!checked)
                      }
                    />
                    <Label htmlFor="smsAlerts">SMS Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="systemAlerts" 
                      checked={notificationSettings.systemAlerts} 
                      onCheckedChange={(checked) => 
                        handleNotificationChange("systemAlerts", !!checked)
                      }
                    />
                    <Label htmlFor="systemAlerts">System Notifications</Label>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Alert Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="contentApproval" 
                        checked={notificationSettings.contentApproval} 
                        onCheckedChange={(checked) => 
                          handleNotificationChange("contentApproval", !!checked)
                        }
                      />
                      <Label htmlFor="contentApproval">Content Approval Requests</Label>
                    </div>
                    <Badge variant="outline">High Priority</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="deviceOffline" 
                        checked={notificationSettings.deviceOffline} 
                        onCheckedChange={(checked) => 
                          handleNotificationChange("deviceOffline", !!checked)
                        }
                      />
                      <Label htmlFor="deviceOffline">Device Offline Alerts</Label>
                    </div>
                    <Badge variant="outline">High Priority</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="contentDeliveryFailure" 
                        checked={notificationSettings.contentDeliveryFailure} 
                        onCheckedChange={(checked) => 
                          handleNotificationChange("contentDeliveryFailure", !!checked)
                        }
                      />
                      <Label htmlFor="contentDeliveryFailure">Content Delivery Failures</Label>
                    </div>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Reports & Summaries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weeklyReports" 
                      checked={notificationSettings.weeklyReports} 
                      onCheckedChange={(checked) => 
                        handleNotificationChange("weeklyReports", !!checked)
                      }
                    />
                    <Label htmlFor="weeklyReports">Weekly System Reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="monthlyReports" 
                      checked={notificationSettings.monthlyReports} 
                      onCheckedChange={(checked) => 
                        handleNotificationChange("monthlyReports", !!checked)
                      }
                    />
                    <Label htmlFor="monthlyReports">Monthly Analytics Summary</Label>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Quiet Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Input type="time" defaultValue="22:00" className="mt-1" />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input type="time" defaultValue="07:00" className="mt-1" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Only high priority alerts will be sent during quiet hours
                </p>
              </div>

              <CardFooter className="px-0 pt-4 flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={saveNotificationSettings} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Delivery Settings</CardTitle>
              <CardDescription>
                Configure how content is delivered and managed across the Tanzania MoH TV network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Publishing Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="autoPublish" 
                          checked={contentSettings.autoPublish} 
                          onCheckedChange={(checked) => 
                            handleContentSettingChange("autoPublish", !!checked)
                          }
                        />
                        <Label htmlFor="autoPublish">Auto-publish Approved Content</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Automatically publish content once it's approved
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="contentRetry" 
                          checked={contentSettings.contentRetry} 
                          onCheckedChange={(checked) => 
                            handleContentSettingChange("contentRetry", !!checked)
                          }
                        />
                        <Label htmlFor="contentRetry">Automatic Retry on Delivery Failure</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Automatically retry content delivery if initial attempt fails
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Delivery Optimization</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="qualityAdaptation" 
                          checked={contentSettings.qualityAdaptation} 
                          onCheckedChange={(checked) => 
                            handleContentSettingChange("qualityAdaptation", !!checked)
                          }
                        />
                        <Label htmlFor="qualityAdaptation">Adaptive Quality Settings</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Automatically adjust content quality based on network conditions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="caching" 
                          checked={contentSettings.caching} 
                          onCheckedChange={(checked) => 
                            handleContentSettingChange("caching", !!checked)
                          }
                        />
                        <Label htmlFor="caching">Local Content Caching</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Store content locally on devices for offline playback
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Emergency Broadcasting</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="emergencyOverride" 
                          checked={contentSettings.emergencyOverride} 
                          onCheckedChange={(checked) => 
                            handleContentSettingChange("emergencyOverride", !!checked)
                          }
                        />
                        <Label htmlFor="emergencyOverride">Allow Emergency Content Override</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Enable emergency content to override regular scheduled content
                      </p>
                    </div>
                    <Badge className="bg-red-500">Critical Setting</Badge>
                  </div>
                  
                  <div className="mt-4">
                    <Label>Emergency Content Approval Required By</Label>
                    <select 
                      className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="director">Director of Health Education Only</option>
                      <option value="any">Any System Administrator</option>
                      <option value="two">At Least Two Administrators</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Content Scheduling</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Default Content Duration</Label>
                    <div className="flex items-center mt-1">
                      <Input type="number" defaultValue="30" className="w-20 mr-2" />
                      <span>seconds</span>
                    </div>
                  </div>
                  <div>
                    <Label>Minimum Time Between Repetitions</Label>
                    <div className="flex items-center mt-1">
                      <Input type="number" defaultValue="60" className="w-20 mr-2" />
                      <span>minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardFooter className="px-0 pt-4 flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={saveContentSettings} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system-wide settings for the Tanzania MoH TV network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">System Mode</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="maintenanceMode" 
                          checked={systemSettings.maintenanceMode} 
                          onCheckedChange={(checked) => 
                            handleSystemSettingChange("maintenanceMode", !!checked)
                          }
                        />
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Put the system in maintenance mode (only administrators can access)
                      </p>
                    </div>
                    <Badge variant="destructive">Caution</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="debugMode" 
                          checked={systemSettings.debugMode} 
                          onCheckedChange={(checked) => 
                            handleSystemSettingChange("debugMode", !!checked)
                          }
                        />
                        <Label htmlFor="debugMode">Debug Mode</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Enable additional logging and debugging tools
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="autoUpdate" 
                          checked={systemSettings.autoUpdate} 
                          onCheckedChange={(checked) => 
                            handleSystemSettingChange("autoUpdate", !!checked)
                          }
                        />
                        <Label htmlFor="autoUpdate">Automatic System Updates</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Automatically apply system updates during off-peak hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Data Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                    <Input 
                      id="dataRetention"
                      type="number" 
                      value={systemSettings.dataRetention}
                      onChange={(e) => handleSystemSettingChange("dataRetention", e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label>Database Backup Frequency</Label>
                    <select 
                      className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Localization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone"
                      className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={systemSettings.timezone}
                      onChange={(e) => handleSystemSettingChange("timezone", e.target.value)}
                    >
                      <option value="Africa/Dar_es_Salaam">Africa/Dar es Salaam (EAT)</option>
                      <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <select 
                      id="language"
                      className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={systemSettings.language}
                      onChange={(e) => handleSystemSettingChange("language", e.target.value)}
                    >
                      <option value="en-TZ">English (Tanzania)</option>
                      <option value="sw-TZ">Swahili (Tanzania)</option>
                      <option value="en-US">English (US)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">API & Integration</h3>
                <div>
                  <Label>API Rate Limiting</Label>
                  <div className="flex items-center mt-1">
                    <Input type="number" defaultValue="100" className="w-24 mr-2" />
                    <span>requests per minute</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button type="button" variant="outline">
                    <Lock className="h-4 w-4 mr-2" /> Manage API Keys
                  </Button>
                </div>
              </div>

              <CardFooter className="px-0 pt-4 flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={saveSystemSettings} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save System Settings"}
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </div>
              <Button>
                <UsersIcon className="h-4 w-4 mr-2" /> Add User
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Last Active</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">{user.name}</td>
                        <td className="p-4 align-middle">{user.email}</td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            className={cn(
                              user.status === "active" ? "bg-green-500" : "bg-gray-500"
                            )}
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{user.lastActive}</td>
                        <td className="p-4 text-right align-middle">
                          <Button variant="ghost" size="sm" className="mr-1">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Deactivate</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
