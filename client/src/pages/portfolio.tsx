import { useState } from "react";
import { AssetsChart } from "@/components/portfolio/assets-chart";
import { WithdrawDialog } from "@/components/portfolio/withdraw-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Wallet2, Clock, TrendingUp, ChevronRight, Activity } from "lucide-react";
import type { Position } from "@shared/schema";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { DefiTooltip } from "@/components/ui/defi-tooltip";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-5 w-5 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-5 w-5 text-blue-500" />;
    case 'SOL':
      return <CoinsIcon className="h-5 w-5 text-purple-500" />;
    default:
      return <CoinsIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function Portfolio() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [timeRange, setTimeRange] = useState<string>("1w");
  const { t } = useTranslation();

  const totalValue = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value), 0);
  const totalValue24hAgo = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value24hAgo), 0);
  const value24hChange = totalValue - totalValue24hAgo;
  const value24hChangePercent = (value24hChange / totalValue24hAgo) * 100;

  const totalPnL = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl), 0);
  const totalPnL24h = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl24h), 0);
  const totalPnL7d = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl7d), 0);
  const pnlPercentage = (totalPnL / (totalValue - totalPnL)) * 100;

  // Group positions by pool type for the pie chart
  const assetsByPool = portfolioPositions.reduce<Record<string, number>>((acc, position) => {
    const pool = pools.find(p => p.id === position.poolId);
    if (pool) {
      acc[pool.name] = (acc[pool.name] || 0) + Number(position.value);
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(assetsByPool).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];

  // Performance data for the line chart
  const performanceData = [
    { date: '1 Mar', value: totalValue - totalPnL * 0.9 },
    { date: '2 Mar', value: totalValue - totalPnL * 0.7 },
    { date: '3 Mar', value: totalValue - totalPnL * 0.5 },
    { date: '4 Mar', value: totalValue - totalPnL * 0.3 },
    { date: '5 Mar', value: totalValue - totalPnL * 0.1 },
    { date: '6 Mar', value: totalValue },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('portfolio.title')}
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          {t('portfolio.description')}
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
        {/* Main stats row */}
        <Card className="card-gradient md:col-span-8">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Wallet2 className="h-5 w-5 text-primary" />
              <DefiTooltip term="tvl">
                {t('portfolio.current_value')}
              </DefiTooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {formatCurrency(totalValue)}
                </div>
                <div className={`text-sm mt-1 flex items-center gap-1 ${value24hChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {value24hChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {value24hChange >= 0 ? '+' : ''}{formatCurrency(value24hChange)} (24h)
                  <span className="ml-1">
                    ({value24hChangePercent >= 0 ? '+' : ''}{value24hChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:items-end">
                <div className="text-sm text-muted-foreground mb-1">Performance</div>
                <div className={`text-xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                  <span className="text-sm ml-2">
                    ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">24h: </span>
                    <span className={totalPnL24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {totalPnL24h >= 0 ? '+' : ''}{formatCurrency(totalPnL24h)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">7d: </span>
                    <span className={totalPnL7d >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {totalPnL7d >= 0 ? '+' : ''}{formatCurrency(totalPnL7d)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#888' }} 
                    axisLine={{ stroke: '#444' }}
                  />
                  <YAxis 
                    tick={{ fill: '#888' }} 
                    axisLine={{ stroke: '#444' }}
                    tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Value']}
                    labelFormatter={(label: string) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ stroke: "hsl(var(--primary))", strokeWidth: 2, r: 4, fill: "var(--background)" }}
                    activeDot={{ stroke: "hsl(var(--primary))", strokeWidth: 2, r: 6, fill: "var(--background)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset allocation */}
        <Card className="card-gradient md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {t('portfolio.asset_allocation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="space-x-2">
          <TabsTrigger value="positions" className="relative">
            <span>Active Positions</span>
            <span className="absolute top-0 right-1 text-xs bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">
              {portfolioPositions.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="rewards">Rewards & Incentives</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{t('portfolio.active_positions')}</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {t('portfolio.add_position')}
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {portfolioPositions.map(position => {
              const pool = pools.find(p => p.id === position.poolId);
              const pnlPercentage = (Number(position.pnl) / (Number(position.value) - Number(position.pnl))) * 100;
              const dailyFees = Number(pool?.dailyFees) * (Number(position.value) / Number(pool?.tvl));
              const percentOfTVL = ((Number(position.value) / Number(pool?.tvl)) * 100).toFixed(2);

              return (
                <Card 
                  key={position.id} 
                  className="overflow-hidden border border-border/40 hover:border-primary/30 bg-card/80 hover:bg-card transition-all duration-300 flex flex-col relative"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <TokenIcon symbol={pool?.token0 || ""} />
                            <TokenIcon symbol={pool?.token1 || ""} />
                          </div>
                          <div>
                            <p className="font-medium text-lg">{pool?.name}</p>
                            <div className={`text-xs ${Number(position.pnl) >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                              {Number(position.pnl) >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                              {Number(position.pnl) >= 0 ? '+' : ''}{formatCurrency(Number(position.pnl))}
                              <span> ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(1)}%)</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedPosition(position)}
                          className="ml-2 shrink-0"
                        >
                          {t('common.withdraw')}
                        </Button>
                      </div>

                      <div className="space-y-3 pt-3 border-t">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">{t('portfolio.initial_investment')}</p>
                            <p className="font-medium">{formatCurrency(Number(position.amount))}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">{t('portfolio.current_value')}</p>
                            <p className="font-medium">{formatCurrency(Number(position.value))}</p>
                          </div>
                          <div>
                            <DefiTooltip term="pool_share" className="text-xs text-muted-foreground">
                              {t('portfolio.pool_share')}
                            </DefiTooltip>
                            <p className="font-medium">{percentOfTVL}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">{t('portfolio.daily_yield')}</p>
                            <p className="font-medium text-green-500">+{formatCurrency(dailyFees)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs mt-2">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {format(new Date(position.entryDate), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center">
                            <span className="text-muted-foreground mr-1">APR:</span>
                            <span className="font-medium text-green-500">{pool?.apr}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Overlay for better hover effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Performance by Time Period</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">24h Return</div>
                      <div className={`text-lg font-bold ${totalPnL24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {totalPnL24h >= 0 ? '+' : ''}{formatCurrency(totalPnL24h)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">7d Return</div>
                      <div className={`text-lg font-bold ${totalPnL7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {totalPnL7d >= 0 ? '+' : ''}{formatCurrency(totalPnL7d)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">30d Return</div>
                      <div className="text-lg font-bold text-green-500">
                        +{formatCurrency(totalPnL * 1.2)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">All Time</div>
                      <div className="text-lg font-bold text-green-500">
                        +{formatCurrency(totalPnL)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Best Performing Positions</h4>
                <div className="space-y-2">
                  {portfolioPositions
                    .sort((a, b) => Number(b.pnl) - Number(a.pnl))
                    .slice(0, 3)
                    .map(position => {
                      const pool = pools.find(p => p.id === position.poolId);
                      const pnlPercentage = (Number(position.pnl) / (Number(position.value) - Number(position.pnl))) * 100;

                      return (
                        <div key={position.id} className="flex items-center justify-between p-3 rounded-md border border-border/40 bg-background/50">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              <TokenIcon symbol={pool?.token0 || ""} />
                              <TokenIcon symbol={pool?.token1 || ""} />
                            </div>
                            <div className="text-sm font-medium">{pool?.name}</div>
                          </div>
                          <div className="text-green-500 font-medium">
                            +{formatCurrency(Number(position.pnl))} ({pnlPercentage.toFixed(1)}%)
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Rewards & Incentives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 text-center bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/10">
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Protocol token rewards and liquidity incentives will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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