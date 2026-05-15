
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TVActivityData {
  time: string;
  active: number;
  offline: number;
}

interface TVActivityChartProps {
  data: TVActivityData[];
}

export function TVActivityChart({ data }: TVActivityChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">TV Activity (Last 24 Hours)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="active"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.7}
              />
              <Area
                type="monotone"
                dataKey="offline"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.7}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
