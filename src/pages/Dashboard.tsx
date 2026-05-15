import { Tv, Hospital, Video, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { TVActivityChart } from "@/components/dashboard/TVActivityChart";
import { HospitalTable } from "@/components/dashboard/HospitalTable";
import { ContentScheduleCard } from "@/components/dashboard/ContentScheduleCard";
import { RegionsMap } from "@/components/dashboard/RegionsMap";

// Mock data for the dashboard
const statusData = [
  { name: "Online", value: 750, color: "#10b981" },
  { name: "Offline", value: 120, color: "#ef4444" },
  { name: "Warning", value: 80, color: "#f59e0b" },
];

const tvActivityData = [
  { time: "00:00", active: 680, offline: 150 },
  { time: "03:00", active: 740, offline: 90 },
  { time: "06:00", active: 720, offline: 110 },
  { time: "09:00", active: 820, offline: 70 },
  { time: "12:00", active: 810, offline: 80 },
  { time: "15:00", active: 790, offline: 100 },
  { time: "18:00", active: 750, offline: 140 },
  { time: "21:00", active: 720, offline: 170 },
];

// Explicitly typed to match the Hospital interface
const hospitals = [
  {
    id: "1",
    name: "Central National Hospital",
    location: "Capital City",
    activeDevices: 45,
    totalDevices: 50,
    status: "online" as const,
    lastPing: "2 minutes ago",
  },
  {
    id: "2",
    name: "Eastern Regional Medical Center",
    location: "Eastern Region",
    activeDevices: 28,
    totalDevices: 35,
    status: "partial" as const,
    lastPing: "5 minutes ago",
  },
  {
    id: "3",
    name: "Western District Hospital",
    location: "Western Region",
    activeDevices: 0,
    totalDevices: 20,
    status: "offline" as const,
    lastPing: "3 hours ago",
  },
  {
    id: "4",
    name: "Southern Community Health Center",
    location: "Southern Region",
    activeDevices: 12,
    totalDevices: 15,
    status: "online" as const,
    lastPing: "7 minutes ago",
  },
  {
    id: "5",
    name: "Northern Medical Institute",
    location: "Northern Region",
    activeDevices: 18,
    totalDevices: 25,
    status: "partial" as const,
    lastPing: "15 minutes ago",
  },
];

// Explicitly typed to match the ScheduledContent interface
const scheduledContent = [
  {
    id: "1",
    title: "COVID-19 Vaccination Campaign",
    type: "video" as const,
    scheduledTime: "09:00 AM - Today",
    duration: "2 minutes",
    status: "playing" as const,
    priority: "high" as const,
  },
  {
    id: "2",
    title: "Diabetes Awareness Program",
    type: "video" as const,
    scheduledTime: "10:00 AM - Today",
    duration: "5 minutes",
    status: "scheduled" as const,
    priority: "medium" as const,
  },
  {
    id: "3",
    title: "Malaria Prevention Guidelines",
    type: "video" as const,
    scheduledTime: "12:00 PM - Today",
    duration: "3 minutes",
    status: "scheduled" as const,
    priority: "high" as const,
  },
  {
    id: "4",
    title: "Maternal Health Infographic",
    type: "infographic" as const,
    scheduledTime: "02:00 PM - Today",
    duration: "1 minute",
    status: "scheduled" as const,
    priority: "low" as const,
  },
];

// No type issues with regions, but keeping consistent style
const regions = [
  {
    id: "1",
    name: "Northern Region",
    hospitals: 15,
    activeDevices: 120,
    totalDevices: 150,
    complianceRate: 80,
  },
  {
    id: "2",
    name: "Southern Region",
    hospitals: 12,
    activeDevices: 95,
    totalDevices: 110,
    complianceRate: 86,
  },
  {
    id: "3",
    name: "Eastern Region",
    hospitals: 18,
    activeDevices: 140,
    totalDevices: 180,
    complianceRate: 78,
  },
  {
    id: "4",
    name: "Western Region",
    hospitals: 14,
    activeDevices: 105,
    totalDevices: 130,
    complianceRate: 81,
  },
  {
    id: "5",
    name: "Central Region",
    hospitals: 22,
    activeDevices: 190,
    totalDevices: 210,
    complianceRate: 90,
  },
  {
    id: "6",
    name: "Coastal Region",
    hospitals: 10,
    activeDevices: 80,
    totalDevices: 100,
    complianceRate: 80,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Monitor and manage TV devices and content across hospitals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total TV Devices"
          value="950"
          description="Active TVs across all hospitals"
          icon={<Tv size={16} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Active Hospitals"
          value="84"
          description="With operational TV systems"
          icon={<Hospital size={16} />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Content Items"
          value="125"
          description="Videos and infographics in rotation"
          icon={<Video size={16} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Critical Alerts"
          value="8"
          description="Issues requiring attention"
          icon={<AlertTriangle size={16} />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatusChart data={statusData} title="TV Device Status" />
        <TVActivityChart data={tvActivityData} />
      </div>

      <HospitalTable hospitals={hospitals} />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <ContentScheduleCard scheduledContent={scheduledContent} />
        <RegionsMap regions={regions} />
      </div>
    </div>
  );
}
