import { useRoute } from "wouter";
import { pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DepositDialog } from "@/components/pools/deposit-dialog";
import { CoinsIcon, AlertTriangle, TrendingUp, LineChart, Calendar, Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { DefiTooltip } from "@/components/ui/defi-tooltip";
import { cn } from "@/lib/utils";

const generateHistoryData = (pool: any) => {
  const days = 30;
  const data = [];
  const baseValue = pool.tvl;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Add some random variation to TVL
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const tvl = baseValue * (1 + variation);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tvl: tvl
    });
  }

  return data;
};

export default function PoolDetail() {
  const [, params] = useRoute("/pools/:id");
  const [showDepositDialog, setShowDepositDialog] = useState(false);

  const pool = pools.find(p => p.id === params?.id);

  if (!pool) {
    return (
      <div className="text-center py-12 bg-card/30 rounded-lg border border-border/30">
        <p className="text-sm text-muted-foreground">Pool not found</p>
      </div>
    );
  }

  const historyData = generateHistoryData(pool);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{pool.name}</h1>
          <p className="text-sm text-muted-foreground">
            Provide liquidity to earn yields and trading fees
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => setShowDepositDialog(true)}
          className="w-full md:w-auto px-4 md:px-8"
        >
          Deposit
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              <DefiTooltip term="apr">APR</DefiTooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold text-green-500">
              {pool.apr}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Annual percentage rate
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold">
              {formatCurrency(pool.volume24h)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Trading volume
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              Daily Fees
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold">
              {formatCurrency(pool.fees24h || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Earned in 24h
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <LineChart className="h-4 w-4" />
              <DefiTooltip term="tvl">TVL</DefiTooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold">
              {formatCurrency(pool.tvl)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total value locked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pool Metrics */}
      <Card className="card-gradient">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base md:text-lg">Pool Metrics</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-sm mb-3">Risk Profile</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Risk Level</span>
                    <span className={cn(
                      "capitalize font-medium",
                      pool.riskLevel === "low" && "text-green-500",
                      pool.riskLevel === "medium" && "text-yellow-500",
                      pool.riskLevel === "high" && "text-red-500"
                    )}>
                      {pool.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3">Volume Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span className="font-medium">{formatCurrency(pool.volume24h)}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">24h Fees</span>
                    <span className="font-medium">{formatCurrency(pool.fees24h || 0)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="font-medium text-sm mb-3">Pool Health</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className={cn(
                      "font-medium",
                      Number(pool.utilizationRate) > 80 ? "text-yellow-500" :
                      Number(pool.utilizationRate) > 95 ? "text-red-500" : "text-green-500"
                    )}>
                      {pool.utilizationRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TVL History Chart */}
      <Card className="card-gradient">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base md:text-lg">TVL History</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[200px] md:h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "TVL"]}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="tvl"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#tvlGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {showDepositDialog && (
        <DepositDialog
          pool={pool}
          isOpen={showDepositDialog}
          onClose={() => setShowDepositDialog(false)}
        />
      )}
    </div>
  );
}