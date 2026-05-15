
import { useState } from "react";
import {
  BarChart4, Calendar, Filter, Download, ChevronDown,
  Tv, Users, Clock, Eye, ArrowUpRight, ArrowDownRight, Hospital
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { 
  BarChart, ResponsiveContainer, XAxis, YAxis, Bar, CartesianGrid, Tooltip, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend 
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample Analytics Data
const viewershipData = [
  { name: "Jan", viewers: 12450, engagement: 68 },
  { name: "Feb", viewers: 14280, engagement: 72 },
  { name: "Mar", viewers: 15900, engagement: 75 },
  { name: "Apr", viewers: 16850, engagement: 78 },
  { name: "May", viewers: 15200, engagement: 73 },
  { name: "Jun", viewers: 17300, engagement: 80 },
  { name: "Jul", viewers: 19200, engagement: 82 },
  { name: "Aug", viewers: 18600, engagement: 79 },
  { name: "Sep", viewers: 20100, engagement: 85 },
  { name: "Oct", viewers: 22400, engagement: 87 },
  { name: "Nov", viewers: 25300, engagement: 89 },
  { name: "Dec", viewers: 26800, engagement: 91 },
];

const contentPerformanceData = [
  { name: "COVID-19 Vaccination", views: 26540, completion: 82, duration: 150 },
  { name: "Malaria Prevention", views: 19870, completion: 88, duration: 195 },
  { name: "Diabetes Awareness", views: 14230, completion: 72, duration: 285 },
  { name: "Maternal Health", views: 15980, completion: 92, duration: 60 },
  { name: "Child Vaccination", views: 18450, completion: 90, duration: 45 },
  { name: "Tuberculosis", views: 12340, completion: 81, duration: 210 },
  { name: "Cholera Prevention", views: 16780, completion: 95, duration: 90 },
  { name: "HIV Testing", views: 11230, completion: 76, duration: 315 },
];

const regionalEngagementData = [
  { region: "Dar es Salaam", engagement: 89, hospitals: 12, devices: 68 },
  { region: "Mwanza", engagement: 84, hospitals: 8, devices: 42 },
  { region: "Arusha", engagement: 78, hospitals: 6, devices: 34 },
  { region: "Dodoma", engagement: 82, hospitals: 5, devices: 28 },
  { region: "Mbeya", engagement: 76, hospitals: 7, devices: 38 },
  { region: "Tanga", engagement: 72, hospitals: 4, devices: 24 },
  { region: "Zanzibar", engagement: 75, hospitals: 5, devices: 30 },
  { region: "Kilimanjaro", engagement: 80, hospitals: 6, devices: 32 },
];

const deviceUptimeData = [
  { name: "Week 1", uptime: 98.2 },
  { name: "Week 2", uptime: 97.8 },
  { name: "Week 3", uptime: 99.1 },
  { name: "Week 4", uptime: 98.6 },
  { name: "Week 5", uptime: 96.3 },
  { name: "Week 6", uptime: 97.5 },
  { name: "Week 7", uptime: 99.2 },
  { name: "Week 8", uptime: 98.4 },
];

const contentTypeData = [
  { name: "Videos", value: 65 },
  { name: "Infographics", value: 28 },
  { name: "Announcements", value: 7 },
];

const hospitalTypeData = [
  { name: "National", value: 5, engagement: 92 },
  { name: "Regional", value: 28, engagement: 86 },
  { name: "District", value: 45, engagement: 78 },
  { name: "Health Center", value: 75, engagement: 72 },
];

// Demographic data by age group
const demographicData = [
  { age: "Under 18", male: 15, female: 16 },
  { age: "18-24", male: 22, female: 25 },
  { age: "25-34", male: 28, female: 32 },
  { age: "35-44", male: 20, female: 24 },
  { age: "45-54", male: 12, female: 16 },
  { age: "55-64", male: 8, female: 11 },
  { age: "65+", male: 5, female: 7 },
];

// Colors for charts
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

// Content performance table data
const topPerformingContent = [
  {
    id: "CONT-003",
    title: "Maternal Health Infographic",
    type: "infographic",
    views: 15980,
    completion: 92,
    engagement: "High",
    trend: "up"
  },
  {
    id: "CONT-007",
    title: "Cholera Prevention Campaign",
    type: "announcement",
    views: 16780,
    completion: 95,
    engagement: "High",
    trend: "up"
  },
  {
    id: "CONT-005",
    title: "Child Vaccination Schedule",
    type: "infographic",
    views: 18450,
    completion: 90,
    engagement: "High",
    trend: "up"
  },
  {
    id: "CONT-001",
    title: "COVID-19 Vaccination Campaign",
    type: "video",
    views: 26540,
    completion: 82,
    engagement: "Medium",
    trend: "up"
  },
  {
    id: "CONT-002",
    title: "Malaria Prevention Guidelines",
    type: "video",
    views: 19870,
    completion: 88,
    engagement: "High",
    trend: "up"
  },
];

// Low performing content
const lowPerformingContent = [
  {
    id: "CONT-008",
    title: "HIV Testing Awareness",
    type: "video",
    views: 11230,
    completion: 76,
    engagement: "Medium",
    trend: "down"
  },
  {
    id: "CONT-006",
    title: "Tuberculosis Awareness",
    type: "video",
    views: 12340,
    completion: 81,
    engagement: "Medium",
    trend: "down"
  },
  {
    id: "CONT-004",
    title: "Diabetes Awareness Program",
    type: "video",
    views: 14230,
    completion: 72,
    engagement: "Medium",
    trend: "down"
  },
];

// Top engaging regions
const topRegions = [
  {
    region: "Dar es Salaam",
    engagement: 89,
    deviceCount: 68,
    mostViewedContent: "COVID-19 Vaccination Campaign",
    lastMonthChange: "+3.2%"
  },
  {
    region: "Mwanza",
    engagement: 84,
    deviceCount: 42,
    mostViewedContent: "Malaria Prevention Guidelines",
    lastMonthChange: "+2.8%"
  },
  {
    region: "Dodoma",
    engagement: 82,
    deviceCount: 28,
    mostViewedContent: "Child Vaccination Schedule",
    lastMonthChange: "+4.1%"
  },
  {
    region: "Kilimanjaro", 
    engagement: 80,
    deviceCount: 32,
    mostViewedContent: "Diabetes Awareness Program",
    lastMonthChange: "+1.9%"
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("90d");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Detailed analytics on content performance and viewer engagement across Tanzania
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <select 
              className="text-sm border-0 bg-transparent"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <Button variant="outline" className="ml-2">
            <Filter className="mr-1 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-1 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324,582</div>
            <p className="text-xs mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12.8%
              </span>
              <span className="text-muted-foreground ml-1">since last period</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83.4%</div>
            <p className="text-xs mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 4.2%
              </span>
              <span className="text-muted-foreground ml-1">since last period</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Content Pieces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">218</div>
            <p className="text-xs mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 8.5%
              </span>
              <span className="text-muted-foreground ml-1">since last period</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Watch Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 12s</div>
            <p className="text-xs mt-1 flex items-center">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" /> 1.3%
              </span>
              <span className="text-muted-foreground ml-1">since last period</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-none md:flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="devices">Device Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Viewership Trend</CardTitle>
                <CardDescription>Monthly viewership and engagement rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer 
                    config={{
                      viewers: {
                        color: "#3b82f6",
                        label: "Total Viewers"
                      },
                      engagement: {
                        color: "#10b981",
                        label: "Engagement %"
                      }
                    }}
                  >
                    <LineChart data={viewershipData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tickMargin={10}
                        fontSize={12}
                      />
                      <YAxis 
                        yAxisId="left" 
                        orientation="left" 
                        axisLine={false} 
                        tickLine={false}
                        tickMargin={10}
                        fontSize={12}
                        domain={[0, 'dataMax + 5000']}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        axisLine={false} 
                        tickLine={false}
                        tickMargin={10}
                        fontSize={12}
                        domain={[0, 100]}
                      />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent />
                        } 
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="viewers"
                        stroke="var(--color-viewers)"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="engagement"
                        stroke="var(--color-engagement)"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Top content by views and completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      views: {
                        color: "#3b82f6",
                        label: "Views"
                      },
                      completion: {
                        color: "#10b981",
                        label: "Completion %"
                      }
                    }}
                  >
                    <BarChart data={contentPerformanceData.slice(0, 5)} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tickMargin={10}
                        fontSize={12}
                        tick={{fontSize: 11}}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis 
                        yAxisId="left" 
                        orientation="left"
                        axisLine={false} 
                        tickLine={false}
                        tickMargin={10}
                        fontSize={12}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        axisLine={false} 
                        tickLine={false}
                        tickMargin={10}
                        fontSize={12}
                        domain={[0, 100]}
                      />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent />
                        } 
                      />
                      <Bar yAxisId="left" dataKey="views" fill="var(--color-views)" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="completion" fill="var(--color-completion)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] flex items-center justify-center">
                  <PieChart width={280} height={280}>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hospital Type Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ChartContainer
                    config={{
                      hospitals: {
                        color: "#3b82f6",
                        label: "Hospitals"
                      },
                      engagement: {
                        color: "#10b981",
                        label: "Engagement %"
                      }
                    }}
                  >
                    <BarChart data={hospitalTypeData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis type="number" axisLine={false} tickLine={false} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false}
                        width={80}
                      />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent />
                        } 
                      />
                      <Bar dataKey="value" name="Hospitals" fill="var(--color-hospitals)" barSize={15} radius={[0, 4, 4, 0]} />
                      <Bar dataKey="engagement" name="Engagement %" fill="var(--color-engagement)" barSize={15} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Device Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ChartContainer
                    config={{
                      uptime: {
                        color: "#3b82f6",
                        label: "Uptime %"
                      },
                    }}
                  >
                    <AreaChart data={deviceUptimeData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        domain={[90, 100]}
                      />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent />
                        } 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="uptime" 
                        stroke="var(--color-uptime)" 
                        fill="var(--color-uptime)" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingContent.map((content) => (
                    <div key={content.id} className="flex justify-between items-center">
                      <div className="flex items-start space-x-3">
                        <Badge variant="outline" className="capitalize mt-0.5">
                          {content.type}
                        </Badge>
                        <div>
                          <div className="font-medium">{content.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {content.views.toLocaleString()} views • {content.completion}% completion
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={cn(
                          content.trend === "up" ? "bg-green-500" : "bg-red-500"
                        )}
                      >
                        {content.engagement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Engaging Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRegions.map((region) => (
                    <div key={region.region} className="flex justify-between items-center">
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <Hospital className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-medium">{region.region}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({region.deviceCount} devices)
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-6 mt-1">
                          Most viewed: {region.mostViewedContent}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-16 bg-gray-200 rounded mr-2">
                          <div 
                            className="h-full bg-blue-500 rounded"
                            style={{ width: `${region.engagement}%` }}  
                          ></div>
                        </div>
                        <div className="font-semibold">{region.engagement}%</div>
                        <div className="ml-2 text-xs text-green-500">{region.lastMonthChange}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Analysis</CardTitle>
              <CardDescription>
                Detailed metrics on content engagement and viewership across Tanzania
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-20">
                Content Performance Analysis tab will display detailed metrics on all content items,
                including performance by hospital type, demographic engagement, and content effectiveness metrics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Analysis</CardTitle>
              <CardDescription>
                Regional breakdown of content performance and engagement across Tanzania
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-20">
                Regional Analysis tab will include interactive maps showing content performance by region,
                regional engagement metrics, and demographic data specific to each region in Tanzania.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Device Performance Metrics</CardTitle>
              <CardDescription>
                Device-level analytics showing uptime, content delivery, and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-20">
                Device Metrics tab will show detailed analytics on device performance, 
                including uptime statistics, content delivery success rates, and viewer engagement by device.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
