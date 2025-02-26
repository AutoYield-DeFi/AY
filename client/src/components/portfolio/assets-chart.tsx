import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const COLORS = ['#9333ea', '#c084fc', '#e9d5ff'];

export function AssetsChart() {
  const data = portfolioPositions.map(position => {
    const pool = pools.find(p => p.id === position.poolId);
    return {
      name: pool?.name,
      value: Number(position.value),
      amount: Number(position.amount),
      pnl: Number(position.pnl),
      apr: pool?.apr
    };
  });

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

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
                label={({ name, value }) => `${name} (${((value/totalValue)*100).toFixed(1)}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                formatter={(value, entry) => {
                  const dataItem = data.find(d => d.name === value);
                  if (!dataItem) return value;
                  return (
                    `${value} - ${formatCurrency(dataItem.value)} (${dataItem.apr}% APR)`
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
          {data.map((item, index) => (
            <div key={index} className="space-y-2 p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="text-muted-foreground">Value: </span>
                  <span className="font-medium">{formatCurrency(item.value)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Initial: </span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
                <div className={`text-sm ${item.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <span>P&L: </span>
                  <span className="font-medium">
                    {item.pnl >= 0 ? '+' : ''}{formatCurrency(item.pnl)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}