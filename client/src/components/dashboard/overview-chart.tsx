import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { historicalYields } from "@/lib/mock-data";

export function OverviewChart() {
  return (
    <Card className="col-span-4 card-gradient">
      <CardHeader>
        <CardTitle>Yield Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalYields}>
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                fontSize={12}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="yield"
                stroke="hsl(268, 80%, 64%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
