import { useRoute } from "wouter";
import { pools } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DepositDialog } from "@/components/pools/deposit-dialog";
import { 
  CoinsIcon, 
  AlertTriangle, 
  TrendingUp, 
  LineChart, 
  Calendar, 
  Activity,
  ShieldCheck,
  Wallet
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SiSolana } from "react-icons/si";

const generateHistoryData = (pool: any) => {
  const days = 30;
  const data = [];
  const baseValue = pool.tvl;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.1;
    const tvl = baseValue * (1 + variation);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tvl: tvl
    });
  }

  return data;
};

// Token icon component
const TokenIcon = ({ symbol }: { symbol: string }) => {
  if (symbol === 'SOL') {
    return <SiSolana className="h-6 w-6 text-[#14F195]" />;
  }
  return <CoinsIcon className="h-6 w-6 text-primary" />;
};

// Risk badge component
const RiskBadge = ({ level }: { level: string }) => {
  const colors = {
    low: "bg-green-500/10 text-green-500 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    high: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium border flex items-center gap-1",
        colors[level as keyof typeof colors]
      )}
    >
      <ShieldCheck className="h-4 w-4" />
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
    </Badge>
  );
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <TokenIcon symbol={pool.token1} />
            <TokenIcon symbol={pool.token2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{pool.name}</h1>
              <RiskBadge level={pool.riskLevel} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Provide liquidity to earn yields and trading fees
            </p>
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => setShowDepositDialog(true)}
          className="w-full md:w-auto px-4 md:px-8 bg-primary/90 hover:bg-primary"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Deposit
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-primary" />
              APR
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

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" />
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

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-primary" />
              Daily Fees
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold text-primary">
              {formatCurrency(pool.fees24h || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Earned in 24h
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <LineChart className="h-4 w-4 text-primary" />
              TVL
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

      {/* Pool Health and Metrics */}
      <Card className="bg-card/50 border-primary/5">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base md:text-lg">Pool Health</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Utilization Rate</span>
                  <span className={cn(
                    "text-sm font-medium",
                    Number(pool.utilizationRate) > 90 ? "text-red-500" :
                    Number(pool.utilizationRate) > 80 ? "text-yellow-500" :
                    "text-green-500"
                  )}>
                    {pool.utilizationRate}%
                  </span>
                </div>
                <Progress 
                  value={Number(pool.utilizationRate)} 
                  className="h-2"
                  indicatorClassName={cn(
                    Number(pool.utilizationRate) > 90 ? "bg-red-500" :
                    Number(pool.utilizationRate) > 80 ? "bg-yellow-500" :
                    "bg-green-500"
                  )}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Pool Health</span>
                  <span className={cn(
                    "text-sm font-medium",
                    Number(pool.poolHealth) > 80 ? "text-green-500" :
                    Number(pool.poolHealth) > 60 ? "text-yellow-500" :
                    "text-red-500"
                  )}>
                    {pool.poolHealth}%
                  </span>
                </div>
                <Progress 
                  value={Number(pool.poolHealth)} 
                  className="h-2"
                  indicatorClassName={cn(
                    Number(pool.poolHealth) > 80 ? "bg-green-500" :
                    Number(pool.poolHealth) > 60 ? "bg-yellow-500" :
                    "bg-red-500"
                  )}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">24h Volume</span>
                <span className="font-medium">{formatCurrency(pool.volume24h)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">24h Fees</span>
                <span className="font-medium text-green-500">
                  {formatCurrency(pool.fees24h || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <RiskBadge level={pool.riskLevel} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TVL History Chart */}
      <Card className="bg-card/50 border-primary/5">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <LineChart className="h-4 w-4 text-primary" />
            TVL History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[300px]">
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
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "TVL"]}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tvl"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
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