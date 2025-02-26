import { useRoute } from "wouter";
import { pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DepositDialog } from "@/components/pools/deposit-dialog";
import { useTranslation } from "react-i18next";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon, AlertTriangle, TrendingUp, LineChart, Calendar, Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-8 w-8 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-8 w-8 text-blue-500" />;
    case 'SOL':
      return <CoinsIcon className="h-8 w-8 text-purple-500" />;
    default:
      return <CoinsIcon className="h-8 w-8 text-gray-500" />;
  }
};

export default function PoolDetail() {
  const [, params] = useRoute("/pools/:id");
  const { t } = useTranslation();
  const [showDepositDialog, setShowDepositDialog] = useState(false);

  const pool = pools.find(p => p.id === Number(params?.id));

  if (!pool) {
    return <div>Pool not found</div>;
  }

  const hasHighIL = Number(pool.impermanentLoss) > 2;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <TokenIcon symbol={pool.token0} />
            <TokenIcon symbol={pool.token1} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{pool.name}</h2>
            <p className="text-muted-foreground">
              Pool Details and Performance
            </p>
          </div>
        </div>
        <Button 
          size="lg"
          onClick={() => setShowDepositDialog(true)}
          className="px-8 bg-primary hover:bg-primary/90"
        >
          Deposit Now
        </Button>
      </div>

      {hasHighIL && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-500">High Impermanent Loss Risk</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This pool currently has a higher risk of impermanent loss ({pool.impermanentLoss}%). 
              Consider your investment carefully and start with a smaller position if you're new to DeFi.
              <a href="#" className="text-primary hover:underline ml-1">Learn more about impermanent loss</a>
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              APR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {pool.apr}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Annual percentage rate
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Volume (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(Number(pool.volume24h))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Last 24 hours trading
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Daily Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(Number(pool.dailyFees))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Earned in last 24h
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              TVL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(Number(pool.tvl))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Total value locked
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Token Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TokenIcon symbol={pool.token0} />
                  <div>
                    <h3 className="font-medium">{pool.token0}</h3>
                    <p className="text-sm text-muted-foreground">Primary Token</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Price</p>
                    <p className="font-medium">{formatCurrency(Number(pool.token0Price))}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pool Reserve</p>
                    <p className="font-medium">{Number(pool.token0Reserve).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TokenIcon symbol={pool.token1} />
                  <div>
                    <h3 className="font-medium">{pool.token1}</h3>
                    <p className="text-sm text-muted-foreground">Paired Token</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Price</p>
                    <p className="font-medium">{formatCurrency(Number(pool.token1Price))}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pool Reserve</p>
                    <p className="font-medium">{Number(pool.token1Reserve).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>TVL History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pool.history}>
                  <defs>
                    <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(268, 80%, 64%)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(268, 80%, 64%)" stopOpacity={0}/>
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
                    tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="tvl"
                    stroke="hsl(268, 80%, 64%)"
                    fillOpacity={1}
                    fill="url(#tvlGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Pool Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-4">Risk Profile</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Risk Level</span>
                    <span className="capitalize font-medium">{pool.riskLevel}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Impermanent Loss</span>
                    <span className="font-medium">{pool.impermanentLoss}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Volume Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weekly Volume</span>
                    <span className="font-medium">{formatCurrency(Number(pool.volume7d))}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Weekly Fees</span>
                    <span className="font-medium">{formatCurrency(Number(pool.weeklyFees))}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Pool Health</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Utilization Rate</span>
                    <span className="font-medium">{pool.utilizationRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Price Ratio</span>
                    <span className="font-medium">{Number(pool.priceRatio).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
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