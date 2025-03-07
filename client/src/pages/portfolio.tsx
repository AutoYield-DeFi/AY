import { useState } from "react";
import { AssetsChart } from "@/components/portfolio/assets-chart";
import { WithdrawDialog } from "@/components/portfolio/withdraw-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Wallet2, Clock, TrendingUp, Brain, AlertCircle, Activity } from "lucide-react";
import type { Position } from "@shared/schema";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { DefiTooltip } from "@/components/ui/defi-tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock AI decisions
const aiDecisions = [
  {
    date: new Date(2025, 2, 6),
    action: "exit",
    pool: "BONK/SOL",
    reason: "Low trading volume detected. Converting funds to SOL.",
    impact: "+2.3%"
  },
  {
    date: new Date(2025, 2, 5),
    action: "enter",
    pool: "SOL/USDC",
    reason: "High APR of 25.5% with stable volume.",
    impact: "+1.8%"
  }
];

// Mock wallet balances
const walletBalances = {
  sol: 45.8,
  usdc: 2150.25,
  solPrice: 142.30,
  usdcPrice: 1.00
};

const TokenIcon = ({ symbol, size = "small" }: { symbol: string; size?: "small" | "large" }) => {
  const sizeClass = size === "large" ? "h-8 w-8 md:h-10 md:w-10" : "h-5 w-5 md:h-6 md:w-6";

  switch (symbol?.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className={`${sizeClass} text-orange-500`} />;
    case 'ETH':
      return <SiEthereum className={`${sizeClass} text-blue-500`} />;
    case 'SOL':
      return <SiSolana className={`${sizeClass} text-purple-500`} />;
    default:
      return <CoinsIcon className={`${sizeClass} text-gray-500`} />;
  }
};

