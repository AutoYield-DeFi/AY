import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";

const COLORS = ['#9333ea', '#c084fc', '#e9d5ff'];

export function AssetsChart() {
  const data = portfolioPositions.map(position => {
    const pool = pools.find(p => p.id === position.poolId);
    return {
      name: pool?.name,
      value: position.value
    };
  });

  return (
    <Card className="col-span-4 card-gradient">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
