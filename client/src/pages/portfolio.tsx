import { useState } from "react";
import { AssetsChart } from "@/components/portfolio/assets-chart";
import { WithdrawDialog } from "@/components/portfolio/withdraw-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  LineChart, 
  Activity,
  Timer,
  CircleDollarSign,
  Wallet
} from "lucide-react";
import { format } from "date-fns";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { SiSolana } from "react-icons/si";

// Token icon component
const TokenIcon = ({ symbol }: { symbol: string }) => {
  if (symbol === 'SOL') {
    return <SiSolana className="h-6 w-6 text-[#14F195]" />;
  }
  return <Activity className="h-6 w-6 text-primary" />;
};

// Generate performance data
const generatePerformanceData = (value: number, days = 30) => {
  const data = [];
  const baseValue = value * 0.8; // Start from 80% of current value

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const growth = (days - i) / days * 0.25; // 25% growth over period
    const variation = (Math.random() - 0.5) * 0.05; // ±2.5% daily variation
    const value = baseValue * (1 + growth + variation);

    data.push({
      date: format(date, 'MMM d'),
      value: value
    });
  }
  return data;
};

export default function Portfolio() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  // Calculate portfolio metrics
  const totalPositionsValue = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value), 0);
  const totalPositionsValue24hAgo = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value24hAgo || 0), 0);
  const positionsValue24hChange = totalPositionsValue - totalPositionsValue24hAgo;
  const positionsValue24hChangePercent = (positionsValue24hChange / totalPositionsValue24hAgo) * 100;

  // Performance calculations
  const totalPnL = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl), 0);
  const totalPnL24h = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl24h || 0), 0);
  const totalPnL7d = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl7d || 0), 0);
  const pnlPercentage = (totalPnL / (totalPositionsValue - totalPnL)) * 100;

  const performanceData = generatePerformanceData(totalPositionsValue);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Portfolio Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your liquidity positions and returns
        </p>
      </div>

      {/* Active Positions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Active Positions</h2>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            Add Position
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {portfolioPositions.map(position => {
            const pool = pools.find(p => p.id === position.poolId);
            const pnlPercentage = (Number(position.pnl) / (Number(position.value) - Number(position.pnl))) * 100;
            const dailyFees = Number(pool?.fees24h) * (Number(position.value) / Number(pool?.tvl));
            const percentOfTVL = ((Number(position.value) / Number(pool?.tvl)) * 100).toFixed(2);

            return (
              <Card 
                key={position.id} 
                className="overflow-hidden bg-card/50 hover:bg-card border-border/40 hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-3">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <TokenIcon symbol={pool?.token1 || ""} />
                          <TokenIcon symbol={pool?.token2 || ""} />
                        </div>
                        <div>
                          <p className="font-medium">{pool?.name}</p>
                          <div className={cn(
                            "text-sm flex items-center",
                            Number(position.pnl) >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {Number(position.pnl) >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                                                     <ArrowDownRight className="h-4 w-4 mr-1" />}
                            {Number(position.pnl) >= 0 ? '+' : ''}{formatCurrency(Number(position.pnl))}
                            <span className="ml-1">({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setSelectedPosition(position)}
                        className="bg-primary/90 hover:bg-primary text-white"
                      >
                        Withdraw
                      </Button>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 pt-2 border-t border-border/50">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Initial Investment</p>
                          <p className="text-sm font-medium">{formatCurrency(Number(position.amount))}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Current Value</p>
                          <p className="text-sm font-medium">{formatCurrency(Number(position.value))}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Pool Share</p>
                          <p className="text-sm font-medium">{percentOfTVL}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Daily Yield</p>
                          <p className="text-sm font-medium text-green-500">+{formatCurrency(dailyFees)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Timer className="h-3 w-3" />
                          {position.entryDate ? format(new Date(position.entryDate), 'MMM d, yyyy') : '-'}
                        </div>
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-1">APR:</span>
                          <span className="font-medium text-green-500">{pool?.apr}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
        {/* Performance Chart */}
        <Card className="md:col-span-8 bg-card/50 border-primary/5">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Portfolio Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg shadow-lg p-2">
                            <p className="text-sm font-medium">{payload[0].payload.date}</p>
                            <p className="text-sm text-primary">{formatCurrency(payload[0].value)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#valueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="md:col-span-4 space-y-4">
          <Card className="bg-card/50 border-primary/5">
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4 text-primary" />
                  Total Value
                </h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalPositionsValue)}</p>
                <div className={cn(
                  "text-sm flex items-center mt-1",
                  positionsValue24hChange >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {positionsValue24hChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : 
                                              <ArrowDownRight className="h-4 w-4" />}
                  {positionsValue24hChange >= 0 ? '+' : ''}{formatCurrency(positionsValue24hChange)} (24h)
                </div>
              </div>

              <div className="pt-3 border-t space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Performance
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">24h P&L</p>
                    <p className={cn(
                      "font-medium",
                      totalPnL24h >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {totalPnL24h >= 0 ? '+' : ''}{formatCurrency(totalPnL24h)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">7d P&L</p>
                    <p className={cn(
                      "font-medium",
                      totalPnL7d >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {totalPnL7d >= 0 ? '+' : ''}{formatCurrency(totalPnL7d)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedPosition && (
        <WithdrawDialog
          position={selectedPosition}
          isOpen={!!selectedPosition}
          onClose={() => setSelectedPosition(null)}
        />
      )}
    </div>
  );
}