export default function Portfolio() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const { t } = useTranslation();

  const totalValue = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value), 0);
  const totalValue24hAgo = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value24hAgo || 0), 0);
  const value24hChange = totalValue - totalValue24hAgo;
  const value24hChangePercent = (value24hChange / totalValue24hAgo) * 100;

  const totalPnL = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl), 0);
  const totalPnL24h = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl24h || 0), 0);
  const totalPnL7d = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl7d || 0), 0);
  const pnlPercentage = (totalPnL / (totalValue - totalPnL)) * 100;

  const solBalanceUSD = walletBalances.sol * walletBalances.solPrice;
  const usdcBalanceUSD = walletBalances.usdc * walletBalances.usdcPrice;
  const totalWalletBalance = solBalanceUSD + usdcBalanceUSD;

  // Performance data for the line chart
  const performanceData = [
    { date: '1 Mar', value: totalValue - totalPnL * 0.9 },
    { date: '2 Mar', value: totalValue - totalPnL * 0.7 },
    { date: '3 Mar', value: totalValue - totalPnL * 0.5 },
    { date: '4 Mar', value: totalValue - totalPnL * 0.3 },
    { date: '5 Mar', value: totalValue - totalPnL * 0.1 },
    { date: '6 Mar', value: totalValue },
  ];

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

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('portfolio.title')}
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl">
          {t('portfolio.description')}
        </p>
      </div>

      {/* Top Row: Wallet & AI */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-12">
        {/* Wallet Balance */}
        <Card className="card-gradient md:col-span-5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Wallet2 className="h-5 w-5 text-primary" />
              {t('portfolio.available_balance')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TokenIcon symbol="SOL" />
                  <div>
                    <div className="font-medium">{walletBalances.sol.toFixed(2)} SOL</div>
                    <div className="text-xs text-muted-foreground">{formatCurrency(solBalanceUSD)}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">{t('portfolio.deposit')}</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TokenIcon symbol="USDC" />
                  <div>
                    <div className="font-medium">{walletBalances.usdc.toFixed(2)} USDC</div>
                    <div className="text-xs text-muted-foreground">{formatCurrency(usdcBalanceUSD)}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">{t('portfolio.deposit')}</Button>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">{t('portfolio.total_balance')}</div>
                <div className="text-xl font-bold">{formatCurrency(totalWalletBalance)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Strategy */}
        <Card className="card-gradient md:col-span-7">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Brain className="h-5 w-5 text-primary" />
              {t('portfolio.ai_strategy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{t('portfolio.next_move')}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('portfolio.monitoring_message', { pool: 'ETH/USDC', apr: '18.2' })}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {aiDecisions.map((decision, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-card/60 transition-colors">
                    <div className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
                      decision.action === 'enter' && "bg-green-500/10 text-green-500",
                      decision.action === 'exit' && "bg-red-500/10 text-red-500",
                      decision.action === 'rebalance' && "bg-blue-500/10 text-blue-500"
                    )}>
                      {decision.action === 'enter' ? <ArrowUpRight className="h-4 w-4" /> :
                       decision.action === 'exit' ? <ArrowDownRight className="h-4 w-4" /> :
                       <Activity className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-xs capitalize">
                          {t(`portfolio.decision_types.${decision.action}`)}
                        </span>
                        <span className="text-xs text-muted-foreground">{decision.pool}</span>
                        <Badge variant="secondary" className="text-xs">{decision.impact}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{decision.reason}</p>
                      <div className="text-xs text-muted-foreground/80 mt-1">
                        {format(decision.date, 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-12">
        <Card className="card-gradient md:col-span-8">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('portfolio.current_value')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between">
              <div>
                <div className="text-2xl md:text-3xl font-bold">
                  {formatCurrency(totalValue)}
                </div>
                <div className={cn(
                  "text-xs md:text-sm mt-1 flex items-center gap-1",
                  value24hChange >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {value24hChange >= 0 ? <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" /> : 
                                      <ArrowDownRight className="h-3 w-3 md:h-4 md:w-4" />}
                  {value24hChange >= 0 ? '+' : ''}{formatCurrency(value24hChange)} (24h)
                  <span className="ml-1">
                    ({value24hChangePercent >= 0 ? '+' : ''}{value24hChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:items-end">
                <div className="text-xs md:text-sm text-muted-foreground mb-1">{t('portfolio.performance')}</div>
                <div className={cn(
                  "text-lg md:text-xl font-bold",
                  totalPnL >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                  <span className="text-xs md:text-sm ml-2">
                    ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                  <div>
                    <span className="text-muted-foreground">24h: </span>
                    <span className={totalPnL24h >= 0 ? "text-green-500" : "text-red-500"}>
                      {totalPnL24h >= 0 ? '+' : ''}{formatCurrency(totalPnL24h)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">7d: </span>
                    <span className={totalPnL7d >= 0 ? "text-green-500" : "text-red-500"}>
                      {totalPnL7d >= 0 ? '+' : ''}{formatCurrency(totalPnL7d)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 h-[120px] md:h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#888', fontSize: 12 }} 
                    axisLine={{ stroke: '#444' }}
                  />
                  <YAxis 
                    tick={{ fill: '#888', fontSize: 12 }} 
                    axisLine={{ stroke: '#444' }}
                    tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), t('portfolio.value')]}
                    labelFormatter={(label: string) => `${label}`}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ stroke: "hsl(var(--primary))", strokeWidth: 2, r: 3, fill: "var(--background)" }}
                    activeDot={{ stroke: "hsl(var(--primary))", strokeWidth: 2, r: 5, fill: "var(--background)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset allocation */}
        <Card className="card-gradient md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Activity className="h-5 w-5 text-primary" />
              {t('portfolio.asset_allocation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] md:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    innerRadius={30}
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

      {/* Active Positions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-semibold">{t('portfolio.active_positions')}</h3>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
            {t('portfolio.add_position')}
          </Button>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {portfolioPositions.map(position => {
            const pool = pools.find(p => p.id === position.poolId);
            const pnlPercentage = (Number(position.pnl) / (Number(position.value) - Number(position.pnl))) * 100;
            const dailyFees = Number(pool?.dailyFees) * (Number(position.value) / Number(pool?.tvl));
            const percentOfTVL = ((Number(position.value) / Number(pool?.tvl)) * 100).toFixed(2);

            return (
              <Card 
                key={position.id} 
                className="overflow-hidden border border-border/40 hover:border-primary/30 bg-card/80 hover:bg-card transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <TokenIcon symbol={pool?.token0 || ""} />
                          <TokenIcon symbol={pool?.token1 || ""} />
                        </div>
                        <div>
                          <p className="font-medium text-sm md:text-base">{pool?.name}</p>
                          <div className={cn(
                            "text-xs flex items-center",
                            Number(position.pnl) >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {Number(position.pnl) >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                                                      <ArrowDownRight className="h-3 w-3 mr-1" />}
                            {Number(position.pnl) >= 0 ? '+' : ''}{formatCurrency(Number(position.pnl))}
                            <span className="ml-1">({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedPosition(position)}
                        className="text-xs"
                      >
                        {t('common.withdraw')}
                      </Button>
                    </div>

                    <div className="space-y-3 pt-2 border-t">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{t('portfolio.initial_investment')}</p>
                          <p className="text-sm font-medium">{formatCurrency(Number(position.amount))}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t('portfolio.current_value')}</p>
                          <p className="text-sm font-medium">{formatCurrency(Number(position.value))}</p>
                        </div>
                        <div>
                          <DefiTooltip term="pool_share" className="text-xs text-muted-foreground">
                            {t('portfolio.pool_share')}
                          </DefiTooltip>
                          <p className="text-sm font-medium">{percentOfTVL}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t('portfolio.daily_yield')}</p>
                          <p className="text-sm font-medium text-green-500">+{formatCurrency(dailyFees)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
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