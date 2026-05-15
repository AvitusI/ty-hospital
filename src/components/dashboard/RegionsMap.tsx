
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RegionData {
  id: string;
  name: string;
  hospitals: number;
  activeDevices: number;
  totalDevices: number;
  complianceRate: number;
}

interface RegionsMapProps {
  regions: RegionData[];
}

export function RegionsMap({ regions }: RegionsMapProps) {
  return (
    <Card className="col-span-2 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">Regional TV Coverage</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] bg-slate-100 flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-muted-foreground mb-2">Geographic map visualization will be integrated here</p>
            <p className="text-xs text-muted-foreground">Showing TV distribution across hospital regions</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          {regions.map((region) => (
            <div key={region.id} className="bg-muted/30 p-3 rounded-md">
              <div className="font-medium text-sm">{region.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                <div className="flex items-center justify-between">
                  <span>Hospitals:</span>
                  <span className="font-medium">{region.hospitals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active TVs:</span>
                  <span className="font-medium">
                    {region.activeDevices}/{region.totalDevices}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Compliance:</span>
                  <span className="font-medium">{region.complianceRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
