import { AssetsChart } from "@/components/portfolio/assets-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function Portfolio() {
  const totalValue = portfolioPositions.reduce((sum, pos) => sum + pos.value, 0);
  const totalPnL = portfolioPositions.reduce((sum, pos) => sum + pos.pnl, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
        <p className="text-muted-foreground">
          Track your liquidity positions and returns
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Total P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <AssetsChart />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Active Positions</h3>
        {portfolioPositions.map(position => {
          const pool = pools.find(p => p.id === position.poolId);
          return (
            <Card key={position.id} className="card-gradient">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{pool?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Amount: {formatCurrency(position.amount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(position.value)}</p>
                    <p className={`text-sm ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
