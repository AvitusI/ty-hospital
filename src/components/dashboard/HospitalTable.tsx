
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  location: string;
  activeDevices: number;
  totalDevices: number;
  status: "online" | "partial" | "offline";
  lastPing: string;
}

interface HospitalTableProps {
  hospitals: Hospital[];
}

export function HospitalTable({ hospitals }: HospitalTableProps) {
  const getStatusBadge = (status: Hospital["status"]) => {
    switch (status) {
      case "online":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Online</Badge>
        );
      case "partial":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Partial</Badge>
        );
      case "offline":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Offline</Badge>
        );
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle className="text-lg">Hospitals Overview</CardTitle>
          <CardDescription>
            Monitoring status of hospital TV networks
          </CardDescription>
        </div>
        <Button className="ml-auto" variant="outline" size="sm" asChild>
          <a href="/hospitals">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hospital Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>TV Devices</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell className="font-medium">{hospital.name}</TableCell>
                <TableCell>{hospital.location}</TableCell>
                <TableCell>
                  {hospital.activeDevices}/{hospital.totalDevices}
                </TableCell>
                <TableCell>{getStatusBadge(hospital.status)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {hospital.lastPing}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
